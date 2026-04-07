import { prisma } from "@repo/db";
import type { LedgerItemResponse } from "@repo/shared";

export const getLedgerItem = async (
  id: string,
): Promise<LedgerItemResponse | null> => {
  const item = await prisma.ledgerItem.findUnique({ where: { id } });

  if (!item) {
    return null;
  }

  return {
    id: item.id,
    userId: item.userId,
    name: item.name,
    type: item.type,
    category: item.category,
    amount: item.amount,
    date: item.date.toISOString().slice(0, 10),
  };
};
