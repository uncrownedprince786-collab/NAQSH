import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const db = new PrismaClient();
const images = [
  "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=1200&q=85",
];
const groups = [
  ["Men", "men", ["Everyday Tees", "Oversized Tees", "Hoodies", "Sweatshirts", "Gym Wear", "Caps"]],
  ["Women", "women", ["Everyday Tees", "Oversized Tees", "Hoodies", "Sweatshirts", "Gym Wear"]],
  ["Kids", "kids", ["Kids Tees", "Oversized Tees", "Hoodies", "Sweatshirts"]],
  ["Gym Wear", "gym-wear", ["Gym Tees", "Oversized Gym Tees", "Performance Tees", "Training Tops", "Gym Hoodies"]],
  ["Bags & Accessories", "bags-accessories", ["Tote Bags", "Caps", "Stickers"]],
  ["Home & Gifts", "home-gifts", ["Mugs", "Posters & Prints", "Custom Gifts"]],
  ["Custom", "custom", ["Custom Orders", "Bulk & Events"]],
] as const;
const productRows = [
  ["Studio Essential Tee", "men-everyday-tees", 2450, "Typography", true], ["Darwaish Line Tee", "men-everyday-tees", 2650, "Darwaish", false], ["Heavy Oversized Tee", "men-oversized-tees", 3200, "Streetwear", true], ["Abstract Form Oversized Tee", "men-oversized-tees", 3350, "Abstract", false], ["Sialkot Night Hoodie", "men-hoodies", 5450, "Pakistani Culture", true], ["Core Crew Sweatshirt", "men-sweatshirts", 4250, "Minimal", false], ["Train Hard Tee", "men-gym-wear", 2750, "Gym Wear", false], ["NAQSH Studio Cap", "men-caps", 1650, "Streetwear", false],
  ["Everyday Script Tee", "women-everyday-tees", 2450, "Typography", true], ["Soft Form Oversized Tee", "women-oversized-tees", 3200, "Minimal", false], ["After Hours Hoodie", "women-hoodies", 5450, "Streetwear", false], ["Linework Crew", "women-sweatshirts", 4250, "Abstract", false], ["Move With Ease Tee", "women-gym-wear", 2750, "Gym Wear", true],
  ["Little Artist Tee", "kids-kids-tees", 1650, "Funny & Casual", true], ["Mini Oversized Tee", "kids-oversized-tees", 1850, "Anime", false], ["Junior Club Hoodie", "kids-hoodies", 3450, "Superheroes", false], ["Kids Studio Sweatshirt", "kids-sweatshirts", 2850, "Custom Design", false],
  ["Performance Training Tee", "gym-wear-gym-tees", 2850, "Gym Wear", true], ["Heavy Oversized Gym Tee", "gym-wear-oversized-gym-tees", 3400, "Streetwear", true], ["Discipline Tee", "gym-wear-performance-tees", 2950, "Typography", false], ["Performance Oversized Tee", "gym-wear-performance-tees", 3450, "Gym Wear", false], ["Strength Club Training Top", "gym-wear-training-tops", 3150, "Strength Club", false], ["Gym Hoodie", "gym-wear-gym-hoodies", 5650, "Gym Wear", true], ["No Excuses Tee", "gym-wear-gym-tees", 2750, "Typography", false], ["Strength Club Tee", "gym-wear-oversized-gym-tees", 3300, "Streetwear", false],
  ["Canvas Daily Tote", "bags-accessories-tote-bags", 1550, "Minimal", true], ["Graphic Market Tote", "bags-accessories-tote-bags", 1750, "Abstract", false], ["Studio Dad Cap", "bags-accessories-caps", 1650, "Streetwear", false], ["NAQSH Sticker Pack", "bags-accessories-stickers", 450, "Funny & Casual", true],
  ["Studio Mug", "home-gifts-mugs", 1250, "Typography", true], ["Darwaish Mug", "home-gifts-mugs", 1350, "Darwaish", false], ["Pakistani Culture Poster", "home-gifts-posters-prints", 1150, "Pakistani Culture", false], ["Abstract Line Print", "home-gifts-posters-prints", 950, "Abstract", false], ["Custom Gift Box", "home-gifts-custom-gifts", 3500, "Custom Design", true],
  ["Custom Printed Tee", "custom-custom-orders", 2900, "Custom Design", true], ["Bulk Event Merchandise", "custom-bulk-events", 0, "Custom Design", false],
] as const;
const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

