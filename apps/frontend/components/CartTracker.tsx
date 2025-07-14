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
      {/* Only show Total Impact, remove cart item list */}
      <div className="mt-2 p-8 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow flex flex-col gap-1 min-w-[260px] min-h-[180px]">
        <span className="font-semibold">Total Impact</span>
        <span className="text-md text-white font-semibold flex items-center gap-1"> CO₂: <b className='ml-1'>{totals.co2.toFixed(2)}kg</b></span>
        <span className="text-md text-white font-semibold flex items-center gap-1"> Water: <b className='ml-1'>{totals.water.toFixed(2)}L</b></span>
        <span className="text-md text-white font-semibold flex items-center gap-1"> Waste: <b className='ml-1'>{totals.waste.toFixed(2)}kg</b></span>
      </div>
    </div>
  );
};

export default CartTracker; 