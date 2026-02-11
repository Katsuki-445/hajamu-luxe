import React, { Suspense } from 'react';
import Header from "@/components/Header";
import ProductGrid from "@/components/ProductGrid";

export default function Products() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="pt-12">
        <div className="max-w-7xl mx-auto px-6 mb-8">
            <h1 className="text-4xl font-serif font-bold text-gray-900">All Products</h1>
        </div>
        <Suspense fallback={<div className="text-center py-20">Loading products...</div>}>
          <ProductGrid />
        </Suspense>
      </div>
    </main>
  );
}
