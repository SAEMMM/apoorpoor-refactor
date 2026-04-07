import { prisma } from "@repo/db";
import type { CreateLedgerItemRequest, LedgerItemResponse } from "@repo/shared";

const POINTS_PER_CREATE = 10;

export const createLedgerItem = async (
  userId: string,
  data: CreateLedgerItemRequest,
): Promise<LedgerItemResponse> => {
  const [item] = await prisma.$transaction([
    prisma.ledgerItem.create({
      data: {
        userId,
        name: data.name,
        type: data.type,
        category: data.category,
        amount: data.amount,
        date: new Date(data.date),
      },
    }),
    prisma.ledger.upsert({
      where: { userId },
      update: { points: { increment: POINTS_PER_CREATE } },
      create: { userId, points: POINTS_PER_CREATE },
    }),
  ]);

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
