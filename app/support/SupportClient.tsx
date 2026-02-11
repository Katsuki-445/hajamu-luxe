"use client";

import React, { useRef, useState } from 'react';
import Header from "@/components/Header";
import OrderLookup from "@/components/OrderLookup";
import emailjs from '@emailjs/browser';

type SupportClientProps = {
  whatsappSettings: {
    whatsappNumber: string;
    whatsappMessage: string;
  } | null;
};

export default function SupportClient({ whatsappSettings }: SupportClientProps) {
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const getWhatsAppUrl = () => {
    // Default fallback if not fetched yet - using the latest number as safety net
    const rawNumber = whatsappSettings?.whatsappNumber || '0547954702'; 
    const rawMessage = whatsappSettings?.whatsappMessage || 'Hello Hajamu Luxe, I have a question about my order';

    // Remove all non-digits
    let cleanNumber = rawNumber.replace(/\D/g, '');
    
    // Check if it already starts with Ghana country code (233)
    if (cleanNumber.startsWith('233')) {
      // It's already good
    } else if (cleanNumber.startsWith('0')) {
      // Remove leading 0 and add 233
      cleanNumber = '233' + cleanNumber.substring(1);
    } else {
      // Assume it's a local number without leading 0, prepend 233
      if (cleanNumber.length === 9) {
        cleanNumber = '233' + cleanNumber;
      }
      else {
         // Fallback: just use it as is if it looks long enough, otherwise prepend 233?
         // Safest bet for this specific project (Ghana focused):
         cleanNumber = '233' + cleanNumber;
      }
    }
    
    const fullNumber = cleanNumber;
    const message = encodeURIComponent(rawMessage);
    
    return `https://wa.me/${fullNumber}?text=${message}`;
  };

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;

    setStatus('sending');

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
        form.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ''
      )
      .then(
        () => {
          setStatus('success');
          form.current?.reset();
        },
        (error) => {
          console.error('FAILED...', error.text);
          setStatus('error');
        },
      );
  };

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="max-w-5xl mx-auto px-6 py-16 fade-up">
        
        <OrderLookup />

        <div className="mt-24 mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-serif font-bold text-gray-900">Contact Us</h2>
            <p className="text-gray-600 mt-2">Have a question? Send us a message.</p>
          </div>

          <div className="bg-gray-50 p-8 rounded-2xl shadow-sm">
            <form ref={form} onSubmit={sendEmail} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input 
                  type="text" 
                  name="name"
                  id="name" 
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white" 
                  placeholder="Your name" 
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input 
                  type="email" 
                  name="email"
                  id="email" 
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white" 
                  placeholder="Your email" 
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea 
                name="message"
                id="message" 
                rows={4} 
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white" 
                placeholder="How can we help you?"
              ></textarea>
            </div>
            <button 
              type="submit" 
              disabled={status === 'sending'}
              className="w-full bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-400"
            >
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>
            {status === 'success' && (
              <p className="text-green-600 text-center mt-2">Message sent successfully! We will get back to you soon.</p>
            )}
            {status === 'error' && (
              <p className="text-red-600 text-center mt-2">Failed to send message. Please try again later.</p>
            )}
          </form>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white border border-gray-100 rounded-2xl p-6">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-3">Shipping Information</h2>
            <p className="text-gray-600">
              Orders are processed within 2–4 business days. Ghana-wide delivery is available via trusted couriers.
            </p>
          </div>
          <div className="bg-white border border-gray-100 rounded-2xl p-6">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-3">Return Policy</h2>
            <p className="text-gray-600">
              Returns accepted within 14 days for unworn items with tags. Contact support to initiate a return.
            </p>
          </div>
        </div>

        <div className="text-center">
          <p className="text-gray-500 mb-4">Need immediate assistance?</p>
          <a 
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-[#25D366] text-white px-8 py-3 rounded-full hover:bg-[#128C7E] transition-colors font-medium shadow-sm"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382C17.175 14.233 15.714 13.515 15.442 13.415C15.169 13.316 14.971 13.267 14.772 13.565C14.575 13.862 14.005 14.531 13.832 14.729C13.659 14.928 13.485 14.952 13.188 14.804C12.891 14.654 11.933 14.341 10.798 13.329C9.915 12.541 9.318 11.568 9.145 11.27C8.972 10.973 9.127 10.812 9.275 10.664C9.409 10.531 9.573 10.317 9.721 10.144C9.87 9.97 9.919 9.846 10.019 9.647C10.118 9.449 10.071 9.274 9.965 9.126C9.892 9.075 9.546 8.207 9.001 6.891C8.456 5.576 7.91 5.773 7.687 5.773C7.514 5.773 7.316 5.773 7.118 5.773C6.919 5.773 6.598 5.848 6.326 6.145C6.053 6.442 5.286 7.16 5.286 8.621C5.286 10.082 6.35 11.493 6.5 11.691C6.649 11.89 8.604 14.912 11.597 16.208C12.339 16.529 12.919 16.721 13.375 16.866C14.069 17.087 14.707 17.058 15.213 16.982C15.776 16.898 16.94 16.278 17.188 15.584C17.436 14.891 17.436 14.297 17.361 14.173C17.287 14.049 17.089 13.975 16.792 13.827H17.472V14.382ZM12.049 24C9.863 24 7.731 23.413 5.858 22.28L5.497 22.066L0.998 23.25L2.203 18.865L1.968 18.491C0.74 16.533 0.093 14.282 0.096 11.968C0.1 5.378 5.465 0.012 12.056 0.012C15.25 0.013 18.252 1.258 20.509 3.518C22.767 5.777 24.009 8.777 24.006 11.971C24 18.56 18.636 23.999 12.049 23.999V24Z"/>
            </svg>
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </main>
  );
}
