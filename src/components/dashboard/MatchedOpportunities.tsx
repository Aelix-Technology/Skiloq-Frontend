// src/components/dashboard/MatchedOpportunities.tsx
"use client";

import { useRouter } from "next/navigation";
import { Star, Briefcase, ChevronRight } from "lucide-react";
import type { MatchedJob } from "@/types/dashboard";
import { IconTile, PremiumCard } from "@/components/ui/premium-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { MotionDiv, listContainer, listItem } from "@/components/ui/motion-list";

interface MatchedOpportunitiesProps {
  jobs: MatchedJob[];
}

export function MatchedOpportunities({ jobs }: MatchedOpportunitiesProps) {
  const router = useRouter();

  if (jobs.length === 0) {
    return (
      <PremiumCard className="p-6 text-center">
        <IconTile tone="accent" className="mx-auto mb-3">
          <Briefcase className="w-5 h-5" />
        </IconTile>
        <p className="text-sm text-primary-300">No matched opportunities yet</p>
        <p className="text-xs text-primary-200 mt-1">Complete more skills to get matches</p>
      </PremiumCard>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-md font-semibold tracking-tight text-primary">Matched Opportunities</h2>
        <button
          onClick={() => router.push("/worker/opportunities")}
          className="min-h-11 rounded-xl px-3 text-sm font-semibold text-accent transition-all hover:-translate-y-1 hover:bg-accent-50 hover:shadow-lg active:scale-95"
        >
          View all
        </button>
      </div>

      <MotionDiv variants={listContainer} initial="hidden" animate="show" className="grid gap-3">
        {jobs.slice(0, 5).map((job) => (
          <MotionDiv key={job.id} variants={listItem}>
          <button
            onClick={() => router.push(`/worker/opportunities/${job.id}`)}
            className="w-full rounded-2xl border border-white/70 bg-white/80 p-5 text-left shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/10 active:scale-95"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-primary truncate">
                  {job.title}
                </h3>
                <p className="text-xs text-primary-300 mt-0.5">{job.employer_name}</p>
              </div>
              <StatusBadge tone="progress" className="shrink-0 ml-2">
                {job.match_percentage}% match
              </StatusBadge>
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
          </MotionDiv>
        ))}
      </MotionDiv>
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
