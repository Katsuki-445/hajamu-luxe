import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import client from "@/src/sanity/client";

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const hash = crypto
      .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY || "")
      .update(body)
      .digest("hex");

    const signature = req.headers.get("x-paystack-signature");

    if (hash !== signature) {
      return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
    }

    const event = JSON.parse(body);

    // Only handle successful charges
    if (event.event === "charge.success") {
      const { reference, amount, customer, metadata } = event.data;
      
      // Check if order exists
      const existingOrder = await client.fetch(
        `*[_type == "order" && orderNumber == $reference][0]._id`,
        { reference }
      );

      const customerPhone = metadata?.customer_phone || metadata?.phone_number || "";
      const customerAddress = metadata?.shipping_address || metadata?.address || "";
      // Fallback for name if not in metadata but in customer object
      const customerName = metadata?.customer_name || `${customer.first_name || ""} ${customer.last_name || ""}`.trim() || "Customer";

      if (existingOrder) {
        await client
          .patch(existingOrder)
          .set({ 
            status: "pending", 
            paystackReference: reference.toString(),
            // Ensure these are updated if missing
            customerPhone: customerPhone,
            customerAddress: customerAddress
          })
          .commit();
      } else {
        await client.create({
          _type: "order",
          orderNumber: reference,
          paystackReference: reference.toString(),
          customerName: customerName,
          customerEmail: customer.email,
          customerPhone: customerPhone,
          customerAddress: customerAddress,
          totalAmount: amount / 100,
          status: "pending",
          createdAt: new Date().toISOString(),
        });
      }

      return NextResponse.json({ message: "Order processed" }, { status: 200 });
    }

    return NextResponse.json({ message: "Event ignored" }, { status: 200 });
  } catch (error) {
    console.error("Webhook Error:", error);
    return NextResponse.json({ message: "Webhook handler failed" }, { status: 500 });
  }
}
