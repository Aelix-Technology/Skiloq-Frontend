// src/components/employer/TalentFilters.tsx
"use client";

import { Filter } from "lucide-react";

const categories = [
  { value: "", label: "All Categories" },
  { value: "digital", label: "Digital & Remote" },
  { value: "trade", label: "Trade & Skilled" },
];

const sortOptions = [
  { value: "trust_score", label: "Highest Trust Score" },
  { value: "rate", label: "Lowest Rate" },
  { value: "jobs_completed", label: "Most Jobs Completed" },
];

interface TalentFiltersProps {
  category: string;
  sortBy: string;
  showFilters: boolean;
  onCategoryChange: (value: string) => void;
  onSortChange: (value: string) => void;
  onToggleFilters: () => void;
}

export function TalentFilters({
  category,
  sortBy,
  showFilters,
  onCategoryChange,
  onSortChange,
  onToggleFilters,
}: TalentFiltersProps) {
  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <button
          onClick={onToggleFilters}
          className={`flex items-center gap-2 px-4 py-3 border rounded-input text-sm font-medium transition-colors ${
            showFilters
              ? "border-accent bg-accent-50 text-accent"
              : "border-primary-100 text-primary-300 hover:border-primary-200"
          }`}
        >
          <Filter className="w-4 h-4" />
          Filters
        </button>
      </div>

      {showFilters && (
        <div className="flex flex-wrap gap-3">
          <select
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="bg-white border border-primary-100 rounded-input px-3 py-2 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-accent/50"
          >
            {categories.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="bg-white border border-primary-100 rounded-input px-3 py-2 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-accent/50"
          >
            {sortOptions.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}
