"use client";
import { useState } from "react";
import { X } from "lucide-react";
import TaskSelectOrAdd from "../ui/task-form/TaskSelectOrAdd";
import ColorPicker from "@/components/ui/task-form/ColorPicker";
import IconSelector from "@/components/ui/task-form/IconSelector";
import DateTimeSelector from "@/components/ui/task-form/DateTimeSelector";
import DeadlinePicker from "@/components/ui/task-form/DeadlinePicker";
import TaskDescription from "@/components/ui/task-form/TaskDescription";
import { Task } from "@/lib/types/task";

export default function TaskForm({ onClose }: { onClose: () => void }) {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("#000");
  const [icon, setIcon] = useState("");
  const [date, setDate] = useState<Date | null>(new Date());
  const [description, setDescription] = useState("");

  return (
    <div className="relative bg-white rounded-2xl p-8 flex flex-col space-y-6 shadow-xl w-fit border">

      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
      >
        <X size={20} />
      </button>

      <TaskSelectOrAdd
        selectedTask={selectedTask}
        setSelectedTask={setSelectedTask}
        title={title}
        setTitle={setTitle}
      />

      {/* Color picker: fixed if task selected */}
      <ColorPicker
        color={selectedTask ? selectedTask.color : color}
        setColor={selectedTask ? () => {} : setColor} // editable only if no task
      />


      {/* Icon selector: fixed if task selected */}
      <IconSelector
        icon={selectedTask ? selectedTask.icon : icon}
        setIcon={selectedTask ? undefined : setIcon}
      />

      <DateTimeSelector />
      <DeadlinePicker date={date} setDate={setDate} />
      <TaskDescription description={description} setDescription={setDescription} />

      <button
        className="self-end text-white px-4 py-2 rounded-lg"
        style={{ backgroundColor: selectedTask ? selectedTask.color : color }}
      >
        Save
      </button>
    </div>
  );
}
