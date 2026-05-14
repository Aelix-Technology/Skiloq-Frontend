// src/components/onboarding/steps/SkillTagSelection.tsx
"use client";

import { useState } from "react";
import { skillTagsByCategory } from "@/lib/skill-tags";
import type { WorkerCategory } from "@/types/onboarding";
import { Search, AlertCircle } from "lucide-react";

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
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-xl font-bold text-primary">Select your skills</h1>
        <p className="text-sm text-primary-300">
          Choose up to {maxSkills} skills. We'll verify each one.
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-300" />
        <input          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search skills..."
          className="w-full bg-primary-50 border border-primary-100 rounded-input pl-10 pr-4 py-3 text-sm text-primary placeholder:text-primary-200 focus:outline-none focus:ring-2 focus:ring-accent/50"
        />
      </div>

      {/* Selected count */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-primary-300">
          {selectedSkills.length}/{maxSkills} selected
        </span>
        {isMaxed && (
          <span className="text-xs text-warning font-medium">Max reached</span>
        )}
      </div>

      {/* Skill grid */}
      <div className="grid gap-2">
        {filteredTags.map((tag) => {
          const isSelected = selectedSkills.includes(tag.id);
          const isDisabled = !isSelected && isMaxed;

          return (
            <button
              key={tag.id}
              onClick={() => onToggleSkill(tag.id)}
              disabled={isDisabled}
              className={`flex items-center justify-between p-3 rounded-card border-2 transition-all text-left ${
                isSelected
                  ? "border-accent bg-accent-50 shadow-sm"
                  : isDisabled
                  ? "border-primary-50 bg-primary-50/50 opacity-50 cursor-not-allowed"
                  : "border-primary-100 hover:border-accent-200"
              }`}
            >
              <div>
                <span className="text-sm font-medium text-primary">
                  {tag.name}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {tag.assessment_required ? (
                  <span className="flex items-center gap-1 text-xs text-warning bg-warning/10 px-2 py-0.5 rounded-pill">
                    <AlertCircle className="w-3 h-3" />
                    Assessment
                  </span>
                ) : (
                  <span className="text-xs text-success bg-success/10 px-2 py-0.5 rounded-pill">
                    Portfolio only
                  </span>
                )}

                <div
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                    isSelected
                      ? "border-accent bg-accent"
                      : "border-primary-200"
                  }`}
                >
                  {isSelected && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {filteredTags.length === 0 && (
        <p className="text-center text-sm text-primary-300 py-8">
          No skills found for "{search}"
        </p>
      )}
    </div>
  );
}