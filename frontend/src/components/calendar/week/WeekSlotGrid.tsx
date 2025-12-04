// components/week/WeekSlotGrid.tsx
import { memo } from "react";
import WeekTimeSlotRow from "./WeekTimeSlotRow";

interface Props {
  timeSlots: Date[];
  slotHeight: number;
}

function WeekSlotGrid({ timeSlots, slotHeight }: Props) {
  return (
    <>
      {timeSlots.map((slot, idx) => (
        <WeekTimeSlotRow
          key={idx}
          slot={slot}
          slotHeight={slotHeight}
        />
      ))}
    </>
  );
}

export default memo(WeekSlotGrid);
