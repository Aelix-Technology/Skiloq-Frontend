// src/components/dashboard/VerificationChecklist.tsx
"use client";

import { Check, Clock, AlertCircle, ChevronRight, Shield } from "lucide-react";
import type { VerificationChecklist as ChecklistType } from "@/types/dashboard";
import { useRouter } from "next/navigation";

interface VerificationChecklistProps {
  checklist: ChecklistType;
}

export function VerificationChecklist({ checklist }: VerificationChecklistProps) {
  const router = useRouter();

  if (checklist.all_verified) {
    return (
      <div className="bg-success/5 border border-success/20 rounded-card p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
          <Shield className="w-5 h-5 text-success" />
        </div>
        <div>
          <p className="text-sm font-semibold text-success">Fully Verified</p>
          <p className="text-xs text-primary-300">Your profile is visible in search results</p>
        </div>
      </div>
    );
  }

  const pendingSteps = checklist.steps.filter(
    (s) => s.status === "pending" || s.status === "in_review"
  );

  return (
    <div className="bg-white rounded-card border border-warning/20 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-primary-50">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-warning" />
            <h3 className="text-sm font-semibold text-primary">
              Complete Your Verification
            </h3>
          </div>
          <span className="text-xs font-medium text-primary-300">
            {checklist.progress}%
          </span>
        </div>
        {/* Progress bar */}
        <div className="h-1.5 bg-primary-100 rounded-pill overflow-hidden">
          <div
            className="h-full bg-warning rounded-pill transition-all duration-500"
            style={{ width: `${checklist.progress}%` }}
          />
        </div>
      </div>

      {/* Steps */}
      <div className="divide-y divide-primary-50">
        {checklist.steps.slice(0, 4).map((step) => (
          <div
            key={step.name}
            className="flex items-center justify-between px-4 py-3 hover:bg-primary-50/50 transition-colors cursor-pointer"
            onClick={() => step.action_url && router.push(step.action_url)}
          >
            <div className="flex items-center gap-3">
              {step.status === "completed" ? (
                <div className="w-6 h-6 rounded-full bg-success/10 flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 text-success" />
                </div>
              ) : step.status === "in_review" ? (
                <div className="w-6 h-6 rounded-full bg-warning/10 flex items-center justify-center">
                  <Clock className="w-3.5 h-3.5 text-warning" />
                </div>
              ) : (
                <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center">
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
        <div className="px-4 py-2.5 bg-primary-50/50">
          <p className="text-xs text-primary-300">
            +{pendingSteps.length - 1} more step{pendingSteps.length > 2 ? "s" : ""} remaining
          </p>
        </div>
      )}
    </div>
  );
}