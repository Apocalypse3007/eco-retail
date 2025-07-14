"use client";
import React, { useState } from "react";
import ProductList from "../../components/ProductList";
import type { Product } from "../../components/SustainabilityFeedback";

const availableProducts: Product[] = [
  { name: "Eco-Friendly Detergent", co2: 1.2, water: 5.4, waste: 0.1, score: 82 },
  { name: "Plant-Based Detergent", co2: 0.9, water: 4.8, waste: 0.08, score: 91 },
  { name: "Refillable Cleaner", co2: 0.7, water: 3.2, waste: 0.05, score: 95 },
  { name: "Bulk Eco Soap", co2: 0.8, water: 3.5, waste: 0.06, score: 93 },
  { name: "Organic Shampoo", co2: 1.0, water: 4.0, waste: 0.09, score: 88 },
  { name: "Bamboo Toothbrush", co2: 0.2, water: 0.5, waste: 0.01, score: 98 },
];

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