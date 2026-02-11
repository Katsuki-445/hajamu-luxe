import { NextRequest, NextResponse } from "next/server";
import client from "@/src/sanity/client";
import { Resend } from "resend";
import { OrderConfirmationEmail } from "@/components/emails/OrderConfirmationEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    if (!process.env.SANITY_API_TOKEN) {
      throw new Error("Missing SANITY_API_TOKEN");
    }

    const body = await req.json();
    const { items, customer, totalAmount, status, reference: providedRef } = body;

    // 1. Input Validation
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ message: "Invalid or empty cart items" }, { status: 400 });
    }
    
    if (!customer || !customer.email) {
      return NextResponse.json({ message: "Customer email is required" }, { status: 400 });
    }

    // Generate a unique reference if not provided
    const reference = providedRef || `HL-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    // Fix for stale cart data: Resolve any slug-based IDs to actual document _ids
    const itemIds = items.map((item: any) => item.product.id);
    
    const products = await client.fetch(
      `*[_type == "product" && (slug.current in $ids || _id in $ids)] {
        _id,
        "slug": slug.current,
        price
      }`,
      { ids: itemIds }
    );

    const productMap = products.reduce((acc: any, product: any) => {
      acc[product._id] = product;
      if (product.slug) {
        acc[product.slug] = product;
      }
      return acc;
    }, {});

    const orderItems: any[] = [];
    const invalidItems: string[] = [];
    let calculatedTotal = 0;

    items.forEach((item: any) => {
      // Use resolved product data if available
      const productData = productMap[item.product.id];
      
      if (!productData) {
        invalidItems.push(item.product.name || "Unknown Item");
        return;
      }

      // Try to snapshot image if it's a Sanity asset
      let imageSnapshot = undefined;
      if (item.product.image && typeof item.product.image === 'string') {
        const match = item.product.image.match(/image-([a-f0-9]+-\d+x\d+-\w+)/);
        if (match) {
          imageSnapshot = {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: `image-${match[1]}`
            }
          };
        }
      }

      const itemPrice = productData.price;
      calculatedTotal += itemPrice * item.quantity;

      orderItems.push({
        _key: productData._id, // Use ID as key for stability
        product: {
          _type: "reference",
          _ref: productData._id,
        },
        productName: item.product.name,
        productImage: imageSnapshot,
        quantity: item.quantity,
        price: itemPrice,
      });
    });

    if (invalidItems.length > 0) {
      return NextResponse.json(
        { message: `Some items are no longer available: ${invalidItems.join(", ")}. Please remove them from your cart.` },
        { status: 400 }
      );
    }

    await client.create({
      _type: "order",
      orderNumber: reference,
      paystackReference: reference,
      customerName: customer.name,
      firstName: customer.firstName,
      lastName: customer.lastName,
      customerEmail: customer.email,
      customerPhone: customer.phone,
      customerAddress: customer.address,
      streetAddress: customer.streetAddress,
      city: customer.city,
      region: customer.region,
      totalAmount: calculatedTotal,
      status: status || "pending",
      items: orderItems,
      createdAt: new Date().toISOString(),
    });

    // Send Confirmation Email
    try {
      if (customer.email) {
        await resend.emails.send({
          from: 'HAJAMU LUXE <onboarding@resend.dev>', // Resend requires a verified domain or this test address
          replyTo: 'wokehustle1@gmail.com',
          to: customer.email,
          subject: 'Order Confirmation: Your Hajamu Luxe Journey Begins',
          react: <OrderConfirmationEmail
            customerName={customer.name}
            orderId={reference}
            items={items.map((item: any) => ({
              name: item.product.name,
              quantity: item.quantity,
              price: Number(item.product.price),
            }))}
            totalAmount={totalAmount}
            shippingAddress={{
              street: customer.streetAddress,
              city: customer.city,
              region: customer.region
            }}
          />,
        });
      }
    } catch (emailError) {
      console.error("Failed to send confirmation email:", emailError);
      // Continue execution, do not fail order creation
    }

    return NextResponse.json({ reference });
  } catch (error: any) {
    console.error("Create Order Error:", error);
    return NextResponse.json(
      { message: "Failed to create order", error: error.message || error },
      { status: 500 }
    );
  }
}
