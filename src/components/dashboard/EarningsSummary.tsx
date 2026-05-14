// src/components/dashboard/EarningsSummary.tsx
"use client";

import { TrendingUp, TrendingDown, DollarSign } from "lucide-react";
import type { EarningsData } from "@/types/dashboard";
import { IconTile, PremiumCard } from "@/components/ui/premium-card";

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
    return maxValue > 0 ? `${(value / maxValue) * 100}%` : "0%";
  };

  const platformDiff = earnings.this_month - earnings.platform_average;
  const isAboveAverage = platformDiff >= 0;

  return (
    <div className="space-y-3">
      <h2 className="text-md font-semibold tracking-tight text-primary">Earnings</h2>

      <PremiumCard interactive className="space-y-4">
        <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-accent/10 blur-2xl" />
        <div className="flex items-center gap-3">
          <IconTile tone="accent">
            <DollarSign className="h-5 w-5" />
          </IconTile>
          <div>
            <p className="text-sm font-semibold text-primary">Earnings velocity</p>
            <p className="text-xs text-primary-300">Weekly, monthly, and lifetime view</p>
          </div>
        </div>
        {/* Bar chart */}
        <div className="flex items-end justify-between gap-3 h-24">
          <div className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
            <span className="text-xs font-semibold text-primary">
              GHS {earnings.this_week}
            </span>
            <div
              className="w-full max-w-[48px] bg-gradient-to-t from-accent to-accent-300 rounded-t-xl transition-all duration-700"
              style={{ height: barHeight(earnings.this_week) }}
            />
            <span className="text-xs text-primary-300">This Week</span>
          </div>

          <div className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
            <span className="text-xs font-semibold text-primary">
              GHS {earnings.this_month}
            </span>
            <div
              className="w-full max-w-[48px] bg-gradient-to-t from-accent-300 to-accent-100 rounded-t-xl transition-all duration-700"
              style={{ height: barHeight(earnings.this_month) }}
            />
            <span className="text-xs text-primary-300">This Month</span>
          </div>

          <div className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
            <span className="text-xs font-semibold text-primary">
              GHS {(earnings.all_time / 1000).toFixed(1)}K
            </span>
            <div
              className="w-full max-w-[48px] bg-gradient-to-t from-primary to-primary-300 rounded-t-xl transition-all duration-700"
              style={{ height: barHeight(earnings.all_time / 10) }}
            />
            <span className="text-xs text-primary-300">All Time</span>
          </div>
        </div>

        {/* Platform comparison */}
        <div
          className={`flex items-center gap-3 rounded-xl p-3 ${
            isAboveAverage ? "bg-success/5 border border-success/20" : "bg-warning/5 border border-warning/20"
          }`}
        >
          {isAboveAverage ? (
            <TrendingUp className={`w-5 h-5 text-success shrink-0`} />
          ) : (
            <TrendingDown className="w-5 h-5 text-warning shrink-0" />
          )}
          <div>
            <p className={`text-sm font-medium ${isAboveAverage ? "text-success" : "text-warning"}`}>
              {isAboveAverage
                ? `${Math.abs(platformDiff)}% above platform average`
                : `${Math.abs(platformDiff)}% below platform average`}
            </p>
            <p className="text-xs text-primary-300">
              Platform avg: GHS {earnings.platform_average.toLocaleString()}/mo
            </p>
          </div>
        </div>
      </PremiumCard>
    </div>
  );
}
