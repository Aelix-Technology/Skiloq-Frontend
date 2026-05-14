"use client";

import { Award, Clock, MapPin, Pencil, Rocket, Shield, Star } from "lucide-react";
import type { Worker } from "@/types/worker";
import { StatusBadge } from "@/components/ui/status-badge";

interface ProfileHeaderProps {
  profile: Worker;
  onEdit: () => void;
}

const badgeConfig: Record<
  string,
  { tone: "success" | "progress" | "pending"; icon: typeof Award }
> = {
  "Verified Expert": { tone: "success", icon: Award },
  "Top Rated": { tone: "progress", icon: Star },
  "Rising Talent": { tone: "pending", icon: Rocket },
};

export function ProfileHeader({ profile, onEdit }: ProfileHeaderProps) {
  const badge = profile.badge ? badgeConfig[profile.badge] : null;
  const scoreColor =
    profile.trust_score >= 70
      ? "#22C55E"
      : profile.trust_score >= 40
        ? "#F59E0B"
        : "#EF4444";
  const size = 80;
  const strokeWidth = 5;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (profile.trust_score / 100) * circumference;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/70 bg-white/80 shadow-lg shadow-primary/5 backdrop-blur-xl">
      <div className="relative h-24 bg-gradient-to-r from-primary via-primary-700 to-accent">
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white/20 to-transparent" />
      </div>

      <div className="px-4 pb-5">
        <div className="-mt-8 mb-3 flex items-end gap-4">
          <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border-4 border-white bg-accent-100 shadow-lg">
            <span className="text-2xl font-bold text-accent">
              {profile.full_name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          </div>

          <div className="relative ml-auto" style={{ width: size, height: size }}>
            <svg width={size} height={size} className="-rotate-90">
              <circle cx={size / 2} cy={size / 2} r={radius} fill="white" stroke="#E5E7EB" strokeWidth={strokeWidth} />
              <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={scoreColor} strokeWidth={strokeWidth} strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" className="transition-all duration-700" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-sm font-bold" style={{ color: scoreColor }}>
                {profile.trust_score}
              </span>
              <span className="text-[9px] text-primary-300">/100</span>
            </div>
          </div>
        </div>

        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-lg font-bold tracking-tight text-primary">
              {profile.full_name}
            </h1>
            <div className="mt-0.5 flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-1 text-xs text-primary-300">
                <MapPin className="w-3 h-3" />
                {profile.location_district}
              </span>
              <span className="text-xs text-primary-300">
                GHS {profile.hourly_rate_ghs}/hr
              </span>
            </div>
          </div>
          <button
            onClick={onEdit}
            className="flex min-h-11 w-11 items-center justify-center rounded-xl border border-primary-100 bg-white/80 transition-all hover:-translate-y-1 hover:bg-accent-50 hover:shadow-lg active:scale-95"
          >
            <Pencil className="w-4 h-4 text-primary-300" />
          </button>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          {badge && (
            <StatusBadge tone={badge.tone}>
              <badge.icon className="h-3 w-3" />
              {profile.badge}
            </StatusBadge>
          )}
          <StatusBadge tone="success">
            <Shield className="w-3 h-3" />
            Verified
          </StatusBadge>
          <StatusBadge tone="neutral">
            <Clock className="w-3 h-3" />
            {profile.completed_jobs} jobs
          </StatusBadge>
        </div>
      </div>
    </div>
  );
}
