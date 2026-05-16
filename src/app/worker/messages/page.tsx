// src/app/worker/messages/page.tsx
"use client";

import { WorkerLayout } from "@/components/layout/WorkerLayout";
import { ThreadList } from "@/components/messages/ThreadList";
import { ErrorState } from "@/components/shared/ErrorState";
import { useThreads } from "@/hooks/useMessages";

export default function MessagesPage() {
  const { data: threads, isLoading, error, refetch } = useThreads();

  return (
    <WorkerLayout>
      <div className="space-y-4">
        {/* Header */}
        <div>
          <h1 className="text-xl font-bold text-primary">Messages</h1>
          <p className="text-sm text-primary-300 mt-0.5">
            Chat with employers after booking is confirmed
          </p>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="space-y-2 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start gap-3 p-4">
                <div className="w-11 h-11 rounded-full bg-primary-100 shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-primary-100 rounded w-32" />
                  <div className="h-3 bg-primary-100 rounded w-48" />
                  <div className="h-3 bg-primary-100 rounded w-3/4" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {error && (
          <ErrorState
            title="Couldn't load messages"
            onRetry={() => refetch()}
          />
        )}

        {/* Threads */}
        {threads && <ThreadList threads={threads} />}
      </div>
    </WorkerLayout>
  );
}
