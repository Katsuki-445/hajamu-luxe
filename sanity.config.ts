import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import schemaTypes from "./src/sanity/schemaTypes";
import { myStructure } from "./src/sanity/deskStructure";
import { ExportTool } from "./src/sanity/tools/ExportTool";

export default defineConfig({
  name: "default",
  title: "Hajamu Luxe Admin",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  basePath: "/studio",
  plugins: [
    deskTool({
      structure: myStructure,
    }),
  ],
  tools: (prev) => [
    ...prev,
    {
      name: 'export-products',
      title: 'Export',
      component: ExportTool,
    },
  ],
  schema: {
    types: schemaTypes,
  },
});
