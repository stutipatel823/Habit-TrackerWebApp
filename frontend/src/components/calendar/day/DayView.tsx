import React, { useEffect, useMemo, useState } from "react";
import { generateTimeSlots } from "../week/utils/timeSlots";
import DayTimeSlotRow from "./DayTimeSlotRow";
import DayHeader from "./DayHeader";
import type { ScheduleWithTaskItem, PositionedScheduleItem } from "@/lib/types/schedule";
import { getExpectedScheduleItems, deleteExpectedScheduleItem } from "@/api/expected_api";
import DeleteItem from "@/components/ui/DeleteItem";
import { positionItemsForDay } from "./utils/positionItemsForDay";  // <-- FIXED
import DayTask from "./DayTask";
import { SLOT_HEIGHT } from "@/lib/constants";
interface DayViewProps {
  date: Date;
}

export default function DayView({ date }: DayViewProps) {
  const [scheduleItems, setScheduleItems] = useState<ScheduleWithTaskItem[]>([]);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const slotHeight = SLOT_HEIGHT;


  // Fetch items for one day
  useEffect(() => {
    async function fetchDayItems() {
      const start = new Date(date);
      start.setHours(0, 0, 0, 0);

      const end = new Date(start);
      end.setDate(end.getDate() + 1);

      const items = await getExpectedScheduleItems(start, end);
      setScheduleItems(items);
    }
    fetchDayItems();
  }, [date]);

    // 🔍 DEBUG: Print timezone + how browser interprets task times
  useEffect(() => {
    console.log("📍 Browser Timezone:", Intl.DateTimeFormat().resolvedOptions().timeZone);
    console.log("⏱ UTC Offset (minutes):", new Date().getTimezoneOffset());

    if (scheduleItems.length > 0) {
      const first = scheduleItems[0];
      console.log("🕒 Raw start_time:", first.start_time);
      console.log("🕒 Parsed local date:", new Date(first.start_time));
    }
  }, [scheduleItems]);
  // 🔍 END DEBUG

  // Position items vertically
  const positionedItems = useMemo(
    () => positionItemsForDay(scheduleItems, date, slotHeight),
    [scheduleItems, date]
  );

  // Toggle click
  const handleTaskClick = (id: string) => {
    setSelectedTaskId(prev => (prev === id ? null : id));
  };

  const timeSlots = useMemo(() => generateTimeSlots(), []);
  const totalHeight = timeSlots.length * slotHeight;

  return (
    <div className="border rounded-xl flex flex-col h-[80vh]">
      {/* Sticky header */}
      <DayHeader date={date} />

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto relative">
        {timeSlots.map((slot, idx) => (
          <DayTimeSlotRow key={idx} slot={slot} slotHeight={slotHeight} />
        ))}

        {positionedItems.map(item => (
          <div
            key={item.schedule_id}
            className={`absolute px-1 ${
              selectedTaskId === item.schedule_id ? "z-50" : "z-10"
            }`}
            style={{
              top: `${item.top}px`,
              height: `${item.height}px`,
              left: `12.5%`,
              width: `87.5%`
            }}
          >
            <DayTask
              item={item}
              onClick={() => handleTaskClick(item.schedule_id)}
            />
            {selectedTaskId === item.schedule_id && (
              <div className="absolute -left-8 -top-2 z-50">
                <DeleteItem
                  bgColor={item.color}
                  deleteFunction={async () => {
                    await deleteExpectedScheduleItem(item.schedule_id);
                    setScheduleItems(prev =>
                      prev.filter(i => i.schedule_id !== item.schedule_id)
                    );
                    setSelectedTaskId(null);
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
