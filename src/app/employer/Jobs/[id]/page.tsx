// src/app/employer/jobs/[id]/page.tsx
"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { EmployerLayout } from "@/components/layout/EmployerLayout";
import { ErrorState } from "@/components/shared/ErrorState";
import { mockJobDetail } from "@/lib/mock-jobs";
import { ArrowLeft, MapPin, Briefcase, Clock, Send, X, Check } from "lucide-react";
import { toast } from "sonner";

const statusConfig: Record<string, { color: string; label: string }> = {
  open: { color: "bg-success/10 text-success border-success/20", label: "Open" },
  in_progress: { color: "bg-accent/10 text-accent border-accent/20", label: "In Progress" },
  completed: { color: "bg-primary-50 text-primary-300 border-primary-100", label: "Completed" },
  cancelled: { color: "bg-danger/10 text-danger border-danger/20", label: "Cancelled" },
};

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();

  // TODO: Replace with useQuery hook: useJob(params.id)
  const job = mockJobDetail;
  const isLoading = false;
  const error = null;

  const [selectedApp, setSelectedApp] = useState<string | null>(null);
  const [offerAmount, setOfferAmount] = useState(job.budget_ghs.toString());

  const handleSendOffer = (workerId: string, workerName: string) => {
    // TODO: Replace with apiClient.post(`/jobs/${params.id}/offer/${workerId}`, { amount: parseInt(offerAmount) })
    toast.success(`Offer sent to ${workerName}!`);
    setSelectedApp(null);
  };

  const status = statusConfig[job.status] || statusConfig.open;

  if (isLoading) {
    return (
      <EmployerLayout>
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-primary-100 rounded w-32" />
          <div className="h-8 bg-primary-100 rounded w-3/4" />
          <div className="h-40 bg-primary-100 rounded-card" />
        </div>
      </EmployerLayout>
    );
  }

  if (error || !job) {
    return (
      <EmployerLayout>
        <ErrorState title="Job not found" onRetry={() => router.back()} />
      </EmployerLayout>
    );
  }

  return (
    <EmployerLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-sm text-primary-300 hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to dashboard
        </button>

        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-xl font-bold text-primary">{job.title}</h1>
            <div className="flex items-center gap-3 mt-2">
              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-pill text-xs font-semibold border ${status.color}`}>
                {status.label}
              </span>
              <span className="text-sm text-primary-300">{job.applications_count} applications</span>
            </div>
          </div>
          <p className="text-2xl font-bold text-accent">GHS {job.budget_ghs.toLocaleString()}</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <MetaPill icon={Briefcase} label={job.is_remote ? "Remote" : "On-site"} />
          {job.location_district && <MetaPill icon={MapPin} label={job.location_district} />}
          <MetaPill icon={Clock} label={`Posted ${new Date(job.posted_at).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}`} />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-primary mb-2">Skills Required</h3>
          <div className="flex flex-wrap gap-1.5">
            {job.skills_required.map((skill) => (
              <span key={skill} className="text-xs px-3 py-1 rounded-pill bg-accent/10 text-accent font-medium">{skill}</span>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-card border border-primary-100 p-4">
          <h3 className="text-sm font-semibold text-primary mb-2">Description</h3>
          <p className="text-sm text-primary-300 leading-relaxed whitespace-pre-line">{job.description}</p>
        </div>

        <div>
          <h2 className="text-md font-semibold text-primary mb-3">Applications ({job.applications.length})</h2>
          {job.applications.length > 0 ? (
            <div className="grid gap-3">
              {job.applications.map((app) => (
                <ApplicationCard
                  key={app.id}
                  app={app}
                  isSelected={selectedApp === app.id}
                  offerAmount={offerAmount}
                  onOfferAmountChange={setOfferAmount}
                  onSelect={() => setSelectedApp(app.id)}
                  onDeselect={() => setSelectedApp(null)}
                  onSendOffer={() => handleSendOffer(app.worker_id, app.worker_name)}
                  onViewProfile={() => router.push(`/employer/find-talent/${app.worker_id}`)}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-card border border-primary-100 p-6 text-center">
              <p className="text-sm text-primary-300">No applications yet</p>
            </div>
          )}
        </div>
      </div>
    </EmployerLayout>
  );
}

// ── Small sub-components ──────────────────────

function MetaPill({ icon: Icon, label }: { icon: typeof MapPin; label: string }) {
  return (
    <div className="flex items-center gap-1.5 bg-primary-50 px-3 py-1.5 rounded-pill">
      <Icon className="w-3.5 h-3.5 text-primary-300" />
      <span className="text-xs text-primary">{label}</span>
    </div>
  );
}

function ApplicationCard({
  app, isSelected, offerAmount, onOfferAmountChange,
  onSelect, onDeselect, onSendOffer, onViewProfile,
}: {
  app: import("@/types/employer").PendingApplication;
  isSelected: boolean;
  offerAmount: string;
  onOfferAmountChange: (v: string) => void;
  onSelect: () => void;
  onDeselect: () => void;
  onSendOffer: () => void;
  onViewProfile: () => void;
}) {
  const scoreColor = app.worker_trust_score >= 70 ? "text-success" : app.worker_trust_score >= 40 ? "text-warning" : "text-danger";

  return (
    <div className="bg-white rounded-card border border-primary-100 p-4">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-accent-100 flex items-center justify-center shrink-0">
            <span className="text-sm font-bold text-accent">
              {app.worker_name.split(" ").map((n) => n[0]).join("")}
            </span>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-primary">{app.worker_name}</h3>
            <div className="flex items-center gap-2 mt-0.5">
              <span className={`text-xs font-bold ${scoreColor}`}>Trust Score: {app.worker_trust_score}</span>
              <span className="text-xs text-primary-300">
                Applied {new Date(app.applied_at).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
              </span>
            </div>
          </div>
        </div>
      </div>

      <p className="text-sm text-primary-300 mb-3">{app.cover_note}</p>

      <div className="flex gap-2">
        <button onClick={onViewProfile} className="flex-1 py-2 text-sm font-medium text-accent border border-accent rounded-input hover:bg-accent-50 transition-colors">
          View Full Profile
        </button>

        {isSelected ? (
          <div className="flex-1 flex items-center gap-2">
            <input type="number" value={offerAmount} onChange={(e) => onOfferAmountChange(e.target.value)}
              className="w-24 bg-primary-50 border border-primary-100 rounded-input px-2 py-2 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
            <button onClick={onSendOffer} className="flex items-center gap-1 px-3 py-2 bg-accent text-white text-sm font-medium rounded-input hover:bg-accent-600 transition-colors">
              <Check className="w-3.5 h-3.5" /> Confirm
            </button>
            <button onClick={onDeselect} className="p-2 text-primary-300 hover:text-primary transition-colors">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <button onClick={onSelect} className="flex-1 flex items-center justify-center gap-2 py-2 bg-accent text-white text-sm font-semibold rounded-input hover:bg-accent-600 transition-colors">
            <Send className="w-3.5 h-3.5" /> Send Offer
          </button>
        )}
      </div>
    </div>
  );
}