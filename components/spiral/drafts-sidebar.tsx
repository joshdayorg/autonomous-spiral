"use client";

import { useState, useRef, useEffect } from "react";
import { Plus, RotateCcw, Copy, X, Maximize2, ChevronLeft, ChevronRight, Check } from "lucide-react";
import { Doc, Id } from "../../convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Tooltip } from "./tooltip";

interface DraftsSidebarProps {
  drafts: Doc<"drafts">[];
  sessionId: Id<"sessions">;
  onClose?: () => void;
}

export function DraftsSidebar({ drafts, sessionId, onClose }: DraftsSidebarProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeDraftId, setActiveDraftId] = useState<string | null>(null);
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const selectDraft = useMutation(api.drafts.select);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftScroll(scrollLeft > 0);
      setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    handleScroll();
  }, [drafts]);

  const handleCopy = async (draft: Doc<"drafts">, e: React.MouseEvent) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(draft.content);
    setCopiedId(draft._id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSelect = async (draft: Doc<"drafts">) => {
    setActiveDraftId(draft._id);
    await selectDraft({ draftId: draft._id, sessionId });
  };

  if (drafts.length === 0) {
    return (
      <aside className="w-[600px] bg-[#1a1a1a] border-l border-[#262626] flex flex-col h-full flex-shrink-0">
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500 text-sm">No drafts yet</p>
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-[600px] bg-[#1a1a1a] border-l border-[#262626] flex flex-col h-full flex-shrink-0 relative">
      {/* Header */}
      <div className="h-14 flex items-center justify-between px-4 border-b border-[#262626] relative">
        <div className="flex items-center gap-2">
          <Tooltip content="Undo changes">
            <button
              className="text-gray-400 hover:text-gray-200 transition-colors p-1 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              aria-label="Undo"
            >
              <RotateCcw size={16} />
            </button>
          </Tooltip>
          <Tooltip content="Copy all drafts">
            <button
              className="text-gray-400 hover:text-gray-200 transition-colors p-1 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              aria-label="Copy all"
            >
              <Copy size={16} />
            </button>
          </Tooltip>
        </div>

        {/* Drafts Label */}
        <div className="flex items-center gap-2 text-[10px] text-gray-400 font-medium">
          <span>Drafts</span>
          <span className="bg-[#262626] px-2 py-0.5 rounded">({drafts.length})</span>
          <Tooltip content="New draft">
            <button
              className="text-gray-500 hover:text-gray-300 p-1 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              aria-label="New draft"
            >
              <Plus size={12} />
            </button>
          </Tooltip>
        </div>

        <div className="flex items-center gap-2">
          {onClose && (
            <Tooltip content="Close panel">
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-200 transition-colors p-1 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                aria-label="Close panel"
              >
                <X size={16} />
              </button>
            </Tooltip>
          )}
          <Tooltip content="Maximize panel">
            <button
              className="text-gray-400 hover:text-gray-200 transition-colors p-1 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              aria-label="Maximize panel"
            >
              <Maximize2 size={16} />
            </button>
          </Tooltip>
        </div>
      </div>

      {/* Horizontal Draft Panes Container */}
      <div className="flex-1 relative overflow-hidden">
        {/* Scroll Indicators */}
        {showLeftScroll && (
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#1a1a1a] to-transparent z-10 flex items-center justify-start pl-2 pointer-events-none">
            <button
              onClick={() => scroll("left")}
              className="bg-[#262626] p-1.5 rounded-full shadow-lg text-gray-400 hover:text-white pointer-events-auto transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500"
              aria-label="Scroll left"
            >
              <ChevronLeft size={16} />
            </button>
          </div>
        )}

        {showRightScroll && drafts.length > 2 && (
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#1a1a1a] to-transparent z-10 flex items-center justify-end pr-2 pointer-events-none">
            <button
              onClick={() => scroll("right")}
              className="bg-[#262626] p-1.5 rounded-full shadow-lg text-gray-400 hover:text-white pointer-events-auto transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500"
              aria-label="Scroll right"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}

        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex h-full overflow-x-auto overflow-y-hidden scrollbar-hide"
        >
          {drafts.map((draft) => (
            <div
              key={draft._id}
              onClick={() => handleSelect(draft)}
              className={`min-w-[200px] w-[200px] border-r border-[#262626] p-4 flex flex-col flex-shrink-0 transition-all duration-200 cursor-pointer relative group ${
                activeDraftId === draft._id || draft.isSelected
                  ? "bg-[#252525] border-b-2 border-b-orange-500"
                  : "hover:bg-[#1f1f1f]"
              }`}
              tabIndex={0}
              role="button"
              aria-pressed={activeDraftId === draft._id}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleSelect(draft);
                }
              }}
            >
              <div className="flex justify-between items-start mb-2">
                <h3
                  className={`text-sm font-medium transition-colors truncate flex-1 ${
                    activeDraftId === draft._id || draft.isSelected
                      ? "text-orange-500"
                      : "text-gray-200 group-hover:text-orange-500"
                  }`}
                >
                  {draft.title}
                </h3>
                <Tooltip content={copiedId === draft._id ? "Copied!" : "Copy text"}>
                  <button
                    onClick={(e) => handleCopy(draft, e)}
                    className={`p-1 rounded hover:bg-[#333] transition-colors ml-2 ${
                      copiedId === draft._id
                        ? "text-green-500"
                        : "text-gray-500 hover:text-gray-300 opacity-0 group-hover:opacity-100"
                    }`}
                    aria-label="Copy text"
                  >
                    {copiedId === draft._id ? <Check size={14} /> : <Copy size={14} />}
                  </button>
                </Tooltip>
              </div>

              <div className="text-[10px] text-gray-500 mb-3 font-mono">
                {draft.content.length} chars · {draft.wordCount || draft.content.split(/\s+/).length} words
              </div>
              <p className="text-gray-300 text-sm leading-relaxed flex-1 overflow-y-auto custom-scrollbar">
                {draft.content}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Copy Toast Notification */}
      {copiedId !== null && (
        <div className="absolute bottom-4 right-4 bg-green-600 text-white text-xs px-3 py-2 rounded shadow-lg animate-slide-in-bottom flex items-center gap-2 z-50">
          <Check size={14} />
          Copied to clipboard!
        </div>
      )}
    </aside>
  );
}
