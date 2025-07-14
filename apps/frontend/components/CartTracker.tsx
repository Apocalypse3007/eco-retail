"use client";
import React, { useState } from "react";
import type { Product } from "./SustainabilityFeedback";

interface CartTrackerProps {
  onSelectItem?: (item: { product: Product; quantity: number }) => void;
  selectedItemName?: string;
  cart: { product: Product; quantity: number }[];
  onQuantity: (name: string, delta: number) => void;
  onDelete: (name: string) => void;
}

const CartTracker: React.FC<CartTrackerProps> = ({ onSelectItem, selectedItemName, cart, onQuantity, onDelete }) => {
  const [localSelected, setLocalSelected] = useState<string | null>(null);
  const selected = selectedItemName ?? localSelected;

  const totals = cart.reduce(
    (acc, item) => ({
      co2: acc.co2 + item.product.co2 * item.quantity,
      water: acc.water + item.product.water * item.quantity,
      waste: acc.waste + item.product.waste * item.quantity,
    }),
    { co2: 0, water: 0, waste: 0 }
  );

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold mb-2">Cart Tracker</h2>
      <ul className="flex flex-col gap-2">
        {cart.map((item, idx) => (
          <li
            key={item.product.name}
            className={`flex justify-between items-center bg-zinc-100 dark:bg-zinc-800 rounded-lg px-4 py-2 border border-zinc-200 dark:border-zinc-700 shadow-sm cursor-pointer transition-colors ${selected === item.product.name ? 'ring-2 ring-green-500' : ''}`}
            onClick={() => {
              setLocalSelected(item.product.name);
              onSelectItem?.(item);
            }}
          >
            <span>{item.product.name}</span>
            <span className="text-xs text-zinc-500 flex gap-2">
              🌱 {(item.product.co2 * item.quantity).toFixed(2)}kg CO₂ | 💧 {(item.product.water * item.quantity).toFixed(2)}L | 🧴 {(item.product.waste * item.quantity).toFixed(2)}kg
            </span>
            <div className="flex items-center gap-2 ml-4">
              <button
                className="px-2 py-1 rounded bg-zinc-300 dark:bg-zinc-700 text-black dark:text-white text-sm"
                onClick={e => { e.stopPropagation(); onQuantity(item.product.name, -1); }}
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="px-2 text-base font-semibold select-none">{item.quantity}</span>
              <button
                className="px-2 py-1 rounded bg-zinc-300 dark:bg-zinc-700 text-black dark:text-white text-sm"
                onClick={e => { e.stopPropagation(); onQuantity(item.product.name, 1); }}
                aria-label="Increase quantity"
              >
                +
              </button>
              <button
                className="ml-2 px-2 py-1 rounded bg-red-600 text-white text-sm hover:bg-red-700"
                onClick={e => { e.stopPropagation(); onDelete(item.product.name); }}
                aria-label="Delete item"
              >
                🗑️
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-2 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow flex flex-col gap-1">
        <span className="font-medium">Total Impact</span>
        <span className="text-sm">🌱 CO₂: <b>{totals.co2.toFixed(2)}kg</b></span>
        <span className="text-sm">💧 Water: <b>{totals.water.toFixed(2)}L</b></span>
        <span className="text-sm">🧴 Waste: <b>{totals.waste.toFixed(2)}kg</b></span>
      </div>
    </div>
  );
};

export default CartTracker; 