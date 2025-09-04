import { format } from "date-fns";

interface DayViewProps {
  currentDate: Date;
}

export default function DayView({ currentDate }: DayViewProps) {
  return <div>{format(currentDate, "MMMM dd yyyy")}</div>;
}
