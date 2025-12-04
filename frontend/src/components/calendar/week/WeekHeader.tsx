// components/week/WeekHeader.tsx
import { format } from "date-fns";
import clsx from "clsx";

export default function WeekHeader({ weekDates }: { weekDates: Date[] }) {
  const todayString = new Date().toDateString();

  return (
    <div className="grid grid-cols-8 text-center border-b bg-gray-50">
      <div className="p-2 font-medium text-gray-600 border-r">Time</div>

      {weekDates.map((date) => {
        const isCurrent = todayString === date.toDateString();

        return (
          <div
            key={date.toISOString()}
            className={clsx(
              "p-2 border-r",
              isCurrent && "text-blue-600 font-extrabold"
            )}
          >
            {format(date, "EEE dd")}
          </div>
        );
      })}
    </div>
  );
}
