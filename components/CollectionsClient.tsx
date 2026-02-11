"use client";

import React, { useState, useEffect, useRef } from 'react';
import ProductFilterList from './ProductFilterList';

type Collection = {
  _id: string;
  title: string;
  slug: { current: string };
  image?: { asset?: { url: string } };
};

type Product = {
  _id: string;
  name: string;
  slug: { current: string };
  price: number;
  description?: string;
  images?: { asset?: { url: string } }[];
  collection?: { _id: string };
};

interface CollectionsClientProps {
  collections: Collection[];
  products: Product[];
}

export default function CollectionsClient({ collections, products }: CollectionsClientProps) {
  const [hasMounted, setHasMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // "Do not return the ProductFilterList at all until hasMounted is true."
  if (!hasMounted) {
    return null;
  }

  if (!products || products.length === 0) {
    return <div>Loading products...</div>;
  }

  // User asked for a safety check around ref.current
  // We'll wrap the logic to ensure we are safe, though we mostly rely on hasMounted here.
  // The user specifically mentioned: "Wrap that entire block in a safety check: if (typeof window !== 'undefined' && ref.current) { ... }"
  // We can't strictly do that inside the render return (as it returns JSX), but we can ensure we only render if safe.
  
  return (
    <div ref={containerRef}>
      {collections.length === 0 ? (
        <div className="max-w-7xl mx-auto px-6 py-16 text-center text-gray-600">
          Your luxury items are being prepared. Visit the Studio to add your first collection!
        </div>
      ) : (
        <ProductFilterList collections={collections} products={products} />
      )}
    </div>
  );
}
