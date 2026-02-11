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
    defineField({ name: "title", type: "string", group: "basic", description: "Legacy title field" }),
    defineField({ name: "slug", type: "slug", options: { source: "name" }, group: "basic" }),
    defineField({ name: "price", type: "number", group: "basic" }),
    defineField({ name: "category", type: "string", group: "basic", title: "Category", description: "Legacy category field" }),
    defineField({ name: "description", type: "text", group: "basic" }),
    defineField({ name: "collection", type: "reference", to: [{ type: "collection" }], group: "basic" }),
    defineField({ name: "image", type: "image", group: "media", description: "Legacy single image field" }),
    defineField({ name: "images", type: "array", of: [{ type: "image" }], group: "media" }),
  ],
  preview: {
    select: {
      title: "name",
      price: "price",
      images: "images",
      image: "image",
    },
    prepare({ title, price, images, image }) {
      const media = (images && images.length > 0) ? images[0] : image;
      return {
        title,
        subtitle: `GH₵ ${price}`,
        media,
      };
    },
  },
});
