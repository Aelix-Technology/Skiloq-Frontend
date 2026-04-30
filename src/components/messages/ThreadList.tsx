// src/components/messages/ThreadList.tsx
"use client";

import { useRouter } from "next/navigation";
import { MessageCircle, Lock } from "lucide-react";
import type { Thread } from "@/types/messages";

interface ThreadListProps {
  threads: Thread[];
}

export function ThreadList({ threads }: ThreadListProps) {
  const router = useRouter();

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
    }
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
  };

  if (threads.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center px-4">
        <div className="w-16 h-16 rounded-full bg-primary-50 flex items-center justify-center mb-4">
          <MessageCircle className="w-8 h-8 text-primary-200" />
        </div>
        <h3 className="text-md font-semibold text-primary mb-1">No messages yet</h3>
        <p className="text-sm text-primary-300">
          Messages are available after a booking is confirmed.
        </p>
        <p className="text-xs text-primary-200 mt-2">
          Browse opportunities to get hired and start chatting.
        </p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-primary-50">
      {threads.map((thread) => (
        <button
          key={thread.id}
          onClick={() => router.push(`/worker/messages/${thread.id}`)}
          className="w-full flex items-start gap-3 p-4 text-left hover:bg-primary-50/50 transition-colors"
        >
          {/* Avatar */}
          <div className="w-11 h-11 rounded-full bg-accent-100 flex items-center justify-center shrink-0">
            <span className="text-sm font-bold text-accent">
              {thread.other_user_name.split(" ").map((n) => n[0]).join("")}
            </span>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-0.5">
              <h4 className="text-sm font-semibold text-primary truncate">
                {thread.other_user_name}
              </h4>
              <span className="text-xs text-primary-300 shrink-0 ml-2">
                {formatTime(thread.last_message_time)}
              </span>
            </div>
            <p className="text-xs text-primary-300 mb-0.5">{thread.job_title}</p>
            <p className="text-sm text-primary-300 truncate">{thread.last_message}</p>
          </div>

          {/* Unread badge */}
          <div className="flex flex-col items-center gap-1 shrink-0">
            {thread.unread_count > 0 && (
              <span className="w-5 h-5 bg-accent text-white text-xs font-bold rounded-full flex items-center justify-center">
                {thread.unread_count}
              </span>
            )}
            {!thread.is_active && (
              <Lock className="w-3.5 h-3.5 text-primary-200" />
            )}
          </div>
        </button>
      ))}
    </div>
  );
}