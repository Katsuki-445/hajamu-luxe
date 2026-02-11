"use client";

import React, { useEffect, useState } from "react";
import Script from "next/script";

type PaystackOptions = {
  key: string;
  email: string;
  amount: number;
  currency: string;
  ref: string;
  callback: (response: unknown) => void;
  onClose: () => void;
  metadata?: any;
};

type PaystackPop = {
  setup: (opts: PaystackOptions) => { openIframe: () => void };
};

type Props = {
  amount: number;
  reference?: string;
  email?: string;
  text?: string;
  className?: string;
  onSuccess?: (response: unknown) => void;
  onClose?: () => void;
  publicKey?: string;
  currency?: string;
  onBeforePay?: () => Promise<string | null | undefined>;
  metadata?: any;
};

export default function PaymentButton({
  amount,
  reference,
  email = "customer@example.com",
  text = "Buy Now",
  className,
  onSuccess,
  onClose,
  publicKey,
  currency = "GHS",
  onBeforePay,
  metadata,
}: Props) {
  const envKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;
  const key = publicKey || envKey;
  const [loading, setLoading] = useState(false);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).PaystackPop) {
      setIsScriptLoaded(true);
    }
  }, []);

  async function handlePay() {
    if (loading) return;

    // 1. Validate Key
    if (!key) {
      alert("Payment Error: Configuration missing (Public Key)");
      return;
    }

    setLoading(true);

    // 2. Run Pre-payment Logic (Order Creation)
    let finalReference = reference;
    if (onBeforePay) {
      try {
        const result = await onBeforePay();
        if (!result) {
          setLoading(false);
          return; // Validation failed or error occurred
        }
        finalReference = result;
      } catch (e) {
        console.error("Pre-payment check failed", e);
        setLoading(false);
        alert("Could not initialize payment. Please try again.");
        return;
      }
    }

    // 3. Initialize Paystack
    const w = window as any;
    if (!w.PaystackPop) {
      setLoading(false);
      alert("Payment system is loading. Please wait a moment and try again.");
      return;
    }

    try {
      const handler = w.PaystackPop.setup({
        key,
        email,
        amount: Math.round(amount * 100),
        currency,
        ref: finalReference || `hl-${Date.now()}`,
        metadata,
        callback: function (response: unknown) {
          setLoading(false);
          if (onSuccess) onSuccess(response);
        },
        onClose: function () {
          setLoading(false);
          if (onClose) onClose();
        },
      });
      handler.openIframe();
    } catch (err: any) {
      console.error("Paystack Initialization Error:", err);
      setLoading(false);
      alert(`Payment Error: ${err?.message || "Failed to load payment window"}`);
    }
  }

  return (
    <>
      <Script 
        src="https://js.paystack.co/v1/inline.js" 
        strategy="lazyOnload" 
        onLoad={() => setIsScriptLoaded(true)}
      />
      <button
        onClick={handlePay}
        disabled={loading}
        className={`${className || "px-6 py-3 rounded-lg"} ${loading ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-gray-900 text-white hover:bg-gray-800"} transition-colors`}
      >
        {loading ? "Processing..." : text}
      </button>
    </>
  );
}
