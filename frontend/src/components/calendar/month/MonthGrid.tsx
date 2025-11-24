import { startOfMonth, startOfWeek, addDays } from "date-fns";
import MonthDayCell from "./MonthDayCell";

interface MonthGridProps {
  currentDate: Date;
}

export default function MonthGrid({ currentDate }: MonthGridProps) {
  const monthStart = startOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 }); // Sunday

  // Build 6 weeks grid (42 days)
  const days: Date[] = [];
  let day = calendarStart;
  for (let i = 0; i < 42; i++) {
    days.push(day);
    day = addDays(day, 1);
  }

  // Split into weeks
  const rows: Date[][] = [];
  for (let i = 0; i < 6; i++) {
    rows.push(days.slice(i * 7, i * 7 + 7));
  }

  return (
    <div className="w-full border rounded-xl overflow-hidden h-full">
      {/* Weekdays */}
      <div className="grid grid-cols-7 border-b h-12">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className=" flex flex-col  text-center  justify-center py-2 border-r last:border-r-0 font-bold">
            {d.toUpperCase()}
          </div>
        ))}
      </div>

      {/* Weeks */}
      {rows.map((week, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-7">
          {week.map((day, colIndex) => (
            <MonthDayCell
              key={colIndex}
              day={day}
              monthStart={monthStart}
              isLastRow={rowIndex === 5}
              isLastCol={colIndex === 6}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
