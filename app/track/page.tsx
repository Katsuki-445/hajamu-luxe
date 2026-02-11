"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import { motion, AnimatePresence } from "framer-motion";
import CopyOrderNumber from "@/components/CopyOrderNumber";

export default function TrackOrder() {
  const [orderNumber, setOrderNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<any>(null);
  const [error, setError] = useState("");

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber.trim()) return;

    setLoading(true);
    setError("");
    setOrder(null);

    try {
      const res = await fetch(`/api/check-order?orderNumber=${encodeURIComponent(orderNumber.trim())}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to find order");
      }

      setOrder(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "in_factory": return "bg-blue-100 text-blue-800 border-blue-200";
      case "quality_check": return "bg-purple-100 text-purple-800 border-purple-200";
      case "in_transit": return "bg-indigo-100 text-indigo-800 border-indigo-200";
      case "delivered": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusLabel = (status: string) => {
    return status.split("_").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  };

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="pt-32 pb-16 px-6 max-w-xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">Track Your Order</h1>
          <p className="text-gray-600">Enter your order number to see live updates</p>
        </div>

        <form onSubmit={handleCheck} className="mb-12">
          <div className="flex gap-4">
            <input
              type="text"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              placeholder="e.g. HL-1738..."
              className="flex-1 px-6 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all text-lg"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-4 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Checking..." : "Track"}
            </button>
          </div>
        </form>

        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-6 bg-red-50 border border-red-100 rounded-xl text-red-600 text-center"
            >
              {error}
            </motion.div>
          )}

          {order && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="p-8 border-b border-gray-100 bg-gray-50/50">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-serif font-bold text-gray-900 mb-1">Order Status</h2>
                    <p className="text-gray-500 text-sm">Last updated: {new Date().toLocaleTimeString()}</p>
                  </div>
                  <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                    {getStatusLabel(order.status)}
                  </span>
                </div>
              </div>
              
              <div className="p-8 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Order Number</div>
                    <div className="-ml-3">
                      <CopyOrderNumber orderNumber={order.orderNumber} showPrefix={false} className="text-gray-900 font-medium" />
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Customer</div>
                    <div className="font-medium text-gray-900">{order.customerName}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Date Placed</div>
                    <div className="font-medium text-gray-900">{new Date(order.createdAt).toLocaleDateString()}</div>
                  </div>
                </div>

                {/* Progress Bar Visualization */}
                <div className="mt-8 pt-8 border-t border-gray-100">
                  <div className="relative">
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 rounded-full" />
                    <div 
                      className="absolute top-1/2 left-0 h-1 bg-gray-900 -translate-y-1/2 rounded-full transition-all duration-1000"
                      style={{ 
                        width: 
                          order.status === 'pending' ? '5%' :
                          order.status === 'in_factory' ? '30%' :
                          order.status === 'quality_check' ? '60%' :
                          order.status === 'shipped' ? '85%' :
                          order.status === 'delivered' ? '100%' : '0%'
                      }} 
                    />
                  </div>
                  <div className="flex justify-between mt-4 text-xs text-gray-400 font-medium">
                    <span className={order.status === 'pending' ? 'text-gray-900' : ''}>Pending</span>
                    <span className={order.status === 'in_factory' ? 'text-gray-900' : ''}>In Factory</span>
                    <span className={order.status === 'quality_check' ? 'text-gray-900' : ''}>Quality Check</span>
                    <span className={order.status === 'shipped' ? 'text-gray-900' : ''}>Shipped</span>
                    <span className={order.status === 'delivered' ? 'text-gray-900' : ''}>Delivered</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
