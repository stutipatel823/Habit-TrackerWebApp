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
import { createExpectedScheduleItem } from "@/api/expected_api";
import { combineDateAndTime } from "@/lib/utils";
import { createTask } from "@/api/task_api";

interface TaskFormProps {
  onClose: () => void;
}
export default function TaskForm({ onClose }: TaskFormProps) {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("#000000");
  const [icon, setIcon] = useState("");
  const [description, setDescription] = useState("");

  const [date, setDate] = useState<Date | null>(new Date());
  const [startTime, setStartTime] = useState<string>("08:00am");
  const [endTime, setEndTime] = useState<string>("09:00am");

  const handleSave = async () => {
    if (!date) {
      alert("Please select a date");
      return;
    }

    const isoStart = combineDateAndTime(date, startTime);
    const isoEnd = combineDateAndTime(date, endTime);

    try {
      let taskId: string;

      // CASE 1: Existing task selected
      if (selectedTask && selectedTask.id && selectedTask.user_id) {
        taskId = selectedTask.id;

        // CASE 2: Creating a new task
      } else {
        if (!title) {
          alert("Please enter a title for the new task");
          return;
        }

        const user_id = "3c6db7be-4715-4afa-b20b-5bc74284222f"; // replace with actual logged-in user
        const newTask = await createTask({
          user_id,
          title,
          icon,
          color,
          is_recurring: false,
        });

        taskId = newTask.id;
      }

      // Now create the expected schedule item
      const scheduleRequest = {
        task_id: taskId,
        user_id:
          selectedTask?.user_id || "3c6db7be-4715-4afa-b20b-5bc74284222f",
        start_time: isoStart,
        end_time: isoEnd,
      };

      await createExpectedScheduleItem(scheduleRequest);
      onClose();
      alert("Successfully added!");

    } catch (error) {
      console.error("Failed to save task:", error);
      alert("Failed to save task. Please try again.");
    }
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
      <TaskDescription
        description={description}
        setDescription={setDescription}
      />

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
