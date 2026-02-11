"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCart } from './CartContext';

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const pathname = usePathname();
  const router = useRouter();
  const { count, hasMounted } = useCart();

  const navLinks = [
    { name: 'HOME', href: '/' },
    { name: 'COLLECTIONS', href: '/collections' },
    { name: 'OUR STORY', href: '/our-story' },
    { name: 'SUPPORT', href: '/support' },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 pt-6 pb-4 flex flex-col">
          {/* Top Row: Logo (Center) & Icons (Right) */}
          <div className="flex items-center justify-between relative mb-4 w-full">
            {/* Left: Mobile Hamburger (Hidden on Desktop) */}
            <div className="flex-1 md:hidden">
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 -ml-2 hover:bg-gray-50 rounded-full transition-colors" 
                aria-label="Open Menu"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              </button>
            </div>
            
            {/* Left Spacer for Desktop centering */}
            <div className="hidden md:block flex-1"></div>

            {/* Center: Logo */}
            <div className="flex-1 text-center flex justify-center">
              <Link href="/">
                <h1 className="text-2xl md:text-3xl font-serif font-bold tracking-widest text-gray-900 whitespace-nowrap">
                  HAJAMU LUXE
                </h1>
              </Link>
            </div>

            {/* Right: Actions */}
            <div className="flex-1 flex justify-end items-center space-x-4">
              <button onClick={() => setIsSearchOpen(v => !v)} className="p-2 hover:bg-gray-50 rounded-full transition-colors" aria-label="Search">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </button>

              <Link id="cart-icon" href="/cart" className="flex items-center space-x-2 text-gray-900 hover:text-gray-700 transition-colors" aria-label="Cart">
                 <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                <span className="hidden sm:inline text-sm font-medium">Cart</span>
                <span className="bg-gray-900 text-white text-[10px] px-1.5 py-0.5 rounded-full -ml-1">
                  {hasMounted ? count : 0}
                </span>
              </Link>
            </div>
          </div>

          {/* Middle Menu: Navigation Links (Hidden on Mobile, Visible on Desktop) */}
          <nav className="hidden md:flex justify-center items-center space-x-12 py-4 border-b border-gray-100">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                href={link.href}
                className={`text-sm font-medium tracking-widest transition-colors ${pathname === link.href ? 'text-gray-900 border-b-2 border-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {isSearchOpen && (
        <div className="bg-white/95 backdrop-blur-sm border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-3">
            <input
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const q = searchText.trim();
                  if (q) {
                    router.push(`/collections?q=${encodeURIComponent(q)}`);
                    setIsSearchOpen(false);
                  }
                }
              }}
              placeholder="Search products (e.g., Kente, Beads)"
              className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white"
            />
            <button
              onClick={() => {
                const q = searchText.trim();
                if (q) {
                  router.push(`/collections?q=${encodeURIComponent(q)}`);
                  setIsSearchOpen(false);
                }
              }}
              className="px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition-colors"
            >
              Search
            </button>
          </div>
        </div>
      )}

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar (Mobile Only) */}
      <div className={`fixed top-0 left-0 bottom-0 w-64 bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden`}>
        <div className="p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-serif font-bold text-gray-900">Menu</h2>
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 -mr-2 hover:bg-gray-100 rounded-full"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <nav className="flex-1 space-y-6">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                href={link.href}
                className={`block text-lg font-medium transition-colors ${pathname === link.href ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}
                onClick={() => setIsSidebarOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="pt-6 border-t border-gray-100">
            <p className="text-xs text-gray-400">© 2026 HAJAMU LUXE</p>
          </div>
        </div>
      </div>
    </>
  );
}
