import type {
  LedgerCategory,
  LedgerDashboardResponse,
} from "@repo/shared";

import { CATEGORY_LABEL_MAP } from "@/features/ledger/constants/category";
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
  categorySummary: LedgerDashboardResponse["categorySummary"];
  selectedIndex?: number;
}

const RANK_COLORS = [
  colors.primary.main,
  colors.secondary.main,
  "#8A2EFF",
  "#2ED9FF",
];

const ETC_COLOR = colors.gray[150];

export const getDetailListItems = (
  categorySummary: LedgerDashboardResponse["categorySummary"],
): ExpenseSummaryItem[] => {
  const totalExpense = categorySummary.reduce(
    (sum, item) => sum + item.amount,
    0,
  );

  return [...categorySummary]
    .sort((a, b) => b.amount - a.amount)
    .map((item, index) => ({
      category: item.category,
      label: CATEGORY_LABEL_MAP[item.category],
      amount: item.amount,
      percent:
        totalExpense === 0 ? 0 : Math.round((item.amount / totalExpense) * 100),
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