// components/month/MonthTask.tsx
import React from "react";
import { format } from "date-fns";
import { ScheduleWithTaskItem } from "@/lib/types/schedule";

type TaskItemProps = {
  task: ScheduleWithTaskItem;
};

function MonthTask({ task }: TaskItemProps) {
  return (
    <div
      className="w-full py-1 flex items-center rounded border-b shadow-sm bg-white"
      // style={{ backgroundColor: `${task.color}1A` }} // 1A = ~10% opacity in hex
    >
      {/* Color indicator */}
      <div
        className="mx-1.5 h-4 w-1 rounded-2xl shrink-0"
        style={{ backgroundColor: task.color}}
      ></div>
     
      {/* Time with fixed width */}
      <p className="text-neutral-500 truncate overflow-hidden  text-xs w-12 text-right flex-shrink-0">
        { format(new Date(task.start_time), "hh:mma").toLowerCase()}
      </p>
      <div className="ml-1">
        {task.icon}
      </div>
      {/* Dot (larger) */}
      {/* <span className="mx-1" style={{ color: task.color}}>●</span> */}
      
      {/* Title takes remaining space */}
      <p className="ml-2 truncate overflow-hidden whitespace-nowrap text-sm">
        {task.title}
      </p>

  
    </div>
  );
}

export default MonthTask;
