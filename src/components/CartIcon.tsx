'use client';

import { useCartStore } from '@/lib/cart-store';
import { useState, useEffect, useRef } from 'react';

export default function CartIcon() {
  const [mounted, setMounted] = useState(false);
  const [animating, setAnimating] = useState(false);
  const prevCountRef = useRef(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Read from store only after mount to avoid SSR mismatch
  const totalItems = useCartStore((s) => s.totalItems());
  const toggleCart = useCartStore((s) => s.toggleCart);

  // Trigger badge bounce animation when count changes
  useEffect(() => {
    if (mounted && totalItems !== prevCountRef.current) {
      prevCountRef.current = totalItems;
      if (totalItems > 0) {
        setAnimating(true);
        const timer = setTimeout(() => setAnimating(false), 300);
        return () => clearTimeout(timer);
      }
    }
  }, [totalItems, mounted]);

  const displayCount = mounted ? totalItems : 0;

  return (
    <button
      type="button"
      onClick={toggleCart}
      className="relative inline-flex h-11 w-11 items-center justify-center rounded-md text-amber-900 hover:bg-amber-50 hover:text-amber-700 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-600"
      aria-label={`Carrito de compras${displayCount > 0 ? `, ${displayCount} artículo${displayCount === 1 ? '' : 's'}` : ''}`}
    >
      {/* Shopping bag SVG icon */}
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
        />
      </svg>

      {/* Item count badge */}
      {displayCount > 0 && (
        <span
          className={`absolute -top-0.5 -right-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-500 px-1 text-[11px] font-bold text-white shadow-sm transition-transform duration-300 ${
            animating ? 'scale-125' : 'scale-100'
          }`}
          aria-hidden="true"
        >
          {displayCount > 99 ? '99+' : displayCount}
        </span>
      )}
    </button>
  );
}
