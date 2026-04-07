"use client";

import {
  Bar,
  BarItem,
  BarsWrapper,
  ChartBottomLine,
  ChartContent,
  ChartHeader,
  ChartTitleRow,
  Description,
  Wrapper,
} from "./styles";
import {
  BarChartProps,
  ComparePeriodType,
  formatChartAmount,
  getCompareDescription,
  getEmptyLabels,
  getPeriodTriggerLabel,
} from "./types";
import Dropdown, { DropdownItem } from "@/shared/ui/Dropdown";
import { useMemo, useState } from "react";

import React from "react";
import { Typography } from "@mui/material";
import { colors } from "@/styles/theme/tokens/color";

export const BarChart = ({
  month,
  compareData,
  defaultPeriod = "month",
}: BarChartProps) => {
  const [selectedPeriod, setSelectedPeriod] =
    useState<ComparePeriodType>(defaultPeriod);

  const items = compareData[selectedPeriod] ?? [];
  const isEmpty = items.length < 2;

  const previousItem = items[0] ?? { label: "", amount: 0 };
  const currentItem = items[1] ?? { label: "", amount: 0 };

  const maxAmount = useMemo(
    () => Math.max(previousItem.amount, currentItem.amount, 1),
    [previousItem.amount, currentItem.amount],
  );

  const previousHeight = (previousItem.amount / maxAmount) * 100;
  const currentHeight = (currentItem.amount / maxAmount) * 100;

  const emptyLabels = getEmptyLabels(month, selectedPeriod);

  if (isEmpty) {
    return (
      <Wrapper>
        <ChartHeader>
          <ChartTitleRow>
            <div style={{ width: "120px" }}>
              <Dropdown valueLabel={getPeriodTriggerLabel(selectedPeriod)}>
                <DropdownItem
                  onClick={() => {
                    setSelectedPeriod("month");
                  }}
                >
                  전달
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    setSelectedPeriod("quarter");
                  }}
                >
                  전분기
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    setSelectedPeriod("year");
                  }}
                >
                  전년도
                </DropdownItem>
              </Dropdown>
            </div>

            <Typography variant="h2">대비 지출금액</Typography>
          </ChartTitleRow>

          <Description variant="body1">
            가계부를 작성하고 지출을 확인해보세요!
          </Description>
        </ChartHeader>

        <ChartContent>
          <BarsWrapper>
            <BarItem>
              <Typography
                variant="body2"
                fontWeight={700}
                color={colors.gray[450]}
              >
                ?원
              </Typography>
              <Bar heightPercent={80} backgroundColor={colors.gray[250]}>
                <Typography
                  variant="body2"
                  fontWeight={700}
                  color={colors.white}
                >
                  {emptyLabels.previous}
                </Typography>
              </Bar>
            </BarItem>

            <BarItem>
              <Typography
                variant="body2"
                fontWeight={700}
                color={colors.gray[450]}
              >
                ?원
              </Typography>
              <Bar heightPercent={100} backgroundColor={colors.primary.l[600]}>
                <Typography
                  variant="body2"
                  fontWeight={700}
                  color={colors.white}
                >
                  {emptyLabels.current}
                </Typography>
              </Bar>
            </BarItem>
          </BarsWrapper>

          <ChartBottomLine />
        </ChartContent>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <ChartHeader>
        <ChartTitleRow>
          <div style={{ width: "120px" }}>
            <Dropdown valueLabel={getPeriodTriggerLabel(selectedPeriod)}>
              <DropdownItem
                onClick={() => {
                  setSelectedPeriod("month");
                }}
              >
                전달
              </DropdownItem>
              <DropdownItem
                onClick={() => {
                  setSelectedPeriod("quarter");
                }}
              >
                전분기
              </DropdownItem>
              <DropdownItem
                onClick={() => {
                  setSelectedPeriod("year");
                }}
              >
                전년도
              </DropdownItem>
            </Dropdown>
          </div>

          <Typography variant="h2">대비 지출금액</Typography>
        </ChartTitleRow>

        <Description variant="body1">
          {getCompareDescription(previousItem, currentItem)}
        </Description>
      </ChartHeader>

      <ChartContent>
        <BarsWrapper>
          <BarItem>
            <Typography variant="body2" fontWeight={700}>
              {formatChartAmount(previousItem.amount)}
            </Typography>
            <Bar
              heightPercent={previousHeight}
              backgroundColor={colors.secondary.main}
            >
              <Typography variant="body2" fontWeight={700} color={colors.white}>
                {previousItem.label}
              </Typography>
            </Bar>
          </BarItem>

          <BarItem>
            <Typography variant="body2" fontWeight={700}>
              {formatChartAmount(currentItem.amount)}
            </Typography>
            <Bar
              heightPercent={currentHeight}
              backgroundColor={colors.primary.main}
            >
              <Typography variant="body2" fontWeight={700} color={colors.white}>
                {currentItem.label}
              </Typography>
            </Bar>
          </BarItem>
        </BarsWrapper>

        <ChartBottomLine />
      </ChartContent>
    </Wrapper>
  );
};
