// src/types/worker.ts
import { Job } from "./job";
export type WorkerCategory = "digital" | "trade" | "educator" | "online_income";
export type VerificationLevel = "none" | "partial" | "verified" | "expert";
export type WorkerBadge = "Rising Talent" | "Top Rated" | "Verified Expert" | null;
export type VerificationStepStatus = "completed" | "in_review" | "pending" | "rejected";

export interface Worker {
  id: string;
  user_id: string;
  full_name: string;
  category: WorkerCategory;
  bio?: string;
  location_district?: string;
  hourly_rate_ghs?: number;
  trust_score: number;
  is_visible_in_search: boolean;
  verification_level: VerificationLevel;
  global_earner_status: boolean;
  badge: WorkerBadge;
  completed_jobs: number;
  skills: WorkerSkill[];
  portfolio: PortfolioItem[];
  reviews: Review[];
}

export interface WorkerSkill {
  id: string;
  name: string;
  assessment_score?: number;
  verified: boolean;
  assessment_required: boolean;
}

export interface PortfolioItem {
  id: string;
  type: "image" | "video" | "link";
  url: string;
  title: string;
}

export interface Review {
  id: string;
  job_id: string;
  reviewer_id: string;
  reviewer_name: string;
  rating: number;
  comment: string;
  is_flagged?: boolean;
  submitted_at: string;
}

export interface VerificationStep {
  name: string;
  status: VerificationStepStatus;
  eta?: string;
  description?: string;
}

export interface VerificationStatus {
  verification_level: VerificationLevel;
  steps: VerificationStep[];
  overall_progress: number;
}

export interface WorkerDashboard {
  verification_checklist: {
    steps: VerificationStep[];
    progress: number;
    all_verified: boolean;
  };
  trust_score: number;
  matched_opportunities: Job[];
  active_jobs: Job[];
  earnings: {
    this_week: number;
    this_month: number;
    all_time: number;
    platform_average: number;
  };
}

export interface WorkerWallet {
  balance_ghs: number;
  pending_ghs: number;
  available_ghs: number;
  transactions: Transaction[];
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: "earning" | "withdrawal" | "fee";
  status: "completed" | "pending" | "failed";
}

export interface WithdrawRequest {
  amount: number;
  momo_number: string;
  pin: string;
}

export interface WithdrawResponse {
  success: boolean;
  amount: number;
  estimated_arrival: string;
  new_balance: number;
}

export interface IdentityVerificationResponse {
  status: "pending";
  message: string;
  estimated_completion: string;
}

export interface IncomeCertificate {
  download_url: string;
  total_earnings: number;
  months_active: number;
  issued_at: string;
}

export interface WorkerFilters {
  category?: WorkerCategory;
  skills?: string[];
  trust_score_min?: number;
  availability?: boolean;
  price_min?: number;
  price_max?: number;
  location_radius_km?: number;
  language?: string;
  sort_by?: "trust_score" | "response_time" | "rate" | "jobs_completed" | "nearest";
}
