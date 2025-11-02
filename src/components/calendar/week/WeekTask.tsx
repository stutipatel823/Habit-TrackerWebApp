import React from "react";
import { Task } from "@/lib/types/task";

type TaskItemProps = {
  task: Task;
};
function WeekTask({ task }: TaskItemProps) {
  return (
    <div
      className="w-full rounded-md px-2 py-1 shadow-sm hover:shadow-md cursor-pointer overflow-hidden"
      style={{ backgroundColor: task.color }}
    >
      <h3 className="font-semibold truncate text-white">{task.title}</h3>
      <p className="text-xs truncate text-white/80">{task.category}</p>
      <span className="text-xs text-white/80">{task.duration} min</span>
    </div>
  );
}
export default WeekTask;
