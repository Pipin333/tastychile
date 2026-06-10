"use server"

import { sql } from '@/lib/db';
import { 
  sendWaitlistWelcome, 
  sendB2BNotification, 
  sendB2BConfirmation,
  sendOrderConfirmation,
  sendOrderNotification
} from '@/lib/email';
import { MercadoPagoConfig, Preference } from 'mercadopago';

// Product Catalog dictionary to compute secure pricing server-side
const catalog: Record<string, { name: string; price: number; emoji: string }> = {
  'marsellesa': { name: 'Café Marsellesa (250g)', price: 12900, emoji: '🍫' },
  'catimore': { name: 'Café Catimore (250g)', price: 11900, emoji: '🍯' },
  'caturra': { name: 'Café Caturra (250g)', price: 12500, emoji: '🍋' },
  'pink-bourbon': { name: 'Café Pink Bourbon (250g)', price: 14900, emoji: '🌸' },
  'tupi': { name: 'Café Tupi (250g)', price: 13500, emoji: '🌰' },
  'geisha': { name: 'Café Geisha (250g)', price: 19900, emoji: '🌺' },
  'sub-explorador': { name: 'Suscripción Explorador', price: 14900, emoji: '🌱' },
  'sub-aventurero': { name: 'Suscripción Aventurera', price: 18900, emoji: '🤠' },
  'sub-experto': { name: 'Suscripción Experta', price: 28900, emoji: '👑' },
};

/**
 * Adds a contact email to the waitlist and sends a welcome email.
 */
export async function addContactToWaitlist(formData: FormData) {
  const email = formData.get('email')?.toString();
  
  if (!email) {
    return { success: false, error: 'El correo es requerido' };
  }

  try {
    // Inserta el correo en la tabla "waitlist".
    await sql`
      INSERT INTO waitlist (email, subscribed, name, source) 
      VALUES (${email}, true, null, 'club') 
      ON CONFLICT (email) DO NOTHING;
    `;
    
    // Envia email de bienvenida
    await sendWaitlistWelcome(email);
    
    return { success: true, message: '¡Te has inscrito con éxito en la lista de espera!' };
  } catch (error) {
    console.error('Error guardando en la DB:', error);
    return { success: false, error: 'Hubo un error al suscribirte. Intenta de nuevo.' };
  }
}

/**
 * Handles B2B lead submission, sends a receipt confirmation to the lead, and alerts the roastery.
 */
export async function addB2BContact(formData: FormData) {
  const name = formData.get('name')?.toString();
  const company = formData.get('company')?.toString();
  const email = formData.get('email')?.toString();
  const message = formData.get('message')?.toString() || '';
  
  if (!name || !company || !email) {
    return { success: false, error: 'Nombre, empresa y correo son obligatorios' };
  }

  try {
    await sql`
      INSERT INTO b2b_contacts (name, company, email, message) 
      VALUES (${name}, ${company}, ${email}, ${message})
    `;
    
    const leadData = { name, company, email, message };
    
    // Send email notification to Selva Alta Roasters
    await sendB2BNotification(leadData);
    
    // Send email confirmation to B2B Lead
    await sendB2BConfirmation(email, name, company);
    
    return { success: true, message: '¡Mensaje enviado! Nos contactaremos a la brevedad.' };
  } catch (error) {
    console.error('Error guardando contacto B2B:', error);
    return { success: false, error: 'Hubo un error al enviar tu mensaje. Intenta de nuevo.' };
  }
}

/**
 * Server action to create a B2C order and generate payment link.
 */
