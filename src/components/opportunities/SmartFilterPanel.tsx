// src/components/opportunities/SmartFilterPanel.tsx
"use client";

import { useState } from "react";
import { Filter, Search } from "lucide-react";

interface FilterState {
  price_min: number | null;
  price_max: number | null;
  location: string;
  search: string;
}

interface SmartFilterPanelProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  resultCount: number;
}

const ghanaDistricts = [
  "Accra Metropolitan",
  "Kumasi Metropolitan",
  "Tema Metropolitan",
  "Tamale Metropolitan",
  "Adenta Municipal",
  "Cape Coast Metropolitan",
];

export function SmartFilterPanel({
  filters,
  onFiltersChange,
  resultCount,
}: SmartFilterPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  const hasActiveFilters =
    filters.price_min !== null ||
    filters.price_max !== null ||
    filters.location !== "";

  const clearFilters = () => {
    onFiltersChange({
      price_min: null,
      price_max: null,
      location: "",
      search: filters.search,
    });
  };

  return (
    <div className="space-y-3">
      {/* Search + Filter toggle */}
    
<div className="flex gap-2">
  <div className="relative flex-1">
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-300" />
    <input
      type="text"
      value={filters.search}
      onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
      placeholder="Search jobs, skills, or keywords..."
      className="w-full bg-white border border-primary-100 rounded-input pl-10 pr-4 py-3 text-sm text-primary placeholder:text-primary-200 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
    />
  </div>
  <button
    onClick={() => setIsOpen(!isOpen)}
    className={`relative flex items-center gap-2 px-4 py-3 rounded-input text-sm font-medium transition-all ${
      isOpen || hasActiveFilters
        ? "border-accent bg-accent-50 text-accent shadow-sm"
        : "border border-primary-100 text-primary-300 hover:border-primary-200 hover:text-primary-400"
    }`}
  >
    <Filter className="w-4 h-4" />
    Filters
    {hasActiveFilters && (
      <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-accent text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
        !
      </span>
    )}
  </button>
</div>

      {/* Expandable filter panel */}
      {isOpen && (
        <div className="bg-white rounded-card border border-primary-100 p-4 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-primary">Filters</h3>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-xs text-accent font-medium hover:underline"
              >
                Clear all
              </button>
            )}
          </div>

          {/* Price range */}
          <div>
            <label className="text-xs font-medium text-primary-400 mb-2 block">
              Budget Range (GHS)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={filters.price_min || ""}
                onChange={(e) =>
                  onFiltersChange({
                    ...filters,
                    price_min: e.target.value ? parseInt(e.target.value) : null,
                  })
                }
                placeholder="Min"
                className="w-full bg-primary-50 border border-primary-100 rounded-input px-3 py-2 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
              <span className="text-primary-300 text-sm">—</span>
              <input
                type="number"
                value={filters.price_max || ""}
                onChange={(e) =>
                  onFiltersChange({
                    ...filters,
                    price_max: e.target.value ? parseInt(e.target.value) : null,
                  })
                }
                placeholder="Max"
                className="w-full bg-primary-50 border border-primary-100 rounded-input px-3 py-2 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="text-xs font-medium text-primary-400 mb-2 block">
              Location
            </label>
            <select
              value={filters.location}
              onChange={(e) =>
                onFiltersChange({ ...filters, location: e.target.value })
              }
              className="w-full bg-primary-50 border border-primary-100 rounded-input px-3 py-2 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-accent/50"
            >
              <option value="">All Districts</option>
              {ghanaDistricts.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Result count */}
      <p className="text-xs text-primary-300">
        {resultCount} job{resultCount !== 1 ? "s" : ""} found
      </p>
    </div>
  );
}