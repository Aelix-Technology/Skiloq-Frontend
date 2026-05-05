// src/types/employer.ts
import type { Worker } from "./worker";

export interface EmployerDashboard {
  active_jobs: EmployerJob[];
  pending_applications: PendingApplication[];
  quick_rehire: Worker[];
  stats: EmployerStats;
}

export interface EmployerStats {
  total_jobs_posted: number;
  total_hired: number;
  total_spent_ghs: number;
  average_rating: number;
}

export interface EmployerJob {
  id: string;
  title: string;
  status: "draft" | "open" | "in_progress" | "completed";
  applications_count: number;
  hired_count: number;
  budget_ghs: number;
  posted_at: string;
}

export interface PendingApplication {
  id: string;
  job_id: string;
  job_title: string;
  worker_id: string;
  worker_name: string;
  worker_trust_score: number;
  cover_note: string;
  applied_at: string;
}

export interface EscrowItem {
  id: string;
  job_id: string;
  job_title: string;
  worker_name: string;
  amount_ghs: number;
  status: "held" | "released" | "refunded" | "disputed";
  funded_at: string;
  release_eligible_at?: string;
}

export interface EmployerPaymentsData {
  active_escrows: EscrowItem[];
  completed_payments: EscrowItem[];
  total_in_escrow_ghs: number;
}