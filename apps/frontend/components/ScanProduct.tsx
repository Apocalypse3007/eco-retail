"use client";
import React, { useRef } from "react";
const ScanProduct: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold mb-2">Scan Product</h2>
      <div className="flex flex-col sm:flex-row gap-2 items-center">
        <input
          type="text"
          placeholder="Enter barcode or product code"
          className="w-full sm:w-64 px-3 py-2 rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <span className="text-zinc-400">or</span>
        <button
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition shadow"
          onClick={() => fileInputRef.current?.click()}
        >
          Upload Image
        </button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
        />
      </div>
      <button className="mt-2 px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 transition shadow self-start">
        Scan
      </button>
    </div>
  );
};

export default ScanProduct; 