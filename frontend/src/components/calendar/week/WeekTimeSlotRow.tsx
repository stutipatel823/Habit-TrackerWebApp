// components/week/WeekTimeSlotRow.tsx
import { memo } from "react";
import { format } from "date-fns";

interface Props {
  slot: Date;
  slotHeight: number;
}

function WeekTimeSlotRow({ slot, slotHeight }: Props) {
  const isHourMark = slot.getMinutes() === 0;

  return (
    <div
      className={`grid grid-cols-8 border-b text-center ${
        isHourMark ? "border-dashed" : ""
      }`}
      style={{ height: `${slotHeight}px` }}
    >
      {/* Time label */}
      <div className="p-1 flex justify-center items-center text-gray-500 border-r">
        {format(slot, "h:mm a").toLowerCase()}
      </div>

      {/* Empty 7 day columns */}
      {[...Array(7)].map((_, i) => (
        <div key={i} className="border-r" />
      ))}
    </div>
  );
}

export default memo(WeekTimeSlotRow);
