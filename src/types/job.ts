// src/types/job.ts
export type JobStatus = "draft" | "open" | "in_progress" | "completed" | "cancelled" | "disputed";
export type ApplicationStatus = "pending" | "offered" | "accepted" | "rejected" | "withdrawn";
export type MilestoneStatus = "pending" | "approved" | "in_progress" | "completed" | "disputed" | "paid";
export type JobType = "project" | "tutoring" | "online_income";

export interface Job {
  id: string;
  employer_id: string;
  employer_name: string;
  employer_rating: number;
  title: string;
  description: string;
  budget_ghs: number;
  status: JobStatus;
  skills_required: string[];
  posted_at: string;
  applications_count: number;
  location_district?: string;
  is_remote: boolean;
  type?: JobType;
  milestones?: Milestone[];
  is_curated?: boolean;
  tutoring_details?: TutoringDetails;
  online_income_details?: OnlineIncomeDetails;
}

export interface TutoringDetails {
  subject: string;
  level: string;
  session_price_ghs: number;
  session_duration_minutes: number;
  available_schedules: string[];
  is_group_tutoring: boolean;
  max_students?: number;
}

export interface OnlineIncomeDetails {
  task_type: string;
  per_task_payment_ghs: number;
  estimated_time_minutes: number;
  requirements: string[];
  available_tasks_count: number;
}

export interface Milestone {
  id: string;
  job_id: string;
  title: string;
  description: string;
  amount_ghs: number;
  status: MilestoneStatus;
  due_date?: string;
  completed_at?: string;
  approved_at?: string;
  paid_at?: string;
}

export interface JobApplication {
  id: string;
  job_id: string;
  worker_id: string;
  cover_note: string;
  status: ApplicationStatus;
  offered_at?: string;
  accepted_at?: string;
}

// ── Booking Types ──────────────────────────

export type BookingStatus = "pending" | "confirmed" | "in_progress" | "completed" | "cancelled" | "disputed";

export interface Booking {
  id: string;
  worker_id: string;
  client_id: string;
  client_name: string;
  client_phone: string;
  service_type: string;
  scheduled_at: string;
  duration_minutes: number;
  status: BookingStatus;
  is_in_person: boolean;
  location?: string;
  notes?: string;
  fee_ghs: number;
}

// ── Dispute Types ──────────────────────────

export type DisputeStatus = "open" | "in_review" | "resolved" | "closed";
export type DisputeParty = "employer" | "worker";
export type DisputeResolution = "employer_wins" | "worker_wins" | "split" | "cancelled";

export interface Dispute {
  id: string;
  job_id?: string;
  booking_id?: string;
  reporter_id: string;
  reporter_type: DisputeParty;
  respondent_id: string;
  respondent_type: DisputeParty;
  subject: string;
  description: string;
  evidence_urls?: string[];
  status: DisputeStatus;
  created_at: string;
  updated_at: string;
  resolution?: DisputeResolution;
  resolution_notes?: string;
  resolved_at?: string;
  assigned_agent_id?: string;
}

export interface DisputeMessage {
  id: string;
  dispute_id: string;
  sender_id: string;
  sender_type: "user" | "agent" | "system";
  content: string;
  created_at: string;
  attachment_urls?: string[];
}
