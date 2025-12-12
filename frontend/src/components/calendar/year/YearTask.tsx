// components/calendar/year/YearTaskProps.tsx
import React from "react";

interface YearTaskProps {
  color: string;
}

export default function YearTask({ color }: YearTaskProps) {
  return (
    <div
      className="w-2 h-2 rounded-full cursor-pointer"
      style={{ backgroundColor: color }}
    />
  );
}
