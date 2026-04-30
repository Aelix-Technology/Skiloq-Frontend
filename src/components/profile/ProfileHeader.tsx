// src/components/profile/ProfileHeader.tsx
"use client";

import { MapPin, Star, Shield, Clock, Pencil } from "lucide-react";
import type { Worker } from "@/types/worker";

interface ProfileHeaderProps {
  profile: Worker;
  onEdit: () => void;
}

const badgeConfig: Record<string, { bg: string; text: string; icon: string }> = {
  "Verified Expert": { bg: "bg-success/10 border-success/30", text: "text-success", icon: "🏆" },
  "Top Rated": { bg: "bg-accent/10 border-accent/30", text: "text-accent", icon: "⭐" },
  "Rising Talent": { bg: "bg-warning/10 border-warning/30", text: "text-warning", icon: "🚀" },
};

export function ProfileHeader({ profile, onEdit }: ProfileHeaderProps) {
  const badge = profile.badge ? badgeConfig[profile.badge] : null;
  const scoreColor = profile.trust_score >= 70 ? "#22C55E" : profile.trust_score >= 40 ? "#F59E0B" : "#EF4444";
  const size = 80;
  const strokeWidth = 5;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (profile.trust_score / 100) * circumference;

  return (
    <div className="relative bg-white rounded-card border border-primary-100 overflow-hidden">
      {/* Cover area */}
      <div className="h-20 bg-gradient-to-r from-primary to-primary-700" />

      {/* Content */}
      <div className="px-4 pb-4">
        {/* Avatar + Trust Score */}
        <div className="flex items-end gap-4 -mt-8 mb-3">
          {/* Avatar */}
          <div className="w-16 h-16 rounded-full bg-accent-100 border-4 border-white flex items-center justify-center overflow-hidden">
            <span className="text-2xl font-bold text-accent">
              {profile.full_name.split(" ").map((n) => n[0]).join("")}
            </span>
          </div>

          {/* Trust Score Ring */}
          <div className="relative ml-auto" style={{ width: size, height: size }}>
            <svg width={size} height={size} className="-rotate-90">
              <circle cx={size / 2} cy={size / 2} r={radius} fill="white" stroke="#E5E7EB" strokeWidth={strokeWidth} />
              <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={scoreColor} strokeWidth={strokeWidth} strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-sm font-bold" style={{ color: scoreColor }}>{profile.trust_score}</span>
              <span className="text-[9px] text-primary-300">/100</span>
            </div>
          </div>
        </div>

        {/* Name + Badge */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-lg font-bold text-primary">{profile.full_name}</h1>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="flex items-center gap-1 text-xs text-primary-300">
                <MapPin className="w-3 h-3" />
                {profile.location_district}
              </span>
              <span className="text-xs text-primary-300">
                • GHS {profile.hourly_rate_ghs}/hr
              </span>
            </div>
          </div>
          <button
            onClick={onEdit}
            className="w-9 h-9 flex items-center justify-center rounded-input border border-primary-100 hover:bg-primary-50 transition-colors"
          >
            <Pencil className="w-4 h-4 text-primary-300" />
          </button>
        </div>

        {/* Badge + Verification */}
        <div className="flex flex-wrap items-center gap-2 mt-3">
          {badge && (
            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-pill text-xs font-medium border ${badge.bg} ${badge.text}`}>
              <span>{badge.icon}</span>
              {profile.badge}
            </span>
          )}
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-pill text-xs font-medium bg-success/10 text-success border border-success/30">
            <Shield className="w-3 h-3" />
            Verified
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-pill text-xs font-medium bg-primary-50 text-primary-300 border border-primary-100">
            <Clock className="w-3 h-3" />
            {profile.completed_jobs} jobs
          </span>
        </div>
      </div>
    </div>
  );
}