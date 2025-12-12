"use client";

import React, { useEffect, useState } from "react";
import { format, getDaysInMonth, getDay } from "date-fns";
import { getExpectedScheduleItems, deleteExpectedScheduleItem } from "@/api/expected_api";
import type { ScheduleWithTaskItem } from "@/lib/types/schedule";

interface YearViewProps {
  currentYear: number;
}

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function YearView({ currentYear }: YearViewProps) {
  const [tasks, setTasks] = useState<ScheduleWithTaskItem[]>([]);

  const months = Array.from({ length: 12 }).map((_, i) => new Date(currentYear, i, 1));

  useEffect(() => {
    async function fetchTasks() {
      const start = new Date(currentYear, 0, 1);
      const end = new Date(currentYear + 1, 0, 1);
      const allTasks = await getExpectedScheduleItems(start, end);
      setTasks(allTasks);
    }
    fetchTasks();
  }, [currentYear]);

  // Group tasks by date string "YYYY-MM-DD"
  const tasksByDate: Record<string, ScheduleWithTaskItem[]> = {};
  tasks.forEach(task => {
    const dateStr = task.start_time.slice(0, 10); // "YYYY-MM-DD"
    if (!tasksByDate[dateStr]) tasksByDate[dateStr] = [];
    if (tasksByDate[dateStr].length < 5) tasksByDate[dateStr].push(task); // max 5 per day
  });

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-lg mb-2">Year View</h2>
      <div className="grid grid-cols-3 gap-4">
        {months.map((month, i) => {
          const daysInMonth = getDaysInMonth(month);
          const firstDay = getDay(month); // 0 = Sunday
          const monthStr = format(month, "MMMM");

          const daysArray = Array.from({ length: daysInMonth }, (_, j) => j + 1);

          return (
            <div key={i} className="p-5 border rounded-md">
              <div className="text-center font-medium mb-1">{monthStr}</div>

              {/* Weekday headers */}
              <div className="grid grid-cols-7 text-xs text-gray-500 mb-1">
                {weekdays.map((d) => (
                  <div key={d} className="text-center">{d}</div>
                ))}
              </div>

              {/* Days grid */}
              <div className="grid grid-cols-7 text-xs">
                {/* Empty placeholders for first day offset */}
                {Array.from({ length: firstDay }).map((_, idx) => (
                  <div key={`empty-${idx}`} />
                ))}

                {daysArray.map(day => {
                  const dateStr = `${currentYear}-${String(month.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                  const dayTasks = tasksByDate[dateStr] || [];

                  return (
                    <div
                      key={day}
                      className="relative w-8 h-8 flex flex-col items-center justify-center border rounded cursor-pointer hover:bg-gray-100"
                      title={dayTasks.map(t => t.title).join(", ")}
                    >
                      <span>{day}</span>
                      <div className="flex flex-wrap justify-center absolute bottom-1">
                        {dayTasks.map((t, idx) => (
                          <div
                            key={idx}
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: t.color }}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
