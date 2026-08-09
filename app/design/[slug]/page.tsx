import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DesignRequest } from "@/components/design-request";
import { ProductImage } from "@/components/product-image";
import { getDesign } from "@/lib/designs";
import { siteSettings } from "@/lib/settings";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const design = getDesign(slug);
  if (!design) return { title: "Design | NAQSH" };
  const title = `Use the ${design.name} design | NAQSH`;
  const description = `${design.name}. Original NAQSH artwork, printed on the product of your choice — t-shirts, hoodies, mugs, posters and more. Made to order.`;
  return { title, description, alternates: { canonical: `/design/${design.slug}` }, openGraph: { title, description, images: [{ url: `${siteUrl}${design.image}` }] } };
}

export default async function DesignPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const design = getDesign(slug);
  if (!design || !design.isActive) return notFound();
  const { whatsapp } = await siteSettings();
  const canonical = `/design/${design.slug}`;
  const crumbs = [{ name: "Home", path: "/" }, { name: "Categories", path: "/categories" }, { name: "Home & Gifts", path: "/category/home-gifts" }, { name: "Posters & Prints", path: "/category/home-gifts/posters-prints" }, { name: design.name, path: canonical }];
  const breadcrumbLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: crumbs.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.name, item: `${siteUrl}${item.path}` })) };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <section className="wrap py-4 text-sm text-neutral-600" aria-label="Breadcrumb">
        {crumbs.slice(0, -1).map((item) => <span key={item.path}><Link href={item.path}>{item.name}</Link><span className="mx-2">/</span></span>)}
        <span>{design.name}</span>
      </section>
      <section className="wrap grid gap-10 py-8 lg:grid-cols-2">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="relative aspect-[3/4] overflow-hidden bg-line">
            <ProductImage src={design.image} alt={design.name} priority sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
        </div>
        <div>
          <h1 className="text-4xl">{design.name}</h1>
          <p className="mt-4 max-w-xl leading-7 text-neutral-600">{design.description}</p>
          <p className="mt-3 text-sm text-neutral-500">Made to order in Sialkot · printed with DTF and sublimation where the product calls for it</p>
          <div className="mt-10">
            <DesignRequest design={{ name: design.name, slug: design.slug, description: design.description }} allowedProductTypes={design.productTypes} whatsappNumber={whatsapp.phone} />
          </div>
        </div>
      </section>
    </>
  );
}
