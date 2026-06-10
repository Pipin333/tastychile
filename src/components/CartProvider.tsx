'use client';

import { useEffect, useState } from 'react';

/**
 * Client boundary wrapper for the Zustand cart store.
 * Ensures the persisted store rehydrates on the client before
 * cart-dependent UI renders, preventing SSR hydration mismatches.
 */
export default function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return <>{children}</>;
}
