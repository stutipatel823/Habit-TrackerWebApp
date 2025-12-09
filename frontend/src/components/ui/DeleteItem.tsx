// src/components/ui/DeleteItem.tsx

import { Trash2 } from "lucide-react";
import React from "react";

interface DeleteItemProps {
  bgColor: string;
  deleteFunction: () => void;
}
export default function DeleteItem({
  bgColor,
  deleteFunction,
}: DeleteItemProps) {

  const handleClick = () => {
    const confirmed = window.confirm("Are you sure you want to delete this item?");
    if(confirmed) {
        deleteFunction();
    }; 
  }
  return (
    <button
      className="p-2 rounded-full cursor-pointer"
      style={{ backgroundColor: bgColor }}
      onClick={handleClick}
    >
      <Trash2 size={18} color="white" />
    </button>
  );
}
