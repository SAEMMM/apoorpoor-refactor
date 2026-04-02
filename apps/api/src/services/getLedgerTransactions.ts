import type {
  LedgerTransactionSection,
  LedgerTransactionsResponse,
} from "@repo/shared";

import { getMonthlyLedger } from "./getMonthlyLedger";

type Params = {
  userId: string;
  startDate: string;
  endDate: string;
  cursor?: string;
  limit?: number;
};

const isDateInRange = (date: string, startDate: string, endDate: string) => {
  return date >= startDate && date <= endDate;
};

const getMonthFromDate = (date: string) => date.slice(0, 7);

export const getLedgerTransactions = async ({
  userId,
  startDate,
  endDate,
  cursor,
  limit = 10,
}: Params): Promise<LedgerTransactionsResponse | null> => {
  const month = getMonthFromDate(startDate);
  const ledger = await getMonthlyLedger({ userId, month });

  if (!ledger) {
    return null;
  }

  const filteredDays = ledger.days
    .filter((day) => isDateInRange(day.date, startDate, endDate))
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  const startIndex = cursor
    ? filteredDays.findIndex((day) => day.date === cursor) + 1
    : 0;

  const sections: LedgerTransactionSection[] = filteredDays.slice(
    startIndex,
    startIndex + limit,
  );

  const lastSection = sections[sections.length - 1];
  const nextIndex = startIndex + limit;
  const hasNext = nextIndex < filteredDays.length;

  return {
    sections,
    nextCursor: hasNext ? lastSection.date : null,
    hasNext,
  };
};
