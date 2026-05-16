// src/hooks/useEmployer.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import { mockEmployerDashboard, mockEmployerPayments } from "@/lib/mock-employer";
import { mockWorkers } from "@/lib/mock-workers";
import { mockJobs } from "@/lib/mock-jobs";
import { mockDelay } from "@/lib/mock-delay";
import { toasts } from "@/lib/toasts";
import type { EmployerDashboard, EmployerPaymentsData } from "@/types/employer";
import type { Worker } from "@/types/worker";
import type { Job } from "@/types/job";

// ── Dashboard ──────────────────────────────

export function useEmployerDashboard() {
  return useQuery<EmployerDashboard>({
    queryKey: ["employer", "dashboard"],
    queryFn: async () => {
      // TODO: Replace with apiClient.get("/employer/dashboard")
      await mockDelay(600);
      return mockEmployerDashboard;
    },
    staleTime: 2 * 60 * 1000,
  });
}

// ── Talent Search ──────────────────────────

interface TalentFilters {
  category?: string;
  skills?: string[];
  trust_score_min?: number;
  availability?: boolean;
  price_min?: number;
  price_max?: number;
  location?: string;
  sort_by?: string;
  search?: string;
}

export function useTalentSearch(filters: TalentFilters = {}) {
  return useQuery<Worker[]>({
    queryKey: ["employer", "talent", filters],
    queryFn: async () => {
      // TODO: Replace with apiClient.get("/search/workers", { params: filters })
      await mockDelay(500);
      return mockWorkers;
    },
    staleTime: 2 * 60 * 1000,
  });
}

// ── Post Job ───────────────────────────────

export function usePostJob() {
  const queryClient = useQueryClient();

  return useMutation<Job, Error, Partial<Job>>({
    mutationFn: async (data) => {
      // TODO: Replace with apiClient.post("/jobs", data)
      await mockDelay(1000);
      return {
        id: `job-${Date.now()}`,
        employer_id: "e001",
        employer_name: "FinTech Ghana Ltd",
        employer_rating: 4.5,
        title: data.title || "",
        description: data.description || "",
        budget_ghs: data.budget_ghs || 0,
        status: "open",
        skills_required: data.skills_required || [],
        posted_at: new Date().toISOString(),
        applications_count: 0,
        is_remote: data.is_remote ?? true,
      };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employer", "dashboard"] });
      toasts.profileUpdated(); // Reuse toast — replace with dedicated job post toast
    },
  });
}

// ── Payments ───────────────────────────────

export function useEmployerPayments() {
  return useQuery<EmployerPaymentsData>({
    queryKey: ["employer", "payments"],
    queryFn: async () => {
      // TODO: Replace with apiClient.get("/employer/payments")
      await mockDelay(500);
      return mockEmployerPayments;
    },
    staleTime: 30 * 1000,
  });
}
