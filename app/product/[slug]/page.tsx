import Header from "@/components/Header";
import client from "@/src/sanity/client";
import { groq } from "next-sanity";
import ProductDetailView from "@/components/ProductDetailView";
import { urlFor } from "@/src/sanity/image";
import { Metadata } from "next";

type SanityProduct = {
  _id: string;
  name: string;
  slug: { current: string };
  price: number;
  images?: { asset?: { url: string } }[];
  description?: string;
  collection?: { title?: string };
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await client.fetch(
    groq`*[_type == "product" && slug.current == $slug][0]{name, description, images}`,
    { slug }
  );

  if (!product) {
    return {
      title: "Product Not Found | HAJAMU LUXE",
    };
  }

  const imageUrl = product.images?.[0] ? urlFor(product.images[0]) : null;

  return {
    title: `${product.name} | HAJAMU LUXE`,
    description: product.description?.slice(0, 160) || `Buy ${product.name} at Hajamu Luxe.`,
    openGraph: {
      title: product.name,
      description: product.description?.slice(0, 160),
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let data: SanityProduct | null = null;
  try {
    data = await client.fetch(
      groq`*[_type == "product" && slug.current == $slug][0]{_id,name,slug,price,images,description,collection->{"title": title}}`,
      { slug }
    );
  } catch (error) {
    console.error("Error fetching product:", error);
    data = null;
  }

  if (!data) {
    return (
      <main className="min-h-screen bg-white">
        <Header />
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          <h1 className="text-3xl font-serif font-bold">Product not found</h1>
          <p className="text-gray-600 mt-4">Please return to the collections.</p>
        </div>
      </main>
    );
  }

  const product = {
    id: data._id,
    name: data.name,
    title: data.name,
    description: data.description || "",
    image: data.images?.[0] ? urlFor(data.images[0]) : "",
    price: data.price,
    category: data.collection?.title || "Collection",
  };

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <ProductDetailView product={product} />
    </main>
  );
}
