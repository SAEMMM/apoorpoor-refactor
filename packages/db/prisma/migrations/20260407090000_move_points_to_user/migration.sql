-- AlterTable: Add points and level to users
ALTER TABLE "users" ADD COLUMN "points" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "users" ADD COLUMN "level" INTEGER NOT NULL DEFAULT 1;

-- Migrate existing points from ledgers to users
UPDATE "users" SET "points" = (
  SELECT COALESCE("ledgers"."points", 0)
  FROM "ledgers"
  WHERE "ledgers"."userId" = "users"."id"
);

-- AlterTable: Remove points from ledgers
ALTER TABLE "ledgers" DROP COLUMN "points";
