"use client";

import { Doc, Id } from "../../convex/_generated/dataModel";
import { Plus, PanelLeft, MessageSquare, Sparkles, PenLine, Check } from "lucide-react";

interface SessionSidebarProps {
  sessions: Doc<"sessions">[];
  activeSessionId: Id<"sessions"> | null;
  onSelectSession: (sessionId: Id<"sessions">) => void;
  onNewSession: () => void;
  isOpen: boolean;
  onToggle: () => void;
}

const statusConfig = {
  interviewing: { icon: Sparkles, color: "bg-amber-500", label: "Interviewing" },
  drafting: { icon: PenLine, color: "bg-blue-500", label: "Drafting" },
  refining: { icon: MessageSquare, color: "bg-purple-500", label: "Refining" },
  complete: { icon: Check, color: "bg-green-500", label: "Complete" },
};

export function SessionSidebar({
  sessions,
  activeSessionId,
  onSelectSession,
  onNewSession,
  isOpen,
  onToggle,
}: SessionSidebarProps) {
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    if (days < 7) return `${days} days ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <>
      {/* Toggle button when closed */}
      {!isOpen && (
        <button
          onClick={onToggle}
          className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-white dark:bg-zinc-900 border border-[var(--border)] shadow-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
        >
          <PanelLeft className="w-5 h-5 text-[var(--foreground)]" />
        </button>
      )}

      {/* Sidebar */}
      <aside
        className={`
          border-r border-[var(--border)] bg-white dark:bg-zinc-900 flex flex-col transition-all duration-300 ease-out
          ${isOpen ? "w-72" : "w-0 overflow-hidden"}
        `}
      >
        {/* Header */}
        <div className="p-4 border-b border-[var(--border)] flex items-center justify-between">
          <h2 className="font-serif text-lg font-semibold text-[var(--foreground)]">
            Spiral
          </h2>
          <button 
            onClick={onToggle}
            className="p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <PanelLeft className="w-4 h-4 text-[var(--muted)]" />
          </button>
        </div>

        {/* New Session Button */}
        <div className="p-3">
          <button
            onClick={onNewSession}
            className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <Plus className="w-4 h-4" />
            New Session
          </button>
        </div>

        {/* Sessions List */}
        <div className="flex-1 overflow-y-auto px-2 pb-4">
          {sessions.length === 0 ? (
            <div className="text-center py-8 px-4">
              <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mx-auto mb-3">
                <MessageSquare className="w-5 h-5 text-[var(--muted)]" />
              </div>
              <p className="text-sm text-[var(--muted)]">
                No sessions yet
              </p>
              <p className="text-xs text-[var(--muted)] mt-1">
                Start writing to create your first session
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              {sessions.map((session) => {
                const status = statusConfig[session.status as keyof typeof statusConfig] || statusConfig.interviewing;
                const isActive = activeSessionId === session._id;
                
                return (
                  <button
                    key={session._id}
                    onClick={() => onSelectSession(session._id)}
                    className={`
                      w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all duration-150
                      ${isActive 
                        ? "bg-zinc-100 dark:bg-zinc-800" 
                        : "hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                      }
                    `}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${status.color}`} />
                      <div className="flex-1 min-w-0">
                        <div className={`font-medium truncate ${isActive ? "text-[var(--foreground)]" : "text-zinc-700 dark:text-zinc-300"}`}>
                          {session.title}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs text-[var(--muted)] capitalize">
                            {session.contentType || "blog"}
                          </span>
                          <span className="text-[var(--muted)]">·</span>
                          <span className="text-xs text-[var(--muted)]">
                            {formatDate(session._creationTime)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[var(--border)]">
          <p className="text-xs text-[var(--muted)] text-center">
            Powered by Claude
          </p>
        </div>
      </aside>
    </>
  );
}
