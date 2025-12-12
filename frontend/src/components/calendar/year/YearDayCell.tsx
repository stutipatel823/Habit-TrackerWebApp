// src/componentes/calendar/year/YearDayCell.tsx

import { ScheduleWithTaskItem } from '@/lib/types/schedule'
import React from 'react'

interface YearDayCellProps {
    day: number,
    dateStr: string, // pass full YYYY-MM-DD
    tasks: ScheduleWithTaskItem[],
    isCurrentWeek?: boolean
}

export default function YearDayCell({ day, dateStr, tasks, isCurrentWeek }: YearDayCellProps) {
  const todayStr = new Date().toISOString().slice(0,10); // YYYY-MM-DD
  const isToday = dateStr === todayStr;

  const maxDots = 3;
  const extraTasks = tasks.length > maxDots ? tasks.length - maxDots : 0;

  return (
    <div className={`
      p-1 rounded w-7 h-7 flex flex-col items-center justify-center cursor-pointer
      hover:bg-gray-200
      ${isToday ? 'bg-brand-blue text-white' : ''}
    `}>
      <span className="text-xs">{day}</span>
      <div className="flex justify-center -space-x-1 mt-0.5">
        {tasks.slice(0,maxDots).map((task, i) => (
          <div
            key={task.schedule_id}
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: task.color }}
          ></div>
        ))}
      </div>
    </div>
  )
}
