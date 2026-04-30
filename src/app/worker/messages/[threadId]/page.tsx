// src/app/worker/messages/[threadId]/page.tsx
"use client";

import { useParams, useRouter } from "next/navigation";
import { useRef, useEffect } from "react";
import { WorkerLayout } from "@/components/layout/WorkerLayout";
import { MessageBubble } from "@/components/messages/MessageBubble";
import { MessageInput } from "@/components/messages/MessageInput";
import { ErrorState } from "@/components/shared/ErrorState";
import { useThreadMessages, useSendMessage } from "@/hooks/useMessages";
import { ArrowLeft, Phone, Shield } from "lucide-react";

export default function ChatPage() {
  const params = useParams();
  const router = useRouter();
  const threadId = params.threadId as string;
  const bottomRef = useRef<HTMLDivElement>(null);

  const { data: messages, isLoading, error, refetch } = useThreadMessages(threadId);
  const sendMessage = useSendMessage(threadId);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Get thread info from the first message
  const threadInfo = messages && messages.length > 0
    ? { otherName: messages[0].sender_role === "employer" ? messages[0].sender_name : "Employer" }
    : { otherName: "Loading..." };

  const handleSend = (content: string) => {
    sendMessage.mutate(content);
  };

  if (error) {
    return (
      <WorkerLayout>
        <ErrorState title="Couldn't load conversation" onRetry={() => refetch()} />
      </WorkerLayout>
    );
  }

  return (
    // Full-screen chat layout (overrides WorkerLayout bottom padding)
    <div className="min-h-screen bg-white flex flex-col">
      {/* Chat header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-primary-100">
        <div className="flex items-center justify-between h-14 px-4 max-w-2xl mx-auto">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => router.back()}
              className="w-9 h-9 flex items-center justify-center rounded-input hover:bg-primary-50 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-primary" />
            </button>
            <div className="min-w-0">
              <h2 className="text-sm font-semibold text-primary truncate">
                {threadInfo.otherName}
              </h2>
              <p className="text-xs text-primary-300">Booking confirmed</p>
            </div>
          </div>
        </div>
      </header>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 max-w-2xl mx-auto w-full">
        {isLoading ? (
          <div className="space-y-4 animate-pulse">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className={`flex ${i % 2 === 0 ? "justify-end" : "justify-start"}`}>
                <div className={`h-16 bg-primary-100 rounded-2xl ${i % 2 === 0 ? "w-3/4" : "w-2/3"}`} />
              </div>
            ))}
          </div>
        ) : messages && messages.length > 0 ? (
          messages.map((msg) => (
            <MessageBubble
              key={msg.id}
              message={msg}
              isOwn={msg.sender_role === "worker"}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Shield className="w-8 h-8 text-primary-200 mb-2" />
            <p className="text-sm text-primary-300">No messages yet</p>
            <p className="text-xs text-primary-200 mt-1">Start the conversation</p>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Message input — fixed bottom */}
      <MessageInput onSend={handleSend} isSending={sendMessage.isPending} />
    </div>
  );
}