// components/calendar/CalendarHeader.tsx
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CalendarHeaderProps {
  onNext: () => void;
  onPrev: () => void;
  goToToday: () => void;
  onChangeView: (view: "year" | "month" | "week" | "day") => void;
  viewTitle: string;
  activeView: "year" | "month" | "week" | "day"; // <-- track active view from parent
}

export default function CalendarHeader({
  onNext,
  onPrev,
  goToToday,
  onChangeView,
  viewTitle,
  activeView,
}: CalendarHeaderProps) {
  const views: ("year" | "month" | "week" | "day")[] = ["year", "month", "week", "day"];
  return (
    <div className="grid grid-cols-3 items-center mb-5">
      {/* Left: Today button */}
      <div className="flex justify-start">
        <button
          onClick={goToToday}
          className="py-1.5 px-5 border-2 rounded-full font-bold text-gray-600"
        >
          Today
        </button>
      </div>

      {/* Center: Month + arrows */}
      <div className="flex justify-center items-center gap-3">
        <button onClick={onPrev} className="text-brand-blue">
          <ChevronLeft className="w-5 h-5 sm:w-8 sm:h-8" />
        </button>
        <h2 className="text-xxs sm:text-xl text-gray-800 font-bold">
          {viewTitle}
        </h2>
        <button onClick={onNext} className="text-brand-blue">
          <ChevronRight className="w-5 h-5 sm:w-8 sm:h-8" />
        </button>
      </div>

      {/* Right: Toggle */}
      <div className="flex justify-end">
        {/* Desktop toggle */}
        <div className="hidden md:flex border-2 rounded-full text-gray-500 font-bold overflow-hidden">
          {views.map((view, idx) => (
            <button
              key={view}
              onClick={() => onChangeView(view)}
              className={`
                py-1.5 px-4
                ${idx !== views.length - 1 && "border-r-2"} 
                ${activeView === view ? "bg-gray-100 text-gray-700 font-extrabold" : ""}
              `}
            >
              {view.charAt(0).toUpperCase() + view.slice(1)}
            </button>
          ))}
        </div>

        {/* Mobile dropdown */}
        <select
          className="md:hidden border-2 rounded-full py-1.5 px-4 font-bold text-gray-600"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            onChangeView(e.target.value as "year" | "month" | "week" | "day")
          }
          value={activeView}
        >
          {views.map((view) => (
            <option key={view} value={view}>
              {view.charAt(0).toUpperCase() + view.slice(1)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
