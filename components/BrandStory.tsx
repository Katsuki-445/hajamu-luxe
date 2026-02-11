"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { urlFor } from "@/src/sanity/image";

type BrandStoryProps = {
  data: {
    title: string;
    story: string[];
    image: any;
  } | null;
};

export default function BrandStory({ data }: BrandStoryProps) {
  if (!data) return null;

  return (
    <section className="py-24 bg-stone-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-2xl"
          >
            {data.image && (
              <Image
                src={urlFor(data.image)}
                alt={data.title || "Brand Story"}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 leading-tight">
              {data.title}
            </h2>
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed font-light">
              {data.story?.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
