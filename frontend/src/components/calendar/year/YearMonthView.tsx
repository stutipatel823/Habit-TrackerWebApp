// src/componentes/calendar/year/YearMonthView.tsx
import React from 'react';
import YearDayCell from './YearDayCell';
import { ScheduleWithTaskItem } from '@/lib/types/schedule';

interface YearMonthViewProps {
  month: number; // 0 = January
  year: number;
  tasksByDate: Record<string, ScheduleWithTaskItem[]>;
}

export default function YearMonthView({ month, year, tasksByDate }: YearMonthViewProps) {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthName = new Date(year, month).toLocaleString("default", { month: "long" });
  const weekDays = ["S", "M", "T", "W", "T", "F", "S"];

  const firstDay = new Date(year, month, 1).getDay();
  const emptyCells = Array.from({ length: firstDay }, (_, i) => i);

  const today = new Date();
  const todayStr = today.toISOString().slice(0,10);

  // Compute current week range in this month
  const currentWeekDays: string[] = [];
  let weekStart = -1;
  if (today.getFullYear() === year && today.getMonth() === month) {
    weekStart = today.getDate() - today.getDay(); // Sunday of current week
    for (let i = 0; i < 7; i++) {
      const d = weekStart + i;
      if (d > 0 && d <= daysInMonth) {
        const dateStr = `${year}-${String(month + 1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
        currentWeekDays.push(dateStr);
      }
    }
  }

  // Build all days including empty cells
  const allDays = [
    ...emptyCells.map(() => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  // Group days into weeks (rows of 7)
  const weeks: (number | null)[][] = [];
  for (let i = 0; i < allDays.length; i += 7) {
    weeks.push(allDays.slice(i, i + 7));
  }

  return (
    <div className='w-fit max-h-[400px] overflow-y-auto p-2 rounded-lg'>
      <h1 className="font-bold text-center mb-2 sticky top-0 bg-white z-10">{monthName} {year}</h1>

      <div className='grid grid-cols-7 text-center font-semibold'>
        {weekDays.map((day, index) => <div key={index}>{day}</div>)}
      </div>

      <div className="mt-1 space-y-1">
        {weeks.map((week, weekIndex) => {
          // Check if this week contains the current week
          const isCurrentWeekRow = week.some(day => {
            if (!day) return false;
            const dateStr = `${year}-${String(month + 1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
            return currentWeekDays.includes(dateStr);
          });

          return (
            <div
              key={weekIndex}
              className={`grid grid-cols-7 ${isCurrentWeekRow ? 'bg-sky-100 rounded-md' : ''}`}
            >
              {week.map((day, dayIndex) => {
                if (!day) return <div key={dayIndex} />;

                const dateStr = `${year}-${String(month + 1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
                const dayTasks = tasksByDate[dateStr] || [];
                const isCurrentWeek = currentWeekDays.includes(dateStr);

                return <YearDayCell
                  key={dayIndex}
                  day={day}
                  dateStr={dateStr}
                  tasks={dayTasks}
                  isCurrentWeek={isCurrentWeek}
                />;
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
