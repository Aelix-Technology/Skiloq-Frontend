// src/types/job.ts
export type JobStatus = "draft" | "open" | "in_progress" | "completed" | "cancelled" | "disputed";
export type ApplicationStatus = "pending" | "offered" | "accepted" | "rejected" | "withdrawn";

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