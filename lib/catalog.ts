import { prisma } from "@/lib/db";
import { demoProducts } from "@/lib/demo";
import { taxonomy, taxonomyBySlug, type SubcategoryDef } from "@/lib/taxonomy";

export type ProductSummary = {
  id: string;
  name: string;
  slug: string;
  description: string;
  fullDescription: string;
  price: number;
  category: string;
  categoryLabel: string;
  subcategory?: string;
  image: string;
  images: string[];
  isFeatured: boolean;
  isNew: boolean;
  customizable: boolean;
  tags: string[];
  colors?: string[];
  sizes?: string[];
};

export type SubcategoryInfo = { name: string; slug: string; productCount: number };

export type CategoryInfo = {
  name: string;
  slug: string;
  description: string;
  image: string;
  seoTitle?: string;
  seoDescription?: string;
  productCount: number;
  subcategories: SubcategoryInfo[];
};

type DbProduct = {
  id: string;
  name: string;
  slug: string;
  description: string;
  fullDescription: string | null;
  price: number;
  categorySlug: string;
  tags: string[];
  isFeatured: boolean;
  isNew: boolean;
  isCustomizable: boolean;
  images: string[];
};

const fallbackImage = demoProducts[0]?.image || "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=85";

const dbSlugToTaxon = new Map<string, { main: string; sub: string; label: string }>();
for (const cat of taxonomy) {
  for (const sub of cat.subcategories) {
    for (const slug of sub.dbSlugs ?? []) {
      if (!dbSlugToTaxon.has(slug)) dbSlugToTaxon.set(slug, { main: cat.slug, sub: sub.slug, label: sub.name });
    }
  }
}

async function fetchDbProducts(): Promise<DbProduct[]> {
  try {
    const rows = await prisma.product.findMany({
      where: { isActive: true },
      include: { category: true, images: { include: { media: true }, orderBy: { position: "asc" } } },
      orderBy: { createdAt: "desc" },
    });
    return rows.map((product) => ({
      id: product.id,
      name: product.name,
      slug: product.slug,
      description: product.description,
      fullDescription: product.fullDescription,
      price: Number(product.price),
      categorySlug: product.category.slug,
      tags: product.tags,
      isFeatured: product.isFeatured,
      isNew: product.isNew,
      isCustomizable: product.isCustomizable,
      images: product.images.map((item) => item.media.url),
    }));
  } catch {
    return [];
  }
}

function mapDbProduct(product: DbProduct): ProductSummary | null {
  const taxon = dbSlugToTaxon.get(product.categorySlug);
  if (!taxon) return null;
  const image = product.images[0] || fallbackImage;
  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    description: product.description,
    fullDescription: product.fullDescription || product.description,
    price: product.price,
    category: taxon.main,
    categoryLabel: taxon.label,
    subcategory: taxon.sub,
    image,
    images: product.images.length ? product.images : [image],
    isFeatured: product.isFeatured,
    isNew: product.isNew,
    customizable: product.isCustomizable,
    tags: product.tags,
  };
}

async function allProducts(): Promise<ProductSummary[]> {
  const db = await fetchDbProducts();
  const merged = new Map<string, ProductSummary>();
  for (const product of db) {
    const mapped = mapDbProduct(product);
    if (mapped) merged.set(mapped.slug, mapped);
  }
  for (const demo of demoProducts) {
    if (!merged.has(demo.slug)) merged.set(demo.slug, demo);
  }
  return [...merged.values()];
}

export async function liveProducts(): Promise<ProductSummary[]> {
  return allProducts();
}

export async function liveProduct(slug: string): Promise<(ProductSummary & { categoryName?: string; parentCategory?: { slug: string; name: string } | null; variants?: unknown }) | null> {
  const products = await allProducts();
  const found = products.find((product) => product.slug === slug);
  if (!found) return null;
  const cat = taxonomyBySlug.get(found.category);
  return { ...found, categoryName: found.categoryLabel, parentCategory: cat ? { slug: cat.slug, name: cat.name } : null, variants: undefined };
}

