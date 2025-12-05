"use client";
import { AlignLeft } from "lucide-react";

interface TaskDescriptionProps {
  description: string;
  setDescription: (val: string) => void;
}

export default function TaskDescription({ description, setDescription }: TaskDescriptionProps) {
  return (
    <div className="flex items-start space-x-2">
      <AlignLeft className="text-gray-500" size={20} />
      <textarea
        name="task-desc"
        placeholder="Add description..."
        rows={3}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border rounded-md px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
      />
    </div>
  );
}
