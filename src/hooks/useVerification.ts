// src/hooks/useVerification.ts
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import { mockVerificationStatus } from "@/lib/mock-bookings";
import { mockDelay } from "@/lib/mock-delay";
import type { VerificationStatus } from "@/types/worker";

export function useVerificationStatus() {
  return useQuery<VerificationStatus>({
    queryKey: ["workers", "verification"],
    queryFn: async () => {
      // TODO: Replace with apiClient.get("/workers/verification-status")
      await mockDelay(400);
      return mockVerificationStatus;
    },
    staleTime: 2 * 60 * 1000,
    refetchInterval: (data) => {
      // Auto-refresh while verification is pending
      if (data?.steps.some((s) => s.status === "in_review" || s.status === "pending")) {
        return 30 * 1000;
      }
      return false;
    },
  });
}