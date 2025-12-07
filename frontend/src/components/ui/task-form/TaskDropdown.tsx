// components/ui/task-form/TaskDropdown.tsx

"use client";
import React, { useState, useEffect } from "react";
import { Task } from "@/lib/types/task";
import { getAllTasks } from "@/api/task_api";
import { ChevronDown } from "lucide-react";

interface TaskDropdownProps {
  selectedTask: Task | null;
  setSelectedTask: (task: Task | null) => void;
}

export default function TaskDropdown({ selectedTask, setSelectedTask }:TaskDropdownProps) {
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [openDropdown, setOpenDropdown] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await getAllTasks();
      setAllTasks(res);
    };
    fetchTasks(); // runs only once
  }, []); // empty dependency array ensures it runs only on mount

  return (
    <div className="relative w-full">
      {/* Selected item */}
      <button
        onClick={() => setOpenDropdown(!openDropdown)}
        className="w-full border border-black px-3 py-2 flex items-center justify-between"
      >
        {selectedTask ? (
          <div className="flex items-center space-x-2">
            <span
              className="w-1 h-5 rounded-full"
              style={{ background: selectedTask.color }}
            />
            <span>{selectedTask.icon}</span>
            <span>{selectedTask.title}</span>
          </div>
        ) : (
          <span className="h-fit text-gray-500">Select a task...</span>
        )}
        <span><ChevronDown size={20} /></span>
      </button>

      {/* Dropdown options */}
      {openDropdown && (
        <div
          className="absolute z-10 w-full bg-white shadow-lg rounded-md border border-black 
                    mt-2 p-2 space-y-2 max-h-60 overflow-y-auto animate-fadeIn"
        >
          {allTasks.map((task) => (
            <div
              key={task.id}
              onClick={() => {
                setSelectedTask(task);
                setOpenDropdown(false);
              }}
              className="px-2 py-2 bg-gray-50 rounded-md cursor-pointer
                        hover:bg-gray-100 transition-all flex items-center space-x-3"
            >
              <span
                className="w-1 h-5 rounded-full"
                style={{ background: task.color }}
              />
              <span className="opacity-80">{task.icon}</span>
              <span className="font-medium">{task.title}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
