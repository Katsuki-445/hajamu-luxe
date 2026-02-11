import { CheckCircle, Download, ShoppingBag } from "lucide-react";
import client from "@/src/sanity/client";
import { groq } from "next-sanity";
import { urlFor } from "@/src/sanity/image";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import CopyOrderNumber from "@/components/CopyOrderNumber";
import ReceiptButton from "@/components/ReceiptButton";

type OrderProps = {
  searchParams: Promise<{
    reference?: string;
  }>;
};

export default async function SuccessPage({ searchParams }: { searchParams: Promise<{ reference?: string }> }) {
  const { reference } = await searchParams;

  if (!reference) {
    return (
      <main className="min-h-screen bg-white">
        <Header />
        <div className="max-w-3xl mx-auto px-6 py-24 text-center">
            <h1 className="text-2xl font-bold">No order reference found</h1>
        </div>
      </main>
    );
  }

  // Fetch order and receipt settings
  const data = await client.fetch(
    groq`{
      "order": *[_type == "order" && orderNumber == $reference][0]{
        orderNumber,
        "createdAt": _createdAt,
        customerName,
        customerEmail,
        customerPhone,
        customerAddress,
        streetAddress,
        city,
        region,
        totalAmount,
        status,
        items[]{
          quantity,
          price,
          product->{
            name,
            images
          }
        }
      },
      "settings": *[_type == "receiptSettings"][0]{
        useDefaults,
        brandName,
        tagline,
        websiteUrl,
        supportEmail,
        footerText,
        "logo": logo.asset->url
      }
    }`,
    { reference }
  );

  const { order, settings } = data;

  if (!order) {
     return (
        <main className="min-h-screen bg-white">
            <Header />
            <div className="max-w-3xl mx-auto px-6 py-24 text-center">
                <h1 className="text-2xl font-bold mb-4">Processing your order...</h1>
                <div className="flex justify-center items-center gap-2 mb-4">
                  <span className="text-gray-600">Reference:</span>
                  <CopyOrderNumber orderNumber={reference} showPrefix={false} className="text-lg font-medium text-gray-900" />
                </div>
                <p className="mt-4 text-gray-500">Please wait a moment while we confirm your payment.</p>
                <Link href={`/success?reference=${reference}`} className="mt-8 inline-block px-6 py-3 bg-gray-900 text-white rounded-lg">Refresh Status</Link>
            </div>
        </main>
     );
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="max-w-4xl mx-auto px-6 py-16 pt-32">
        <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">Order Confirmed</h1>
            <p className="text-lg text-gray-600">Thank you, {order.customerName}. Your order has been received.</p>
            <div className="mt-2 flex justify-center">
              <CopyOrderNumber orderNumber={order.orderNumber} />
            </div>
            <div className="mt-6 flex justify-center gap-4">
              <ReceiptButton order={order} settings={settings} />
              <Link href="/track" className="px-6 py-2 bg-gray-100 text-gray-900 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
                Track Order
              </Link>
              <Link href="/collections" className="px-6 py-2 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
                Continue Shopping
              </Link>
            </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 bg-gray-50 rounded-2xl p-8 border border-gray-100">
            <h2 className="text-xl font-serif font-semibold text-gray-900 mb-6">Order Details</h2>
            <div className="space-y-6">
                {order.items?.map((item: any, i: number) => (
                    <div key={i} className="flex items-center gap-6">
                        <div className="relative w-20 h-24 bg-white rounded-lg overflow-hidden border border-gray-200">
                             {item.product?.images?.[0] ? (
                               <Image 
                                  src={urlFor(item.product.images[0])} 
                                  alt={item.product?.name || "Product"}
                                  fill
                                  className="object-cover"
                               />
                             ) : (
                               <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                                 <ShoppingBag className="w-8 h-8" />
                               </div>
                             )}
                        </div>
                        <div className="flex-1">
                            <h3 className="font-medium text-gray-900">{item.product?.name}</h3>
                            <p className="text-gray-500">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-semibold text-gray-900">GHS {item.price * item.quantity}</p>
                    </div>
                ))}
            </div>
            <div className="border-t border-gray-200 mt-8 pt-6 flex justify-between items-center">
                <span className="text-lg font-medium text-gray-700">Total Amount</span>
                <span className="text-2xl font-serif font-bold text-gray-900">GHS {order.totalAmount}</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-gray-100 h-fit">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Shipping Information</h2>
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-gray-500 mb-1">Full Name</p>
                <p className="font-medium text-gray-900">{order.customerName}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Email</p>
                <p className="font-medium text-gray-900">{order.customerEmail}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Phone</p>
                <p className="font-medium text-gray-900">{order.customerPhone || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Address</p>
                <p className="font-medium text-gray-900 whitespace-pre-line">{order.customerAddress || "N/A"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
