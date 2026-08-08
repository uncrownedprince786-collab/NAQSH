import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isAdmin } from "@/lib/auth";
import { slugify } from "@/lib/utils";
import { z } from "zod";

const productSchema = z.object({ name: z.string().min(2).max(120), slug: z.string().optional(), description: z.string().min(2).max(5000), price: z.coerce.number().nonnegative(), categoryId: z.string().cuid(), isCustomizable: z.boolean().default(true), isFeatured: z.boolean().default(false), isActive: z.boolean().default(true), sizes: z.array(z.string()).default([]), colors: z.array(z.string()).default([]), printPositions: z.array(z.string()).default([]) });

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const products = await prisma.product.findMany({ include: { category: true, variants: true, images: { include: { media: true }, orderBy: { position: "asc" } } }, orderBy: { createdAt: "desc" } });
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = productSchema.parse(await request.json());
    const product = await prisma.product.create({ data: { name: body.name, slug: body.slug || slugify(body.name), description: body.description, price: body.price, categoryId: body.categoryId, isCustomizable: body.isCustomizable, isFeatured: body.isFeatured, isActive: body.isActive, variants: { create: { sizes: body.sizes, colors: body.colors, printPositions: body.printPositions } } }, include: { variants: true, category: true } });
    return NextResponse.json(product, { status: 201 });
  } catch (error) { if (error instanceof z.ZodError) return NextResponse.json({ error: "Please complete the product fields." }, { status: 400 }); console.error("Product create failed", error); return NextResponse.json({ error: "Could not create product." }, { status: 500 }); }
}
