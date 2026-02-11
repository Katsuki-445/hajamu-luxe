"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "./CartContext";
import { useRouter } from "next/navigation";

type ProductProps = {
  id: string;
  name: string;
  title?: string;
  description?: string;
  image: string;
  price: number;
  category?: string;
};

export default function ProductDetailView({ product }: { product: ProductProps }) {
  const { addToCart } = useCart();
  const router = useRouter();
  const imgRef = React.useRef<HTMLButtonElement | null>(null);

  function flyToCart() {
    try {
      const source = imgRef.current;
      const target = document.getElementById("cart-icon");
      if (!source || !target) return;
      
      const sRect = source.getBoundingClientRect();
      const tRect = target.getBoundingClientRect();
      
      const ghost = document.createElement("img");
      ghost.src = product.image;
      ghost.style.position = "fixed";
      // Start centered on the button container
      ghost.style.left = `${sRect.left + sRect.width / 2 - 40}px`;
      ghost.style.top = `${sRect.top + sRect.height / 2 - 40}px`;
      ghost.style.width = "80px";
      ghost.style.height = "80px";
      ghost.style.objectFit = "cover";
      ghost.style.borderRadius = "50%"; // Make it circular
      ghost.style.border = "2px solid white";
      ghost.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
      ghost.style.zIndex = "9999";
      ghost.style.pointerEvents = "none";
      ghost.style.transition = "transform 800ms cubic-bezier(0.2, 0.8, 0.2, 1), opacity 800ms ease-in";
      ghost.style.opacity = "1";
      
      document.body.appendChild(ghost);
      
      const dx = tRect.left + tRect.width / 2 - (sRect.left + sRect.width / 2);
      const dy = tRect.top + tRect.height / 2 - (sRect.top + sRect.height / 2);
      
      // Use setTimeout to ensure browser paints initial state
      setTimeout(() => {
        ghost.style.transform = `translate(${dx}px, ${dy}px) scale(0.1)`;
        ghost.style.opacity = "0.5";
      }, 10);
      
      ghost.addEventListener("transitionend", () => {
        ghost.remove();
      });
    } catch (e) {
      console.error("Fly animation error:", e);
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <Link 
        href="/collections" 
        className="inline-flex items-center text-sm font-medium tracking-wide text-gray-500 hover:text-gray-900 transition-colors mb-8 group"
      >
        <span className="mr-2 transform group-hover:-translate-x-1 transition-transform">←</span>
        Back To Shop
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-gray-50 shadow-sm">
        <Image
          src={product.image}
          alt={product.name || product.title || ""}
          fill
          className="object-cover object-center"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
      </div>
      <div className="space-y-6">
        <h1 className="text-4xl font-serif font-bold text-gray-900">{product.name || product.title}</h1>
        <p className="text-gray-600">{product.description}</p>
        <p className="text-2xl font-semibold text-gray-900">GHS {product.price.toFixed(2)}</p>
        <div className="flex space-x-4 pt-4">
          <button
            ref={imgRef}
            onClick={() => {
              flyToCart();
              addToCart({
                id: product.id,
                category: product.category || "General",
                image: product.image,
                title: product.title || product.name || "Product",
                name: product.name,
                price: `GHS ${product.price.toFixed(2)}`,
                description: product.description,
              });
            }}
            className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors active:scale-95"
          >
            Add to Cart
          </button>
          <button
            onClick={() => {
              addToCart({
                id: product.id,
                category: product.category || "General",
                image: product.image,
                title: product.title || product.name || "Product",
                name: product.name,
                price: `GHS ${product.price.toFixed(2)}`,
                description: product.description,
              });
              router.push("/checkout");
            }}
            className="px-6 py-3 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors md:w-auto text-center active:scale-95"
          >
            Buy Now
          </button>
        </div>
      </div>
      </div>
    </div>
  );
}
