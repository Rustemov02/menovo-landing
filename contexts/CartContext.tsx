"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartItem, MenuItem } from "@/types";

interface CartContextValue {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
  addToCart: (item: MenuItem, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (item: MenuItem, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((c) => c.item._id === item._id);
      if (existing) {
        return prev.map((c) =>
          c.item._id === item._id
            ? { ...c, quantity: c.quantity + quantity }
            : c,
        );
      }
      return [...prev, { item, quantity }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setItems((prev) => prev.filter((c) => c.item._id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((c) => c.item._id !== itemId));
      return;
    }
    setItems((prev) =>
      prev.map((c) => (c.item._id === itemId ? { ...c, quantity } : c)),
    );
  };

  const clearCart = () => setItems([]);

  const { totalQuantity, totalPrice } = useMemo(() => {
    return items.reduce(
      (acc, c) => {
        acc.totalQuantity += c.quantity;
        acc.totalPrice += (c.item.price ?? 0) * c.quantity;
        return acc;
      },
      { totalQuantity: 0, totalPrice: 0 },
    );
  }, [items]);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      totalQuantity,
      totalPrice,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
    }),
    [items, totalQuantity, totalPrice],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}