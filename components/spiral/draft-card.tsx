"use client";

import { Sparkles } from "lucide-react";

interface DraftCardProps {
  title: string;
  content?: string;
  onClose?: () => void;
  onClick?: () => void;
}

export function DraftCard({ title, content, onClose, onClick }: DraftCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-[#262626] rounded-lg border border-gray-800 p-4 mb-3 hover:border-gray-700 transition-colors group cursor-pointer"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <h3 className="text-gray-200 font-medium text-sm">{title}</h3>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose?.();
          }}
          className="text-xs flex items-center gap-1 text-gray-500 hover:text-gray-300 bg-[#1a1a1a] px-2 py-1 rounded-full transition-colors"
        >
          <Sparkles size={12} />
          <span>Close draft</span>
        </button>
      </div>
      {content && (
        <p className="text-gray-400 text-sm line-clamp-2">{content}</p>
      )}
    </div>
  );
}
