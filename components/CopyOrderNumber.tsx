"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function CopyOrderNumber({ 
  orderNumber, 
  showPrefix = true,
  className = ""
}: { 
  orderNumber: string, 
  showPrefix?: boolean,
  className?: string 
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(orderNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <button 
      onClick={handleCopy} 
      className="inline-flex items-center gap-2 group cursor-pointer hover:bg-gray-50 px-3 py-1 rounded-full transition-colors border border-transparent hover:border-gray-200"
      title="Click to copy order number"
    >
      <span className={`text-sm select-all ${className || 'text-gray-500'}`}>{showPrefix ? `Order #${orderNumber}` : orderNumber}</span>
      {copied ? (
        <Check className="w-3.5 h-3.5 text-green-500" />
      ) : (
        <Copy className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-600" />
      )}
      {copied && <span className="text-xs text-green-600 font-medium">Copied!</span>}
    </button>
  );
}
