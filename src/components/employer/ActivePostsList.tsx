// src/components/employer/ActivePostsList.tsx
"use client";

import { useRouter } from "next/navigation";
import { Briefcase, ChevronRight } from "lucide-react";
import type { EmployerJob } from "@/types/employer";

interface ActivePostsListProps {
  jobs: EmployerJob[];
}

export function ActivePostsList({ jobs }: ActivePostsListProps) {
  const router = useRouter();

  if (jobs.length === 0) {
    return (
      <div className="bg-white rounded-card border border-primary-100 p-6 text-center">
        <Briefcase className="w-8 h-8 text-primary-200 mx-auto mb-2" />
        <p className="text-sm text-primary-300">No active jobs</p>
        <button
          onClick={() => router.push("/employer/post-job")}
          className="text-sm text-accent font-medium hover:underline mt-1"
        >
          Post your first job
        </button>
      </div>
    );
  }

  return (
    <div className="grid gap-2">
      {jobs.map((job) => (
        <button
          key={job.id}
          onClick={() => router.push(`/employer/jobs/${job.id}`)}
          className="bg-white rounded-card border border-primary-100 p-4 text-left hover:border-accent-200 hover:shadow-sm transition-all"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-primary truncate">{job.title}</h3>
              <div className="flex items-center gap-3 mt-1 text-xs text-primary-300">
                <span>{job.applications_count} applications</span>
                {job.hired_count > 0 && <span>• {job.hired_count} hired</span>}
                <span>• GHS {job.budget_ghs.toLocaleString()}</span>
              </div>
            </div>
            <span className={`shrink-0 ml-3 text-xs font-semibold px-2 py-0.5 rounded-pill ${
              job.status === "open"
                ? "bg-success/10 text-success"
                : job.status === "in_progress"
                ? "bg-accent/10 text-accent"
                : "bg-primary-50 text-primary-300"
            }`}>
              {job.status === "open" ? "Open" : job.status === "in_progress" ? "In Progress" : job.status}
            </span>
          </div>
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-primary-50">
            <span className="text-xs text-primary-300">
              Posted {new Date(job.posted_at).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
            </span>
            <ChevronRight className="w-4 h-4 text-primary-200" />
          </div>
        </button>
      ))}
    </div>
  );
}
