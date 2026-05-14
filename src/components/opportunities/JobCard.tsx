// src/components/opportunities/JobCard.tsx
"use client";

import { useRouter } from "next/navigation";
import { Star, MapPin, Briefcase, Clock, ChevronRight } from "lucide-react";
import type { Job } from "@/types/job";
import { StatusBadge } from "@/components/ui/status-badge";

interface JobCardProps {
  job: Job;
  matchedSkills?: string[];
}

const currentTime = Date.now();

export function JobCard({ job, matchedSkills = [] }: JobCardProps) {
  const router = useRouter();

  const getTimeAgo = (dateString: string): string => {
    const posted = new Date(dateString).getTime();
    const diffHours = Math.floor((currentTime - posted) / (1000 * 60 * 60));
    if (diffHours < 1) return "Just now";
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays}d ago`;
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
    });
  };

  return (
    <button
      onClick={() => router.push(`/worker/opportunities/${job.id}`)}
      className="relative w-full overflow-hidden rounded-2xl border border-white/70 bg-white/80 p-5 text-left shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/10 active:scale-95"
    >
      <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-accent/10 blur-2xl" />
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-primary leading-snug line-clamp-2">
            {job.title}
          </h3>
          <p className="text-xs text-primary-300 mt-1">{job.employer_name}</p>
        </div>
        <span className="shrink-0 ml-3 rounded-xl bg-primary-50 px-3 py-2 text-sm font-bold text-primary">
          GHS {job.budget_ghs.toLocaleString()}
        </span>
      </div>

      {/* Meta */}
      <div className="flex items-center gap-3 mb-3 text-xs text-primary-300 flex-wrap">
        <span className="flex items-center gap-1">
          <Star className="w-3 h-3 text-warning fill-warning" />
          {job.employer_rating}
        </span>
        {job.location_district && (
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {job.location_district}
          </span>
        )}
        <span className="flex items-center gap-1">
          <Briefcase className="w-3 h-3" />
          {job.is_remote ? "Remote" : "On-site"}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {getTimeAgo(job.posted_at)}
        </span>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {job.skills_required.map((skill) => {
          const isMatched = matchedSkills.includes(skill);
          return (
            <span
              key={skill}
              className={`rounded-full px-2.5 py-1 text-xs ${
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

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-primary-50">
        <span className="text-xs text-primary-300">
          {job.applications_count} application{job.applications_count !== 1 ? "s" : ""}
        </span>
        <StatusBadge tone="progress">
          View
          <ChevronRight className="w-3 h-3" />
        </StatusBadge>
      </div>
    </button>
  );
}
