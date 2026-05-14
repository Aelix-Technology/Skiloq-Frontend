// src/components/dashboard/VerificationChecklist.tsx
"use client";

import { Check, Clock, AlertCircle, ChevronRight, Shield } from "lucide-react";
import type { VerificationChecklist as ChecklistType } from "@/types/dashboard";
import { useRouter } from "next/navigation";
import { IconTile, PremiumCard } from "@/components/ui/premium-card";
import { ProgressBar } from "@/components/ui/progress-bar";

interface VerificationChecklistProps {
  checklist: ChecklistType;
}

export function VerificationChecklist({ checklist }: VerificationChecklistProps) {
  const router = useRouter();

  if (checklist.all_verified) {
    return (
      <PremiumCard className="flex items-center gap-3 border-success/20 bg-success/5">
        <IconTile tone="success">
          <Shield className="w-5 h-5" />
        </IconTile>
        <div>
          <p className="text-sm font-semibold text-success">Fully Verified</p>
          <p className="text-xs text-primary-300">Your profile is visible in search results</p>
        </div>
      </PremiumCard>
    );
  }

  const pendingSteps = checklist.steps.filter(
    (s) => s.status === "pending" || s.status === "in_review"
  );

  return (
    <PremiumCard className="border-warning/20 p-0">
      {/* Header */}
      <div className="p-5 border-b border-primary-50">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <IconTile tone="warning" className="size-9">
              <Shield className="w-4 h-4" />
            </IconTile>
            <h3 className="text-sm font-semibold text-primary">
              Complete Your Verification
            </h3>
          </div>
          <span className="text-xs font-medium text-primary-300">
            {checklist.progress}%
          </span>
        </div>
        {/* Progress bar */}
        <ProgressBar value={checklist.progress} tone="warning" />
      </div>

      {/* Steps */}
      <div className="divide-y divide-primary-50">
        {checklist.steps.slice(0, 4).map((step) => (
          <div
            key={step.name}
            className="flex cursor-pointer items-center justify-between px-5 py-3.5 transition-all hover:bg-accent-50/50 active:scale-[0.99]"
            onClick={() => step.action_url && router.push(step.action_url)}
          >
            <div className="flex items-center gap-3">
              {step.status === "completed" ? (
                <div className="w-7 h-7 rounded-xl bg-success/10 flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 text-success" />
                </div>
              ) : step.status === "in_review" ? (
                <div className="w-7 h-7 rounded-xl bg-warning/10 flex items-center justify-center">
                  <Clock className="w-3.5 h-3.5 text-warning" />
                </div>
              ) : (
                <div className="w-7 h-7 rounded-xl bg-primary-100 flex items-center justify-center">
                  <AlertCircle className="w-3.5 h-3.5 text-primary-300" />
                </div>
              )}
              <div>
                <p className="text-sm font-medium text-primary">{step.name}</p>
                {step.eta && (
                  <p className="text-xs text-primary-300">ETA: {step.eta}</p>
                )}
              </div>
            </div>
            {step.action_url && (
              <ChevronRight className="w-4 h-4 text-primary-200" />
            )}
          </div>
        ))}
      </div>

      {/* Remaining count */}
      {pendingSteps.length > 1 && (
        <div className="px-5 py-3 bg-primary-50/50">
          <p className="text-xs text-primary-300">
            +{pendingSteps.length - 1} more step{pendingSteps.length > 2 ? "s" : ""} remaining
          </p>
        </div>
      )}
    </PremiumCard>
  );
}
