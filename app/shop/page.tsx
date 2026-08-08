import { ProductCard } from "@/components/product-card";
import { liveProducts } from "@/lib/catalog";
export const metadata={title:"Shop"};
export default async function Shop(){const products=await liveProducts();return <section className="wrap py-14 sm:py-20"><p className="eyebrow">Browse the studio</p><h1 className="display mt-3 text-5xl sm:text-6xl">The collection.</h1><p className="mt-5 max-w-xl text-lg leading-8 text-neutral-600">Find a piece to make your own, or begin with a custom request.</p><div className="mt-12 grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">{products.map(p=><ProductCard key={p.id} product={p}/>)}</div></section>}
