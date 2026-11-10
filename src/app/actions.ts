"use server";

import { sql } from "@/lib/db";
import {
  sendOrderNotification,
  sendOrderConfirmation,
  sendB2BNotification,
  sendB2BConfirmation,
  sendWaitlistWelcome,
} from "@/lib/email";
import { EmailOrderData, OrderItem } from "@/lib/email-templates";

// Catalog focused exclusively on Marsellesa Orgánico (87 Puntos SCA) in 250g format with volume tiers
const MARSELLESA_CATALOG: Record<
  string,
  { name: string; price: number; detail: string }
> = {
  "marsellesa-250g": {
    name: "Marsellesa Orgánico · 250g (1 bolsa)",
    price: 11500,
    detail: "1 bolsa de 250g con válvula desgasificadora (Precio normal $13.990)",
  },
  "marsellesa-1kg": {
    name: "Marsellesa Orgánico · Pack 1 kg (4 × 250g)",
    price: 39990,
    detail: "4 bolsas de 250g ($9.998 c/u · Precio normal $55.960)",
  },
  "marsellesa-3kg": {
    name: "Marsellesa Orgánico · Caja 3 kg (12 × 250g)",
    price: 104990,
    detail: "12 bolsas de 250g ($8.749 c/u · Precio normal $167.880)",
  },
};

/**
 * Creates an order in "Mago de Oz" mode.
 * Saves in database and sends instant email to Selva Alta and the customer.
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
    return {
      success: false,
      error: "Por favor completa todos los datos de contacto y entrega.",
    };
  }

  if (!items || items.length === 0) {
    return { success: false, error: "Tu selección de café está vacía." };
  }

  try {
    let subtotal = 0;

    const validatedItems: OrderItem[] = items.map((item) => {
      const product =
        MARSELLESA_CATALOG[item.id] || MARSELLESA_CATALOG["marsellesa-250g"];
      const qty = Math.max(1, item.quantity);
      subtotal += product.price * qty;

      return {
        id: item.id,
        name: product.name,
        price: product.price,
        quantity: qty,
        grind: item.grind || "Grano Entero",
        detail: product.detail,
      };
    });

    // Despacho carbono neutral sin costo sobre $30.000 CLP (incluye tramos de 1 kg y 3 kg), o $3.900 CLP tarifa plana
    const shipping = subtotal >= 30000 ? 0 : 3900;
    const total = subtotal + shipping;

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
      notes: notes?.trim() || "",
    };

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
          source VARCHAR(50) DEFAULT 'marsellesa_order',
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
          ${orderData.notes || ""},
          'marsellesa_order'
        );
      `;
    } catch (dbError) {
      console.warn(
        "[DB orders] Continuando con envío de correo en modo Mago de Oz:",
        dbError
      );
    }

    const internalEmailRes = await sendOrderNotification(orderData);
    // Pausa breve de 600ms para respetar el rate limit de Resend (2 req/seg en plan gratuito)
    await new Promise((resolve) => setTimeout(resolve, 600));
    const customerEmailRes = await sendOrderConfirmation(orderData);

    return {
      success: true,
      orderNumber,
      customerName: orderData.customer_name,
      total,
      emailStatus: {
        internalSent: internalEmailRes.success,
        customerSent: customerEmailRes.success,
        mock: Boolean(internalEmailRes.mock || customerEmailRes.mock),
      },
      message:
        "Pedido recibido. Un representante de Selva Alta se contactará en breve para coordinar la entrega y el pago.",
    };
  } catch (error: unknown) {
    console.error("[createWizardOfOzOrder] Error procesando pedido:", error);
    return {
      success: false,
      error:
        "Hubo un inconveniente al registrar tu pedido. Por favor escríbenos directamente a comercial@selvaalta.cl.",
    };
  }
}

/**
 * Handles B2B commercial contact submission.
 */
export async function addB2BContact(formData: FormData) {
  const name = formData.get("name")?.toString()?.trim();
  const company = formData.get("company")?.toString()?.trim();
  const email = formData.get("email")?.toString()?.trim()?.toLowerCase();
  const phone = formData.get("phone")?.toString()?.trim() || "";
  const volume = formData.get("volume")?.toString()?.trim() || "";
  const grind = formData.get("grind")?.toString()?.trim() || "";
  const message = formData.get("message")?.toString()?.trim() || "";

  if (!name || !company || !email) {
    return {
      success: false,
      error: "Nombre, empresa o cafetería y correo son obligatorios.",
    };
  }

  try {
    const composedMessage = [
      volume ? `Volumen estimado: ${volume}` : "",
      grind ? `Molienda: ${grind}` : "",
      message,
    ]
      .filter(Boolean)
      .join(" | ");

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
        VALUES (${name}, ${company}, ${email}, ${phone}, ${composedMessage});
      `;
    } catch (dbErr) {
      console.warn("[DB b2b_contacts] Fallback sin DB:", dbErr);
    }

    const internalB2BRes = await sendB2BNotification({
      name,
      company,
      email,
      phone,
      volume,
      grind,
      message,
    });
    // Pausa breve de 600ms para respetar el rate limit de Resend (2 req/seg en plan gratuito)
    await new Promise((resolve) => setTimeout(resolve, 600));
    const customerB2BRes = await sendB2BConfirmation(email, name, company);

    return {
      success: true,
      emailStatus: {
        internalSent: internalB2BRes.success,
        customerSent: customerB2BRes.success,
        mock: Boolean(internalB2BRes.mock || customerB2BRes.mock),
      },
      message:
        "Solicitud enviada al correo de Selva Alta. Un representante se contactará en breve con los detalles y muestras.",
    };
  } catch (error) {
    console.error("[addB2BContact] Error guardando contacto B2B:", error);
    return {
      success: false,
      error: "Hubo un error al enviar tu consulta. Intenta nuevamente.",
    };
  }
}

/**
 * Adds email to inquiry list.
 */
export async function addContactToWaitlist(formData: FormData) {
  const email = formData.get("email")?.toString()?.trim()?.toLowerCase();
  const name = formData.get("name")?.toString()?.trim();

  if (!email) {
    return { success: false, error: "El correo electrónico es requerido." };
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
      console.warn("[DB waitlist] Fallback sin DB:", dbErr);
    }

    await sendWaitlistWelcome(email, name);

    return {
      success: true,
      message:
        "Correo registrado. Un representante de Selva Alta te enviará los detalles en breve.",
    };
  } catch (error) {
    console.error("[addContactToWaitlist] Error:", error);
    return {
      success: false,
      error: "Hubo un error al registrar tu correo. Intenta de nuevo.",
    };
  }
}
