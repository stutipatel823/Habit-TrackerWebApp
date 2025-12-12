// src/componentes/calendar/year/YearView.tsx

"use client";

import React, { useEffect, useState, useMemo } from 'react';
import YearMonthView from './YearMonthView';
import { getExpectedScheduleItems } from '@/api/expected_api';
import { ScheduleWithTaskItem } from '@/lib/types/schedule';

interface YearViewProps {
  currentYear: number;
}

export default function YearView({ currentYear }: YearViewProps) {
  const [tasks, setTasks] = useState<ScheduleWithTaskItem[]>([]);
  const months = Array.from({ length: 12 }, (_, i) => i);

  // Fetch all tasks for the year once
  useEffect(() => {
    async function fetchYearTasks() {
      const start = new Date(currentYear, 0, 1);
      const end = new Date(currentYear + 1, 0, 1);
      const allTasks = await getExpectedScheduleItems(start, end);
      setTasks(allTasks);
    }
    fetchYearTasks();
  }, [currentYear]);

  // Pre-group tasks by date for fast lookup
  const tasksByDate = useMemo(() => {
    const map: Record<string, ScheduleWithTaskItem[]> = {};
    tasks.forEach(task => {
      const dateStr = task.start_time.slice(0, 10); // YYYY-MM-DD
      if (!map[dateStr]) map[dateStr] = [];
      map[dateStr].push(task);
    });
    return map;
  }, [tasks]);

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {months.map((monthIndex) => (
          <YearMonthView
            key={monthIndex}
            month={monthIndex}
            year={currentYear}
            tasksByDate={tasksByDate}
          />
        ))}
      </div>
    </div>
  );
}
