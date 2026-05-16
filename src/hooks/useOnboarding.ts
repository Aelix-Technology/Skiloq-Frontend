// src/hooks/useOnboarding.ts
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import { workerCategories, ghanaDistricts, ghanaianLanguages } from "@/lib/categories";
import { skillTagsByCategory, mockAssessmentQuestions } from "@/lib/skill-tags";
import { mockDelay } from "@/lib/mock-delay";
import type { CategoryOption, SkillTag, AssessmentQuestion } from "@/types/onboarding";

// ── Queries ────────────────────────────────

/** Fetch all worker categories for the onboarding step */
export function useCategories() {
  return useQuery<CategoryOption[]>({
    queryKey: ["onboarding", "categories"],
    queryFn: async () => {
      // TODO: Replace with apiClient.get("/categories")
      await mockDelay(300);
      return workerCategories;
    },
    staleTime: Infinity,
  });
}

/** Fetch Ghana districts for the profile location selector */
export function useDistricts() {
  return useQuery<string[]>({
    queryKey: ["onboarding", "districts"],
    queryFn: async () => {
      // TODO: Replace with apiClient.get("/districts")
      await mockDelay(200);
      return ghanaDistricts;
    },
    staleTime: Infinity,
  });
}

/** Fetch supported languages for the profile language selector */
export function useLanguages() {
  return useQuery<string[]>({
    queryKey: ["onboarding", "languages"],
    queryFn: async () => {
      // TODO: Replace with apiClient.get("/languages")
      await mockDelay(200);
      return ghanaianLanguages;
    },
    staleTime: Infinity,
  });
}

/** Fetch skill tags for the selected worker category */
export function useSkillTags(category: string) {
  return useQuery<SkillTag[]>({
    queryKey: ["onboarding", "skills", category],
    queryFn: async () => {
      // TODO: Replace with apiClient.get(`/skills?category=${category}`)
      await mockDelay(400);
      return skillTagsByCategory[category] || [];
    },
    enabled: !!category,
  });
}

/** Fetch assessment questions for a specific skill tag */
export function useAssessment(skillTagId: string) {
  return useQuery<AssessmentQuestion[]>({
    queryKey: ["onboarding", "assessment", skillTagId],
    queryFn: async () => {
      // TODO: Replace with apiClient.get(`/assessments/${skillTagId}/start`)
      await mockDelay(500);
      // Return mock questions based on category
      if (skillTagId.includes("digital") || skillTagId.includes("react") || skillTagId.includes("typescript")) {
        return mockAssessmentQuestions.digital;
      }
      return mockAssessmentQuestions.trade;
    },
    enabled: !!skillTagId,
  });
}

// ── Mutations ──────────────────────────────

/** Submit the completed onboarding data */
export function useSubmitOnboarding() {
  return useMutation({
    mutationFn: async (data: Record<string, unknown>) => {
      // TODO: Replace with apiClient.post("/workers/onboarding/complete", data)
      await mockDelay(2000);
      return { success: true };
    },
  });
}

/** Submit identity documents for verification */
export function useSubmitIdentity() {
  return useMutation({
    mutationFn: async (formData: FormData) => {
      // TODO: Replace with apiClient.upload("/workers/identity-verification", formData)
      await mockDelay(2000);
      return {
        status: "pending" as const,
        message: "Documents submitted for review",
        estimatedCompletion: "24 hours",
      };
    },
  });
}

/** Submit portfolio items for moderation */
export function useSubmitPortfolio() {
  return useMutation({
    mutationFn: async (formData: FormData) => {
      // TODO: Replace with apiClient.upload("/workers/portfolio", formData)
      await mockDelay(1500);
      return {
        status: "pending" as const,
        message: "Portfolio submitted for moderation",
        estimatedCompletion: "48 hours",
      };
    },
  });
}

/** Submit assessment answers and get score */
export function useSubmitAssessment() {
  return useMutation({
    mutationFn: async ({
      sessionId,
      answers,
    }: {
      sessionId: string;
      answers: number[];
    }) => {
      // TODO: Replace with apiClient.post(`/assessments/${sessionId}/submit`, { answers })
      await mockDelay(1000);

      // Mock scoring
      const correct = answers.filter((a, i) => a === mockAssessmentQuestions.digital[i]?.correct_index).length;
      const total = mockAssessmentQuestions.digital.length;
      const score = Math.round((correct / total) * 100);

      return {
        score,
        passed: score >= 70,
        feedback: score >= 70
          ? `Great job! You scored ${score}%.`
          : `You scored ${score}%. 70% required to pass.`,
        cooldownDays: score >= 70 ? undefined : 7,
      };
    },
  });
}