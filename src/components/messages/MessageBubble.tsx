// src/components/messages/MessageBubble.tsx
"use client";

import { FileText, Image, Paperclip, Check, CheckCheck } from "lucide-react";
import type { Message } from "@/types/messages";

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
}

export function MessageBubble({ message, isOwn }: MessageBubbleProps) {
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
  };

  const hasAttachment = !!message.attachment;

  return (
    <div className={`flex ${isOwn ? "justify-end" : "justify-start"} mb-3`}>
      <div className={`max-w-[80%] ${isOwn ? "order-1" : "order-1"}`}>
        {/* Sender name for other person's messages */}
        {!isOwn && (
          <p className="text-xs text-primary-300 mb-1 px-1">{message.sender_name}</p>
        )}

        {/* Message bubble */}
        <div
          className={`rounded-2xl px-4 py-2.5 ${
            isOwn
              ? "bg-accent text-white rounded-br-md"
              : "bg-primary-50 text-primary rounded-bl-md"
          }`}
        >
          {/* Text content */}
          {message.content && (
            <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
              {message.content}
            </p>
          )}

          {/* Attachment */}
          {hasAttachment && message.attachment && (
            <a
              href={message.attachment.url}
              className={`flex items-center gap-3 p-2 rounded-card mt-1 ${
                isOwn ? "bg-white/10" : "bg-white"
              }`}
              onClick={(e) => {
                // Mock download — will be real URL in production
                e.preventDefault();
              }}
            >
              <div className={`w-9 h-9 rounded flex items-center justify-center ${
                isOwn ? "bg-white/20" : "bg-primary-100"
              }`}>
                {message.attachment.type === "image" ? (
                  <Image className={`w-4 h-4 ${isOwn ? "text-white" : "text-primary-300"}`} />
                ) : (
                  <FileText className={`w-4 h-4 ${isOwn ? "text-white" : "text-primary-300"}`} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-xs font-medium truncate ${isOwn ? "text-white" : "text-primary"}`}>
                  {message.attachment.name}
                </p>
                <p className={`text-xs ${isOwn ? "text-white/70" : "text-primary-300"}`}>
                  {message.attachment.size}
                </p>
              </div>
              <Paperclip className={`w-3.5 h-3.5 ${isOwn ? "text-white/70" : "text-primary-300"}`} />
            </a>
          )}
        </div>

        {/* Timestamp + status */}
        <div className={`flex items-center gap-1 mt-0.5 px-1 ${isOwn ? "justify-end" : "justify-start"}`}>
          <span className="text-xs text-primary-200">{formatTime(message.timestamp)}</span>
          {isOwn && (
            <span className="text-primary-200">
              {message.status === "read" ? (
                <CheckCheck className="w-3.5 h-3.5 text-accent" />
              ) : message.status === "delivered" ? (
                <CheckCheck className="w-3.5 h-3.5" />
              ) : (
                <Check className="w-3.5 h-3.5" />
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}