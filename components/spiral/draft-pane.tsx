"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { Doc, Id } from "../../convex/_generated/dataModel";
import { api } from "../../convex/_generated/api";
import { X, Check, Copy, PenLine, Sparkles, Zap, MessageSquare } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface DraftPaneProps {
  drafts: Doc<"drafts">[];
  sessionId: Id<"sessions">;
  onClose: () => void;
}

const strategyIcons: Record<string, typeof Sparkles> = {
  "Vivid Scene": Sparkles,
  "Story First": Sparkles,
  "You Think/But Actually": Zap,
  "Contrarian Hook": PenLine,
  "Confession": MessageSquare,
  "Myth Buster": Zap,
};

const strategyColors: Record<string, string> = {
  "Vivid Scene": "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400",
  "Story First": "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400",
  "You Think/But Actually": "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
  "Contrarian Hook": "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
  "Confession": "bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400",
  "Myth Buster": "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
};

export function DraftPane({ drafts, sessionId, onClose }: DraftPaneProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const selectDraft = useMutation(api.drafts.select);

  const handleCopy = async (draft: Doc<"drafts">, index: number) => {
    await navigator.clipboard.writeText(draft.content);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleSelect = async (draft: Doc<"drafts">, index: number) => {
    await selectDraft({
      draftId: draft._id,
      sessionId,
    });
    setSelectedIndex(index);
  };

  // Parse drafts from the AI response if they're embedded in a single message
  const parsedDrafts = drafts.length > 0 ? drafts : [];

  return (
    <aside className="w-[420px] border-l border-[var(--border)] bg-[var(--background)] flex flex-col animate-slide-in">
      {/* Header */}
      <div className="px-5 py-4 border-b border-[var(--border)] flex items-center justify-between bg-white/50 dark:bg-zinc-900/50">
        <div>
          <h2 className="font-serif text-lg font-medium text-[var(--foreground)]">
            Your Drafts
          </h2>
          <p className="text-sm text-[var(--muted)]">
            {parsedDrafts.length} variations ready
          </p>
        </div>
        <button 
          onClick={onClose}
          className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        >
          <X className="w-4 h-4 text-[var(--muted)]" />
        </button>
      </div>

      {/* Draft Cards */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 stagger-children">
        {parsedDrafts.map((draft, index) => {
          const strategy = draft.strategy || "Default";
          const Icon = strategyIcons[strategy] || Sparkles;
          const colorClass = strategyColors[strategy] || "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400";
          const isSelected = selectedIndex === index || draft.isSelected;
          const isCopied = copiedIndex === index;

          return (
            <div
              key={draft._id}
              className={`draft-card ${isSelected ? 'selected' : ''}`}
            >
              {/* Strategy Badge */}
              <div className="flex items-center justify-between mb-3">
                <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${colorClass}`}>
                  <Icon className="w-3 h-3" />
                  {strategy}
                </div>
                <span className="text-xs text-[var(--muted)]">
                  {draft.wordCount || draft.content.split(/\s+/).length} words
                </span>
              </div>

              {/* Draft Content */}
              <div className="prose-draft text-[14px] leading-relaxed mb-4">
                <ReactMarkdown
                  components={{
                    p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                    ul: ({ children }) => <ul className="list-disc list-inside space-y-1 my-2">{children}</ul>,
                    li: ({ children }) => <li>{children}</li>,
                    hr: () => <hr className="my-3 border-[var(--border)]" />,
                  }}
                >
                  {draft.content}
                </ReactMarkdown>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-3 border-t border-[var(--border)]">
                <button
                  onClick={() => handleCopy(draft, index)}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg border border-[var(--border)] hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-500" />
                      <span className="text-green-600 dark:text-green-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => handleSelect(draft, index)}
                  className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isSelected
                      ? "bg-blue-500 text-white"
                      : "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:opacity-90"
                  }`}
                >
                  {isSelected ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Selected</span>
                    </>
                  ) : (
                    <span>Use This</span>
                  )}
                </button>
              </div>
            </div>
          );
        })}

        {parsedDrafts.length === 0 && (
          <div className="text-center py-12">
            <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mx-auto mb-4">
              <PenLine className="w-6 h-6 text-[var(--muted)]" />
            </div>
            <p className="text-[var(--muted)] text-sm">
              Drafts will appear here once the Writer agent creates them.
            </p>
          </div>
        )}
      </div>

      {/* Footer Tip */}
      <div className="px-5 py-3 border-t border-[var(--border)] bg-zinc-50 dark:bg-zinc-900/50">
        <p className="text-xs text-[var(--muted)] text-center">
          Not quite right? Ask for revisions in the chat.
        </p>
      </div>
    </aside>
  );
}
