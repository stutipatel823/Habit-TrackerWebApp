import { useEffect, useMemo, useState } from "react";
import { generateTimeSlots } from "./utils/timeSlots";
import { positionItems } from "./utils/positionItems";
import WeekHeader from "./WeekHeader";
import WeekSlotGrid from "./WeekSlotGrid";
import WeekTask from "./WeekTask";
import { getExpectedScheduleItems } from "@/api/expected_api";

import type { PositionedScheduleItem, ScheduleItem } from "@/lib/types/schedule";

interface WeekViewProps {
  weekDates: Date[];
  currentDate: Date;
}

export default function WeekView({ weekDates }: WeekViewProps) {
  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([]);
  const slotHeight = 40;

  // Fetch schedule items for this week
  useEffect(() => {
    (async () => {
      const items = await getExpectedScheduleItems(weekDates[0], weekDates[6]);
      setScheduleItems(items);
    })();
  }, [weekDates]);

  // Only calculated ONCE
  const timeSlots = useMemo(() => generateTimeSlots(), []);

  // Calculated only when items or dates change
  const positionedItems = useMemo(
    () => positionItems(scheduleItems, weekDates, slotHeight),
    [scheduleItems, weekDates]
  );

  const totalHeight = timeSlots.length * slotHeight;
  const columns = 8;
  const colWidth = 100 / columns;

  return (
    <div className="border rounded-xl overflow-hidden">
      {/* Week header */}
      <WeekHeader weekDates={weekDates} />

      {/* The grid */}
      <div className="relative" style={{ height: `${totalHeight}px` }}>
        <WeekSlotGrid
          timeSlots={timeSlots}
          slotHeight={slotHeight}
        />

        {/* Tasks overlay */}
        {positionedItems.map((item: PositionedScheduleItem) => {
          const leftPercent = ((item.dayIndex + 1) / columns) * 100;

          return (
            <div
              key={`${item.item_id}-${item.top}-${item.dayIndex}`}
              className="absolute px-1 z-10 overflow-hidden"
              style={{
                top: `${item.top}px`,
                left: `calc(${leftPercent}% + 2px)`,
                width: `calc(${colWidth}% - 4px)`,
                height: `${item.height}px`,
              }}
            >
              <WeekTask item={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
