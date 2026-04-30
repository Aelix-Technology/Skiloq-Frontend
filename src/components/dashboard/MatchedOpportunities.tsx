// src/components/dashboard/MatchedOpportunities.tsx
"use client";

import { useRouter } from "next/navigation";
import { Star, MapPin, Briefcase, ChevronRight } from "lucide-react";
import type { MatchedJob } from "@/types/dashboard";

interface MatchedOpportunitiesProps {
  jobs: MatchedJob[];
}

export function MatchedOpportunities({ jobs }: MatchedOpportunitiesProps) {
  const router = useRouter();

  if (jobs.length === 0) {
    return (
      <div className="bg-white rounded-card border border-primary-100 p-6 text-center">
        <Briefcase className="w-8 h-8 text-primary-200 mx-auto mb-2" />
        <p className="text-sm text-primary-300">No matched opportunities yet</p>
        <p className="text-xs text-primary-200 mt-1">Complete more skills to get matches</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-md font-semibold text-primary">Matched Opportunities</h2>
        <button
          onClick={() => router.push("/worker/opportunities")}
          className="text-sm text-accent font-medium hover:underline"
        >
          View all
        </button>
      </div>

      <div className="grid gap-2">
        {jobs.slice(0, 5).map((job) => (
          <button
            key={job.id}
            onClick={() => router.push(`/worker/opportunities/${job.id}`)}
            className="bg-white rounded-card border border-primary-100 p-4 text-left hover:border-accent-200 hover:shadow-sm transition-all"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-primary truncate">
                  {job.title}
                </h3>
                <p className="text-xs text-primary-300 mt-0.5">{job.employer_name}</p>
              </div>
              <span className="shrink-0 ml-2 px-2 py-0.5 bg-accent/10 text-accent text-xs font-semibold rounded-pill">
                {job.match_percentage}% match
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs text-primary-300 mb-2">
              <span className="flex items-center gap-1">
                <Star className="w-3 h-3 text-warning fill-warning" />
                {job.employer_rating}
              </span>
              <span>GHS {job.budget_ghs.toLocaleString()}</span>
              <span>{job.budget_type === "fixed" ? "Fixed" : "Hourly"}</span>
            </div>

            {/* Matched skills */}
            {job.skills_matched.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {job.skills_required.map((skill) => {
                  const isMatched = job.skills_matched.includes(skill);
                  return (
                    <span
                      key={skill}
                      className={`text-xs px-2 py-0.5 rounded-pill ${
                        isMatched
                          ? "bg-success/10 text-success font-medium"
                          : "bg-primary-50 text-primary-300"
                      }`}
                    >
                      {skill}
                    </span>
                  );
                })}
              </div>
            )}

            <div className="flex items-center justify-between mt-3 pt-3 border-t border-primary-50">
              <span className="text-xs text-primary-300">
                {getTimeAgo(job.posted_at)}
              </span>
              <ChevronRight className="w-4 h-4 text-primary-200" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function getTimeAgo(dateString: string): string {
  const now = Date.now();
  const posted = new Date(dateString).getTime();
  const diffHours = Math.floor((now - posted) / (1000 * 60 * 60));

  if (diffHours < 1) return "Just now";
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
}