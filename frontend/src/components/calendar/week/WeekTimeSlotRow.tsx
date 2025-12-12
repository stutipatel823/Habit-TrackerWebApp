// components/week/WeekTimeSlotRow.tsx
import { memo, useState } from "react";
import { format } from "date-fns";
import TaskForm from "@/components/forms/TaskForm";

interface Props {
  slot: Date;
  slotHeight: number;
}

function WeekTimeSlotRow({ slot, slotHeight }: Props) {
  const [showForm, setShowForm] = useState(false);
  const isHourMark = slot.getMinutes() === 0;

  return (
    <>
      <div
        className={`grid grid-cols-8 border-b text-center bg-neutral-50 ${
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
          <div
            key={i}
            className="border-r"
            onClick={() => setShowForm(true)}
          />
        ))}
      </div>

      {/* MODAL */}
      {showForm && (
        <>
          {/* Blur + dark background */}
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            onClick={() => setShowForm(false)}
          />

          {/* Centered popup */}
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <TaskForm onClose={() => setShowForm(false)} />
          </div>
        </>
      )}
    </>
  );
}

export default memo(WeekTimeSlotRow);
