// src/types/onboarding.ts
export type WorkerCategory = "digital" | "trade" | "educator" | "online_income";

export interface CategoryOption {
  id: WorkerCategory;
  icon: string;
  label: string;
  description: string;
}

export interface IdentityDocument {
  frontFile: File | null;
  backFile: File | null;
  frontPreview: string;
  backPreview: string;
  documentType: "ghana_card" | "passport" | "voter_id";
}

export interface ProfileData {
  bio: string;
  location_district: string;
  languages: string[];
  hourly_rate_ghs: number;
  availability: boolean;
}

export interface SkillTag {
  id: string;
  name: string;
  category: WorkerCategory;
  assessment_required: boolean;
  selected: boolean;
}

export interface AssessmentQuestion {
  id: string;
  question: string;
  options: string[];
  correct_index: number;
  time_limit_seconds: number;
}

export interface AssessmentSession {
  sessionId: string;
  questions: AssessmentQuestion[];
  started_at: string;
  expires_at: string;
}

export interface AssessmentResult {
  score: number;
  passed: boolean;
  cooldown_days?: number;
  feedback: string;
}

export interface PortfolioItem {
  id: string;
  type: "file" | "url";
  file?: File;
  url?: string;
  preview?: string;
  title: string;
}

export interface OnboardingState {
  currentStep: number;
  category: WorkerCategory | null;
  identityDoc: IdentityDocument;
  profile: ProfileData;
  selectedSkills: string[];
  assessmentResult: AssessmentResult | null;
  portfolio: PortfolioItem[];
  isComplete: boolean;
}
