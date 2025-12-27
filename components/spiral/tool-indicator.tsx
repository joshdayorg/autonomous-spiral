"use client";

import { Globe, ArrowRight, FileText, Search, Loader2 } from "lucide-react";

interface ToolIndicatorProps {
  toolName: string;
  isLoading?: boolean;
}

const toolConfig: Record<string, { icon: typeof Globe; label: string; color: string }> = {
  web_search: {
    icon: Globe,
    label: "Searched the web",
    color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  },
  transfer_to_writer: {
    icon: ArrowRight,
    label: "Transfer to writer",
    color: "text-green-400 bg-green-500/10 border-green-500/20",
  },
  create_draft: {
    icon: FileText,
    label: "Creating draft",
    color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  },
  search_exa: {
    icon: Search,
    label: "Searched the web",
    color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  },
  get_contents: {
    icon: Globe,
    label: "Reading content",
    color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
  },
};

export function ToolIndicator({ toolName, isLoading = false }: ToolIndicatorProps) {
  const config = toolConfig[toolName] || {
    icon: Globe,
    label: toolName,
    color: "text-gray-400 bg-gray-500/10 border-gray-500/20",
  };

  const Icon = config.icon;

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border ${config.color} mb-2 animate-fade-in`}
    >
      {isLoading ? (
        <Loader2 size={14} className="animate-spin" />
      ) : (
        <Icon size={14} />
      )}
      <span>{config.label}</span>
    </div>
  );
}
