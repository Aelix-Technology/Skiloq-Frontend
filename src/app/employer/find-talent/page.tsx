// src/app/employer/find-talent/page.tsx
"use client";

import { useState } from "react";
import { EmployerLayout } from "@/components/layout/EmployerLayout";
import { TalentFilters } from "@/components/employer/TalentFilters";
import { WorkerGrid } from "@/components/employer/WorkerGrid";
import { ErrorState } from "@/components/shared/ErrorState";
import { useTalentSearch } from "@/hooks/useEmployer";
import { Search, Briefcase } from "lucide-react";

export default function FindTalentPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("trust_score");
  const [showFilters, setShowFilters] = useState(false);

  const { data: workers, isLoading, error, refetch } = useTalentSearch({
    search,
    category: category || undefined,
    sort_by: sortBy,
  });

  return (
    <EmployerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-xl font-bold text-primary">Find Talent</h1>
          <p className="text-sm text-primary-300 mt-0.5">Search verified workers across Ghana</p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-300" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, skill, or keyword..."
            className="w-full bg-white border border-primary-100 rounded-input pl-10 pr-4 py-3 text-sm text-primary placeholder:text-primary-200 focus:outline-none focus:ring-2 focus:ring-accent/50"
          />
        </div>

        {/* Filters */}
        <TalentFilters
          category={category}
          sortBy={sortBy}
          showFilters={showFilters}
          onCategoryChange={setCategory}
          onSortChange={setSortBy}
          onToggleFilters={() => setShowFilters(!showFilters)}
        />

        {/* Results */}
        {isLoading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 animate-pulse">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-48 bg-white rounded-card border border-primary-100" />
            ))}
          </div>
        )}

        {error && <ErrorState title="Couldn't load workers" onRetry={() => refetch()} />}

        {workers && workers.length === 0 && (
          <div className="text-center py-16">
            <Briefcase className="w-8 h-8 text-primary-200 mx-auto mb-2" />
            <p className="text-sm text-primary-300">No workers match your search</p>
          </div>
        )}

        {workers && workers.length > 0 && (
          <>
            <p className="text-xs text-primary-300">{workers.length} worker{workers.length !== 1 ? "s" : ""} found</p>
            <WorkerGrid workers={workers} />
          </>
        )}
      </div>
    </EmployerLayout>
  );
}