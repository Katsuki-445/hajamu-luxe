import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/CartContext";
import Script from "next/script";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HAJAMU LUXE | The Heritage Store",
  description: "Discover handcrafted luxury smocks, Kente, and accessories. Authentic Ghanaian heritage meets modern elegance.",
  openGraph: {
    title: "HAJAMU LUXE | The Heritage Store",
    description: "Discover handcrafted luxury smocks, Kente, and accessories. Authentic Ghanaian heritage meets modern elegance.",
    url: "https://hajamuluxe.com",
    siteName: "Hajamu Luxe",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HAJAMU LUXE | The Heritage Store",
    description: "Discover handcrafted luxury smocks, Kente, and accessories.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      </head>
      <body
        className={`${playfair.variable} ${inter.variable} antialiased bg-white text-gray-900`}
      >
        <CartProvider>
          {children}
        </CartProvider>
        
        {/* Global Footer */}
        <footer className="bg-gray-50 border-t border-gray-100 py-16 mt-auto">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">HAJAMU LUXE</h2>
            
            <p className="text-gray-400 text-sm">© 2026 Hajamu Luxe. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
