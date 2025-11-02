import React from "react";
import { Task } from "@/lib/types/task";

type WeekTaskProps = { task: Task };

export default function WeekTask({ task }: WeekTaskProps) {
  return (
    <div
      className="rounded-md text-white text-xs p-2 shadow-md cursor-pointer overflow-hidden"
      style={{
        backgroundColor: task.color,
        opacity: 0.9,
      }}
    >
      <h3 className="font-semibold truncate">{task.title}</h3>
      <p className="truncate text-white/80">{task.category}</p>
      <span className="text-[10px] text-white/70">{task.duration} min</span>
    </div>
  );
}
