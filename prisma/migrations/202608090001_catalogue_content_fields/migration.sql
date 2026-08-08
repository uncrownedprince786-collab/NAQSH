ALTER TABLE "Product" ADD COLUMN "fullDescription" TEXT;
ALTER TABLE "Product" ADD COLUMN "isNew" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "Product" ADD COLUMN "tags" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[];

-- Reconcile the legacy seed names with the canonical catalogue categories.
INSERT INTO "Category" ("id", "name", "slug", "description", "isVisible", "position", "createdAt", "updatedAt")
VALUES
  ('catalogue-custom-orders', 'Custom Orders', 'custom-orders', 'Bring a reference, a sketch or a feeling.', true, 9, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT ("slug") DO NOTHING;

UPDATE "Product" SET "categoryId" = (SELECT "id" FROM "Category" WHERE "slug" = 'everyday-tees')
WHERE "categoryId" IN (SELECT "id" FROM "Category" WHERE "slug" = 't-shirts')
  AND EXISTS (SELECT 1 FROM "Category" WHERE "slug" = 'everyday-tees');
DELETE FROM "Category" WHERE "slug" = 't-shirts';
UPDATE "Product" SET "categoryId" = (SELECT "id" FROM "Category" WHERE "slug" = 'custom-orders')
WHERE "categoryId" IN (SELECT "id" FROM "Category" WHERE "slug" = 'gifts');
DELETE FROM "Category" WHERE "slug" = 'gifts';
