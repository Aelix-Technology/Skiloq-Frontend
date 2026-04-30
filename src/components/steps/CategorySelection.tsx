// src/components/onboarding/steps/CategorySelection.tsx
"use client";

import { workerCategories } from "@/lib/categories";
import type { WorkerCategory } from "@/types/onboarding";

interface CategorySelectionProps {
  selected: WorkerCategory | null;
  onSelect: (category: WorkerCategory) => void;
}

export function CategorySelection({ selected, onSelect }: CategorySelectionProps) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-xl font-bold text-primary">What kind of work do you do?</h1>
        <p className="text-sm text-primary-300">
          This helps us tailor your verification and job matches
        </p>
      </div>

      <div className="grid gap-3">
        {workerCategories.map((cat) => {
          const isSelected = selected === cat.id;
          const isPhase2 = cat.id === "educator" || cat.id === "online_income";

          return (
            <button
              key={cat.id}
              onClick={() => !isPhase2 && onSelect(cat.id)}
              disabled={isPhase2}
              className={`relative text-left p-4 rounded-card border-2 transition-all ${
                isSelected
                  ? "border-accent bg-accent-50 shadow-sm"
                  : isPhase2
                  ? "border-primary-50 bg-primary-50/50 opacity-60 cursor-not-allowed"
                  : "border-primary-100 hover:border-accent-200 hover:bg-primary-50"
              }`}
            >
              {isPhase2 && (
                <span className="absolute top-2 right-2 bg-warning/10 text-warning text-xs font-medium px-2 py-0.5 rounded-pill">
                  Phase 2
                </span>
              )}

              <div className="flex items-start gap-3">
                <span className="text-2xl">{cat.icon}</span>
                <div>
                  <h3 className="font-semibold text-primary text-md">
                    {cat.label}
                  </h3>
                  <p className="text-sm text-primary-300 mt-0.5">
                    {cat.description}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}