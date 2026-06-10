import React from 'react';
import Link from 'next/link';
import { sql } from '@/lib/db';
import { sendOrderConfirmation, sendOrderNotification } from '@/lib/email';
import Footer from '@/components/Footer';

interface PageProps {
  searchParams: Promise<{
    external_reference?: string;
    status?: string;
    payment_id?: string;
    preference_id?: string;
  }>;
}

export default async function SuccessPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const orderNumber = params.external_reference;
  const paymentStatus = params.status;
  const paymentId = params.payment_id;

  if (!orderNumber) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-between text-gray-900 font-sans">
        <div className="flex-grow flex flex-col items-center justify-center py-20 px-4 text-center">
          <span className="text-6xl mb-6">⚠️</span>
          <h1 className="text-2xl font-bold text-amber-900 mb-2">Falta información de pedido</h1>
          <p className="text-gray-500 mb-6">No pudimos encontrar la referencia del pedido. Si ya pagaste, revisa tu email.</p>
          <Link href="/club" className="bg-amber-900 text-white font-bold py-2.5 px-6 rounded-xl hover:bg-amber-800 transition">
            Volver a la tienda
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // 1. Fetch order details from database
  const orders = await sql`
    SELECT * FROM orders WHERE order_number = ${orderNumber}
  `;
  const order = orders[0];

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-between text-gray-900 font-sans">
        <div className="flex-grow flex flex-col items-center justify-center py-20 px-4 text-center">
          <span className="text-6xl mb-6">🔍</span>
          <h1 className="text-2xl font-bold text-amber-900 mb-2">Pedido no encontrado</h1>
          <p className="text-gray-500 mb-6">El pedido {orderNumber} no está registrado en nuestro sistema.</p>
          <Link href="/club" className="bg-amber-900 text-white font-bold py-2.5 px-6 rounded-xl hover:bg-amber-800 transition">
            Ir a la Tienda
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // 2. Double-safe DB Update & Emails (in case webhook was delayed)
  const isMock = paymentId === 'mock_transfer';
  const isApproved = paymentStatus === 'approved';
  let isPaidNow = order.status === 'paid';

  if (order.status === 'pending' && isApproved && !isPaidNow) {
    try {
      // Update DB to paid
      await sql`
        UPDATE orders 
        SET status = ${isMock ? 'pending' : 'paid'}, 
            mp_payment_id = ${paymentId || null}, 
            mp_payment_status = ${paymentStatus || null} 
        WHERE id = ${order.id}
      `;
      isPaidNow = !isMock;

      // Prepare email data
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
        payment_status: paymentStatus || 'pending',
        payment_id: paymentId,
        notes: order.notes
      };

      // Trigger Resend transactional emails
      await sendOrderNotification(emailOrderData);
      await sendOrderConfirmation(emailOrderData);
    } catch (err) {
      console.error("Error running double-safe success update:", err);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between text-gray-900 font-sans">
      <main className="flex-grow max-w-3xl w-full mx-auto px-4 py-16 sm:px-6 lg:px-8">
        
        {/* Success Card */}
        <div className="bg-white rounded-3xl border border-gray-200 p-8 md:p-10 shadow-sm text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-500 text-3xl mb-6 shadow-inner animate-bounce">
            ✓
          </div>
          
          <h1 className="text-3xl font-extrabold text-amber-900 mb-2">¡Pedido Recibido!</h1>
          
          {isPaidNow ? (
            <p className="text-green-600 font-semibold mb-6">Hemos confirmado tu pago mediante Mercado Pago.</p>
          ) : (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-8 text-left max-w-lg mx-auto">
              <h3 className="font-bold text-amber-950 mb-2">📋 Instrucciones de Pago (Wizard of Oz)</h3>
              <p className="text-sm text-gray-700 leading-relaxed mb-3">
                Para completar la compra, realiza una transferencia electrónica a la siguiente cuenta personal/corporativa:
              </p>
              <ul className="text-sm text-gray-800 space-y-1.5 font-medium mb-3">
                <li>• <strong>Banco:</strong> Banco de Chile / Banco Estado</li>
                <li>• <strong>Tipo de Cuenta:</strong> Cuenta Vista / Corriente</li>
                <li>• <strong>Número:</strong> 123456789 (Placeholder)</li>
                <li>• <strong>RUT:</strong> 76.123.456-7</li>
                <li>• <strong>Destinatario:</strong> Selva Alta Roasters SpA</li>
                <li>• <strong>Email:</strong> comercial@selvaalta.cl</li>
              </ul>
              <p className="text-xs text-amber-800">
                Por favor, envía el comprobante de transferencia a <strong>comercial@selvaalta.cl</strong> indicando el número de pedido <strong>{order.order_number}</strong>. Tostaremos tus granos apenas confirmemos la transferencia.
              </p>
            </div>
          )}

          <p className="text-gray-600 max-w-md mx-auto mb-8 text-sm">
            Te hemos enviado un correo de confirmación a <strong>{order.customer_email}</strong> con los detalles de tu compra.
          </p>

          {/* Details Box */}
          <div className="border-t border-b border-gray-200 py-6 mb-8 text-left space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Número de Pedido:</span>
              <strong className="text-amber-900 font-bold">{order.order_number}</strong>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Destinatario:</span>
              <span className="font-medium">{order.customer_name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Dirección de Despacho:</span>
              <span className="text-right max-w-xs font-medium text-gray-700">
                {order.customer_address}, {order.customer_city}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Monto Total:</span>
              <strong className="text-amber-900 font-extrabold text-base">
                ${Number(order.total).toLocaleString('es-CL')}
              </strong>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/club" className="rounded-xl bg-amber-900 py-3.5 px-8 text-sm font-bold text-white shadow hover:bg-amber-800 transition">
              Volver a la Tienda
            </Link>
            <Link href="/" className="rounded-xl bg-amber-100 py-3.5 px-8 text-sm font-bold text-amber-900 hover:bg-amber-200 transition">
              Volver al Inicio
            </Link>
          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
}
