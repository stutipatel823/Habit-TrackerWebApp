// src/components/calendar/week/DayTask.tsx

import type { ScheduleWithTaskItem } from "@/lib/types/schedule";
import { format } from "date-fns";

interface DayTaskProps {
  item: ScheduleWithTaskItem;
  onClick: () => void;
  type?: "dribble" | "google" | "universal"; // default is universal
}

function withOpacity(hex: string, alphaHex: string) {
  if (hex.length === 7) return hex + alphaHex;
  return hex;
}

export default function DayTask({
  item,
  onClick,
  type = "dribble",
}: DayTaskProps) {
  const start = format(new Date(item.start_time), "hh:mma").toLowerCase();
  const end = format(new Date(item.end_time), "hh:mma").toLowerCase();

  //
  // DRIBBLE STYLE
  //
  if (type === "dribble") {
    return (
      <div
        className="rounded-md bg-white border cursor-pointer overflow-hidden h-full p-1 flex"
        onClick={onClick}
      >
        {/* Color bar */}
        <div
          className="w-[5px] h-full mx-1 rounded-md"
          style={{ backgroundColor: item.color }}
        />

        {/* MAIN CONTENT (column layout) */}
        <div className="flex flex-col flex-1 px-2">
          {/* Top row: title left, time right */}
          <div className="flex items-center justify-between text-md">
            {/* Title */}
            <div className="text-black font-bold flex items-center text-[14px] space-x-1">
              <p>{item.icon}</p>
              <p>{item.title}</p>
            </div>

            {/* Timings */}
            <div className="flex items-center space-x-1 text-neutral-500">
              <p className="truncate">{start}</p>
              <span>-</span>
              <p className="truncate">{end}</p>
            </div>
          </div>

          {/* Description BELOW title + timings */}
          <div className="mt-1 text-xs text-neutral-600">
            <p>Sample link:</p>
          </div>
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
        className="text-white rounded-md cursor-pointer overflow-hidden h-full p-2"
        style={{ backgroundColor: item.color }}
        onClick={onClick}
      >
        <div className="font-bold flex items-center text-[14px]">
          {item.icon} {item.title}
        </div>

        <div className=" flex items-center space-x-0.5 text-xs">
          <p className="truncate">{start}</p>
          <span>-</span>
          <p className="truncate">{end}</p>
        </div>
        <div className="overflow-hidden truncate">
          Sample: link for Description
        </div>
      </div>
    );
  }

  //
  // UNIVERSAL (DEFAULT)
  //
  return (
    <div
      className="rounded-md bg-white border cursor-pointer overflow-hidden h-full p-2 text-sm"
      style={{
        borderColor: item.color,
        backgroundColor: withOpacity(item.color, "30"),
      }}
      onClick={onClick}
    >
      {/* <div className="h-[5px] rounded-md" style={{ backgroundColor: item.color }} /> */}

      <div className="text-black font-bold flex items-center">
        {item.icon} {item.title}
      </div>

      <div className="flex items-center space-x-0.5 text-neutral-500 text-xs">
        <p className="truncate">{start}</p>
        <span>-</span>
        <p className="truncate">{end}</p>
      </div>
      
      <div className="overflow-hidden truncate text-xs">
          Sample: link for Description
        </div>
    </div>
  );
}
