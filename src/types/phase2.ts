// src/types/phase2.ts
// Phase 2 Expansion Types

// ── Country & Currency ──────────────────────

export type Country = "ghana" | "nigeria" | "kenya";
export type Currency = "GHS" | "NGN" | "KES" | "USD";

export interface CountryConfig {
  code: Country;
  name: string;
  flag: string;
  currency: Currency;
  currencySymbol: string;
  paymentProviders: PaymentProvider[];
  idVerificationTypes: string[];
  districts: string[];
}

export type PaymentProvider =
  | "mtn_momo"
  | "airteltigo_momo"
  | "vodafone_cash"
  | "opay"
  | "mpesa"
  | "wise"
  | "stripe";

// ── Booking Bundles (Educator & Tutor Track) ──────────────────────

export interface BookingBundle {
  id: string;
  worker_id: string;
  title: string;
  description: string;
  session_count: number;
  session_duration_minutes: number;
  total_price_ghs: number;
  discounted_price_ghs?: number;
  subject: string;
  level: string;
  is_active: boolean;
  created_at: string;
}

export interface BundleBooking {
  id: string;
  bundle_id: string;
  worker_id: string;
  client_id: string;
  client_name: string;
  sessions_scheduled: string[];
  sessions_completed: number;
  total_sessions: number;
  status: "pending" | "confirmed" | "in_progress" | "completed" | "cancelled";
  paid_amount_ghs: number;
  payment_status: "pending" | "paid" | "refunded";
  created_at: string;
}

// ── Online Income Listings ──────────────────────

export interface OnlineListing {
  id: string;
  title: string;
  description: string;
  task_type: "data_entry" | "transcription" | "micro_task" | "survey";
  payout_currency: Currency;
  payout_per_task: number;
  total_available: number;
  total_remaining: number;
  estimated_time_minutes_per_task: number;
  requirements: string[];
  is_active: boolean;
  is_curated: boolean;
  verified_worker_only: boolean;
  created_at: string;
  expires_at?: string;
}

export interface OnlineListingApplication {
  id: string;
  listing_id: string;
  worker_id: string;
  status: "pending" | "approved" | "in_progress" | "completed" | "rejected";
  tasks_completed: number;
  total_earned: number;
  applied_at: string;
  approved_at?: string;
}

// ── AfriSkills Academy ──────────────────────

export type CourseLevel = "beginner" | "intermediate" | "advanced";

export interface Course {
  id: string;
  instructor_id: string;
  instructor_name: string;
  title: string;
  description: string;
  category: string;
  level: CourseLevel;
  price_ghs: number;
  revenue_share_percent: 70;
  thumbnail_url?: string;
  total_lessons: number;
  total_duration_minutes: number;
  rating: number;
  students_enrolled: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Lesson {
  id: string;
  course_id: string;
  title: string;
  description?: string;
  video_url: string;
  duration_minutes: number;
  order_index: number;
  free_preview: boolean;
  created_at: string;
}

export interface Enrolment {
  id: string;
  course_id: string;
  student_id: string;
  student_name: string;
  status: "enrolled" | "in_progress" | "completed";
  progress_percent: number;
  completed_lessons: string[];
  assessment_score?: number;
  certificate_url?: string;
  enrolled_at: string;
  completed_at?: string;
}

export interface CourseAssessment {
  id: string;
  course_id: string;
  title: string;
  questions: CourseAssessmentQuestion[];
  passing_score_percent: number;
}

export interface CourseAssessmentQuestion {
  id: string;
  question_text: string;
  options: string[];
  correct_option_index: number;
}

// ── Multi-Language (i18n) ──────────────────────

export type Locale = "en" | "fr" | "twi" | "ha";

export interface LocaleConfig {
  code: Locale;
  name: string;
  nativeName: string;
  flag: string;
  isRTL: boolean;
}

// ── Auto-Matching ──────────────────────

export interface WorkerMatch {
  id: string;
  job_id: string;
  worker_id: string;
  match_score: number;
  skill_match_percent: number;
  trust_score_percent: number;
  rate_match_percent: number;
  location_match_percent: number;
  reasons: string[];
  created_at: string;
  is_viewed: boolean;
}

// ── Employer Analytics ──────────────────────

export interface EmployerAnalytics {
  employer_id: string;
  time_to_hire_days: {
    average: number;
    by_month: Record<string, number>;
  };
  worker_scores: {
    average: number;
    distribution: Record<number, number>;
  };
  spend_by_category: Record<string, { total_ghs: number; jobs: number }>;
  repeat_hire_rate: number;
  total_spent_ghs: number;
  total_jobs_posted: number;
  total_hires: number;
  period_start: string;
  period_end: string;
}

// ── Income Certificate ──────────────────────

export interface IncomeCertificateMetadata {
  id: string;
  worker_id: string;
  worker_name: string;
  total_lifetime_earnings_ghs: number;
  average_monthly_income_ghs: number;
  months_active: number;
  total_jobs_completed: number;
  generated_at: string;
  certificate_number: string;
  is_signed: boolean;
  signature_url?: string;
  certificate_pdf_url?: string;
  threshold_met: boolean;
  required_threshold_ghs: 5000;
}
