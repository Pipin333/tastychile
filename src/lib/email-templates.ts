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
 * Generates the HTML email for the customer order confirmation in the Selva Nubosa & Pergamino palette.
 */
export function getOrderConfirmationTemplate(order: EmailOrderData): string {
  const itemsHtml = order.items
    .map(
      (item) => `
    <tr>
      <td style="padding: 12px 0; border-bottom: 1px solid #DFD3C3; font-size: 14px; color: #2A1B12;">
        <strong>${item.name}</strong>
        ${item.grind ? `<span style="display: block; font-size: 12px; color: #9E2A2B; font-weight: 600; margin-top: 2px;">Preparación: ${item.grind}</span>` : ""}
        ${item.detail ? `<span style="display: block; font-size: 12px; color: #6E5D4F;">${item.detail}</span>` : ""}
      </td>
      <td style="padding: 12px 0; border-bottom: 1px solid #DFD3C3; font-size: 14px; color: #2A1B12; text-align: center; font-family: monospace;">
        ${item.quantity}
      </td>
      <td style="padding: 12px 0; border-bottom: 1px solid #DFD3C3; font-size: 14px; color: #2A1B12; text-align: right; font-weight: bold; font-family: monospace;">
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
    <body style="margin: 0; padding: 0; background-color: #FAF6F0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #2A1B12;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #FAF6F0; padding: 32px 16px;">
        <tr>
          <td align="center">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #FFFDF9; border-radius: 16px; overflow: hidden; border: 1px solid #DFD3C3;">
              <tr>
                <td style="background-color: #143326; padding: 28px 30px;">
                  <p style="color: #A9BFA8; margin: 0 0 6px 0; font-family: monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em;">Selva Alta Roasters · Tingo María, Perú (1.820 msnm)</p>
                  <h1 style="color: #FAF6F0; margin: 0; font-size: 24px; font-weight: 700;">Pedido ${order.order_number} recibido</h1>
                </td>
              </tr>
              <tr>
                <td style="padding: 28px 30px;">
                  <p style="color: #143326; font-size: 16px; font-weight: 700; margin: 0 0 12px 0;">¡Hola ${order.customer_name}!</p>
                  <p style="color: #4A3F35; font-size: 14px; line-height: 22px; margin: 0 0 20px 0;">
                    Recibimos tu pedido de café <strong>Marsellesa Orgánico (87.0 puntos SCA)</strong>. Un representante de Selva Alta se contactará contigo en breve al teléfono <strong>${order.customer_phone}</strong> o a este correo para coordinar el pago y el despacho.
                  </p>

                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 24px;">
                    <thead>
                      <tr>
                        <th style="text-align: left; font-size: 11px; text-transform: uppercase; color: #6E5D4F; padding-bottom: 8px; border-bottom: 1px solid #DFD3C3;">Formato</th>
                        <th style="text-align: center; font-size: 11px; text-transform: uppercase; color: #6E5D4F; padding-bottom: 8px; border-bottom: 1px solid #DFD3C3;">Cant.</th>
                        <th style="text-align: right; font-size: 11px; text-transform: uppercase; color: #6E5D4F; padding-bottom: 8px; border-bottom: 1px solid #DFD3C3;">Valor</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${itemsHtml}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colspan="2" style="padding-top: 12px; font-size: 13px; color: #4A3F35;">Subtotal</td>
                        <td style="padding-top: 12px; font-size: 13px; color: #2A1B12; text-align: right; font-family: monospace;">$${order.subtotal.toLocaleString("es-CL")}</td>
                      </tr>
                      <tr>
                        <td colspan="2" style="padding-top: 6px; font-size: 13px; color: #4A3F35;">Despacho</td>
                        <td style="padding-top: 6px; font-size: 13px; color: #1E4D38; font-weight: 600; text-align: right; font-family: monospace;">
                          ${order.shipping === 0 ? "Gratis en Santiago ($0)" : `$${order.shipping.toLocaleString("es-CL")}`}
                        </td>
                      </tr>
                      <tr>
                        <td colspan="2" style="padding-top: 12px; font-size: 15px; font-weight: 700; color: #9E2A2B;">Total del pedido</td>
                        <td style="padding-top: 12px; font-size: 16px; font-weight: 700; color: #9E2A2B; text-align: right; font-family: monospace;">$${order.total.toLocaleString("es-CL")}</td>
                      </tr>
                    </tfoot>
                  </table>

                  <div style="background-color: #F3ECE1; border-radius: 10px; padding: 14px 16px; border: 1px solid #DFD3C3;">
                    <p style="margin: 0 0 4px 0; font-size: 11px; text-transform: uppercase; color: #6E5D4F; font-family: monospace;">Dirección de entrega</p>
                    <p style="margin: 0; font-size: 13px; color: #2A1B12; font-weight: 600;">${order.customer_address}, ${order.customer_city}, ${order.customer_region}</p>
                    ${order.notes ? `<p style="margin: 6px 0 0 0; font-size: 12px; color: #4A3F35;">Notas: ${order.notes}</p>` : ""}
                  </div>
                </td>
              </tr>
              <tr>
                <td style="background-color: #F3ECE1; padding: 18px 30px; text-align: center; border-top: 1px solid #DFD3C3;">
                  <p style="margin: 0; font-size: 12px; color: #6E5D4F;">
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
        ${item.grind ? ` [Preparación: ${item.grind}]` : ""}
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
    <body style="font-family: Arial, sans-serif; background-color: #FAF6F0; padding: 20px; color: #2A1B12;">
      <div style="max-width: 600px; margin: 0 auto; background: #FFFDF9; border-radius: 12px; padding: 28px; border: 2px solid #143326;">
        <p style="font-family: monospace; font-size: 11px; color: #9E2A2B; font-weight: bold; text-transform: uppercase; margin: 0 0 6px 0;">Selva Alta · Nuevo Pedido Web</p>
        <h2 style="margin: 0 0 18px 0; font-size: 22px; color: #143326;">Orden ${order.order_number}</h2>

        <h3 style="font-size: 14px; color: #143326; margin-bottom: 8px;">Datos del Cliente</h3>
        <ul style="line-height: 1.6; font-size: 14px; color: #2A1B12; padding-left: 18px;">
          <li><strong>Nombre:</strong> ${order.customer_name}</li>
          <li><strong>Email:</strong> <a href="mailto:${order.customer_email}" style="color: #9E2A2B;">${order.customer_email}</a></li>
          <li><strong>Teléfono / WhatsApp:</strong> <a href="tel:${order.customer_phone}" style="color: #9E2A2B;">${order.customer_phone}</a></li>
          <li><strong>Dirección:</strong> ${order.customer_address}, ${order.customer_city}, ${order.customer_region}</li>
          ${order.notes ? `<li><strong>Notas:</strong> ${order.notes}</li>` : ""}
        </ul>

        <h3 style="font-size: 14px; color: #143326; border-top: 1px solid #DFD3C3; padding-top: 14px; margin-top: 16px;">Detalle del Pedido</h3>
        <ul style="line-height: 1.6; font-size: 14px; color: #2A1B12; padding-left: 18px;">
          ${itemsList}
        </ul>

        <div style="background-color: #F3ECE1; padding: 12px 16px; border-radius: 8px; margin-top: 18px; font-family: monospace; font-size: 14px; border: 1px solid #DFD3C3;">
          <p style="margin: 0;">Subtotal: $${order.subtotal.toLocaleString("es-CL")}</p>
          <p style="margin: 4px 0;">Despacho: $${order.shipping.toLocaleString("es-CL")}</p>
          <p style="margin: 4px 0 0 0; font-size: 16px; font-weight: bold; color: #9E2A2B;">Total a cobrar: $${order.total.toLocaleString("es-CL")}</p>
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
    <div style="font-family: Arial, sans-serif; padding: 24px; max-width: 600px; margin: 0 auto; border: 2px solid #143326; border-radius: 12px; background: #FFFDF9; color: #2A1B12;">
      <p style="font-family: monospace; font-size: 11px; color: #9E2A2B; font-weight: bold; text-transform: uppercase; margin: 0 0 6px 0;">Solicitud Cafeterías y Oficinas (B2B)</p>
      <h2 style="color: #143326; margin: 0 0 16px 0;">${data.company}</h2>
      <p><strong>Contacto:</strong> ${data.name}</p>
      <p><strong>Correo:</strong> <a href="mailto:${data.email}" style="color: #9E2A2B;">${data.email}</a></p>
      ${data.phone ? `<p><strong>Teléfono:</strong> ${data.phone}</p>` : ""}
      ${data.volume ? `<p><strong>Formato de interés:</strong> ${data.volume}</p>` : ""}
      ${data.grind ? `<p><strong>Preparación / Molienda:</strong> ${data.grind}</p>` : ""}
      <p><strong>Mensaje:</strong></p>
      <blockquote style="background: #F3ECE1; padding: 12px; border-left: 3px solid #9E2A2B; margin: 0; color: #4A3F35;">
        ${data.message || "Solicitud de muestras y precios mayoristas de Marsellesa Orgánico 87 SCA."}
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
    <div style="font-family: Arial, sans-serif; padding: 28px; max-width: 600px; margin: 0 auto; border: 1px solid #DFD3C3; border-radius: 12px; background: #FFFDF9; color: #2A1B12;">
      <p style="font-family: monospace; font-size: 11px; color: #1E4D38; font-weight: bold; text-transform: uppercase; margin: 0 0 6px 0;">Selva Alta Roasters · Tingo María, Perú</p>
      <h2 style="color: #143326; margin: 0 0 14px 0;">Recibimos tu consulta comercial</h2>
      <p style="color: #4A3F35; font-size: 14px; line-height: 1.6;">Hola <strong>${name}</strong> (${company}),</p>
      <p style="color: #4A3F35; font-size: 14px; line-height: 1.6;">
        Muchas gracias por escribirnos. Nuestro equipo revisará tu requerimiento y se pondrá en contacto contigo en breve para coordinar muestras o entrega de nuestro lote <strong>Marsellesa Orgánico (87.0 puntos SCA)</strong>.
      </p>
      <hr style="border: 0; border-top: 1px solid #DFD3C3; margin: 20px 0;">
      <p style="font-size: 12px; color: #6E5D4F; margin: 0;">
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
    <div style="font-family: Arial, sans-serif; padding: 28px; max-width: 600px; margin: 0 auto; border: 1px solid #DFD3C3; border-radius: 12px; background: #FFFDF9; color: #2A1B12;">
      <p style="font-family: monospace; font-size: 11px; color: #1E4D38; font-weight: bold; text-transform: uppercase; margin: 0 0 6px 0;">Selva Alta Roasters · Tingo María</p>
      <h2 style="color: #143326; margin: 0 0 14px 0;">¡Gracias por contactarnos!</h2>
      <p style="color: #4A3F35; font-size: 14px; line-height: 1.6;">Hola${name ? ` ${name}` : ""},</p>
      <p style="color: #4A3F35; font-size: 14px; line-height: 1.6;">
        Recibimos tu correo (${email}). En breve te compartiremos las novedades de nuestra cosecha familiar Marsellesa Orgánico (87.0 puntos SCA).
      </p>
    </div>
  `;
}
