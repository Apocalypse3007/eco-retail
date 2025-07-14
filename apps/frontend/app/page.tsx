"use client";
import Link from "next/link";

export default function LaunchPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <div className="max-w-2xl w-full text-center py-16">
        <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-green-500 ">
          Welcome to Eco Retail
        </h1>
        <p className="text-lg text-black mb-8">
          Transform your shopping experience with real-time sustainability insights, smart suggestions, and a greener cart. Shop consciously, save more, and make a positive impact!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/marketplace">
            <button className="px-6 py-3 rounded bg-green-600 text-white font-semibold text-lg hover:bg-green-700 transition shadow">
              Go to Marketplace
            </button>
          </Link>
          <Link href="/checkout">
            <button className="px-6 py-3 rounded bg-blue-600 text-white font-semibold text-lg hover:bg-blue-700 transition shadow">
              View your cart
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
