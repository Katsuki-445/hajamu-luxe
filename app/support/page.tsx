import client from "@/src/sanity/client";
import SupportClient from "./SupportClient";

// Revalidate every 0 seconds (always fetch fresh)
// Alternatively, use export const dynamic = 'force-dynamic'
export const revalidate = 0;

export default async function SupportPage() {
  let whatsappSettings = null;

  try {
    // Fetch singleton document by ID to ensure we get the right one
    const data = await client.fetch(
      '*[_id == "siteSettings"][0]{whatsappNumber, whatsappMessage}',
      {},
      { cache: 'no-store' }
    );
    
    if (data) {
      whatsappSettings = data;
    }
  } catch (error) {
    console.error("Failed to fetch site settings:", error);
  }

  return <SupportClient whatsappSettings={whatsappSettings} />;
}
