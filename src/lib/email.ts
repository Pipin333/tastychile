import { Resend } from "resend";
import {
  EmailOrderData,
  EmailB2BData,
  getOrderConfirmationTemplate,
  getOrderNotificationTemplate,
  getB2BNotificationTemplate,
  getB2BConfirmationTemplate,
  getWaitlistWelcomeTemplate,
} from "./email-templates";

const getResendClient = () => {
  const apiKey =
    process.env.RESEND_API_KEY ||
    process.env.TASTY_RESEND_API_KEY ||
    process.env.NEXT_PUBLIC_RESEND_API_KEY;
  return apiKey ? new Resend(apiKey.trim()) : null;
};

const getFromEmail = () =>
  process.env.RESEND_FROM_EMAIL ||
  "Selva Alta Roasters <pedidos@selvaalta.cl>";

export const getContactEmail = () =>
  process.env.CONTACT_EMAIL ||
  process.env.SALES_EMAIL ||
  "comercial@selvaalta.cl";

/**
 * Sends order confirmation to the customer.
 */
export async function sendOrderConfirmation(order: EmailOrderData) {
  const html = getOrderConfirmationTemplate(order);
  const resend = getResendClient();

  if (!resend) {
    console.warn(
      `[Resend Mock] RESEND_API_KEY no configurada. Confirmación simulada para ${order.customer_email}`
    );
    return {
      success: false,
      mock: true,
      errorMessage:
        "RESEND_API_KEY no está disponible en este entorno de Vercel (revisa que esté marcada la casilla Preview en Environment Variables).",
    };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: getFromEmail(),
      to: order.customer_email,
      subject: `Pedido ${order.order_number} recibido · Selva Alta Roasters`,
      html,
      replyTo: getContactEmail(),
    });

    if (error) {
      console.error(
        "[Resend API Error] Falló envío de confirmación a cliente:",
        error
      );
      return {
        success: false,
        error,
        errorMessage: `${error.name || "ResendError"}: ${error.message}`,
      };
    }

    return { success: true, data };
  } catch (error: unknown) {
    console.error("[Email Error] Excepción enviando confirmación a cliente:", error);
    return {
      success: false,
      error,
      errorMessage: error instanceof Error ? error.message : String(error),
    };
  }
}

/**
 * Sends notification of new order to Selva Alta operations / sales team.
 */
export async function sendOrderNotification(order: EmailOrderData) {
  const html = getOrderNotificationTemplate(order);
  const resend = getResendClient();
  const contactEmail = getContactEmail();

  if (!resend) {
    console.warn(
      `[Resend Mock] RESEND_API_KEY no configurada. Alerta interna simulada para ${contactEmail}`
    );
    return {
      success: false,
      mock: true,
      errorMessage:
        "RESEND_API_KEY no está disponible en este entorno de Vercel (revisa que esté marcada la casilla Preview en Environment Variables).",
    };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: getFromEmail(),
      to: contactEmail,
      subject: `NUEVO PEDIDO ${order.order_number} · ${order.customer_name}`,
      html,
      replyTo: order.customer_email,
    });

    if (error) {
      console.error(
        "[Resend API Error] Falló envío de alerta interna a Selva Alta:",
        error
      );
      return {
        success: false,
        error,
        errorMessage: `${error.name || "ResendError"}: ${error.message}`,
      };
    }

    return { success: true, data };
  } catch (error: unknown) {
    console.error(
      "[Email Error] Excepción enviando alerta de pedido a Selva Alta:",
      error
    );
    return {
      success: false,
      error,
      errorMessage: error instanceof Error ? error.message : String(error),
    };
  }
}

/**
 * Sends B2B contact lead to Selva Alta commercial team.
 */
export async function sendB2BNotification(data: EmailB2BData) {
  const html = getB2BNotificationTemplate(data);
  const resend = getResendClient();
  const contactEmail = getContactEmail();

  if (!resend) {
    console.warn(
      `[Resend Mock] RESEND_API_KEY no configurada. Lead B2B simulado para ${contactEmail}`
    );
    return {
      success: false,
      mock: true,
      errorMessage:
        "RESEND_API_KEY no está disponible en este entorno de Vercel (revisa que esté marcada la casilla Preview).",
    };
  }

  try {
    const { data: resData, error } = await resend.emails.send({
      from: getFromEmail(),
      to: contactEmail,
      subject: `Solicitud Comercial B2B · ${data.company} (${data.name})`,
      html,
      replyTo: data.email,
    });

    if (error) {
      console.error(
        "[Resend API Error] Falló envío de lead B2B a Selva Alta:",
        error
      );
      return {
        success: false,
        error,
        errorMessage: `${error.name || "ResendError"}: ${error.message}`,
      };
    }

    return { success: true, data: resData };
  } catch (error: unknown) {
    console.error(
      "[Email Error] Excepción enviando lead B2B a Selva Alta:",
      error
    );
    return {
      success: false,
      error,
      errorMessage: error instanceof Error ? error.message : String(error),
    };
  }
}

/**
 * Sends B2B confirmation to the client.
 */
export async function sendB2BConfirmation(
  email: string,
  name: string,
  company: string
) {
  const html = getB2BConfirmationTemplate(name, company);
  const resend = getResendClient();

  if (!resend) {
    console.warn(
      `[Resend Mock] RESEND_API_KEY no configurada. Confirmación B2B simulada para ${email}`
    );
    return {
      success: false,
      mock: true,
      errorMessage:
        "RESEND_API_KEY no está disponible en este entorno de Vercel (revisa que esté marcada la casilla Preview).",
    };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: getFromEmail(),
      to: email,
      subject: "Solicitud recibida · Selva Alta Roasters",
      html,
      replyTo: getContactEmail(),
    });

    if (error) {
      console.error(
        "[Resend API Error] Falló envío de confirmación B2B a cliente:",
        error
      );
      return {
        success: false,
        error,
        errorMessage: `${error.name || "ResendError"}: ${error.message}`,
      };
    }

    return { success: true, data };
  } catch (error: unknown) {
    console.error("[Email Error] Excepción enviando confirmación B2B:", error);
    return {
      success: false,
      error,
      errorMessage: error instanceof Error ? error.message : String(error),
    };
  }
}

/**
 * Sends welcome to contact / inquiry subscribers.
 */
export async function sendWaitlistWelcome(email: string, name?: string) {
  const html = getWaitlistWelcomeTemplate(email, name);
  const resend = getResendClient();

  if (!resend) {
    return { success: true, mock: true };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: getFromEmail(),
      to: email,
      subject: "Detalles de Marsellesa 87 SCA · Selva Alta Roasters",
      html,
      replyTo: getContactEmail(),
    });

    if (error) {
      console.error("[Resend API Error] Falló envío waitlist:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error("[Email Error] Excepción enviando correo de contacto:", error);
    return { success: false, error };
  }
}
