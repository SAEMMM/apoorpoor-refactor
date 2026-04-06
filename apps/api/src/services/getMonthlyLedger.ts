import { prisma } from "@repo/db";
import type { MonthlyLedger, DailyLedger, LedgerItem } from "@repo/shared";

type GetMonthlyLedgerParams = {
  userId: string;
  month: string;
};

export const getMonthlyLedger = async ({
  userId,
  month,
}: GetMonthlyLedgerParams): Promise<MonthlyLedger | null> => {
  const [year, monthValue] = month.split("-").map(Number);
  const startDate = new Date(year, monthValue - 1, 1);
  const endDate = new Date(year, monthValue, 1);

  const items = await prisma.ledgerItem.findMany({
    where: {
      userId,
      date: { gte: startDate, lt: endDate },
    },
    orderBy: { date: "asc" },
  });

  if (items.length === 0) {
    return null;
  }

  const dayMap = new Map<string, LedgerItem[]>();

  for (const item of items) {
    const dateStr = item.date.toISOString().slice(0, 10);
    const ledgerItem: LedgerItem = {
      id: item.id,
      name: item.name,
      type: item.type,
      category: item.category,
      amount: item.amount,
    };

    const existing = dayMap.get(dateStr);
    if (existing) {
      existing.push(ledgerItem);
    } else {
      dayMap.set(dateStr, [ledgerItem]);
    }
  }

  const days: DailyLedger[] = Array.from(dayMap.entries()).map(
    ([date, items]) => ({ date, items }),
  );

  return { userId, month, days };
};
