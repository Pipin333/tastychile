import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { MercadoPagoConfig, Payment } from 'mercadopago';
import { sendOrderConfirmation, sendOrderNotification } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Mercado Pago webhook sends either query params (topic/id) or body payload (type/data.id)
    let paymentId = searchParams.get('id') || searchParams.get('data.id');
    let topic = searchParams.get('topic') || searchParams.get('type');

    if (!paymentId) {
      try {
        const body = await request.json();
        paymentId = body.data?.id || body.id;
        topic = body.type || body.action;
      } catch (e) {
        // Body reading failed (e.g. empty request), which is fine if query params are present
      }
    }

    console.log(`[Mercado Pago Webhook] Received notification. Topic: ${topic}, Payment ID: ${paymentId}`);

    // We only process 'payment' events
    if (paymentId && (topic === 'payment' || topic === 'payment.created' || topic === 'payment.updated' || !topic)) {
      const mpAccessToken = process.env.MP_ACCESS_TOKEN;
      if (!mpAccessToken) {
        console.error("[Mercado Pago Webhook] Error: MP_ACCESS_TOKEN is missing.");
        return NextResponse.json({ error: 'Config missing' }, { status: 500 });
      }

      // Fetch payment details from Mercado Pago API
      const client = new MercadoPagoConfig({ accessToken: mpAccessToken });
      const paymentClient = new Payment(client);
      const paymentDetails = await paymentClient.get({ id: paymentId });

      const orderNumber = paymentDetails.external_reference;
      const status = paymentDetails.status; // e.g., 'approved'

      console.log(`[Mercado Pago Webhook] Payment details for ID ${paymentId}: Order ${orderNumber}, Status: ${status}`);

      if (orderNumber && status === 'approved') {
        // Query the order
        const dbOrders = await sql`
          SELECT * FROM orders WHERE order_number = ${orderNumber}
        `;
        const order = dbOrders[0];

        if (order) {
          if (order.status === 'pending') {
            // Update order status to paid
            await sql`
              UPDATE orders 
              SET status = 'paid', 
                  mp_payment_id = ${paymentId.toString()}, 
                  mp_payment_status = ${status} 
              WHERE id = ${order.id}
            `;

            // Prepare email details
            const emailOrderData = {
              order_number: order.order_number,
              customer_name: order.customer_name,
              customer_email: order.customer_email,
              customer_phone: order.customer_phone,
              customer_address: order.customer_address,
              customer_city: order.customer_city,
              customer_region: order.customer_region,
              items: order.items,
              subtotal: order.subtotal,
              shipping: order.shipping,
              total: order.total,
              payment_status: status,
              payment_id: paymentId.toString(),
              notes: order.notes
            };

            // Send transactional emails
            await sendOrderNotification(emailOrderData);
            await sendOrderConfirmation(emailOrderData);

            console.log(`[Mercado Pago Webhook] Order ${orderNumber} successfully updated to 'paid' and emails sent.`);
          } else {
            console.log(`[Mercado Pago Webhook] Order ${orderNumber} already processed (status: ${order.status}). Skipping email dispatch.`);
          }
        } else {
          console.error(`[Mercado Pago Webhook] Order ${orderNumber} not found in database.`);
        }
      }
    }

    // Always respond 200 OK to Mercado Pago to stop retries
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('[Mercado Pago Webhook] Error processing payment webhook:', error);
    // Even if there's an error, we respond 200/500 depending on circumstances.
    // If it's a transient DB error, we can return 500 so MP retries later.
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Support GET for testing
export async function GET() {
  return NextResponse.json({ status: 'Webhook receiver is active and waiting for POST requests from Mercado Pago.' });
}
