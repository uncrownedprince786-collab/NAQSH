import { ProductCard } from "@/components/product-card";
import { liveProducts } from "@/lib/catalog";
export const metadata={title:"Shop"};
export default async function Shop(){const products=await liveProducts();return <section className="wrap catalog-page"><div className="catalog-intro"><p className="page-kicker">NAQSH / The studio collection</p><h1 className="catalog-title mt-5">Objects made<br/>personal.</h1><p className="mt-8 max-w-xl text-lg leading-8 text-[#5c5349]">Choose a starting point, then make it yours. Every product is a surface for a name, memory, sketch or idea.</p></div><div className="catalog-grid">{products.map(p=><ProductCard key={p.id} product={p}/>)}</div></section>}
