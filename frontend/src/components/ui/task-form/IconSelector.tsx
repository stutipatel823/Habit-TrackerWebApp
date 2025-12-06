"use client";

import { useState } from "react";
import { SmilePlus } from "lucide-react";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";

interface IconSelectorProps {
  icon: string;                  // currently selected emoji
  setIcon?: (icon: string) => void; // optional, only for new tasks
}

export default function IconSelector({ icon, setIcon }: IconSelectorProps) {
  const [pickerOpen, setPickerOpen] = useState(false);

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    if (setIcon) {
      setIcon(emojiData.emoji);
    }
    setPickerOpen(false); // close picker after selection
  };

  return (
    <div className="flex items-center space-x-2 relative">
      {/* Icon label */}
      <SmilePlus className="text-gray-500" size={20} />
      <label className="text-gray-600 font-medium">Task Icon:</label>

      {/* Emoji display */}
      <div
        className={`text-xl px-1 bg-gray-200 rounded-md ${
          setIcon ? "cursor-pointer hover:bg-gray-100" : "opacity-70"
        }`}
        onClick={() => setIcon && setPickerOpen(!pickerOpen)}
      >
        {icon || "😀"}
      </div>

      {/* Emoji picker popup */}
      {pickerOpen && setIcon && (
        <div className="absolute z-50 top-10">
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}
    </div>
  );
}
