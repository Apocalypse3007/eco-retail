"use client";
import React from "react";
import type { Product } from "./SustainabilityFeedback";

interface ProductListProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onAddToCart }) => {
  const handleAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    onAddToCart(product);
  };
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold mb-2">Available Products</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {products.map((product) => (
          <li key={product.name} className="bg-white dark:bg-zinc-900 rounded-xl shadow border border-zinc-200 dark:border-zinc-800 p-4 flex flex-col gap-2">
            <span className="font-medium text-lg">{product.name}</span>
            <span className="text-xs text-zinc-500 flex gap-2">
              🌱 {product.co2}kg CO₂ | 💧 {product.water}L | 🧴 {product.waste}kg
            </span>
            <span className="text-xs text-green-600 dark:text-green-400">Sustainability Score: {product.score}/100</span>
            <button
              className="mt-2 px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 transition shadow self-start"
              onClick={(e) => handleAdd(e, product)}
              type="button"
            >
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList; 