"use client";
import { useCart } from "../../components/CartContext";
import SustainabilityFeedback from "../../components/SustainabilityFeedback";
import React from "react";
import SmartSuggestions from "../../components/SmartSuggestions";
import Gamification from "../../components/Gamification";
import type { Product as BaseProduct } from "../../components/SustainabilityFeedback";

// Extend Product type to allow optional images array
export type Product = BaseProduct & { images?: string[] };
import { FaTrash } from "react-icons/fa";

export default function CheckoutPage() {
  const { cart, setCart, deleteFromCart } = useCart();
  const total = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const [swappedProduct, setSwappedProduct] = React.useState<Product | null>(null);

  // Demo: hardcoded greener alternatives for the first product in cart
  const suggestions = cart.length > 0 ? [
    {
      name: "Plant-Based Detergent",
      co2: 0.9,
      water: 4.8,
      waste: 0.08,
      score: 91,
      price: 12.99,
      image: "/plant-based.jpg"
    },
    {
      name: "Refillable Cleaner",
      co2: 0.7,
      water: 3.2,
      waste: 0.05,
      score: 95,
      price: 10.99,
      image: "/refillable.jpg"
    }
  ] : [];

  const handleSwap = (alt: Product, originalProductName: string) => {
    setCart((prev) => {
      const idx = prev.findIndex(item => item.product.name === originalProductName);
      if (idx === -1) return prev;
      const updated = [...prev];
      updated[idx] = { ...updated[idx], product: alt };
      return updated;
    });
    setSwappedProduct(alt);
  };

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center px-2 py-8 sm:px-8 gap-8 bg-white">
      <div className="w-full max-w-3xl bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-8">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>
        {cart.length === 0 ? (
          <div className="text-center text-zinc-500 py-8">Your cart is empty.</div>
        ) : (
          <>
            <ul className="flex flex-col gap-6 mb-8">
              {cart.map((item, idx) => {
                // Suggest alternatives based on product type
                let suggestions = [];
                if (/monitor|display|screen/i.test(item.product.name)) {
                  suggestions = [
                    {
                      name: "Dell UltraSharp 27 4K USB-C Monitor (Eco Edition)",
                      co2: 6.0,
                      water: 12.0,
                      waste: 0.5,
                      score: 85,
                      price: 399.99,
                      image: "/dell_monitor.jpg"
                    },
                    {
                      name: "HP E27d G4 QHD Advanced Docking Monitor (Eco)",
                      co2: 5.5,
                      water: 11.0,
                      waste: 0.4,
                      score: 88,
                      price: 429.99,
                      image: "/hp_monitor.jpg"
                    }
                  ];
                } else if (/watch/i.test(item.product.name)) {
                  suggestions = [
                    {
                      name: "Garmin Instinct Solar Eco Edition",
                      co2: 0.5,
                      water: 1.0,
                      waste: 0.01,
                      score: 97,
                      price: 199.99,
                      image: "/garmin-eco-watch.jpg"
                    },
                    {
                      name: "Withings ScanWatch Light (Eco)",
                      co2: 0.4,
                      water: 0.8,
                      waste: 0.01,
                      score: 98,
                      price: 179.99,
                      image: "/withings-eco-watch.jpg"
                    }
                  ];
                } else {
                  suggestions = [
                    {
                      name: "Plant-Based Detergent",
                      co2: 0.9,
                      water: 4.8,
                      waste: 0.08,
                      score: 91,
                      price: 12.99,
                      image: "/plant-based.jpg"
                    },
                    {
                      name: "Refillable Cleaner",
                      co2: 0.7,
                      water: 3.2,
                      waste: 0.05,
                      score: 95,
                      price: 10.99,
                      image: "/refillable.jpg"
                    }
                  ];
                }
                return (
                  <li key={item.product.name} className="flex flex-col md:flex-row gap-4 items-start md:items-center border-b border-zinc-200 dark:border-zinc-700 pb-4 relative">
                    <img src={item.product.image} alt={item.product.name} className="w-24 h-24 object-contain rounded-lg border border-zinc-200 dark:border-zinc-700" />
                    <div className="flex-1">
                      <div className="font-semibold text-lg mb-1 flex items-center gap-2">
                        {item.product.name}
                        <span className="text-xs text-zinc-400">x{item.quantity}</span>
                        <button
                          className="ml-2 text-red-500 hover:text-red-700"
                          title="Remove from cart"
                          onClick={() => deleteFromCart(item.product.name)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                      <div className="text-sm text-zinc-500 mb-2">${item.product.price.toFixed(2)} each</div>
                      <SustainabilityFeedback product={item.product} />
                      {/* Greener alternatives for this product */}
                      <div className="mt-4">
                        <SmartSuggestions suggestions={suggestions} onSwap={(alt) => handleSwap(alt, item.product.name)} />
                      </div>
                      <div className="mt-2 flex gap-2">
                        {Array.isArray(item.product.image)
                          ? item.product.image.map((img: string, i: number) => (
                              <img
                                key={i}
                                src={img}
                                alt={item.product.name + ' image ' + (i + 1)}
                                className="w-32 h-32 object-contain rounded border border-zinc-300 mb-2"
                              />
                            ))
                          : item.product.image && (
                              <img
                                src={item.product.image}
                                alt={item.product.name}
                                className="w-32 h-32 object-contain rounded border border-zinc-300 mb-2"
                              />
                            )}
                      </div>
                    </div>
                    <div className="font-bold text-green-700 dark:text-green-400 text-lg">${(item.product.price * item.quantity).toFixed(2)}</div>
                  </li>
                );
              })}
            </ul>
            <div className="flex justify-between items-center mt-8">
              <span className="text-xl font-bold">Total:</span>
              <span className="text-2xl font-bold text-green-700 dark:text-green-400">${total.toFixed(2)}</span>
            </div>
            <button className="mt-8 w-full px-6 py-3 rounded bg-green-600 text-white font-semibold text-lg hover:bg-green-700 transition shadow">Place Order</button>
            {/* Offers and rewards */}
            <div className="mt-10">
              <Gamification />
            </div>
          </>
        )}
      </div>
    </main>
  );
} 