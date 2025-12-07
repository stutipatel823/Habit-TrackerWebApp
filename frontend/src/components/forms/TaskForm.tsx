// components/forms/TaskForm.tsx

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
  const [description, setDescription] = useState("");

  // ✅ Lifted DateTimeSelector state
  const [date, setDate] = useState<Date | null>(new Date());
  const [startTime, setStartTime] = useState<string>("08:00");
  const [endTime, setEndTime] = useState<string>("09:00");

  const handleSave = async () => {
    // ADD LOGIC
  };

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

      <ColorPicker
        color={selectedTask ? selectedTask.color : color}
        setColor={selectedTask ? () => {} : setColor}
      />

      <IconSelector
        icon={selectedTask ? selectedTask.icon : icon}
        setIcon={selectedTask ? undefined : setIcon}
      />

      <DateTimeSelector
        date={date}
        setDate={setDate}
        startTime={startTime}
        setStartTime={setStartTime}
        endTime={endTime}
        setEndTime={setEndTime}
      />

      <DeadlinePicker date={date} setDate={setDate} />
      <TaskDescription description={description} setDescription={setDescription} />

      <button
        className="self-end text-white px-4 py-2 rounded-lg"
        style={{ backgroundColor: selectedTask ? selectedTask.color : color }}
        onClick={handleSave}
      >
        Save
      </button>
    </div>
  );
}
