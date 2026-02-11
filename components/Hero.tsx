import React from 'react';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative w-full py-12 md:py-24 bg-gray-50/50 fade-up">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden rounded-2xl bg-white shadow-sm flex items-center justify-center">
          {/* Featured Smock Image */}
          <div className="relative w-full h-full max-w-lg md:max-w-xl mx-auto">
             <Image
              src="/images/smocks/1769703558021.png"
              alt="Featured HAJAMU LUXE Smock"
              fill
              className="object-contain p-8 hover:scale-105 transition-transform duration-700"
              priority
            />
          </div>
          
          {/* Optional Overlay Text matching the clean vibe */}
          <div className="absolute top-8 left-8 md:top-12 md:left-12 md:max-w-[45%] z-20">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6 fade-up tracking-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
              The Heritage Store
            </h2>
            <p className="text-gray-600 text-lg md:text-xl font-light fade-up leading-relaxed">
              Handcrafted elegance for every occasion.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
