// src/components/dashboard/EarningsSummary.tsx
"use client";

import { TrendingUp, TrendingDown, DollarSign, Wallet, ArrowUpRight } from "lucide-react";
import type { EarningsData } from "@/types/dashboard";
import { IconTile, PremiumCard } from "@/components/ui/premium-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";

interface EarningsSummaryProps {
  earnings: EarningsData;
}

export function EarningsSummary({ earnings }: EarningsSummaryProps) {
  const maxValue = Math.max(
    earnings.this_week,
    earnings.this_month,
    earnings.all_time / 10 // Scale all-time to fit better
  );

  const barHeight = (value: number) => {
    return maxValue > 0 ? `${Math.max(10, (value / maxValue) * 100)}%` : "10%";
  };

  const platformDiff = earnings.this_month - earnings.platform_average;
  const isAboveAverage = platformDiff >= 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="heading-3 text-lg m-0">Earnings</h2>
        <Button variant="ghost" size="sm" className="h-8 px-3 text-xs">
          View wallet <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
        </Button>
      </div>

      <PremiumCard interactive className="relative overflow-hidden">
        <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full blob-accent opacity-80" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-48 w-48 rounded-full blob-success opacity-30" />

        <div className="flex items-start justify-between mb-8">
          <div className="flex items-start gap-4">
            <IconTile tone="accent" size="lg">
              <Wallet className="h-7 w-7" strokeWidth={2} />
            </IconTile>
            <div>
              <h3 className="heading-3 text-base m-0 mb-1">Earnings velocity</h3>
              <p className="body-text-sm m-0">Weekly, monthly, and lifetime view</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-heading text-xs text-primary-500 mb-1 font-semibold tracking-wide">THIS MONTH</p>
            <p className="font-heading text-3xl font-bold tracking-tighter m-0 gradient-text-accent">
              GHS {earnings.this_month.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Modern Bar chart */}
        <div className="flex items-end justify-between gap-6 h-40 mb-8 px-2">
          <div className="flex-1 flex flex-col items-center gap-3 h-full justify-end">
            <span className="font-heading text-sm font-bold text-primary-900 tracking-tight">
              GHS {earnings.this_week.toLocaleString()}
            </span>
            <div className="w-full flex items-end justify-center h-full">
              <div
                className="w-full max-w-16 rounded-t-2xl transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] relative overflow-hidden"
                style={{
                  height: barHeight(earnings.this_week),
                  background:
                    "linear-gradient(180deg, var(--color-accent-400) 0%, var(--color-accent-600) 100%)",
                  boxShadow: "0 8px 24px -10px rgba(99, 102, 241, 0.45)",
                }}
              >
                <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white/30 to-transparent" />
              </div>
            </div>
            <span className="text-xs font-semibold text-primary-500 tracking-wide">This Week</span>
          </div>

          <div className="flex-1 flex flex-col items-center gap-3 h-full justify-end">
            <span className="font-heading text-sm font-bold text-primary-900 tracking-tight">
              GHS {earnings.this_month.toLocaleString()}
            </span>
            <div className="w-full flex items-end justify-center h-full">
              <div
                className="w-full max-w-16 rounded-t-2xl transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] relative overflow-hidden"
                style={{
                  height: barHeight(earnings.this_month),
                  background:
                    "linear-gradient(180deg, var(--color-accent-secondary) 0%, var(--color-success) 100%)",
                  boxShadow: "0 8px 24px -10px rgba(16, 185, 129, 0.4)",
                }}
              >
                <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white/30 to-transparent" />
              </div>
            </div>
            <span className="text-xs font-semibold text-primary-500 tracking-wide">This Month</span>
          </div>

          <div className="flex-1 flex flex-col items-center gap-3 h-full justify-end">
            <span className="font-heading text-sm font-bold text-primary-900 tracking-tight">
              GHS {(earnings.all_time / 1000).toFixed(1)}K
            </span>
            <div className="w-full flex items-end justify-center h-full">
              <div
                className="w-full max-w-16 rounded-t-2xl transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] relative overflow-hidden"
                style={{
                  height: barHeight(earnings.all_time / 10),
                  background:
                    "linear-gradient(180deg, var(--color-primary-600) 0%, var(--color-primary-900) 100%)",
                  boxShadow: "0 8px 24px -10px rgba(15, 23, 42, 0.4)",
                }}
              >
                <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white/25 to-transparent" />
              </div>
            </div>
            <span className="text-xs font-semibold text-primary-500 tracking-wide">All Time</span>
          </div>
        </div>

        {/* Platform comparison — Modern */}
        <PremiumCard
          paddingSize="md"
          className={`relative overflow-hidden`}
          style={{
            background: isAboveAverage
              ? "linear-gradient(135deg, var(--color-success-50) 0%, #F0FDF4 100%)"
              : "linear-gradient(135deg, var(--color-warning-50) 0%, #FFFBEB 100%)",
            border: isAboveAverage
              ? "1px solid var(--color-success-100)"
              : "1px solid var(--color-warning-100)",
          }}
        >
          <div className="flex items-center gap-4">
            <IconTile
              tone={isAboveAverage ? "success" : "warning"}
              size="md"
              className="shrink-0"
            >
              {isAboveAverage ? (
                <TrendingUp className="h-5 w-5" strokeWidth={2.25} />
              ) : (
                <TrendingDown className="h-5 w-5" strokeWidth={2.25} />
              )}
            </IconTile>
            <div className="flex-1 min-w-0">
              <p
                className={`font-heading text-base font-bold tracking-tight m-0 mb-1 ${
                  isAboveAverage ? "text-success-700" : "text-warning-700"
                }`}
              >
                {Math.abs(platformDiff)}% {isAboveAverage ? "above" : "below"} platform average
              </p>
              <p className="text-sm m-0 text-primary-600">
                Platform avg:{" "}
                <span className="font-semibold text-primary-800">
                  GHS {earnings.platform_average.toLocaleString()}/mo
                </span>
              </p>
            </div>
            <StatusBadge tone={isAboveAverage ? "success" : "pending"} className="shrink-0">
              {isAboveAverage ? "Outperforming" : "Room to grow"}
            </StatusBadge>
          </div>
        </PremiumCard>
      </PremiumCard>
    </div>
  );
}
