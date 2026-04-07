export type LedgerSettingsResponse = {
  name: string;
};

export type UpdateLedgerSettingsRequest = {
  name: string;
};

export type LedgerType = "income" | "expense";

export type LedgerCategory =
  | "salary"
  | "bonus"
  | "food"
  | "cafe"
  | "transport"
  | "shopping"
  | "living"
  | "health"
  | "culture"
  | "gift"
  | "etc";

export type LedgerItem = {
  id: string;
  name: string;
  type: LedgerType;
  category: LedgerCategory;
  amount: number;
};

export type DailyLedger = {
  date: string; // YYYY-MM-DD
  items: LedgerItem[];
};

export type MonthlyLedger = {
  userId: string;
  month: string; // YYYY-MM
  days: DailyLedger[];
};

export type LedgerCalendarDay = {
  date: string;
  income: number;
  expense: number;
};

export type LedgerSummary = {
  income: number;
  expense: number;
  remainingAmount: number;
};

export type LedgerCategorySummaryItem = {
  category: LedgerCategory;
  amount: number;
};

export type LedgerCompareItem = {
  label: string;
  amount: number;
};

export type LedgerDashboardResponse = {
  summary: LedgerSummary;
  calendar: LedgerCalendarDay[];
  categorySummary: LedgerCategorySummaryItem[];
  compare: {
    month: LedgerCompareItem[];
    quarter: LedgerCompareItem[];
    year: LedgerCompareItem[];
  };
};

export type CreateLedgerItemRequest = {
  name: string;
  type: LedgerType;
  category: LedgerCategory;
  amount: number;
  date: string; // YYYY-MM-DD
};

export type UpdateLedgerItemRequest = {
  name?: string;
  type?: LedgerType;
  category?: LedgerCategory;
  amount?: number;
  date?: string; // YYYY-MM-DD
};

export type LedgerItemResponse = {
  id: string;
  userId: string;
  name: string;
  type: LedgerType;
  category: LedgerCategory;
  amount: number;
  date: string; // YYYY-MM-DD
};

export type LedgerTransactionSection = {
  date: string;
  items: LedgerItem[];
};

export type LedgerTransactionsResponse = {
  sections: LedgerTransactionSection[];
  nextCursor: string | null;
  hasNext: boolean;
};
