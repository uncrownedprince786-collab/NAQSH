import { ProductCard } from "@/components/product-card";
import { liveCollection } from "@/lib/catalog";
import { notFound } from "next/navigation";

export default async function Collection({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const collection = await liveCollection(slug); if (!collection) return notFound(); return <section className="wrap py-12"><p className="eyebrow">Collection</p><h1 className="mt-2 text-4xl">{collection.name}</h1><div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{collection.products.map((product) => <ProductCard key={product.id} product={product} />)}</div></section>; }
