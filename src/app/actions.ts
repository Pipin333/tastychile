"use server";

import { sql } from '@/lib/db';
import {
  sendOrderNotification,
  sendOrderConfirmation,
  sendB2BNotification,
  sendB2BConfirmation,
  sendWaitlistWelcome,
} from '@/lib/email';
import { EmailOrderData, OrderItem } from '@/lib/email-templates';

// Secure catalog of products and prices
export const PRODUCTS_CATALOG: Record<string, { name: string; price: number; emoji: string; category: string }> = {
  'marsellesa': { name: 'Café Marsellesa (250g)', price: 12900, emoji: '🍫', category: 'single' },
  'catimore': { name: 'Café Catimore (250g)', price: 11900, emoji: '🍯', category: 'single' },
  'caturra': { name: 'Café Caturra (250g)', price: 12500, emoji: '🍋', category: 'single' },
  'pink-bourbon': { name: 'Café Pink Bourbon (250g)', price: 14900, emoji: '🌸', category: 'single' },
  'tupi': { name: 'Café Tupi (250g)', price: 13500, emoji: '🌰', category: 'single' },
  'geisha': { name: 'Café Geisha (250g)', price: 19900, emoji: '🌺', category: 'single' },
  'sub-explorador': { name: 'Suscripción Explorador (1 bolsa/mes)', price: 14900, emoji: '🌱', category: 'sub' },
  'sub-aventurero': { name: 'Suscripción Aventurera (2 bolsas/mes)', price: 18900, emoji: '🤠', category: 'sub' },
  'sub-maestro': { name: 'Suscripción Maestro Barista (3 bolsas/mes)', price: 28900, emoji: '👑', category: 'sub' },
};

/**
 * Creates an order in "Mago de Oz" mode.
 * Simulates an e-commerce order: saves in database and sends instant email to Selva Alta and the customer.
 */
