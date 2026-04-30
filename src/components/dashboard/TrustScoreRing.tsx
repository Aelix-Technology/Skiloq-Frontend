// src/components/dashboard/TrustScoreRing.tsx
"use client";

import { useState } from "react";
import type { TrustScoreBreakdown } from "@/types/dashboard";
import { X } from "lucide-react";

interface TrustScoreRingProps {
  score: number;
  breakdown: TrustScoreBreakdown[];
}

export function TrustScoreRing({ score, breakdown }: TrustScoreRingProps) {
  const [showBreakdown, setShowBreakdown] = useState(false);

  const getColor = (s: number): string => {
    if (s >= 70) return "#22C55E"; // success
    if (s >= 40) return "#F59E0B"; // warning
    return "#EF4444"; // danger
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
      {/* Ring */}
      <button
        onClick={() => setShowBreakdown(true)}
        className="flex flex-col items-center gap-3 p-4 bg-white rounded-card border border-primary-100 shadow-sm hover:shadow-md transition-shadow w-full"
      >
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
            <span
              className="text-2xl font-bold"
              style={{ color: getColor(score) }}
            >
              {score}
            </span>
            <span className="text-xs text-primary-300">/100</span>
          </div>
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-primary">Trust Score</p>
          <p className="text-xs text-primary-300 mt-0.5">{getBadge(score)}</p>
        </div>
        <p className="text-xs text-accent font-medium">Tap to see breakdown →</p>
      </button>

      {/* Breakdown Modal */}
      {showBreakdown && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowBreakdown(false)}
          />
          <div className="relative bg-white rounded-t-modal sm:rounded-modal w-full sm:max-w-md max-h-[80vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-primary">Trust Score Breakdown</h3>
              <button
                onClick={() => setShowBreakdown(false)}
                className="w-8 h-8 flex items-center justify-center rounded-input hover:bg-primary-50"
              >
                <X className="w-4 h-4 text-primary-300" />
              </button>
            </div>

            {/* Total */}
            <div className="flex items-center justify-between mb-6 p-4 bg-primary-50 rounded-card">
              <span className="text-sm font-medium text-primary">Total Score</span>
              <span className="text-xl font-bold" style={{ color: getColor(score) }}>
                {score}/100
              </span>
            </div>

            {/* Components */}
            <div className="space-y-3">
              {breakdown.map((item) => (
                <div
                  key={item.component}
                  className="p-3 border border-primary-100 rounded-card"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-primary">
                      {item.component}
                    </span>
                    <span className="text-sm font-semibold text-primary">
                      {item.score}/{item.weight}
                    </span>
                  </div>
                  {/* Mini progress bar */}
                  <div className="h-1 bg-primary-100 rounded-pill overflow-hidden mb-1">
                    <div
                      className="h-full rounded-pill transition-all"
                      style={{
                        width: `${(item.score / item.weight) * 100}%`,
                        backgroundColor: getColor((item.score / item.weight) * 100),
                      }}
                    />
                  </div>
                  <p className="text-xs text-primary-300">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}