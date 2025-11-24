"use client";

import { useState, useMemo } from "react";
import { startOfMonth, addMonths, format, startOfWeek, addDays, subMonths } from "date-fns";
import CalendarHeader from "./CalendarHeader";
import YearView from "../year/YearView";
import MonthView from "../month/MonthView";
import WeekView from "../week/WeekView";
import DayView from "../day/DayView";

type CalendarView = "year" | "month" | "week" | "day";

export default function CalendarContainer() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<CalendarView>("month");

  // Event listeners for previous button
  const goToPrev = () => {
    switch (view) {
      case "day":
        setCurrentDate(prev => addDays(prev, -1));
        break;
      case "week":
        setCurrentDate(prev => addDays(prev, -7));
        break;
      case "month":
        setCurrentDate(prev => subMonths(prev, 1));
        break;
      case "year":
        setCurrentDate(prev => new Date(prev.getFullYear() - 1, prev.getMonth(), prev.getDate()));
        break;
    }
  };

  // Event listeners for next button
  const goToNext = () => {
    switch (view) {
      case "day":
        setCurrentDate(prev => addDays(prev, 1));
        break;
      case "week":
        setCurrentDate(prev => addDays(prev, 7));
        break;
      case "month":
        setCurrentDate(prev => addMonths(prev, 1));
        break;
      case "year":
        setCurrentDate(prev => new Date(prev.getFullYear() + 1, prev.getMonth(), prev.getDate()));
        break;
    }
  };

  const goToToday = () => setCurrentDate(new Date());

  // Change view and reset currentDate to today
  const changeView = (newView: CalendarView) => {
    setCurrentDate(new Date()); // <-- reset when switching view
    setView(newView);
  };


  // Compute the title for the header
  const viewTitle = (() => {
    switch (view) {
      case "day":
        return format(currentDate, "MMMM dd yyyy");
      case "month":
        return format(currentDate, "MMMM yyyy");
      case "week": {
        const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 });
        const weekEnd = addDays(weekStart, 6);
        return `${format(weekStart, "MMM dd")} - ${format(weekEnd, "MMM dd, yyyy")}`;
      }
      default:
        return format(currentDate, "yyyy");
    }
  })();

  const weekRange = useMemo(() => {
    const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 });
    return Array.from({ length: 7 }).map((_, i) => addDays(weekStart, i));
  }, [currentDate]);

  const monthStart = startOfMonth(currentDate);
  const year = currentDate.getFullYear();

  const renderView = () => {
    switch (view) {
      case "year":
        return <YearView currentYear={year} />;
      case "month":
        return <MonthView monthStart={monthStart} />;
      case "week":
        return <WeekView weekDates={weekRange} currentDate={currentDate} />;
      // case "day":
      //   return <DayView currentDate={currentDate} />;
    }
  };

  return (
    <div className="bg-white h-full flex flex-col">
      <CalendarHeader
        onNext={goToNext}
        onPrev={goToPrev}
        goToToday={goToToday}
        onChangeView={changeView}
        activeView={view}
        viewTitle={viewTitle}
      />
      {renderView()}
    </div>
  );
}
