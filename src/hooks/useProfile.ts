// src/hooks/useProfile.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import { mockDelay } from "@/lib/mock-delay";
import { toasts } from "@/lib/toasts";
import type { Worker } from "@/types/worker";

const mockProfile: Worker = {
  id: "w001",
  user_id: "u001",
  full_name: "Akua Serwaa",
  category: "digital",
  bio: "Frontend developer with 3 years building React and Next.js applications for Ghanaian startups. Specialized in fintech dashboards and mobile-first web applications.",
  location_district: "Accra Metropolitan",
  hourly_rate_ghs: 75.00,
  trust_score: 82.5,
  is_visible_in_search: true,
  verification_level: "verified",
  global_earner_status: false,
  badge: "Top Rated",
  completed_jobs: 34,
  skills: [
    { id: "s1", name: "React Developer", assessment_score: 88, verified: true, assessment_required: true },
    { id: "s2", name: "UI Designer", assessment_score: 75, verified: true, assessment_required: false },
    { id: "s3", name: "TypeScript", assessment_score: 90, verified: true, assessment_required: true },
    { id: "s4", name: "Figma", assessment_score: 82, verified: true, assessment_required: false },
    { id: "s5", name: "Node.js", assessment_score: 70, verified: true, assessment_required: true },
  ],
  portfolio: [
    { id: "p1", type: "image", url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop", title: "E-commerce Dashboard" },
    { id: "p2", type: "image", url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop", title: "Fintech Analytics Platform" },
    { id: "p3", type: "image", url: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&h=400&fit=crop", title: "Mobile Banking App" },
    { id: "p4", type: "link", url: "https://github.com/akua/project", title: "Open Source Fintech UI" },
  ],
  reviews: [
    { id: "r1", job_id: "j1", reviewer_id: "e1", reviewer_name: "John Mensah", rating: 5, comment: "Excellent work, delivered ahead of schedule.", submitted_at: "2026-01-15" },
    { id: "r2", job_id: "j2", reviewer_id: "e2", reviewer_name: "Sarah Osei", rating: 4, comment: "Great React skills. Would hire again.", submitted_at: "2025-12-20" },
    { id: "r3", job_id: "j3", reviewer_id: "e3", reviewer_name: "David Addo", rating: 5, comment: "Best freelancer on the platform.", submitted_at: "2025-11-05" },
    { id: "r4", job_id: "j4", reviewer_id: "e4", reviewer_name: "Grace Tagoe", rating: 5, comment: "Rare talent. Great design and technical ability.", submitted_at: "2025-10-18" },
  ],
};

export function useWorkerProfile() {
  return useQuery<Worker>({
    queryKey: ["workers", "profile"],
    queryFn: async () => {
      // TODO: Replace with apiClient.get("/workers/profile")
      await mockDelay(400);
      return mockProfile;
    },
    staleTime: 10 * 60 * 1000,
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation<Worker, Error, Partial<Worker>>({
    mutationFn: async (data) => {
      // TODO: Replace with apiClient.put("/workers/profile", data)
      await mockDelay(800);
      return { ...mockProfile, ...data };
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["workers", "profile"], data);
      queryClient.invalidateQueries({ queryKey: ["workers", "dashboard"] });
      toasts.profileUpdated();
    },
    onError: () => {
      toasts.profileError();
    },
  });
}