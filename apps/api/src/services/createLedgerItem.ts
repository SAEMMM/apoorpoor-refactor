import { prisma } from "@repo/db";
import type { CreateLedgerItemRequest, LedgerItemResponse } from "@repo/shared";

export const createLedgerItem = async (
  data: CreateLedgerItemRequest,
): Promise<LedgerItemResponse> => {
  const item = await prisma.ledgerItem.create({
    data: {
      userId: data.userId,
      name: data.name,
      type: data.type,
      category: data.category,
      amount: data.amount,
      date: new Date(data.date),
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
