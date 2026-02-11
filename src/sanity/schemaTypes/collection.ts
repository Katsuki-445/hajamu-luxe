import { defineType, defineField } from "sanity";
import { Layers } from "lucide-react";

export default defineType({
  name: "collection",
  title: "Collection",
  type: "document",
  icon: Layers,
  fields: [
    defineField({ name: "title", type: "string" }),
    defineField({ name: "slug", type: "slug", options: { source: "title" } }),
    defineField({ name: "image", type: "image" }),
  ],
});
