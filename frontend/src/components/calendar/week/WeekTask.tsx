// src/components/calendar/week/WeekTask.tsx

import type { ScheduleWithTaskItem } from "@/lib/types/schedule";
import { format } from "date-fns";

interface WeekTaskProps {
  item: ScheduleWithTaskItem;
  onClick: () => void;
  type?: "dribble" | "google" | "universal"; // default is universal
}

function withOpacity(hex: string, alphaHex: string) {
  if (hex.length === 7) return hex + alphaHex;
  return hex;
}

export default function WeekTask({
  item,
  onClick,
  type = "dribble",
}: WeekTaskProps) {
  const start = format(new Date(item.start_time), "hh:mma").toLowerCase();
  const end = format(new Date(item.end_time), "hh:mma").toLowerCase();

  //
  // DRIBBLE STYLE
  //
  if (type === "dribble") {
    return (
      <div
        className="rounded-md bg-white border cursor-pointer overflow-hidden h-full p-1"
        onClick={onClick}
      >
        <div className="h-[5px] rounded-md" style={{ backgroundColor: item.color }} />

        <div className="text-black font-bold flex items-center text-[14px]">
          {item.icon} {item.title}
        </div>

        <div className="flex items-center space-x-0.5 text-neutral-500 text-xs">
          <p className="truncate">{start}</p>
          <span>-</span>
          <p className="truncate">{end}</p>
        </div>
      </div>
    );
  }

  //
  // GOOGLE STYLE
  //
  if (type === "google") {
    return (
      <div
        className="rounded-md cursor-pointer overflow-hidden h-full p-1"
        style={{ backgroundColor: item.color }}
        onClick={onClick}
      >
        <div className="text-white font-bold flex items-center text-[14px]">
          {item.icon} {item.title}
        </div>

        <div className="text-white flex items-center space-x-0.5 text-xs">
          <p className="truncate">{start}</p>
          <span>-</span>
          <p className="truncate">{end}</p>
        </div>
      </div>
    );
  }

  //
  // UNIVERSAL (DEFAULT)
  //
  return (
    <div
      className="rounded-md bg-white border cursor-pointer overflow-hidden h-full p-1"
      style={{
        borderColor: item.color,
        backgroundColor: withOpacity(item.color, "30"),
      }}
      onClick={onClick}
    >
      {/* <div className="h-[5px] rounded-md" style={{ backgroundColor: item.color }} /> */}

      <div className="text-black font-bold flex items-center text-[14px]">
        {item.icon} {item.title}
      </div>

      <div className="flex items-center space-x-0.5 text-neutral-500 text-xs">
        <p className="truncate">{start}</p>
        <span>-</span>
        <p className="truncate">{end}</p>
      </div>
    </div>
  );
}
