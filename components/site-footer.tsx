import Link from "next/link";
import { siteSettings } from "@/lib/settings";
import { whatsappLink } from "@/lib/utils";
export async function SiteFooter() {
  const { brand, contact, whatsapp } = await siteSettings();
  const wa = whatsappLink(whatsapp.phone || "923000000000", whatsapp.defaultMessage);
  return (
    <footer className="mt-20 border-t border-line py-14">
      <div className="wrap grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="font-bold tracking-[.18em]">{brand.siteName}</div>
          <p className="mt-2 max-w-xs text-sm leading-6 text-neutral-600">{brand.tagline}</p>
          <p className="mt-4 text-sm text-neutral-600">Custom printed apparel and personalised merchandise, made in Sialkot, Pakistan.</p>
        </div>
        <div className="text-sm leading-7">
          <p className="mb-2 font-medium">Shop</p>
          <Link href="/shop">All Products</Link><br />
          <Link href="/category/men">Men</Link><br />
          <Link href="/category/women">Women</Link><br />
          <Link href="/category/kids">Kids</Link><br />
          <Link href="/category/t-shirts">T-Shirts</Link><br />
          <Link href="/category/hoodies">Hoodies</Link><br />
          <Link href="/category/gym-wear">Gym Wear</Link>
        </div>
        <div className="text-sm leading-7">
          <p className="mb-2 font-medium">Create</p>
          <Link href="/custom-design">Create Your Design</Link><br />
          <Link href="/category/custom/custom-orders">Custom Orders</Link><br />
          <Link href="/category/custom/bulk-event-merchandise">Bulk &amp; Events</Link>
        </div>
        <div className="text-sm leading-7">
          <p className="mb-2 font-medium">Explore</p>
          <Link href="/categories">Categories</Link><br />
          <Link href="/collections">Collections</Link><br />
          <Link href="/about">About Us</Link><br />
          <Link href="/contact">Contact</Link><br />
          <a href={wa} target="_blank" rel="noreferrer">WhatsApp</a>
          {contact.email && <><br /><a href={`mailto:${contact.email}`}>{contact.email}</a></>}
          <br /><span className="text-neutral-600">{contact.address || "Sialkot, Pakistan"}</span>
        </div>
      </div>
      <div className="wrap mt-10 border-t border-line pt-6 text-xs text-neutral-500">© {new Date().getFullYear()} {brand.siteName} · Custom printing in Sialkot, Pakistan.</div>
    </footer>
  );
}
