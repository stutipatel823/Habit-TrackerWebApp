import { isSameDay, isSameMonth, format } from "date-fns";
import { tasks } from "@/data/tasksData";
import TaskItem from "@/app/task/components/TaskItem";
type DayCellProps = {
  day: Date;
  monthStart: Date;
  isLastRow?: boolean;
  isLastCol?: boolean;
  view: "year"|"month"|"week"|"day";
};

export default function DayCell({ day, monthStart, isLastRow, isLastCol, view}: DayCellProps) {
  return (
    <div
      className={`h-35 bg-brand-lightblue flex flex-col items-center p-1 text-center
        ${!isLastRow ? "border-b" : ""}
        ${!isLastCol ? "border-r" : ""}`}
    >
      {/* Date bubble */}
      <div
        className={`w-6 h-6 flex items-center justify-center rounded-full mb-1
          ${isSameDay(day, new Date()) ? "bg-blue-500 text-white" : ""}
          ${!isSameMonth(day, monthStart) ? "text-gray-400" : ""}`}
      >
        {format(day, "d")}
      </div>
      {tasks
        .filter((task) => isSameDay(new Date(task.expected_at), day))
        .slice(0, 3)
        .map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            variant={view}
            onClick={(t) => console.log("Open modal for:", t)}
          />
        ))}
    </div>
  );
}
