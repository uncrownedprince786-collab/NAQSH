import { prisma } from "@/lib/db";
import { demoProducts } from "@/lib/demo";

export async function liveProducts() {
  try {
    const products = await prisma.product.findMany({ where: { isActive: true }, include: { category: true, images: { include: { media: true }, orderBy: { position: "asc" } } }, orderBy: { createdAt: "desc" } });
    return products.map((product) => ({ id: product.id, name: product.name, slug: product.slug, description: product.description, price: Number(product.price), category: product.category.slug, image: product.images[0]?.media.url || demoProducts[0].image }));
  } catch { return demoProducts; }
}

export async function liveProduct(slug: string) {
  try {
    const product = await prisma.product.findFirst({ where: { slug, isActive: true }, include: { category: true, variants: true, images: { include: { media: true }, orderBy: { position: "asc" } } } });
    if (product) return { id: product.id, name: product.name, slug: product.slug, description: product.description, price: Number(product.price), category: product.category.slug, image: product.images[0]?.media.url || demoProducts[0].image, images: product.images.map((item) => item.media.url), variants: product.variants[0] };
  } catch { /* fallback below */ }
  const fallback = demoProducts.find((item) => item.slug === slug); return fallback ? { ...fallback, images: [fallback.image], variants: undefined } : null;
}
