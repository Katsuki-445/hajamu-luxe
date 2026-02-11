import React from 'react';
import Header from "@/components/Header";

export default function About() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="max-w-3xl mx-auto px-6 py-24">
        <h1 className="text-4xl font-serif font-bold text-gray-900 mb-6">About HAJAMU LUXE</h1>
        <div className="prose prose-lg text-gray-600">
          <p className="mb-6">
            Welcome to HAJAMU LUXE, where tradition meets modern elegance. We are dedicated to showcasing the finest African craftsmanship through our curated collection of Smocks, Kente, Gele, Beads, and Sandals.
          </p>
          <p>
            Our mission is to preserve cultural heritage while providing premium quality products that speak to the soul of luxury. Each piece in our collection is handpicked and crafted with meticulous attention to detail.
          </p>
        </div>
      </div>
    </main>
  );
}
