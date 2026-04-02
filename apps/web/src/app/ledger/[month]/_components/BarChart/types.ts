import type { LedgerCompareItem, LedgerDashboardResponse } from "@repo/shared";

export type ComparePeriodType = "month" | "quarter" | "year";

export interface BarChartProps {
  compareData: LedgerDashboardResponse["compare"];
  defaultPeriod?: ComparePeriodType;
}

export const getPeriodTriggerLabel = (period: ComparePeriodType) => {
  switch (period) {
    case "month":
      return "전달";
    case "quarter":
      return "전분기";
    case "year":
      return "전년도";
    default:
      return "전달";
  }
};

export const getCompareTitle = (period: ComparePeriodType) => {
  switch (period) {
    case "month":
      return "대비 소비했어요";
    case "quarter":
      return "대비 소비했어요";
    case "year":
      return "대비 소비했어요";
    default:
      return "대비 소비했어요";
  }
};

export const formatChartAmount = (amount: number) => {
  if (amount >= 10000) {
    return `${Math.round(amount / 10000)}만원`;
  }

  return `${amount.toLocaleString()}원`;
};

const getDifferenceText = (previousAmount: number, currentAmount: number) => {
  const diff = currentAmount - previousAmount;
  const absDiff = Math.abs(diff).toLocaleString();

  if (diff === 0) {
    return "지난 기간과 동일하게 소비했어요.";
  }

  if (diff > 0) {
    return `${absDiff}원 더 소비했어요.`;
  }

  return `${absDiff}원 덜 소비했어요.`;
};

export const getCompareDescription = (
  previousItem: LedgerCompareItem,
  currentItem: LedgerCompareItem,
) => {
  return `${previousItem.label}보다 ${getDifferenceText(
    previousItem.amount,
    currentItem.amount,
  )}`;
};