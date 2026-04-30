// src/components/wallet/EarningsBadge.tsx
"use client";

import { Award, Download, Lock } from "lucide-react";
import { toast } from "sonner";

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
      <div className="bg-white rounded-card border border-primary-100 p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
            <Lock className="w-5 h-5 text-primary-300" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-primary">Income Certificate</p>
            <p className="text-xs text-primary-300 mt-0.5">
              Earn GHS {remaining.toLocaleString()} more to unlock
            </p>
          </div>
        </div>
        <div className="mt-3 h-1.5 bg-primary-100 rounded-pill overflow-hidden">
          <div
            className="h-full bg-accent rounded-pill transition-all"
            style={{ width: `${(totalEarnings / threshold) * 100}%` }}
          />
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-xs text-primary-300">GHS {totalEarnings.toLocaleString()}</span>
          <span className="text-xs text-primary-300">GHS {threshold.toLocaleString()}</span>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={handleDownload}
      className="bg-gradient-to-br from-primary to-primary-700 rounded-card p-4 text-white cursor-pointer hover:shadow-lg transition-shadow"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
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