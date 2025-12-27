"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, Loader2 } from "lucide-react";

interface ThinkingBlockProps {
  content: string;
  state?: "pondering" | "searching" | "complete";
  defaultOpen?: boolean;
}

export function ThinkingBlock({ 
  content, 
  state = "complete",
  defaultOpen = true 
}: ThinkingBlockProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const stateLabel = {
    pondering: "Pondering...",
    searching: "Searching...",
    complete: "Thought",
  }[state];

  const isActive = state === "pondering" || state === "searching";

  return (
    <div className="mb-4 animate-fade-in">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-orange-500 text-xs font-medium bg-orange-500/10 border border-orange-500/20 px-3 py-1.5 rounded-lg hover:bg-orange-500/20 transition-colors mb-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
        aria-expanded={isOpen}
      >
        {isActive ? (
          <Loader2 size={14} className="animate-spin" />
        ) : isOpen ? (
          <ChevronDown size={14} />
        ) : (
          <ChevronRight size={14} />
        )}
        <span>{stateLabel}</span>
        {isActive && (
          <span className="ml-1 w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" />
        )}
      </button>

      {isOpen && (
        <div className="bg-orange-500/5 border border-orange-500/10 rounded-lg p-4 animate-slide-in-left">
          <p className="text-orange-200/80 text-sm leading-relaxed whitespace-pre-wrap">
            {content}
          </p>
        </div>
      )}
    </div>
  );
}
