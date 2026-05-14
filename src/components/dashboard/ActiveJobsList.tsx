// src/components/dashboard/ActiveJobsList.tsx
"use client";

import { useRouter } from "next/navigation";
import { Clock, CheckCircle, DollarSign, AlertTriangle, Briefcase } from "lucide-react";
import type { ActiveJob } from "@/types/dashboard";
import { IconTile, PremiumCard } from "@/components/ui/premium-card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { StatusBadge } from "@/components/ui/status-badge";
import { MotionDiv, listContainer, listItem } from "@/components/ui/motion-list";

interface ActiveJobsListProps {
  jobs: ActiveJob[];
}

const statusConfig = {
  in_progress: {
    label: "In Progress",
    icon: Clock,
    tone: "progress" as const,
    border: "border-accent/20",
  },
  awaiting_review: {
    label: "Awaiting Review",
    icon: CheckCircle,
    tone: "pending" as const,
    border: "border-warning/20",
  },
  payment_released: {
    label: "Payment Released",
    icon: DollarSign,
    tone: "success" as const,
    border: "border-success/20",
  },
  disputed: {
    label: "Disputed",
    icon: AlertTriangle,
    tone: "danger" as const,
    border: "border-danger/20",
  },
};

export function ActiveJobsList({ jobs }: ActiveJobsListProps) {
  const router = useRouter();

  if (jobs.length === 0) {
    return (
      <PremiumCard className="p-6 text-center">
        <IconTile tone="primary" className="mx-auto mb-3">
          <Briefcase className="w-5 h-5" />
        </IconTile>
        <p className="text-sm text-primary-300">No active jobs</p>
        <p className="text-xs text-primary-200 mt-1">Browse opportunities to find work</p>
      </PremiumCard>
    );
  }

  return (
    <div className="space-y-3">
      <h2 className="text-md font-semibold tracking-tight text-primary">Active Jobs</h2>

      <MotionDiv variants={listContainer} initial="hidden" animate="show" className="grid gap-3">
        {jobs.map((job) => {
          const status = statusConfig[job.status];
          const Icon = status.icon;

          return (
            <MotionDiv key={job.id} variants={listItem}>
            <button
              onClick={() => router.push(`/worker/jobs/${job.id}`)}
              className={`w-full rounded-2xl border-2 bg-white/80 p-5 text-left shadow-sm backdrop-blur-xl ${status.border} transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/10 active:scale-95`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-primary truncate">
                    {job.title}
                  </h3>
                  <p className="text-xs text-primary-300 mt-0.5">{job.employer_name}</p>
                </div>
                <StatusBadge tone={status.tone} className="shrink-0 ml-2">
                  <Icon className="w-3 h-3" />
                  {status.label}
                </StatusBadge>
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
                  <ProgressBar
                    value={job.milestone_progress}
                    tone={job.milestone_progress >= 100 ? "success" : "accent"}
                  />
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
            </MotionDiv>
          );
        })}
      </MotionDiv>
    </div>
  );
}
