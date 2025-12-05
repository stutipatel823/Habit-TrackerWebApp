"use client";
import React, { useState, useEffect } from "react";
import { Task } from "@/lib/types/task";
import { getAllTasks } from "@/api/task_api";

interface TaskListProps {
  onSelect?: (task: Task) => void; // optional callback when a task is clicked
}

export default function TaskList({ onSelect }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await getAllTasks();
        setTasks(res);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  if (loading) {
    return <div className="text-gray-500">Loading tasks...</div>;
  }

  return (
    <div className="w-full p-2 space-y-2">
      {tasks.length === 0 && <div className="text-gray-500">No tasks available</div>}
      {tasks.map((task) => (
        <div
          key={task.id}
          onClick={() => onSelect?.(task)}
          className="border-1 border-black flex items-center space-x-3 p-2 rounded-md cursor-pointer hover:bg-gray-200 transition"
        >
          <span
            className="w-1.5 h-6 rounded-full"
            style={{ background: task.color }}
          />
          <span className="text-lg">{task.icon}</span>
          <span className="font-medium">{task.title}</span>
        </div>
      ))}
    </div>
  );
}
