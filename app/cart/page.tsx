"use client";

import Header from "@/components/Header";
import Image from "next/image";
import PaymentButton from "@/components/PaymentButton";
import { useCart } from "@/components/CartContext";
import Link from "next/link";

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, clearCart, hasMounted } = useCart();
  const totalGhs = hasMounted && items.length
    ? items.reduce((sum, i) => {
        const num = Number(i.product.price.replace(/[^0-9.]/g, ""));
        return sum + num * i.quantity;
      }, 0)
    : 0;
  const componentProps = {
    email: "customer@example.com",
    amount: Math.round(totalGhs * 100),
    publicKey: "pk_test_72b7870635dfc7ff14170832c608d445d6f2f5d1",
    text: "Buy Now",
    currency: "GHS",
    onSuccess: () => {
      clearCart();
    },
    onClose: () => {},
  };

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-serif font-bold text-gray-900 mb-8">Your Cart</h1>
        {!hasMounted ? null : items.length === 0 ? (
          <p className="text-gray-600">Your cart is empty. <Link href="/collections" className="underline">Browse collections</Link>.</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex items-center gap-4 border border-gray-100 p-4 rounded-xl">
                  <div className="relative w-24 h-32 rounded-lg overflow-hidden bg-gray-50">
                    <Image src={product.image} alt={product.title} fill className="object-cover" sizes="96px" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 uppercase tracking-wider">{product.category}</p>
                    <h3 className="text-lg font-serif font-semibold text-gray-900">{product.title}</h3>
                    <p className="text-gray-700">{product.price}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQuantity(product.id, quantity - 1)} className="px-3 py-1 rounded-lg border">−</button>
                    <span className="w-8 text-center">{quantity}</span>
                    <button onClick={() => updateQuantity(product.id, quantity + 1)} className="px-3 py-1 rounded-lg border">+</button>
                  </div>
                  <button onClick={() => removeFromCart(product.id)} className="ml-4 text-sm text-red-600">Remove</button>
                </div>
              ))}
            </div>
            <div className="border border-gray-100 rounded-xl p-6">
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Summary</h2>
              <p className="text-gray-700 mb-2">Total: GHS {totalGhs.toFixed(2)}</p>
              <Link href="/checkout" className="block text-center bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors w-full active:scale-95 font-medium">
                Proceed to Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
