// src/app/worker/opportunities/[id]/page.tsx
"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { WorkerLayout } from "@/components/layout/WorkerLayout";
import { ApplyModal } from "@/components/opportunities/ApplyModal";
import { useJob } from "@/hooks/useJobs";
import { Star, MapPin, Briefcase, Clock, ArrowLeft, Send, Building } from "lucide-react";

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = params.id as string;
  const { data: job, isLoading, error } = useJob(jobId);
  const [showApplyModal, setShowApplyModal] = useState(false);

  if (isLoading) {
    return (
      <WorkerLayout>
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-primary-100 rounded w-32" />
          <div className="h-8 bg-primary-100 rounded w-3/4" />
          <div className="h-4 bg-primary-100 rounded w-full" />
          <div className="h-4 bg-primary-100 rounded w-2/3" />
        </div>
      </WorkerLayout>
    );
  }

  if (error || !job) {
    return (
      <WorkerLayout>
        <div className="text-center py-16">
          <p className="text-primary-300">Job not found</p>
          <button
            onClick={() => router.back()}
            className="text-accent font-medium mt-2 hover:underline"
          >
            Go back
          </button>
        </div>
      </WorkerLayout>
    );
  }

  return (
    <WorkerLayout>
      <div className="space-y-6">
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-sm text-primary-300 hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to opportunities
        </button>

        {/* Title + Budget */}
        <div>
          <h1 className="text-lg font-bold text-primary leading-snug">{job.title}</h1>
          <p className="text-2xl font-bold text-accent mt-2">
            GHS {job.budget_ghs.toLocaleString()}
          </p>
        </div>

        {/* Meta */}
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-1.5 bg-primary-50 px-3 py-1.5 rounded-pill">
            <Building className="w-3.5 h-3.5 text-primary-300" />
            <span className="text-xs text-primary">{job.employer_name}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-warning/10 px-3 py-1.5 rounded-pill">
            <Star className="w-3.5 h-3.5 text-warning fill-warning" />
            <span className="text-xs text-primary">{job.employer_rating}</span>
          </div>
          {job.location_district && (
            <div className="flex items-center gap-1.5 bg-primary-50 px-3 py-1.5 rounded-pill">
              <MapPin className="w-3.5 h-3.5 text-primary-300" />
              <span className="text-xs text-primary">{job.location_district}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5 bg-primary-50 px-3 py-1.5 rounded-pill">
            <Briefcase className="w-3.5 h-3.5 text-primary-300" />
            <span className="text-xs text-primary">{job.is_remote ? "Remote" : "On-site"}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-primary-50 px-3 py-1.5 rounded-pill">
            <Clock className="w-3.5 h-3.5 text-primary-300" />
            <span className="text-xs text-primary">
              Posted {new Date(job.posted_at).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
            </span>
          </div>
        </div>

        {/* Skills */}
        <div>
          <h3 className="text-sm font-semibold text-primary mb-2">Skills Required</h3>
          <div className="flex flex-wrap gap-1.5">
            {job.skills_required.map((skill) => (
              <span
                key={skill}
                className="text-xs px-3 py-1 rounded-pill bg-accent/10 text-accent font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Description */}
        <div>
          <h3 className="text-sm font-semibold text-primary mb-2">Description</h3>
          <p className="text-sm text-primary-300 leading-relaxed whitespace-pre-line">
            {job.description}
          </p>
        </div>

        {/* Employer info */}
        <div className="bg-primary-50 rounded-card p-4">
          <h3 className="text-sm font-semibold text-primary mb-1">About the Employer</h3>
          <p className="text-sm text-primary">{job.employer_name}</p>
          <div className="flex items-center gap-1 mt-1">
            <Star className="w-3.5 h-3.5 text-warning fill-warning" />
            <span className="text-sm text-primary-300">{job.employer_rating}</span>
          </div>
        </div>

        {/* Apply button — fixed bottom */}
        <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-primary-100 p-4 safe-area-bottom z-30">
          <div className="max-w-2xl mx-auto">
            <button
              onClick={() => setShowApplyModal(true)}
              className="w-full bg-accent text-white font-semibold py-3.5 rounded-input hover:bg-accent-600 transition-colors flex items-center justify-center gap-2 touch-target"
            >
              <Send className="w-4 h-4" />
              Apply Now
            </button>
            <p className="text-xs text-center text-primary-300 mt-2">
              {job.applications_count} application{job.applications_count !== 1 ? "s" : ""} so far
            </p>
          </div>
        </div>

        {/* Apply Modal */}
        <ApplyModal
          jobId={job.id}
          jobTitle={job.title}
          isOpen={showApplyModal}
          onClose={() => setShowApplyModal(false)}
        />
      </div>
    </WorkerLayout>
  );
}