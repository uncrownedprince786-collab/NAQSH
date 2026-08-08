import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
const secret = process.env.AUTH_SECRET;
const key = new TextEncoder().encode(secret || "invalid-unconfigured-secret");
export async function middleware(r: NextRequest) { if (r.nextUrl.pathname === "/admin/login") return NextResponse.next(); const token = r.cookies.get("naqsh_admin")?.value; try { if (!secret || !token) throw new Error(); await jwtVerify(token, key); return NextResponse.next(); } catch { return NextResponse.redirect(new URL("/admin/login", r.url)); } }
export const config = { matcher: ["/admin/:path*"] };
