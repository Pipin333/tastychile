import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  emoji: string;
  detail?: string;
  type?: 'product' | 'subscription';
}

interface CartState {
  items: CartItem[];
  isCartOpen: boolean;
  toggleCart: () => void;
  setCartOpen: (isOpen: boolean) => void;
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isCartOpen: false,
      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
      setCartOpen: (isOpen) => set({ isCartOpen: isOpen }),
      addItem: (newItem) => {
        set((state) => {
          const existingIndex = state.items.findIndex((item) => item.id === newItem.id);
          let newItems = [...state.items];
          const qty = newItem.quantity ?? 1;

          if (existingIndex > -1) {
            newItems[existingIndex] = {
              ...newItems[existingIndex],
              quantity: newItems[existingIndex].quantity + qty,
            };
          } else {
            newItems.push({
              id: newItem.id,
              name: newItem.name,
              price: newItem.price,
              emoji: newItem.emoji,
              detail: newItem.detail,
              type: newItem.type || 'product',
              quantity: qty,
            });
          }

          // Open cart drawer on add
          return { items: newItems, isCartOpen: true };
        });
      },
      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },
      updateQuantity: (id, quantity) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
          ),
        }));
      },
      clearCart: () => set({ items: [] }),
      totalItems: () => {
        const state = get();
        return state.items.reduce((acc, item) => acc + item.quantity, 0);
      },
      totalPrice: () => {
        const state = get();
        return state.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
      },
    }),
    {
      name: 'selva-alta-cart',
      storage: createJSONStorage(() => localStorage),
      // Only persist items list (not UI states like isOpen)
      partialize: (state) => ({ items: state.items }),
    }
  )
);
