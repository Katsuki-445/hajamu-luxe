"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { products, categories } from '@/src/data/products';

 

export default function ProductGrid() {
  const params = useSearchParams();
  const q = (params.get('q') || '').toLowerCase();
  const matches = (p: { title: string; category: string }) =>
    !q || p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
  
  React.useEffect(() => {
    const cards = Array.from(document.querySelectorAll('.reveal'));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      });
    }, { threshold: 0.2 });
    cards.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="space-y-24 py-16">
      
      {categories.map((category) => {
        const items = products.filter(p => p.category === category && matches(p));
        // Show up to 6 items, no duplicates to avoid broken links
        const displayItems = items.slice(0, 6);
        
        if (displayItems.length === 0) return null;

        return (
          <section key={category} id={category.toLowerCase()} className="max-w-7xl mx-auto px-6 scroll-mt-32">
            <div className="flex items-end justify-between mb-8 border-b border-gray-100 pb-4">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">{category}</h2>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {displayItems.map((product) => (
                <Link key={product.id} href={`/product/${product.id}`} className="group block cursor-pointer reveal">
                  <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-gray-50 mb-4 shadow-sm group-hover:shadow-md transition-all duration-300">
                    <Image
                      src={product.image}
                      alt={product.name || product.title}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base font-serif font-semibold text-gray-900 group-hover:text-gray-700 line-clamp-1">
                      {product.name || product.title}
                    </h3>
                    <p className="text-sm font-medium text-gray-600">{product.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
