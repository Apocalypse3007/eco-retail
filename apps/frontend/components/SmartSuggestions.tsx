"use client";
import React from "react";
import type { Product } from "./SustainabilityFeedback";

interface SmartSuggestionsProps {
  suggestions: Product[];
  onSwap: (alt: Product) => void;
}

const SmartSuggestions: React.FC<SmartSuggestionsProps> = ({ suggestions, onSwap }) => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold mb-2">More Sustainable Alternatives</h2>
      <ul className="flex flex-col gap-3">
        {suggestions.map((alt, idx) => (
          <li
            key={alt.name}
            className="flex items-center justify-between bg-zinc-100 dark:bg-zinc-800 rounded-lg px-4 py-2 shadow-sm border border-zinc-200 dark:border-zinc-700"
          >
            <div>
              <span className="font-medium">{alt.name}</span>
              <span className="ml-2 text-xs text-green-600 dark:text-green-400">{alt.score}% match</span>
            </div>
            <button className="px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700 transition text-sm shadow" onClick={() => onSwap(alt)}>
              Swap
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SmartSuggestions; 