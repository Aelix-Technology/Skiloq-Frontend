// src/stores/onboarding.store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { WorkerCategory, IdentityDocument, ProfileData, AssessmentResult, PortfolioItem } from "@/types/onboarding";

interface OnboardingStore {
  currentStep: number;
  category: WorkerCategory | null;
  identityDoc: IdentityDocument;
  profile: ProfileData;
  selectedSkills: string[];
  assessmentResult: AssessmentResult | null;
  portfolio: PortfolioItem[];
  isComplete: boolean;

  setStep: (step: number) => void;
  setCategory: (category: WorkerCategory) => void;
  setIdentityDoc: (doc: Partial<IdentityDocument>) => void;
  setProfile: (profile: Partial<ProfileData>) => void;
  setSelectedSkills: (skills: string[]) => void;
  toggleSkill: (skillId: string) => void;
  setAssessmentResult: (result: AssessmentResult) => void;
  setPortfolio: (items: PortfolioItem[]) => void;
  addPortfolioItem: (item: PortfolioItem) => void;
  removePortfolioItem: (id: string) => void;
  completeOnboarding: () => void;
  reset: () => void;
}

const initialIdentity: IdentityDocument = {
  frontFile: null,
  backFile: null,
  frontPreview: "",
  backPreview: "",
  documentType: "ghana_card",
};

const initialProfile: ProfileData = {
  bio: "",
  location_district: "",
  languages: ["English"],
  hourly_rate_ghs: 0,
  availability: true,
};

export const useOnboardingStore = create<OnboardingStore>()(
  persist(
    (set, get) => ({
      currentStep: 1,
      category: null,
      identityDoc: initialIdentity,
      profile: initialProfile,
      selectedSkills: [],
      assessmentResult: null,
      portfolio: [],
      isComplete: false,

      setStep: (step) => set({ currentStep: step }),
      setCategory: (category) => set({ category }),

      setIdentityDoc: (doc) =>
        set((state) => ({
          identityDoc: { ...state.identityDoc, ...doc },
        })),

      setProfile: (profile) =>
        set((state) => ({
          profile: { ...state.profile, ...profile },
        })),

      setSelectedSkills: (skills) => set({ selectedSkills: skills }),

      toggleSkill: (skillId) =>
        set((state) => {
          const skills = state.selectedSkills.includes(skillId)
            ? state.selectedSkills.filter((s) => s !== skillId)
            : state.selectedSkills.length < 8
            ? [...state.selectedSkills, skillId]
            : state.selectedSkills;
          return { selectedSkills: skills };
        }),

      setAssessmentResult: (result) => set({ assessmentResult: result }),

      setPortfolio: (items) => set({ portfolio: items }),

      addPortfolioItem: (item) =>
        set((state) => ({
          portfolio: [...state.portfolio, item],
        })),

      removePortfolioItem: (id) =>
        set((state) => ({
          portfolio: state.portfolio.filter((item) => item.id !== id),
        })),

      completeOnboarding: () => set({ isComplete: true }),

      reset: () =>
        set({
          currentStep: 1,
          category: null,
          identityDoc: initialIdentity,
          profile: initialProfile,
          selectedSkills: [],
          assessmentResult: null,
          portfolio: [],
          isComplete: false,
        }),
    }),
    {
      name: "aelix-onboarding",
      partialize: (state) => ({
        currentStep: state.currentStep,
        category: state.category,
        profile: state.profile,
        selectedSkills: state.selectedSkills,
        portfolio: state.portfolio,
      }),
    }
  )
);