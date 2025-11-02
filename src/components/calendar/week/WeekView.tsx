import { format, isToday, setHours, setMinutes, startOfDay } from "date-fns";
import { tasks } from "@/data/tasksData";
import { useMemo } from "react";
import clsx from "clsx";
import WeekTask from "./WeekTask";

interface WeekViewProps {
  weekDates: Date[];
  currentDate: Date;
}

// Memoize time slots to avoid recalculating on each render
const generateTimeSlots = () => {
  const slots: Date[] = [];
  const today = startOfDay(new Date());

  for (let hour = 0; hour < 24; hour++) {
    slots.push(setMinutes(setHours(today, hour), 0));
    slots.push(setMinutes(setHours(today, hour), 30));
  }
  return slots;
};

const TimeSlotRow = ({ slot, weekDates }: { slot: Date, weekDates: Date[] }) => {
  const isHalfHour = slot.getMinutes() === 0;
  const borderTopStyle = isHalfHour ? "border-dashed" : "";

  return (
    <div className={`grid grid-cols-8 text-center h-10 border-b ${borderTopStyle}`}>
      {/* Time Label Column */}
      <div className="p-1 flex justify-center items-center text-gray-500 border-r">
        {format(slot, "h:mm a").toLowerCase()}
      </div>

      {/* Empty cells for each weekday */}
      {weekDates.map((date, i) => (
        <div key={i} className="border-r" />
      ))}
    </div>
  );
};

export default function WeekView({ weekDates }: WeekViewProps) {
  const todayString = new Date().toDateString(); // Calculate this once
  const timeSlots = useMemo(generateTimeSlots, []);

  return (
    <div className="border rounded-xl">
      {/* Header Row */}
      <div className="grid grid-cols-8 text-center border-b">
        <div className="p-2 font-medium text-gray-600 border-r">Time</div>
        {weekDates.map((date, idx) => {
          const isCurrent = todayString === date.toDateString();
          return (
            <div
              key={date.toISOString()}
              className={clsx(
                "p-2",
                idx < weekDates.length - 1 ? "border-r" : "",
                isCurrent ? "text-brand-blue font-extrabold" : "text-gray-800 font-medium"
              )}
            >
              {format(date, "EEE dd")}
            </div>
          );
        })}
      </div>

      {/* Time Slot Rows */}
      <div className="relative">
        {timeSlots.map((slot, rowIndex) => (
          <TimeSlotRow key={rowIndex} slot={slot} weekDates={weekDates} />
        ))}
      </div>
      {/* Overlap Tasks */}
      <div>
        <WeekTask task={tasks[1]}/>
      </div>
    </div>
  );
}