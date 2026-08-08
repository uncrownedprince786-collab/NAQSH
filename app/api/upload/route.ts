import { NextResponse } from "next/server";
import { cloudinary } from "@/lib/cloudinary";
import { prisma } from "@/lib/db";

const MAX_BYTES = 5 * 1024 * 1024;
const TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    if (!(file instanceof File) || !TYPES.has(file.type) || file.size > MAX_BYTES) {
      return NextResponse.json({ error: "Upload a JPG, PNG or WebP image smaller than 5 MB." }, { status: 400 });
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    const result = await cloudinary.uploader.upload(`data:${file.type};base64,${buffer.toString("base64")}`, { folder: "naqsh/inquiries", resource_type: "image" });
    const media = await prisma.media.create({ data: { publicId: result.public_id, url: result.secure_url, alt: "Customer design reference", folder: "naqsh/inquiries" } });
    return NextResponse.json({ id: media.id, url: media.url });
  } catch (error) {
    console.error("Image upload failed", error);
    return NextResponse.json({ error: "We could not upload that image. Please try again or continue on WhatsApp." }, { status: 500 });
  }
}
