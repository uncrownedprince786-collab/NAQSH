import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secret = process.env.AUTH_SECRET;
if (!secret) throw new Error("AUTH_SECRET must be configured.");
const key = new TextEncoder().encode(secret);

export async function createSession(email: string) {
  return new SignJWT({ email, role: "admin" }).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("7d").sign(key);
}

export async function isAdmin() {
  try {
    const token = (await cookies()).get("naqsh_admin")?.value;
    if (!token) return false;
    await jwtVerify(token, key);
    return true;
  } catch { return false; }
}
