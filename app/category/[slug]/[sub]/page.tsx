import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { DesignShowcase } from "@/components/design-showcase";
import { liveSubcategory, liveSubcategoryProducts } from "@/lib/catalog";
import { taxonomyBySlug } from "@/lib/taxonomy";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export async function generateMetadata({ params }: { params: Promise<{ slug: string; sub: string }> }): Promise<Metadata> {
  const { slug, sub } = await params;
  const result = await liveSubcategory(slug, sub);
  if (!result) return { title: "Category | NAQSH" };
  const title = `${result.sub.name} | NAQSH`;
  const description = `${result.sub.name} within ${result.category.name}. Custom printed pieces from NAQSH, made to order in Sialkot, Pakistan.`;
  return { title, description, alternates: { canonical: `/category/${slug}/${result.sub.slug}` }, openGraph: { title, description } };
}

export default async function Subcategory({ params }: { params: Promise<{ slug: string; sub: string }> }) {
  const { slug, sub } = await params;
  const def = taxonomyBySlug.get(slug);
  if (!def) return notFound();
  const [result, products] = await Promise.all([liveSubcategory(slug, sub), liveSubcategoryProducts(slug, sub)]);
  if (!result) return notFound();
  const { category, sub: info } = result;
  const canonical = `/category/${slug}/${info.slug}`;
  const crumbs = [{ name: "Home", path: "/" }, { name: "Categories", path: "/categories" }, { name: category.name, path: `/category/${slug}` }, { name: info.name, path: canonical }];
  const breadcrumbLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: crumbs.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.name, item: `${siteUrl}${item.path}` })) };
  const siblings = category.subcategories.filter((item) => item.slug !== sub);

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
        <p className="mt-3 max-w-2xl text-neutral-600">Browse {info.name.toLowerCase()} within {category.name.toLowerCase()}. Every piece can be personalised with your own design before it is printed.</p>
        <Link href={`/category/${slug}`} className="mt-5 inline-block text-sm underline underline-offset-4">Back to all {category.name}</Link>
      </section>
      {slug === "home-gifts" && info.slug === "posters-prints" && <DesignShowcase />}
      <section className="wrap py-6">
        {products.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        ) : (
          <div className="border border-line bg-white/40 p-10 text-center">
            <h2 className="text-xl">Nothing here just yet.</h2>
            <p className="mt-2 text-sm text-neutral-600">Start a custom order instead — share your idea and we will make it.</p>
            <Link href="/custom-design" className="button mt-6">Create Your Design</Link>
          </div>
        )}
      </section>
      {siblings.length > 0 && (
        <section className="wrap border-t border-line py-12">
          <p className="eyebrow">More in {category.name}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {siblings.filter((item) => item.productCount > 0).map((item) => (
              <Link key={item.slug} href={`/category/${slug}/${item.slug}`} className="text-sm underline underline-offset-4">{item.name}</Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