export async function createOrder(shippingData: {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  region: string;
  notes?: string;
  cartItems: Array<{ id: string; quantity: number }>;
}) {
  const { name, email, phone, address, city, region, notes, cartItems } = shippingData;

  if (!name || !email || !phone || !address || !city || !region || !cartItems || cartItems.length === 0) {
    return { success: false, error: 'Todos los datos de despacho y los items del carrito son obligatorios.' };
  }

  try {
    // 1. Recalculate prices securely server-side
    let subtotal = 0;
    let hasSubscription = false;
    const validatedItems = cartItems.map((item) => {
      const product = catalog[item.id];
      if (!product) {
        throw new Error(`Producto no encontrado en el catálogo: ${item.id}`);
      }
      
      const price = product.price;
      subtotal += price * item.quantity;
      
      if (item.id.startsWith('sub-')) {
        hasSubscription = true;
      }

      return {
        id: item.id,
        name: product.name,
        price: price,
        quantity: item.quantity,
        emoji: product.emoji,
        detail: item.id.startsWith('sub-') ? 'Suscripción Mensual' : 'Café de Especialidad 250g'
      };
    });

    // Shipping fee logic: $0 if order contains a subscription or subtotal >= $30.000, else $3.900 flat rate
    const shipping = (hasSubscription || subtotal >= 30000) ? 0 : 3900;
    const total = subtotal + shipping;
    
    // Generate order number (SAR-XXXXXX)
    const orderNumber = `SAR-${Math.floor(100000 + Math.random() * 900000)}`;

    // 2. Prepare Mercado Pago Integration
    const mpAccessToken = process.env.MP_ACCESS_TOKEN;
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL || process.env.NEXT_PUBLIC_APP_URL}` : 'http://localhost:3000';
    
    let redirectUrl = `${appUrl}/club/checkout/success?external_reference=${orderNumber}&status=approved&payment_id=mock_transfer`;
    let mpPreferenceId = null;

    if (mpAccessToken && mpAccessToken !== 're_xxxxxxxxxxxx') {
      try {
        const client = new MercadoPagoConfig({ accessToken: mpAccessToken });
        const preference = new Preference(client);

        // Build items array for Mercado Pago preference
        const mpItems = validatedItems.map((item) => ({
          id: item.id,
          title: item.name,
          quantity: item.quantity,
          unit_price: item.price,
          currency_id: 'CLP'
        }));

        // Add shipping item if applicable
        if (shipping > 0) {
          mpItems.push({
            id: 'shipping-fee',
            title: 'Despacho a Domicilio',
            quantity: 1,
            unit_price: shipping,
            currency_id: 'CLP'
          });
        }

        const mpPreference = await preference.create({
          body: {
            items: mpItems,
            back_urls: {
              success: `${appUrl}/club/checkout/success`,
              failure: `${appUrl}/club/checkout/failure`,
              pending: `${appUrl}/club/checkout/pending`
            },
            auto_return: 'approved',
            notification_url: `${appUrl}/api/mercadopago/webhook`,
            external_reference: orderNumber,
            statement_descriptor: 'SELVA ALTA',
          }
        });

        if (mpPreference && mpPreference.init_point) {
          redirectUrl = mpPreference.init_point;
          mpPreferenceId = mpPreference.id;
        }
      } catch (mpErr) {
        console.error("Error generating Mercado Pago preference. Falling back to Wizard of Oz checkout:", mpErr);
      }
    }

    // 3. Save order into Neon PostgreSQL with pending status
    const serializedItems = JSON.stringify(validatedItems);
    await sql`
      INSERT INTO orders (
        order_number, 
        customer_name, 
        customer_email, 
        customer_phone, 
        customer_address, 
        customer_city, 
        customer_region, 
        items, 
        subtotal, 
        shipping, 
        total, 
        status, 
        notes, 
        source, 
        mp_preference_id
      ) 
      VALUES (
        ${orderNumber}, 
        ${name}, 
        ${email}, 
        ${phone}, 
        ${address}, 
        ${city}, 
        ${region}, 
        ${serializedItems}, 
        ${subtotal}, 
        ${shipping}, 
        ${total}, 
        'pending', 
        ${notes || ''}, 
        'b2c', 
        ${mpPreferenceId}
      );
    `;

    // 4. Send email notification to roastery and confirmation to client immediately ONLY IF mock payment
    if (!mpPreferenceId) {
      const emailOrderData = {
        order_number: orderNumber,
        customer_name: name,
        customer_email: email,
        customer_phone: phone,
        customer_address: address,
        customer_city: city,
        customer_region: region,
        items: validatedItems,
        subtotal,
        shipping,
        total,
        payment_status: 'pending',
        payment_id: 'transfer_pending',
        notes: notes || ''
      };

      await sendOrderNotification(emailOrderData);
      await sendOrderConfirmation(emailOrderData);
    }

    return { 
      success: true, 
      redirectUrl: redirectUrl, 
      orderNumber: orderNumber,
      isWizardOfOz: !mpPreferenceId
    };

  } catch (error: any) {
    console.error('Error creating order server action:', error);
    return { success: false, error: error.message || 'Ocurrió un error inesperado al procesar tu pedido.' };
  }
}
