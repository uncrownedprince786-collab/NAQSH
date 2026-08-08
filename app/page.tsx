import Image from "next/image";
import Link from "next/link";
import { liveCategories, liveCategoryProducts, liveProducts } from "@/lib/catalog";
import { homeContent } from "@/lib/site-content";
import { ProductCard } from "@/components/product-card";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "Custom T-Shirts & Custom Apparel", description: "Create custom T-shirts, hoodies, sportswear and merchandise with your own designs or explore ready-made pieces from NAQSH.", alternates: { canonical: "/" } };

export default async function Home() {
  const categories = await liveCategories();
  const featuredProducts = (await liveProducts()).filter((product) => product.isFeatured).slice(0, 4);
  const categorySections = await Promise.all(categories.map(async (category) => ({ category, products: await liveCategoryProducts(category.slug, 4) })));
  const { hero, custom, story, howItWorks, finalCta } = homeContent;
  return <>
    <section className="wrap grid min-h-[620px] gap-8 py-7 md:grid-cols-[.94fr_1.06fr] md:py-12">
      <div className="flex flex-col justify-center py-10 md:py-16"><p className="eyebrow">{hero.eyebrow}</p><h1 className="display mt-5 max-w-xl text-6xl leading-[.86] sm:text-7xl md:text-8xl">{hero.title}</h1><p className="mt-7 max-w-md text-lg leading-8 text-neutral-600">{hero.text}</p><div className="mt-9 flex flex-wrap gap-3"><Link className="button button-clay" href="/shop">Explore Collection</Link><Link className="button" href="/custom-design">Create Your Own</Link></div></div>
      <div className="relative min-h-[420px] overflow-hidden bg-line md:min-h-0"><Image priority src={hero.image} alt="NAQSH creative apparel" fill className="object-cover" sizes="(max-width:768px) 100vw,55vw" /></div>
    </section>

    <section className="border-y border-line bg-white/35 py-18"><div className="wrap"><div className="flex items-end justify-between gap-4"><div><p className="eyebrow">Explore categories</p><h2 className="display mt-3 text-4xl sm:text-5xl">Find your canvas.</h2></div><Link className="hidden text-sm underline underline-offset-4 sm:block" href="/shop">View all products</Link></div><div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{categories.slice(0,4).map((category) => <Link href={`/category/${category.slug}`} key={category.slug} className="group relative aspect-[4/5] overflow-hidden bg-line"><Image src={category.image} alt={category.name} fill className="image-lift object-cover" sizes="(max-width:640px) 50vw,25vw"/><div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-5 pb-5 pt-16 text-white"><p className="text-xs tracking-wide text-white/75">{category.group}</p><h3 className="mt-1 text-xl">{category.name}</h3><p className="mt-1 text-sm leading-5 text-white/85">{category.description}</p></div></Link>)}</div><Link className="button mt-7 sm:hidden" href="/shop">View all products</Link></div></section>

    <section className="wrap py-20"><div className="flex items-end justify-between gap-4"><div><p className="eyebrow">Featured pieces</p><h2 className="display mt-3 text-4xl sm:text-5xl">Made to become yours.</h2></div><Link className="text-sm underline underline-offset-4" href="/shop">Shop all</Link></div><div className="mt-10 grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">{featuredProducts.map(product => <ProductCard product={product} key={product.id}/>)}</div></section>

    {categorySections.map(({ category, products }) => products.length > 0 && <section className="wrap py-12" key={category.slug}><div className="flex items-end justify-between gap-4"><div><p className="eyebrow">{category.name}</p><h2 className="display mt-3 text-3xl sm:text-4xl">Made for your ideas.</h2></div><Link className="text-sm underline underline-offset-4" href={`/category/${category.slug}`}>View all</Link></div><div className="mt-8 grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">{products.map((product) => <ProductCard product={product} key={product.id}/>)}</div></section>)}

    <section className="wrap grid gap-0 py-8 md:grid-cols-2 md:py-16"><div className="relative min-h-[380px] overflow-hidden bg-line"><Image src={custom.image} alt="Creative work in progress" fill className="object-cover" sizes="(max-width:768px) 100vw,50vw"/></div><div className="flex flex-col justify-center bg-ink px-7 py-12 text-paper sm:px-12"><p className="eyebrow text-[#bdc5b8]">{custom.eyebrow}</p><h2 className="display mt-4 max-w-md text-4xl leading-[.94] sm:text-5xl">{custom.title}</h2><p className="mt-6 max-w-md leading-7 text-stone-300">{custom.text}</p><Link href="/custom-design" className="button mt-8 w-fit border-paper text-paper hover:bg-paper hover:text-ink">Create Your Own</Link></div></section>

    <section className="border-y border-line bg-white/35 py-20"><div className="wrap"><p className="eyebrow">How NAQSH works</p><h2 className="display mt-3 text-4xl sm:text-5xl">A simple route from thought to thing.</h2><div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">{howItWorks.map(([number,title,text])=><div key={number} className="border-t border-line pt-5"><span className="text-sm font-bold tracking-widest text-clay">{number}</span><h3 className="mt-6 text-xl font-medium">{title}</h3><p className="mt-2 max-w-xs text-sm leading-6 text-neutral-600">{text}</p></div>)}</div></div></section>

    <section className="wrap grid gap-10 py-20 md:grid-cols-[.8fr_1.2fr]"><div><p className="eyebrow">{story.eyebrow}</p><h2 className="display mt-4 text-4xl leading-[.95] sm:text-5xl">{story.title}</h2></div><p className="max-w-xl self-end text-lg leading-8 text-neutral-600">{story.text}</p></section>

    <section className="wrap pb-8"><div className="bg-clay px-7 py-14 text-white sm:px-12 sm:py-18"><p className="eyebrow text-white/75">Make something personal</p><h2 className="display mt-4 text-5xl leading-[.9] sm:text-6xl">{finalCta.title}<br/>{finalCta.text}</h2><Link href="/custom-design" className="button mt-9 border-white text-white hover:bg-white hover:text-clay">Start Creating</Link></div></section>
  </>;
}
