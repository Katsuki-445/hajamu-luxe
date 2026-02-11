import React from 'react';

export default function CollectionSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 animate-pulse">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="group block">
          {/* Image Placeholder */}
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-gray-200 mb-4 shadow-sm" />
          
          {/* Text Placeholders */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-3 bg-gray-200 rounded w-1/4" />
          </div>
        </div>
      ))}
    </div>
  );
}
