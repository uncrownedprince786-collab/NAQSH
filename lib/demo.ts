import { slugify } from "@/lib/utils";

const pool = {
  tees: [
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=1200&q=85",
  ],
  hoodies: [
    "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=85",
  ],
  sweatshirts: [
    "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1200&q=85",
  ],
  gym: [
    "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=85",
  ],
  bags: [
    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=1200&q=85",
  ],
  gifts: [
    "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=1200&q=85",
  ],
  custom: [
    "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=85",
  ],
};

type Seed = { cat: string; sub: string; label: string; price: number; names: string[] };

const seeds: Seed[] = [
  // Men
  { cat: "men", sub: "men-t-shirts", label: "Men's T-Shirts", price: 2350, names: ["Everyday Men's T-Shirt", "Men's Essential T-Shirt", "Men's Graphic T-Shirt"] },
  { cat: "men", sub: "men-oversized-t-shirts", label: "Men's Oversized T-Shirts", price: 2850, names: ["Men's Oversized T-Shirt", "Men's Street Oversized T-Shirt"] },
  { cat: "men", sub: "men-hoodies", label: "Men's Hoodies", price: 4350, names: ["Men's Hoodie", "Men's Essential Hoodie"] },
  { cat: "men", sub: "men-sweatshirts", label: "Men's Sweatshirts", price: 3350, names: ["Men's Sweatshirt", "Men's Crew Sweatshirt"] },
  { cat: "men", sub: "men-gym-wear", label: "Men's Gym Wear", price: 2750, names: ["Men's Gym T-Shirt", "Men's Training T-Shirt", "Men's Gym Hoodie"] },
  { cat: "men", sub: "men-custom-clothing", label: "Men's Custom Clothing", price: 3200, names: ["Men's Custom Clothing", "Custom Men's Set"] },
  // Women
  { cat: "women", sub: "women-t-shirts", label: "Women's T-Shirts", price: 2350, names: ["Women's T-Shirt", "Women's Graphic T-Shirt"] },
  { cat: "women", sub: "women-oversized-t-shirts", label: "Women's Oversized T-Shirts", price: 2850, names: ["Women's Oversized T-Shirt", "Women's Street T-Shirt"] },
  { cat: "women", sub: "women-hoodies", label: "Women's Hoodies", price: 4350, names: ["Women's Hoodie", "Women's Essential Hoodie"] },
  { cat: "women", sub: "women-sweatshirts", label: "Women's Sweatshirts", price: 3350, names: ["Women's Sweatshirt", "Women's Crew Sweatshirt"] },
  { cat: "women", sub: "women-gym-wear", label: "Women's Gym Wear", price: 2850, names: ["Women's Gym Wear", "Women's Training Top", "Women's Gym Hoodie"] },
  { cat: "women", sub: "women-custom-clothing", label: "Women's Custom Clothing", price: 3200, names: ["Women's Custom Clothing"] },
  // Kids
  { cat: "kids", sub: "kids-t-shirts", label: "Kids T-Shirts", price: 1650, names: ["Kids Graphic T-Shirt", "Kids Essential T-Shirt"] },
  { cat: "kids", sub: "kids-oversized-t-shirts", label: "Kids Oversized T-Shirts", price: 1950, names: ["Kids Oversized T-Shirt", "Kids Street T-Shirt"] },
  { cat: "kids", sub: "kids-hoodies", label: "Kids Hoodies", price: 3250, names: ["Kids Hoodie", "Kids Club Hoodie"] },
  { cat: "kids", sub: "kids-sweatshirts", label: "Kids Sweatshirts", price: 2650, names: ["Kids Sweatshirt", "Kids Studio Sweatshirt"] },
  { cat: "kids", sub: "kids-custom-clothing", label: "Kids Custom Clothing", price: 2150, names: ["Kids Custom Clothing"] },
  // T-Shirts
  { cat: "t-shirts", sub: "everyday-t-shirts", label: "Everyday T-Shirts", price: 2100, names: ["Everyday Graphic T-Shirt", "Essential White T-Shirt", "Weekend Pocket T-Shirt"] },
  { cat: "t-shirts", sub: "oversized-t-shirts", label: "Oversized T-Shirts", price: 2450, names: ["Oversized Graphic T-Shirt", "Raw Hem Oversized T-Shirt", "Street Oversized T-Shirt"] },
  { cat: "t-shirts", sub: "graphic-t-shirts", label: "Graphic T-Shirts", price: 2250, names: ["Graphic T-Shirt", "Line Art T-Shirt", "Bold Print T-Shirt"] },
  { cat: "t-shirts", sub: "anime-t-shirts", label: "Anime T-Shirts", price: 2450, names: ["Anime Graphic T-Shirt", "Anime Line T-Shirt", "Manga Type T-Shirt"] },
  { cat: "t-shirts", sub: "superhero-t-shirts", label: "Superhero T-Shirts", price: 2450, names: ["Superhero Graphic T-Shirt", "Comic Hero T-Shirt", "Hero Print T-Shirt"] },
  { cat: "t-shirts", sub: "pakistani-culture-t-shirts", label: "Pakistani Culture T-Shirts", price: 2550, names: ["Pakistani Culture T-Shirt", "Sialkot City T-Shirt", "Heritage Print T-Shirt"] },
  { cat: "t-shirts", sub: "typography-t-shirts", label: "Typography T-Shirts", price: 2250, names: ["Typography T-Shirt", "Type Statement T-Shirt", "Wordmark T-Shirt"] },
  { cat: "t-shirts", sub: "darwaish-t-shirts", label: "Darwaish Designs", price: 2650, names: ["Darwaish T-Shirt", "Darwaish Line T-Shirt", "Darwaish Graphic T-Shirt"] },
  { cat: "t-shirts", sub: "minimal-t-shirts", label: "Minimal Designs", price: 2150, names: ["Minimal Type T-Shirt", "Minimal Logo T-Shirt", "Mono Minimal T-Shirt"] },
  { cat: "t-shirts", sub: "custom-printed-t-shirts", label: "Custom Printed T-Shirts", price: 2900, names: ["Custom Printed T-Shirt", "Your Design T-Shirt", "Personalised T-Shirt"] },
  // Hoodies
  { cat: "hoodies", sub: "everyday-hoodies", label: "Everyday Hoodies", price: 4350, names: ["NAQSH Essential Hoodie", "Essential Pullover Hoodie", "Weekend Hoodie"] },
  { cat: "hoodies", sub: "graphic-hoodies", label: "Graphic Hoodies", price: 4650, names: ["Graphic Pullover Hoodie", "Abstract Print Hoodie", "Bold Graphic Hoodie"] },
  { cat: "hoodies", sub: "anime-hoodies", label: "Anime Hoodies", price: 4950, names: ["Anime Hoodie", "Anime Graphic Hoodie", "Manga Hoodie"] },
  { cat: "hoodies", sub: "superhero-hoodies", label: "Superhero Hoodies", price: 4950, names: ["Superhero Hoodie", "Comic Hero Hoodie"] },
  { cat: "hoodies", sub: "streetwear-hoodies", label: "Streetwear Hoodies", price: 4850, names: ["Streetwear Hoodie", "Oversized Street Hoodie", "Varsity Hoodie"] },
  { cat: "hoodies", sub: "pakistani-culture-hoodies", label: "Pakistani Culture Hoodies", price: 5450, names: ["Pakistani Culture Hoodie", "Sialkot Night Hoodie", "Heritage Hoodie"] },
  { cat: "hoodies", sub: "darwaish-hoodies", label: "Darwaish Designs", price: 5450, names: ["Darwaish Hoodie", "Darwaish Line Hoodie"] },
  { cat: "hoodies", sub: "minimal-hoodies", label: "Minimal Hoodies", price: 4350, names: ["Minimal Hoodie", "Essential Mono Hoodie"] },
  { cat: "hoodies", sub: "custom-printed-hoodies", label: "Custom Printed Hoodies", price: 5150, names: ["Custom Printed Hoodie", "Your Design Hoodie"] },
  // Sweatshirts
  { cat: "sweatshirts", sub: "everyday-sweatshirts", label: "Everyday Sweatshirts", price: 3350, names: ["Everyday Sweatshirt", "Core Sweatshirt", "Studio Sweatshirt"] },
  { cat: "sweatshirts", sub: "graphic-sweatshirts", label: "Graphic Sweatshirts", price: 3550, names: ["Graphic Sweatshirt", "Print Crew Sweatshirt"] },
  { cat: "sweatshirts", sub: "minimal-sweatshirts", label: "Minimal Sweatshirts", price: 3250, names: ["Minimal Sweatshirt", "Mono Crew"] },
  { cat: "sweatshirts", sub: "typography-sweatshirts", label: "Typography Sweatshirts", price: 3350, names: ["Typography Sweatshirt", "Type Crew"] },
  { cat: "sweatshirts", sub: "pakistani-culture-sweatshirts", label: "Pakistani Culture Sweatshirts", price: 3650, names: ["Pakistani Culture Sweatshirt", "Heritage Crew"] },
  { cat: "sweatshirts", sub: "custom-sweatshirts", label: "Custom Sweatshirts", price: 3750, names: ["Custom Sweatshirt", "Your Design Sweatshirt"] },
  // Gym Wear
  { cat: "gym-wear", sub: "gym-t-shirts", label: "Gym T-Shirts", price: 2750, names: ["Strength Club T-Shirt", "Gym T-Shirt", "Performance T-Shirt"] },
  { cat: "gym-wear", sub: "training-t-shirts", label: "Training T-Shirts", price: 2850, names: ["Training T-Shirt", "Training Tee", "Session T-Shirt"] },
  { cat: "gym-wear", sub: "gym-hoodies", label: "Gym Hoodies", price: 5150, names: ["Gym Hoodie", "Training Hoodie"] },
  { cat: "gym-wear", sub: "training-tops", label: "Training Tops", price: 2950, names: ["Performance Top", "Training Top", "Racerback Top"] },
  { cat: "gym-wear", sub: "mens-gym-wear", label: "Men's Gym Wear", price: 2750, names: ["Men's Gym T-Shirt", "Men's Training T-Shirt"] },
  { cat: "gym-wear", sub: "womens-gym-wear", label: "Women's Gym Wear", price: 2850, names: ["Women's Training Top", "Women's Gym T-Shirt"] },
  { cat: "gym-wear", sub: "custom-gym-wear", label: "Custom Gym Wear", price: 3150, names: ["Custom Gym Wear", "Your Design Gym Tee"] },
  // Bags & Accessories
  { cat: "bags-accessories", sub: "tote-bags", label: "Tote Bags", price: 1250, names: ["Tote Bag", "Canvas Tote Bag", "Graphic Tote Bag"] },
  { cat: "bags-accessories", sub: "caps", label: "Caps", price: 1450, names: ["Embroidered Cap", "Studio Cap", "Structured Cap"] },
  { cat: "bags-accessories", sub: "stickers", label: "Stickers", price: 350, names: ["Custom Sticker Pack", "Sticker Sheet", "Logo Stickers"] },
  { cat: "bags-accessories", sub: "mugs", label: "Mugs", price: 950, names: ["Custom Mug", "Personalised Mug"] },
  { cat: "bags-accessories", sub: "custom-accessories", label: "Custom Accessories", price: 1250, names: ["Custom Accessories", "Your Logo Accessories"] },
  // Home & Gifts
  { cat: "home-gifts", sub: "posters-prints", label: "Posters & Prints", price: 950, names: ["Poster & Print", "Art Print", "Custom Art Print"] },
  { cat: "home-gifts", sub: "mugs", label: "Mugs", price: 950, names: ["Personalised Mug", "Custom Photo Mug", "Gift Mug"] },
  { cat: "home-gifts", sub: "gift-boxes", label: "Gift Boxes", price: 2650, names: ["Gift Box", "Custom Gift Box"] },
  { cat: "home-gifts", sub: "custom-gifts", label: "Custom Gifts", price: 2450, names: ["Custom Gift", "Personalised Gift Set"] },
  { cat: "home-gifts", sub: "pakistani-culture-gifts", label: "Pakistani Culture Gifts", price: 1750, names: ["Pakistani Culture Gift", "Heritage Gift"] },
  { cat: "home-gifts", sub: "personalized-gifts", label: "Personalized Gifts", price: 2050, names: ["Personalized Gift", "Monogram Gift"] },
  // Custom
  { cat: "custom", sub: "custom-t-shirts", label: "Custom T-Shirts", price: 2900, names: ["Made to Order T-Shirt", "Custom Crew T-Shirt"] },
  { cat: "custom", sub: "custom-hoodies", label: "Custom Hoodies", price: 5150, names: ["Made to Order Hoodie", "Custom Pullover Hoodie"] },
  { cat: "custom", sub: "custom-gym-wear", label: "Custom Gym Wear", price: 3150, names: ["Team Gym Wear", "Custom Training Kit"] },
  { cat: "custom", sub: "custom-gifts", label: "Custom Gifts", price: 2450, names: ["Custom Gift", "Personalised Gift Box"] },
  { cat: "custom", sub: "custom-couple-products", label: "Custom Couple Products", price: 4900, names: ["Custom Couple T-Shirts", "Couple Hoodies Set"] },
  { cat: "custom", sub: "bulk-event-merchandise", label: "Bulk & Event Merchandise", price: 1650, names: ["Bulk Event T-Shirts", "Team Merchandise", "Event Hoodies"] },
  { cat: "custom", sub: "custom-orders", label: "Custom Orders", price: 2900, names: ["Custom Printed Piece", "Made to Order Item"] },
];

