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
  onStepClick?: (step: number) => void;
}

export function OnboardingProgress({ currentStep, onStepClick }: OnboardingProgressProps) {
  const progressPercent = Math.round(((currentStep - 1) / (steps.length - 1)) * 100);

  return (
    <div className="w-full">
      {/* ── Desktop & Tablet Stepper ── */}
      <div className="hidden sm:block">
        <div className="relative flex items-center justify-between">
          {/* Background connecting line */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 rounded-full z-0" />
          
          {/* Active filled connecting line */}
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[#2563EB] rounded-full transition-all duration-500 ease-out z-0"
            style={{ width: `${progressPercent}%` }}
          />

          {/* Step indicators */}
          {steps.map((step) => {
            const isCompleted = step.number < currentStep;
            const isCurrent = step.number === currentStep;
            const canClick = isCompleted && onStepClick;

            return (
              <div
                key={step.number}
                className="relative z-10 flex flex-col items-center group"
              >
                <button
                  type="button"
                  disabled={!canClick}
                  onClick={() => canClick && onStepClick(step.number)}
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                    isCompleted
                      ? "bg-emerald-500 text-white shadow-sm ring-4 ring-emerald-50 hover:scale-105 cursor-pointer"
                      : isCurrent
                      ? "bg-[#2563EB] text-white shadow-md shadow-blue-500/25 ring-4 ring-blue-100 scale-110"
                      : "bg-white text-gray-400 border-2 border-gray-200"
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4 stroke-[3]" />
                  ) : (
                    <span>{step.number}</span>
                  )}
                </button>

                <span
                  className={`absolute top-10 whitespace-nowrap text-xs font-semibold tracking-tight transition-colors ${
                    isCurrent
                      ? "text-[#2563EB] font-bold"
                      : isCompleted
                      ? "text-gray-700"
                      : "text-gray-400"
                  }`}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Mobile Stepper (Clean, compact, no horizontal squeeze) ── */}
      <div className="sm:hidden space-y-2">
        <div className="flex items-center justify-between text-xs font-bold">
          <span className="text-gray-900">
            Step {currentStep} of {steps.length}:{" "}
            <span className="text-[#2563EB]">
              {steps.find((s) => s.number === currentStep)?.label}
            </span>
          </span>
          <span className="text-gray-400 font-mono">
            {Math.round((currentStep / steps.length) * 100)}%
          </span>
        </div>

        {/* Progress track */}
        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#2563EB] rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
