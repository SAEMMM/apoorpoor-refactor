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
  getCompareTitle,
  getPeriodTriggerLabel,
} from "./types";
import Dropdown, { DropdownItem } from "@/shared/ui/Dropdown";
import { useMemo, useState } from "react";

import React from "react";
import { Typography } from "@mui/material";
import { colors } from "@/styles/theme/tokens/color";

export const BarChart = ({
  compareData,
  defaultPeriod = "month",
}: BarChartProps) => {
  const [selectedPeriod, setSelectedPeriod] =
    useState<ComparePeriodType>(defaultPeriod);

  const items = compareData[selectedPeriod] ?? [];
  const isEmpty = items.length < 2;
  console.log(selectedPeriod, items);

  const previousItem = items[0] ?? { label: "", amount: 0 };
  const currentItem = items[1] ?? { label: "", amount: 0 };

  const maxAmount = useMemo(
    () => Math.max(previousItem.amount, currentItem.amount, 1),
    [previousItem.amount, currentItem.amount],
  );

  const previousHeight = (previousItem.amount / maxAmount) * 100;
  const currentHeight = (currentItem.amount / maxAmount) * 100;

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

            <Typography variant="h2">
              {getCompareTitle(selectedPeriod)}
            </Typography>
          </ChartTitleRow>

          <Description variant="body1">
            비교할 소비 데이터가 아직 없어요.
          </Description>
        </ChartHeader>

        <ChartContent>
          <div
            style={{
              width: "100%",
              minHeight: 180,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="body2" color={colors.gray[450]}>
              가계부를 작성하면 기간별 소비 비교를 볼 수 있어요.
            </Typography>
          </div>

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

          <Typography variant="h2">
            {getCompareTitle(selectedPeriod)}
          </Typography>
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
