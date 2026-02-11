import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { OrderStatusUpdateEmail } from "@/components/emails/OrderStatusUpdateEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Basic validation of the payload
    // We expect a Sanity document in the body or inside a specific property depending on webhook config
    // Assuming standard projection: { _id, _type, status, customerEmail, customerName, orderNumber }
    
    const { _type, status, customerEmail, customerName, orderNumber } = body;

    if (_type !== 'order') {
      return NextResponse.json({ message: "Ignored: Not an order" }, { status: 200 });
    }

    if (!customerEmail || !status) {
      return NextResponse.json({ message: "Ignored: Missing email or status" }, { status: 200 });
    }

    // Send Status Update Email
    await resend.emails.send({
      from: 'HAJAMU LUXE <onboarding@resend.dev>', // Resend requires a verified domain or this test address
      replyTo: 'basitlimann@yahoo.com',
      to: customerEmail,
      subject: `Update on your HAJAMU LUXE Order #${orderNumber}`,
      react: <OrderStatusUpdateEmail
        customerName={customerName || "Valued Customer"}
        orderId={orderNumber || "N/A"}
        newStatus={status}
      />,
    });

    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("Webhook Error:", error);
    return NextResponse.json(
      { message: "Webhook processing failed", error: error.message },
      { status: 500 }
    );
  }
}