export async function createWizardOfOzOrder(payload: {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  region: string;
  notes?: string;
  items: Array<{
    id: string;
    quantity: number;
    grind?: string;
  }>;
}) {
  const { name, email, phone, address, city, region, notes, items } = payload;

  if (!name || !email || !phone || !address || !city || !region) {
    return { success: false, error: 'Por favor completa todos los datos de contacto y entrega.' };
  }

  if (!items || items.length === 0) {
    return { success: false, error: 'Tu selección de cafés está vacía.' };
  }

  try {
    // 1. Validate items and recalculate totals server-side
    let subtotal = 0;
    let hasSubscription = false;

    const validatedItems: OrderItem[] = items.map((item) => {
      const product = PRODUCTS_CATALOG[item.id];
      const name = product ? product.name : (item.id.charAt(0).toUpperCase() + item.id.slice(1));
      const price = product ? product.price : 12900;
      const emoji = product ? product.emoji : '☕';

      if (item.id.startsWith('sub-')) {
        hasSubscription = true;
      }

      subtotal += price * Math.max(1, item.quantity);

      return {
        id: item.id,
        name,
        price,
        quantity: Math.max(1, item.quantity),
        emoji,
        grind: item.grind || 'Grano Entero',
        detail: item.id.startsWith('sub-') ? 'Suscripción Mensual' : 'Bolsa 250g con válvula desgasificadora'
      };
    });

    // Despacho gratis si hay suscripción o subtotal >= 30.000 CLP, si no tarifa plana 3.900 CLP
    const shipping = (hasSubscription || subtotal >= 30000) ? 0 : 3900;
    const total = subtotal + shipping;

    // Generate unique order reference SAR-XXXXXX
    const orderNumber = `SAR-${Math.floor(100000 + Math.random() * 900000)}`;

    const orderData: EmailOrderData = {
      order_number: orderNumber,
      customer_name: name.trim(),
      customer_email: email.trim().toLowerCase(),
      customer_phone: phone.trim(),
      customer_address: address.trim(),
      customer_city: city.trim(),
      customer_region: region.trim(),
      items: validatedItems,
      subtotal,
      shipping,
      total,
      notes: notes?.trim() || '',
    };

    // 2. Attempt saving in PostgreSQL (orders table)
    try {
      const serializedItems = JSON.stringify(validatedItems);
      await sql`
        CREATE TABLE IF NOT EXISTS orders (
          id SERIAL PRIMARY KEY,
          order_number VARCHAR(50) UNIQUE NOT NULL,
          customer_name VARCHAR(255) NOT NULL,
          customer_email VARCHAR(255) NOT NULL,
          customer_phone VARCHAR(100),
          customer_address TEXT,
          customer_city VARCHAR(100),
          customer_region VARCHAR(100),
          items JSONB,
          subtotal INT,
          shipping INT,
          total INT,
          status VARCHAR(50) DEFAULT 'mago_de_oz_pending',
          notes TEXT,
          source VARCHAR(50) DEFAULT 'b2c_club',
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `;

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
          source
        ) 
        VALUES (
          ${orderNumber}, 
          ${orderData.customer_name}, 
          ${orderData.customer_email}, 
          ${orderData.customer_phone}, 
          ${orderData.customer_address}, 
          ${orderData.customer_city}, 
          ${orderData.customer_region}, 
          ${serializedItems}, 
          ${subtotal}, 
          ${shipping}, 
          ${total}, 
          'mago_de_oz_pending', 
          ${orderData.notes || ''}, 
          'b2c_club'
        );
      `;
    } catch (dbError) {
      console.warn('[DB orders] No se pudo guardar en tabla orders, continuando con envío de correo:', dbError);
    }

    // 3. Send email to Selva Alta Roasters operations
    await sendOrderNotification(orderData);

    // 4. Send email confirmation to customer
    await sendOrderConfirmation(orderData);

    return {
      success: true,
      orderNumber,
      customerName: orderData.customer_name,
      total,
      message: '¡Pedido recibido con éxito! Un representante se contactará contigo a la brevedad para coordinar la entrega y el pago.',
    };
  } catch (error: unknown) {
    console.error('[createWizardOfOzOrder] Error procesando pedido:', error);
    return {
      success: false,
      error: 'Hubo un inconveniente al registrar tu pedido. Por favor contáctanos directamente o intenta de nuevo.',
    };
  }
}

/**
 * Handles B2B commercial contact submission.
 */
export async function addB2BContact(formData: FormData) {
  const name = formData.get('name')?.toString()?.trim();
  const company = formData.get('company')?.toString()?.trim();
  const email = formData.get('email')?.toString()?.trim()?.toLowerCase();
  const phone = formData.get('phone')?.toString()?.trim() || '';
  const message = formData.get('message')?.toString()?.trim() || '';

  if (!name || !company || !email) {
    return { success: false, error: 'Nombre, empresa y correo corporativo son obligatorios.' };
  }

  try {
    try {
      await sql`
        CREATE TABLE IF NOT EXISTS b2b_contacts (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          company VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          phone VARCHAR(100),
          message TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `;

      await sql`
        INSERT INTO b2b_contacts (name, company, email, phone, message) 
        VALUES (${name}, ${company}, ${email}, ${phone}, ${message});
      `;
    } catch (dbErr) {
      console.warn('[DB b2b_contacts] Fallback sin DB:', dbErr);
    }

    const leadData = { name, company, email, phone, message };

    await sendB2BNotification(leadData);
    await sendB2BConfirmation(email, name, company);

    return {
      success: true,
      message: '¡Solicitud recibida! Un representante de Selva Alta se contactará a la brevedad con la ficha técnica y muestras.',
    };
  } catch (error) {
    console.error('[addB2BContact] Error guardando contacto B2B:', error);
    return { success: false, error: 'Hubo un error al enviar tu mensaje. Intenta de nuevo.' };
  }
}

/**
 * Adds email to waitlist.
 */
export async function addContactToWaitlist(formData: FormData) {
  const email = formData.get('email')?.toString()?.trim()?.toLowerCase();
  const name = formData.get('name')?.toString()?.trim();

  if (!email) {
    return { success: false, error: 'El correo electrónico es requerido.' };
  }

  try {
    try {
      await sql`
        CREATE TABLE IF NOT EXISTS waitlist (
          id SERIAL PRIMARY KEY,
          email VARCHAR(255) UNIQUE NOT NULL,
          name VARCHAR(255),
          source VARCHAR(50) DEFAULT 'club',
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `;

      await sql`
        INSERT INTO waitlist (email, name, source) 
        VALUES (${email}, ${name || null}, 'club') 
        ON CONFLICT (email) DO NOTHING;
      `;
    } catch (dbErr) {
      console.warn('[DB waitlist] Fallback sin DB:', dbErr);
    }

    await sendWaitlistWelcome(email, name);

    return { success: true, message: '¡Te has suscrito con éxito! Te avisaremos de los próximos tuestes.' };
  } catch (error) {
    console.error('[addContactToWaitlist] Error:', error);
    return { success: false, error: 'Hubo un error al suscribirte. Intenta de nuevo.' };
  }
}
