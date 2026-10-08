// src/components/onboarding/steps/SkillTagSelection.tsx
"use client";

import { useState } from "react";
import { skillTagsByCategory } from "@/lib/skill-tags";
import type { WorkerCategory } from "@/types/onboarding";
import { Search, Check, AlertCircle, FileCheck, Sparkles, X } from "lucide-react";

interface SkillTagSelectionProps {
  category: WorkerCategory;
  selectedSkills: string[];
  onToggleSkill: (skillId: string) => void;
}

export function SkillTagSelection({
  category,
  selectedSkills,
  onToggleSkill,
}: SkillTagSelectionProps) {
  const [search, setSearch] = useState("");
  const tags = skillTagsByCategory[category] || [];

  const filteredTags = tags.filter((tag) =>
    tag.name.toLowerCase().includes(search.toLowerCase())
  );

  const maxSkills = 8;
  const isMaxed = selectedSkills.length >= maxSkills;

  return (
    <div className="space-y-8">
      {/* Step Header */}
      <div className="text-center max-w-xl mx-auto space-y-2.5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          Skill Specialization
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
          Select your skill tags
        </h1>
        <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
          Choose up to {maxSkills} specific capabilities you provide. You will be matched with employers looking for these exact competencies.
        </p>
      </div>

      {/* Search & Counter Bar */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search specific skills (e.g. React, Wiring, Math)..."
              className="w-full bg-gray-50/50 border-2 border-gray-200 rounded-2xl pl-10 pr-10 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-all shadow-sm"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 sm:justify-end">
            <div className="px-3.5 py-2 rounded-xl bg-gray-100 text-xs font-bold text-gray-700 flex items-center gap-1.5">
              <span>{selectedSkills.length} of {maxSkills} selected</span>
              {isMaxed && (
                <span className="text-[10px] text-amber-600 bg-amber-100 px-1.5 py-0.5 rounded font-extrabold">
                  MAX
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Selected skills quick chips preview */}
        {selectedSkills.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 p-3 bg-blue-50/40 rounded-2xl border border-blue-100/60">
            <span className="text-[11px] font-bold text-blue-900 uppercase tracking-wider mr-1">
              Active:
            </span>
            {selectedSkills.map((id) => {
              const tag = tags.find((t) => t.id === id);
              return (
                <span
                  key={id}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white text-xs font-bold text-blue-700 border border-blue-200 shadow-xs"
                >
                  <span>{tag?.name || id}</span>
                  <button
                    type="button"
                    onClick={() => onToggleSkill(id)}
                    className="hover:text-red-500 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              );
            })}
          </div>
        )}
      </div>

      {/* Skill Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
        {filteredTags.map((tag) => {
          const isSelected = selectedSkills.includes(tag.id);
          const isDisabled = !isSelected && isMaxed;

          return (
            <button
              key={tag.id}
              type="button"
              onClick={() => onToggleSkill(tag.id)}
              disabled={isDisabled}
              className={`group flex items-center justify-between p-4 rounded-2xl border-2 transition-all text-left ${
                isSelected
                  ? "border-[#2563EB] bg-blue-50/60 shadow-sm ring-1 ring-blue-500/20"
                  : isDisabled
                  ? "border-gray-100 bg-gray-50 opacity-40 cursor-not-allowed"
                  : "border-gray-200/90 bg-white hover:border-blue-300 hover:bg-gray-50/50"
              }`}
            >
              <div className="flex flex-col pr-3">
                <span className={`text-sm font-bold ${isSelected ? "text-blue-900" : "text-gray-900 group-hover:text-blue-600 transition-colors"}`}>
                  {tag.name}
                </span>
                <span className="text-[11px] text-gray-400 mt-0.5">
                  {tag.assessment_required ? "Verified via quiz" : "Verified via portfolio"}
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {tag.assessment_required ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                    <AlertCircle className="w-2.5 h-2.5 text-amber-500" />
                    Quiz
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <FileCheck className="w-2.5 h-2.5 text-emerald-500" />
                    Work
                  </span>
                )}

                <div
                  className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors ${
                    isSelected
                      ? "border-[#2563EB] bg-[#2563EB] text-white"
                      : "border-gray-300 bg-white group-hover:border-gray-400"
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {filteredTags.length === 0 && (
        <div className="text-center py-12 rounded-2xl bg-gray-50 border border-gray-100">
          <p className="text-sm font-medium text-gray-500">
            No matching skill found for &ldquo;{search}&rdquo;
          </p>
          <button
            type="button"
            onClick={() => setSearch("")}
            className="mt-2 text-xs font-bold text-blue-600 hover:underline"
          >
            Clear filter
          </button>
        </div>
      )}
    </div>
  );
}
