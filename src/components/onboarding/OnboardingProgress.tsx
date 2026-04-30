// src/components/onboarding/OnboardingProgress.tsx
"use client";

import { Check } from "lucide-react";

interface Step {
  number: number;
  label: string;
}

const steps: Step[] = [
  { number: 1, label: "Category" },
  { number: 2, label: "Identity" },
  { number: 3, label: "Profile" },
  { number: 4, label: "Skills" },
  { number: 5, label: "Assessment" },
  { number: 6, label: "Portfolio" },
];

interface OnboardingProgressProps {
  currentStep: number;
}

export function OnboardingProgress({ currentStep }: OnboardingProgressProps) {
  const progressPercent = Math.round((currentStep / steps.length) * 100);

  return (
    <div className="space-y-3">
      {/* Progress bar */}
      <div className="h-1.5 bg-primary-100 rounded-pill overflow-hidden">
        <div
          className="h-full bg-accent rounded-pill transition-all duration-500 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Step indicators */}
      <div className="flex justify-between">
        {steps.map((step) => {
          const isCompleted = step.number < currentStep;
          const isCurrent = step.number === currentStep;

          return (
            <div
              key={step.number}
              className="flex flex-col items-center gap-1"
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
                  isCompleted
                    ? "bg-success text-white"
                    : isCurrent
                    ? "bg-accent text-white"
                    : "bg-primary-100 text-primary-300"
                }`}
              >
                {isCompleted ? (
                  <Check className="w-3.5 h-3.5" />
                ) : (
                  step.number
                )}
              </div>
              <span
                className={`text-xs hidden sm:block ${
                  isCurrent ? "text-primary font-medium" : "text-primary-300"
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}