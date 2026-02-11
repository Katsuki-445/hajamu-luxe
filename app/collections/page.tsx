import Header from "@/components/Header";
import client from "@/src/sanity/client";
import { groq } from "next-sanity";
import CollectionsClient from "@/components/CollectionsClient";

type Collection = {
  _id: string;
  title: string;
  slug: { current: string };
  image?: { asset?: { url: string } };
};

type Product = {
  _id: string;
  name: string;
  slug: { current: string };
  price: number;
  description?: string;
  image?: any;
  images?: { asset?: { url: string } }[];
  collection?: { _id: string };
};

export default async function Collections() {
  let collections: Collection[] = [];
  let products: Product[] = [];
  try {
    collections = await client.fetch(
      groq`*[_type == "collection"]{_id,title,slug,image}`
    );
    products = await client.fetch(
      groq`*[_type == "product"]{_id,name,slug,price,description,image,images,collection->{_id}}`
    );
  } catch {
    collections = [];
    products = [];
  }

  // Guard Clause to prevent null crash
  if (!products) return null;
  if (!products || !collections) {
    return (
      <main className="min-h-screen bg-white">
        <Header />
        <div className="pt-24 text-center">
          <div className="text-xl font-serif text-gray-600">Loading Luxury Collections...</div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="pt-12">
        <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
          <h1 className="text-4xl font-serif font-bold text-gray-900">Collections</h1>
          <div className="text-gray-500 mt-2">Discover our curated selection of African luxury</div>
        </div>
        <div>
          <CollectionsClient collections={collections} products={products} />
        </div>
      </div>
    </main>
  );
}
