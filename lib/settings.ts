import { prisma } from "@/lib/db";

export async function siteSettings() {
  const [brand, whatsapp, contact] = await Promise.all([
    prisma.brandSetting.upsert({ where: { id: "default" }, update: {}, create: { id: "default" } }),
    prisma.whatsAppSetting.upsert({ where: { id: "default" }, update: {}, create: { id: "default" } }),
    prisma.contactSetting.upsert({ where: { id: "default" }, update: {}, create: { id: "default" } }),
  ]);
  return { brand, whatsapp, contact };
}
