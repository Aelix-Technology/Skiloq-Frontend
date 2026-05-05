// src/app/employer/messages/[threadId]/page.tsx
"use client";

import { useParams, useRouter } from "next/navigation";
import { useRef, useEffect } from "react";
import { EmployerLayout } from "@/components/layout/EmployerLayout";
import { MessageBubble } from "@/components/messages/MessageBubble";
import { MessageInput } from "@/components/messages/MessageInput";
import { ErrorState } from "@/components/shared/ErrorState";
import { useThreadMessages, useSendMessage } from "@/hooks/useMessages";
import { ArrowLeft, Shield } from "lucide-react";

export default function EmployerChatPage() {
  const params = useParams();
  const router = useRouter();
  const threadId = params.threadId as string;
  const bottomRef = useRef<HTMLDivElement>(null);

  const { data: messages, isLoading, error, refetch } = useThreadMessages(threadId);
  const sendMessage = useSendMessage(threadId);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (error) {
    return (
      <EmployerLayout>
        <ErrorState title="Couldn't load conversation" onRetry={() => refetch()} />
      </EmployerLayout>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-primary-100">
        <div className="flex items-center h-14 px-4 max-w-3xl mx-auto">
          <button
            onClick={() => router.push("/employer/messages")}
            className="w-9 h-9 flex items-center justify-center rounded-input hover:bg-primary-50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-primary" />
          </button>
          <div className="ml-3">
            <h2 className="text-sm font-semibold text-primary">Conversation</h2>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 max-w-3xl mx-auto w-full">
        {isLoading ? (
          <div className="space-y-4 animate-pulse">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className={`flex ${i % 2 === 0 ? "justify-start" : "justify-end"}`}>
                <div className={`h-16 bg-primary-100 rounded-2xl ${i % 2 === 0 ? "w-2/3" : "w-3/4"}`} />
              </div>
            ))}
          </div>
        ) : messages && messages.length > 0 ? (
          messages.map((msg) => (
            <MessageBubble
              key={msg.id}
              message={msg}
              isOwn={msg.sender_role === "employer"}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Shield className="w-8 h-8 text-primary-200 mb-2" />
            <p className="text-sm text-primary-300">No messages yet</p>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <MessageInput onSend={(content) => sendMessage.mutate(content)} isSending={sendMessage.isPending} />
    </div>
  );
}