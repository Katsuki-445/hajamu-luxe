import React from 'react';
import Header from "@/components/Header";
import client from "@/src/sanity/client";
import { groq } from "next-sanity";
import BrandStory from "@/components/BrandStory";

export const metadata = {
  title: "Our Story | HAJAMU LUXE",
  description: "Weaving heritage into modern luxury",
};

export default async function OurStory() {
  const data = await client.fetch(
    groq`*[_type == "about"][0]{title, story, image}`
  );

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="fade-up">
        {data ? (
          <BrandStory data={data} />
        ) : (
          <div className="max-w-7xl mx-auto px-6 py-16 text-center">
             <p className="text-gray-600">Our story is being woven...</p>
          </div>
        )}
      </div>
    </main>
  );
}
