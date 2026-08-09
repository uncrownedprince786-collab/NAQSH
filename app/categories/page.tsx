import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { liveCategories } from "@/lib/catalog";
export const metadata: Metadata = { title: "Categories | Custom Apparel & Merchandise", description: "Browse NAQSH categories: men's, women's and kids custom clothing, custom t-shirts, hoodies, gym wear, bags, gifts and made-to-order custom printing.", alternates: { canonical: "/categories" } };

export default async function Categories() {
  const categories = await liveCategories();
  return (
    <>
      <section className="wrap py-12">
        <p className="eyebrow">Browse the studio</p>
        <h1 className="mt-2 text-4xl">Categories</h1>
        <p className="mt-3 max-w-xl text-neutral-600">Custom printed t-shirts, hoodies, gym wear, accessories and made-to-order pieces. Start with a category, then make it yours.</p>
      </section>
      <section className="wrap grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Link href={`/category/${category.slug}`} key={category.slug} className="group relative aspect-[4/5] overflow-hidden bg-line">
            <Image src={category.image} alt={category.name} fill className="image-lift object-cover" sizes="(max-width:640px) 50vw,33vw" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-5 pb-5 pt-16 text-white">
              <h2 className="text-xl">{category.name}</h2>
              <p className="mt-1 text-sm leading-5 text-white/85">{category.productCount} pieces</p>
            </div>
          </Link>
        ))}
      </section>
      <section className="wrap py-14">
        <p className="eyebrow">Custom printing</p>
        <h2 className="display mt-3 text-3xl sm:text-4xl">Not sure where to start?</h2>
        <p className="mt-4 max-w-2xl text-neutral-600">Bring an artwork, reference, sketch, logo, photograph or just an idea. We handle the DTF and sublimation printing in Sialkot and confirm the details with you on WhatsApp.</p>
        <Link href="/custom-design" className="button mt-7">Create Your Design</Link>
      </section>
    </>
  );
}
