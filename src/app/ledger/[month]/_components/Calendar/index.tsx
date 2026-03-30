"use client";

import { colors } from "@/styles/theme/tokens/color";
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
import "./Calendar.css";
import { CalendarProps } from "./types";

const amountMap: Record<string, number> = {
  "2026-03-02": 5000,
  "2026-03-03": -5000,
  "2026-03-10": 10000,
  "2026-03-13": -10000,
  "2026-03-19": 5000,
  "2026-03-24": -10000,
};

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

function LedgerDayButton(props: DayButtonProps) {
  const { classNames } = useDayPicker();
  const isoDate = props.day.isoDate;
  const amount = amountMap[isoDate];
  const isToday =
    dayjs(new Date()).format("YYYY-MM-DD") ===
    dayjs(new Date(props.day.date)).format("YYYY-MM-DD");

  if (props.modifiers.hidden || props.modifiers.outside) {
    return <DayButton {...props} />;
  }

  return (
    <DayButton {...props} className={classNames.day_button}>
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
          {props.day.date.getDate()}
        </Typography>

        {amount !== undefined && (
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

export const Calendar = (props: CalendarProps) => {
  const { month } = props;

  return (
    <DayPicker
      mode="single"
      month={new Date(month)}
      showOutsideDays={false}
      fixedWeeks
      locale={ko}
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
      components={{
        DayButton: LedgerDayButton,
        Weekday: LedgerWeekday,
      }}
    />
  );
};
