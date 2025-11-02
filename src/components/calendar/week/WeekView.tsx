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

const TimeSlotRow = ({ slot, weekDates }: { slot: Date; weekDates: Date[] }) => {
  const isHourMark = slot.getMinutes() === 0;
  const borderTopStyle = isHourMark ? "border-dashed" : "";

  return (
    <div className={`grid grid-cols-8 text-center h-10 border-b ${borderTopStyle}`}>
      <div className="p-1 flex justify-center items-center text-gray-500 border-r">
        {format(slot, "h:mm a").toLowerCase()}
      </div>
      {weekDates.map((_, i) => (
        <div key={i} className="border-r" />
      ))}
    </div>
  );
};

export default function WeekView({ weekDates, currentDate }: WeekViewProps) {
  const todayString = new Date().toDateString();
  const timeSlots = useMemo(generateTimeSlots, []);

  // Fixed height per 30-min slot
  const slotHeight = 40; // 1 slot = 40px

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

      {/* Grid */}
      <div className="relative">
        {timeSlots.map((slot, rowIndex) => (
          <TimeSlotRow key={rowIndex} slot={slot} weekDates={weekDates} />
        ))}

        {/* Tasks */}
        {tasks.map((task) => {
          const start = parseISO(task.expected_at);
          const dayIndex = weekDates.findIndex((d) => isSameDay(d, start));
          if (dayIndex === -1) return null;

          const startMinutes = start.getHours() * 60 + start.getMinutes();
          const top = (startMinutes / 30) * slotHeight; // position by 30-min intervals
          const height = (task.duration / 30) * slotHeight;

          // Column width = (100% / 8 columns), skip first col (time labels)
          const leftPercent = ((dayIndex + 1) / 8) * 100;

          return (
            <div
              key={task.id}
              className="absolute px-1"
              style={{
                top,
                left: `calc(${leftPercent}% + 2px)`,
                width: `calc(12.5% - 4px)`,
                height,
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
