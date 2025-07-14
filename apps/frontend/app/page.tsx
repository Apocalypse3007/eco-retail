"use client";
import React, { useState } from "react";
import ScanProduct from "../components/ScanProduct";
import SustainabilityFeedback, { Product } from "../components/SustainabilityFeedback";
import SmartSuggestions from "../components/SmartSuggestions";
import CartTracker from "../components/CartTracker";
import Gamification from "../components/Gamification";
import { useCart } from "../components/CartContext";

const suggestions: Product[] = [
  { name: "Plant-Based Detergent", co2: 0.9, water: 4.8, waste: 0.08, score: 91 },
  { name: "Refillable Cleaner", co2: 0.7, water: 3.2, waste: 0.05, score: 95 },
  { name: "Bulk Eco Soap", co2: 0.8, water: 3.5, waste: 0.06, score: 93 },
];

export default function Home() {
  const { cart, updateQuantity, deleteFromCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(cart[0]?.product);
  const [swapModal, setSwapModal] = useState<{ alt: Product } | null>(null);
  const [swapTarget, setSwapTarget] = useState<string>("");

  React.useEffect(() => {
    if (!cart.find((item) => item.product.name === selectedProduct?.name)) {
      setSelectedProduct(cart[0]?.product);
    }
  }, [cart]);

  const handleSwap = (alt: Product) => {
    setSwapModal({ alt });
    setSwapTarget("");
  };

  const confirmSwap = () => {
    if (!swapModal || !swapTarget) return;
    // Remove the swapped-out item and add/increment the alt product
    deleteFromCart(swapTarget);
    updateQuantity(swapModal.alt.name, 1);
    setSelectedProduct(swapModal.alt);
    setSwapModal(null);
    setSwapTarget("");
  };

  return (
    <main className="min-h-screen w-full bg-background text-foreground flex flex-col items-center justify-center px-2 py-8 sm:px-8 gap-8">
      {swapModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-lg p-6 min-w-[300px]">
            <h3 className="text-lg font-semibold mb-4">Swap with which cart item?</h3>
            <select
              className="w-full mb-4 p-2 rounded border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800"
              value={swapTarget}
              onChange={e => setSwapTarget(e.target.value)}
            >
              <option value="" disabled>Select cart item</option>
              {cart.map(item => (
                <option key={item.product.name} value={item.product.name}>{item.product.name}</option>
              ))}
            </select>
            <div className="flex gap-2 justify-end">
              <button className="px-4 py-2 rounded bg-zinc-300 dark:bg-zinc-700 text-black dark:text-white" onClick={() => setSwapModal(null)}>Cancel</button>
              <button className="px-4 py-2 rounded bg-green-600 text-white" disabled={!swapTarget} onClick={confirmSwap}>Swap</button>
            </div>
          </div>
        </div>
      )}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="col-span-1 flex flex-col gap-8">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-6 transition-colors">
            <ScanProduct />
          </div>
          <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-6 transition-colors">
            {cart.length === 0 ? (
              <div className="text-center text-zinc-500 py-8">No product selected. Add items to your cart to see sustainability feedback.</div>
            ) : (
              <SustainabilityFeedback product={selectedProduct} />
            )}
          </div>
          <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-6 transition-colors">
            <SmartSuggestions suggestions={suggestions} onSwap={handleSwap} />
          </div>
        </section>
        <section className="col-span-1 flex flex-col gap-8">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-6 transition-colors">
            <CartTracker
              onSelectItem={(item) => setSelectedProduct(item.product)}
              selectedItemName={selectedProduct?.name}
              cart={cart}
              onQuantity={updateQuantity}
              onDelete={deleteFromCart}
            />
          </div>
          <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-6 transition-colors">
            <Gamification />
          </div>
        </section>
      </div>
    </main>
  );
}
