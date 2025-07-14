"use client";
import React, { createContext, useContext, useState } from "react";
import type { Product } from "./SustainabilityFeedback";

type CartItem = { product: Product; quantity: number };

interface CartContextType {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  addToCart: (product: Product) => void;
  updateQuantity: (name: string, delta: number) => void;
  deleteFromCart: (name: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const idx = prev.findIndex((item) => item.product.name === product.name);
      if (idx !== -1) {
        const updated = [...prev];
        updated[idx].quantity += 1;
        return updated;
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const updateQuantity = (name: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.product.name === name
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const deleteFromCart = (name: string) => {
    setCart((prev) => prev.filter((item) => item.product.name !== name));
  };

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, updateQuantity, deleteFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
} 