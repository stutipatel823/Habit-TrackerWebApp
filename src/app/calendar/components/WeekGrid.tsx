import WeekCell from "./WeekCell";
import { format, setHours, setMinutes, startOfDay, addMinutes } from "date-fns";
import { Task } from "@/lib/task";

interface WeekViewProps {
  weekDates: Date[];
  currentDate: Date;
  tasks?: Task[];
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

export default function WeekView({ weekDates, currentDate, tasks = [] }: WeekViewProps) {
  const timeSlots = generateTimeSlots();

  return (
    <div className="border rounded-xl">
      {/* Header Row */}
      <div className="grid grid-cols-8 text-center border-b">
        <div className="p-2 font-medium text-gray-600 border-r">Time</div>
        {weekDates.map((date, idx) => {
          const isCurrent = currentDate.toDateString() === date.toDateString();
          return (
            <div
              key={date.toISOString()}
              className={`p-2 font-medium ${idx < weekDates.length - 1 ? "border-r" : ""} ${
                isCurrent ? "text-brand-blue" : "text-gray-800"
              }`}
            >
              {format(date, "EEE dd")}
            </div>
          );
        })}
      </div>

      {/* Time Slot Rows */}
      <div className="relative">
        {timeSlots.map((slot, rowIndex) => {
          const isDashed = slot.getMinutes() === 30;
          const borderStyle = isDashed ? "border-dashed" : "border-solid";

          return (
            <div
              key={rowIndex}
              className={`grid grid-cols-8 text-sm text-center h-10 border-b ${borderStyle}`}
            >
              {/* Time Label */}
              <div className="p-1 flex justify-center items-center text-xs text-gray-500 border-r">
                {format(slot, "h:mm a").toLowerCase()}
              </div>

              {/* Cells for each day */}
              {weekDates.map((date) => {
                const tasksForCell = tasks.filter(
                  (task) =>
                    new Date(task.expected_at).toDateString() === date.toDateString() &&
                    new Date(task.expected_at).getHours() === slot.getHours() &&
                    new Date(task.expected_at).getMinutes() === slot.getMinutes()
                );

                return (
                  <WeekCell
                    key={date.toISOString() + slot.toISOString()}
                    date={date}
                    time={slot}
                    tasks={tasksForCell}
                    onClick={() => console.log("Clicked slot", date, slot)}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
