// src/app/worker/opportunities/[id]/page.tsx
"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { WorkerLayout } from "@/components/layout/WorkerLayout";
import { ApplyModal } from "@/components/opportunities/ApplyModal";
import { useJob } from "@/hooks/useJobs";
import { Star, MapPin, Briefcase, Clock, ArrowLeft, Send, Building, CheckCircle, AlertTriangle } from "lucide-react";
import { FileDisputeModal } from "@/components/disputes/FileDisputeModal";

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = params.id as string;
  const { data: job, isLoading, error } = useJob(jobId);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [showDisputeModal, setShowDisputeModal] = useState(false);

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

  const getJobTypeLabel = () => {
    if (job.type === "tutoring") return "Tutoring";
    if (job.type === "online_income") return "Online Income";
    if (job.milestones) return "Milestone Project";
    return null;
  };

  return (
    <WorkerLayout>
      <div className="space-y-6 pb-24">
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-sm text-primary-300 hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to opportunities
        </button>

        {/* Type Badge */}
        {getJobTypeLabel() && (
          <div className="flex flex-wrap gap-2">
            <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-accent-50 text-accent-600">
              {getJobTypeLabel()}
            </span>
            {job.is_curated && (
              <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full bg-success-50 text-success-600">
                <CheckCircle className="w-3 h-3" />
                Curated
              </span>
            )}
          </div>
        )}

        {/* Title + Budget */}
        <div>
          <h1 className="text-lg font-bold text-primary leading-snug">{job.title}</h1>
          <p className="text-2xl font-bold text-accent mt-2">
            {job.currency} {job.budget_amount.toLocaleString()}
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

        {/* Tutoring Details */}
        {job.type === "tutoring" && job.tutoring_details && (
          <div className="bg-accent-50 rounded-card p-4">
            <h3 className="text-sm font-semibold text-accent-700 mb-3">Tutoring Details</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-primary-500">Subject:</span>
                <p className="font-medium text-primary">{job.tutoring_details.subject}</p>
              </div>
              <div>
                <span className="text-primary-500">Level:</span>
                <p className="font-medium text-primary">{job.tutoring_details.level}</p>
              </div>
              <div>
                <span className="text-primary-500">Duration:</span>
                <p className="font-medium text-primary">{job.tutoring_details.session_duration_minutes} min</p>
              </div>
              <div>
                <span className="text-primary-500">Price:</span>
                <p className="font-medium text-primary">{job.currency} {job.tutoring_details.session_price_amount}/session</p>
              </div>
              <div className="col-span-2">
                <span className="text-primary-500">Available Schedules:</span>
                <ul className="mt-1 space-y-1">
                  {job.tutoring_details.available_schedules.map((schedule, idx) => (
                    <li key={idx} className="font-medium text-primary">• {schedule}</li>
                  ))}
                </ul>
              </div>
              {job.tutoring_details.is_group_tutoring && job.tutoring_details.max_students && (
                <div className="col-span-2">
                  <span className="text-primary-500">Group Tutoring:</span>
                  <p className="font-medium text-primary">Up to {job.tutoring_details.max_students} students</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Online Income Details */}
        {job.type === "online_income" && job.online_income_details && (
          <div className="bg-success-50 rounded-card p-4">
            <h3 className="text-sm font-semibold text-success-700 mb-3">Task Details</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-primary-500">Task Type:</span>
                <p className="font-medium text-primary">{job.online_income_details.task_type}</p>
              </div>
              <div>
                <span className="text-primary-500">Per Task Payment:</span>
                <p className="font-medium text-primary">{job.currency} {job.online_income_details.per_task_payment_amount}</p>
              </div>
              <div>
                <span className="text-primary-500">Available Tasks:</span>
                <p className="font-medium text-primary">{job.online_income_details.available_tasks_count}</p>
              </div>
              <div>
                <span className="text-primary-500">Estimated Time:</span>
                <p className="font-medium text-primary">{job.online_income_details.estimated_time_minutes} min</p>
              </div>
              <div className="col-span-2">
                <span className="text-primary-500">Requirements:</span>
                <ul className="mt-1 space-y-1">
                  {job.online_income_details.requirements.map((req, idx) => (
                    <li key={idx} className="font-medium text-primary">• {req}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Milestones */}
        {job.milestones && job.milestones.length > 0 && (
          <div className="bg-primary-50 rounded-card p-4">
            <h3 className="text-sm font-semibold text-primary mb-3">Payment Milestones ({job.milestones.length})</h3>
            <div className="space-y-3">
              {job.milestones.map((milestone, idx) => (
                <div key={milestone.id} className="border border-primary-100 rounded-lg p-3 bg-white">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-medium text-primary">{milestone.title}</h4>
                    <span className="text-sm font-bold text-accent">{job.currency} {milestone.amount.toLocaleString()}</span>
                  </div>
                  <p className="text-xs text-primary-500 mb-2">{milestone.description}</p>
                  {milestone.due_date && (
                    <p className="text-xs text-primary-400">
                      Due: {new Date(milestone.due_date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

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
          <div className="max-w-2xl mx-auto flex gap-3">
            <button
              onClick={() => setShowDisputeModal(true)}
              className="px-4 bg-gray-100 text-gray-700 font-medium py-3.5 rounded-input hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 touch-target"
            >
              <AlertTriangle className="w-4 h-4" />
              Dispute
            </button>
            <button
              onClick={() => setShowApplyModal(true)}
              className="flex-1 bg-accent text-white font-semibold py-3.5 rounded-input hover:bg-accent-600 transition-colors flex items-center justify-center gap-2 touch-target"
            >
              <Send className="w-4 h-4" />
              Apply Now
            </button>
          </div>
          <p className="text-xs text-center text-primary-300 mt-2">
            {job.applications_count} application{job.applications_count !== 1 ? "s" : ""} so far
          </p>
        </div>

        {/* Apply Modal */}
        <ApplyModal
          jobId={job.id}
          jobTitle={job.title}
          isOpen={showApplyModal}
          onClose={() => setShowApplyModal(false)}
        />

        {/* File Dispute Modal */}
        <FileDisputeModal
          isOpen={showDisputeModal}
          onClose={() => setShowDisputeModal(false)}
          jobId={job.id}
          jobTitle={job.title}
          currentUserRole="worker"
        />
      </div>
    </WorkerLayout>
  );
}