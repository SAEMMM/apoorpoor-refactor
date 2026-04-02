import { marchLedgerMock, type MonthlyLedger } from "@/mocks/ledger";

type GetMonthlyLedgerParams = {
  userId: string;
  month: string;
};

const MOCK_LEDGER_BY_MONTH: Record<string, MonthlyLedger> = {
  "2026-03": marchLedgerMock,
};

export async function getMonthlyLedger({
  userId,
  month,
}: GetMonthlyLedgerParams): Promise<MonthlyLedger | null> {
  // TODO: 나중에 실제 API/DB 붙이면 여기만 교체
  await new Promise((resolve) => setTimeout(resolve, 300));

  const monthlyLedger = MOCK_LEDGER_BY_MONTH[month];

  if (!monthlyLedger) {
    return null;
  }

  if (monthlyLedger.userId !== userId) {
    return null;
  }

  return monthlyLedger;
}
