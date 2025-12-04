"use client";

import { useState } from "react";
import TimeSelector from "@/components/ui/TimeSelector";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Page() {
  const [startTime, setStartTime] = useState("08:00 AM");
  const [endTime, setEndTime] = useState("08:00 AM");
  const [date, setDate] = useState<Date>(new Date());

  // track which time picker is open
  const [openPicker, setOpenPicker] = useState<"start" | "end" | null>(null);

  return (
    <div className="flex justify-center items-center h-screen space-x-4">
      {/* Date Picker */}
      <div className="flex flex-col items-center">
        <label className="mb-2 text-gray-700">Select Date</label>
        <DatePicker
          selected={date}
          onChange={(d: Date | null) => {
            if (d) setDate(d);
          }}
          className="border rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          calendarClassName="react-datepicker-black"
        />
      </div>

      {/* Start Time */}
      <div className="flex flex-col items-center">
        <label className="mb-2 text-gray-700">Start Time</label>
        <TimeSelector
          value={startTime}
          onChange={(t) => {
            setStartTime(t);
            setOpenPicker(null); // close after selection
          }}
          isOpen={openPicker === "start"}
          onToggle={() =>
            setOpenPicker(openPicker === "start" ? null : "start")
          }
        />
      </div>

      <p className="text-xl mt-8"> - </p>

      {/* End Time */}
      <div className="flex flex-col items-center">
        <label className="mb-2 text-gray-700">End Time</label>
        <TimeSelector
          value={endTime}
          onChange={(t) => {
            setEndTime(t);
            setOpenPicker(null); // close after selection
          }}
          isOpen={openPicker === "end"}
          onToggle={() =>
            setOpenPicker(openPicker === "end" ? null : "end")
          }
        />
      </div>
    </div>
  );
}
