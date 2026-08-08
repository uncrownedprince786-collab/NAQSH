import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createSession } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  const { email, password } = await request.json();
  if (typeof email !== "string" || typeof password !== "string") return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  const admin = await prisma.admin.findUnique({ where: { email } });
  if (!admin || !(await bcrypt.compare(password, admin.passwordHash))) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  const token = await createSession(admin.email);
  const response = NextResponse.json({ ok: true });
  response.cookies.set("naqsh_admin", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 604800 });
  return response;
}
