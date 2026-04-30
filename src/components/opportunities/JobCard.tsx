// src/components/opportunities/JobCard.tsx
"use client";

import { useRouter } from "next/navigation";
import { Star, MapPin, Briefcase, Clock, ChevronRight } from "lucide-react";
import type { Job } from "@/types/job";

interface JobCardProps {
  job: Job;
  matchedSkills?: string[];
}

export function JobCard({ job, matchedSkills = [] }: JobCardProps) {
  const router = useRouter();

  const getTimeAgo = (dateString: string): string => {
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
  };

  return (
    <button
      onClick={() => router.push(`/worker/opportunities/${job.id}`)}
      className="w-full bg-white rounded-card border border-primary-100 p-4 text-left hover:border-accent-200 hover:shadow-sm transition-all"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-primary leading-snug line-clamp-2">
            {job.title}
          </h3>
          <p className="text-xs text-primary-300 mt-1">{job.employer_name}</p>
        </div>
        <span className="shrink-0 ml-3 text-sm font-bold text-primary">
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

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-primary-50">
        <span className="text-xs text-primary-300">
          {job.applications_count} application{job.applications_count !== 1 ? "s" : ""}
        </span>
        <ChevronRight className="w-4 h-4 text-primary-200" />
      </div>
    </button>
  );
}