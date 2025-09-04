"use client";

import { useState } from "react";
import { startOfMonth, addMonths, format, startOfWeek, addDays } from "date-fns";
import CalendarHeader from "./components/CalendarHeader";
import YearView from "./components/YearGrid";
import MonthView from "./components/MonthGrid";
import WeekView from "./components/WeekGrid";
import DayView from "./components/DayGrid";

type CalendarView = "year" | "month" | "week" | "day";

export default function CalendarContainer() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<CalendarView>("month");

  const monthStart = startOfMonth(currentDate);

  const goToNextMonth = () => setCurrentDate(addMonths(monthStart, 1));
  const goToPrevMonth = () => setCurrentDate(addMonths(monthStart, -1));
  const goToToday = () => setCurrentDate(new Date());

  const changeView = (newView: CalendarView) => setView(newView);

  // compute the title instead of setting state during render
  const viewTitle = (() => {
    switch (view) {
      case "day":
        return format(currentDate, "MMMM dd yyyy");
      case "month":
        return format(currentDate, "MMMM yyyy");
      case "week": {
        const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 }); // Sunday start
        const weekEnd = addDays(weekStart, 6);
        return `${format(weekStart, "MMM dd")} - ${format(weekEnd, "MMM dd, yyyy")}`;
      }
      default:
        return format(currentDate, "yyyy");
    }
  })();

  // compute week range for WeekView
  const weekRange = (() => {
    const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 });
    return Array.from({ length: 7 }).map((_, i) => addDays(weekStart, i));
  })();

  const renderView = () => {
    switch (view) {
      case "year":
        return <YearView />;
      case "month":
        return <MonthView currentDate={monthStart} />;
      case "week":
        return <WeekView weekDates={weekRange} currentDate={currentDate} />; // pass the 7-day range
      case "day":
        return <DayView currentDate={currentDate} />;
      default:
        return null;
    }
  };

  return (
    <div className="border-2 border-red-500">
      <CalendarHeader
        onNext={goToNextMonth}
        onPrev={goToPrevMonth}
        goToToday={goToToday}
        onChangeView={changeView}
        activeView={view}
        viewTitle={viewTitle}
      />
      {renderView()}
    </div>
  );
}
