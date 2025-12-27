"use client";

interface HistoryItemProps {
  title: string;
  active?: boolean;
  onClick?: () => void;
}

export function HistoryItem({ title, active, onClick }: HistoryItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors duration-200 flex items-center gap-2 group ${
        active
          ? "bg-[#262626] text-white"
          : "text-gray-400 hover:bg-[#1a1a1a] hover:text-gray-200"
      }`}
    >
      <span className="truncate flex-1">{title}</span>
    </button>
  );
}
