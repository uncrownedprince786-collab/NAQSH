import { NextResponse } from "next/server";
import { cloudinary } from "@/lib/cloudinary";
import { prisma } from "@/lib/db";
import { isAdmin } from "@/lib/auth";

const MAX_BYTES = 5 * 1024 * 1024;
const TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const purpose = formData.get("purpose") === "product" ? "product" : "inquiries";
    if (purpose === "product" && !(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const file = formData.get("file");
    if (!(file instanceof File) || !TYPES.has(file.type) || file.size > MAX_BYTES) {
      return NextResponse.json({ error: "Upload a JPG, PNG or WebP image smaller than 5 MB." }, { status: 400 });
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    const folder = `naqsh/${purpose}`;
    const result = await cloudinary.uploader.upload(`data:${file.type};base64,${buffer.toString("base64")}`, { folder, resource_type: "image" });
    const media = await prisma.media.create({ data: { publicId: result.public_id, url: result.secure_url, alt: purpose === "product" ? "Product image" : "Customer design reference", folder } });
    return NextResponse.json({ id: media.id, url: media.url });
  } catch (error) {
    console.error("Image upload failed", error);
    return NextResponse.json({ error: "We could not upload that image. Please try again or continue on WhatsApp." }, { status: 500 });
  }
}
