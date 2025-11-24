import React from 'react';
import { format } from 'date-fns';
interface YearViewProps {
  currentYear: number;
}

export default function YearView({ currentYear }: YearViewProps) {
  const months = Array.from({ length: 12 }).map((_, i) => 
    new Date(currentYear, i, 1)
  );

  return (
    <div>
      <h2 className="font-semibold text-lg mb-2">Year View</h2>
      <div className="grid grid-cols-3 gap-2">
        {months.map((m, i) => (
          <div key={i} className="p-2 border rounded-md text-center">
            {format(m, "MMMM")}
          </div>
        ))}
      </div>
    </div>
  );
}
