import type { MetadataRoute } from "next";
import { prisma } from "@/lib/db";
import { taxonomy } from "@/lib/taxonomy";
import { designArtworks } from "@/lib/designs";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const pages = ["", "/shop", "/categories", "/collections", "/custom-design", "/about", "/contact"];
  const subcategories = taxonomy.flatMap((category) => category.subcategories.map((sub) => `/category/${category.slug}/${sub.slug}`));
  const designs = designArtworks.filter((design) => design.isActive).map((design) => `/design/${design.slug}`);
  try {
    const [categories, products, collections] = await Promise.all([
      prisma.category.findMany({ where: { isVisible: true }, select: { slug: true, updatedAt: true } }),
      prisma.product.findMany({ where: { isActive: true }, select: { slug: true, updatedAt: true } }),
      prisma.collection.findMany({ where: { isVisible: true }, select: { slug: true, updatedAt: true } }),
    ]);
    return [
      ...pages.map((path) => ({ url: `${base}${path}`, lastModified: new Date() })),
      ...taxonomy.map((category) => ({ url: `${base}/category/${category.slug}`, lastModified: new Date() })),
      ...subcategories.map((path) => ({ url: `${base}${path}`, lastModified: new Date() })),
      ...designs.map((path) => ({ url: `${base}${path}`, lastModified: new Date() })),
      ...categories.map((item) => ({ url: `${base}/category/${item.slug}`, lastModified: item.updatedAt })),
      ...products.map((item) => ({ url: `${base}/product/${item.slug}`, lastModified: item.updatedAt })),
      ...collections.map((item) => ({ url: `${base}/collection/${item.slug}`, lastModified: item.updatedAt })),
    ];
  } catch {
    return [
      ...pages.map((path) => ({ url: `${base}${path}`, lastModified: new Date() })),
      ...taxonomy.map((category) => ({ url: `${base}/category/${category.slug}`, lastModified: new Date() })),
      ...subcategories.map((path) => ({ url: `${base}${path}`, lastModified: new Date() })),
      ...designs.map((path) => ({ url: `${base}${path}`, lastModified: new Date() })),
    ];
  }
}
