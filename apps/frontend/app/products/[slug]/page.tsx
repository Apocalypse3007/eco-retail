"use client";
import { useParams } from "next/navigation";
import { useCart } from "../../../components/CartContext";
import { MarketplaceProduct } from "../../../components/ProductList";
import SustainabilityFeedback from "../../../components/SustainabilityFeedback";
import React from "react";

// Extend MarketplaceProduct to allow optional images and specs
export interface ProductDetail extends MarketplaceProduct {
  images?: string[];
  specs?: Record<string, string>;
}

const availableProducts: ProductDetail[] = [
  {
    name: "ZUNMOS Fabric Dresser for Bedroom 9 Drawer, Grey",
    co2: 2.1, water: 10.2, waste: 0.3, score: 80,
    image: "https://i.imgur.com/1.jpg",
    images: [
      "https://i.imgur.com/1.jpg",
      "https://i.imgur.com/grey.png",
      "https://i.imgur.com/brown.png",
      "https://i.imgur.com/black.png"
    ],
    badge: "Best seller",
    badgeColor: "bg-blue-100 text-blue-800",
    price: 54.99,
    oldPrice: 95.99,
    savings: 41.00,
    rating: 5,
    ratingCount: 10978,
    variants: ["Grey", "Brown", "Black"],
    variantImages: ["https://i.imgur.com/grey.png", "https://i.imgur.com/brown.png", "https://i.imgur.com/black.png"],
    delivery: "Free shipping, arrives in 3+ days",
    description: "ZUNMOS Fabric Dresser for Bedroom 9 Drawer, Grey",
    specs: {
      Material: "Fabric, Steel, Wood",
      Dimensions: "39.4 x 11.8 x 39.3 inches",
      Weight: "25 lbs",
      Color: "Grey"
    }
  },
  {
    name: "Neutrogena Ultra Sheer Sunscreen Spray, SPF 70, 5 oz",
    co2: 0.5, water: 2.0, waste: 0.05, score: 70,
    image: "https://i.imgur.com/2.jpg",
    images: ["https://i.imgur.com/2.jpg"],
    badge: "Rollback",
    badgeColor: "bg-red-100 text-red-800",
    price: 8.88,
    oldPrice: 9.88,
    savings: 1.00,
    rating: 4,
    ratingCount: 1794,
    variants: ["70 SPF", "50 SPF"],
    delivery: "Pickup today, Shipping arrives today",
    description: "Neutrogena Ultra Sheer Sunscreen Spray, Lightweight, SPF 70, 5 oz",
    specs: {
      Size: "5 oz",
      SPF: "70",
      Type: "Spray",
      WaterResistant: "Yes"
    }
  },
  // ...add more products as needed
];

export default function ProductDetailPage() {
  const { slug } = useParams();
  const { addToCart } = useCart();
  const product = availableProducts.find(p => p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") === slug);

  if (!product) {
    return <div className="text-center py-16 text-zinc-500">Product not found.</div>;
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-2 py-8 sm:px-8 gap-8">
      <div className="w-full max-w-3xl bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-8 flex flex-col gap-8">
        {/* Image Gallery */}
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex flex-col gap-2 items-center">
            {product.images && product.images.length > 1 ? (
              <div className="flex flex-col gap-2 items-center">
                <img src={product.images[0]} alt={product.name} className="w-64 h-64 object-contain rounded-lg border border-zinc-200 dark:border-zinc-700" />
                <div className="flex gap-2 mt-2">
                  {product.images.map((img: string, idx: number) => (
                    <img key={idx} src={img} alt={product.name + ' ' + (idx+1)} className="w-16 h-16 object-contain rounded border border-zinc-300 cursor-pointer" />
                  ))}
                </div>
              </div>
            ) : (
              <img src={product.image} alt={product.name} className="w-64 h-64 object-contain rounded-lg border border-zinc-200 dark:border-zinc-700" />
            )}
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <span className={`px-2 py-1 rounded text-xs font-semibold self-start ${product.badgeColor}`}>{product.badge}</span>
            <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-end gap-2 mb-2">
              <span className="text-green-700 dark:text-green-400 font-bold text-xl">${product.price.toFixed(2)}</span>
              {product.oldPrice && <span className="line-through text-zinc-400 text-base">${product.oldPrice.toFixed(2)}</span>}
              {product.savings && <span className="text-green-600 text-xs font-semibold ml-2">You save ${product.savings.toFixed(2)}</span>}
            </div>
            <span className="flex items-center gap-1 text-xs text-yellow-600 mb-2">
              {'★'.repeat(Math.round(product.rating || 0))}
              <span className="text-zinc-500 ml-1">({product.ratingCount})</span>
            </span>
            <div className="text-sm text-zinc-500 mb-2">{product.description || "No description available for this product."}</div>
            <div className="mb-2"><SustainabilityFeedback product={product} /></div>
            <button className="mt-2 px-6 py-2 rounded bg-green-600 text-white font-semibold text-lg hover:bg-green-700 transition shadow self-start" onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        </div>
        {/* Specifications Section */}
        {product.specs && (
          <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-4 border border-zinc-200 dark:border-zinc-700">
            <h2 className="text-lg font-semibold mb-2">Specifications</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {Object.entries(product.specs).map(([key, value]) => (
                <li key={key} className="flex justify-between text-sm"><span className="font-medium">{key}:</span> <span>{value}</span></li>
              ))}
            </ul>
          </div>
        )}
        {/* Reviews Section (placeholder) */}
        <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-4 border border-zinc-200 dark:border-zinc-700">
          <h2 className="text-lg font-semibold mb-2">Customer Reviews</h2>
          <div className="text-zinc-500">No reviews yet. Be the first to review this product!</div>
        </div>
      </div>
    </main>
  );
} 