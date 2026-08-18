// src/components/dashboard/ActiveJobsList.tsx
"use client";

import { useRouter } from "next/navigation";
import {
  Clock,
  CheckCircle,
  DollarSign,
  AlertTriangle,
  Briefcase,
  ChevronRight,
} from "lucide-react";
import type { ActiveJob } from "@/types/dashboard";
import { IconTile, PremiumCard } from "@/components/ui/premium-card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { StatusBadge } from "@/components/ui/status-badge";
import { MotionDiv, listContainer, listItem } from "@/components/ui/motion-list";
import { Button } from "@/components/ui/button";

interface ActiveJobsListProps {
  jobs: ActiveJob[];
}

const statusConfig = {
  in_progress: {
    label: "In Progress",
    icon: Clock,
    tone: "progress" as const,
    accentColor: "var(--color-accent)",
  },
  awaiting_review: {
    label: "Awaiting Review",
    icon: CheckCircle,
    tone: "pending" as const,
    accentColor: "var(--color-warning)",
  },
  payment_released: {
    label: "Payment Released",
    icon: DollarSign,
    tone: "success" as const,
    accentColor: "var(--color-success)",
  },
  disputed: {
    label: "Disputed",
    icon: AlertTriangle,
    tone: "danger" as const,
    accentColor: "var(--color-danger)",
  },
};

export function ActiveJobsList({ jobs }: ActiveJobsListProps) {
  const router = useRouter();

  if (jobs.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="heading-3 text-lg m-0">Active Jobs</h2>
          <Button variant="ghost" size="sm" className="h-8 px-3 text-xs">
            Browse opportunities <ChevronRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </div>
        <PremiumCard className="text-center py-12">
          <IconTile tone="primary" size="lg" className="mx-auto mb-6">
            <Briefcase className="w-7 h-7" strokeWidth={2} />
          </IconTile>
          <h3 className="heading-3 text-base mb-2">No active jobs yet</h3>
          <p className="body-text-sm max-w-sm mx-auto mb-6">
            Browse curated opportunities matched to your skills and start earning today
          </p>
          <Button variant="accent" size="sm">
            Find work
          </Button>
        </PremiumCard>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="heading-3 text-lg m-0 mb-0.5">Active Jobs</h2>
          <p className="body-text-sm m-0">{jobs.length} active {jobs.length === 1 ? "job" : "jobs"}</p>
        </div>
        <Button variant="ghost" size="sm" className="h-8 px-3 text-xs">
          View all <ChevronRight className="w-3.5 h-3.5 ml-1" />
        </Button>
      </div>

      <MotionDiv variants={listContainer} initial="hidden" animate="show" className="grid gap-4">
        {jobs.map((job) => {
          const status = statusConfig[job.status];
          const Icon = status.icon;

          return (
            <MotionDiv key={job.id} variants={listItem}>
              <PremiumCard
                interactive
                paddingSize="lg"
                className="cursor-pointer relative overflow-hidden"
                onClick={() => router.push(`/worker/jobs/${job.id}`)}
                style={{
                  borderLeft: `4px solid ${status.accentColor}`,
                }}
              >
                <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 rounded-full opacity-40"
                  style={{
                    background: `radial-gradient(circle, ${status.accentColor}15 0%, transparent 70%)`,
                    transform: "translate(30%, -30%)",
                  }}
                />

                <div className="flex items-start justify-between gap-4 mb-5">
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    <IconTile
                      tone={
                        status.tone === "success"
                          ? "success"
                          : status.tone === "pending"
                          ? "warning"
                          : status.tone === "danger"
                          ? "danger"
                          : "accent"
                      }
                      size="md"
                      className="shrink-0 mt-0.5"
                    >
                      <Icon className="h-5 w-5" strokeWidth={2} />
                    </IconTile>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading text-lg font-bold tracking-tight m-0 mb-1 text-primary-900 truncate">
                        {job.title}
                      </h3>
                      <div className="flex items-center gap-3 flex-wrap">
                        <div className="flex items-center gap-1.5 text-sm text-primary-600">
                          <DollarSign className="w-3.5 h-3.5" strokeWidth={2} />
                          {job.employer_name}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="shrink-0 flex flex-col items-end gap-3">
                    <StatusBadge tone={status.tone}>
                      <Icon className="w-3 h-3" />
                      {status.label}
                    </StatusBadge>
                    <div className="text-right">
                      <p className="font-heading text-2xl font-bold tracking-tight m-0 gradient-text-primary">
                        GHS {job.budget_ghs.toLocaleString()}
                      </p>
                      <p className="text-xs text-primary-500 mt-1 m-0 font-medium">
                        Started{" "}
                        {new Date(job.started_at).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Milestone progress */}
                {job.milestone_progress !== undefined && (
                  <div className="mb-5 p-5 rounded-2xl bg-surface-muted border border-border-light">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-primary-700">Progress</span>
                      </div>
                      <span className="font-heading text-lg font-bold tracking-tight m-0 gradient-text-accent">
                        {job.milestone_progress}%
                      </span>
                    </div>
                    <ProgressBar
                      value={job.milestone_progress}
                      tone={job.milestone_progress >= 100 ? "success" : "accent"}
                      className="h-2.5 rounded-full"
                    />
                    {job.next_milestone && (
                      <div className="mt-4 flex items-center gap-2.5 p-3 rounded-xl bg-white border border-border-light shadow-xs">
                        <span
                          className="inline-flex size-2 rounded-full shrink-0"
                          style={{ backgroundColor: status.accentColor }}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-primary-700 mb-0.5">
                            Next milestone
                          </p>
                          <p className="text-sm text-primary-900 m-0 font-medium truncate">
                            {job.next_milestone}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-border-light">
                  <div className="flex items-center gap-2" />
                  <Button variant="ghost" size="sm" className="h-9 px-4 text-sm">
                    View details <ChevronRight className="w-4 h-4 ml-1.5" />
                  </Button>
                </div>
              </PremiumCard>
            </MotionDiv>
          );
        })}
      </MotionDiv>
    </div>
  );
}
