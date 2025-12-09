// src/components/calendar/week/WeekTask.tsx

import type { ScheduleWithTaskItem } from "@/lib/types/schedule";

interface WeekTaskProps {
  item: ScheduleWithTaskItem;
  onClick: () => void;
}

export default function WeekTask({ item, onClick}: WeekTaskProps) {
  return (
    <div
      className="rounded-md text-white text-xs shadow-md cursor-pointer overflow-hidden h-full p-1"
      style={{
        backgroundColor: item.color,
        opacity: 0.9,
      }}
      onClick={onClick}
    >
      {item.icon} {item.title}
      
    </div>
  );
}
