"use client";

import {
  Plus,
  User,
  MessageSquare,
  Moon,
  CreditCard,
  Megaphone,
  PenSquare,
  Palette,
  History,
  PanelLeftClose,
  PanelLeft,
} from "lucide-react";
import { HistoryItem } from "./history-item";
import { Tooltip } from "./tooltip";
import { EmptyState } from "./empty-state";
import { Doc, Id } from "../../convex/_generated/dataModel";

interface SidebarProps {
  sessions: Doc<"sessions">[];
  activeSessionId: Id<"sessions"> | null;
  onSelectSession: (sessionId: Id<"sessions">) => void;
  onNewSession: () => void;
  isCollapsed?: boolean;
  onToggle?: () => void;
}

export function Sidebar({
  sessions,
  activeSessionId,
  onSelectSession,
  onNewSession,
  isCollapsed = false,
  onToggle,
}: SidebarProps) {
  // Collapsed sidebar - icons only
  if (isCollapsed) {
    return (
      <aside className="w-[60px] h-full flex flex-col bg-[#121212] border-r border-[#262626] items-center py-4">
        {/* Logo */}
        <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-900/20 mb-4">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
        </div>

        {/* Expand button */}
        <Tooltip content="Expand sidebar" position="right">
          <button
            onClick={onToggle}
            className="p-2 text-gray-500 hover:text-gray-300 hover:bg-[#1a1a1a] rounded-lg transition-colors mb-4"
            aria-label="Expand sidebar"
          >
            <PanelLeft size={18} />
          </button>
        </Tooltip>

        {/* New session */}
        <Tooltip content="New writing session" position="right">
          <button
            onClick={onNewSession}
            className="p-2 text-gray-400 hover:text-orange-500 hover:bg-[#1a1a1a] rounded-lg transition-colors mb-1"
          >
            <PenSquare size={18} />
          </button>
        </Tooltip>

        {/* Styles */}
        <Tooltip content="Styles" position="right">
          <button className="p-2 text-gray-400 hover:text-orange-500 hover:bg-[#1a1a1a] rounded-lg transition-colors mb-4">
            <Palette size={18} />
          </button>
        </Tooltip>

        {/* History */}
        <div className="flex-1 overflow-y-auto w-full px-2">
          {sessions.slice(0, 8).map((session) => (
            <Tooltip key={session._id} content={session.title} position="right">
              <button
                onClick={() => onSelectSession(session._id)}
                className={`w-full p-2 rounded-lg transition-colors mb-1 flex items-center justify-center ${
                  activeSessionId === session._id
                    ? "bg-orange-500/10 text-orange-400"
                    : "text-gray-500 hover:text-gray-300 hover:bg-[#1a1a1a]"
                }`}
              >
                <MessageSquare size={16} />
              </button>
            </Tooltip>
          ))}
        </div>

        {/* Account */}
        <Tooltip content="Account" position="right">
          <button className="p-2 text-gray-400 hover:text-gray-200 hover:bg-[#1a1a1a] rounded-lg transition-colors mt-2">
            <User size={18} />
          </button>
        </Tooltip>
      </aside>
    );
  }

  // Expanded sidebar - full content
  return (
    <aside className="w-full h-full flex flex-col bg-[#121212] border-r border-[#262626]">
      {/* Brand */}
      <div className="p-4 flex items-center gap-3 mb-2">
        <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-900/20">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white"
          >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
        </div>
        <span className="text-white font-semibold text-lg tracking-tight">
          Spiral
        </span>
        <div className="ml-auto text-gray-500">
          <Tooltip content="Collapse sidebar" position="bottom">
            <button
              onClick={onToggle}
              className="p-1 hover:text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 rounded"
              aria-label="Collapse sidebar"
            >
              <PanelLeftClose size={16} />
            </button>
          </Tooltip>
        </div>
      </div>

      {/* Main Actions */}
      <div className="px-3 space-y-1 mb-6">
        <button
          onClick={onNewSession}
          className="w-full flex items-center gap-3 px-3 py-3 md:py-2 text-gray-300 hover:bg-[#1a1a1a] rounded-md transition-all duration-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 group"
        >
          <PenSquare size={18} className="group-hover:text-orange-500 transition-colors" />
          New writing session
          <span className="ml-auto text-[10px] text-gray-600 border border-gray-800 px-1.5 rounded hidden group-hover:inline-block">
            ⌘K
          </span>
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-3 md:py-2 text-gray-300 hover:bg-[#1a1a1a] rounded-md transition-all duration-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 group">
          <Palette size={18} className="group-hover:text-orange-500 transition-colors" />
          Styles
        </button>
      </div>

      {/* Workspaces */}
      <div className="px-4 mb-2">
        <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
          Workspaces
        </h3>
        <div className="flex items-center gap-2 px-2 py-2 bg-[#1a1a1a] rounded text-gray-300 text-sm mb-2 hover:bg-[#222] transition-colors cursor-pointer">
          <User size={14} className="text-gray-400" />
          <span>Personal</span>
        </div>
        <p className="text-xs text-gray-500 mb-2 px-1">
          Create a Workspace to get started
        </p>
        <button className="flex items-center gap-2 text-gray-400 hover:text-gray-200 text-sm px-1 py-1 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 rounded">
          <Plus size={14} />
          Create a Workspace
        </button>
      </div>

      {/* History */}
      <div className="flex-1 overflow-y-auto px-3 py-4 min-h-0 custom-scrollbar">
        <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3 px-1">
          History
        </h3>
        {sessions.length === 0 ? (
          <EmptyState
            icon={History}
            title="No history yet"
            message="Your past writing sessions will appear here."
          />
        ) : (
          <div className="space-y-0.5">
            {sessions.map((session) => (
              <HistoryItem
                key={session._id}
                title={session.title}
                active={activeSessionId === session._id}
                onClick={() => onSelectSession(session._id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Footer Settings */}
      <div className="p-3 border-t border-[#262626] space-y-1">
        <div className="flex items-center justify-between px-2 py-1.5 mb-1">
          <span className="text-xs text-gray-500 font-medium">Plan</span>
          <span className="text-xs bg-orange-500 text-white px-2 py-0.5 rounded font-medium shadow-sm shadow-orange-900/50">
            Personal
          </span>
        </div>

        <button className="w-full flex items-center gap-3 px-2 py-2 text-gray-400 hover:text-gray-200 text-sm rounded-md hover:bg-[#1a1a1a] transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500">
          <Megaphone size={16} />
          What&apos;s new
        </button>
        <button className="w-full flex items-center gap-3 px-2 py-2 text-gray-400 hover:text-gray-200 text-sm rounded-md hover:bg-[#1a1a1a] transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500">
          <MessageSquare size={16} />
          Feedback
        </button>
        <button className="w-full flex items-center gap-3 px-2 py-2 text-gray-400 hover:text-gray-200 text-sm rounded-md hover:bg-[#1a1a1a] transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500">
          <CreditCard size={16} />
          Shortcuts
        </button>
        <button className="w-full flex items-center gap-3 px-2 py-2 text-gray-400 hover:text-gray-200 text-sm rounded-md hover:bg-[#1a1a1a] transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500">
          <Moon size={16} />
          Light mode
        </button>
        <button className="w-full flex items-center gap-3 px-2 py-2 text-gray-400 hover:text-gray-200 text-sm rounded-md hover:bg-[#1a1a1a] transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500">
          <User size={16} />
          Account
        </button>
      </div>
    </aside>
  );
}
