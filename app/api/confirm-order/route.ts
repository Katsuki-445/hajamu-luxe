import { NextRequest, NextResponse } from "next/server";
import client from "@/src/sanity/client";

export async function POST(req: NextRequest) {
  try {
    const { reference } = await req.json();

    if (!reference) {
      return NextResponse.json({ message: "Reference is required" }, { status: 400 });
    }

    // Find the order with the matching reference
    const order = await client.fetch(
      `*[_type == "order" && orderNumber == $reference][0]`,
      { reference }
    );

    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    // Update the status to "in_factory" if it is still "pending"
    if (order.status === "pending") {
      await client
        .patch(order._id)
        .set({ 
          status: "in_factory",
          paystackReference: reference
        })
        .commit();
    }

    return NextResponse.json({ message: "Order confirmed" }, { status: 200 });
  } catch (error) {
    console.error("Confirm Order Error:", error);
    return NextResponse.json({ message: "Failed to confirm order" }, { status: 500 });
  }
}
