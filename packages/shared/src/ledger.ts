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
  date: string;
  items: LedgerItem[];
};

export type MonthlyLedger = {
  userId: string;
  month: string;
  days: DailyLedger[];
};
