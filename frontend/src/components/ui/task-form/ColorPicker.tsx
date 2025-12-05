"use client";
import { Palette } from "lucide-react";

interface ColorPickerProps {
  color: string;
  setColor: (val: string) => void;
}

export default function ColorPicker({ color, setColor }: ColorPickerProps) {
  return (
    <div className="flex items-center space-x-2">
      <Palette className="text-gray-500" size={20} />
      <label className="text-gray-600 font-medium">Task Color:</label>
      <div className="relative">
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div
          className="w-6 h-6 rounded-full border border-gray-300"
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  );
}
