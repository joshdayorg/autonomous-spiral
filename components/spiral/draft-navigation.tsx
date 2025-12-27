"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Doc, Id } from "../../convex/_generated/dataModel";
import { Tooltip } from "./tooltip";

interface DraftNavigationProps {
  drafts: Doc<"drafts">[];
  activeDraftId?: Id<"drafts">;
  onSelectDraft?: (draftId: Id<"drafts">) => void;
  onNewDraft?: () => void;
}

export function DraftNavigation({
  drafts,
  activeDraftId,
  onSelectDraft,
  onNewDraft,
}: DraftNavigationProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleSelect = (draft: Doc<"drafts">, index: number) => {
    setActiveIndex(index);
    onSelectDraft?.(draft._id);
  };

  return (
    <div className="w-20 bg-[#0f0f0f] border-l border-[#262626] flex flex-col h-full flex-shrink-0">
      {/* Header */}
      <div className="p-2 border-b border-[#262626]">
        <div className="text-[10px] text-gray-400 font-medium mb-1">Drafts</div>
        <div className="text-[10px] text-gray-500">({drafts.length})</div>
      </div>

      {/* Draft List */}
      <div className="flex-1 overflow-y-auto py-2 custom-scrollbar">
        {drafts.length === 0 ? (
          <p className="text-[10px] text-gray-600 px-2">No drafts</p>
        ) : (
          drafts.map((draft, index) => {
            const truncatedTitle =
              draft.title.length > 15
                ? draft.title.slice(0, 12) + "..."
                : draft.title;
            const isActive = activeDraftId === draft._id || activeIndex === index;

            return (
              <Tooltip key={draft._id} content={draft.title} position="left">
                <button
                  onClick={() => handleSelect(draft, index)}
                  className={`w-full px-2 py-2 text-[10px] transition-colors text-left truncate relative ${
                    isActive
                      ? "text-orange-500 bg-[#1a1a1a] border-l-2 border-orange-500"
                      : "text-gray-400 hover:text-gray-200 hover:bg-[#1a1a1a] border-l-2 border-transparent"
                  }`}
                  aria-label={`Select draft: ${draft.title}`}
                  aria-pressed={isActive}
                >
                  {truncatedTitle}
                </button>
              </Tooltip>
            );
          })
        )}
      </div>

      {/* Add Button */}
      <div className="p-2 border-t border-[#262626]">
        <Tooltip content="Create new draft" position="left">
          <button
            onClick={onNewDraft}
            className="w-full flex items-center justify-center p-1.5 text-gray-400 hover:text-gray-200 hover:bg-[#1a1a1a] rounded transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500"
            aria-label="Create new draft"
          >
            <Plus size={14} />
          </button>
        </Tooltip>
      </div>
    </div>
  );
}
