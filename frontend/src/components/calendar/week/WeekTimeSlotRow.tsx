// components/week/TimeSlotRow.tsx
import { format } from "date-fns";

export default function WeekTimeSlotRow({
  slot,
  weekDates,
  slotHeight,
}: {
  slot: Date;
  weekDates: Date[];
  slotHeight: number;
}) {
  const isHourMark = slot.getMinutes() === 0;

  return (
    <div
      className={`grid grid-cols-8 border-b text-center ${
        isHourMark ? "border-dashed" : ""
      }`}
      style={{ height: `${slotHeight}px` }}
    >
      <div className="p-1 flex justify-center items-center text-gray-500 border-r">
        {format(slot, "h:mm a").toLowerCase()}
      </div>

      {weekDates.map((_, i) => (
        <div key={i} className="border-r" />
      ))}
    </div>
  );
}
