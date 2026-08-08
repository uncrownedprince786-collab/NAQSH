import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const db = new PrismaClient();

async function main() {
  await db.siteSettings.upsert({ where: { id: "default" }, update: {}, create: { id: "default" } });
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) throw new Error("Admin environment configuration is missing.");
  await db.admin.upsert({
    where: { email },
    update: {},
    create: { email, passwordHash: await bcrypt.hash(password, 12), name: "NAQSH Admin" },
  });
  console.log("NAQSH default settings and admin account are ready.");
}

main().finally(() => db.$disconnect());
