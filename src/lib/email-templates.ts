export interface EmailOrderData {
  order_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  customer_address?: string;
  customer_city?: string;
  customer_region?: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    emoji: string;
    detail?: string;
  }>;
  subtotal: number;
  shipping: number;
  total: number;
  payment_status: string;
  payment_id?: string;
  notes?: string;
}

export function getOrderConfirmationTemplate(order: EmailOrderData): string {
  const itemsHtml = order.items
    .map(
      (item) => `
    <tr>
      <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-size: 14px; color: #1f2937;">
        <span style="font-size: 18px; margin-right: 8px;">${item.emoji}</span>
        <strong>${item.name}</strong> ${item.detail ? `<span style="font-size: 12px; color: #6b7280; display: block; margin-left: 26px;">${item.detail}</span>` : ''}
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
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Confirmación de Pedido - Selva Alta Roasters</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f9fafb; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; -webkit-font-smoothing: antialiased;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f9fafb; padding: 40px 20px;">
        <tr>
          <td align="center">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
              <!-- Header -->
              <tr>
                <td style="background-color: #78350f; padding: 40px 30px; text-align: center;">
                  <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 800; letter-spacing: -0.025em;">Selva Alta Roasters</h1>
                  <p style="color: #fde68a; margin: 8px 0 0 0; font-size: 14px; font-weight: 600; text-transform: uppercase; tracking: 0.1em;">Confirmación de Pedido</p>
                </td>
              </tr>
              <!-- Body -->
              <tr>
                <td style="padding: 40px 30px;">
                  <h2 style="color: #111827; margin: 0 0 16px 0; font-size: 20px; font-weight: 700;">¡Gracias por tu compra, ${order.customer_name}!</h2>
                  <p style="color: #4b5563; font-size: 16px; line-height: 24px; margin: 0 0 24px 0;">
                    Hemos recibido tu pedido y ya estamos preparando tus granos para que los disfrutes frescos. A continuación, tienes los detalles del pedido:
                  </p>
                  
                  <!-- Info Box -->
                  <div style="background-color: #fef3c7; border: 1px solid #fcd34d; border-radius: 12px; padding: 20px; margin-bottom: 30px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td style="font-size: 14px; color: #78350f; font-weight: bold; padding-bottom: 4px;">Número de Pedido:</td>
                        <td style="font-size: 14px; color: #111827; font-weight: bold; text-align: right; padding-bottom: 4px;">${order.order_number}</td>
                      </tr>
                      <tr>
                        <td style="font-size: 14px; color: #78350f; font-weight: bold; padding-bottom: 4px;">Estado de Pago:</td>
                        <td style="font-size: 14px; color: #111827; font-weight: bold; text-align: right; padding-bottom: 4px;">
                          ${order.payment_status === 'approved' ? '✅ Aprobado (Mercado Pago)' : '⏳ Pendiente'}
                        </td>
                      </tr>
                      ${order.payment_id ? `
                      <tr>
                        <td style="font-size: 14px; color: #78350f; padding-bottom: 4px;">ID de Transacción:</td>
                        <td style="font-size: 14px; color: #4b5563; text-align: right; padding-bottom: 4px;">${order.payment_id}</td>
                      </tr>` : ''}
                    </table>
                  </div>

                  <!-- Details Table -->
                  <h3 style="color: #111827; margin: 0 0 12px 0; font-size: 16px; font-weight: 700; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px;">Detalle del Pedido</h3>
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 24px;">
                    <thead>
                      <tr>
                        <th align="left" style="padding-bottom: 8px; font-size: 12px; text-transform: uppercase; color: #6b7280; font-weight: 600;">Producto</th>
                        <th align="center" style="padding-bottom: 8px; font-size: 12px; text-transform: uppercase; color: #6b7280; font-weight: 600; width: 60px;">Cant.</th>
                        <th align="right" style="padding-bottom: 8px; font-size: 12px; text-transform: uppercase; color: #6b7280; font-weight: 600; width: 100px;">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${itemsHtml}
                    </tbody>
                  </table>

                  <!-- Totals -->
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 30px;">
                    <tr>
                      <td style="padding: 6px 0; font-size: 14px; color: #4b5563;">Subtotal:</td>
                      <td align="right" style="padding: 6px 0; font-size: 14px; color: #1f2937;">$${order.subtotal.toLocaleString('es-CL')}</td>
                    </tr>
                    <tr>
                      <td style="padding: 6px 0; font-size: 14px; color: #4b5563;">Envío:</td>
                      <td align="right" style="padding: 6px 0; font-size: 14px; color: #1f2937;">
                        ${order.shipping === 0 ? 'Gratis' : `$${order.shipping.toLocaleString('es-CL')}`}
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 12px 0; font-size: 16px; color: #111827; font-weight: bold; border-top: 1.5px solid #e5e7eb;">Total:</td>
                      <td align="right" style="padding: 12px 0; font-size: 18px; color: #78350f; font-weight: 850; border-top: 1.5px solid #e5e7eb;">
                        $${order.total.toLocaleString('es-CL')}
                      </td>
                    </tr>
                  </table>

                  <!-- Delivery info -->
                  ${order.customer_address ? `
                  <h3 style="color: #111827; margin: 0 0 12px 0; font-size: 16px; font-weight: 700; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px;">Dirección de Despacho</h3>
                  <p style="color: #4b5563; font-size: 14px; line-height: 20px; margin: 0 0 30px 0;">
                    <strong>${order.customer_name}</strong><br>
                    ${order.customer_address}<br>
                    ${order.customer_city}, ${order.customer_region}<br>
                    Teléfono: ${order.customer_phone || 'No especificado'}
                  </p>
                  ` : ''}

                  <!-- Next Steps / Support -->
                  <div style="border-top: 1px solid #e5e7eb; padding-top: 24px;">
                    <p style="color: #6b7280; font-size: 12px; line-height: 18px; margin: 0; text-align: center;">
                      ¿Tienes alguna duda sobre tu despacho o pedido? Escríbenos directamente respondiendo a este correo o contáctanos a <a href="mailto:comercial@selvaalta.cl" style="color: #78350f; font-weight: bold; text-decoration: underline;">comercial@selvaalta.cl</a>.
                    </p>
                  </div>
                </td>
              </tr>
              <!-- Footer -->
              <tr>
                <td style="background-color: #f3f4f6; padding: 24px 30px; text-align: center;">
                  <p style="color: #9ca3af; margin: 0; font-size: 12px;">
                    © ${new Date().getFullYear()} Selva Alta Roasters SpA. Santiago, Chile.
                  </p>
                  <p style="color: #9ca3af; margin: 6px 0 0 0; font-size: 11px;">
                    Si no deseas recibir correos futuros, puedes <a href="{{unsubscribe_url}}" style="color: #6b7280; text-decoration: underline;">desuscribirte aquí</a>.
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

export function getOrderNotificationTemplate(order: EmailOrderData): string {
  const itemsHtml = order.items
    .map(
      (item) => `
    <tr>
      <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-size: 14px;">
        ☕ <strong>${item.name}</strong> ${item.detail ? `(${item.detail})` : ''}
      </td>
      <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-size: 14px; text-align: center;">
        ${item.quantity}
      </td>
      <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-size: 14px; text-align: right; font-weight: bold;">
        $${(item.price * item.quantity).toLocaleString('es-CL')}
      </td>
    </tr>
  `
    )
    .join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Nuevo Pedido - Selva Alta Roasters</title>
    </head>
    <body style="font-family: sans-serif; color: #333; line-height: 1.5; padding: 20px; background-color: #f4f4f5;">
      <div style="max-width: 600px; margin: 0 auto; background: #fff; border-radius: 8px; padding: 30px; border: 1px solid #e4e4e7;">
        <h2 style="color: #78350f; border-bottom: 2px solid #78350f; padding-bottom: 10px; margin-top: 0;">🚨 ¡NUEVO PEDIDO RECIBIDO!</h2>
        
        <p>Se ha registrado el pedido <strong>${order.order_number}</strong> en la tienda.</p>
        
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; background-color: #fef3c7; padding: 15px; border-radius: 6px; border: 1px solid #fcd34d;">
          <tr>
            <td style="padding: 6px; font-weight: bold; width: 150px;">Cliente:</td>
            <td style="padding: 6px;">${order.customer_name}</td>
          </tr>
          <tr>
            <td style="padding: 6px; font-weight: bold;">Email:</td>
            <td style="padding: 6px;"><a href="mailto:${order.customer_email}">${order.customer_email}</a></td>
          </tr>
          <tr>
            <td style="padding: 6px; font-weight: bold;">Teléfono:</td>
            <td style="padding: 6px;">${order.customer_phone || 'No provisto'}</td>
          </tr>
          <tr>
            <td style="padding: 6px; font-weight: bold;">Estado de Pago:</td>
            <td style="padding: 6px; font-weight: bold; color: ${order.payment_status === 'approved' ? '#16a34a' : '#d97706'}">
              ${order.payment_status === 'approved' ? 'PAGADO (Mercado Pago)' : 'PENDIENTE'}
            </td>
          </tr>
          ${order.payment_id ? `
          <tr>
            <td style="padding: 6px; font-weight: bold;">ID Pago MP:</td>
            <td style="padding: 6px;">${order.payment_id}</td>
          </tr>` : ''}
        </table>

        <h3 style="color: #78350f;">Dirección de Despacho</h3>
        <p style="background: #f4f4f5; padding: 12px; border-radius: 6px; font-size: 14px;">
          ${order.customer_address || 'No provista (Retiro/digital)'}<br>
          ${order.customer_city || ''}, ${order.customer_region || ''}
        </p>

        ${order.notes ? `
        <h3 style="color: #78350f;">Notas del Cliente</h3>
        <p style="background: #f4f4f5; padding: 12px; border-radius: 6px; font-size: 14px; font-style: italic;">
          "${order.notes}"
        </p>` : ''}

        <h3 style="color: #78350f; border-bottom: 1px solid #e4e4e7; padding-bottom: 6px;">Productos</h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <thead>
            <th align="left" style="font-size: 12px; color: #71717a; text-transform: uppercase;">Item</th>
            <th align="center" style="font-size: 12px; color: #71717a; text-transform: uppercase; width: 60px;">Cant</th>
            <th align="right" style="font-size: 12px; color: #71717a; text-transform: uppercase; width: 100px;">Total</th>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>

        <div style="text-align: right; font-size: 16px; margin-top: 20px; font-weight: bold;">
          <p style="margin: 4px 0;">Subtotal: $${order.subtotal.toLocaleString('es-CL')}</p>
          <p style="margin: 4px 0;">Envío: $${order.shipping.toLocaleString('es-CL')}</p>
          <p style="margin: 10px 0 0 0; font-size: 20px; color: #78350f;">TOTAL A FACTURAR: $${order.total.toLocaleString('es-CL')}</p>
        </div>

        <p style="font-size: 12px; color: #71717a; text-align: center; margin-top: 40px; border-top: 1px solid #e4e4e7; padding-top: 20px;">
          Selva Alta Roasters SpA Notification Engine
        </p>
      </div>
    </body>
    </html>
  `;
}

export interface EmailB2BData {
  name: string;
  company: string;
  email: string;
  message: string;
}

export function getB2BNotificationTemplate(data: EmailB2BData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Nuevo Lead B2B - Selva Alta</title>
    </head>
    <body style="font-family: sans-serif; color: #333; padding: 20px; background-color: #f4f4f5;">
      <div style="max-width: 600px; margin: 0 auto; background: #fff; border-radius: 8px; padding: 30px; border: 1px solid #e4e4e7;">
        <h2 style="color: #78350f; border-bottom: 2px solid #78350f; padding-bottom: 10px; margin-top: 0;">💼 Nuevo Lead B2B / Empresa</h2>
        <p>Se ha registrado una nueva solicitud de información corporativa:</p>
        
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; background-color: #f4f4f5; padding: 15px; border-radius: 6px;">
          <tr>
            <td style="padding: 8px; font-weight: bold; width: 120px;">Nombre:</td>
            <td style="padding: 8px;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold;">Empresa:</td>
            <td style="padding: 8px;">${data.company}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold;">Email:</td>
            <td style="padding: 8px;"><a href="mailto:${data.email}">${data.email}</a></td>
          </tr>
        </table>

        <h3 style="color: #78350f;">Mensaje o Consulta:</h3>
        <p style="background: #fffbeb; border: 1px solid #fde68a; padding: 15px; border-radius: 6px; font-style: italic; white-space: pre-wrap;">
          "${data.message || 'Sin mensaje'}"
        </p>

        <p style="font-size: 14px; margin-top: 30px;">
          💡 <em>Recuerda responder antes de 24 horas a través de <strong>comercial@selvaalta.cl</strong>.</em>
        </p>
      </div>
    </body>
    </html>
  `;
}

export function getB2BConfirmationTemplate(name: string, company: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Contacto Recibido - Selva Alta Roasters</title>
    </head>
    <body style="font-family: sans-serif; color: #333; line-height: 1.6; padding: 20px; background-color: #f9fafb;">
      <div style="max-width: 600px; margin: 0 auto; background: #fff; border-radius: 12px; padding: 40px; border: 1px solid #e5e7eb; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
        <h1 style="color: #78350f; font-size: 24px; font-weight: 850; margin-top: 0; text-align: center;">Selva Alta Roasters</h1>
        <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 20px 0;">
        
        <p>Hola <strong>${name}</strong>,</p>
        
        <p>Hemos recibido tu interés en Selva Alta Roasters para <strong>${company}</strong>. Nos entusiasma mucho la posibilidad de llevar nuestro café de especialidad de la Amazonía Peruana a tu empresa, cafetería o proyecto HORECA.</p>
        
        <p>Un miembro de nuestro equipo comercial analizará tus datos y se pondrá en contacto contigo a la brevedad para agendar una videollamada o enviarte nuestro catálogo mayorista y muestras de café.</p>
        
        <p>Mientras tanto, te invitamos a conocer más sobre nosotros en nuestro sitio web o a través de nuestro email de contacto.</p>
        
        <div style="background-color: #fef3c7; border-radius: 8px; padding: 15px; margin-top: 25px; font-size: 14px;">
          <strong>Información de contacto comercial:</strong><br>
          ✉️ <a href="mailto:comercial@selvaalta.cl" style="color: #78350f; font-weight: bold; text-decoration: none;">comercial@selvaalta.cl</a><br>
          📞 Santiago de Chile
        </div>

        <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 30px 0;">
        <p style="font-size: 12px; color: #9ca3af; text-align: center; margin: 0;">
          © ${new Date().getFullYear()} Selva Alta Roasters SpA. Todos los derechos reservados.
        </p>
      </div>
    </body>
    </html>
  `;
}

export function getWaitlistWelcomeTemplate(email: string, name?: string): string {
  const greeting = name ? `Hola ${name}` : '¡Hola';
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Bienvenido al Club - Selva Alta Roasters</title>
    </head>
    <body style="font-family: sans-serif; color: #333; line-height: 1.6; padding: 20px; background-color: #f9fafb;">
      <div style="max-width: 600px; margin: 0 auto; background: #fff; border-radius: 12px; padding: 40px; border: 1px solid #e5e7eb; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
        <h1 style="color: #78350f; font-size: 24px; font-weight: 850; margin-top: 0; text-align: center;">☕ Selva Alta Club</h1>
        <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 20px 0;">
        
        <p>${greeting},</p>
        
        <p>¡Te has registrado con éxito en la lista de espera de <strong>Selva Alta Club</strong>!</p>
        
        <p>Estamos encendiendo los tostadores y afinando los últimos detalles para la gran apertura del e-commerce. Como miembro pionero de nuestra lista, tendrás los siguientes beneficios:</p>
        
        <ul style="padding-left: 20px; margin: 15px 0;">
          <li>🔒 <strong>Acceso anticipado de 48 horas</strong> antes del lanzamiento general.</li>
          <li>🎁 <strong>Regalo sorpresa exclusivo</strong> en tu primera suscripción o compra estándar.</li>
          <li>🌱 <strong>Acceso preferente</strong> a microlotes limitados (como nuestra variedad Geisha de altura).</li>
        </ul>

        <p>Te mantendremos al tanto del progreso del tueste. Apenas estemos listos para despachar, te llegará un aviso directo a <strong>${email}</strong>.</p>
        
        <p>¡Muchas gracias por unirte a la aventura de la selva alta peruana!</p>
        
        <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 30px 0;">
        <p style="font-size: 11px; color: #9ca3af; text-align: center; margin: 0;">
          Recibes este correo porque te suscribiste a la lista de espera en selvaalta.cl.<br>
          Si no deseas recibir más noticias, puedes <a href="{{unsubscribe_url}}" style="color: #6b7280; text-decoration: underline;">desuscribirte aquí</a>.
        </p>
      </div>
    </body>
    </html>
  `;
}

export function getNewsletterBaseTemplate(subject: string, htmlContent: string, email: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>${subject}</title>
    </head>
    <body style="font-family: sans-serif; color: #333; line-height: 1.6; padding: 20px; background-color: #f9fafb; margin: 0;">
      <div style="max-width: 600px; margin: 0 auto; background: #fff; border-radius: 12px; border: 1px solid #e5e7eb; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
        <!-- Banner -->
        <div style="background-color: #78350f; padding: 30px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 24px; font-weight: 800; tracking-tight;">Selva Alta Roasters</h1>
          <p style="margin: 5px 0 0 0; font-size: 13px; color: #fde68a; text-transform: uppercase; font-weight: bold; letter-spacing: 0.05em;">Boletín Informativo</p>
        </div>
        
        <!-- Content -->
        <div style="padding: 40px 30px;">
          ${htmlContent}
        </div>
        
        <!-- Footer -->
        <div style="background-color: #f3f4f6; padding: 24px 30px; text-align: center; border-t: 1px solid #e5e7eb;">
          <p style="color: #9ca3af; margin: 0; font-size: 11px; line-height: 1.5;">
            Recibes este correo porque estás suscrito a la waitlist o newsletter de Selva Alta Roasters.<br>
            Para cancelar tu suscripción inmediatamente, haz clic en el siguiente enlace:<br>
            <a href="{{unsubscribe_url}}" style="color: #6b7280; text-decoration: underline; font-weight: bold;">Cancelar suscripción</a>.
          </p>
          <p style="color: #cbd5e1; margin: 10px 0 0 0; font-size: 10px;">
            Selva Alta Roasters SpA, Chile
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}
