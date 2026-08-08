# NAQSH

Production-ready foundation for NAQSH, a WhatsApp-first custom DTF printing studio. Customers browse products and submit custom requests; no customer accounts or online payments are included.

## Stack

Next.js (App Router), TypeScript, Tailwind CSS, Prisma/PostgreSQL (Neon), Cloudinary and secure admin cookie sessions.

## Local setup

1. Copy `.env.example` to `.env` and set the values.
2. Install dependencies: `npm install`
3. Create the database schema: `npm run db:migrate`
4. Add default settings: `npm run db:seed`
5. Start: `npm run dev`

## Environment

`DATABASE_URL` and `DIRECT_URL` are Neon connection strings. `AUTH_SECRET` must be a long random secret. `ADMIN_EMAIL` and `ADMIN_PASSWORD` are initial admin credentials (move to hashed Admin records for a multi-admin deployment). Cloudinary variables enable signed media uploads. Set `NEXT_PUBLIC_SITE_URL` to the production Vercel URL.

## Deployment

Import the repository in Vercel, configure all environment variables, and run `npx prisma migrate deploy` against the production Neon database before or during deployment. Do not run `prisma migrate reset` in production.

## Architecture

`app/` contains public pages, API endpoints and admin UI. `components/` contains reusable interface components. `lib/` holds Prisma, auth and shared utilities. `prisma/schema.prisma` is the database contract. The current product/category imagery is explicitly demo content and should be replaced through catalogue/media management after database setup.
