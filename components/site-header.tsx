import Link from "next/link";
import { siteSettings } from "@/lib/settings";
import { whatsappLink } from "@/lib/utils";

export async function SiteHeader() {
  const { brand, whatsapp } = await siteSettings();
  return <header className="border-b border-line bg-paper/95"><div className="wrap flex min-h-18 flex-wrap items-center justify-between gap-x-5 gap-y-3 py-4"><Link href="/" className="flex items-center gap-3 text-xl font-bold tracking-[.18em]">{brand.logoUrl ? <img src={brand.logoUrl} alt={brand.siteName} className="h-8 w-auto" /> : brand.siteName}</Link><nav aria-label="Main navigation" className="order-3 flex w-full justify-between gap-3 overflow-x-auto whitespace-nowrap border-t border-line pt-3 text-xs md:order-2 md:w-auto md:border-0 md:pt-0 md:text-sm"><Link href="/shop">Shop</Link><Link href="/collections">Collections</Link><Link href="/custom-design">Create your design</Link><Link href="/about">About</Link></nav><a className="button button-clay text-[.62rem] md:order-3" href={whatsappLink(whatsapp.phone || "923000000000", whatsapp.defaultMessage)} target="_blank" rel="noreferrer">WhatsApp</a></div></header>;
}
