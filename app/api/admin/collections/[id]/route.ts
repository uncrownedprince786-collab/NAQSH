import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isAdmin } from "@/lib/auth";
import { slugify } from "@/lib/utils";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) { if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); const { id } = await params; const body = await request.json(); try { return NextResponse.json(await prisma.collection.update({ where: { id }, data: { name: body.name, slug: body.slug ? slugify(body.slug) : undefined, description: body.description || null, isVisible: typeof body.isVisible === "boolean" ? body.isVisible : undefined, position: Number.isFinite(body.position) ? body.position : undefined, products: Array.isArray(body.productIds) ? { deleteMany: {}, create: body.productIds.map((productId: string) => ({ productId })) } : undefined } })); } catch { return NextResponse.json({ error: "Could not update collection." }, { status: 400 }); } }
export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) { if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); const { id } = await params; await prisma.collection.delete({ where: { id } }); return new NextResponse(null, { status: 204 }); }
