import { ProductCard } from "@/components/product-card";
import { liveCollection } from "@/lib/catalog";
import { notFound } from "next/navigation";
export default async function Collection({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const collection = await liveCollection(slug); if (!collection) return notFound(); return <section className="wrap catalog-page"><div className="catalog-intro"><p className="page-kicker">NAQSH / Curated collection</p><h1 className="catalog-title mt-5">{collection.name}</h1></div><div className="catalog-grid">{collection.products.map((product) => <ProductCard key={product.id} product={product} />)}</div></section>; }
