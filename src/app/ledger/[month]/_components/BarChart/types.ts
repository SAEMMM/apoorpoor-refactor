export type ComparePeriodType = "month" | "quarter" | "year";

export type BarChartItem = {
  label: string;
  amount: number;
};

export type BarChartCompareData = {
  month: [BarChartItem, BarChartItem];
  quarter: [BarChartItem, BarChartItem];
  year: [BarChartItem, BarChartItem];
};

export interface BarChartProps {
  compareData: BarChartCompareData;
  defaultPeriod?: ComparePeriodType;
}

const PERIOD_TRIGGER_LABEL_MAP: Record<ComparePeriodType, string> = {
  month: "전달",
  quarter: "전분기",
  year: "전년도",
};

const PERIOD_TITLE_LABEL_MAP: Record<ComparePeriodType, string> = {
  month: "대비 지출금액",
  quarter: "대비 지출금액",
  year: "대비 지출금액",
};

export const getPeriodTriggerLabel = (periodType: ComparePeriodType) => {
  return PERIOD_TRIGGER_LABEL_MAP[periodType];
};

export const getCompareTitle = (periodType: ComparePeriodType) => {
  return PERIOD_TITLE_LABEL_MAP[periodType];
};

export const formatChartAmount = (amount: number) => {
  if (amount >= 10000) {
    const value = amount / 10000;

    if (Number.isInteger(value)) {
      return `${value.toLocaleString()}만원`;
    }

    return `${value.toFixed(1)}만원`;
  }

  return `${amount.toLocaleString()}원`;
};

export const getCompareDescription = (
  previousItem: BarChartItem,
  currentItem: BarChartItem,
) => {
  const diff = currentItem.amount - previousItem.amount;

  if (diff === 0) {
    return `${previousItem.label}과 같은 금액을 썼어요`;
  }

  if (diff > 0) {
    return `${previousItem.label}보다 ${formatChartAmount(diff)} 더 썼네요`;
  }

  return `${previousItem.label}보다 ${formatChartAmount(Math.abs(diff))} 덜 썼네요`;
};
