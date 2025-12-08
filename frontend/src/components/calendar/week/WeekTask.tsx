import type { ScheduleWithTaskItem } from "@/lib/types/schedule";

interface WeekTaskProps {
  item: ScheduleWithTaskItem;
}

export default function WeekTask({ item }: WeekTaskProps) {
  return (
    <div
      className="rounded-md text-white text-xs shadow-md cursor-pointer overflow-hidden h-full p-1"
      style={{
        backgroundColor: item.color,
        opacity: 0.9,
      }}
    >
      {item.icon} {item.title}
    </div>
  );
}
