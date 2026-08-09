import { siteSettings } from "@/lib/settings";
import { HeaderNav } from "@/components/header-nav";
export async function SiteHeader() { const { brand, whatsapp } = await siteSettings(); return <HeaderNav brandName={brand.siteName} logoUrl={brand.logoUrl} whatsappNumber={whatsapp.phone} whatsappMessage={whatsapp.defaultMessage} />; }
