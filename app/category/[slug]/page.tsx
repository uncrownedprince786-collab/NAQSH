import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { liveCategories, liveCategoryProducts } from "@/lib/catalog";
import { taxonomyBySlug } from "@/lib/taxonomy";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cat = taxonomyBySlug.get(slug);
  if (!cat) return { title: "Category | NAQSH" };
  const title = cat.seoTitle || `${cat.name} | Custom Apparel`;
  const description = cat.seoDescription || cat.description;
  return { title, description, alternates: { canonical: `/category/${slug}` }, openGraph: { title, description, images: [cat.image] } };
}

export default async function Category({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const def = taxonomyBySlug.get(slug);
  if (!def) return notFound();
  const [categories, products] = await Promise.all([liveCategories(), liveCategoryProducts(slug)]);
  const info = categories.find((category) => category.slug === slug);
  if (!info) return notFound();
  const crumbs = [{ name: "Home", path: "/" }, { name: "Categories", path: "/categories" }, { name: info.name, path: `/category/${slug}` }];
  const breadcrumbLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: crumbs.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.name, item: `${siteUrl}${item.path}` })) };
  const others = categories.filter((category) => category.slug !== slug);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <section className="wrap py-4 text-sm text-neutral-600" aria-label="Breadcrumb">
        {crumbs.slice(0, -1).map((item) => <span key={item.path}><Link href={item.path}>{item.name}</Link><span className="mx-2">/</span></span>)}
        <span>{info.name}</span>
      </section>
      <section className="wrap py-8">
        <p className="eyebrow">{info.productCount} pieces</p>
        <h1 className="mt-2 text-4xl">{info.name}</h1>
        <p className="mt-3 max-w-2xl text-neutral-600">{info.description}</p>
        <p className="mt-5 max-w-2xl text-sm leading-6 text-neutral-500">Every piece in {info.name.toLowerCase()} can be personalised. Choose a ready-made design or bring your own artwork, text, logo or idea and we will print it to order in Sialkot.</p>
      </section>
      {info.subcategories.length > 0 && (
        <nav className="wrap mb-2 flex flex-wrap gap-2" aria-label={`${info.name} subcategories`}>
          {info.subcategories.filter((sub) => sub.productCount > 0).map((sub) => (
            <Link key={sub.slug} href={`/category/${slug}/${sub.slug}`} className="button !px-4 !py-2 text-sm">{sub.name} <span className="ml-1 opacity-60">{sub.productCount}</span></Link>
          ))}
        </nav>
      )}
      <section className="wrap py-10">
        {products.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        ) : (
          <div className="border border-line bg-white/40 p-10 text-center">
            <h2 className="text-xl">This category is being restocked.</h2>
            <p className="mt-2 text-sm text-neutral-600">New pieces are on the way. In the meantime, start a custom order with your own idea.</p>
            <Link href="/custom-design" className="button mt-6">Create Your Design</Link>
          </div>
        )}
      </section>
      <section className="wrap border-t border-line py-12">
        <p className="eyebrow">Keep exploring</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {others.map((category) => <Link key={category.slug} href={`/category/${category.slug}`} className="text-sm underline underline-offset-4">{category.name}</Link>)}
        </div>
      </section>
    </>
  );
}
