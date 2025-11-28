// components/week/utils/timeSlots.ts
import { startOfDay, setHours, setMinutes } from "date-fns";

export function generateTimeSlots(): Date[] {
    const slots: Date[] = []
    const today = startOfDay(new Date());

    for(let hour = 0; hour < 24; hour++){
        slots.push(setMinutes(setHours(today, hour), 0));
        slots.push(setMinutes(setHours(today, hour), 30));

    }
    return slots;
}