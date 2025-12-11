// components/day/utils/positionItems.ts
import { PositionedScheduleItem, ScheduleWithTaskItem } from "@/lib/types/schedule";
import { isSameDay, parseISO } from "date-fns";

export function positionItemsForDay(
  items: ScheduleWithTaskItem[],
  date: Date,
  slotHeight: number
): PositionedScheduleItem[] {
  const positioned: PositionedScheduleItem[] = []

  items.forEach((item) => {
    const start = parseISO(item.start_time);
    if (!isSameDay(start, date)) return;

    const startMinutes = start.getHours() * 60 + start.getMinutes();

    positioned.push({
      ...item,
      top: (startMinutes / 30) * slotHeight,
      height: (item.duration / 30) * slotHeight,
      dayIndex: 0 // keep this for compatibility with weekTask
    });
  });
  return positioned;
}