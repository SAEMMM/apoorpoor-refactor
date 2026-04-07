"use client";

import Dropdown, { DropdownItem } from "@/shared/ui/Dropdown";
import { EmptyWrapper, FiltersWrapper } from "./styles";
import type {
  LedgerCategory,
  LedgerItem,
  LedgerTransactionsResponse,
  LedgerType,
} from "@repo/shared";
import React, { useMemo, useState } from "react";

import { CATEGORY_LABEL_MAP } from "@/features/ledger/constants/category";
import { DailyDrawer } from "../DailyDrawer";
import { Drawer } from "@/shared/ui/Drawer";
import { Typography } from "@mui/material";
import { colors } from "@/styles/theme/tokens/color";
import dayjs from "dayjs";
import "dayjs/locale/ko";

dayjs.locale("ko");

type Props = {
  month: string;
  sections: LedgerTransactionsResponse["sections"];
};

type TypeFilter = LedgerType | "all";
type CategoryFilter = LedgerCategory | "all";

const TYPE_LABEL_MAP: Record<TypeFilter, string> = {
  all: "전체",
  income: "수입",
  expense: "지출",
};

const INCOME_CATEGORIES: LedgerCategory[] = ["salary", "bonus", "etc"];
const EXPENSE_CATEGORIES: LedgerCategory[] = [
  "food", "cafe", "transport", "shopping", "living", "health", "culture", "gift", "etc",
];

function getCategoryOptions(type: TypeFilter): [LedgerCategory, string][] {
  if (type === "all") {
    return Object.entries(CATEGORY_LABEL_MAP) as [LedgerCategory, string][];
  }
  const categories = type === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
  return categories.map((key) => [key, CATEGORY_LABEL_MAP[key]]);
}

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

export const List = ({ month, sections }: Props) => {
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const categoryOptions = useMemo(() => getCategoryOptions(typeFilter), [typeFilter]);

  const handleTypeChange = (type: TypeFilter) => {
    setTypeFilter(type);
    setCategoryFilter("all");
  };

  const filteredSections = useMemo(() => {
    return sections
      .map((section) => ({
        ...section,
        items: section.items.filter((item) => {
          if (typeFilter !== "all" && item.type !== typeFilter) return false;
          if (categoryFilter !== "all" && item.category !== categoryFilter)
            return false;
          return true;
        }),
      }))
      .filter((section) => section.items.length > 0);
  }, [sections, typeFilter, categoryFilter]);

  const drawerItems: LedgerItem[] = selectedDate
    ? sections.find((s) => s.date === selectedDate)?.items ?? []
    : [];

  return (
    <div>
      <FiltersWrapper>
        <div style={{ width: "100px" }}>
          <Typography variant="caption" color={colors.gray[500]} mb="4px">
            분류
          </Typography>
          <Dropdown valueLabel={TYPE_LABEL_MAP[typeFilter]}>
            <DropdownItem onClick={() => handleTypeChange("all")}>
              전체
            </DropdownItem>
            <DropdownItem onClick={() => handleTypeChange("income")}>
              수입
            </DropdownItem>
            <DropdownItem onClick={() => handleTypeChange("expense")}>
              지출
            </DropdownItem>
          </Dropdown>
        </div>

        <div style={{ width: "120px" }}>
          <Typography variant="caption" color={colors.gray[500]} mb="4px">
            카테고리
          </Typography>
          <Dropdown
            valueLabel={
              categoryFilter === "all"
                ? "전체"
                : CATEGORY_LABEL_MAP[categoryFilter]
            }
          >
            <DropdownItem onClick={() => setCategoryFilter("all")}>
              전체
            </DropdownItem>
            {categoryOptions.map(([key, label]) => (
              <DropdownItem
                key={key}
                onClick={() => setCategoryFilter(key)}
              >
                {label}
              </DropdownItem>
            ))}
          </Dropdown>
        </div>
      </FiltersWrapper>

      {filteredSections.length === 0 && (
        <EmptyWrapper>
          <Typography
            fontSize={"40px"}
            fontWeight={700}
            color={colors.gray[350]}
          >
            텅 비었네요
          </Typography>
          <Typography
            textAlign={"center"}
            variant="body2"
            color={colors.gray[350]}
          >
            가계부를 작성하고
            <br />
            포인트를 받아보세요
          </Typography>
        </EmptyWrapper>
      )}

      {filteredSections.map((section) => (
        <div key={section.date} style={{ marginBottom: 24 }}>
          <Typography variant="body2" color={colors.gray[500]} mb="8px">
            {formatDate(section.date)}
          </Typography>

          {section.items.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedDate(section.date)}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "14px 0",
                borderBottom: `1px solid ${colors.gray[100]}`,
                cursor: "pointer",
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

      <Drawer
        open={selectedDate !== null}
        onClose={() => setSelectedDate(null)}
        title={
          selectedDate ? (
            <Typography variant="h2" color={colors.primary.main}>
              {dayjs(selectedDate).format("M월 D일 dddd")}
            </Typography>
          ) : undefined
        }
      >
        {selectedDate && (
          <DailyDrawer
            month={month}
            date={selectedDate}
            items={drawerItems}
          />
        )}
      </Drawer>
    </div>
  );
};
