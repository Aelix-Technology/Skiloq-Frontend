"use client";

import { useState } from "react";
import { ShieldCheck, X } from "lucide-react";
import type { TrustScoreBreakdown } from "@/types/dashboard";
import { IconTile, PremiumCard } from "@/components/ui/premium-card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Button } from "@/components/ui/button";

interface TrustScoreRingProps {
  score: number;
  breakdown: TrustScoreBreakdown[];
}

export function TrustScoreRing({ score, breakdown }: TrustScoreRingProps) {
  const [showBreakdown, setShowBreakdown] = useState(false);

  const getColor = (s: number): string => {
    if (s >= 70) return "var(--color-success)";
    if (s >= 40) return "var(--color-warning)";
    return "var(--color-danger)";
  };

  const getBadge = (s: number): string => {
    if (s >= 85) return "Verified Expert";
    if (s >= 70) return "Top Rated";
    if (s >= 50) return "Rising Talent";
    return "Building Trust";
  };

  const getTone = (s: number) => {
    if (s >= 70) return "success";
    if (s >= 40) return "warning";
    return "danger";
  };

  const size = 136;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (score / 100) * circumference;

  return (
    <>
      <PremiumCard
        interactive
        className="relative flex flex-col items-center gap-5 cursor-pointer"
        onClick={() => setShowBreakdown(true)}
      >
        <div className="pointer-events-none absolute -left-20 -top-20 h-48 w-48 rounded-full blob-success opacity-70" />
        <div className="pointer-events-none absolute -right-16 bottom-0 h-40 w-40 rounded-full blob-accent opacity-40" />

        <div className="flex items-center gap-4 w-full">
          <IconTile tone="success" size="lg">
            <ShieldCheck className="h-7 w-7" strokeWidth={2.25} />
          </IconTile>
          <div className="flex-1">
            <h3 className="heading-3 text-lg m-0">Trust Score</h3>
            <p className="body-text-sm m-0 mt-1">{getBadge(score)}</p>
          </div>
        </div>

        <div className="relative mt-2" style={{ width: size, height: size }}>
          <svg width={size} height={size} className="-rotate-90">
            <defs>
              <linearGradient id={`trustGradient-${score}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={getColor(score)} stopOpacity="0.6" />
                <stop offset="100%" stopColor={getColor(score)} stopOpacity="1" />
              </linearGradient>
            </defs>
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="var(--color-primary-100)"
              strokeWidth={strokeWidth}
            />
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={`url(#trustGradient-${score})`}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              className="transition-all duration-1200 ease-[cubic-bezier(0.16,1,0.3,1)]"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5">
            <span
              className="font-heading text-4xl font-bold tracking-tighter"
              style={{ color: getColor(score) }}
            >
              {score}
            </span>
            <span className="text-xs font-semibold text-primary-400 tracking-wide">/100</span>
          </div>
        </div>

        <div className="w-full mt-2 flex items-center justify-between text-xs font-medium text-accent-600">
          <span>Tap for full breakdown</span>
          <span className="inline-flex items-center gap-1">→</span>
        </div>
      </PremiumCard>

      {showBreakdown && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center animate-fade-in-up">
          <div
            className="absolute inset-0 bg-primary-900/40 backdrop-blur-md"
            onClick={() => setShowBreakdown(false)}
          />
          <div className="relative max-h-[85vh] w-full overflow-y-auto bg-surface sm:max-w-lg sm:rounded-[28px] rounded-t-[28px] shadow-2xl border-t sm:border border-border-light animate-fade-in-up">
            <div className="p-8 pb-4">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h3 className="heading-3 text-xl mb-1">Trust Score Breakdown</h3>
                  <p className="body-text-sm m-0">See how each component contributes</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowBreakdown(false)}
                  aria-label="Close"
                >
                  <X className="w-5 h-5 text-primary-500" />
                </Button>
              </div>

              <PremiumCard paddingSize="md" elevated className="mb-8">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-primary-500 mb-1">Total Score</p>
                    <p className="font-heading text-3xl font-bold tracking-tight m-0 gradient-text-primary">
                      {score}/100
                    </p>
                  </div>
                  <div
                    className="font-heading text-lg font-semibold px-5 py-2.5 rounded-full border"
                    style={{
                      color: getColor(score),
                      borderColor: getColor(score) + "33",
                      backgroundColor: getColor(score) + "11",
                    }}
                  >
                    {getBadge(score)}
                  </div>
                </div>
              </PremiumCard>

              <div className="space-y-4">
                {breakdown.map((item, idx) => {
                  const progress = (item.score / item.weight) * 100;
                  const tone = getTone(progress);

                  return (
                    <PremiumCard key={item.component} paddingSize="md" className="overflow-hidden">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="font-heading text-base font-semibold text-primary-900 m-0 tracking-tight">
                            {item.component}
                          </p>
                          <p className="body-text-sm m-0 mt-1">{item.description}</p>
                        </div>
                        <div className="text-right">
                          <p
                            className="font-heading text-xl font-bold tracking-tight m-0"
                            style={{ color: getColor(progress) }}
                          >
                            {item.score}/<span className="text-primary-400">{item.weight}</span>
                          </p>
                        </div>
                      </div>
                      <ProgressBar
                        value={progress}
                        tone={tone === "success" ? "success" : tone === "warning" ? "warning" : "danger"}
                        className="h-2 rounded-full"
                      />
                    </PremiumCard>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
