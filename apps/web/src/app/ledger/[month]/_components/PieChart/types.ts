import type { LedgerCategory, MonthlyLedger } from "@/mocks/ledger";

import { colors } from "@/styles/theme/tokens/color";

export type BubblePosition = {
  left: number;
  top: number;
};

export type ExpenseSummaryItem = {
  category: LedgerCategory;
  label: string;
  amount: number;
  percent: number;
  color: string;
};

export type ChartSummaryItem = {
  key: string;
  label: string;
  amount: number;
  percent: number;
  color: string;
};

export interface PieChartProps {
  chartItems: ChartSummaryItem[];
  listItems: ExpenseSummaryItem[];
  selectedIndex?: number;
}

const CATEGORY_LABEL_MAP: Record<LedgerCategory, string> = {
  salary: "월급",
  bonus: "보너스",
  food: "식비",
  cafe: "카페",
  transport: "교통",
  shopping: "쇼핑",
  living: "생활",
  health: "건강",
  culture: "문화",
  gift: "선물",
  etc: "기타",
};

const RANK_COLORS = [
  colors.primary.main,
  colors.secondary.main,
  "#8A2EFF",
  "#2ED9FF",
];

const ETC_COLOR = colors.gray[150];

export const getExpenseSummary = (
  monthlyLedger: MonthlyLedger,
): ExpenseSummaryItem[] => {
  const expenseMap = new Map<LedgerCategory, number>();

  monthlyLedger.days.forEach((day) => {
    day.items.forEach((item) => {
      if (item.type !== "expense") return;

      const currentAmount = expenseMap.get(item.category) ?? 0;
      expenseMap.set(item.category, currentAmount + Math.abs(item.amount));
    });
  });

  const totalExpense = Array.from(expenseMap.values()).reduce(
    (sum, amount) => sum + amount,
    0,
  );

  return Array.from(expenseMap.entries())
    .map(([category, amount], index, arr) => {
      const sortedEntries = [...arr].sort((a, b) => b[1] - a[1]);
      const rank = sortedEntries.findIndex(([key]) => key === category);

      return {
        category,
        label: CATEGORY_LABEL_MAP[category],
        amount,
        percent:
          totalExpense === 0 ? 0 : Math.round((amount / totalExpense) * 100),
        color: rank >= 0 && rank < 4 ? RANK_COLORS[rank] : ETC_COLOR,
      };
    })
    .sort((a, b) => b.amount - a.amount)
    .map((item, index) => ({
      ...item,
      color: index < 4 ? RANK_COLORS[index] : ETC_COLOR,
    }));
};

export const getChartSummary = (
  items: ExpenseSummaryItem[],
): ChartSummaryItem[] => {
  const topItems = items.slice(0, 4);
  const restItems = items.slice(4);

  const restAmount = restItems.reduce((sum, item) => sum + item.amount, 0);
  const restPercent = restItems.reduce((sum, item) => sum + item.percent, 0);

  const chartItems: ChartSummaryItem[] = topItems.map((item, index) => ({
    key: item.category,
    label: item.label,
    amount: item.amount,
    percent: item.percent,
    color: RANK_COLORS[index],
  }));

  if (restAmount > 0) {
    chartItems.push({
      key: "etc-grouped",
      label: "기타",
      amount: restAmount,
      percent: restPercent,
      color: ETC_COLOR,
    });
  }

  return chartItems;
};
