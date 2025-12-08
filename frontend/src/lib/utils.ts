import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function combineDateAndTime(date: Date, timeString: string): string {
  if (!date) throw new Error("Invalid date provided");

  let hours = 0;
  let minutes = 0;

  const lower = timeString.trim().toLowerCase();

  // Case 1: Handles AM/PM format (e.g., "08:00am", "8:30pm")
  const ampmMatch = lower.match(/(\d{1,2}):(\d{2})\s*(am|pm)/);
  if (ampmMatch) {
    const [, h, m, period] = ampmMatch;
    hours = parseInt(h, 10);
    minutes = parseInt(m, 10);

    if (period === "pm" && hours !== 12) hours += 12;
    if (period === "am" && hours === 12) hours = 0;
  } 
  else {
    // Case 2: Handles 24h format (e.g., "18:00", "08:15")
    const match24 = lower.match(/(\d{1,2}):(\d{2})/);
    if (!match24) {
      throw new Error(`Invalid time format: ${timeString}`);
    }
    const [, h, m] = match24;
    hours = parseInt(h, 10);
    minutes = parseInt(m, 10);
  }

  // Build YYYY-MM-DDTHH:mm:SS (no timezone)
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hh = String(hours).padStart(2, "0");
  const mm = String(minutes).padStart(2, "0");

  return `${year}-${month}-${day}T${hh}:${mm}:00`;
}