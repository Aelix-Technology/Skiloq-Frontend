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