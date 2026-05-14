// src/components/wallet/EarningsBadge.tsx
"use client";

import { Award, Download, Lock } from "lucide-react";
import { toast } from "sonner";
import { IconTile, PremiumCard } from "@/components/ui/premium-card";
import { ProgressBar } from "@/components/ui/progress-bar";

interface EarningsBadgeProps {
  totalEarnings: number;
  unlocked: boolean;
  threshold: number;
}

export function EarningsBadge({ totalEarnings, unlocked, threshold }: EarningsBadgeProps) {
  const handleDownload = () => {
    // TODO: Replace with apiClient.get("/workers/income-certificate")
    toast.success("Income Certificate PDF downloaded");
  };

  if (!unlocked) {
    const remaining = threshold - totalEarnings;
    return (
      <PremiumCard interactive>
        <div className="flex items-center gap-3">
          <IconTile tone="primary">
            <Lock className="w-5 h-5 text-primary-300" />
          </IconTile>
          <div className="flex-1">
            <p className="text-sm font-medium text-primary">Income Certificate</p>
            <p className="text-xs text-primary-300 mt-0.5">
              Earn GHS {remaining.toLocaleString()} more to unlock
            </p>
          </div>
        </div>
        <ProgressBar value={(totalEarnings / threshold) * 100} className="mt-3" />
        <div className="flex justify-between mt-1">
          <span className="text-xs text-primary-300">GHS {totalEarnings.toLocaleString()}</span>
          <span className="text-xs text-primary-300">GHS {threshold.toLocaleString()}</span>
        </div>
      </PremiumCard>
    );
  }

  return (
    <div
      onClick={handleDownload}
      className="cursor-pointer rounded-2xl bg-gradient-to-br from-primary to-primary-700 p-5 text-white shadow-lg shadow-primary/15 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-95"
    >
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center">
          <Award className="w-5 h-5 text-warning" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-white">Income Certificate</p>
          <p className="text-xs text-primary-200 mt-0.5">
            GHS {totalEarnings.toLocaleString()} total earnings
          </p>
        </div>
        <Download className="w-5 h-5 text-primary-200" />
      </div>
      <p className="text-xs text-primary-200 mt-3">
        Download your verified income certificate
      </p>
    </div>
  );
}
