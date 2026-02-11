import { createClient } from "next-sanity";

const client = createClient({
  projectId: (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "").trim(),
  dataset: (process.env.NEXT_PUBLIC_SANITY_DATASET || "production").trim(),
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

export default client;
