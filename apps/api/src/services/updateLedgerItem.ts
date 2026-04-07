import { prisma } from "@repo/db";
import type { UpdateLedgerItemRequest, LedgerItemResponse } from "@repo/shared";

export const updateLedgerItem = async (
  id: string,
  data: UpdateLedgerItemRequest,
): Promise<LedgerItemResponse | null> => {
  const existing = await prisma.ledgerItem.findUnique({ where: { id } });

  if (!existing) {
    return null;
  }

  const item = await prisma.ledgerItem.update({
    where: { id },
    data: {
      ...(data.name !== undefined && { name: data.name }),
      ...(data.type !== undefined && { type: data.type }),
      ...(data.category !== undefined && { category: data.category }),
      ...(data.amount !== undefined && { amount: data.amount }),
      ...(data.date !== undefined && { date: new Date(data.date) }),
    },
  });

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
