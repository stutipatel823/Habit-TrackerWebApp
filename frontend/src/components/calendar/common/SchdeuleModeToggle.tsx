// src/components/calendar/common/ScheduleModeToggle.tsx

import { CalendarCheck2, CalendarClock } from "lucide-react";
import type { ScheduleMode } from "@/lib/types/scheduleMode";

interface ScheduleModeToggleProps {
  value: ScheduleMode;
  onChange: (mode: ScheduleMode) => void;
}

export default function ScheduleModeToggle({
  value,
  onChange,
}: ScheduleModeToggleProps) {
  const base = "p-1.5 cursor-pointer rounded-md transition-colors";
  const active = "bg-blue-50 font-bold text-blue-500";
  const inactive = "text-neutral-500 font-bold";

  return (
    <div className="flex w-fit rounded-sm p-1.5 space-x-3">
      <button
        onClick={() => onChange("planned")}
        className={`${base} ${value === "planned" ? active : inactive}`}
      >
        <CalendarClock />
      </button>

      <button
        onClick={() => onChange("completed")}
        className={`${base} ${value === "completed" ? active : inactive}`}
      >
        <CalendarCheck2 />
      </button>
    </div>
  );
}
