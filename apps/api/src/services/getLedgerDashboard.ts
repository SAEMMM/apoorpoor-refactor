import type {
  LedgerCategory,
  LedgerDashboardResponse,
  MonthlyLedger,
} from "@repo/shared";

import { getMonthlyLedger } from "./getMonthlyLedger";

type Params = {
  userId: string;
  startDate: string;
  endDate: string;
};

const getMonthFromDate = (date: string) => date.slice(0, 7);

const isDateInRange = (date: string, startDate: string, endDate: string) => {
  return date >= startDate && date <= endDate;
};

const getMonthlyTotals = (ledger: MonthlyLedger) => {
  return ledger.days.reduce(
    (acc, day) => {
      day.items.forEach((item) => {
        if (item.type === "income") acc.income += item.amount;
        if (item.type === "expense") acc.expense += Math.abs(item.amount);
      });

      return acc;
    },
    { income: 0, expense: 0 },
  );
};

const getCategorySummary = (ledger: MonthlyLedger) => {
  const map = new Map<LedgerCategory, number>();

  ledger.days.forEach((day) => {
    day.items.forEach((item) => {
      if (item.type !== "expense") return;

      const prev = map.get(item.category) ?? 0;
      map.set(item.category, prev + Math.abs(item.amount));
    });
  });

  return Array.from(map.entries())
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount);
};

const getCalendar = (ledger: MonthlyLedger) => {
  return ledger.days.map((day) => {
    let income = 0;
    let expense = 0;

    day.items.forEach((item) => {
      if (item.type === "income") income += item.amount;
      if (item.type === "expense") expense += Math.abs(item.amount);
    });

    return {
      date: day.date,
      income,
      expense,
    };
  });
};

export const getLedgerDashboard = async ({
  userId,
  startDate,
  endDate,
}: Params): Promise<LedgerDashboardResponse | null> => {
  const month = getMonthFromDate(startDate);
  const ledger = await getMonthlyLedger({ userId, month });

  if (!ledger) {
    return null;
  }

  const filteredLedger: MonthlyLedger = {
    ...ledger,
    days: ledger.days.filter((day) =>
      isDateInRange(day.date, startDate, endDate),
    ),
  };

  const { income, expense } = getMonthlyTotals(filteredLedger);

  return {
    summary: {
      income,
      expense,
      remainingAmount: income - expense,
    },
    calendar: getCalendar(filteredLedger),
    categorySummary: getCategorySummary(filteredLedger),
    compare: {
      month: [],
      quarter: [],
      year: [],
    },
  };
};
