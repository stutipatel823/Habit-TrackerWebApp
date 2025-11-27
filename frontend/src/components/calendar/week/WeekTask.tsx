// WeekTask.tsx
import type { ScheduleItem } from "@/lib/types/schedule";

interface WeekTaskProps {
  item: ScheduleItem; // make sure this matches what you pass in
}

export default function WeekTask({ item }: WeekTaskProps) {
  return (
    <div
      className="rounded-md text-white text-xs p-2 shadow-md cursor-pointer overflow-hidden"
      style={{
        backgroundColor: item.color,
        opacity: 0.9,
      }}
    >
    {item.icon} {item.title}
    </div>
  );
}
