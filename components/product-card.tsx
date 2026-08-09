import Link from "next/link";
import { money } from "@/lib/utils";
import { ProductImage } from "@/components/product-image";

export function ProductCard({ product }: { product: { name: string; slug: string; price: number | string; image: string; categoryLabel?: string; isNew?: boolean; isFeatured?: boolean } }) {
  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-line">
        <ProductImage src={product.image} alt={product.name} className="object-cover transition duration-500 group-hover:scale-105" sizes="(max-width: 768px) 50vw, 25vw" />
        {(product.isNew || product.isFeatured) && <span className="absolute left-3 top-3 bg-paper px-2 py-1 text-[.65rem] font-bold uppercase tracking-widest text-ink">{product.isNew ? "New" : "Featured"}</span>}
      </div>
      <div className="mt-3 flex justify-between gap-3">
        <div>
          {product.categoryLabel && <p className="text-xs text-sage">{product.categoryLabel}</p>}
          <h3 className="mt-1 font-medium">{product.name}</h3>
        </div>
        <span className="shrink-0 text-sm">{money(product.price)}</span>
      </div>
    </Link>
  );
}
