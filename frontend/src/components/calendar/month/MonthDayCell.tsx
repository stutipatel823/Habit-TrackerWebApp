// components/month/MonthDayTask.tsx

import { isToday, format } from "date-fns";
import MonthTask from "./MonthTask";
import type { ScheduleWithTaskItem } from "@/lib/types/schedule";

interface MonthDayCellProps {
  day: Date;
  tasks: ScheduleWithTaskItem[]; // tasks for this day only
  isLastRow?: boolean;
  isLastCol?: boolean;
}

export default function MonthDayCell({
  day,
  tasks,
  isLastRow = false,
  isLastCol = false,
}: MonthDayCellProps) {
  return (
    <div
      className={`
        min-h-[150px] p-1 flex flex-col items-center cursor-pointer bg-neutral-50
        ${!isLastRow ? "border-b" : ""}
        ${!isLastCol ? "border-r" : ""}
      `}
    >
      {/* Date Number */}
      <div
        className={`mb-1 w-6 h-6 rounded-full flex justify-center items-center ${
          isToday(day) ? "bg-blue-500 text-white" : ""
        }`}
      >
        {format(day, "d")}
      </div>

      {/* Tasks */}
      <div className="flex flex-col gap-1 w-full">
        {tasks.slice(0, 3).map((task, index) => (
          <MonthTask key={`${task.schedule_id}-${index}`} task={task} />
        ))}

        {tasks.length > 3 && (
          <span className="text-gray-500 text-xs">
            +{tasks.length - 3} more
          </span>
        )}
      </div>
    </div>
  );
}
