import { StructureBuilder } from "sanity/desk";
import { 
  ShoppingBag, 
  Layers, 
  Package, 
  FileText, 
  Grid,
  List
} from "lucide-react";

export const myStructure = (S: StructureBuilder) =>
  S.list()
    .title("Hajamu Luxe")
    .items([
      // Commerce Section
      S.listItem()
        .title("Orders")
        .icon(Package)
        .child(S.documentTypeList("order").title("All Orders")),

      S.divider(),

      S.listItem()
        .title("Products")
        .icon(ShoppingBag)
        .child(
          S.list()
            .title("Product Management")
            .items([
              S.listItem()
                .title("All Products")
                .icon(List)
                .child(S.documentTypeList("product").title("All Products")),
              
              S.listItem()
                .title("By Collection")
                .icon(Grid)
                .child(
                  S.documentTypeList("collection")
                    .title("Select Collection")
                    .child((collectionId) =>
                      S.documentList()
                        .title("Products")
                        .filter('_type == "product" && collection._ref == $collectionId')
                        .params({ collectionId })
                    )
                ),
            ])
        ),

      S.listItem()
        .title("Collections")
        .icon(Layers)
        .child(S.documentTypeList("collection").title("Collections")),

      S.divider(),

      // Content Section
      S.listItem()
        .title("Brand Story")
        .icon(FileText)
        .child(S.documentTypeList("about").title("About Page")),

      S.divider(),

      // Settings Section
      S.listItem()
        .title("Receipt Settings")
        .child(
          S.document()
            .schemaType("receiptSettings")
            .documentId("receiptSettings")
        ),

      S.listItem()
        .title("Site Settings")
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
        ),
    ]);
