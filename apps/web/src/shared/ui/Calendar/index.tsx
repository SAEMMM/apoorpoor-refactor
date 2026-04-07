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

export interface CalendarProps {
  month: string;
  readOnly?: boolean;
  selected?: Date;
  onSelect?: (date: Date) => void;
  dailyAmounts?: Record<string, number>;
}

function CalendarWeekday(props: WeekdayProps) {
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

interface CalendarDayButtonProps extends DayButtonProps {
  dailyAmounts?: Record<string, number>;
  readOnly?: boolean;
  selectedDate?: string;
  onSelectDate?: (date: Date) => void;
}

function CalendarDayButton(props: CalendarDayButtonProps) {
  const { dailyAmounts, readOnly, selectedDate, onSelectDate, ...dayButtonProps } = props;
  const { classNames } = useDayPicker();

  const isoDate = dayButtonProps.day.isoDate;
  const amount = dailyAmounts?.[isoDate];

  const isToday =
    dayjs().format("YYYY-MM-DD") ===
    dayjs(dayButtonProps.day.date).format("YYYY-MM-DD");

  const isSelected = selectedDate === isoDate;

  if (dayButtonProps.modifiers.hidden || dayButtonProps.modifiers.outside) {
    return <DayButton {...dayButtonProps} />;
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!readOnly && onSelectDate) {
      onSelectDate(dayButtonProps.day.date);
    }
    dayButtonProps.onClick?.(e);
  };

  return (
    <DayButton
      {...dayButtonProps}
      onClick={handleClick}
      className={classNames.day_button}
      style={{ cursor: readOnly ? "default" : "pointer" }}
    >
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
        {(isToday || isSelected) && (
          <Box
            sx={{
              position: "absolute",
              top: -3,
              width: "28px",
              height: "28px",
              backgroundColor: isSelected
                ? colors.primary.main
                : colors.gray[150],
              borderRadius: "99px",
            }}
          />
        )}

        <Typography
          variant="body2"
          fontWeight={700}
          color={
            isSelected
              ? colors.white
              : isToday
                ? colors.black
                : colors.gray[450]
          }
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

export const Calendar = ({
  month,
  readOnly = false,
  selected,
  onSelect,
  dailyAmounts,
}: CalendarProps) => {
  const selectedDate = selected
    ? dayjs(selected).format("YYYY-MM-DD")
    : undefined;

  return (
    <DayPicker
      mode="single"
      month={dayjs(`${month}-01`).toDate()}
      selected={selected}
      showOutsideDays={false}
      fixedWeeks
      locale={ko}
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
      components={{
        Weekday: CalendarWeekday,
        DayButton: (props) => (
          <CalendarDayButton
            {...props}
            dailyAmounts={dailyAmounts}
            readOnly={readOnly}
            selectedDate={selectedDate}
            onSelectDate={onSelect}
          />
        ),
      }}
    />
  );
};
