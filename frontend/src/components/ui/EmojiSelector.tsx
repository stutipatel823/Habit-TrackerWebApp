"use client";

import { useState } from "react";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";

interface EmojiSelectorProps {
  onSelect: (emoji: string) => void;
  initialEmoji?: string;
}

export default function EmojiSelector({ onSelect, initialEmoji }: EmojiSelectorProps) {
  const [chosenEmoji, setChosenEmoji] = useState<string | null>(initialEmoji || null);
  const [isOpen, setIsOpen] = useState(false);

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setChosenEmoji(emojiData.emoji);
    onSelect(emojiData.emoji);
    setIsOpen(false); // close after selection
  };

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="px-3 py-1 border rounded text-lg"
      >
        {chosenEmoji || "😀"}
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2">
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}
    </div>
  );
}
