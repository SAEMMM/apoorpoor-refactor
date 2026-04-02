import { MONTHLY_LEDGER_MOCKS } from "../mocks/ledger";
import type { MonthlyLedger } from "@repo/shared";

type GetMonthlyLedgerParams = {
  userId: string;
  month: string;
};

export const getMonthlyLedger = async ({
  userId,
  month,
}: GetMonthlyLedgerParams): Promise<MonthlyLedger | null> => {
  await new Promise((resolve) => setTimeout(resolve, 100));

  const monthlyLedger = MONTHLY_LEDGER_MOCKS[month];

  if (!monthlyLedger) {
    return null;
  }

  if (monthlyLedger.userId !== userId) {
    return null;
  }

  return monthlyLedger;
};