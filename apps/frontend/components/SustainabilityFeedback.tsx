"use client";
import React from "react";

export interface Product {
  name: string;
  co2: number;
  water: number;
  waste: number;
  score: number;
}

interface SustainabilityFeedbackProps {
  product?: Product;
}

const SustainabilityFeedback: React.FC<SustainabilityFeedbackProps> = ({ product }) => {
  const fallback = {
    name: "Eco-Friendly Detergent",
    co2: 1.2,
    water: 5.4,
    waste: 0.1,
    score: 82,
  };
  const p = product || fallback;

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold mb-2">Sustainability Feedback</h2>
      <div className="flex flex-col gap-2">
        <span className="text-lg font-medium">{p.name}</span>
        <div className="flex gap-4 text-sm">
          <span className="flex items-center gap-1">🌱 CO₂: <b>{p.co2}kg</b></span>
          <span className="flex items-center gap-1">💧 Water: <b>{p.water}L</b></span>
          <span className="flex items-center gap-1">🧴 Waste: <b>{p.waste}kg</b></span>
        </div>
        <div className="mt-2">
          <div className="flex justify-between text-xs mb-1">
            <span>Sustainability Score</span>
            <span>{p.score}/100</span>
          </div>
          <div className="w-full bg-zinc-200 dark:bg-zinc-800 rounded h-3 relative overflow-hidden">
            <div
              className="h-3 rounded bg-green-500 transition-all duration-500 flex items-center justify-end pr-2"
              style={{ width: `${p.score}%` }}
            >
              <span className="text-xs text-white font-bold" style={{display: p.score > 10 ? 'block' : 'none'}}>{p.score}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SustainabilityFeedback; 