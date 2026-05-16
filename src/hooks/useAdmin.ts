// src/hooks/useAdmin.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import { mockAdminStats, mockVerificationQueue, mockDisputes, mockFraudAlerts, mockAdminUsers } from "@/lib/mock-admin";
import { mockDelay } from "@/lib/mock-delay";
import { toasts } from "@/lib/toasts";
import type { AdminStats, VerificationItem, DisputeItem, FraudAlert, AdminUser } from "@/types/admin";

// ── Dashboard Stats ────────────────────────

export function useAdminStats() {
  return useQuery<AdminStats>({
    queryKey: ["admin", "stats"],
    queryFn: async () => {
      // TODO: Replace with apiClient.get("/admin/stats")
      await mockDelay(400);
      return mockAdminStats;
    },
    staleTime: 30 * 1000,
    refetchInterval: 30 * 1000,
  });
}

// ── Verification Queue ─────────────────────

export function useVerificationQueue() {
  return useQuery<VerificationItem[]>({
    queryKey: ["admin", "verification-queue"],
    queryFn: async () => {
      // TODO: Replace with apiClient.get("/admin/verification-queue")
      await mockDelay(500);
      return mockVerificationQueue;
    },
    staleTime: 15 * 1000,
    refetchInterval: 30 * 1000,
  });
}

export function useApproveVerification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      // TODO: Replace with apiClient.post(`/admin/verification-queue/${id}/approve`)
      await mockDelay(600);
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "verification-queue"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "stats"] });
      toasts.profileUpdated();
    },
  });
}

export function useRejectVerification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, reason }: { id: string; reason: string }) => {
      // TODO: Replace with apiClient.post(`/admin/verification-queue/${id}/reject`, { reason })
      await mockDelay(600);
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "verification-queue"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "stats"] });
      toasts.profileUpdated();
    },
  });
}

// ── Disputes ───────────────────────────────

export function useDisputes() {
  return useQuery<DisputeItem[]>({
    queryKey: ["admin", "disputes"],
    queryFn: async () => {
      // TODO: Replace with apiClient.get("/admin/disputes")
      await mockDelay(400);
      return mockDisputes;
    },
    staleTime: 15 * 1000,
  });
}

export function useResolveDispute() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, outcome }: { id: string; outcome: string }) => {
      // TODO: Replace with apiClient.post(`/admin/disputes/${id}/resolve`, { outcome })
      await mockDelay(800);
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "disputes"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "stats"] });
      toasts.profileUpdated();
    },
  });
}

// ── Fraud Alerts ───────────────────────────

export function useFraudAlerts() {
  return useQuery<FraudAlert[]>({
    queryKey: ["admin", "fraud-alerts"],
    queryFn: async () => {
      // TODO: Replace with apiClient.get("/admin/fraud-alerts")
      await mockDelay(400);
      return mockFraudAlerts;
    },
    staleTime: 15 * 1000,
  });
}

// ── User Management ────────────────────────

export function useAdminUsers() {
  return useQuery<AdminUser[]>({
    queryKey: ["admin", "users"],
    queryFn: async () => {
      // TODO: Replace with apiClient.get("/admin/users")
      await mockDelay(500);
      return mockAdminUsers;
    },
    staleTime: 30 * 1000,
  });
}

export function useToggleUserBan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, isActive }: { id: string; isActive: boolean }) => {
      // TODO: Replace with apiClient.post(`/admin/users/${id}/toggle-ban`, { isActive })
      await mockDelay(400);
      return { success: true, isActive };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
    },
  });
}
