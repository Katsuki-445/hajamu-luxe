import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { OrderConfirmationEmail } from "@/components/emails/OrderConfirmationEmail";
import client from "@/src/sanity/client";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { customerName, customerEmail, orderId, items, totalAmount } = body;

    if (!customerEmail || !orderId) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    // Fetch branding settings from Sanity
    const settings = await client.fetch(`*[_type == "receiptSettings"][0]{brandName, tagline, "logoUrl": logo.asset->url}`);
    const brandName = settings?.brandName || "HAJAMU LUXE";

    // Admin Notification Logic
    // Since the user is not getting the customer copy in sandbox, we focus on the ADMIN notification.
    const adminEmail = "wokehustle1@gmail.com";

    const data = await resend.emails.send({
      from: `${brandName} <onboarding@resend.dev>`, // Must be this for sandbox
      to: adminEmail, // Admin receives the notification
      subject: `NEW ORDER ALERT: ${orderId} - GHS ${totalAmount}`,
      react: <OrderConfirmationEmail
        customerName={`${customerName} (Customer Email: ${customerEmail})`} // Append email to name so admin sees it
        orderId={orderId}
        items={items || []}
        totalAmount={totalAmount || 0}
        branding={settings || undefined}
      />,
    });

    return NextResponse.json({ message: "Admin notification sent successfully", data }, { status: 200 });
  } catch (error: any) {
    console.error("Email Sending Error:", error);
    return NextResponse.json(
      { message: "Failed to send email", error: error.message },
      { status: 500 }
    );
  }
}
