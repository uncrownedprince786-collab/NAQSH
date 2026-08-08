import Link from "next/link";
import { siteSettings } from "@/lib/settings";
import { whatsappLink } from "@/lib/utils";

export async function SiteHeader() {
  const { brand, whatsapp } = await siteSettings();
  return <header className="site-header"><div className="wrap flex min-h-20 flex-wrap items-center justify-between gap-x-5 gap-y-3 py-4"><Link href="/" className="flex items-center gap-3 text-2xl font-bold tracking-[.25em]">{brand.logoUrl ? <img src={brand.logoUrl} alt={brand.siteName} className="h-8 w-auto" /> : brand.siteName}</Link><nav aria-label="Main navigation" className="order-3 flex w-full justify-between gap-3 overflow-x-auto whitespace-nowrap border-t border-line pt-3 text-[.67rem] font-bold uppercase tracking-[.12em] md:order-2 md:w-auto md:border-0 md:pt-0"><Link href="/shop">Shop</Link><Link href="/collections">Collections</Link><Link href="/custom-design">Create</Link><Link href="/about">Our story</Link></nav><a className="text-[.67rem] font-bold uppercase tracking-[.12em] text-clay underline underline-offset-5 md:order-3" href={whatsappLink(whatsapp.phone || "923000000000", whatsapp.defaultMessage)} target="_blank" rel="noreferrer">WhatsApp</a></div></header>;
}
