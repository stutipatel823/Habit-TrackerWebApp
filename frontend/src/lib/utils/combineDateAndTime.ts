// src/lib/utils/combineDateAndTime.ts

export function combineDateAndTime(date: Date, timeString: string): string {
  if (!timeString) throw new Error("Time string is empty");

  const t = timeString.trim().toLowerCase().replace(/\s+/g, "");

  // Matches:
  // 8:00am, 08:00am, 8:00 am, 08:00 am, 8:00AM, 8:00 AM
  const match = t.match(/^(\d{1,2}):(\d{2})(am|pm)$/);

  if (!match) {
    console.error("Invalid timeString:", timeString);
    throw new Error("Invalid time format: " + timeString);
  }

  const [, hourStr, minuteStr, period] = match; // <-- ALL const
  let hours = parseInt(hourStr, 10);             // <-- only hours is mutable
  const minutes = parseInt(minuteStr, 10);

  if (period === "pm" && hours !== 12) hours += 12;
  if (period === "am" && hours === 12) hours = 0;

  const local = new Date(date);
  local.setHours(hours, minutes, 0, 0);

  return local.toISOString();
}
