"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { urlFor } from "@/src/sanity/image";
import CollectionSkeleton from './CollectionSkeleton';
import { motion, AnimatePresence } from "framer-motion";

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
  image?: any;
  images?: { asset?: { url: string } }[];
  collection?: { _id: string };
};

interface ProductFilterListProps {
  collections: Collection[];
  products: Product[];
}

export default function ProductFilterList({ collections, products }: ProductFilterListProps) {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [mounted, setMounted] = useState(false);
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q')?.toLowerCase() || '';

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredCollections = activeFilter === 'all' 
    ? collections 
    : collections.filter(c => c._id === activeFilter || c.slug?.current === activeFilter);
  
  // Filter products based on search query
  const searchedProducts = searchQuery
    ? products.filter(p => 
        p.name.toLowerCase().includes(searchQuery) || 
        p.description?.toLowerCase().includes(searchQuery)
      )
    : products;

  // If we are searching, we might want to know if there are NO results across all collections
  const hasSearchResults = searchedProducts.length > 0;

  return (
    <div className="space-y-8" suppressHydrationWarning>
      {/* Search Results Header */}
      {searchQuery && (
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-serif text-gray-900">
            {hasSearchResults 
              ? `Search results for "${searchParams.get('q')}"`
              : `No results found for "${searchParams.get('q')}"`
            }
          </h2>
          {hasSearchResults && <p className="text-gray-500 mt-2">Found {searchedProducts.length} items</p>}
          {!hasSearchResults && (
             <Link 
               href="/collections"
               className="mt-4 inline-block text-sm font-medium text-gray-900 underline hover:text-gray-700"
             >
               View all collections
             </Link>
          )}
        </div>
      )}

      {/* Filter Bar - Hide if no results */}
      {hasSearchResults && (
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-6 py-2 rounded-full border transition-all duration-300 ${
              activeFilter === 'all'
                ? 'bg-gray-900 text-white border-gray-900'
                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-900 hover:text-gray-900'
            }`}
          >
            All
          </button>
          {collections.map((c) => (
            <button
              key={c._id}
              onClick={() => setActiveFilter(c._id)}
              className={`px-6 py-2 rounded-full border transition-all duration-300 ${
                activeFilter === c._id
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-900 hover:text-gray-900'
              }`}
            >
              {c.title}
            </button>
          ))}
        </div>
      )}

      {/* Product Grid */}
      <div className="space-y-24">
        {!mounted ? (
          <section className="max-w-7xl mx-auto px-6">
            <div className="h-10 bg-gray-200 rounded w-48 mb-8 animate-pulse" />
            <CollectionSkeleton />
          </section>
        ) : (
          hasSearchResults && filteredCollections.map((c) => {
            const items = searchedProducts.filter((p) => p.collection?._id === c._id);
            const displayItems = items;

            if (displayItems.length === 0) return null;

            return (
              <section key={c._id} className="max-w-7xl mx-auto px-6">
                <div className="flex items-end justify-between mb-8 border-b border-gray-100 pb-4">
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">{c.title}</h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  <AnimatePresence mode="popLayout">
                    {displayItems.map((p) => (
                      <motion.div
                        key={p._id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Link href={`/product/${p.slug?.current}`} className="group block cursor-pointer">
                          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-gray-50 mb-4 shadow-sm group-hover:shadow-md transition-all duration-300">
                            <Image
                              src={(p.images?.[0] || p.image) ? urlFor(p.images?.[0] || p.image) || "" : "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='600'><rect width='100%' height='100%' fill='%23f3f4f6'/></svg>"}
                              alt={p.name}
                              fill
                              className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors pointer-events-none" />
                          </div>
                          <div className="space-y-1">
                            <h3 className="text-base font-serif font-semibold text-gray-900 group-hover:text-gray-700 line-clamp-1">
                              {p.name}
                            </h3>
                            <div className="text-sm font-medium text-gray-600">GH₵ {p.price}</div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </section>
            );
          })
        )}
      </div>
    </div>
  );
}
