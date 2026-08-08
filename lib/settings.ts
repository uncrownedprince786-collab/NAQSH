import { prisma } from "@/lib/db";

export async function siteSettings() {
  const fallback = {
    brand: { id: "default", siteName: "NAQSH", tagline: "Where Ideas Take Form.", logoUrl: null, faviconUrl: null, updatedAt: new Date() },
    whatsapp: { id: "default", phone: null, defaultMessage: "Hello, I would like to know more about NAQSH.", productMessage: "Hello, I am interested in this NAQSH product.", customMessage: "Hello, I submitted a NAQSH inquiry.", updatedAt: new Date() },
    contact: { id: "default", phone: null, email: null, address: null, hours: null, instagram: null, facebook: null, updatedAt: new Date() },
  };
  try {
    const [brand, whatsapp, contact] = await Promise.all([
      prisma.brandSetting.findUnique({ where: { id: "default" } }),
      prisma.whatsAppSetting.findUnique({ where: { id: "default" } }),
      prisma.contactSetting.findUnique({ where: { id: "default" } }),
    ]);
  return {
    brand: brand || fallback.brand,
    whatsapp: whatsapp || fallback.whatsapp,
    contact: contact || fallback.contact,
  };
  } catch { return fallback; }
}
