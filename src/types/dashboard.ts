// src/types/dashboard.ts
export interface VerificationStep {
  name: string;
  status: "completed" | "in_review" | "pending" | "rejected";
  eta?: string;
  action_url?: string;
}

export interface VerificationChecklist {
  steps: VerificationStep[];
  progress: number; // 0-100
  all_verified: boolean;
}

export interface TrustScoreBreakdown {
  component: string;
  weight: number;
  score: number;
  description: string;
}

export interface MatchedJob {
  id: string;
  title: string;
  employer_name: string;
  employer_rating: number;
  budget_ghs: number;
  budget_type: "fixed" | "hourly";
  skills_required: string[];
  skills_matched: string[];
  posted_at: string;
  match_percentage: number;
}

export interface ActiveJob {
  id: string;
  title: string;
  employer_name: string;
  status: "in_progress" | "awaiting_review" | "payment_released" | "disputed";
  budget_ghs: number;
  milestone_progress?: number; // 0-100 for phased projects
  next_milestone?: string;
  started_at: string;
}

export interface EarningsData {
  this_week: number;
  this_month: number;
  all_time: number;
  platform_average: number;
  currency: string;
}

export interface WorkerDashboard {
  verification_checklist: VerificationChecklist;
  trust_score: number;
  trust_score_breakdown: TrustScoreBreakdown[];
  matched_opportunities: MatchedJob[];
  active_jobs: ActiveJob[];
  earnings: EarningsData;
}