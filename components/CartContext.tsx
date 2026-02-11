"use client";

import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import type { Product } from '@/src/data/products';

type CartItem = { product: Product; quantity: number };
type CartContextType = {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  hasMounted: boolean;
  count: number;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const raw = typeof window !== 'undefined' ? localStorage.getItem('hl_cart') : null;
      if (raw) {
        const parsed = JSON.parse(raw) as CartItem[];
        // Validate structure to prevent crashes from stale/invalid data
        if (Array.isArray(parsed) && parsed.every(i => i.product && typeof i.quantity === 'number')) {
          return parsed;
        }
      }
    } catch {}
    return [];
  });
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('hl_cart', JSON.stringify(items));
    } catch {}
  }, [items]);

  const addToCart = (product: Product, quantity = 1) => {
    setItems((prev) => {
      const idx = prev.findIndex(i => i.product.id === product.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], quantity: copy[idx].quantity + quantity };
        return copy;
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setItems((prev) => prev.filter(i => i.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setItems((prev) => prev.map(i => i.product.id === productId ? { ...i, quantity: Math.max(1, quantity) } : i));
  };
  
  const clearCart = () => {
    setItems([]);
    try {
      localStorage.removeItem('hl_cart');
    } catch {}
  };

  const count = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items]);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, hasMounted, count }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
