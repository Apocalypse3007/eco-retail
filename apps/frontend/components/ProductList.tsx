"use client";
import React from "react";
import type { Product } from "./SustainabilityFeedback";
import { useCart } from "./CartContext";
import { useRouter } from "next/navigation";

export interface MarketplaceProduct extends Product {
  image: string;
  badge?: string;
  badgeColor?: string;
  price: number;
  oldPrice?: number;
  savings?: number;
  rating?: number;
  ratingCount?: number;
  variants?: string[];
  variantImages?: string[];
  delivery?: string;
  description?: string;
}

interface ProductListProps {
  products: MarketplaceProduct[];
  onAddToCart: (product: MarketplaceProduct) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onAddToCart }) => {
  const { cart, updateQuantity, deleteFromCart } = useCart();
  const router = useRouter();

  const getSlug = (name: string) =>
    name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold mb-2 text-zinc-900">Available Products</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => {
          const cartItem = cart.find((item) => item.product.name === product.name);
          return (
            <li
              key={product.name}
              className="relative bg-white rounded-xl shadow border border-zinc-200 p-4 flex flex-col gap-2 group transition-all duration-300 hover:shadow-2xl hover:scale-105 cursor-pointer"
              style={{ willChange: "transform" }}
              onClick={() => router.push(`/products/${getSlug(product.name)}`)}
            >
              {/* Badge */}
              {product.badge && (
                <span className={`absolute top-3 left-3 px-2 py-1 rounded text-xs font-semibold ${product.badgeColor || 'bg-blue-100 text-blue-800'}`}>{product.badge}</span>
              )}
              {/* Wishlist icon */}
              <button className="absolute top-3 right-3 text-zinc-400 hover:text-red-500 transition text-xl" aria-label="Add to wishlist">♡</button>
              {/* Product image */}
              <div className="w-full h-48 flex items-center justify-center bg-white mb-2">
                <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
              </div>
              {/* Variants */}
              {product.variantImages && product.variantImages.length > 0 && (
                <div className="flex gap-1 mb-1">
                  {product.variantImages.slice(0, 4).map((v, i) => (
                    <img key={i} src={v} alt="variant" className="w-6 h-6 rounded-full border border-zinc-300" />
                  ))}
                  {product.variantImages.length > 4 && <span className="text-xs">+</span>}
                </div>
              )}
              {/* Price and savings */}
              <div className="flex items-end gap-2">
                <span className="text-green-700 font-bold text-lg">Now ${product.price?.toFixed(2) ?? product.score}</span>
                {product.oldPrice && (
                  <span className="line-through text-zinc-400 text-sm">${product.oldPrice.toFixed(2)}</span>
                )}
              </div>
              {product.savings && (
                <span className="text-green-600 text-xs font-semibold">You save ${product.savings.toFixed(2)}</span>
              )}
              {/* Title/description */}
              <span className="font-bold text-base mt-1 mb-0.5 text-zinc-900">{product.name}</span>
              {/* Rating */}
              {product.rating && (
                <span className="flex items-center gap-1 text-xs text-yellow-600">
                  {'★'.repeat(Math.round(product.rating))}
                  <span className="text-zinc-500 ml-1">({product.ratingCount})</span>
                </span>
              )}
              {/* Delivery */}
              {product.delivery && (
                <span className="text-xs text-zinc-500">{product.delivery}</span>
              )}
              {/* Sustainability/Carbon/Score */}
              <div className="mt-2">
                <div className="flex gap-4 text-sm items-center font-semibold">
                  <span className="flex items-center gap-1 text-black">
                    <span style={{ fontSize: '1.2em' }}></span> CO₂: <b>{product.co2}kg</b>
                  </span>
                  <span className="flex items-center gap-1 text-black">
                    <span style={{ fontSize: '1.2em' }}></span> Water: <b>{product.water}L</b>
                  </span>
                  <span className="flex items-center gap-1 text-black">
                    <span style={{ fontSize: '1.2em' }}></span> Waste: <b>{product.waste}kg</b>
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-zinc-700 font-semibold">Sustainability Score</span>
                  <div className="flex-1 h-3 bg-zinc-200 dark:bg-zinc-800 rounded relative overflow-hidden">
                    <div
                      className="h-3 rounded bg-green-500 transition-all duration-500"
                      style={{ width: `${product.score}%` }}
                    ></div>
                  </div>
                  <span className="text-base font-extrabold text-green-700 dark:text-green-300 ml-1">{product.score}</span>
                </div>
              </div>
              {/* Add to cart/options button or counter */}
              {cartItem ? (
                <div className="flex items-center gap-2 mt-2">
                  <button
                    className="px-3 py-1 rounded bg-zinc-200 text-black text-lg font-bold "
                    onClick={(e) => { e.stopPropagation(); updateQuantity(product.name, -1); }}
                  >
                    -
                  </button>
                  <span className="min-w-[2ch] text-center font-semibold text-black">{cartItem.quantity}</span>
                  <button
                    className="px-3 py-1 rounded bg-zinc-200 text-black text-lg font-bold "
                    onClick={(e) => { e.stopPropagation(); updateQuantity(product.name, 1); }}
                  >
                    +
                  </button>
                </div>
              ) : (
                <button
                  className="mt-2 px-4 py-2 rounded bg-blue-700 text-white hover:bg-blue-800 transition shadow self-start"
                  onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
                  type="button"
                >
                  + Add
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ProductList; 