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

const getExpenseTotal = (ledger: MonthlyLedger | null) => {
  if (!ledger) return 0;

  return ledger.days.reduce((acc, day) => {
    day.items.forEach((item) => {
      if (item.type === "expense") {
        acc += Math.abs(item.amount);
      }
    });

    return acc;
  }, 0);
};

const formatMonthLabel = (month: string) => {
  return `${Number(month.slice(5, 7))}월`;
};

const getAdjacentMonth = (month: string, diff: number) => {
  const [year, monthValue] = month.split("-").map(Number);
  const date = new Date(year, monthValue - 1 + diff, 1);

  const nextYear = date.getFullYear();
  const nextMonth = String(date.getMonth() + 1).padStart(2, "0");

  return `${nextYear}-${nextMonth}`;
};

const getQuarter = (month: string) => {
  const monthValue = Number(month.slice(5, 7));
  return Math.floor((monthValue - 1) / 3) + 1;
};

const getQuarterLabel = (month: string) => {
  return `${getQuarter(month)}분기`;
};

const getQuarterMonths = (year: number, quarter: number) => {
  const startMonth = (quarter - 1) * 3 + 1;

  return Array.from({ length: 3 }, (_, index) => {
    const month = String(startMonth + index).padStart(2, "0");
    return `${year}-${month}`;
  });
};

const getPreviousQuarterInfo = (month: string) => {
  const [year] = month.split("-").map(Number);
  const currentQuarter = getQuarter(month);

  if (currentQuarter === 1) {
    return {
      year: year - 1,
      quarter: 4,
    };
  }

  return {
    year,
    quarter: currentQuarter - 1,
  };
};

const getYearFromMonth = (month: string) => Number(month.slice(0, 4));

const getYearMonths = (year: number) => {
  return Array.from({ length: 12 }, (_, index) => {
    return `${year}-${String(index + 1).padStart(2, "0")}`;
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

  // month compare
  const previousMonth = getAdjacentMonth(month, -1);
  const previousMonthLedger = await getMonthlyLedger({
    userId,
    month: previousMonth,
  });

  const previousMonthExpense = getExpenseTotal(previousMonthLedger);
  const currentMonthExpense = getExpenseTotal(filteredLedger);

  // quarter compare
  const currentYear = getYearFromMonth(month);
  const currentQuarter = getQuarter(month);
  const currentQuarterMonths = getQuarterMonths(currentYear, currentQuarter);

  const previousQuarterInfo = getPreviousQuarterInfo(month);
  const previousQuarterMonths = getQuarterMonths(
    previousQuarterInfo.year,
    previousQuarterInfo.quarter,
  );

  const currentQuarterLedgers = await Promise.all(
    currentQuarterMonths.map((month) => getMonthlyLedger({ userId, month })),
  );

  const previousQuarterLedgers = await Promise.all(
    previousQuarterMonths.map((month) => getMonthlyLedger({ userId, month })),
  );

  const currentQuarterExpense = currentQuarterLedgers.reduce(
    (acc, ledger) => acc + getExpenseTotal(ledger),
    0,
  );

  const previousQuarterExpense = previousQuarterLedgers.reduce(
    (acc, ledger) => acc + getExpenseTotal(ledger),
    0,
  );

  // year compare
  const previousYear = currentYear - 1;

  const currentYearLedgers = await Promise.all(
    getYearMonths(currentYear).map((month) => getMonthlyLedger({ userId, month })),
  );

  const previousYearLedgers = await Promise.all(
    getYearMonths(previousYear).map((month) =>
      getMonthlyLedger({ userId, month }),
    ),
  );

  const currentYearExpense = currentYearLedgers.reduce(
    (acc, ledger) => acc + getExpenseTotal(ledger),
    0,
  );

  const previousYearExpense = previousYearLedgers.reduce(
    (acc, ledger) => acc + getExpenseTotal(ledger),
    0,
  );

  return {
    summary: {
      income,
      expense,
      remainingAmount: income - expense,
    },
    calendar: getCalendar(filteredLedger),
    categorySummary: getCategorySummary(filteredLedger),
    compare: {
      month: [
        {
          label: formatMonthLabel(previousMonth),
          amount: previousMonthExpense,
        },
        {
          label: formatMonthLabel(month),
          amount: currentMonthExpense,
        },
      ],
      quarter: [
        {
          label: `${previousQuarterInfo.quarter}분기`,
          amount: previousQuarterExpense,
        },
        {
          label: getQuarterLabel(month),
          amount: currentQuarterExpense,
        },
      ],
      year: [
        {
          label: `${previousYear}년`,
          amount: previousYearExpense,
        },
        {
          label: `${currentYear}년`,
          amount: currentYearExpense,
        },
      ],
    },
  };
};