"use client";

interface TimeSelectorProps {
  value: string;
  onChange: (newTime: string) => void;
  isOpen: boolean;               // controlled open state
  onToggle: () => void;          // callback to toggle open/close
}

export default function TimeSelector({
  value,
  onChange,
  isOpen,
  onToggle,
}: TimeSelectorProps) {
  // Generate 12-hour time options with 15-min intervals
  const timeOptions = Array.from({ length: 24 * 4 }, (_, i) => {
    const hours24 = Math.floor(i / 4);
    const minutes = (i % 4) * 15;

    const ampm = hours24 >= 12 ? "PM" : "AM";
    let hours12 = hours24 % 12;
    if (hours12 === 0) hours12 = 12;

    const mStr = minutes.toString().padStart(2, "0");
    return `${hours12}:${mStr} ${ampm}`;
  });

  return (
    <div className="relative inline-block w-full">
      {/* Selected value */}
      <button
        onClick={onToggle}  // toggle controlled from parent
        className="w-full bg-white border rounded-md px-3 py-2 text-left shadow-sm"
      >
        {value}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className="absolute mt-1 w-full max-h-60 overflow-y-auto rounded-md shadow-lg
                     bg-black text-white border border-gray-700 z-50"
        >
          {timeOptions.map((time) => (
            <div
              key={time}
              onClick={() => {
                onChange(time);
              }}
              className="px-3 py-2 hover:bg-gray-800 cursor-pointer"
            >
              {time}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
