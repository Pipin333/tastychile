import { Resend } from 'resend';
import { 
  EmailOrderData, 
  EmailB2BData,
  getOrderConfirmationTemplate, 
  getOrderNotificationTemplate, 
  getB2BNotificationTemplate, 
  getB2BConfirmationTemplate, 
  getWaitlistWelcomeTemplate,
  getNewsletterBaseTemplate
} from './email-templates';

// Initialize Resend
const resendApiKey = process.env.RESEND_API_KEY;
export const resend = resendApiKey ? new Resend(resendApiKey) : null;

// Configurable emails
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'Selva Alta <onboarding@resend.dev>';
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'comercial@selvaalta.cl';

// Helper to get base URL for unsubscribe link
export const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'http://localhost:3000';
};

// Log warning if API key is missing
if (!resend) {
  console.warn("WARNING: RESEND_API_KEY is missing. Emails will be logged to console instead of sent.");
}

/**
 * Sends order confirmation email to the customer.
 */
export async function sendOrderConfirmation(order: EmailOrderData) {
  const unsubscribeUrl = `${getBaseUrl()}/api/newsletter/unsubscribe?email=${encodeURIComponent(order.customer_email)}`;
  let html = getOrderConfirmationTemplate(order);
  html = html.replace(/\{\{unsubscribe_url\}\}/g, unsubscribeUrl);

  if (!resend) {
    console.log(`[Email Mock] Send Order Confirmation to ${order.customer_email}`);
    return { success: true, mock: true };
  }

  try {
    const response = await resend.emails.send({
      from: FROM_EMAIL,
      to: order.customer_email,
      subject: `Confirmación de Pedido ${order.order_number} - Selva Alta Roasters`,
      html: html,
      replyTo: CONTACT_EMAIL
    });
    return { success: true, data: response };
  } catch (error) {
    console.error("Error sending order confirmation email:", error);
    return { success: false, error };
  }
}

/**
 * Sends new order alert to the roastery (comercial@selvaalta.cl).
 */
export async function sendOrderNotification(order: EmailOrderData) {
  const html = getOrderNotificationTemplate(order);

  if (!resend) {
    console.log(`[Email Mock] Send Order Notification to ${CONTACT_EMAIL}`);
    return { success: true, mock: true };
  }

  try {
    const response = await resend.emails.send({
      from: FROM_EMAIL,
      to: CONTACT_EMAIL,
      subject: `🚨 NUEVO PEDIDO ${order.order_number} - ${order.customer_name}`,
      html: html,
      replyTo: order.customer_email
    });
    return { success: true, data: response };
  } catch (error) {
    console.error("Error sending order notification email:", error);
    return { success: false, error };
  }
}

/**
 * Sends B2B contact notification email to the roastery.
 */
export async function sendB2BNotification(data: EmailB2BData) {
  const html = getB2BNotificationTemplate(data);

  if (!resend) {
    console.log(`[Email Mock] Send B2B Notification to ${CONTACT_EMAIL}`);
    return { success: true, mock: true };
  }

  try {
    const response = await resend.emails.send({
      from: FROM_EMAIL,
      to: CONTACT_EMAIL,
      subject: `💼 Lead B2B: ${data.company} - ${data.name}`,
      html: html,
      replyTo: data.email
    });
    return { success: true, data: response };
  } catch (error) {
    console.error("Error sending B2B notification email:", error);
    return { success: false, error };
  }
}

/**
 * Sends B2B confirmation receipt to the lead.
 */
export async function sendB2BConfirmation(email: string, name: string, company: string) {
  const html = getB2BConfirmationTemplate(name, company);

  if (!resend) {
    console.log(`[Email Mock] Send B2B Confirmation to ${email}`);
    return { success: true, mock: true };
  }

  try {
    const response = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: `Hemos recibido tu solicitud B2B - Selva Alta Roasters`,
      html: html,
      replyTo: CONTACT_EMAIL
    });
    return { success: true, data: response };
  } catch (error) {
    console.error("Error sending B2B confirmation email:", error);
    return { success: false, error };
  }
}

/**
 * Sends welcome email to waitlist subscribers.
 */
export async function sendWaitlistWelcome(email: string, name?: string) {
  const unsubscribeUrl = `${getBaseUrl()}/api/newsletter/unsubscribe?email=${encodeURIComponent(email)}`;
  let html = getWaitlistWelcomeTemplate(email, name);
  html = html.replace(/\{\{unsubscribe_url\}\}/g, unsubscribeUrl);

  if (!resend) {
    console.log(`[Email Mock] Send Waitlist Welcome to ${email}`);
    return { success: true, mock: true };
  }

  try {
    const response = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: `☕ ¡Bienvenido al Club Selva Alta!`,
      html: html,
      replyTo: CONTACT_EMAIL
    });
    return { success: true, data: response };
  } catch (error) {
    console.error("Error sending waitlist welcome email:", error);
    return { success: false, error };
  }
}

/**
 * Sends a newsletter campaign to multiple recipients, rate limited to avoid Resend SDK thresholds.
 */
export async function sendNewsletterCampaign(
  subject: string, 
  htmlContent: string, 
  subscribers: Array<{ email: string }>
) {
  if (!resend) {
    console.log(`[Email Mock] Send Campaign "${subject}" to ${subscribers.length} subscribers.`);
    return { sent: subscribers.length, failed: 0, total: subscribers.length };
  }

  let sent = 0;
  let failed = 0;

  // Resend free tier has a limit of 2 requests per second.
  // We process sequentially with a delay of 550ms between sends to stay safe.
  for (const sub of subscribers) {
    try {
      const unsubscribeUrl = `${getBaseUrl()}/api/newsletter/unsubscribe?email=${encodeURIComponent(sub.email)}`;
      let personalizedHtml = getNewsletterBaseTemplate(subject, htmlContent, sub.email);
      personalizedHtml = personalizedHtml.replace(/\{\{unsubscribe_url\}\}/g, unsubscribeUrl);

      await resend.emails.send({
        from: FROM_EMAIL,
        to: sub.email,
        subject: subject,
        html: personalizedHtml,
        replyTo: CONTACT_EMAIL
      });

      sent++;
      // Delay to avoid hitting rate limits
      await new Promise((resolve) => setTimeout(resolve, 550));
    } catch (err) {
      console.error(`Failed to send campaign email to ${sub.email}:`, err);
      failed++;
    }
  }

  return { sent, failed, total: subscribers.length };
}
