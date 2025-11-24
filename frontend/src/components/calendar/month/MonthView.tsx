import React from "react";
import MonthGrid from "./MonthGrid";
interface MonthViewProps {
  monthStart: Date;
}

function MonthView({ monthStart }:MonthViewProps) {
  return (
    <MonthGrid currentDate={monthStart}/>
  );
}

export default MonthView;
