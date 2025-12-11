// src/components/calendar/day/DayTimeSlotRow.tsx

import { memo, useState } from "react";
import { format } from "date-fns";
import TaskForm from "@/components/forms/TaskForm";

interface Props {
  slot: Date;
  slotHeight: number;
}

function DayTimeSlotRow({ slot, slotHeight }: Props) {
  const [showForm, setShowForm] = useState(false);
  const isHourMark = slot.getMinutes() === 0;

  return (
    <>
      <div
        className={`grid grid-cols-8 border-b text-center ${
          isHourMark ? "border-dashed" : ""
        }`}
        style={{ height: `${slotHeight}px` }}
      >
        {/* 1/8 width — time column */}
        <div className="col-span-1 p-1 flex justify-center items-center text-gray-500 border-r">
          {format(slot, "h:mm a").toLowerCase()}
        </div>

        {/* 7/8 width — task area */}
        <div
          className="col-span-7 cursor-pointer"
          onClick={() => setShowForm(true)}
        />
      </div>

      {/* Modal */}
      {showForm && (
        <>
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            onClick={() => setShowForm(false)}
          />
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <TaskForm onClose={() => setShowForm(false)} />
          </div>
        </>
      )}
    </>
  );
}

export default memo(DayTimeSlotRow);
