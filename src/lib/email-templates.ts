export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  emoji: string;
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
      <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-size: 14px; color: #1f2937;">
        <span style="font-size: 18px; margin-right: 8px;">${item.emoji}</span>
        <strong>${item.name}</strong>
        ${item.grind ? `<span style="display: block; font-size: 12px; color: #78350f; margin-left: 26px;">Molienda: ${item.grind}</span>` : ''}
        ${item.detail ? `<span style="display: block; font-size: 12px; color: #6b7280; margin-left: 26px;">${item.detail}</span>` : ''}
      </td>
      <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-size: 14px; color: #1f2937; text-align: center;">
        ${item.quantity}
      </td>
      <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-size: 14px; color: #1f2937; text-align: right; font-weight: bold;">
        $${(item.price * item.quantity).toLocaleString('es-CL')}
      </td>
    </tr>
  `
    )
    .join('');

  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <title>Confirmación de Pedido - Selva Alta Roasters</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #fafaf9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1c1917;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #fafaf9; padding: 30px 15px;">
        <tr>
          <td align="center">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.06); border: 1px solid #e7e5e4;">
              <!-- Header -->
              <tr>
                <td style="background-color: #78350f; padding: 36px 30px; text-align: center;">
                  <h1 style="color: #ffffff; margin: 0; font-size: 26px; font-weight: 800; letter-spacing: -0.02em;">Selva Alta Roasters</h1>
                  <p style="color: #fde68a; margin: 6px 0 0 0; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em;">Café de Especialidad · Amazonía Peruana</p>
                </td>
              </tr>
              <!-- Notice Highlight -->
              <tr>
                <td style="background-color: #fef3c7; padding: 18px 24px; border-bottom: 1px solid #fde68a; text-align: center;">
                  <p style="margin: 0; font-size: 15px; color: #92400e; font-weight: 700;">
                    ⏳ ¡Pedido recibido con éxito! Un representante se contactará contigo a la brevedad.
                  </p>
                </td>
              </tr>
              <!-- Content -->
              <tr>
                <td style="padding: 32px 30px;">
                  <h2 style="color: #292524; margin: 0 0 12px 0; font-size: 20px;">¡Hola, ${order.customer_name}!</h2>
                  <p style="color: #57534e; font-size: 15px; line-height: 24px; margin: 0 0 24px 0;">
                    Hemos registrado tu pedido con el código <strong>${order.order_number}</strong>. En Selva Alta tostamos a pedido para garantizar que recibas granos en su punto óptimo de frescura.
                  </p>

                  <div style="background-color: #f5f5f4; border-radius: 12px; padding: 18px; margin-bottom: 24px; border: 1px solid #e7e5e4;">
                    <p style="margin: 0 0 8px 0; font-size: 14px; font-weight: bold; color: #78350f;">Próximo paso:</p>
                    <p style="margin: 0; font-size: 14px; color: #44403c; line-height: 20px;">
                      Nuestro equipo revisará tu orden y <strong>te escribirá o llamará a tu teléfono (${order.customer_phone})</strong> para coordinar la fecha exacta de entrega y el método de pago más cómodo (transferencia bancaria o enlace seguro).
                    </p>
                  </div>

                  <!-- Details Table -->
                  <h3 style="color: #292524; margin: 0 0 12px 0; font-size: 16px; border-bottom: 2px solid #78350f; padding-bottom: 6px;">Resumen del Pedido</h3>
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 24px;">
                    <thead>
                      <tr>
                        <th style="text-align: left; font-size: 12px; text-transform: uppercase; color: #78716c; padding-bottom: 8px;">Variedad</th>
                        <th style="text-align: center; font-size: 12px; text-transform: uppercase; color: #78716c; padding-bottom: 8px;">Cant.</th>
                        <th style="text-align: right; font-size: 12px; text-transform: uppercase; color: #78716c; padding-bottom: 8px;">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${itemsHtml}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colspan="2" style="padding-top: 12px; font-size: 14px; color: #57534e;">Subtotal</td>
                        <td style="padding-top: 12px; font-size: 14px; color: #292524; text-align: right;">$${order.subtotal.toLocaleString('es-CL')}</td>
                      </tr>
                      <tr>
                        <td colspan="2" style="padding-top: 6px; font-size: 14px; color: #57534e;">Despacho</td>
                        <td style="padding-top: 6px; font-size: 14px; color: #15803d; text-align: right; font-weight: 600;">
                          ${order.shipping === 0 ? 'Gratis' : `$${order.shipping.toLocaleString('es-CL')}`}
                        </td>
                      </tr>
                      <tr>
                        <td colspan="2" style="padding-top: 12px; font-size: 16px; font-weight: 800; color: #78350f; border-top: 2px solid #e7e5e4;">Total a Pagar</td>
                        <td style="padding-top: 12px; font-size: 18px; font-weight: 800; color: #78350f; text-align: right; border-top: 2px solid #e7e5e4;">$${order.total.toLocaleString('es-CL')}</td>
                      </tr>
                    </tfoot>
                  </table>

                  <!-- Shipping Address -->
                  <div style="background-color: #fafaf9; border-radius: 12px; padding: 16px; border: 1px solid #e7e5e4; margin-bottom: 24px;">
                    <h4 style="margin: 0 0 8px 0; font-size: 13px; text-transform: uppercase; color: #78716c;">Dirección de Entrega</h4>
                    <p style="margin: 0; font-size: 14px; color: #292524;">${order.customer_address}, ${order.customer_city}, ${order.customer_region}</p>
                    ${order.notes ? `<p style="margin: 6px 0 0 0; font-size: 13px; color: #78716c;"><em>Notas: "${order.notes}"</em></p>` : ''}
                  </div>

                  <!-- Direct WhatsApp Contact Button -->
                  <div style="text-align: center; margin-top: 28px;">
                    <a href="https://wa.me/56900000000?text=${encodeURIComponent(`Hola Selva Alta, realicé el pedido ${order.order_number} por un total de $${order.total.toLocaleString('es-CL')}.`)}" 
                       style="display: inline-block; background-color: #15803d; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 14px; padding: 12px 24px; border-radius: 10px;">
                      💬 ¿Dudas? Escríbenos directamente a WhatsApp
                    </a>
                  </div>
                </td>
              </tr>
              <!-- Footer -->
              <tr>
                <td style="background-color: #f5f5f4; padding: 20px 30px; text-align: center; border-top: 1px solid #e7e5e4;">
                  <p style="margin: 0; font-size: 12px; color: #78716c;">
                    © ${new Date().getFullYear()} Selva Alta Roasters SpA. Huánuco, Perú · Santiago de Chile.
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
  const cleanPhone = order.customer_phone.replace(/\D/g, '');
  const waUrl = `https://wa.me/${cleanPhone.startsWith('56') ? cleanPhone : '56' + cleanPhone}?text=${encodeURIComponent(`Hola ${order.customer_name}, te contactamos de Selva Alta Roasters respecto a tu pedido ${order.order_number}.`)}`;

  const itemsList = order.items
    .map(
      (item) => `
      <li style="margin-bottom: 6px;">
        <strong>${item.quantity}x ${item.name}</strong> 
        ${item.grind ? `<span style="color: #78350f;">[Molienda: ${item.grind}]</span>` : ''} 
        — $${(item.price * item.quantity).toLocaleString('es-CL')}
      </li>
    `
    )
    .join('');

  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <title>🚨 NUEVO PEDIDO MAGO DE OZ</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f5f5f4; padding: 20px; color: #1c1917;">
      <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; padding: 30px; border: 2px solid #78350f;">
        <div style="background-color: #78350f; color: #ffffff; padding: 12px 18px; border-radius: 8px; margin-bottom: 20px; text-align: center;">
          <h2 style="margin: 0; font-size: 20px;">🚨 NUEVO PEDIDO ${order.order_number}</h2>
          <p style="margin: 4px 0 0 0; font-size: 13px; color: #fde68a;">Acción requerida: Contactar al cliente para coordinar entrega</p>
        </div>

        <h3 style="margin-top: 0; color: #78350f;">Datos del Cliente:</h3>
        <ul style="line-height: 1.6; font-size: 15px;">
          <li><strong>Nombre:</strong> ${order.customer_name}</li>
          <li><strong>Email:</strong> <a href="mailto:${order.customer_email}">${order.customer_email}</a></li>
          <li><strong>Teléfono:</strong> <a href="tel:${order.customer_phone}">${order.customer_phone}</a></li>
          <li><strong>Dirección:</strong> ${order.customer_address}, ${order.customer_city}, ${order.customer_region}</li>
          ${order.notes ? `<li><strong>Notas del cliente:</strong> <em>${order.notes}</em></li>` : ''}
        </ul>

        <div style="margin: 20px 0;">
          <a href="${waUrl}" style="display: inline-block; background-color: #22c55e; color: #ffffff; padding: 12px 20px; border-radius: 8px; font-weight: bold; text-decoration: none;">
            📲 Abrir chat de WhatsApp con el Cliente
          </a>
        </div>

        <h3 style="color: #78350f; border-top: 1px solid #e7e5e4; padding-top: 15px;">Productos Solicitados:</h3>
        <ul style="line-height: 1.6; font-size: 15px;">
          ${itemsList}
        </ul>

        <div style="background-color: #fef3c7; padding: 12px 16px; border-radius: 8px; margin-top: 20px; font-size: 16px;">
          <p style="margin: 0;"><strong>Subtotal:</strong> $${order.subtotal.toLocaleString('es-CL')}</p>
          <p style="margin: 4px 0;"><strong>Despacho:</strong> $${order.shipping.toLocaleString('es-CL')}</p>
          <p style="margin: 4px 0 0 0; font-size: 18px; font-weight: bold; color: #92400e;"><strong>Total a Cobrar:</strong> $${order.total.toLocaleString('es-CL')}</p>
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
    <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto; border: 1px solid #e7e5e4; border-radius: 12px;">
      <h2 style="color: #78350f;">💼 Nueva Solicitud B2B (Empresas / Cafeterías)</h2>
      <p><strong>Nombre:</strong> ${data.name}</p>
      <p><strong>Empresa / Local:</strong> ${data.company}</p>
      <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
      ${data.phone ? `<p><strong>Teléfono:</strong> ${data.phone}</p>` : ''}
      <p><strong>Mensaje / Requerimiento:</strong></p>
      <blockquote style="background: #f5f5f4; padding: 12px; border-left: 4px solid #78350f; margin: 0;">
        ${data.message || 'Sin mensaje adicional'}
      </blockquote>
      <p style="margin-top: 20px; font-size: 13px; color: #78716c;">Responder directamente a ${data.email}.</p>
    </div>
  `;
}

/**
 * Generates B2B confirmation receipt to the lead.
 */
export function getB2BConfirmationTemplate(name: string, company: string): string {
  return `
    <div style="font-family: Arial, sans-serif; padding: 25px; max-width: 600px; margin: 0 auto; border: 1px solid #e7e5e4; border-radius: 12px; background: #ffffff;">
      <h2 style="color: #78350f; margin-top: 0;">Selva Alta Roasters · Soluciones Corporativas</h2>
      <p>Hola <strong>${name}</strong> (${company}),</p>
      <p>Hemos recibido tu solicitud de contacto comercial y muestras de café de especialidad.</p>
      <p>Un representante de nuestro equipo comercial te contactará a la brevedad con nuestra lista de precios por volumen, fichas técnicas y opciones de degustación.</p>
      <hr style="border: 0; border-top: 1px solid #e7e5e4; margin: 20px 0;">
      <p style="font-size: 13px; color: #78716c;">
        Selva Alta Roasters SpA · Huánuco, Perú · Santiago de Chile.<br>
        Contacto directo: <a href="mailto:comercial@selvaalta.cl" style="color: #78350f;">comercial@selvaalta.cl</a>
      </p>
    </div>
  `;
}

/**
 * Generates waitlist welcome email.
 */
export function getWaitlistWelcomeTemplate(email: string, name?: string): string {
  return `
    <div style="font-family: Arial, sans-serif; padding: 25px; max-width: 600px; margin: 0 auto; border: 1px solid #e7e5e4; border-radius: 12px; background: #ffffff;">
      <h2 style="color: #78350f; margin-top: 0;">☕ ¡Bienvenido a Selva Alta Club!</h2>
      <p>Hola${name ? ` ${name}` : ''},</p>
      <p>Te has suscrito con éxito a nuestra lista de espera y boletín de café de especialidad.</p>
      <p>Serás de los primeros en enterarte de nuevos tuestes frescos, microlotes exclusivos de altura (como Marsellesa y Geisha de Huánuco) y promociones de lanzamiento.</p>
      <hr style="border: 0; border-top: 1px solid #e7e5e4; margin: 20px 0;">
      <p style="font-size: 12px; color: #78716c;">Selva Alta Roasters SpA · Tueste fresco de especialidad.</p>
    </div>
  `;
}
