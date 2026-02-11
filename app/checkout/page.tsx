"use client";
import Header from '@/components/Header';
import { useCart } from '@/components/CartContext';
import PaymentButton from '@/components/PaymentButton';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const GHANA_REGIONS = [
  "Greater Accra",
  "Ashanti",
  "Central",
  "Eastern",
  "Western",
  "Western North",
  "Volta",
  "Oti",
  "Northern",
  "North East",
  "Savannah",
  "Upper East",
  "Upper West",
  "Bono",
  "Bono East",
  "Ahafo"
];

export default function Checkout() {
  const { items, clearCart } = useCart();
  const router = useRouter();
  
  // Updated state for granular fields
  const [formData, setFormData] = useState({ 
    firstName: "", 
    lastName: "", 
    email: "", 
    phone: "", 
    streetAddress: "", 
    city: "", 
    region: "" 
  });
  
  const [isFormValid, setIsFormValid] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const isValid = 
      formData.firstName.trim().length > 0 &&
      formData.lastName.trim().length > 0 &&
      formData.email.trim().length > 0 &&
      formData.phone.trim().length > 0 &&
      formData.streetAddress.trim().length > 0 &&
      formData.city.trim().length > 0 &&
      formData.region.trim().length > 0;
    setIsFormValid(isValid);
  }, [formData]);

  const totalGhs = items.reduce((sum, i) => {
    const priceStr = String(i.product.price);
    const num = Number(priceStr.replace(/[^0-9.]/g, ''));
    return sum + num * i.quantity;
  }, 0);

  // Helper to combine fields for backend compatibility
  const getCustomerData = () => ({
    name: `${formData.firstName} ${formData.lastName}`.trim(),
    email: formData.email,
    phone: formData.phone,
    address: `${formData.streetAddress}, ${formData.city}, ${formData.region}`.trim(),
    // Granular fields for backend
    firstName: formData.firstName,
    lastName: formData.lastName,
    streetAddress: formData.streetAddress,
    city: formData.city,
    region: formData.region
  });

  const handlePrePayment = async () => {
    setError(null);
    if (!isFormValid) {
      setError("Please fill in all shipping details.");
      return null;
    }

    try {
      const customer = getCustomerData();
      
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          customer: customer,
          totalAmount: totalGhs,
          status: "pending", // Initial status before payment
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to create order");
      }

      const data = await res.json();
      return data.reference;
    } catch (e: any) {
      console.error("Order initialization failed:", e);
      setError(e.message || "Could not initialize order. Please try again.");
      return null;
    }
  };

  const handleSuccess = async (response: any) => {
    const customer = getCustomerData();

    // Send Order Confirmation Email
    try {
      const emailItems = items.map(item => ({
        name: item.product.name || item.product.title,
        quantity: item.quantity,
        price: Number(String(item.product.price).replace(/[^0-9.]/g, ''))
      }));

      await fetch("/api/send-order-confirmation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: customer.name,
          customerEmail: customer.email,
          orderId: response.reference,
          items: emailItems,
          totalAmount: totalGhs,
        }),
      });
    } catch (error) {
      console.error("Failed to send confirmation email:", error);
      // We continue to redirect even if email fails
    }

    clearCart();
    router.push(`/success?reference=${response.reference}`);
  };

  const customer = getCustomerData();

  const componentProps = {
    email: formData.email,
    amount: totalGhs,
    text: "Pay Now",
    currency: "GHS",
    onBeforePay: handlePrePayment,
    metadata: {
      custom_fields: [
        { display_name: "Customer Name", variable_name: "customer_name", value: customer.name },
        { display_name: "Phone Number", variable_name: "phone_number", value: formData.phone },
        { display_name: "Address", variable_name: "address", value: customer.address },
        { display_name: "City", variable_name: "city", value: formData.city },
        { display_name: "Region", variable_name: "region", value: formData.region },
      ],
      customer_phone: formData.phone,
      shipping_address: customer.address,
    },
    onSuccess: handleSuccess,
    onClose: () => {
      setError("Payment process was cancelled.");
    },
  };

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="max-w-4xl mx-auto px-6 py-16 pt-32">
        <h1 className="text-4xl font-serif font-bold text-gray-900 mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <h2 className="text-xl font-semibold text-gray-900 border-b pb-4">Shipping Details</h2>
            
            <div className="space-y-6">
              {/* Name Section */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all"
                    placeholder="Kwame"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Second Name</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all"
                    placeholder="Mensah"
                  />
                </div>
              </div>

              {/* Contact Section */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all"
                    placeholder="kwame@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all"
                    placeholder="020 000 0000"
                  />
                </div>
              </div>

              {/* Address Section */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Street Name / Landmark</label>
                  <input
                    type="text"
                    value={formData.streetAddress}
                    onChange={(e) => setFormData({ ...formData, streetAddress: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all"
                    placeholder="12 Independence Ave, near Accra Mall"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all"
                      placeholder="Accra"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
                    <div className="relative">
                      <select
                        value={formData.region}
                        onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all appearance-none bg-white"
                      >
                        <option value="">Select Region</option>
                        {GHANA_REGIONS.map(region => (
                          <option key={region} value={region}>{region}</option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-8 rounded-2xl h-fit">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.product.id} className="flex justify-between text-sm">
                  <span className="text-gray-600">{item.product.name} x {item.quantity}</span>
                  <span className="font-medium">{item.product.price}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 pt-4 mb-8">
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>GHS {totalGhs.toFixed(2)}</span>
              </div>
            </div>
            
            {/* Payment Button Section */}
            <div className="space-y-4">
              {error && (
                <div className="p-4 bg-red-50 text-red-700 text-sm rounded-lg border border-red-200">
                  {error}
                </div>
              )}
              
              {isFormValid ? (
                <PaymentButton 
                  {...componentProps} 
                  className="w-full bg-gray-900 text-white py-4 rounded-xl font-medium hover:bg-gray-800 transition-colors shadow-lg" 
                />
              ) : (
                <button
                  disabled
                  className="w-full py-4 rounded-xl font-medium bg-gray-200 text-gray-400 cursor-not-allowed"
                >
                  Fill Details to Pay
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
