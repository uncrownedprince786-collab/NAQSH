import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { money } from "@/lib/utils";
import { ProductInquiry } from "@/components/product-inquiry";
import { ProductGallery } from "@/components/product-gallery";
import { ProductCard } from "@/components/product-card";
import { liveProduct, relatedProducts } from "@/lib/catalog";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const product = await liveProduct((await params).slug);
  if (!product) return {};
  const title = `${product.name} - Custom ${product.categoryName || "Apparel"}`;
  return { title, description: product.description, alternates: { canonical: `/product/${product.slug}` }, openGraph: { title, description: product.description, images: product.images.length ? product.images : [product.image] }, twitter: { card: "summary_large_image", title, description: product.description, images: [product.image] } };
}

export default async function Product({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await liveProduct(slug);
  if (!p) return notFound();
  const crumbs = [{ name: "Home", path: "/" }, { name: "Shop", path: "/shop" }, ...(p.parentCategory ? [{ name: p.parentCategory.name, path: `/category/${p.parentCategory.slug}` }] : []), { name: p.categoryName || "Category", path: `/category/${p.category}` }, { name: p.name, path: `/product/${p.slug}` }];
  const jsonLd = { "@context": "https://schema.org", "@type": "Product", name: p.name, description: p.description, image: p.images.length ? p.images : [p.image], brand: { "@type": "Brand", name: "NAQSH" }, category: p.categoryName, offers: { "@type": "Offer", priceCurrency: "PKR", price: p.price, availability: "https://schema.org/InStock", url: `${siteUrl}/product/${p.slug}` } };
  const breadcrumbLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: crumbs.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.name, item: `${siteUrl}${item.path}` })) };
  const related = await relatedProducts(p.slug, 4);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <section className="wrap py-4 text-sm text-neutral-600" aria-label="Breadcrumb">
        {crumbs.slice(0, -1).map((item) => <span key={item.path}><Link href={item.path}>{item.name}</Link><span className="mx-2">/</span></span>)}
        <span>{p.name}</span>
      </section>
      <section className="wrap grid gap-10 py-6 md:grid-cols-2">
        <ProductGallery images={p.images?.length ? p.images : [p.image]} alt={`${p.name} custom apparel`} />
        <div className="max-w-lg py-2">
          <p className="eyebrow">Custom apparel</p>
          <h1 className="mt-3 text-4xl">{p.name}</h1>
          <p className="mt-3 text-lg">{money(p.price)}</p>
          <p className="mt-6 leading-7 text-neutral-600">{p.fullDescription || p.description}</p>
          {p.customizable && <div className="mt-6 border-l-2 border-sage pl-4 text-sm text-neutral-600">Customizable — share your own artwork, text or idea and we will help adapt it for print. DTF and sublimation printing done in Sialkot.</div>}
          <ProductInquiry name={p.name} id={p.id} />
        </div>
      </section>
      {related.length > 0 && (
        <section className="wrap border-t border-line py-14">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Related pieces</p>
              <h2 className="display mt-3 text-3xl sm:text-4xl">You may also like.</h2>
            </div>
            {p.parentCategory && <Link className="hidden text-sm underline underline-offset-4 sm:block" href={`/category/${p.parentCategory.slug}`}>View all {p.parentCategory.name}</Link>}
          </div>
          <div className="mt-8 grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">{related.map((product) => <ProductCard product={product} key={product.id} />)}</div>
        </section>
      )}
    </>
  );
}
