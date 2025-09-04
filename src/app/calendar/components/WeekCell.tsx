import { format, differenceInMinutes, addMinutes } from "date-fns";
import { tasks } from "@/data/tasksData";

interface WeekCellProps {
  date: Date;
  time: Date;
  // tasks?: Task[];
  onClick?: () => void;
}

export default function WeekCell({ date, time,  onClick }: WeekCellProps) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer border-r relative h-10"
    >
      {tasks.map((task) => {
        const taskStart = new Date(task.expected_at);
        const taskEnd = task.actual_at ? new Date(task.actual_at) : addMinutes(taskStart, 30);
        const topOffset = 0; // starts at top of slot
        const height = (differenceInMinutes(taskEnd, taskStart) / 30) * 40; // slotHeight = 40px

        return (
          <div
            key={task.id}
            className="absolute truncate"
            style={{
              top: `${topOffset}px`,
              height: `${height}px`,
              backgroundColor: task.color,
              // zIndex: 10
            }}
          >
            {task.title}
          </div>
        );
      })}
    </div>
  );
}
