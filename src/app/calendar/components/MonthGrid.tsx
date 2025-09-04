"use client";

import DayCell from "./DayCell";
import { startOfMonth, startOfWeek, addDays } from "date-fns";

export default function MonthGrid({ currentDate }: { currentDate: Date }) {
  const monthStart = startOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart);

  const days: Date[] = [];
  let day = calendarStart;
  for (let i = 0; i < 35; i++) {
    days.push(day);
    day = addDays(day, 1);
  }
  const rows: Date[][] = [];
  for (let i = 0; i < 5; i++) {
    rows.push(days.slice(i * 7, i * 7 + 7));
  }
 
  return (
    <div className="w-full border rounded-xl overflow-hidden">
      {/* Weekdays */}
      <div className="grid grid-cols-7 text-center border-b">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="py-2 border-r last:border-r-0">
            {d.toUpperCase()}
          </div>
        ))}
      </div>

      {/* Weeks */}
      {rows.map((week, rowIndex) => {
        return (
          <div key={rowIndex} className="grid grid-cols-7">
            {week.map((day, colIndex) => (
              <DayCell
                key={colIndex}
                day={day}
                monthStart={monthStart}
                isLastRow={rowIndex === rows.length-1}
                isLastCol={colIndex === week.length-1}
                view={"month"}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}