const catToPool: Record<string, (typeof pool)[keyof typeof pool]> = {
  men: pool.tees,
  women: pool.tees,
  kids: pool.tees,
  "t-shirts": pool.tees,
  hoodies: pool.hoodies,
  sweatshirts: pool.sweatshirts,
  "gym-wear": pool.gym,
  "bags-accessories": pool.bags,
  "home-gifts": pool.gifts,
  custom: pool.custom,
};

export const demoProducts = seeds.flatMap((seed, seedIndex) =>
  seed.names.map((name, index) => {
    const price = seed.price + index * 150;
    const imageSet = catToPool[seed.cat];
    const image = imageSet[seedIndex % imageSet.length];
    return {
      id: `demo-${seed.cat}-${seed.sub}-${index + 1}`,
      name,
      slug: slugify(name),
      description: `${name} — ${seed.label} made for your artwork, text or idea. A NAQSH custom printed piece, printed to order in Sialkot, Pakistan.`,
      fullDescription: `${name} is a flexible starting point for your idea. Choose a colour, size and print placement, then message NAQSH on WhatsApp to make it personal. Made with DTF and sublimation printing where the product calls for it.`,
      price,
      category: seed.cat,
      categoryLabel: seed.label,
      subcategory: seed.sub,
      image,
      images: [image],
      isFeatured: seedIndex % 4 === 0,
      isNew: index === 0 && seedIndex % 3 === 0,
      colors: ["Black", "Warm White", "Sage"],
      sizes: ["S", "M", "L", "XL"],
      customizable: true,
      tags: [seed.label, "Custom print"],
    };
  })
);

export const featuredDemoProducts = demoProducts.filter((product) => product.isFeatured).slice(0, 8);
export const newDemoProducts = demoProducts.filter((product) => product.isNew).slice(0, 6);
