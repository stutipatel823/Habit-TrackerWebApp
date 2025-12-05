// src/components/picker/DateTimeSelector.tsx
"use client";

import { useState } from "react";
import { Clock } from "lucide-react";
import TimePicker from "./TimePicker";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DateTimeSelector() {
  const [startTime, setStartTime] = useState("8:00 am");
  const [endTime, setEndTime] = useState("8:00 am");
  const [date, setDate] = useState<Date>(new Date());
  const [openPicker, setOpenPicker] = useState<"start" | "end" | null>(null);

  return (
    <div className="w-full flex space-x-2 items-center">
      <Clock className="text-gray-500" size={20}/>
      <label className="text-gray-600 font-medium">Day</label>
      <div className="flex items-center space-x-3">
        {/* Date Picker */}
        <DatePicker
          selected={date}
          onChange={(d) => d && setDate(d)}
          dateFormat="EEEE, MMM dd"
          className="flex-1 border rounded-md bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          calendarClassName="datepicker-dark"
          popperClassName="datepicker-dark"
          placeholderText="Select date"
        />

        {/* Start Time */}
        <TimePicker
          value={startTime}
          onChange={(t) => {
            setStartTime(t);
            setOpenPicker(null);
          }}
          isOpen={openPicker === "start"}
          onToggle={() => setOpenPicker(openPicker === "start" ? null : "start")}
        />

        <span className="text-gray-500">-</span>

        {/* End Time */}
        <TimePicker
          value={endTime}
          onChange={(t) => {
            setEndTime(t);
            setOpenPicker(null);
          }}
          isOpen={openPicker === "end"}
          onToggle={() => setOpenPicker(openPicker === "end" ? null : "end")}
        />
      </div>
    </div>
  );
}
