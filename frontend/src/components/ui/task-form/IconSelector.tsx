"use client";
import { SmilePlus } from "lucide-react";
import EmojiPicker from "emoji-picker-react";
export default function IconSelector() {
  return (
    <div className="flex space-x-2">
      <SmilePlus className="text-gray-500" size={20}/>
      <label className="text-gray-600 font-medium">Task Icon</label>
      {/* <EmojiPicker height={500} width={400} /> */}
    </div>
  );
}