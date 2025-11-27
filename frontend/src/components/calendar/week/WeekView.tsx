import {
  format,
  startOfDay,
  setHours,
  setMinutes,
  isSameDay,
  parseISO,
} from "date-fns";
import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import WeekTask from "./WeekTask";
import { getExpectedScheduleItems } from "@/api/expected_api";
import type { ScheduleItem } from "@/lib/types/schedule";

interface WeekViewProps {
  weekDates: Date[];
  currentDate: Date;
}

const generateTimeSlots = () => {
  const slots: Date[] = [];
  const today = startOfDay(new Date());

  for (let hour = 0; hour < 24; hour++) {
    slots.push(setMinutes(setHours(today, hour), 0));
    slots.push(setMinutes(setHours(today, hour), 30));
  }
  return slots;
};

const TimeSlotRow = ({
  slot,
  weekDates,
  slotHeight,
}: {
  slot: Date;
  weekDates: Date[];
  slotHeight: number;
}) => {
  const isHourMark = slot.getMinutes() === 0;
  const borderTopStyle = isHourMark ? "border-dashed" : "";

  return (
    <div
      className={`grid grid-cols-8 text-center border-b ${borderTopStyle}`}
      style={{ height: `${slotHeight}px` }}
    >
      <div className="p-1 flex justify-center items-center text-gray-500 border-r ">
        {format(slot, "h:mm a").toLowerCase()}
      </div>
      {weekDates.map((d, i) => (
        <div key={i} className="border-r" />
      ))}
    </div>
  );
};

export default function WeekView({ weekDates, currentDate }: WeekViewProps) {
  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([]);

  useEffect(() => {
    (async () => {
      const items = await getExpectedScheduleItems(weekDates[0], weekDates[6]);

      // Compute duration if not provided
      const normalized = items.map((item: ScheduleItem) => {
        const duration =
          new Date(item.end_time).getTime() -
          new Date(item.start_time).getTime();

        return { ...item, duration };
      });

      setScheduleItems(normalized);
    })();
  }, [weekDates]);

  const todayString = new Date().toDateString();
  const timeSlots = useMemo(generateTimeSlots, []);

  const slotHeight = 40;
  const totalHeight = timeSlots.length * slotHeight;

  const columns = 8;
  const columnWidthPercent = 100 / columns;

  return (
    <div className="border rounded-xl relative overflow-hidden">
      {/* Header */}
      <div className="grid grid-cols-8 text-center border-b bg-gray-50">
        <div className="p-2 font-medium text-gray-600 border-r">Time</div>
        {weekDates.map((date, idx) => {
          const isCurrent = todayString === date.toDateString();
          return (
            <div
              key={date.toISOString()}
              className={clsx(
                "p-2",
                idx < weekDates.length - 1 ? "border-r" : "",
                isCurrent
                  ? "text-blue-600 font-extrabold"
                  : "text-gray-800 font-medium"
              )}
            >
              {format(date, "EEE dd")}
            </div>
          );
        })}
      </div>

      {/* Grid container */}
      <div className="relative" style={{ height: `${totalHeight}px` }}>
        {timeSlots.map((slot, rowIndex) => (
          <TimeSlotRow
            key={rowIndex}
            slot={slot}
            weekDates={weekDates}
            slotHeight={slotHeight}
          />
        ))}

        {/* Schedule Items */}
        {scheduleItems.map((item) => {
          const start = parseISO(item.start_time);
          const dayIndex = weekDates.findIndex((d) => isSameDay(d, start));
          if (dayIndex === -1) return null;

          const startMinutes =
            start.getHours() * 60 + start.getMinutes();

          const top = (startMinutes / 30) * slotHeight;
          const height = (item.duration! / 1000 / 60 / 30) * slotHeight;

          const leftPercent = ((dayIndex + 1) / columns) * 100;
          const widthCalc = `${columnWidthPercent}%`;

          return (
            <div
              key={item.schedule_id}
              className="absolute px-1"
              style={{
                top: `${top}px`,
                left: `calc(${leftPercent}% + 2px)`,
                width: `calc(${widthCalc} - 4px)`,
                height: `${height}px`,
                zIndex: 10,
                overflow: "hidden",
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
