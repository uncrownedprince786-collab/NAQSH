import { notFound } from "next/navigation";
import { money } from "@/lib/utils";
import { ProductInquiry } from "@/components/product-inquiry";
import { ProductGallery } from "@/components/product-gallery";
import { liveProduct } from "@/lib/catalog";
export default async function Product({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const p = await liveProduct(slug); if (!p) return notFound(); return <section className="wrap grid gap-10 py-10 md:grid-cols-2"><ProductGallery images={p.images?.length ? p.images : [p.image]} alt={p.name}/><div className="max-w-lg py-2"><p className="eyebrow">Made to order</p><h1 className="mt-3 text-4xl">{p.name}</h1><p className="mt-3 text-lg">{money(p.price)}</p><p className="mt-6 leading-7 text-neutral-600">{p.fullDescription || p.description}</p>{p.isCustomizable && <div className="mt-6 border-l-2 border-sage pl-4 text-sm text-neutral-600">Customizable — share your own artwork or ask us to adapt the placement.</div>}<ProductInquiry name={p.name} id={p.id}/></div></section>; }
