"use client";
import { useState } from "react";
import DateTimeSelector from "@/components/ui/task-form/DateTimeSelector";
import TaskTitle from "@/components/ui/task-form/TaskTitle";
import ColorPicker from "@/components/ui/task-form/ColorPicker";
import IconSelector from "@/components/ui/task-form/IconSelector";
import TaskDescription from "@/components/ui/task-form/TaskDescription";
import DeadlinePicker from "@/components/ui/task-form/DeadlinePicker";

interface Task {
  id: number;
  title: string;
  color: string;
}

const existingTasks: Task[] = [
  { id: 1, title: "Morning Exercise", color: "#F87171" },
  { id: 2, title: "Team Meeting", color: "#3B82F6" },
  { id: 3, title: "Read Book", color: "#10B981" },
];

export default function TaskForm() {
  const [date, setDate] = useState<Date | null>(new Date());
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("#3b82f6");
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);

  const handleTaskSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const taskId = parseInt(e.target.value);
    setSelectedTaskId(taskId);

    const task = existingTasks.find((t) => t.id === taskId);
    if (task) {
      setTitle(task.title);
      setColor(task.color);
    } else {
      setTitle("");
    }
  };

  // Helper for semi-transparent card background
  const rgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div
        className="bg-white rounded-2xl p-6 flex flex-col space-y-6 shadow-md w-fit border-2"
      >
        {/* Top handle */}
        <div className="w-full h-2 rounded-2xl" style={{backgroundColor:color}}></div>
        
        {/* Task Title + Existing Tasks Dropdown */}
        <div className="flex items-center space-x-2 w-full focus:outline-none">
          <TaskTitle
            title={title}
            setTitle={setTitle}
          />
          <select
            value={ 
              selectedTaskId !== null && !Number.isNaN(selectedTaskId)
                ? String(selectedTaskId)
                : ""
            }
            onChange={handleTaskSelect}
            className="border rounded-md px-2 py-2 focus:outline-none"
          >
            <option value="">Select existing task</option>
            {existingTasks.map((task) => (
              <option key={task.id} value={task.id}>
                {task.title}
              </option>
            ))}
          </select>
        </div>

        <ColorPicker color={color} setColor={setColor} />
        <IconSelector />
        <DateTimeSelector />
        <DeadlinePicker date={date} setDate={setDate} />
        <TaskDescription description={description} setDescription={setDescription} />

        {/* Save */}
        <button
          className="self-end text-white px-4 py-2 rounded-lg transition hover:brightness-110"
          style={{ backgroundColor: color }}
        >
          Save
        </button>
      </div>
    </div>
  );
}