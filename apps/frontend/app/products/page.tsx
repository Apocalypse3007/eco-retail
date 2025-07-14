"use client";
import React, { useState } from "react";
import ProductList from "../../components/ProductList";
import type { Product } from "../../components/SustainabilityFeedback";

const availableProducts: Product[] = [
]

export default function ProductsPage() {
  const [cart, setCart] = useState<Product[]>([]);

  const handleAddToCart = (product: Product) => {
    setCart((prev) => [...prev, product]);
    // In a real app, you would connect this to the main cart state or context
  };

  return (
    <main className="min-h-screen w-full bg-background text-foreground flex flex-col items-center justify-center px-2 py-8 sm:px-8 gap-8">
      <div className="w-full max-w-4xl">
        <ProductList products={availableProducts} onAddToCart={handleAddToCart} />
      </div>
      {/* For demo: show cart contents */}
      <div className="w-full max-w-4xl mt-8">
        <h3 className="text-lg font-semibold mb-2">Cart (local demo only)</h3>
        <ul className="flex flex-wrap gap-2">
          {cart.map((item, idx) => (
            <li key={idx} className="px-3 py-1 rounded bg-zinc-200 dark:bg-zinc-700 text-sm">
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
} 