// src/components/calendar/day/DayHeader.tsx

import { format } from "date-fns";
import clsx from "clsx";

interface DayHeaderProps {
  date: Date;
}

export default function DayHeader({ date }: DayHeaderProps) {
  const todayString = new Date().toDateString();
  const isCurrent = todayString === date.toDateString();

  return (
    <div
       className="grid grid-cols-8 text-center border-b bg-gray-50 sticky top-0 z-30"
    >
      {/* Time label column */}
      <div className="col-span-1 p-2 font-medium text-gray-600 border-r bg-gray-50">
        Time
      </div>

      {/* Day column (7/8) */}
      <div
        className={clsx(
          "col-span-7 p-2 font-medium border-r bg-gray-50",
          isCurrent && "text-blue-600 font-extrabold"
        )}
      >
        {format(date, "EEEE, MMM dd")}
      </div>
    </div>
  );
}


