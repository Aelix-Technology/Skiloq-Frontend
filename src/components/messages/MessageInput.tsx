// src/components/messages/MessageInput.tsx
"use client";

import { useState, useRef } from "react";
import { Send, Paperclip, X } from "lucide-react";

interface MessageInputProps {
  onSend: (content: string) => void;
  isSending: boolean;
}

export function MessageInput({ onSend, isSending }: MessageInputProps) {
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    const trimmed = message.trim();
    if (!trimmed || isSending) return;
    onSend(trimmed);
    setMessage("");
    // Reset textarea height
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = () => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 120)}px`;
    }
  };

  return (
    <div className="border-t border-primary-100 bg-white p-3 safe-area-bottom">
      <div className="flex items-end gap-2 max-w-2xl mx-auto">
        {/* Attachment button */}
        <button className="w-10 h-10 flex items-center justify-center rounded-input hover:bg-primary-50 transition-colors shrink-0">
          <Paperclip className="w-5 h-5 text-primary-300" />
        </button>

        {/* Text input */}
        <div className="flex-1 bg-primary-50 rounded-2xl border border-primary-100 overflow-hidden">
          <textarea
            ref={inputRef}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              handleInput();
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            rows={1}
            className="w-full bg-transparent px-4 py-2.5 text-sm text-primary placeholder:text-primary-200 resize-none focus:outline-none max-h-[120px]"
          />
        </div>

        {/* Send button */}
        <button
          onClick={handleSend}
          disabled={!message.trim() || isSending}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-accent text-white hover:bg-accent-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
        >
          {isSending ? (
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          ) : (
            <Send className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
}
