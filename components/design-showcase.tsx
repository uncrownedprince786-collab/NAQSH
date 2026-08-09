import Link from "next/link";
import { activeDesigns } from "@/lib/designs";
import { ProductImage } from "@/components/product-image";

export function DesignShowcase({ viewAllHref, viewAllLabel }: { viewAllHref?: string; viewAllLabel?: string }) {
  const designs = activeDesigns();
  if (!designs.length) return null;
  return (
    <section className="border-y border-line bg-white/35 py-16 sm:py-20">
      <div className="wrap">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">The design collection</p>
            <h2 className="display mt-3 text-3xl sm:text-4xl">Choose a design.</h2>
          </div>
          {viewAllHref && <Link className="hidden text-sm underline underline-offset-4 sm:block" href={viewAllHref}>{viewAllLabel}</Link>}
        </div>
        <p className="mt-4 max-w-2xl text-neutral-600">Original NAQSH artwork, printed onto the product you choose. Pick a design, then tell us where it should go — each piece is made to order.</p>
        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3">
          {designs.map((design, index) => (
            <Link key={design.slug} href={`/design/${design.slug}`} className="group block">
              <div className="relative aspect-[4/5] overflow-hidden bg-line">
                <ProductImage src={design.image} alt={design.name} className="object-cover transition duration-700 group-hover:scale-[1.04]" sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" />
                <span className="absolute left-3 top-3 bg-paper/85 px-2 py-1 text-[10px] font-bold tracking-[.2em] text-ink">{String(index + 1).padStart(2, "0")}</span>
              </div>
              <div className="mt-4 flex items-baseline justify-between gap-3">
                <h3 className="text-sm font-medium transition-colors group-hover:text-clay sm:text-base">{design.name}</h3>
                <span className="hidden text-xs font-bold uppercase tracking-[.15em] text-clay sm:block">Use</span>
              </div>
              <p className="mt-1 hidden text-sm leading-6 text-neutral-600 sm:block">{design.description}</p>
            </Link>
          ))}
        </div>
        {viewAllHref && <Link className="button mt-7 sm:hidden" href={viewAllHref}>{viewAllLabel}</Link>}
      </div>
    </section>
  );
}
