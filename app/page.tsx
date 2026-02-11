import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Image from "next/image";
import Link from "next/link";
import client from "@/src/sanity/client";
import { groq } from "next-sanity";
import { urlFor } from "@/src/sanity/image";

type Product = {
  _id: string;
  name: string;
  slug: { current: string };
  price: number;
  images?: { asset?: { url: string } }[];
  description?: string;
  collection?: { _id: string; slug?: { current: string } };
};

type Collection = {
  _id: string;
  title: string;
  slug: { current: string };
  image?: { asset?: { url: string } };
  products?: Product[];
};

type About = {
  title: string;
  story: string[];
  image: any;
};

export default async function Home() {
  let data: { collections: Collection[]; about: About | null } = { collections: [], about: null };
  try {
    data = await client.fetch(
      groq`{
        "collections": *[_type == "collection"]{
          _id,
          title,
          slug,
          image,
          "products": *[_type == "product" && references(^._id)][0...6]{
            _id,
            name,
            slug,
            price,
            images,
            description,
            collection->{_id,slug}
          }
        },
        "about": *[_type == "about"][0]{
          title,
          story,
          image
        }
      }`
    );
  } catch {
    data = { collections: [], about: null };
  }

  const { collections, about } = data;

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
      
      {collections.map((collection) => {
        const categoryProducts = collection.products || [];
        return (
          <section key={collection._id} className="max-w-7xl mx-auto px-6 py-12">
            <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-4">
              <h2 className="text-3xl font-serif font-bold text-gray-900 fade-up">{collection.title} Collection</h2>
              
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {categoryProducts.map((p) => (
                <Link key={p._id} href={`/product/${p.slug?.current}`} className="group block cursor-pointer">
                  <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-gray-50 mb-4 shadow-sm group-hover:shadow-md transition-all duration-300">
                    <Image
                      src={p.images?.[0] ? urlFor(p.images?.[0]) || "" : "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='600'><rect width='100%' height='100%' fill='%23f3f4f6'/></svg>"}
                      alt={p.name}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors pointer-events-none" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-serif font-semibold text-gray-900 group-hover:text-gray-700 line-clamp-1">
                      {p.name}
                    </h3>
                    <p className="text-base font-medium text-gray-600">GH₵ {p.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </main>
  );
}
