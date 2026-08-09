// Design registry.
// Replace the placeholder name and description on each line with the real
// design title and story. productTypes limits which products a design can be
// printed on — replace with a smaller list to restrict it, or leave as is.

export type DesignArtwork = {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  productTypes: string[];
  isActive: boolean;
  sortOrder: number;
};

const defaultProductTypes = ["T-Shirt", "Oversized T-Shirt", "Hoodie", "Sweatshirt", "Gym Wear", "Tote Bag", "Mug", "Cap", "Poster", "Print", "Other / Custom"];

export const designArtworks: DesignArtwork[] = [
  { id: "design-01", slug: "d13db9dcff33308391eeebc06670f7d8", name: "Piece 01", description: "Original NAQSH artwork, printed to order on the product you choose.", image: "/designs/d13db9dcff33308391eeebc06670f7d8.jpg", productTypes: defaultProductTypes, isActive: true, sortOrder: 1 },
  { id: "design-02", slug: "3d5f2cf35c9819234776790770590c65", name: "Piece 02", description: "Original NAQSH artwork, printed to order on the product you choose.", image: "/designs/3d5f2cf35c9819234776790770590c65.jpg", productTypes: defaultProductTypes, isActive: true, sortOrder: 2 },
  { id: "design-03", slug: "3f34f2859d7c495dc1a867e402a7c3a5", name: "Piece 03", description: "Original NAQSH artwork, printed to order on the product you choose.", image: "/designs/3f34f2859d7c495dc1a867e402a7c3a5.jpg", productTypes: defaultProductTypes, isActive: true, sortOrder: 3 },
  { id: "design-04", slug: "8ca0b087eab2b4e33dc57dcbd52bf6c9", name: "Piece 04", description: "Original NAQSH artwork, printed to order on the product you choose.", image: "/designs/8ca0b087eab2b4e33dc57dcbd52bf6c9.jpg", productTypes: defaultProductTypes, isActive: true, sortOrder: 4 },
  { id: "design-05", slug: "8d0799bfa480e33c4b288da061df556c", name: "Piece 05", description: "Original NAQSH artwork, printed to order on the product you choose.", image: "/designs/8d0799bfa480e33c4b288da061df556c.jpg", productTypes: defaultProductTypes, isActive: true, sortOrder: 5 },
  { id: "design-06", slug: "31f6b73a409e36b2c70618c504f28c9e", name: "Piece 06", description: "Original NAQSH artwork, printed to order on the product you choose.", image: "/designs/31f6b73a409e36b2c70618c504f28c9e.jpg", productTypes: defaultProductTypes, isActive: true, sortOrder: 6 },
  { id: "design-07", slug: "58b48134305ba1404ba86699973bd034", name: "Piece 07", description: "Original NAQSH artwork, printed to order on the product you choose.", image: "/designs/58b48134305ba1404ba86699973bd034.jpg", productTypes: defaultProductTypes, isActive: true, sortOrder: 7 },
  { id: "design-08", slug: "61b18ad2090420154afa7553ccceedfb", name: "Piece 08", description: "Original NAQSH artwork, printed to order on the product you choose.", image: "/designs/61b18ad2090420154afa7553ccceedfb.jpg", productTypes: defaultProductTypes, isActive: true, sortOrder: 8 },
  { id: "design-09", slug: "77c55ea960afac64baa1a1ceaaefc569", name: "Piece 09", description: "Original NAQSH artwork, printed to order on the product you choose.", image: "/designs/77c55ea960afac64baa1a1ceaaefc569.jpg", productTypes: defaultProductTypes, isActive: true, sortOrder: 9 },
  { id: "design-10", slug: "398d7d82aae472d45fe63f61661a23d5", name: "Piece 10", description: "Original NAQSH artwork, printed to order on the product you choose.", image: "/designs/398d7d82aae472d45fe63f61661a23d5.jpg", productTypes: defaultProductTypes, isActive: true, sortOrder: 10 },
  { id: "design-11", slug: "9298a68eae24e63b34a4d40675ecfcc0", name: "Piece 11", description: "Original NAQSH artwork, printed to order on the product you choose.", image: "/designs/9298a68eae24e63b34a4d40675ecfcc0.jpg", productTypes: defaultProductTypes, isActive: true, sortOrder: 11 },
  { id: "design-12", slug: "79609ad7256d5fe1cbf32b14bc0e5c2a", name: "Piece 12", description: "Original NAQSH artwork, printed to order on the product you choose.", image: "/designs/79609ad7256d5fe1cbf32b14bc0e5c2a.jpg", productTypes: defaultProductTypes, isActive: true, sortOrder: 12 },
  { id: "design-13", slug: "b347c63f33bc2870eda8558fc1fc7529", name: "Piece 13", description: "Original NAQSH artwork, printed to order on the product you choose.", image: "/designs/b347c63f33bc2870eda8558fc1fc7529.jpg", productTypes: defaultProductTypes, isActive: true, sortOrder: 13 },
  { id: "design-14", slug: "cccd5fa8f63307c4c9e27a36660375be", name: "Piece 14", description: "Original NAQSH artwork, printed to order on the product you choose.", image: "/designs/cccd5fa8f63307c4c9e27a36660375be.jpg", productTypes: defaultProductTypes, isActive: true, sortOrder: 14 },
];

export function getDesign(slug: string): DesignArtwork | null {
  return designArtworks.find((design) => design.slug === slug) || null;
}

export function activeDesigns(): DesignArtwork[] {
  return designArtworks.filter((design) => design.isActive).sort((a, b) => a.sortOrder - b.sortOrder);
}
