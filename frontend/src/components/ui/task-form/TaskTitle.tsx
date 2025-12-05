"use client";

interface TaskTitleProps {
  title: string;
  setTitle: (val: string) => void;
  disabled?: boolean;
}

export default function TaskTitle({ title, setTitle, disabled }: TaskTitleProps) {
  return (
    <input
      type="text"
      name="task-title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      placeholder="Task title"
      required
      minLength={3}
      maxLength={50}
      disabled={disabled}
      className="w-full text-2xl font-semibold border-b border-gray-300 focus:border-blue-500 focus:outline-none pb-2"
    />
  );
}
