"use client";

import { DayPicker } from "react-day-picker";
import dayjs from "dayjs";
import { useState } from "react";

export const Calendar = () => {
  const [selected, setSelected] = useState<Date>();
  return (
    <DayPicker
      mode="single"
      selected={selected}
      onSelect={setSelected}
      components={{
        Day: (props) => {
          const date = props.day.date;
          const isoDate = props.day.isoDate;
          console.log(props.day.date);
          return (
            <div>
              <div>{date.getDate()}</div>
            </div>
          );
        },
      }}
    />
  );
};
