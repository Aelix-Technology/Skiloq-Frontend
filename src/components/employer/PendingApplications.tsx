// src/components/employer/PendingApplications.tsx
"use client";

import { useRouter } from "next/navigation";
import { Clock } from "lucide-react";
import type { PendingApplication } from "@/types/employer";

interface PendingApplicationsProps {
  applications: PendingApplication[];
}

export function PendingApplications({ applications }: PendingApplicationsProps) {
  const router = useRouter();

  if (applications.length === 0) {
    return (
      <div className="bg-white rounded-card border border-primary-100 p-6 text-center">
        <Clock className="w-8 h-8 text-primary-200 mx-auto mb-2" />
        <p className="text-sm text-primary-300">No pending applications</p>
      </div>
    );
  }

  return (
    <div className="grid gap-2">
      {applications.map((app) => (
        <div key={app.id} className="bg-white rounded-card border border-primary-100 p-4">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-sm font-semibold text-primary">{app.worker_name}</h3>
              <p className="text-xs text-primary-300">For: {app.job_title}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-medium px-2 py-0.5 rounded-pill ${
                app.worker_trust_score >= 70
                  ? "bg-success/10 text-success"
                  : app.worker_trust_score >= 40
                  ? "bg-warning/10 text-warning"
                  : "bg-danger/10 text-danger"
              }`}>
                Score: {app.worker_trust_score}
              </span>
              <span className="text-xs text-primary-300">
                {new Date(app.applied_at).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
              </span>
            </div>
          </div>
          <p className="text-sm text-primary-300 line-clamp-2">{app.cover_note}</p>
          <div className="flex gap-2 mt-3">
            <button
              onClick={() => router.push(`/employer/find-talent/${app.worker_id}`)}
              className="flex-1 bg-accent text-white text-sm font-medium py-2 rounded-input hover:bg-accent-600 transition-colors"
            >
              View Profile
            </button>
            <button
              onClick={() => router.push(`/employer/jobs/${app.job_id}`)}
              className="px-4 py-2 text-sm font-medium text-accent border border-accent rounded-input hover:bg-accent-50 transition-colors"
            >
              Send Offer
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
