"use client";

import { X, FileText } from "lucide-react";

interface DraftPreviewCardProps {
  title: string;
  wordCount?: number;
  onClose?: () => void;
  onSelect?: () => void;
  isActive?: boolean;
}

export function DraftPreviewCard({
  title,
  wordCount,
  onClose,
  onSelect,
  isActive = false,
}: DraftPreviewCardProps) {
  return (
    <div
      onClick={onSelect}
      className={`
        group flex items-center justify-between gap-3 
        bg-[#262626] hover:bg-[#2a2a2a] 
        border ${isActive ? "border-orange-500/50" : "border-gray-700"} 
        rounded-lg px-4 py-3 
        cursor-pointer transition-all duration-200
        animate-fade-in
      `}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="p-1.5 bg-orange-500/10 rounded">
          <FileText size={14} className="text-orange-500" />
        </div>
        <div className="min-w-0">
          <p className="text-gray-200 text-sm font-medium truncate">
            {title}
          </p>
          {wordCount && (
            <p className="text-gray-500 text-xs">
              {wordCount} words
            </p>
          )}
        </div>
      </div>
      
      {onClose && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="flex items-center gap-1.5 text-gray-500 hover:text-gray-300 text-xs px-2 py-1 rounded hover:bg-[#333] transition-colors opacity-0 group-hover:opacity-100"
        >
          <X size={12} />
          <span>Close draft</span>
        </button>
      )}
    </div>
  );
}
