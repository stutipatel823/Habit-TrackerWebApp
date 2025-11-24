import { isSameDay, isToday, format } from "date-fns";
import MonthTask from "./MonthTask";
import { tasks } from "@/data/tasksData";

interface MonthDayCellProps {
  day: Date;
  monthStart: Date;
  isLastRow?: boolean;
  isLastCol?: boolean;
}

export default function MonthDayCell({
  day,
  monthStart,
  isLastRow = false,
  isLastCol = false,
}: MonthDayCellProps) {
  const dayTasks = tasks.filter((task) =>
    isSameDay(new Date(task.expected_at), day)
  );

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
        {dayTasks.slice(0, 3).map((task) => (
          <MonthTask key={task.id} task={task} />
        ))}
        {dayTasks.length > 3 && (
          <span className="text-gray-500 text-xs">+{dayTasks.length - 3} more</span>
        )}
      </div>
    </div>
  );
}
