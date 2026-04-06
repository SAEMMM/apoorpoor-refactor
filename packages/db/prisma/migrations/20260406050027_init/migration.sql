-- CreateEnum
CREATE TYPE "LedgerType" AS ENUM ('income', 'expense');

-- CreateEnum
CREATE TYPE "LedgerCategory" AS ENUM ('salary', 'bonus', 'food', 'cafe', 'transport', 'shopping', 'living', 'health', 'culture', 'gift', 'etc');

-- CreateTable
CREATE TABLE "ledger_items" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "LedgerType" NOT NULL,
    "category" "LedgerCategory" NOT NULL,
    "amount" INTEGER NOT NULL,
    "date" DATE NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ledger_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ledger_items_userId_date_idx" ON "ledger_items"("userId", "date");
