// src/components/onboarding/steps/CategorySelection.tsx
"use client";

import { Check, Sparkles } from "lucide-react";
import { workerCategories } from "@/lib/categories";
import type { WorkerCategory } from "@/types/onboarding";

interface CategorySelectionProps {
  selected: WorkerCategory | null;
  onSelect: (category: WorkerCategory) => void;
}

export function CategorySelection({ selected, onSelect }: CategorySelectionProps) {
  return (
    <div className="space-y-8">
      {/* Step Header */}
      <div className="text-center max-w-xl mx-auto space-y-2.5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          Primary Specialization
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
          What kind of work do you do?
        </h1>
        <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
          Choose your primary domain so we can personalize your verification standards, skill assessments, and employer matches.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {workerCategories.map((cat) => {
          const isSelected = selected === cat.id;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelect(cat.id)}
              className={`group relative text-left p-5 sm:p-6 rounded-2xl border-2 transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? "border-[#2563EB] bg-blue-50/40 shadow-md shadow-blue-500/10 ring-1 ring-[#2563EB]/30"
                  : "border-gray-200/90 bg-white hover:border-blue-300 hover:bg-gray-50/50 hover:shadow-sm"
              }`}
            >
              {/* Top row: Icon & Selection indicator */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-sm transition-transform group-hover:scale-105 ${
                    isSelected ? "bg-white ring-2 ring-blue-500/30" : "bg-gray-100/80"
                  }`}
                >
                  <span>{cat.icon}</span>
                </div>

                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    isSelected
                      ? "border-[#2563EB] bg-[#2563EB] text-white shadow-sm"
                      : "border-gray-300 bg-white group-hover:border-gray-400"
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </div>

              {/* Title & Description */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {cat.label}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 mt-1.5 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              {/* Active selection footer bar */}
              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-semibold">
                <span className={isSelected ? "text-blue-600 font-bold" : "text-gray-400 group-hover:text-gray-600"}>
                  {isSelected ? "Selected category" : "Click to select"}
                </span>
                {isSelected && (
                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      <div className="text-center text-xs text-gray-400 pt-2">
        You can expand or add secondary skills in your profile after completing registration.
      </div>
    </div>
  );
}
