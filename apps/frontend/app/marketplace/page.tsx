"use client";
import React from "react";
import ProductList, { MarketplaceProduct } from "../../components/ProductList";
import { useCart } from "../../components/CartContext";
import { useRouter } from "next/navigation";
import CartTracker from "../../components/CartTracker";

const availableProducts: MarketplaceProduct[] = [
  {
    name: "ZUNMOS Fabric Dresser for Bedroom 9 Drawer, Grey",
    co2: 2.1, water: 10.2, waste: 0.3, score: 80,
    image: "/zunmos.jpeg",
    badge: "Best seller",
    badgeColor: "bg-blue-100 text-blue-800",
    price: 54.99,
    oldPrice: 95.99,
    savings: 41.00,
    rating: 5,
    ratingCount: 10978,
    variants: ["Grey", "Brown", "Black"],
    variantImages: ["https://i.imgur.com/brown.png", "https://i.imgur.com/black.png"],
    delivery: "Free shipping, arrives in 3+ days",
    description: "ZUNMOS Fabric Dresser for Bedroom 9 Drawer, Grey",
  },
  {
    name: "Neutrogena Ultra Sheer Sunscreen Spray, SPF 70, 5 oz",
    co2: 0.5, water: 2.0, waste: 0.05, score: 70,
    image: "/neutrogena.jpg",
    badge: "Rollback",
    badgeColor: "bg-red-100 text-red-800",
    price: 8.88,
    oldPrice: 9.88,
    savings: 1.00,
    rating: 4,
    ratingCount: 1794,
    variants: ["70 SPF", "50 SPF"],
    variantImages: ["https://i.imgur.com/brown.png", "https://i.imgur.com/black.png"],
    delivery: "Pickup today, Shipping arrives today",
    description: "Neutrogena Ultra Sheer Sunscreen Spray, Lightweight, SPF 70, 5 oz",
  },
  {
    name: "ASUDESIRE 5 Pack Men's Athletic Shorts",
    co2: 1.0, water: 5.0, waste: 0.2, score: 75,
    image: "/asudesire.jpg",
    badge: "Best seller",
    badgeColor: "bg-blue-100 text-blue-800",
    price: 29.99,
    oldPrice: 49.99,
    savings: 20.00,
    rating: 5,
    ratingCount: 3683,
    variants: ["Black", "Grey", "Navy"],
    variantImages: ["https://i.imgur.com/shorts1.png", "https://i.imgur.com/shorts2.png", "https://i.imgur.com/shorts3.png"],
    delivery: "Shipping, arrives in 2 days",
    description: "ASUDESIRE 5 Pack Men's Athletic Shorts Mesh Workout Gym Activewear Basketball Shorts 8'' Inseam With Pockets",
  },
  {
    name: "Samsung 34(86.42cm) Odyssey G5 Curved Gaming Monitor",
    co2: 10.0, water: 20.0, waste: 1.0, score: 60,
    image: "/samsung.jpg",
    badge: "Rollback",
    badgeColor: "bg-red-100 text-red-800",
    price: 378.00,
    oldPrice: 498.00,
    savings: 120.00,
    rating: 4,
    ratingCount: 3584,
    variants: ["65''"],
    variantImages: ["https://i.imgur.com/brown.png", "https://i.imgur.com/black.png"],
    delivery: "Free shipping, arrives today",
    description: "VIZIO 65'' Class Quantum 4K QLED HDR Smart TV (NEW) M65Q6-L4",
  },
  {
    name: "Samsung R861 Galaxy Watch FE, 40mm, Black",
    co2: 0.8, water: 1.5, waste: 0.02, score: 90,
    image: "/samsung_watch.jpg",
    badge: "Best seller",
    badgeColor: "bg-blue-100 text-blue-800",
    price: 23.99,
    oldPrice: 159.99,
    savings: 136.00,
    rating: 4,
    ratingCount: 12165,
    variants: ["Black", "Silver"],
    variantImages: ["https://i.imgur.com/brown.png", "https://i.imgur.com/black.png"],
    delivery: "Shipping, arrives in 2 days",
    description: "Mingdaln 2025 New 1.85-inch Men Women's Smartwatch with Answer/Make Calls/120+Sports Modes/10 Days Standby...",
  },
];

export default function MarketplacePage() {
  const { cart, addToCart, updateQuantity, deleteFromCart } = useCart();
  const router = useRouter();

  return (
    <main className="min-h-screen w-full bg-white flex flex-row items-start justify-center px-2 py-8 sm:px-8 gap-8">
      {/* Product List in the center/left */}
      <div className="flex-1 flex flex-col items-center">
        <div className="w-full max-w-5xl bg-white">
          <ProductList products={availableProducts} onAddToCart={addToCart} />
        </div>
      </div>
      {/* Cart Sidebar on the right */}
      <aside className="w-full max-w-xs bg-zinc-50 dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-4 sticky top-8 self-start ml-4 flex flex-col items-center">
        <CartTracker
          cart={cart}
          onQuantity={updateQuantity}
          onDelete={deleteFromCart}
        />
        <button
          className="mt-8 w-full px-8 py-3 rounded bg-blue-600 text-white font-semibold text-lg hover:bg-blue-700 transition shadow min-w-[180px]"
          onClick={() => router.push("/checkout")}
          disabled={cart.length === 0}
        >
          Checkout
        </button>
      </aside>
    </main>
  );
} 