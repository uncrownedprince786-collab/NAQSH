import { NextResponse } from "next/server"; import { prisma } from "@/lib/db"; import { isAdmin } from "@/lib/auth";
export async function GET() { if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); return NextResponse.json(await prisma.media.findMany({ include: { productImages: { include: { product: true } } }, orderBy: { createdAt: "desc" } })); }
