import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { demoCategories, demoProducts } from "../lib/demo";

const db = new PrismaClient();

const imageUrls = [
  "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1506629905607-d405b7a30db9?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1200&q=85",
];

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD are required to seed the database.");

  await db.admin.upsert({ where: { email }, update: { name: "NAQSH Admin" }, create: { email, passwordHash: await bcrypt.hash(password, 12), name: "NAQSH Admin" } });
  await db.siteSettings.upsert({ where: { id: "default" }, update: { brandName: "NAQSH", tagline: "Where Ideas Take Form.", heroTitle: "Where ideas take form.", heroText: "Custom printed pieces, made with care.", heroImageUrl: imageUrls[0], whatsappNumber: "923001234567", phone: "+92 300 1234567", email: "hello@naqsh.studio", address: "Lahore, Pakistan", hours: "Mon–Sat, 11am–7pm" }, create: { id: "default", brandName: "NAQSH", tagline: "Where Ideas Take Form.", heroTitle: "Where ideas take form.", heroText: "Custom printed pieces, made with care.", heroImageUrl: imageUrls[0], whatsappNumber: "923001234567", phone: "+92 300 1234567", email: "hello@naqsh.studio", address: "Lahore, Pakistan", hours: "Mon–Sat, 11am–7pm" } });
  await db.brandSetting.upsert({ where: { id: "default" }, update: { siteName: "NAQSH", tagline: "Where Ideas Take Form." }, create: { id: "default", siteName: "NAQSH", tagline: "Where Ideas Take Form." } });
  await db.whatsAppSetting.upsert({ where: { id: "default" }, update: { phone: "923001234567", defaultMessage: "Hello NAQSH, I would like to know more.", productMessage: "Hello NAQSH, I am interested in {product}.\nSize: {size}\nColour: {color}\nPrint position: {position}", customMessage: "Hello NAQSH, I submitted inquiry {reference}." }, create: { id: "default", phone: "923001234567", defaultMessage: "Hello NAQSH, I would like to know more.", productMessage: "Hello NAQSH, I am interested in {product}.\nSize: {size}\nColour: {color}\nPrint position: {position}", customMessage: "Hello NAQSH, I submitted inquiry {reference}." } });
  await db.contactSetting.upsert({ where: { id: "default" }, update: { phone: "+92 300 1234567", email: "hello@naqsh.studio", address: "Lahore, Pakistan", hours: "Mon–Sat, 11am–7pm", instagram: "https://instagram.com/naqsh.studio" }, create: { id: "default", phone: "+92 300 1234567", email: "hello@naqsh.studio", address: "Lahore, Pakistan", hours: "Mon–Sat, 11am–7pm", instagram: "https://instagram.com/naqsh.studio" } });
  await db.seoSetting.upsert({ where: { page: "global" }, update: { title: "NAQSH | Where Ideas Take Form", description: "Custom DTF printing, apparel and considered merchandise by NAQSH." }, create: { page: "global", title: "NAQSH | Where Ideas Take Form", description: "Custom DTF printing, apparel and considered merchandise by NAQSH." } });

  const categoryData = [
    ["T-Shirts", "Everyday tees made personal."], ["Hoodies", "Warm layers for your story."], ["Tote Bags", "Carry an idea with you."], ["Gifts", "Small runs for memorable moments."],
  ] as const;
  const categories = await Promise.all(categoryData.map(([name, description], position) => db.category.upsert({ where: { slug: name.toLowerCase().replace(" ", "-") }, update: { name, description, position, isVisible: true }, create: { name, slug: name.toLowerCase().replace(" ", "-"), description, position, isVisible: true } })));

  const media = await Promise.all(imageUrls.map((url, index) => db.media.upsert({ where: { publicId: `seed/naqsh-${index + 1}` }, update: { url, alt: `NAQSH sample product ${index + 1}`, folder: "seed" }, create: { publicId: `seed/naqsh-${index + 1}`, url, alt: `NAQSH sample product ${index + 1}`, folder: "seed" } })));
  const products = await Promise.all([
    ["Studio Logo Tee", "studio-logo-tee", "A heavyweight cotton tee with a clean NAQSH chest mark.", 3200, 0, true],
    ["Linework Oversized Tee", "linework-oversized-tee", "Relaxed fit tee for bold artwork and thoughtful lines.", 3600, 0, true],
    ["Form & Feeling Hoodie", "form-feeling-hoodie", "A soft brushed hoodie ready for front, back or sleeve print.", 6200, 1, true],
    ["Everyday Canvas Tote", "everyday-canvas-tote", "A durable canvas tote for illustration, type and gifting.", 1900, 2, false],
    ["Custom Couple Set", "custom-couple-set", "Two matching tees made for a shared idea.", 6800, 3, true],
  ].map(async ([name, slug, description, price, categoryIndex, isFeatured], index) => db.product.upsert({
    where: { slug: String(slug) },
    update: { name: String(name), description: String(description), price: Number(price), categoryId: categories[Number(categoryIndex)].id, isFeatured: Boolean(isFeatured), isActive: true, archivedAt: null, images: { deleteMany: {}, create: [{ mediaId: media[index].id, position: 0 }] }, variants: { deleteMany: {}, create: { sizes: ["S", "M", "L", "XL"], colors: ["Black", "Paper", "Sage"], printPositions: ["Front", "Back", "Sleeve"] } } },
    create: { name: String(name), slug: String(slug), description: String(description), price: Number(price), categoryId: categories[Number(categoryIndex)].id, isFeatured: Boolean(isFeatured), isCustomizable: true, images: { create: [{ mediaId: media[index].id, position: 0 }] }, variants: { create: { sizes: ["S", "M", "L", "XL"], colors: ["Black", "Paper", "Sage"], printPositions: ["Front", "Back", "Sleeve"] } } },
  })));

  const expandedCategories = await Promise.all(demoCategories.map((category, position) => db.category.upsert({ where: { slug: category.slug }, update: { name: category.name, description: category.description, position, isVisible: true }, create: { name: category.name, slug: category.slug, description: category.description, position, isVisible: true } })));
  const categoryBySlug = new Map(expandedCategories.map((category) => [category.slug, category]));
  const expandedProducts = [] as Awaited<ReturnType<typeof db.product.upsert>>[];
  for (const product of demoProducts) {
    const category = categoryBySlug.get(product.category)!;
    const mediaItem = await db.media.upsert({ where: { publicId: `seed/catalog-${product.slug}` }, update: { url: product.image, alt: product.name, folder: "seed/catalog" }, create: { publicId: `seed/catalog-${product.slug}`, url: product.image, alt: product.name, folder: "seed/catalog" } });
    expandedProducts.push(await db.product.upsert({ where: { slug: product.slug }, update: { name: product.name, description: product.fullDescription, price: product.price, categoryId: category.id, isFeatured: product.isFeatured, isActive: true, archivedAt: null, images: { deleteMany: {}, create: [{ mediaId: mediaItem.id, position: 0 }] }, variants: { deleteMany: {}, create: { sizes: product.sizes, colors: product.colors, printPositions: ["Front", "Back", "Front & back"] } } }, create: { name: product.name, slug: product.slug, description: product.fullDescription, price: product.price, categoryId: category.id, isFeatured: product.isFeatured, isCustomizable: product.customizable, images: { create: [{ mediaId: mediaItem.id, position: 0 }] }, variants: { create: { sizes: product.sizes, colors: product.colors, printPositions: ["Front", "Back", "Front & back"] } } } }));
  }

  for (const [position, name, slug, description, productIndexes] of [[0, "Culture", "culture", "Graphic pieces for everyday expression.", [0, 1]], [1, "Minimal", "minimal", "Quiet details and restrained forms.", [0, 3]], [2, "Couples", "couples", "Made to be worn together.", [4]]] as const) {
    await db.collection.upsert({ where: { slug }, update: { name, description, position, isVisible: true, products: { deleteMany: {}, create: productIndexes.map((index) => ({ productId: products[index].id })) } }, create: { name, slug, description, position, isVisible: true, products: { create: productIndexes.map((index) => ({ productId: products[index].id })) } } });
  }
  for (const category of demoCategories.slice(0, 9)) {
    const collectionProducts = expandedProducts.filter((product) => product.categoryId === categoryBySlug.get(category.slug)?.id);
    await db.collection.upsert({ where: { slug: category.slug }, update: { name: category.name, description: category.description, isVisible: true, products: { deleteMany: {}, create: collectionProducts.map((product) => ({ productId: product.id })) } }, create: { name: category.name, slug: category.slug, description: category.description, isVisible: true, products: { create: collectionProducts.map((product) => ({ productId: product.id })) } } });
  }

  await db.websiteSection.deleteMany({ where: { page: { in: ["home", "about"] } } });
  await db.websiteSection.createMany({ data: [
    { page: "home", type: "hero", position: 0, content: { eyebrow: "NAQSH / Custom print studio", title: "Where ideas take form.", text: "Custom printed pieces made for the things you want to wear, share and remember.", imageUrl: imageUrls[0], primaryCta: "/shop", secondaryCta: "/custom-design" } },
    { page: "home", type: "featured-products", position: 1, content: { title: "Featured pieces", text: "Fresh from the studio", productSlugs: products.filter((product) => product.isFeatured).map((product) => product.slug) } },
    { page: "about", type: "content", position: 0, content: { title: "A thoughtful home for the ideas you want to make real.", body: "NAQSH is a custom merchandise and DTF printing studio. From one-off gifts to team runs, we keep the process human: you send the thought, we discuss the details, and we make it with care." } },
  ] });
  await db.inquiry.upsert({ where: { reference: "NQSH-DEMO-001" }, update: { status: "NEW", customerName: "Ayesha Khan", whatsapp: "923009876543", productType: "Custom oversized T-shirt", quantity: 12, size: "M–XL", color: "Sage", printPosition: "Back", designDescription: "A two-colour linework graphic for a university society.", additionalNotes: "Need delivery in Lahore before the end of the month." }, create: { reference: "NQSH-DEMO-001", type: "CUSTOM", status: "NEW", customerName: "Ayesha Khan", whatsapp: "923009876543", productType: "Custom oversized T-shirt", quantity: 12, size: "M–XL", color: "Sage", printPosition: "Back", designDescription: "A two-colour linework graphic for a university society.", additionalNotes: "Need delivery in Lahore before the end of the month." } });
  console.log(`Seeded ${expandedCategories.length} catalogue categories, ${expandedProducts.length} products, settings, sections and an inquiry.`);
}

main().catch((error) => { console.error(error); process.exitCode = 1; }).finally(() => db.$disconnect());
