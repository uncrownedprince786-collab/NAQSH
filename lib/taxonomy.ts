export type SubcategoryDef = {
  name: string;
  slug: string;
  dbSlugs?: string[];
  tags?: string[];
};

export type CategoryDef = {
  name: string;
  slug: string;
  description: string;
  image: string;
  seoTitle?: string;
  seoDescription?: string;
  subcategories: SubcategoryDef[];
};

const img = {
  men: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=85",
  women: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=1200&q=85",
  kids: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1200&q=85",
  tees: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=85",
  hoodies: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1200&q=85",
  sweatshirts: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1200&q=85",
  gym: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=1200&q=85",
  bags: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=85",
  gifts: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=1200&q=85",
  custom: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=1200&q=85",
};

const teeDb = ["everyday-tees", "oversized-tees", "men-everyday-tees", "men-oversized-tees", "women-everyday-tees", "women-oversized-tees", "kids-kids-tees", "kids-oversized-tees"];
const hoodieDb = ["hoodies", "men-hoodies", "women-hoodies", "kids-hoodies"];
const sweatDb = ["sweatshirts", "men-sweatshirts", "women-sweatshirts", "kids-sweatshirts"];

export const taxonomy: CategoryDef[] = [
  {
    name: "Men",
    slug: "men",
    description: "Men's custom t-shirts, hoodies, sweatshirts and gym wear, printed to order in Sialkot.",
    image: img.men,
    seoTitle: "Men's Custom T-Shirts & Hoodies | NAQSH",
    seoDescription: "Shop men's custom printed t-shirts, hoodies, sweatshirts and gym wear from NAQSH. Wear your own artwork, text or logo on men's custom apparel.",
    subcategories: [
      { name: "Men's T-Shirts", slug: "men-t-shirts", dbSlugs: ["men-everyday-tees"] },
      { name: "Men's Oversized T-Shirts", slug: "men-oversized-t-shirts", dbSlugs: ["men-oversized-tees"] },
      { name: "Men's Hoodies", slug: "men-hoodies", dbSlugs: ["men-hoodies"] },
      { name: "Men's Sweatshirts", slug: "men-sweatshirts", dbSlugs: ["men-sweatshirts"] },
      { name: "Men's Gym Wear", slug: "men-gym-wear", dbSlugs: ["men-gym-wear"] },
      { name: "Men's Custom Clothing", slug: "men-custom-clothing", tags: ["Custom Design"] },
    ],
  },
  {
    name: "Women",
    slug: "women",
    description: "Women's custom t-shirts, oversized tees, hoodies and gym wear, made to be personalised.",
    image: img.women,
    seoTitle: "Women's Custom T-Shirts & Hoodies | NAQSH",
    seoDescription: "Explore women's custom printed t-shirts, hoodies, sweatshirts and gym wear from NAQSH. Personalise women's custom clothing with your own designs.",
    subcategories: [
      { name: "Women's T-Shirts", slug: "women-t-shirts", dbSlugs: ["women-everyday-tees"] },
      { name: "Women's Oversized T-Shirts", slug: "women-oversized-t-shirts", dbSlugs: ["women-oversized-tees"] },
      { name: "Women's Hoodies", slug: "women-hoodies", dbSlugs: ["women-hoodies"] },
      { name: "Women's Sweatshirts", slug: "women-sweatshirts", dbSlugs: ["women-sweatshirts"] },
      { name: "Women's Gym Wear", slug: "women-gym-wear", dbSlugs: ["women-gym-wear"] },
      { name: "Women's Custom Clothing", slug: "women-custom-clothing", tags: ["Custom Design"] },
    ],
  },
  {
    name: "Kids",
    slug: "kids",
    description: "Kids custom t-shirts, hoodies and sweatshirts, printed with characters, names and ideas.",
    image: img.kids,
    seoTitle: "Kids Custom T-Shirts & Hoodies | NAQSH",
    seoDescription: "Shop kids custom printed t-shirts, hoodies and sweatshirts from NAQSH. Personalised kids clothing made from your child's favourite ideas.",
    subcategories: [
      { name: "Kids T-Shirts", slug: "kids-t-shirts", dbSlugs: ["kids-kids-tees"] },
      { name: "Kids Oversized T-Shirts", slug: "kids-oversized-t-shirts", dbSlugs: ["kids-oversized-tees"] },
      { name: "Kids Hoodies", slug: "kids-hoodies", dbSlugs: ["kids-hoodies"] },
      { name: "Kids Sweatshirts", slug: "kids-sweatshirts", dbSlugs: ["kids-sweatshirts"] },
      { name: "Kids Custom Clothing", slug: "kids-custom-clothing", tags: ["Custom Design"] },
    ],
  },
  {
    name: "T-Shirts",
    slug: "t-shirts",
    description: "Custom printed t-shirts for everyday, oversized and graphic fits. Print your own artwork, text or logo.",
    image: img.tees,
    seoTitle: "Custom Printed T-Shirts | NAQSH",
    seoDescription: "Shop custom printed t-shirts and personalised t-shirts from NAQSH. Everyday, oversized, graphic, anime and typography tees printed to order.",
    subcategories: [
      { name: "Everyday T-Shirts", slug: "everyday-t-shirts", dbSlugs: ["everyday-tees", "men-everyday-tees", "women-everyday-tees", "kids-kids-tees"] },
      { name: "Oversized T-Shirts", slug: "oversized-t-shirts", dbSlugs: ["oversized-tees", "men-oversized-tees", "women-oversized-tees", "kids-oversized-tees"] },
      { name: "Graphic T-Shirts", slug: "graphic-t-shirts", dbSlugs: teeDb, tags: ["Streetwear", "Abstract"] },
      { name: "Anime T-Shirts", slug: "anime-t-shirts", dbSlugs: teeDb, tags: ["Anime"] },
      { name: "Superhero T-Shirts", slug: "superhero-t-shirts", dbSlugs: teeDb, tags: ["Superheroes", "Superhero"] },
      { name: "Pakistani Culture T-Shirts", slug: "pakistani-culture-t-shirts", dbSlugs: teeDb, tags: ["Pakistani Culture"] },
      { name: "Typography T-Shirts", slug: "typography-t-shirts", dbSlugs: teeDb, tags: ["Typography"] },
      { name: "Darwaish Designs", slug: "darwaish-t-shirts", dbSlugs: teeDb, tags: ["Darwaish"] },
      { name: "Minimal Designs", slug: "minimal-t-shirts", dbSlugs: teeDb, tags: ["Minimal"] },
      { name: "Custom Printed T-Shirts", slug: "custom-printed-t-shirts", dbSlugs: teeDb, tags: ["Custom Design"] },
    ],
  },
  {
    name: "Hoodies",
    slug: "hoodies",
    description: "Custom printed hoodies for everyday wear, streetwear and bold graphic prints.",
    image: img.hoodies,
    seoTitle: "Custom Hoodies & Custom Printed Hoodies | NAQSH",
    seoDescription: "Shop custom hoodies and custom printed hoodies from NAQSH. Everyday, anime, superhero and streetwear hoodies made from your ideas.",
    subcategories: [
      { name: "Everyday Hoodies", slug: "everyday-hoodies", dbSlugs: hoodieDb },
      { name: "Graphic Hoodies", slug: "graphic-hoodies", dbSlugs: hoodieDb, tags: ["Streetwear", "Abstract"] },
      { name: "Anime Hoodies", slug: "anime-hoodies", dbSlugs: hoodieDb, tags: ["Anime"] },
      { name: "Superhero Hoodies", slug: "superhero-hoodies", dbSlugs: hoodieDb, tags: ["Superheroes", "Superhero"] },
      { name: "Streetwear Hoodies", slug: "streetwear-hoodies", dbSlugs: hoodieDb, tags: ["Streetwear"] },
      { name: "Pakistani Culture Hoodies", slug: "pakistani-culture-hoodies", dbSlugs: hoodieDb, tags: ["Pakistani Culture"] },
      { name: "Darwaish Designs", slug: "darwaish-hoodies", dbSlugs: hoodieDb, tags: ["Darwaish"] },
      { name: "Minimal Hoodies", slug: "minimal-hoodies", dbSlugs: hoodieDb, tags: ["Minimal"] },
      { name: "Custom Printed Hoodies", slug: "custom-printed-hoodies", dbSlugs: hoodieDb, tags: ["Custom Design"] },
    ],
  },
  {
    name: "Sweatshirts",
    slug: "sweatshirts",
    description: "Custom sweatshirts and crew necks, printed with minimal, graphic and typography designs.",
    image: img.sweatshirts,
    seoTitle: "Custom Sweatshirts | NAQSH",
    seoDescription: "Shop custom sweatshirts and personalised sweatshirts from NAQSH. Everyday crews with minimal, typography and graphic prints.",
    subcategories: [
      { name: "Everyday Sweatshirts", slug: "everyday-sweatshirts", dbSlugs: sweatDb },
      { name: "Graphic Sweatshirts", slug: "graphic-sweatshirts", dbSlugs: sweatDb, tags: ["Streetwear", "Abstract"] },
      { name: "Minimal Sweatshirts", slug: "minimal-sweatshirts", dbSlugs: sweatDb, tags: ["Minimal"] },
      { name: "Typography Sweatshirts", slug: "typography-sweatshirts", dbSlugs: sweatDb, tags: ["Typography"] },
      { name: "Pakistani Culture Sweatshirts", slug: "pakistani-culture-sweatshirts", dbSlugs: sweatDb, tags: ["Pakistani Culture"] },
      { name: "Custom Sweatshirts", slug: "custom-sweatshirts", dbSlugs: sweatDb, tags: ["Custom Design"] },
    ],
  },
  {
    name: "Gym Wear",
    slug: "gym-wear",
    description: "Custom gym wear, training t-shirts, performance tops and gym hoodies for your crew.",
    image: img.gym,
    seoTitle: "Custom Gym Wear & Training T-Shirts | NAQSH",
    seoDescription: "Shop custom gym wear and training t-shirts from NAQSH. Printed gym hoodies, performance tops and team gym wear made to order.",
    subcategories: [
      { name: "Gym T-Shirts", slug: "gym-t-shirts", dbSlugs: ["gym-wear-gym-tees", "gym-wear-oversized-gym-tees"], tags: ["Gym Wear", "Strength Club"] },
      { name: "Training T-Shirts", slug: "training-t-shirts", dbSlugs: ["gym-wear-performance-tees"], tags: ["Strength Club", "Typography"] },
      { name: "Gym Hoodies", slug: "gym-hoodies", dbSlugs: ["gym-wear-gym-hoodies"], tags: ["Gym Wear"] },
      { name: "Training Tops", slug: "training-tops", dbSlugs: ["gym-wear-training-tops"], tags: ["Strength Club"] },
      { name: "Men's Gym Wear", slug: "mens-gym-wear", dbSlugs: ["men-gym-wear"], tags: ["Gym Wear", "Strength Club"] },
      { name: "Women's Gym Wear", slug: "womens-gym-wear", dbSlugs: ["women-gym-wear"], tags: ["Gym Wear"] },
      { name: "Custom Gym Wear", slug: "custom-gym-wear", tags: ["Custom Design"] },
    ],
  },
  {
    name: "Bags & Accessories",
    slug: "bags-accessories",
    description: "Custom tote bags, caps, stickers and mugs with your logo, artwork or name.",
    image: img.bags,
    seoTitle: "Custom Tote Bags, Caps & Accessories | NAQSH",
    seoDescription: "Shop custom tote bags, caps, stickers and mugs from NAQSH. Personalised accessories and custom merchandise with your logo or design.",
    subcategories: [
      { name: "Tote Bags", slug: "tote-bags", dbSlugs: ["tote-bags", "bags-accessories-tote-bags"] },
      { name: "Caps", slug: "caps", dbSlugs: ["caps", "bags-accessories-caps", "men-caps"] },
      { name: "Stickers", slug: "stickers", dbSlugs: ["stickers", "bags-accessories-stickers"] },
      { name: "Mugs", slug: "mugs", dbSlugs: ["mugs", "home-gifts-mugs"] },
      { name: "Custom Accessories", slug: "custom-accessories", tags: ["Custom Design"] },
    ],
  },
  {
    name: "Home & Gifts",
    slug: "home-gifts",
    description: "Custom gifts, posters, mugs and gift boxes for the people worth remembering.",
    image: img.gifts,
    seoTitle: "Custom Gifts, Mugs & Posters | NAQSH",
    seoDescription: "Shop custom gifts, personalised mugs, posters and prints from NAQSH. Custom merchandise made for gifting in Pakistan and beyond.",
    subcategories: [
      { name: "Posters & Prints", slug: "posters-prints", dbSlugs: ["posters-prints", "home-gifts-posters-prints"] },
      { name: "Mugs", slug: "mugs", dbSlugs: ["mugs", "home-gifts-mugs"] },
      { name: "Gift Boxes", slug: "gift-boxes", dbSlugs: ["home-gifts-custom-gifts"] },
      { name: "Custom Gifts", slug: "custom-gifts", dbSlugs: ["home-gifts-custom-gifts"], tags: ["Custom Design"] },
      { name: "Pakistani Culture Gifts", slug: "pakistani-culture-gifts", tags: ["Pakistani Culture"] },
      { name: "Personalized Gifts", slug: "personalized-gifts", tags: ["Custom Design"] },
    ],
  },
  {
    name: "Custom",
    slug: "custom",
    description: "Made to order. Custom printed pieces, bulk and event merchandise from your idea.",
    image: img.custom,
    seoTitle: "Custom Orders & Bulk Merchandise | NAQSH",
    seoDescription: "Order custom printed merchandise, custom t-shirts, hoodies, gym wear and bulk event merchandise from NAQSH. Bring your artwork or idea.",
    subcategories: [
      { name: "Custom T-Shirts", slug: "custom-t-shirts", dbSlugs: ["custom-custom-orders"], tags: ["Custom Design"] },
      { name: "Custom Hoodies", slug: "custom-hoodies", tags: ["Custom Design"] },
      { name: "Custom Gym Wear", slug: "custom-gym-wear", tags: ["Custom Design"] },
      { name: "Custom Gifts", slug: "custom-gifts", tags: ["Custom Design"] },
      { name: "Custom Couple Products", slug: "custom-couple-products", tags: ["Custom Design"] },
      { name: "Bulk & Event Merchandise", slug: "bulk-event-merchandise", dbSlugs: ["custom-bulk-events"], tags: ["Custom Design"] },
      { name: "Custom Orders", slug: "custom-orders", dbSlugs: ["custom-custom-orders"], tags: ["Custom Design"] },
    ],
  },
];

export const taxonomyBySlug = new Map(taxonomy.map((category) => [category.slug, category]));

export const navLinks = [
  { name: "Home", path: "/" },
  { name: "Categories", path: "/categories" },
  { name: "Shop", path: "/shop" },
  { name: "Collections", path: "/collections" },
  { name: "Create Your Design", path: "/custom-design" },
  { name: "About Us", path: "/about" },
];
