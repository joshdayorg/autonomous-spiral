"use client";

import { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  message: string;
}

export function EmptyState({ icon: Icon, title, message }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center animate-fade-in">
      <div className="w-12 h-12 bg-[#262626] rounded-full flex items-center justify-center mb-4">
        <Icon className="text-gray-500" size={24} />
      </div>
      <h3 className="text-gray-300 font-medium text-sm mb-1">{title}</h3>
      <p className="text-gray-500 text-xs max-w-[200px]">{message}</p>
    </div>
  );
}
