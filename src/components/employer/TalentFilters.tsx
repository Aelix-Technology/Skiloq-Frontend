// src/components/employer/TalentFilters.tsx
"use client";

import { Filter, SlidersHorizontal, Zap, Star, MapPin } from "lucide-react";

const categories = [
  { value: "", label: "All Worker Tracks" },
  { value: "digital", label: "Digital & Remote" },
  { value: "trade", label: "Trade & Skilled Artisans" },
  { value: "educator", label: "Educators & Tutors" },
  { value: "online_income", label: "Online Income" },
];

const sortOptions = [
  { value: "trust_score", label: "Highest Trust Score (Default)" },
  { value: "fastest_response", label: "Fastest Response Time" },
  { value: "rate", label: "Lowest Rate" },
  { value: "jobs_completed", label: "Most Jobs Completed" },
];

interface TalentFiltersProps {
  category: string;
  sortBy: string;
  showFilters: boolean;
  minTrustScore: number;
  availableOnly: boolean;
  onCategoryChange: (value: string) => void;
  onSortChange: (value: string) => void;
  onMinTrustScoreChange: (value: number) => void;
  onToggleAvailableOnly: () => void;
  onToggleFilters: () => void;
}

export function TalentFilters({
  category,
  sortBy,
  showFilters,
  minTrustScore,
  availableOnly,
  onCategoryChange,
  onSortChange,
  onMinTrustScoreChange,
  onToggleAvailableOnly,
  onToggleFilters,
}: TalentFiltersProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={onToggleFilters}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all border ${
            showFilters
              ? "border-[#4F6AF5] bg-[#4F6AF5]/10 text-[#4F6AF5]"
              : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Smart Filters</span>
        </button>

        {/* Quick Instant Book toggle */}
        <button
          onClick={onToggleAvailableOnly}
          className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all border ${
            availableOnly
              ? "bg-amber-50 border-amber-300 text-amber-800"
              : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
          }`}
        >
          <Zap className={`w-3.5 h-3.5 ${availableOnly ? "text-amber-500 fill-amber-500" : "text-gray-400"}`} />
          <span>Available Now (Instant Book)</span>
        </button>

        {/* Sort selector */}
        <div className="ml-auto flex items-center gap-2">
          <span className="text-xs text-gray-500 hidden sm:inline">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="bg-white border border-gray-200 rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#4F6AF5]"
          >
            {sortOptions.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {showFilters && (
        <div className="p-5 bg-white rounded-3xl border border-gray-200 shadow-sm space-y-4 animate-in fade-in-50 duration-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Category */}
            <div>
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1.5">
                Worker Category Track
              </label>
              <select
                value={category}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4F6AF5]"
              >
                {categories.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Trust Score Slider */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Min Trust Score
                </label>
                <span className="text-xs font-extrabold text-[#22C55E]">
                  {minTrustScore}+ / 100
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="90"
                step="5"
                value={minTrustScore}
                onChange={(e) => onMinTrustScoreChange(Number(e.target.value))}
                className="w-full accent-[#4F6AF5] h-2 bg-gray-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                <span>All (0)</span>
                <span>Rising (50+)</span>
                <span>Top Rated (70+)</span>
                <span>Expert (85+)</span>
              </div>
            </div>

            {/* Region / District quick filter */}
            <div>
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1.5">
                Location Area
              </label>
              <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4F6AF5]">
                <option value="">Any District (All Ghana)</option>
                <option value="Accra">Accra Metropolitan</option>
                <option value="Tema">Tema Municipal</option>
                <option value="Kumasi">Kumasi Metropolitan</option>
                <option value="Takoradi">Sekondi-Takoradi</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