function productsForSub(products: ProductSummary[], catSlug: string, sub: SubcategoryDef): ProductSummary[] {
  const inCat = products.filter((product) => product.category === catSlug);
  const fromDbCat = inCat.filter((product) => product.subcategory === sub.slug);
  const fromTags = sub.tags ? inCat.filter((product) => product.tags.some((tag) => sub.tags!.includes(tag))) : [];
  const map = new Map<string, ProductSummary>();
  for (const product of [...fromDbCat, ...fromTags]) map.set(product.slug, product);
  return [...map.values()];
}

export async function liveCategories(): Promise<CategoryInfo[]> {
  const products = await allProducts();
  return taxonomy.map((cat) => {
    const catProducts = products.filter((product) => product.category === cat.slug);
    const subcategories = cat.subcategories.map((sub) => ({
      name: sub.name,
      slug: sub.slug,
      productCount: productsForSub(products, cat.slug, sub).length,
    }));
    return {
      name: cat.name,
      slug: cat.slug,
      description: cat.description,
      image: cat.image,
      seoTitle: cat.seoTitle,
      seoDescription: cat.seoDescription,
      productCount: catProducts.length,
      subcategories,
    };
  });
}

export async function liveCategoryProducts(slug: string, limit?: number): Promise<ProductSummary[]> {
  const cat = taxonomyBySlug.get(slug);
  if (!cat) return [];
  const products = await allProducts();
  const matches = products.filter((product) => product.category === slug);
  return typeof limit === "number" ? matches.slice(0, limit) : matches;
}

function resolveSub(cat: (typeof taxonomy)[number], subSlug: string): SubcategoryDef | undefined {
  return (
    cat.subcategories.find((sub) => sub.slug === subSlug) ||
    cat.subcategories.find((sub) => sub.slug === `${cat.slug}-${subSlug}` || sub.slug === `${subSlug}-${cat.slug}`)
  );
}

export async function liveSubcategory(parentSlug: string, subSlug: string): Promise<{ category: CategoryInfo; sub: SubcategoryInfo } | null> {
  const cat = taxonomyBySlug.get(parentSlug);
  if (!cat) return null;
  const sub = resolveSub(cat, subSlug);
  if (!sub) return null;
  const category = (await liveCategories()).find((item) => item.slug === parentSlug);
  if (!category) return null;
  const info = category.subcategories.find((item) => item.slug === sub.slug);
  return { category, sub: info || { name: sub.name, slug: sub.slug, productCount: 0 } };
}

export async function liveSubcategoryProducts(parentSlug: string, subSlug: string, limit?: number): Promise<ProductSummary[]> {
  const cat = taxonomyBySlug.get(parentSlug);
  if (!cat) return [];
  const sub = resolveSub(cat, subSlug);
  if (!sub) return [];
  const products = await allProducts();
  const matches = productsForSub(products, parentSlug, sub);
  return typeof limit === "number" ? matches.slice(0, limit) : matches;
}

export async function relatedProducts(slug: string, limit = 4): Promise<ProductSummary[]> {
  const current = await liveProduct(slug);
  if (!current) return [];
  const products = await allProducts();
  const sameCategory = products.filter((product) => product.category === current.category && product.slug !== slug);
  if (sameCategory.length >= limit) return sameCategory.slice(0, limit);
  const rest = products.filter((product) => product.slug !== slug && !sameCategory.includes(product));
  return [...sameCategory, ...rest].slice(0, limit);
}

export async function liveCollection(slug: string) {
  try {
    const collection = await prisma.collection.findFirst({ where: { slug, isVisible: true }, include: { products: { include: { product: { include: { category: true, images: { include: { media: true }, orderBy: { position: "asc" } } } } } } } });
    if (!collection) return null;
    return { name: collection.name, products: collection.products.map(({ product }) => ({ id: product.id, name: product.name, slug: product.slug, price: Number(product.price), image: product.images[0]?.media.url || fallbackImage })) };
  } catch {
    return null;
  }
}
