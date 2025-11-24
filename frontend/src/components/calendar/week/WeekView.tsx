import { format, startOfDay, setHours, setMinutes, isSameDay, parseISO } from "date-fns";
import { tasks } from "@/data/tasksData";
import { useMemo } from "react";
import clsx from "clsx";
import WeekTask from "./WeekTask";

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

const TimeSlotRow = ({ slot, weekDates, slotHeight }: { slot: Date; weekDates: Date[]; slotHeight: number }) => {
  const isHourMark = slot.getMinutes() === 0;
  const borderTopStyle = isHourMark ? "border-dashed" : "";

  // Use inline height to ensure the DOM row height always equals slotHeight
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
  const todayString = new Date().toDateString();
  const timeSlots = useMemo(generateTimeSlots, []);

  // Fixed height per 30-min slot (in px)
  const slotHeight = 40; // 1 slot (30min) = 40px
  const totalHeight = timeSlots.length * slotHeight;

  // column widths (8 equal columns: 1 time column + 7 day columns)
  const columns = 8;
  const columnWidthPercent = 100 / columns; // 12.5%

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
                isCurrent ? "text-blue-600 font-extrabold" : "text-gray-800 font-medium"
              )}
            >
              {format(date, "EEE dd")}
            </div>
          );
        })}
      </div>

      {/* Grid: give it an explicit height so absolutely-positioned tasks line up */}
      <div className="relative" style={{ height: `${totalHeight}px` }}>
        {timeSlots.map((slot, rowIndex) => (
          <TimeSlotRow key={rowIndex} slot={slot} weekDates={weekDates} slotHeight={slotHeight} />
        ))}

        {/* Tasks */}
        {tasks.map((task) => {
          const start = parseISO(task.expected_at);
          const dayIndex = weekDates.findIndex((d) => isSameDay(d, start));
          if (dayIndex === -1) return null;

          // start in minutes from midnight
          const startMinutes = start.getHours() * 60 + start.getMinutes();

          // top position in px (each 30 minutes => slotHeight px)
          const top = (startMinutes / 30) * slotHeight;

          // task.duration is assumed in minutes (if it's hours, multiply accordingly)
          const height = (task.duration / 30) * slotHeight;

          // left/width as percentages (skip first column which is time)
          const leftPercent = ((dayIndex + 1) / columns) * 100; // +1 to skip time column
          const widthCalc = `${columnWidthPercent}%`; // e.g. "12.5%"

          return (
            <div
              key={task.id}
              className="absolute px-1"
              style={{
                top: `${top}px`,
                left: `calc(${leftPercent}% + 2px)`,
                width: `calc(${widthCalc} - 4px)`,
                height: `${height}px`,
                // small niceties
                zIndex: 10,
                overflow: "hidden",
              }}
            >
              <WeekTask task={task} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
