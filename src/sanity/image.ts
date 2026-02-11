import { createImageUrlBuilder } from '@sanity/image-url';
import client from "./client";

const builder = createImageUrlBuilder(client);

export function urlFor(source: unknown) {
  if (!source) return "";
  try {
    return builder.image(source).auto("format").fit("crop").url() || "";
  } catch {
    return "";
  }
}
