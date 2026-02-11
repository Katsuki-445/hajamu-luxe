import { defineField, defineType } from "sanity";
import { Package, ShoppingBag } from "lucide-react";

export default defineType({
  name: "order",
  title: "Order",
  type: "document",
  icon: Package,
  fieldsets: [
    {
      name: 'shipping',
      title: 'Shipping Details',
      options: { collapsible: true, collapsed: false }
    }
  ],
  fields: [
    defineField({
      name: "orderNumber",
      title: "Order Number",
      type: "string",
    }),
    defineField({
      name: "paystackReference",
      title: "Paystack Reference",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "customerName",
      title: "Customer Name (Full)",
      type: "string",
    }),
    defineField({
      name: "firstName",
      title: "First Name",
      type: "string",
      fieldset: 'shipping',
    }),
    defineField({
      name: "lastName",
      title: "Second Name",
      type: "string",
      fieldset: 'shipping',
    }),
    defineField({
      name: "customerEmail",
      title: "Customer Email",
      type: "string",
    }),
    defineField({
      name: "customerPhone",
      title: "Customer Phone",
      type: "string",
    }),
    defineField({
      name: "customerAddress",
      title: "Customer Address (Legacy)",
      type: "text",
      readOnly: true,
    }),
    defineField({
      name: "streetAddress",
      title: "Street Address",
      type: "string",
      fieldset: 'shipping',
    }),
    defineField({
      name: "city",
      title: "City",
      type: "string",
      fieldset: 'shipping',
    }),
    defineField({
      name: "region",
      title: "Region",
      type: "string",
      fieldset: 'shipping',
    }),
    defineField({
      name: "items",
      title: "Ordered Items",
      type: "array",
      of: [
        {
          type: "object",
          icon: ShoppingBag,
          fields: [
            defineField({
              name: "product",
              type: "reference",
              to: [{ type: "product" }],
            }),
            defineField({
              name: "quantity",
              type: "number",
            }),
            defineField({
              name: "price",
              type: "number",
            }),
            defineField({
              name: "productName",
              title: "Product Name (Snapshot)",
              type: "string",
              readOnly: true,
            }),
            defineField({
              name: "productImage",
              title: "Product Image (Snapshot)",
              type: "image",
              readOnly: true,
            }),
          ],
          preview: {
            select: {
              product: "product",
              refName: "product->name",
              snapName: "productName",
              snapImage: "productImage",
              quantity: "quantity",
              price: "price",
            },
            prepare({ product, refName, snapName, snapImage, quantity, price }) {
              return {
                title: refName || snapName || "Unknown Product",
                subtitle: `Qty: ${quantity} | Price: GHS ${price}`,
                media: snapImage || product,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: "totalAmount",
      title: "Total Amount (GHS)",
      type: "number",
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "In Factory", value: "in_factory" },
          { title: "Quality Check", value: "quality_check" },
          { title: "In Transit", value: "in_transit" },
          { title: "Delivered", value: "delivered" },
        ],
        layout: "radio",
      },
      initialValue: "pending",
    }),
    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: "orderNumber",
      subtitle: "customerEmail",
      status: "status",
    },
    prepare(selection) {
      const { title, subtitle, status } = selection;
      const statusMap: Record<string, string> = {
        pending: "Pending",
        in_factory: "In Factory",
        quality_check: "Quality Check",
        in_transit: "In Transit",
        delivered: "Delivered",
      };
      return {
        title: title,
        subtitle: `${subtitle} | ${statusMap[status] || status}`,
      };
    },
  },
});
