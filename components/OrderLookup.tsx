"use client";

import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';

export default function OrderLookup() {
  const [orderId, setOrderId] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await fetch(`/api/check-order?orderNumber=${encodeURIComponent(orderId)}&email=${encodeURIComponent(email)}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to find order');
      }

      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please check your details and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-12">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">Track Your Order</h2>
        <p className="text-gray-500 text-sm">Enter your Order ID (and optionally your Email) to see your order status.</p>
      </div>

      <form onSubmit={handleLookup} className="space-y-4 max-w-lg mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="lookup-order-id" className="block text-xs font-medium text-gray-700 mb-1">Order ID</label>
            <input
              type="text"
              id="lookup-order-id"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="e.g. HL-177..."
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 bg-gray-50 text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="lookup-email" className="block text-xs font-medium text-gray-700 mb-1">Email Address <span className="text-gray-400 font-normal">(Optional)</span></label>
            <input
              type="email"
              id="lookup-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 bg-gray-50 text-sm"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gray-900 text-white py-2.5 rounded-lg font-medium text-sm hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
          {loading ? 'Searching...' : 'Find Order'}
        </button>
      </form>

      {error && (
        <div className="mt-6 p-4 bg-red-50 text-red-600 text-sm text-center rounded-xl">
          {error}
        </div>
      )}

      {result && (
        <div className="mt-8 border-t border-gray-100 pt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="max-w-lg mx-auto bg-gray-50 rounded-xl p-6 border border-gray-200">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Status</p>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-900 text-white capitalize">
                  {result.status.replace('_', ' ')}
                </span>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Total</p>
                <p className="font-serif font-bold text-lg">GHS {result.totalAmount?.toLocaleString()}</p>
              </div>
            </div>

            {result.shipping && (
              <div className="mb-6 pb-6 border-b border-gray-100">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">Shipping Details</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="block text-gray-400 text-xs">Customer</span>
                    <span className="font-medium text-gray-900">{result.shipping.name}</span>
                  </div>
                  <div>
                    <span className="block text-gray-400 text-xs">Email</span>
                    <span className="font-medium text-gray-900">{result.shipping.email}</span>
                  </div>
                  <div>
                    <span className="block text-gray-400 text-xs">Phone</span>
                    <span className="font-medium text-gray-900">{result.shipping.phone}</span>
                  </div>
                  <div>
                    <span className="block text-gray-400 text-xs">Address</span>
                    <span className="font-medium text-gray-900">{result.shipping.address}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-3">
              <p className="text-xs text-gray-500 uppercase tracking-wider">Items</p>
              <ul className="space-y-2">
                {result.items?.map((item: any, idx: number) => (
                  <li key={idx} className="flex justify-between items-center text-sm text-gray-700 border-b border-gray-200 pb-2 last:border-0 last:pb-0">
                    <div className="flex items-center gap-3">
                      {item.product?.imageUrl && (
                        <img 
                          src={item.product.imageUrl} 
                          alt={item.product.name} 
                          className="w-10 h-10 object-cover rounded-md bg-gray-100" 
                        />
                      )}
                      <span>{item.product?.name || 'Unknown Item'}</span>
                    </div>
                    <span className="text-gray-500">x{item.quantity}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
