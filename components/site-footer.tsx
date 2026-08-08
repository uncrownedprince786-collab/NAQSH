import Link from "next/link";
import { siteSettings } from "@/lib/settings";

export async function SiteFooter() { const { brand, contact } = await siteSettings(); return <footer className="mt-20 border-t border-line py-10"><div className="wrap grid gap-8 md:grid-cols-3"><div><div className="font-bold tracking-[.18em]">{brand.siteName}</div><p className="mt-2 text-sm text-neutral-600">{brand.tagline}</p></div><div className="text-sm leading-7"><Link href="/shop">Shop</Link><br /><Link href="/custom-design">Create your design</Link><br /><Link href="/contact">Contact</Link>{contact.email && <><br />{contact.email}</>}{contact.phone && <><br />{contact.phone}</>}</div><p className="text-sm text-neutral-600">{contact.address || "Pakistan & beyond."}</p></div></footer>; }
