import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { liveCategories, liveProducts } from "@/lib/catalog";
export const metadata = { title: "Shop" };

export default async function Shop() {
  const [products, categories] = await Promise.all([liveProducts(), liveCategories()]);
  return (
    <section className="wrap py-12">
      <p className="eyebrow">Browse the studio</p>
      <h1 className="mt-2 text-4xl">Products</h1>
      <p className="mt-3 max-w-xl text-neutral-600">Every piece can be personalised. Find one to make your own, or start with a custom request.</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {categories.map((category) => (
          <Link key={category.slug} href={`/category/${category.slug}`} className="button !px-3 !py-1.5 text-xs">{category.name} <span className="ml-1 opacity-60">{category.productCount}</span></Link>
        ))}
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div>
    </section>
  );
}
