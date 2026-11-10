export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  grind?: string;
  detail?: string;
}

export interface EmailOrderData {
  order_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_address: string;
  customer_city: string;
  customer_region: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  notes?: string;
}

export interface EmailB2BData {
  name: string;
  company: string;
  email: string;
  phone?: string;
  volume?: string;
  grind?: string;
  message?: string;
}

/**
 * Generates the HTML email for the customer order confirmation (Mago de Oz).
 */
export function getOrderConfirmationTemplate(order: EmailOrderData): string {
  const itemsHtml = order.items
    .map(
      (item) => `
    <tr>
      <td style="padding: 12px 0; border-bottom: 1px solid #332c25; font-size: 14px; color: #f5f3f0;">
        <strong>${item.name}</strong>
        ${item.grind ? `<span style="display: block; font-size: 12px; color: #c25e1a; margin-top: 2px;">Molienda: ${item.grind}</span>` : ""}
        ${item.detail ? `<span style="display: block; font-size: 12px; color: #b0a89e;">${item.detail}</span>` : ""}
      </td>
      <td style="padding: 12px 0; border-bottom: 1px solid #332c25; font-size: 14px; color: #f5f3f0; text-align: center; font-family: monospace;">
        ${item.quantity}
      </td>
      <td style="padding: 12px 0; border-bottom: 1px solid #332c25; font-size: 14px; color: #f5f3f0; text-align: right; font-weight: bold; font-family: monospace;">
        $${(item.price * item.quantity).toLocaleString("es-CL")}
      </td>
    </tr>
  `
    )
    .join("");

  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <title>Confirmación de Pedido - Selva Alta Roasters</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #110f0d; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f5f3f0;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #110f0d; padding: 32px 16px;">
        <tr>
          <td align="center">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #181512; border-radius: 12px; overflow: hidden; border: 1px solid #332c25;">
              <tr>
                <td style="padding: 28px 30px; border-bottom: 1px solid #332c25;">
                  <p style="color: #c25e1a; margin: 0 0 6px 0; font-family: monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em;">Selva Alta Roasters · 1.820 msnm</p>
                  <h1 style="color: #f5f3f0; margin: 0; font-size: 24px; font-weight: 700;">Pedido ${order.order_number} registrado</h1>
                </td>
              </tr>
              <tr>
                <td style="padding: 28px 30px;">
                  <p style="color: #f5f3f0; font-size: 16px; margin: 0 0 12px 0;">Hola ${order.customer_name},</p>
                  <p style="color: #b0a89e; font-size: 14px; line-height: 22px; margin: 0 0 20px 0;">
                    Hemos recibido tu solicitud de café Marsellesa Orgánico (87 puntos SCA). Un representante de Selva Alta se contactará en breve a tu correo o teléfono (${order.customer_phone}) para coordinar la entrega carbono neutral y el método de pago.
                  </p>

                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 24px;">
                    <thead>
                      <tr>
                        <th style="text-align: left; font-size: 11px; text-transform: uppercase; color: #7d746b; padding-bottom: 8px; border-bottom: 1px solid #332c25;">Formato</th>
                        <th style="text-align: center; font-size: 11px; text-transform: uppercase; color: #7d746b; padding-bottom: 8px; border-bottom: 1px solid #332c25;">Cant.</th>
                        <th style="text-align: right; font-size: 11px; text-transform: uppercase; color: #7d746b; padding-bottom: 8px; border-bottom: 1px solid #332c25;">Valor</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${itemsHtml}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colspan="2" style="padding-top: 12px; font-size: 13px; color: #b0a89e;">Subtotal</td>
                        <td style="padding-top: 12px; font-size: 13px; color: #f5f3f0; text-align: right; font-family: monospace;">$${order.subtotal.toLocaleString("es-CL")}</td>
                      </tr>
                      <tr>
                        <td colspan="2" style="padding-top: 6px; font-size: 13px; color: #b0a89e;">Despacho carbono neutral</td>
                        <td style="padding-top: 6px; font-size: 13px; color: #f5f3f0; text-align: right; font-family: monospace;">
                          ${order.shipping === 0 ? "Sin costo" : `$${order.shipping.toLocaleString("es-CL")}`}
                        </td>
                      </tr>
                      <tr>
                        <td colspan="2" style="padding-top: 12px; font-size: 15px; font-weight: 700; color: #c25e1a;">Total</td>
                        <td style="padding-top: 12px; font-size: 16px; font-weight: 700; color: #c25e1a; text-align: right; font-family: monospace;">$${order.total.toLocaleString("es-CL")}</td>
                      </tr>
                    </tfoot>
                  </table>

                  <div style="background-color: #241f1b; border-radius: 8px; padding: 14px 16px; border: 1px solid #332c25;">
                    <p style="margin: 0 0 4px 0; font-size: 11px; text-transform: uppercase; color: #7d746b; font-family: monospace;">Dirección de despacho</p>
                    <p style="margin: 0; font-size: 13px; color: #f5f3f0;">${order.customer_address}, ${order.customer_city}, ${order.customer_region}</p>
                    ${order.notes ? `<p style="margin: 6px 0 0 0; font-size: 12px; color: #b0a89e;">Indicaciones: ${order.notes}</p>` : ""}
                  </div>
                </td>
              </tr>
              <tr>
                <td style="background-color: #110f0d; padding: 18px 30px; text-align: center; border-top: 1px solid #332c25;">
                  <p style="margin: 0; font-size: 12px; color: #7d746b;">
                    Selva Alta Roasters SpA · Tingo María, Perú · Santiago de Chile · comercial@selvaalta.cl
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

/**
 * Generates the notification email sent internally to Selva Alta Roasters team.
 */
export function getOrderNotificationTemplate(order: EmailOrderData): string {
  const itemsList = order.items
    .map(
      (item) => `
      <li style="margin-bottom: 6px;">
        <strong>${item.quantity}x ${item.name}</strong>
        ${item.grind ? ` [Molienda: ${item.grind}]` : ""}
        ($${(item.price * item.quantity).toLocaleString("es-CL")})
      </li>
    `
    )
    .join("");

  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <title>Nuevo Pedido ${order.order_number}</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #110f0d; padding: 20px; color: #f5f3f0;">
      <div style="max-width: 600px; margin: 0 auto; background: #181512; border-radius: 10px; padding: 28px; border: 1px solid #c25e1a;">
        <p style="font-family: monospace; font-size: 11px; color: #c25e1a; text-transform: uppercase; margin: 0 0 6px 0;">Backend Mago de Oz · Nuevo Pedido</p>
        <h2 style="margin: 0 0 18px 0; font-size: 20px; color: #f5f3f0;">Orden ${order.order_number}</h2>

        <h3 style="font-size: 14px; color: #c25e1a; margin-bottom: 8px;">Datos del Comprador</h3>
        <ul style="line-height: 1.6; font-size: 14px; color: #f5f3f0; padding-left: 18px;">
          <li><strong>Nombre:</strong> ${order.customer_name}</li>
          <li><strong>Email:</strong> <a href="mailto:${order.customer_email}" style="color: #c25e1a;">${order.customer_email}</a></li>
          <li><strong>Teléfono:</strong> <a href="tel:${order.customer_phone}" style="color: #c25e1a;">${order.customer_phone}</a></li>
          <li><strong>Dirección:</strong> ${order.customer_address}, ${order.customer_city}, ${order.customer_region}</li>
          ${order.notes ? `<li><strong>Notas:</strong> ${order.notes}</li>` : ""}
        </ul>

        <h3 style="font-size: 14px; color: #c25e1a; border-top: 1px solid #332c25; padding-top: 14px; margin-top: 16px;">Detalle Solicitado</h3>
        <ul style="line-height: 1.6; font-size: 14px; color: #f5f3f0; padding-left: 18px;">
          ${itemsList}
        </ul>

        <div style="background-color: #241f1b; padding: 12px 16px; border-radius: 8px; margin-top: 18px; font-family: monospace; font-size: 14px; border: 1px solid #332c25;">
          <p style="margin: 0;">Subtotal: $${order.subtotal.toLocaleString("es-CL")}</p>
          <p style="margin: 4px 0;">Despacho: $${order.shipping.toLocaleString("es-CL")}</p>
          <p style="margin: 4px 0 0 0; font-size: 16px; font-weight: bold; color: #c25e1a;">Total a coordinar: $${order.total.toLocaleString("es-CL")}</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * Generates B2B notification to Selva Alta.
 */
export function getB2BNotificationTemplate(data: EmailB2BData): string {
  return `
    <div style="font-family: Arial, sans-serif; padding: 24px; max-width: 600px; margin: 0 auto; border: 1px solid #c25e1a; border-radius: 10px; background: #181512; color: #f5f3f0;">
      <p style="font-family: monospace; font-size: 11px; color: #c25e1a; text-transform: uppercase; margin: 0 0 6px 0;">Solicitud Comercial B2B · Barras y Oficinas</p>
      <h2 style="color: #f5f3f0; margin: 0 0 16px 0;">${data.company}</h2>
      <p><strong>Contacto:</strong> ${data.name}</p>
      <p><strong>Correo:</strong> <a href="mailto:${data.email}" style="color: #c25e1a;">${data.email}</a></p>
      ${data.phone ? `<p><strong>Teléfono:</strong> ${data.phone}</p>` : ""}
      ${data.volume ? `<p><strong>Volumen estimado:</strong> ${data.volume}</p>` : ""}
      ${data.grind ? `<p><strong>Molienda requerida:</strong> ${data.grind}</p>` : ""}
      <p><strong>Detalles adicionales:</strong></p>
      <blockquote style="background: #241f1b; padding: 12px; border-left: 3px solid #c25e1a; margin: 0; color: #b0a89e;">
        ${data.message || "Solicitud de información comercial y precios por volumen de Marsellesa 87 SCA."}
      </blockquote>
    </div>
  `;
}

/**
 * Generates B2B confirmation receipt to the lead.
 */
export function getB2BConfirmationTemplate(
  name: string,
  company: string
): string {
  return `
    <div style="font-family: Arial, sans-serif; padding: 28px; max-width: 600px; margin: 0 auto; border: 1px solid #332c25; border-radius: 10px; background: #181512; color: #f5f3f0;">
      <p style="font-family: monospace; font-size: 11px; color: #c25e1a; text-transform: uppercase; margin: 0 0 6px 0;">Selva Alta Roasters · 1.820 msnm</p>
      <h2 style="color: #f5f3f0; margin: 0 0 14px 0;">Solicitud comercial recibida</h2>
      <p style="color: #b0a89e; font-size: 14px; line-height: 1.6;">Hola <strong>${name}</strong> (${company}),</p>
      <p style="color: #b0a89e; font-size: 14px; line-height: 1.6;">
        Hemos recibido tu consulta sobre el lote Marsellesa Orgánico (87 puntos SCA). Un representante de Selva Alta se contactará en breve con la ficha técnica, escala de precios por volumen y opciones de muestra para tu barra u oficina.
      </p>
      <hr style="border: 0; border-top: 1px solid #332c25; margin: 20px 0;">
      <p style="font-size: 12px; color: #7d746b; margin: 0;">
        Selva Alta Roasters SpA · Tingo María, Perú · Santiago de Chile · comercial@selvaalta.cl
      </p>
    </div>
  `;
}

/**
 * Generates waitlist welcome email.
 */
export function getWaitlistWelcomeTemplate(
  email: string,
  name?: string
): string {
  return `
    <div style="font-family: Arial, sans-serif; padding: 28px; max-width: 600px; margin: 0 auto; border: 1px solid #332c25; border-radius: 10px; background: #181512; color: #f5f3f0;">
      <p style="font-family: monospace; font-size: 11px; color: #c25e1a; text-transform: uppercase; margin: 0 0 6px 0;">Selva Alta Roasters · Tingo María</p>
      <h2 style="color: #f5f3f0; margin: 0 0 14px 0;">Registro de contacto confirmado</h2>
      <p style="color: #b0a89e; font-size: 14px; line-height: 1.6;">Hola${name ? ` ${name}` : ""},</p>
      <p style="color: #b0a89e; font-size: 14px; line-height: 1.6;">
        Hemos registrado tu correo (${email}). Un representante te enviará los detalles de disponibilidad del lote Marsellesa Orgánico (87 puntos SCA) y opciones de entrega carbono neutral.
      </p>
    </div>
  `;
}
