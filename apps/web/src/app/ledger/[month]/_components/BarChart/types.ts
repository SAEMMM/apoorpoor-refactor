import type { LedgerCompareItem, LedgerDashboardResponse } from "@repo/shared";

export type ComparePeriodType = "month" | "quarter" | "year";

export interface BarChartProps {
  month: string;
  compareData: LedgerDashboardResponse["compare"];
  defaultPeriod?: ComparePeriodType;
}

function getQuarter(m: number) {
  return Math.floor((m - 1) / 3) + 1;
}

export function getEmptyLabels(
  month: string,
  period: ComparePeriodType,
): { previous: string; current: string } {
  const m = Number(month.slice(5, 7));
  const y = Number(month.slice(0, 4));

  switch (period) {
    case "month": {
      const prev = m === 1 ? 12 : m - 1;
      return { previous: `${prev}월`, current: `${m}월` };
    }
    case "quarter": {
      const cq = getQuarter(m);
      const pq = cq === 1 ? 4 : cq - 1;
      return { previous: `${pq}분기`, current: `${cq}분기` };
    }
    case "year":
      return { previous: `${y - 1}년`, current: `${y}년` };
  }
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
