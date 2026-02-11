import { NextRequest, NextResponse } from "next/server";
import client from "@/src/sanity/client";
import { groq } from "next-sanity";
import { urlFor } from "@/src/sanity/image";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const orderNumber = searchParams.get("orderNumber");
  const email = searchParams.get("email");

  if (!orderNumber) {
    return NextResponse.json({ message: "Order number is required" }, { status: 400 });
  }

  try {
    // 1. Always fetch the order by ID first
    const order = await client.fetch(
      groq`*[_type == "order" && orderNumber == $orderNumber][0]{
        orderNumber,
        status,
        customerName,
        customerEmail,
        customerPhone,
        customerAddress,
        createdAt,
        totalAmount,
        items[]{
          quantity,
          product->{
            name,
            images
          }
        }
      }`,
      { orderNumber }
    );

    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    // Process items to generate image URLs
    const processedItems = order.items?.map((item: any) => ({
      ...item,
      product: {
        ...item.product,
        imageUrl: item.product?.images?.[0] ? urlFor(item.product.images[0]) : null
      }
    })) || [];

    // 2. Determine Security Level
    const isEmailVerified = email && order.customerEmail && email.toLowerCase().trim() === order.customerEmail.toLowerCase().trim();

    // 3. Construct Response based on Security Level
    if (isEmailVerified) {
      // Security Level 2: Full Details (ID + Email match)
      return NextResponse.json({
        securityLevel: 2,
        orderNumber: order.orderNumber,
        status: order.status,
        createdAt: order.createdAt,
        totalAmount: order.totalAmount,
        items: processedItems,
        shipping: {
          name: order.customerName,
          email: order.customerEmail,
          phone: order.customerPhone,
          address: order.customerAddress,
        }
      });
    } else {
      // Security Level 1: Limited Details (ID only, or Email mismatch)
      // Note: If email was provided but didn't match, we still show Level 1. 
      // The UI can decide to show a warning "Email didn't match, showing limited details" if it wants, 
      // or just show what we return.
      return NextResponse.json({
        securityLevel: 1,
        orderNumber: order.orderNumber,
        status: order.status,
        createdAt: order.createdAt,
        totalAmount: order.totalAmount,
        items: processedItems,
        // Explicitly exclude shipping details
      });
    }

  } catch (error) {
    console.error("Check Order Error:", error);
    return NextResponse.json({ message: "Failed to fetch order" }, { status: 500 });
  }
}
