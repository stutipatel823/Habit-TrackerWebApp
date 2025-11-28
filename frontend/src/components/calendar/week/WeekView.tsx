import { useEffect, useMemo, useState } from "react";
import { generateTimeSlots } from "./utils/timeSlots";
import { positionItems } from "./utils/positionItems";
import WeekHeader from "./WeekHeader";
import WeekTimeSlotRow from "./WeekTimeSlotRow";
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

  useEffect(() => {
    (async () => {
      const items = await getExpectedScheduleItems(weekDates[0], weekDates[6]);
      setScheduleItems(items);
    })();
  }, [weekDates]);

  const timeSlots = useMemo(() => generateTimeSlots(), []);

  const positionedItems = useMemo(
    () => positionItems(scheduleItems, weekDates, slotHeight),
    [scheduleItems, weekDates]
  );

  const totalHeight = timeSlots.length * slotHeight;
  const columns = 8;
  const colWidth = 100 / columns;

  return (
    <div className="border rounded-xl overflow-hidden">
      {/* Header */}
      <WeekHeader weekDates={weekDates} />

      {/* Grid */}
      <div className="relative" style={{ height: `${totalHeight}px` }}>
        {timeSlots.map((slot, idx) => (
          <WeekTimeSlotRow
            key={idx}
            slot={slot}
            weekDates={weekDates}
            slotHeight={slotHeight}
          />
        ))}

        {/* Tasks (directly here) */}
        {positionedItems.map((item: PositionedScheduleItem) => {
          const leftPercent = ((item.dayIndex + 1) / columns) * 100;

          return (
            <div
              key={item.schedule_id}
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
