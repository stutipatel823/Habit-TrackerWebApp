// src/components/calendar/week/WeekTask.tsx

import type { ScheduleWithTaskItem } from "@/lib/types/schedule";
import { ScheduleMode } from "@/lib/types/scheduleMode";
import { format } from "date-fns";

interface WeekTaskProps {
  item: ScheduleWithTaskItem;
  onClick: () => void;
  type: ScheduleMode;
}

function withOpacity(hex: string, alphaHex: string) {
  if (hex.length === 7) return hex + alphaHex;
  return hex;
}

export default function WeekTask({
  item,
  onClick,
  type
}: WeekTaskProps) {
  const start = format(new Date(item.start_time), "hh:mma").toLowerCase();
  const end = format(new Date(item.end_time), "hh:mma").toLowerCase();
  return (
    <div
      className="rounded-md bg-white border cursor-pointer overflow-hidden h-full p-2 flex space-x-2"
      onClick={onClick}
      style={{
        // borderColor: item.color,
        backgroundColor: 
          type === "planned" ? withOpacity(item.color, "10") : 'white',
      }}
    >
      {/* COLOR BAR */}
      <div
        className="h-full w-1.5 rounded-md"
        style={{ backgroundColor: item.color }}
      />

      {/* MAIN CONTENT (column layout) */}
      <div className="w-full">
        {/* Title */}
        <div className="text-black font-bold flex items-center text-md">
          <p>
            {item.icon} {item.title}
          </p>
        </div>
        {/* Timings */}
        <div className="flex items-center space-x-0.5 text-neutral-500 text-xs">
          <p className="truncate">{start}</p>
          <span>-</span>
          <p className="truncate">{end}</p>
        </div>
        {/* Description BELOW title + timings */}
        <div className="overflow-hidden truncate text-xs">
          Sample: link for Description
        </div>
      </div>
    </div>
  );
}
