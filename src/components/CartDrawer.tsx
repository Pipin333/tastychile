'use client';

import { useCartStore } from '@/lib/cart-store';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';

export default function CartDrawer() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isOpen = useCartStore((s) => s.isCartOpen);
  const items = useCartStore((s) => s.items);
  const toggleCart = useCartStore((s) => s.toggleCart);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const totalPrice = useCartStore((s) => s.totalPrice());
  const totalItems = useCartStore((s) => s.totalItems());

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (mounted && isOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [isOpen, mounted]);

  // Close on Escape key
  useEffect(() => {
    if (!mounted || !isOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') toggleCart();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, toggleCart, mounted]);

  const handleCheckout = useCallback(() => {
    toggleCart();
    router.push('/club/checkout');
  }, [toggleCart, router]);

  // Don't render anything on the server
  if (!mounted) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={toggleCart}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Carrito de compras"
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* ── Header ────────────────────────────────────── */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h2 className="text-xl font-extrabold text-amber-900">
            Tu Carrito
            {totalItems > 0 && (
              <span className="ml-2 text-sm font-medium text-gray-500">
                ({totalItems} {totalItems === 1 ? 'artículo' : 'artículos'})
              </span>
            )}
          </h2>
          <button
            type="button"
            onClick={toggleCart}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-600"
            aria-label="Cerrar carrito"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* ── Items list ────────────────────────────────── */}
        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <span className="text-6xl" aria-hidden="true">☕</span>
            <p className="text-lg font-semibold text-gray-700">
              Tu carrito está vacío
            </p>
            <p className="text-sm text-gray-500">
              Agrega tus cafés favoritos y vuelve aquí para finalizar tu pedido.
            </p>
            <button
              type="button"
              onClick={toggleCart}
              className="mt-2 rounded-xl bg-amber-900 px-6 py-2.5 text-sm font-bold text-white shadow hover:bg-amber-800 transition"
            >
              Explorar cafés
            </button>
          </div>
        ) : (
          <ul className="flex-1 divide-y divide-gray-100 overflow-y-auto px-6">
            {items.map((item) => (
              <li key={item.id} className="flex gap-4 py-5">
                {/* Emoji thumbnail */}
                <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl bg-amber-50 text-3xl">
                  {item.emoji}
                </div>

                {/* Info */}
                <div className="flex min-w-0 flex-1 flex-col justify-between">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-gray-900">
                        {item.name}
                      </p>
                      {item.detail && (
                        <p className="text-xs text-gray-500">{item.detail}</p>
                      )}
                    </div>
                    {/* Remove button */}
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded text-gray-400 hover:bg-red-50 hover:text-red-500 transition"
                      aria-label={`Eliminar ${item.name} del carrito`}
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                      </svg>
                    </button>
                  </div>

                  <div className="mt-2 flex items-center justify-between">
                    {/* Quantity controls */}
                    <div className="inline-flex items-center rounded-lg border border-gray-200">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.id, Math.max(1, item.quantity - 1))
                        }
                        disabled={item.quantity <= 1}
                        className="flex h-8 w-8 items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition rounded-l-lg"
                        aria-label={`Disminuir cantidad de ${item.name}`}
                      >
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} aria-hidden="true">
                          <path strokeLinecap="round" d="M5 12h14" />
                        </svg>
                      </button>
                      <span
                        className="flex h-8 w-8 items-center justify-center text-sm font-semibold text-gray-900 select-none"
                        aria-label={`Cantidad: ${item.quantity}`}
                      >
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="flex h-8 w-8 items-center justify-center text-gray-600 hover:bg-gray-100 transition rounded-r-lg"
                        aria-label={`Aumentar cantidad de ${item.name}`}
                      >
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} aria-hidden="true">
                          <path strokeLinecap="round" d="M12 5v14m-7-7h14" />
                        </svg>
                      </button>
                    </div>

                    {/* Line total */}
                    <p className="text-sm font-bold text-amber-900">
                      ${(item.price * item.quantity).toLocaleString('es-CL')}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* ── Footer (sticky) ──────────────────────────── */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 bg-amber-50/60 px-6 py-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">
                Subtotal
              </span>
              <span className="text-xl font-extrabold text-amber-900">
                ${totalPrice.toLocaleString('es-CL')}
              </span>
            </div>

            <button
              type="button"
              onClick={handleCheckout}
              className="w-full rounded-xl bg-amber-900 py-3.5 text-sm font-bold text-white shadow-md hover:bg-amber-800 active:scale-[0.98] transition transform"
            >
              Finalizar Pedido
            </button>

            <button
              type="button"
              onClick={toggleCart}
              className="w-full py-2 text-sm font-semibold text-amber-900 hover:text-amber-700 transition text-center"
            >
              ← Seguir Comprando
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
