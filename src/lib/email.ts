import { Resend } from 'resend';
import {
  EmailOrderData,
  EmailB2BData,
  getOrderConfirmationTemplate,
  getOrderNotificationTemplate,
  getB2BNotificationTemplate,
  getB2BConfirmationTemplate,
  getWaitlistWelcomeTemplate,
} from './email-templates';

const resendApiKey = process.env.RESEND_API_KEY;
export const resend = resendApiKey ? new Resend(resendApiKey) : null;

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'Selva Alta <onboarding@resend.dev>';
export const CONTACT_EMAIL = 
  process.env.CONTACT_EMAIL || 
  process.env.SALES_EMAIL || 
  'comercial@selvaalta.cl';

if (!resend) {
  console.info('[Email] RESEND_API_KEY no configurada. Los correos se registrarán en consola (Modo Mago de Oz / Simulado).');
}

/**
 * Sends order confirmation to the customer.
 */
export async function sendOrderConfirmation(order: EmailOrderData) {
  const html = getOrderConfirmationTemplate(order);

  if (!resend) {
    console.log(`[Email Mago de Oz] Enviando confirmación de pedido a cliente: ${order.customer_email}`);
    return { success: true, mock: true };
  }

  try {
    const response = await resend.emails.send({
      from: FROM_EMAIL,
      to: order.customer_email,
      subject: `Pedido ${order.order_number} Recibido - Selva Alta Roasters`,
      html: html,
      replyTo: CONTACT_EMAIL,
    });
    return { success: true, data: response };
  } catch (error) {
    console.error('[Email Error] Error enviando confirmación a cliente:', error);
    // Don't fail the whole user flow if email provider errors
    return { success: false, error };
  }
}

/**
 * Sends notification of new order to Selva Alta operations / sales team.
 */
export async function sendOrderNotification(order: EmailOrderData) {
  const html = getOrderNotificationTemplate(order);

  if (!resend) {
    console.log(`[Email Mago de Oz] NUEVO PEDIDO notificado al correo de Selva Alta (${CONTACT_EMAIL}) para orden ${order.order_number}`);
    return { success: true, mock: true };
  }

  try {
    const response = await resend.emails.send({
      from: FROM_EMAIL,
      to: CONTACT_EMAIL,
      subject: `🚨 NUEVO PEDIDO ${order.order_number} - ${order.customer_name}`,
      html: html,
      replyTo: order.customer_email,
    });
    return { success: true, data: response };
  } catch (error) {
    console.error('[Email Error] Error enviando alerta de pedido a Selva Alta:', error);
    return { success: false, error };
  }
}

/**
 * Sends B2B contact lead to Selva Alta commercial team.
 */
export async function sendB2BNotification(data: EmailB2BData) {
  const html = getB2BNotificationTemplate(data);

  if (!resend) {
    console.log(`[Email Mago de Oz] Notificación B2B enviada a Selva Alta (${CONTACT_EMAIL}) de ${data.company}`);
    return { success: true, mock: true };
  }

  try {
    const response = await resend.emails.send({
      from: FROM_EMAIL,
      to: CONTACT_EMAIL,
      subject: `💼 Lead B2B: ${data.company} - ${data.name}`,
      html: html,
      replyTo: data.email,
    });
    return { success: true, data: response };
  } catch (error) {
    console.error('[Email Error] Error enviando lead B2B a Selva Alta:', error);
    return { success: false, error };
  }
}

/**
 * Sends B2B confirmation to the client.
 */
export async function sendB2BConfirmation(email: string, name: string, company: string) {
  const html = getB2BConfirmationTemplate(name, company);

  if (!resend) {
    console.log(`[Email Mago de Oz] Confirmación B2B enviada a ${email}`);
    return { success: true, mock: true };
  }

  try {
    const response = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: `Hemos recibido tu solicitud B2B - Selva Alta Roasters`,
      html: html,
      replyTo: CONTACT_EMAIL,
    });
    return { success: true, data: response };
  } catch (error) {
    console.error('[Email Error] Error enviando confirmación B2B:', error);
    return { success: false, error };
  }
}

/**
 * Sends welcome to waitlist subscribers.
 */
export async function sendWaitlistWelcome(email: string, name?: string) {
  const html = getWaitlistWelcomeTemplate(email, name);

  if (!resend) {
    console.log(`[Email Mago de Oz] Bienvenida a la lista de espera enviada a ${email}`);
    return { success: true, mock: true };
  }

  try {
    const response = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: `☕ ¡Bienvenido a Selva Alta Club!`,
      html: html,
      replyTo: CONTACT_EMAIL,
    });
    return { success: true, data: response };
  } catch (error) {
    console.error('[Email Error] Error enviando bienvenida waitlist:', error);
    return { success: false, error };
  }
}
