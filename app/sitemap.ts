import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://hajamuluxe.com";
  const staticRoutes = [
    "",
    "/collections",
    "/our-story",
    "/support",
    "/cart",
    "/checkout",
    "/track",
  ].map((p) => ({
    url: `${base}${p}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Note: For a fully dynamic sitemap with Sanity, we would fetch slugs here.
  // Using a fallback for now or keeping it simple for deployment readiness.
  return [...staticRoutes];
}
