import { startOfMonth, startOfWeek, endOfMonth, endOfWeek, addDays } from "date-fns";
import MonthDayCell from "./MonthDayCell";
import { useEffect, useState } from "react";
import type { ScheduleItem } from "@/lib/types/schedule";
import { getExpectedScheduleItems } from "@/api/expected_api";

interface MonthGridProps {
  currentDate: Date;
}

export default function MonthGrid({ currentDate }: MonthGridProps) {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);

  // Start and end of the calendar grid
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });

  const [allTasks, setAllTasks] = useState<ScheduleItem[]>([]);
  const monthKey = `${currentDate.getFullYear()}-${currentDate.getMonth()}`;
  // Fetch all tasks for the calendar range at once
  useEffect(() => {
    const fetchMonthTasks = async () => {
      try {
        const items = await getExpectedScheduleItems(calendarStart, calendarEnd);
        setAllTasks(items);
      } catch (err) {
        console.error("Failed to fetch month tasks:", err);
      }
    };
    fetchMonthTasks();
  }, [monthKey]);

  // Build the calendar days
  const days: Date[] = [];
  let day = calendarStart;
  while (day <= calendarEnd) {
    days.push(day);
    day = addDays(day, 1);
  }

  // Split into weeks
  const rows: Date[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    rows.push(days.slice(i, i + 7));
  }

  return (
    <div className="w-full border rounded-xl overflow-hidden h-full">
      {/* Weekdays */}
      <div className="grid grid-cols-7 border-b h-12">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div
            key={d}
            className="flex flex-col text-center justify-center py-2 border-r last:border-r-0 font-bold"
          >
            {d.toUpperCase()}
          </div>
        ))}
      </div>

      {/* Weeks */}
      {rows.map((week, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-7">
          {week.map((day, colIndex) => {
            const dayTasks = allTasks.filter(
              (task) => new Date(task.start_time).toDateString() === day.toDateString()
            );

            return (
              <MonthDayCell
                key={colIndex}
                day={day}
                tasks={dayTasks}
                isLastRow={rowIndex === rows.length - 1}
                isLastCol={colIndex === 6}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
