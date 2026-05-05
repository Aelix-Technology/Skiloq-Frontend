// src/components/employer/WorkerCard.tsx
"use client";

import { useRouter } from "next/navigation";
import { Star, MapPin } from "lucide-react";
import type { Worker } from "@/types/worker";

interface WorkerCardProps {
  worker: Worker;
}

export function WorkerCard({ worker }: WorkerCardProps) {
  const router = useRouter();

  const scoreColor = worker.trust_score >= 70 ? "text-success" : worker.trust_score >= 40 ? "text-warning" : "text-danger";
  const scoreBg = worker.trust_score >= 70 ? "bg-success/10" : worker.trust_score >= 40 ? "bg-warning/10" : "bg-danger/10";

  return (
    <button
      onClick={() => router.push(`/employer/find-talent/${worker.id}`)}
      className="bg-white rounded-card border border-primary-100 p-4 text-left hover:border-accent-200 hover:shadow-sm transition-all"
    >
      {/* Worker header */}
      <div className="flex items-start gap-3 mb-3">
        <div className="w-11 h-11 rounded-full bg-accent-100 flex items-center justify-center shrink-0">
          <span className="text-sm font-bold text-accent">
            {worker.full_name.split(" ").map((n) => n[0]).join("")}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-primary truncate">{worker.full_name}</h3>
          <p className="text-xs text-primary-300">
            {worker.category === "digital" ? "Digital & Remote" : "Trade & Skilled"}
          </p>
        </div>
        <div className={`flex items-center gap-1 px-2 py-0.5 rounded-pill text-xs font-bold ${scoreBg} ${scoreColor}`}>
          <Star className="w-3 h-3" />
          {worker.trust_score}
        </div>
      </div>

      {/* Skills */}
      {worker.skills.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {worker.skills.slice(0, 3).map((skill) => (
            <span key={skill.id} className="text-xs px-2 py-0.5 rounded-pill bg-primary-50 text-primary-300">
              {skill.name}
            </span>
          ))}
          {worker.skills.length > 3 && (
            <span className="text-xs text-primary-200">+{worker.skills.length - 3}</span>
          )}
        </div>
      )}

      {/* Meta */}
      <div className="flex items-center gap-3 text-xs text-primary-300 pt-3 border-t border-primary-50">
        <span>{worker.completed_jobs} jobs</span>
        {worker.location_district && (
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {worker.location_district}
          </span>
        )}
        <span className="font-semibold text-primary ml-auto">
          GHS {worker.hourly_rate_ghs}/hr
        </span>
      </div>
    </button>
  );
}