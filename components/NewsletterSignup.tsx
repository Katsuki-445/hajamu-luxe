"use client";

import React, { useState } from "react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  async function submit() {
    if (!email) return;
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="max-w-xl mx-auto mb-6">
      <div className="flex items-center gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Join the Luxe List — enter your email"
          className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white"
        />
        <button
          type="button"
          onClick={submit}
          className="px-6 py-3 rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition-colors"
        >
          Subscribe
        </button>
      </div>
      {status === "success" && (
        <p className="text-green-600 text-sm mt-2">Thanks for subscribing!</p>
      )}
      {status === "error" && (
        <p className="text-red-600 text-sm mt-2">Subscription failed. Try again.</p>
      )}
    </div>
  );
}