async function main() {
  const email = process.env.ADMIN_EMAIL, password = process.env.ADMIN_PASSWORD;
  if (!email || !password) throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD are required.");
  await db.admin.upsert({ where: { email }, update: { name: "NAQSH Admin" }, create: { email, passwordHash: await bcrypt.hash(password, 12), name: "NAQSH Admin" } });
  const settings = { brandName: "NAQSH", tagline: "Where Ideas Take Form.", heroTitle: "Where ideas take form.", heroText: "Custom printed pieces made in Sialkot for the things you want to wear, share and remember.", heroImageUrl: images[0], whatsappNumber: "923001234567", phone: "+92 300 1234567", email: "hello@naqsh.studio", address: "Sialkot, Pakistan", hours: "Mon–Sat, 11am–7pm" };
  await db.siteSettings.upsert({ where: { id: "default" }, update: settings, create: { id: "default", ...settings } });
  await db.contactSetting.upsert({ where: { id: "default" }, update: { phone: settings.phone, email: settings.email, address: settings.address, hours: settings.hours, instagram: "https://instagram.com/naqsh.studio" }, create: { id: "default", phone: settings.phone, email: settings.email, address: settings.address, hours: settings.hours, instagram: "https://instagram.com/naqsh.studio" } });
  const media = await Promise.all(images.map((url, i) => db.media.upsert({ where: { publicId: `seed/catalog-${i}` }, update: { url }, create: { publicId: `seed/catalog-${i}`, url, alt: "NAQSH catalogue sample", folder: "seed/catalog" } })));
  const categoryBySlug = new Map<string, { id: string }>();
  for (const [position, [name, slug, children]] of groups.entries()) { const parent = await db.category.upsert({ where: { slug }, update: { name, description: `Explore NAQSH ${name.toLowerCase()} pieces.`, parentId: null, position, isVisible: true, imageId: media[position % media.length].id }, create: { name, slug, description: `Explore NAQSH ${name.toLowerCase()} pieces.`, position, isVisible: true, imageId: media[position % media.length].id } }); categoryBySlug.set(slug, parent); for (const [childPosition, child] of children.entries()) { const childSlug = `${slug}-${slugify(child)}`; const category = await db.category.upsert({ where: { slug: childSlug }, update: { name: child, parentId: parent.id, position: childPosition, isVisible: true }, create: { name: child, slug: childSlug, description: `${child} made for your ideas.`, parentId: parent.id, position: childPosition, isVisible: true, imageId: media[(position + childPosition) % media.length].id } }); categoryBySlug.set(childSlug, category); } }
  const collectionNames = ["Anime", "Superheroes", "Darwaish", "Typography", "Minimal", "Pakistani Culture", "Abstract", "Streetwear", "Funny & Casual", "Custom Design", "Gym Wear", "Strength Club"];
  const collections = new Map<string, string>(); for (const [position, name] of collectionNames.entries()) { const item = await db.collection.upsert({ where: { slug: slugify(name) }, update: { name, isVisible: true, position }, create: { name, slug: slugify(name), description: `${name} design collection.`, isVisible: true, position } }); collections.set(name, item.id); }
  for (const [index, [name, categorySlug, price, tag, featured]] of productRows.entries()) {
    const category = categoryBySlug.get(categorySlug); if (!category) throw new Error(`Missing category ${categorySlug}`);
    const slug = slugify(name), imageSet = [media[index % media.length], media[(index + 1) % media.length]], sizes = categorySlug.includes("kids") ? ["2–3Y", "4–5Y", "6–7Y", "8–9Y"] : ["S", "M", "L", "XL"], collectionId = collections.get(tag);
    const data = { name, description: `${name} is a considered NAQSH piece, ready for your artwork, words or idea.`, fullDescription: "Made for everyday wear and custom DTF or sublimation printing. Choose your colour, size and placement, then speak with NAQSH in Sialkot to make it personal.", price, categoryId: category.id, isFeatured: featured, isNew: index % 4 === 0, tags: [tag, "Custom print"], isCustomizable: true, isActive: true, archivedAt: null, images: { deleteMany: {}, create: imageSet.map((item, position) => ({ mediaId: item.id, position, alt: `${name} ${position ? "detail" : "front"}` })) }, variants: { deleteMany: {}, create: { sizes, colors: ["Black", "White", "Sage", "Navy"], printPositions: ["Front", "Back", "Sleeve"] } }, collections: { deleteMany: {}, create: collectionId ? [{ collectionId }] : [] } };
    await db.product.upsert({ where: { slug }, update: data, create: { ...data, slug, images: { create: imageSet.map((item, position) => ({ mediaId: item.id, position, alt: `${name} ${position ? "detail" : "front"}` })) }, variants: { create: { sizes, colors: ["Black", "White", "Sage", "Navy"], printPositions: ["Front", "Back", "Sleeve"] } }, collections: { create: collectionId ? [{ collectionId }] : [] } } });
  }
  await db.websiteSection.deleteMany({ where: { page: { in: ["home", "about"] } } }); await db.websiteSection.createMany({ data: [{ page: "home", type: "hero", position: 0, content: { eyebrow: "NAQSH / Sialkot print studio", title: settings.heroTitle, text: settings.heroText, imageUrl: images[0], primaryCta: "/shop", secondaryCta: "/custom-design" } }, { page: "home", type: "featured-products", position: 1, content: { title: "Featured pieces", productSlugs: productRows.filter((x) => x[4]).map((x) => slugify(x[0])) } }, { page: "about", type: "content", position: 0, content: { title: "A thoughtful home for the ideas you want to make real.", body: "NAQSH is a Sialkot custom merchandise and DTF printing studio." } }] });
  console.log(`Seeded ${groups.length} main categories, ${productRows.length} products and design collections.`);
}
main().catch((error) => { console.error(error); process.exitCode = 1; }).finally(() => db.$disconnect());
