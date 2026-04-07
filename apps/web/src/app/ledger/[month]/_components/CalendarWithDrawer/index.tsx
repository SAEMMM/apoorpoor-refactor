"use client";

import { useState } from "react";
import { Typography } from "@mui/material";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { Calendar } from "@/shared/ui/Calendar";
import { Drawer } from "@/shared/ui/Drawer";
import { DailyDrawer } from "../DailyDrawer";
import { colors } from "@/styles/theme/tokens/color";
import type {
  LedgerDashboardResponse,
  LedgerTransactionSection,
} from "@repo/shared";

dayjs.locale("ko");

interface CalendarWithDrawerProps {
  month: string;
  calendar: LedgerDashboardResponse["calendar"];
  sections: LedgerTransactionSection[];
}

function getDailyAmountMap(
  calendar: LedgerDashboardResponse["calendar"],
): Record<string, number> {
  return calendar.reduce<Record<string, number>>((acc, day) => {
    acc[day.date] = day.income - day.expense;
    return acc;
  }, {});
}

function formatDrawerTitle(date: Date): string {
  return dayjs(date).format("M월 D일 dddd");
}

export const CalendarWithDrawer = ({
  month,
  calendar,
  sections,
}: CalendarWithDrawerProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const dailyAmounts = getDailyAmountMap(calendar);

  const selectedIso = selectedDate
    ? dayjs(selectedDate).format("YYYY-MM-DD")
    : undefined;

  const selectedItems =
    sections.find((s) => s.date === selectedIso)?.items ?? [];

  const handleSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleClose = () => {
    setSelectedDate(undefined);
  };

  return (
    <>
      <Calendar
        month={month}
        dailyAmounts={dailyAmounts}
        selected={selectedDate}
        onSelect={handleSelect}
      />

      <Drawer
        open={selectedDate !== undefined}
        onClose={handleClose}
        title={
          selectedDate ? (
            <Typography variant="h2" color={colors.primary.main}>
              {formatDrawerTitle(selectedDate)}
            </Typography>
          ) : undefined
        }
      >
        <DailyDrawer items={selectedItems} />
      </Drawer>
    </>
  );
};
