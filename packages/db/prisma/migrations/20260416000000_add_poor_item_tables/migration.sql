-- CreateEnum
CREATE TYPE "PoorItemCategory" AS ENUM (
    'face',
    'hair',
    'clothes',
    'pants',
    'accessory',
    'shoes',
    'setup'
);

-- CreateEnum
CREATE TYPE "PoorItemTransactionType" AS ENUM ('purchase', 'reward', 'refund');

-- CreateTable
CREATE TABLE "poor__items" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "category" "PoorItemCategory" NOT NULL,
    "price" INTEGER NOT NULL,
    "requiredLevel" INTEGER NOT NULL,
    "imgUrl" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "poor__items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPoorItem" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "poorItemId" TEXT NOT NULL,
    "purchasedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "equipped" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "UserPoorItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "poor_item_transactions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "poorItemId" TEXT NOT NULL,
    "type" "PoorItemTransactionType" NOT NULL,
    "pointAmount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "poor_item_transactions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "poor__items_code_key" ON "poor__items"("code");

-- CreateIndex
CREATE INDEX "poor__items_category_requiredLevel_sortOrder_idx"
ON "poor__items"("category", "requiredLevel", "sortOrder");

-- CreateIndex
CREATE INDEX "poor_item_transactions_userId_createdAt_idx"
ON "poor_item_transactions"("userId", "createdAt");

-- AddForeignKey
ALTER TABLE "UserPoorItem"
ADD CONSTRAINT "UserPoorItem_userId_fkey"
FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPoorItem"
ADD CONSTRAINT "UserPoorItem_poorItemId_fkey"
FOREIGN KEY ("poorItemId") REFERENCES "poor__items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "poor_item_transactions"
ADD CONSTRAINT "poor_item_transactions_userId_fkey"
FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "poor_item_transactions"
ADD CONSTRAINT "poor_item_transactions_poorItemId_fkey"
FOREIGN KEY ("poorItemId") REFERENCES "poor__items"("id") ON DELETE CASCADE ON UPDATE CASCADE;
