"use client";
import DatePicker from "react-datepicker";
import { Target } from "lucide-react";

interface DeadlinePickerProps {
  date: Date | null;
  setDate: (d: Date | null) => void;
}

export default function DeadlinePicker({ date, setDate }: DeadlinePickerProps) {
  return (
    <div className="flex items-center space-x-2">
      <Target className="text-gray-500" size={20} />
      <p className="text-gray-700">Due</p>
      <DatePicker
        selected={date}
        onChange={setDate}
        dateFormat="EEEE, MMM dd"
        className="w-full border rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        calendarClassName="datepicker-dark"
        popperClassName="datepicker-dark"
        placeholderText="Set deadline"
      />
    </div>
  );
}
