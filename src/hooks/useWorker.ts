// src/hooks/useWorker.ts
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import { mockDashboard } from "@/lib/mock-dashboard";
import { mockDelay } from "@/lib/mock-delay";
import type { WorkerDashboard } from "@/types/dashboard";

export function useWorkerDashboard() {
  return useQuery<WorkerDashboard>({
    queryKey: ["workers", "dashboard"],
    queryFn: async () => {
      // TODO: Replace with apiClient.get("/workers/dashboard")
      await mockDelay(800);
      return mockDashboard;
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
  });
}

export function useVerificationStatus() {
  return useQuery({
    queryKey: ["workers", "verification"],
    queryFn: async () => {
      // TODO: Replace with apiClient.get("/workers/verification-status")
      await mockDelay(300);
      return {
        verification_level: "partial" as const,
        steps: [
          { name: "Phone Verification", status: "completed" as const },
          { name: "Identity Document", status: "completed" as const },
          { name: "Skill Assessment", status: "in_review" as const, eta: "24h" },
        ],
        overall_progress: 67,
      };
    },
    staleTime: 2 * 60 * 1000,
  });
}