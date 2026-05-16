// src/hooks/useMessages.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import { mockThreads, mockMessages } from "@/lib/mock-messages";
import { mockDelay } from "@/lib/mock-delay";
import type { Thread, Message } from "@/types/messages";

export function useThreads() {
  return useQuery<Thread[]>({
    queryKey: ["messages", "threads"],
    queryFn: async () => {
      // TODO: Replace with apiClient.get("/messages/threads")
      await mockDelay(500);
      return mockThreads;
    },
    staleTime: 30 * 1000,
    refetchInterval: 15 * 1000, // Poll for new messages
  });
}

export function useThreadMessages(threadId: string) {
  return useQuery<Message[]>({
    queryKey: ["messages", "thread", threadId],
    queryFn: async () => {
      // TODO: Replace with apiClient.get(`/messages/${threadId}`)
      await mockDelay(400);
      return mockMessages[threadId] || [];
    },
    enabled: !!threadId,
    staleTime: 10 * 1000,
  });
}

export function useSendMessage(threadId: string) {
  const queryClient = useQueryClient();

  return useMutation<Message, Error, string>({
    mutationFn: async (content) => {
      // TODO: Replace with apiClient.post(`/messages/${threadId}`, { content })
      await mockDelay(300);

      return {
        id: `msg-${Date.now()}`,
        thread_id: threadId,
        sender_id: "w001",
        sender_name: "Akua Serwaa",
        sender_role: "worker",
        content,
        timestamp: new Date().toISOString(),
        status: "sent",
      };
    },
    onSuccess: (newMessage) => {
      // Optimistically add the message to the cache
      queryClient.setQueryData<Message[]>(
        ["messages", "thread", threadId],
        (old) => [...(old || []), newMessage]
      );
      // Refetch threads to update last message
      queryClient.invalidateQueries({ queryKey: ["messages", "threads"] });
    },
  });
}
