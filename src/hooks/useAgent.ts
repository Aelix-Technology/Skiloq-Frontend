// src/hooks/useAgent.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import { mockAgentStats, mockAgentTasks } from "@/lib/mock-agent";
import { mockDelay } from "@/lib/mock-delay";
import { toasts } from "@/lib/toasts";
import type { AgentStats, AgentTask } from "@/types/agent";

export function useAgentStats() {
  return useQuery<AgentStats>({
    queryKey: ["agent", "stats"],
    queryFn: async () => {
      await mockDelay(400);
      return mockAgentStats;
    },
    staleTime: 30 * 1000,
  });
}

export function useAgentTasks() {
  return useQuery<AgentTask[]>({
    queryKey: ["agent", "tasks"],
    queryFn: async () => {
      await mockDelay(500);
      return mockAgentTasks;
    },
    staleTime: 15 * 1000,
  });
}

export function useAgentTask(taskId: string) {
  return useQuery<AgentTask | null>({
    queryKey: ["agent", "tasks", taskId],
    queryFn: async () => {
      await mockDelay(300);
      return mockAgentTasks.find((t: { id: string; }) => t.id === taskId) || null;
    },
    enabled: !!taskId,
  });
}

export function useAcceptTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (taskId: string) => {
      await mockDelay(500);
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["agent", "tasks"] });
      toasts.profileUpdated();
    },
  });
}

export function useUploadEvidence() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ taskId, file }: { taskId: string; file: File }) => {
      await mockDelay(1000);
      return { success: true, url: URL.createObjectURL(file) };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["agent", "tasks"] });
      toasts.profileUpdated();
    },
  });
}