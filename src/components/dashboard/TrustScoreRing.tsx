"use client";

import { useState } from "react";
import { ShieldCheck, X } from "lucide-react";
import type { TrustScoreBreakdown } from "@/types/dashboard";
import { IconTile } from "@/components/ui/premium-card";
import { ProgressBar } from "@/components/ui/progress-bar";

interface TrustScoreRingProps {
  score: number;
  breakdown: TrustScoreBreakdown[];
}

export function TrustScoreRing({ score, breakdown }: TrustScoreRingProps) {
  const [showBreakdown, setShowBreakdown] = useState(false);

  const getColor = (s: number): string => {
    if (s >= 70) return "#22C55E";
    if (s >= 40) return "#F59E0B";
    return "#EF4444";
  };

  const getBadge = (s: number): string => {
    if (s >= 85) return "Verified Expert";
    if (s >= 70) return "Top Rated";
    if (s >= 50) return "Rising Talent";
    return "Building Trust";
  };

  const size = 120;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (score / 100) * circumference;

  return (
    <>
      <button
        onClick={() => setShowBreakdown(true)}
        className="relative flex w-full flex-col items-center gap-3 overflow-hidden rounded-2xl border border-white/70 bg-white/80 p-5 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/10 active:scale-95"
      >
        <div className="pointer-events-none absolute -left-12 -top-12 h-32 w-32 rounded-full bg-success/10 blur-2xl" />
        <IconTile tone="success">
          <ShieldCheck className="h-5 w-5" />
        </IconTile>

        <div className="relative" style={{ width: size, height: size }}>
          <svg width={size} height={size} className="-rotate-90">
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="#E5E7EB"
              strokeWidth={strokeWidth}
            />
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={getColor(score)}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold" style={{ color: getColor(score) }}>
              {score}
            </span>
            <span className="text-xs text-primary-300">/100</span>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm font-semibold text-primary">Trust Score</p>
          <p className="text-xs text-primary-300 mt-0.5">{getBadge(score)}</p>
        </div>
        <p className="text-xs font-semibold text-accent">Tap to see breakdown</p>
      </button>

      {showBreakdown && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
          <div
            className="absolute inset-0 bg-primary/60 backdrop-blur-sm"
            onClick={() => setShowBreakdown(false)}
          />
          <div className="relative max-h-[80vh] w-full overflow-y-auto rounded-t-2xl bg-white/95 p-6 shadow-2xl backdrop-blur-xl sm:max-w-md sm:rounded-2xl">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-lg font-bold tracking-tight text-primary">
                Trust Score Breakdown
              </h3>
              <button
                onClick={() => setShowBreakdown(false)}
                className="flex min-h-11 w-11 items-center justify-center rounded-xl transition-all hover:-translate-y-1 hover:bg-primary-50 hover:shadow-lg active:scale-95"
              >
                <X className="w-4 h-4 text-primary-300" />
              </button>
            </div>

            <div className="mb-6 flex items-center justify-between rounded-2xl bg-primary-50 p-4">
              <span className="text-sm font-medium text-primary">Total Score</span>
              <span className="text-xl font-bold" style={{ color: getColor(score) }}>
                {score}/100
              </span>
            </div>

            <div className="space-y-3">
              {breakdown.map((item) => {
                const progress = (item.score / item.weight) * 100;

                return (
                  <div
                    key={item.component}
                    className="rounded-2xl border border-primary-100 bg-white/70 p-3"
                  >
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-sm font-medium text-primary">
                        {item.component}
                      </span>
                      <span className="text-sm font-semibold text-primary">
                        {item.score}/{item.weight}
                      </span>
                    </div>
                    <ProgressBar
                      value={progress}
                      tone={progress >= 70 ? "success" : progress >= 40 ? "warning" : "danger"}
                      className="mb-1 h-1"
                    />
                    <p className="text-xs text-primary-300">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
