'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/lib/cart-store';
import { createOrder } from '@/app/actions';
import Footer from '@/components/Footer';

const regiones = [
  "Región Metropolitana de Santiago",
  "Región de Arica y Parinacota",
  "Región de Tarapacá",
  "Región de Antofagasta",
  "Región de Atacama",
  "Región de Coquimbo",
  "Región de Valparaíso",
  "Región del Libertador General Bernardo O'Higgins",
  "Región del Maule",
  "Región de Ñuble",
  "Región del Biobío",
  "Región de la Araucanía",
  "Región de Los Ríos",
  "Región de Los Lagos",
  "Región de Aysén del General Carlos Ibáñez del Campo",
  "Región de Magallanes y de la Antártica Chilena"
];

export default function CheckoutPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const subtotal = useCartStore((s) => s.totalPrice());

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Shipping fee logic: $0 if any item is a subscription or subtotal >= $30.000, else $3.900 flat
  const hasSubscription = items.some((item) => item.id.startsWith('sub-'));
  const shipping = (hasSubscription || subtotal >= 30000) ? 0 : 3900;
  const total = subtotal + shipping;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    
    const shippingData = {
      name: formData.get('name')?.toString() || '',
      email: formData.get('email')?.toString() || '',
      phone: formData.get('phone')?.toString() || '',
      address: formData.get('address')?.toString() || '',
      city: formData.get('city')?.toString() || '',
      region: formData.get('region')?.toString() || '',
      notes: formData.get('notes')?.toString() || '',
      cartItems: items.map((item) => ({ id: item.id, quantity: item.quantity }))
    };

    try {
      const result = await createOrder(shippingData);

      if (result.success && result.redirectUrl) {
        // Empty cart before redirecting
        clearCart();
        
        // Redirect client to Mercado Pago checkout (or success mock page)
        router.push(result.redirectUrl);
      } else {
        setError(result.error || 'Ocurrió un error inesperado al guardar tu pedido.');
        setLoading(false);
      }
    } catch (err: any) {
      console.error(err);
      setError('Error al procesar el pedido. Por favor intenta de nuevo.');
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-between text-gray-900 font-sans">
        <nav className="bg-white shadow-sm w-full sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <Link href="/club" className="text-sm font-bold text-amber-900 hover:text-amber-700 transition">
                ← Volver a la Tienda
              </Link>
              <div className="text-xl font-extrabold text-amber-900">Finalizar Pedido</div>
              <div className="w-10"></div>
            </div>
          </div>
        </nav>

        <main className="flex-grow flex flex-col items-center justify-center px-4 text-center py-20">
          <span className="text-7xl mb-6" role="img" aria-label="Carrito Vacío">🛒</span>
          <h1 className="text-3xl font-extrabold text-amber-900 mb-3">Tu carrito está vacío</h1>
          <p className="text-gray-500 mb-8 max-w-sm">No puedes finalizar un pedido sin productos. ¡Vuelve a nuestra selección de café de especialidad y agrega tus favoritos!</p>
          <Link href="/club" className="rounded-xl bg-amber-900 px-8 py-3.5 text-sm font-bold text-white shadow hover:bg-amber-800 transition transform hover:scale-105">
            Explorar Variedades
          </Link>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between text-gray-900 font-sans">
      {/* Navbar */}
      <nav className="bg-white shadow-sm w-full sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/club" className="text-sm font-bold text-amber-900 hover:text-amber-700 transition">
              ← Seguir Comprando
            </Link>
            <div className="text-xl md:text-2xl font-extrabold text-amber-900 tracking-tight">Finalizar Pedido</div>
            <div className="w-10"></div>
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Form Side */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-amber-900 mb-6">Datos de Despacho</h2>
            
            {error && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded text-red-700 text-sm font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Nombre Completo *</label>
                  <input 
                    required 
                    type="text" 
                    name="name" 
                    placeholder="Juan Pérez"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition" 
                    disabled={loading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Email *</label>
                  <input 
                    required 
                    type="email" 
                    name="email" 
                    placeholder="juan@correo.cl"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition" 
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Teléfono de Contacto *</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm font-medium">+56</span>
                  <input 
                    required 
                    type="tel" 
                    name="phone" 
                    placeholder="9 1234 5678"
                    pattern="[0-9]{9}"
                    title="Ingresa 9 dígitos sin espacios (ej: 912345678)"
                    className="w-full pl-14 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition" 
                    disabled={loading}
                  />
                </div>
                <span className="text-xs text-gray-400 mt-1 block">Para coordinar la entrega y avisos de despacho.</span>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Dirección Completa (Calle y Número) *</label>
                <input 
                  required 
                  type="text" 
                  name="address" 
                  placeholder="Av. Providencia 1234, Depto 402"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition" 
                  disabled={loading}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Comuna / Ciudad *</label>
                  <input 
                    required 
                    type="text" 
                    name="city" 
                    placeholder="Providencia"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition" 
                    disabled={loading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Región *</label>
                  <select 
                    required
                    name="region" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
                    disabled={loading}
                    defaultValue="Región Metropolitana de Santiago"
                  >
                    {regiones.map((reg) => (
                      <option key={reg} value={reg}>{reg}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Notas o Instrucciones Especiales</label>
                <textarea 
                  name="notes" 
                  rows={3} 
                  placeholder="Dejar en conserjería, timbre malo, etc."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition resize-none" 
                  disabled={loading}
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-6 rounded-xl bg-amber-900 py-4 text-base font-bold text-white shadow-lg hover:bg-amber-800 active:scale-[0.99] transition transform flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:transform-none disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Procesando Pedido...</span>
                  </>
                ) : (
                  <>
                    <span>Ir a Pagar con Mercado Pago 💳</span>
                  </>
                )}
              </button>
              <p className="text-center text-xs text-gray-400 mt-2">Transacción segura procesada de forma encriptada.</p>
            </form>
          </div>

          {/* Cart Side */}
          <div className="lg:col-span-5 bg-amber-900 text-white rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden border border-amber-950">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />

            <h2 className="text-2xl font-bold border-b border-amber-800/60 pb-4 mb-6">Resumen del Pedido</h2>

            {/* List */}
            <ul className="divide-y divide-amber-800/40 mb-6 max-h-[350px] overflow-y-auto pr-2">
              {items.map((item) => (
                <li key={item.id} className="flex gap-4 py-4 items-center">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-amber-950/40 border border-amber-800/40 text-2xl">
                    {item.emoji}
                  </div>
                  <div className="flex-grow min-w-0">
                    <p className="font-bold text-sm truncate">{item.name}</p>
                    {item.detail && <p className="text-amber-200/70 text-xs">{item.detail}</p>}
                    <p className="text-amber-200/80 text-xs mt-0.5">Cant: {item.quantity} × ${item.price.toLocaleString('es-CL')}</p>
                  </div>
                  <span className="font-bold text-sm text-amber-200">
                    ${(item.price * item.quantity).toLocaleString('es-CL')}
                  </span>
                </li>
              ))}
            </ul>

            {/* Price Calculations */}
            <div className="border-t border-amber-800/60 pt-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-amber-200/80">Subtotal</span>
                <span>${subtotal.toLocaleString('es-CL')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-amber-200/80">Costo de Despacho</span>
                <span>{shipping === 0 ? <strong className="text-green-400 font-bold">Gratis</strong> : `$${shipping.toLocaleString('es-CL')}`}</span>
              </div>
              
              <div className="border-t border-amber-800/60 pt-4 flex justify-between items-end">
                <span className="text-base font-bold">Total a Pagar</span>
                <span className="text-3xl font-extrabold text-amber-300">
                  ${total.toLocaleString('es-CL')}
                </span>
              </div>
            </div>

            {/* Security stamp */}
            <div className="mt-8 pt-6 border-t border-amber-800/40 flex items-center gap-3 text-amber-200/70 text-xs leading-relaxed">
              <span className="text-2xl" role="img" aria-hidden="true">🛡️</span>
              <p>Tu café se tuesta a pedido en nuestro taller para garantizar la máxima frescura en el momento de entrega.</p>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
