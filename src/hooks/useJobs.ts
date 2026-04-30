// src/hooks/useJobs.ts
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import { mockJobs } from "@/lib/mock-jobs";
import type { Job } from "@/types/job";

interface JobFilters {
  category?: string;
  skills?: string[];
  trust_score_min?: number;
  availability?: boolean;
  price_min?: number;
  price_max?: number;
  location?: string;
  language?: string;
  sort_by?: "trust_score" | "response_time" | "rate" | "jobs_completed" | "nearest";
  search?: string;
}

export function useJobs(filters: JobFilters = {}) {
  return useQuery<Job[]>({
    queryKey: ["jobs", filters],
    queryFn: async () => {
      // TODO: Replace with apiClient.get("/jobs", { params: filters })
      await new Promise((resolve) => setTimeout(resolve, 600));

      let filtered = [...mockJobs];

      // Apply filters
      if (filters.search) {
        const search = filters.search.toLowerCase();
        filtered = filtered.filter(
          (j) =>
            j.title.toLowerCase().includes(search) ||
            j.description.toLowerCase().includes(search) ||
            j.skills_required.some((s) => s.toLowerCase().includes(search))
        );
      }

      if (filters.price_min) {
        filtered = filtered.filter((j) => j.budget_ghs >= filters.price_min!);
      }
      if (filters.price_max) {
        filtered = filtered.filter((j) => j.budget_ghs <= filters.price_max!);
      }

      if (filters.location) {
        filtered = filtered.filter((j) =>
          j.location_district?.toLowerCase().includes(filters.location!.toLowerCase())
        );
      }

      // Sort
      switch (filters.sort_by) {
        case "rate":
          filtered.sort((a, b) => a.budget_ghs - b.budget_ghs);
          break;
        case "jobs_completed":
          // Mock — in real API this sorts by employer's completed jobs
          filtered.sort((a, b) => b.applications_count - a.applications_count);
          break;
        default:
          // Default: sort by posted date (newest first)
          filtered.sort(
            (a, b) => new Date(b.posted_at).getTime() - new Date(a.posted_at).getTime()
          );
      }

      return filtered;
    },
    staleTime: 2 * 60 * 1000,
  });
}

export function useJob(id: string) {
  return useQuery<Job | null>({
    queryKey: ["jobs", id],
    queryFn: async () => {
      // TODO: Replace with apiClient.get(`/jobs/${id}`)
      await new Promise((resolve) => setTimeout(resolve, 400));
      return mockJobs.find((j) => j.id === id) || null;
    },
    enabled: !!id,
  });
}