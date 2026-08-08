import { prisma } from "@/lib/db";
import { demoProducts } from "@/lib/demo";

export async function liveProducts() {
  try {
    const products = await prisma.product.findMany({ where: { isActive: true }, include: { category: true, images: { include: { media: true }, orderBy: { position: "asc" } } }, orderBy: { createdAt: "desc" } });
    return products.map((product) => ({ id: product.id, name: product.name, slug: product.slug, description: product.description, fullDescription: product.fullDescription || product.description, price: Number(product.price), category: product.category.slug, image: product.images[0]?.media.url || demoProducts[0].image, isFeatured: product.isFeatured, isNew: product.isNew, tags: product.tags, customizable: product.isCustomizable }));
  } catch { return demoProducts; }
}

export async function liveCategoryProducts(slug: string, limit = 4) {
  try {
    const category = await prisma.category.findFirst({ where: { slug, isVisible: true }, include: { children: { select: { id: true } } } });
    if (!category) return [];
    const categoryIds = [category.id, ...category.children.map((child) => child.id)];
    const products = await prisma.product.findMany({ where: { isActive: true, categoryId: { in: categoryIds } }, include: { images: { include: { media: true }, orderBy: { position: "asc" } } }, take: limit, orderBy: { createdAt: "desc" } });
    return products.map((product) => ({ id: product.id, name: product.name, slug: product.slug, price: Number(product.price), image: product.images[0]?.media.url || demoProducts[0].image }));
  } catch { return []; }
}

export async function liveCategories() {
  try {
    const categories = await prisma.category.findMany({ where: { isVisible: true, parentId: null }, include: { image: true }, orderBy: { position: "asc" } });
    return categories.map((category) => ({ name: category.name, slug: category.slug, description: category.description || "Explore the latest NAQSH pieces.", image: category.image?.url || demoProducts[0].image, group: "Catalogue" }));
  } catch { return []; }
}

export async function liveProduct(slug: string) {
  try {
    const product = await prisma.product.findFirst({ where: { slug, isActive: true }, include: { category: { include: { parent: true } }, variants: true, images: { include: { media: true }, orderBy: { position: "asc" } } } });
    if (product) return { id: product.id, name: product.name, slug: product.slug, description: product.description, fullDescription: product.fullDescription || product.description, price: Number(product.price), category: product.category.slug, categoryName: product.category.name, parentCategory: product.category.parent ? { slug: product.category.parent.slug, name: product.category.parent.name } : null, image: product.images[0]?.media.url || demoProducts[0].image, images: product.images.map((item) => item.media.url), variants: product.variants[0], isCustomizable: product.isCustomizable, isFeatured: product.isFeatured, isNew: product.isNew, tags: product.tags };
  } catch { /* fallback below */ }
  const fallback = demoProducts.find((item) => item.slug === slug); return fallback ? { ...fallback, images: [fallback.image], variants: undefined } : null;
}

export async function liveCollection(slug: string) {
  const collection = await prisma.collection.findFirst({ where: { slug, isVisible: true }, include: { products: { include: { product: { include: { category: true, images: { include: { media: true }, orderBy: { position: "asc" } } } } } } } });
  if (!collection) return null;
  return { name: collection.name, products: collection.products.map(({ product }) => ({ id: product.id, name: product.name, slug: product.slug, price: Number(product.price), image: product.images[0]?.media.url || demoProducts[0].image })) };
}
