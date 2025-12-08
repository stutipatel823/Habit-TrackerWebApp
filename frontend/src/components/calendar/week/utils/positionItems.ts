// components/week/utils/positionItems.ts
import { parseISO, isSameDay } from "date-fns";
import type { PositionedScheduleItem, ScheduleWithTaskItem } from "@/lib/types/schedule";

export function positionItems(
  items: ScheduleWithTaskItem[],
  weekDates: Date[],
  slotHeight: number
): PositionedScheduleItem[] {
  const positioned: PositionedScheduleItem[] = [];

  items.forEach((item) => {
    const start = parseISO(item.start_time);
    const dayIndex = weekDates.findIndex((d) => isSameDay(d, start));
    if (dayIndex === -1) return;

    const startMinutes = start.getHours() * 60 + start.getMinutes();

    positioned.push({
      ...item,
      dayIndex,
      top: (startMinutes / 30) * slotHeight,
      height: (item.duration / 30) * slotHeight,
    });
  });

  return positioned;
}
