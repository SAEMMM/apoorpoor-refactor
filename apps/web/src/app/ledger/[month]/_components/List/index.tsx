"use client";

import type { LedgerCategory, LedgerTransactionsResponse } from "@repo/shared";

import React from "react";
import { Typography } from "@mui/material";
import { colors } from "@/styles/theme/tokens/color";

type Props = {
  sections: LedgerTransactionsResponse["sections"];
};

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

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("ko-KR").format(Math.abs(value));
};

const formatDate = (date: string) => {
  const d = new Date(date);
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const weekday = ["일", "월", "화", "수", "목", "금", "토"][d.getDay()];

  return `${month}월 ${day}일 ${weekday}요일`;
};

const getAmountText = (amount: number) => {
  const abs = formatCurrency(amount);
  return amount > 0 ? `+${abs}원` : `-${abs}원`;
};

const getAmountColor = (amount: number) => {
  return amount > 0 ? colors.primary.main : colors.black;
};

export const List = ({ sections }: Props) => {
  const filteredSections = sections.filter(
    (section) => section.items.length > 0,
  );

  return (
    <div>
      <Typography variant="h2" fontWeight={700} mb="16px">
        내역
      </Typography>

      {filteredSections.map((section) => (
        <div key={section.date} style={{ marginBottom: 24 }}>
          <Typography variant="body2" color={colors.gray[500]} mb="8px">
            {formatDate(section.date)}
          </Typography>

          {section.items.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "14px 0",
                borderBottom: `1px solid ${colors.gray[100]}`,
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <Typography variant="body1" fontWeight={700}>
                  {item.name}
                </Typography>

                <Typography variant="caption" color={colors.gray[400]}>
                  {item.type === "income" ? "수입" : "지출"} ·{" "}
                  {CATEGORY_LABEL_MAP[item.category]}
                </Typography>
              </div>

              <Typography
                variant="body1"
                fontWeight={700}
                color={getAmountColor(item.amount)}
              >
                {getAmountText(item.amount)}
              </Typography>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
