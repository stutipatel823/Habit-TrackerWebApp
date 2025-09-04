// task/components/TaskItem.tsx
type Task = {
  id: string;
  title: string;
  expected_at: string;
  color: string;
};

type TaskItemProps = {
  task: Task;
  variant?: "month" | "week" | "day" | "year";
  onClick?: (task: Task) => void;
};

export default function TaskItem({ task, variant = "month", onClick }: TaskItemProps) {
  const taskDate = new Date(task.expected_at);
  const taskTime = taskDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const baseClasses =
    "w-full rounded-xs text-xs flex items-center cursor-pointer transition hover:bg-neutral-200";
  
  const variants: Record<typeof variant, string> = {
    month: "py-1 my-1 shadow-sm bg-neutral-100",
    week: "py-1.5 px-2 bg-white border",
    day: "py-2 px-3 bg-white shadow-md text-sm",
    year: "py-0.5 px-1 text-[10px] bg-neutral-50",
  };

  return (
    <div
      className={`${baseClasses} ${variants[variant]}`}
      onClick={() => onClick?.(task)}
    >
      <div
        className="mx-1.5 h-4 w-1 rounded-2xl shrink-0"
        style={{ backgroundColor: task.color }}
      ></div>

      <p className="truncate overflow-hidden whitespace-nowrap">
        {variant !== "year" && (
          <span className="text-gray-500 mr-1">{taskTime.toLowerCase().split(' ')}</span>
        )}
        {task.title}
      </p>
    </div>
  );
}
