export const demoCategories = [
  { name: "Everyday Tees", slug: "everyday-tees", description: "Easy cotton tees for everyday ideas.", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80", group: "Wear" },
  { name: "Oversized Tees", slug: "oversized-tees", description: "Relaxed fits with room for expression.", image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=900&q=80", group: "Wear" },
  { name: "Hoodies", slug: "hoodies", description: "Warm layers, printed your way.", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=80", group: "Wear" },
  { name: "Sweatshirts", slug: "sweatshirts", description: "Everyday crews with a personal touch.", image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=900&q=80", group: "Wear" },
  { name: "Tote Bags", slug: "tote-bags", description: "Canvas companions for work and weekends.", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80", group: "Carry" },
  { name: "Mugs", slug: "mugs", description: "Small rituals, made more personal.", image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=900&q=80", group: "Gifts & Objects" },
  { name: "Posters & Prints", slug: "posters-prints", description: "Artwork for walls, desks and gifting.", image: "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=900&q=80", group: "Gifts & Objects" },
  { name: "Caps", slug: "caps", description: "A simple finishing detail.", image: "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=900&q=80", group: "Gifts & Objects" },
  { name: "Stickers", slug: "stickers", description: "Small-format colour and character.", image: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&w=900&q=80", group: "Gifts & Objects" },
  { name: "Custom Orders", slug: "custom-orders", description: "Bring a reference, a sketch or a feeling.", image: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=900&q=80", group: "Custom" },
] as const;

const catalog = [
  ["everyday-tees", ["Canvas Pocket Tee", "Essential White Tee", "Studio Black Tee", "Line Print Tee", "Minimal Type Tee"], 1650],
  ["oversized-tees", ["Form Oversized Tee", "Signal Oversized Tee", "Outline Oversized Tee", "Mono Graphic Tee", "Raw Type Oversized Tee"], 2250],
  ["hoodies", ["Studio Heavy Hoodie", "Form Hoodie", "Naqsh Essential Hoodie", "Graphic Pullover", "After Hours Hoodie"], 3450],
  ["sweatshirts", ["Core Sweatshirt", "Linework Sweatshirt", "Studio Crew", "Field Notes Crew"], 2750],
  ["tote-bags", ["Linework Tote", "Canvas Daily Tote", "Graphic Tote", "Market Tote", "Studio Carryall"], 950],
  ["mugs", ["Studio Mug", "Type Mug", "Monogram Mug", "Linework Mug"], 750],
  ["posters-prints", ["Abstract Line Print", "Type Study Print", "Form Poster", "Custom Art Print"], 700],
  ["caps", ["Naqsh Cap", "Studio Cap", "Minimal Logo Cap", "Sunday Cap"], 1050],
  ["stickers", ["Naqsh Sticker Set", "Linework Sticker Pack", "Graphic Sticker Sheet", "Tiny Forms Set"], 250],
] as const;

export const demoProducts = catalog.flatMap(([category, names, base], categoryIndex) => names.map((name, index) => {
  const categoryInfo = demoCategories.find((item) => item.slug === category)!;
  const price = base + index * (category === "stickers" ? 75 : category === "mugs" ? 100 : 150);
  return { id: `demo-${category}-${index + 1}`, name, slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""), description: `${categoryInfo.description} A considered NAQSH piece, ready for your artwork, words or idea.`, fullDescription: `${name} is made as a flexible starting point for your idea. Choose a colour, placement and finish, then speak to NAQSH on WhatsApp to make it personal.`, price, category, categoryLabel: categoryInfo.name, image: categoryInfo.image, isFeatured: categoryIndex < 5 && index < 2, isNew: index === names.length - 1, colors: ["Ink", "Warm White", "Sage"], sizes: ["S", "M", "L", "XL"], customizable: true, tags: [categoryInfo.group, "Custom print"] };
}));

export const featuredDemoProducts = demoProducts.filter((product) => product.isFeatured).slice(0, 8);
export const newDemoProducts = demoProducts.filter((product) => product.isNew).slice(0, 6);








