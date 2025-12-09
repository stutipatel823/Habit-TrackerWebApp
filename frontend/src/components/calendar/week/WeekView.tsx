// src/components/calendar/week/WeekView.tsx

import { useEffect, useMemo, useState } from "react";
import { generateTimeSlots } from "./utils/timeSlots";
import { positionItems } from "./utils/positionItems";
import WeekHeader from "./WeekHeader";
import WeekSlotGrid from "./WeekSlotGrid";
import WeekTask from "./WeekTask";
import { deleteExpectedScheduleItem, getExpectedScheduleItems } from "@/api/expected_api";
import type { PositionedScheduleItem, ScheduleWithTaskItem } from "@/lib/types/schedule";
import DeleteItem from "@/components/ui/DeleteItem";

interface WeekViewProps {
  weekDates: Date[];
  currentDate: Date;
}

export default function WeekView({ weekDates }: WeekViewProps) {
  const [scheduleItems, setScheduleItems] = useState<ScheduleWithTaskItem[]>([]);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const slotHeight = 40;

  // Fetch schedule items for this week
  useEffect(() => {
  (async () => {
    if (!weekDates || weekDates.length < 7) return;

    const start = new Date(weekDates[0].getTime()); // copy Sunday
    const end = new Date(weekDates[6].getTime() + 24 * 60 * 60 * 1000 - 1); // Saturday 23:59:59.999

    const items = await getExpectedScheduleItems(start, end);
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
  const columns = 8
  const colWidth = 100 / columns;

  // Toggle on click
  const handleTaskClick = (id: string) => {
    setSelectedTaskId(prev => (prev === id ? null : id));
  };

  return (
    <div className="border rounded-xl overflow-hidden">
      <WeekHeader weekDates={weekDates} />

      {/* Grid */}
      <div className="relative" style={{ height: `${totalHeight}px` }}>
        <WeekSlotGrid timeSlots={timeSlots} slotHeight={slotHeight} />

        {/* Tasks */}
        {positionedItems.map((item: PositionedScheduleItem) => {
          const leftPercent = ((item.dayIndex + 1) / columns) * 100;

          return (
            <div
              key={item.schedule_id}
              className={`absolute px-1 z-10 overflow-visible ${
                selectedTaskId === item.schedule_id ? "z-[999]" : "z-10"
              }`}
              style={{
                top: `${item.top}px`,
                left: `calc(${leftPercent}% + 2px)`,
                width: `calc(${colWidth}% - 4px)`,
                height: `${item.height}px`,
              }}
            >

              {/* Task */}
              <WeekTask
                item={item}
                onClick={() => {handleTaskClick(item.schedule_id); console.log(item.schedule_id)}}
              />

              {/* Delete Button (only if selected) */}
              {selectedTaskId === item.schedule_id && (
                
                <div className={`absolute -right-5 -top-2 z-50 ${
                  item.dayIndex === 6 ? "-left-8" : "-right-8"
                }`}>
                  <DeleteItem
                    bgColor={item.color}
                    deleteFunction={async () => {
                      // Your delete logic (API + local state)
                      await deleteExpectedScheduleItem(item.schedule_id);
                      setScheduleItems(prev => prev.filter(i => i.schedule_id !== item.schedule_id));
                      setSelectedTaskId(null);
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
