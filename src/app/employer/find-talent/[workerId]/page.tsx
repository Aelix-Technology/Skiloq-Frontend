// src/app/employer/find-talent/[workerId]/page.tsx
"use client";

import { useParams, useRouter } from "next/navigation";
import { EmployerLayout } from "@/components/layout/EmployerLayout";
import { ErrorState } from "@/components/shared/ErrorState";
import {
  ArrowLeft, Star, MapPin, Shield, Clock, Briefcase,
  Check, MessageCircle, Send, ThumbsUp
} from "lucide-react";
import type { Worker } from "@/types/worker";
import { toast } from "sonner";

// Mock worker profile — full detail view
const mockWorkerDetail: Worker = {
  id: "w001",
  user_id: "u001",
  full_name: "Akua Serwaa",
  category: "digital",
  bio: "Frontend developer with 3 years building React and Next.js applications for Ghanaian startups. Specialized in fintech dashboards and mobile-first web applications that work perfectly on budget Android devices.\n\nI've completed 34 projects on the platform with a 98% client satisfaction rate. My focus is clean, performant code that solves real business problems.",
  location_district: "Accra Metropolitan",
  hourly_rate_ghs: 75.00,
  trust_score: 82.5,
  is_visible_in_search: true,
  verification_level: "verified",
  global_earner_status: false,
  badge: "Top Rated",
  completed_jobs: 34,
  skills: [
    { id: "s1", name: "React Developer", assessment_score: 88, verified: true, assessment_required: true },
    { id: "s2", name: "UI Designer", assessment_score: 75, verified: true, assessment_required: false },
    { id: "s3", name: "TypeScript", assessment_score: 90, verified: true, assessment_required: true },
    { id: "s4", name: "Figma", assessment_score: 82, verified: true, assessment_required: false },
    { id: "s5", name: "Node.js", assessment_score: 70, verified: true, assessment_required: true },
  ],
  portfolio: [
    { id: "p1", type: "image", url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop", title: "E-commerce Dashboard" },
    { id: "p2", type: "image", url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop", title: "Fintech Analytics Platform" },
    { id: "p3", type: "link", url: "https://github.com/akua/project", title: "Open Source Fintech UI" },
  ],
  reviews: [
    { id: "r1", job_id: "j1", reviewer_id: "e1", reviewer_name: "John Mensah", rating: 5, comment: "Excellent work, delivered ahead of schedule. Very professional and responsive to feedback. Would definitely hire again.", submitted_at: "2026-01-15" },
    { id: "r2", job_id: "j2", reviewer_id: "e2", reviewer_name: "Sarah Osei", rating: 4, comment: "Great React skills. Clean code and good communication.", submitted_at: "2025-12-20" },
    { id: "r3", job_id: "j3", reviewer_id: "e3", reviewer_name: "David Addo", rating: 5, comment: "Best freelancer I've worked with on the platform.", submitted_at: "2025-11-05" },
    { id: "r4", job_id: "j4", reviewer_id: "e4", reviewer_name: "Grace Tagoe", rating: 5, comment: "Akua understood our requirements perfectly. Rare talent.", submitted_at: "2025-10-18" },
  ],
};

export default function WorkerProfilePage() {
  const params = useParams();
  const router = useRouter();
  const workerId = params.workerId as string;

  // TODO: Replace with useQuery hook
  const worker = mockWorkerDetail;
  const isLoading = false;
  const error = null;

  const averageRating = worker.reviews.length > 0
    ? (worker.reviews.reduce((sum, r) => sum + r.rating, 0) / worker.reviews.length).toFixed(1)
    : "0.0";

  const scoreColor = worker.trust_score >= 70 ? "#22C55E" : worker.trust_score >= 40 ? "#F59E0B" : "#EF4444";
  const size = 100;
  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (worker.trust_score / 100) * circumference;

  const handleHire = () => {
    // TODO: Replace with API call
    toast.success("Offer sent to Akua Serwaa!");
  };

  if (isLoading) {
    return (
      <EmployerLayout>
        <div className="animate-pulse space-y-4">
          <div className="h-40 bg-white rounded-card border border-primary-100" />
          <div className="h-20 bg-white rounded-card border border-primary-100" />
        </div>
      </EmployerLayout>
    );
  }

  if (error || !worker) {
    return (
      <EmployerLayout>
        <ErrorState title="Worker not found" onRetry={() => router.back()} />
      </EmployerLayout>
    );
  }

  return (
    <EmployerLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Back */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-sm text-primary-300 hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to search
        </button>

        {/* Profile Header */}
        <div className="bg-white rounded-card border border-primary-100 overflow-hidden">
          <div className="h-16 bg-gradient-to-r from-primary to-primary-700" />
          <div className="px-4 pb-4">
            <div className="flex items-end gap-4 -mt-8 mb-3">
              <div className="w-16 h-16 rounded-full bg-accent-100 border-4 border-white flex items-center justify-center">
                <span className="text-xl font-bold text-accent">
                  {worker.full_name.split(" ").map((n) => n[0]).join("")}
                </span>
              </div>
              <div className="relative ml-auto" style={{ width: size, height: size }}>
                <svg width={size} height={size} className="-rotate-90">
                  <circle cx={size/2} cy={size/2} r={radius} fill="white" stroke="#E5E7EB" strokeWidth={strokeWidth} />
                  <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke={scoreColor} strokeWidth={strokeWidth} strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-sm font-bold" style={{ color: scoreColor }}>{worker.trust_score}</span>
                  <span className="text-[9px] text-primary-300">/100</span>
                </div>
              </div>
            </div>

            <h1 className="text-lg font-bold text-primary">{worker.full_name}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="flex items-center gap-1 text-xs text-primary-300">
                <MapPin className="w-3 h-3" /> {worker.location_district}
              </span>
              <span className="text-xs text-primary-300">• GHS {worker.hourly_rate_ghs}/hr</span>
              <span className="text-xs text-primary-300">• {worker.completed_jobs} jobs</span>
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
              {worker.badge && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-pill text-xs font-medium bg-accent/10 text-accent border border-accent/30">
                  ⭐ {worker.badge}
                </span>
              )}
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-pill text-xs font-medium bg-success/10 text-success border border-success/30">
                <Shield className="w-3 h-3" /> Verified
              </span>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="bg-white rounded-card border border-primary-100 p-4">
          <h3 className="text-sm font-semibold text-primary mb-2">About</h3>
          <p className="text-sm text-primary-300 leading-relaxed whitespace-pre-line">{worker.bio}</p>
        </div>

        {/* Skills */}
        <div className="bg-white rounded-card border border-primary-100 p-4">
          <h3 className="text-sm font-semibold text-primary mb-3">Skills & Assessments</h3>
          <div className="grid gap-2">
            {worker.skills.map((skill) => (
              <div key={skill.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-success" />
                  <span className="text-sm text-primary">{skill.name}</span>
                </div>
                {skill.assessment_score && (
                  <span className={`text-sm font-bold ${
                    skill.assessment_score >= 80 ? "text-success" :
                    skill.assessment_score >= 60 ? "text-warning" : "text-danger"
                  }`}>
                    {skill.assessment_score}%
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Portfolio */}
        {worker.portfolio.length > 0 && (
          <div className="bg-white rounded-card border border-primary-100 p-4">
            <h3 className="text-sm font-semibold text-primary mb-3">Portfolio</h3>
            <div className="grid grid-cols-2 gap-2">
              {worker.portfolio.map((item) => (
                <div key={item.id} className="aspect-[4/3] bg-primary-50 rounded-card overflow-hidden">
                  {item.type === "image" ? (
                    <img src={item.url} alt={item.title} className="w-full h-full object-cover" loading="lazy" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-xs text-primary-300 text-center px-2">{item.title}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reviews */}
        <div className="bg-white rounded-card border border-primary-100 p-4">
          <div className="flex items-center gap-2 mb-3">
            <h3 className="text-sm font-semibold text-primary">Reviews</h3>
            <span className="flex items-center gap-1 text-sm">
              <Star className="w-4 h-4 text-warning fill-warning" />
              {averageRating}
            </span>
            <span className="text-sm text-primary-300">({worker.reviews.length})</span>
          </div>
          <div className="grid gap-2">
            {worker.reviews.slice(0, 3).map((review) => (
              <div key={review.id} className="border border-primary-50 rounded-card p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-primary">{review.reviewer_name}</span>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-3 h-3 ${star <= review.rating ? "text-warning fill-warning" : "text-primary-100"}`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-primary-300">{review.comment}</p>
                <p className="text-xs text-primary-200 mt-1">
                  {new Date(review.submitted_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Action buttons — fixed bottom */}
        <div className="sticky bottom-0 bg-white border-t border-primary-100 p-4 -mx-4 -mb-6">
          <div className="flex gap-3 max-w-3xl mx-auto">
            <button
              onClick={() => router.push(`/employer/messages/${worker.id}`)}
              className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium text-accent border-2 border-accent rounded-input hover:bg-accent-50 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Message
            </button>
            <button
              onClick={handleHire}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-accent text-white text-sm font-semibold rounded-input hover:bg-accent-600 transition-colors"
            >
              <Send className="w-4 h-4" />
              Send Job Offer
            </button>
          </div>
        </div>
      </div>
    </EmployerLayout>
  );
}