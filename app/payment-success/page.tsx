import React from "react";
import Header from "@/components/Header";
import Link from "next/link";
 
export const metadata = {
  title: "Payment Successful | HAJAMU LUXE",
  description: "Your payment has been processed successfully",
};
 
export default function PaymentSuccess() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="max-w-3xl mx-auto px-6 py-24 text-center">
        <div className="inline-flex items-center space-x-3 bg-green-50 border border-green-200 px-6 py-4 rounded-2xl mb-8">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-green-600">
            <path d="M9 16.17l-3.88-3.88L3.7 13.71 9 19l12-12-1.41-1.41z"></path>
          </svg>
          <span className="text-green-700 font-semibold">Payment successful</span>
        </div>
        <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">Thank you for your purchase</h1>
        <p className="text-gray-600 mb-8">Your order is confirmed. You will receive a confirmation email shortly.</p>
        <div className="flex justify-center gap-4">
          <Link href="/products" className="px-6 py-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">Continue Shopping</Link>
          <Link href="/cart" className="px-6 py-3 rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition-colors">View Cart</Link>
        </div>
      </div>
    </main>
  );
}
