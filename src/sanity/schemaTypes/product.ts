import { defineType, defineField } from "sanity";
import { ShoppingBag } from "lucide-react";

export default defineType({
  name: "product",
  title: "Product",
  type: "document",
  icon: ShoppingBag,
  groups: [
    {
      name: "basic",
      title: "Basic Info",
    },
    {
      name: "media",
      title: "Media",
    },
  ],
  fields: [
    defineField({ name: "name", type: "string", group: "basic" }),
    defineField({ name: "slug", type: "slug", options: { source: "name" }, group: "basic" }),
    defineField({ name: "price", type: "number", group: "basic" }),
    defineField({ name: "description", type: "text", group: "basic" }),
    defineField({ name: "collection", type: "reference", to: [{ type: "collection" }], group: "basic" }),
    defineField({ name: "images", type: "array", of: [{ type: "image" }], group: "media" }),
  ],
  preview: {
    select: {
      title: "name",
      price: "price",
      media: "images.0.asset",
    },
    prepare({ title, price, media }) {
      return {
        title,
        subtitle: `GH₵ ${price}`,
        media,
      };
    },
  },
});
