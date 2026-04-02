"use client";

import { Box, Typography } from "@mui/material";
import dayjs from "dayjs";
import {
  DayButton,
  DayPicker,
  useDayPicker,
  type DayButtonProps,
  type WeekdayProps,
} from "react-day-picker";
import { ko } from "react-day-picker/locale";
import "react-day-picker/style.css";
import React from "react";
import { colors } from "@/styles/theme/tokens/color";
import "./Calendar.css";
import type { LedgerDashboardResponse } from "@repo/shared";

interface CalendarProps {
  month: string;
  calendar: LedgerDashboardResponse["calendar"];
}

function getDailyAmountMap(
  calendar: LedgerDashboardResponse["calendar"],
): Record<string, number> {
  return calendar.reduce<Record<string, number>>((acc, day) => {
    acc[day.date] = day.income - day.expense;
    return acc;
  }, {});
}

function LedgerWeekday(props: WeekdayProps) {
  const label = String(props.children);

  const color =
    label === "일"
      ? colors.system.error
      : label === "토"
        ? colors.primary.main
        : colors.black;

  return (
    <th
      className={props.className}
      style={{
        width: "14.28%",
        textAlign: "center",
        padding: "8px 0",
      }}
    >
      <Typography variant="body2" fontWeight={700} color={color}>
        {label}
      </Typography>
    </th>
  );
}

interface LedgerDayButtonProps extends DayButtonProps {
  amountMap: Record<string, number>;
}

function LedgerDayButton(props: LedgerDayButtonProps) {
  const { amountMap, ...dayButtonProps } = props;
  const { classNames } = useDayPicker();

  const isoDate = dayButtonProps.day.isoDate;
  const amount = amountMap[isoDate];

  const isToday =
    dayjs().format("YYYY-MM-DD") ===
    dayjs(dayButtonProps.day.date).format("YYYY-MM-DD");

  if (dayButtonProps.modifiers.hidden || dayButtonProps.modifiers.outside) {
    return <DayButton {...dayButtonProps} />;
  }

  return (
    <DayButton {...dayButtonProps} className={classNames.day_button}>
      <div
        style={{
          width: "100%",
          height: 44,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          position: "relative",
        }}
      >
        {isToday && (
          <Box
            sx={{
              position: "absolute",
              top: -3,
              width: "28px",
              height: "28px",
              backgroundColor: colors.gray[150],
              borderRadius: "99px",
            }}
          />
        )}

        <Typography
          variant="body2"
          fontWeight={700}
          color={isToday ? colors.black : colors.gray[450]}
          sx={{ zIndex: 1 }}
        >
          {dayButtonProps.day.date.getDate()}
        </Typography>

        {amount !== undefined && amount !== 0 && (
          <span
            style={{
              fontSize: 10,
              fontWeight: 400,
              color: amount > 0 ? colors.primary.main : colors.system.error,
              zIndex: 1,
            }}
          >
            {amount > 0
              ? `+${amount.toLocaleString()}`
              : amount.toLocaleString()}
          </span>
        )}
      </div>
    </DayButton>
  );
}

export const Calendar = ({ month, calendar }: CalendarProps) => {
  const amountMap = getDailyAmountMap(calendar);

  return (
    <DayPicker
      mode="single"
      month={dayjs(`${month}-01`).toDate()}
      showOutsideDays={false}
      fixedWeeks
      locale={ko}
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
      components={{
        Weekday: LedgerWeekday,
        DayButton: (props) => (
          <LedgerDayButton {...props} amountMap={amountMap} />
        ),
      }}
    />
  );
};
