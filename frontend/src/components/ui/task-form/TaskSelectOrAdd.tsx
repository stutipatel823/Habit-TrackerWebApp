// components/ui/task-form/TaskSelectOrAdd.tsx

"use client";
import { useState } from "react";
import TaskDropdown from "./TaskDropdown";
import { ChevronDown, Plus } from "lucide-react";
import { Task } from "@/lib/types/task";

export default function TaskSelectOrAdd({
  selectedTask,
  setSelectedTask,
  title,
  setTitle,
}: {
  selectedTask: Task | null;
  setSelectedTask: (task: Task | null) => void;
  title: string;
  setTitle: (value: string) => void;
}) {
  const [toggle, setToggle] = useState(true); // true = TaskDropdown

  return (
    <div className="flex items-center w-full space-x-2">

      {/* LEFT SIDE */}
      <div
        className={`transition-width flex items-center ${
          toggle ? "w-full" : "w-10"
        }`}
      >
        {toggle ? (
          <TaskDropdown
            selectedTask={selectedTask}
            setSelectedTask={setSelectedTask}
          />
        ) : (
          <button
            className="overflow-hidden p-2.5 border border-black w-full flex justify-center"
            onClick={() => setToggle(true)}
          >
            <ChevronDown size={17} />
          </button>
        )}
      </div>

      {/* RIGHT SIDE */}
      <div
        className={`overflow-hidden transition-width border border-black flex items-center cursor-pointer ${
          toggle ? "w-10 justify-center p-2.5" : "w-full p-1"
        }`}
        onClick={() => {
          if (toggle) {
            setToggle(false); // switch to Add Task
            setSelectedTask(null); // clear previously selected task
          }
        }}
      >
        {toggle ? (
          <Plus size={17} />
        ) : (
          <input
            autoFocus
            placeholder="Add Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full outline-none ml-1 py-1"
          />
        )}
      </div>
    </div>
  );
}
