// src/components/dashboard/ActiveJobsList.tsx
"use client";

import { useRouter } from "next/navigation";
import { Clock, CheckCircle, DollarSign, AlertTriangle, Briefcase } from "lucide-react";
import type { ActiveJob } from "@/types/dashboard";

interface ActiveJobsListProps {
  jobs: ActiveJob[];
}

const statusConfig = {
  in_progress: {
    label: "In Progress",
    icon: Clock,
    color: "text-accent bg-accent/10",
    border: "border-accent/20",
  },
  awaiting_review: {
    label: "Awaiting Review",
    icon: CheckCircle,
    color: "text-warning bg-warning/10",
    border: "border-warning/20",
  },
  payment_released: {
    label: "Payment Released",
    icon: DollarSign,
    color: "text-success bg-success/10",
    border: "border-success/20",
  },
  disputed: {
    label: "Disputed",
    icon: AlertTriangle,
    color: "text-danger bg-danger/10",
    border: "border-danger/20",
  },
};

export function ActiveJobsList({ jobs }: ActiveJobsListProps) {
  const router = useRouter();

  if (jobs.length === 0) {
    return (
      <div className="bg-white rounded-card border border-primary-100 p-6 text-center">
        <Briefcase className="w-8 h-8 text-primary-200 mx-auto mb-2" />
        <p className="text-sm text-primary-300">No active jobs</p>
        <p className="text-xs text-primary-200 mt-1">Browse opportunities to find work</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h2 className="text-md font-semibold text-primary">Active Jobs</h2>

      <div className="grid gap-2">
        {jobs.map((job) => {
          const status = statusConfig[job.status];
          const Icon = status.icon;

          return (
            <button
              key={job.id}
              onClick={() => router.push(`/worker/jobs/${job.id}`)}
              className={`bg-white rounded-card border-2 ${status.border} p-4 text-left hover:shadow-sm transition-all`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-primary truncate">
                    {job.title}
                  </h3>
                  <p className="text-xs text-primary-300 mt-0.5">{job.employer_name}</p>
                </div>
                <span
                  className={`shrink-0 ml-2 inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-pill ${status.color}`}
                >
                  <Icon className="w-3 h-3" />
                  {status.label}
                </span>
              </div>

              {/* Milestone progress */}
              {job.milestone_progress !== undefined && (
                <div className="mt-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-primary-300">Progress</span>
                    <span className="text-xs font-medium text-primary">
                      {job.milestone_progress}%
                    </span>
                  </div>
                  <div className="h-1.5 bg-primary-100 rounded-pill overflow-hidden">
                    <div
                      className={`h-full rounded-pill transition-all ${
                        job.milestone_progress >= 100 ? "bg-success" : "bg-accent"
                      }`}
                      style={{ width: `${job.milestone_progress}%` }}
                    />
                  </div>
                  {job.next_milestone && (
                    <p className="text-xs text-primary-300 mt-1">
                      Next: {job.next_milestone}
                    </p>
                  )}
                </div>
              )}

              <div className="flex items-center justify-between mt-3 pt-3 border-t border-primary-50">
                <span className="text-sm font-semibold text-primary">
                  GHS {job.budget_ghs.toLocaleString()}
                </span>
                <span className="text-xs text-primary-300">
                  Started {new Date(job.started_at).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}