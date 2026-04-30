// src/app/worker/opportunities/page.tsx
"use client";

import { useState } from "react";
import { WorkerLayout } from "@/components/layout/WorkerLayout";
import { JobCard } from "@/components/opportunities/JobCard";
import { SmartFilterPanel } from "@/components/opportunities/SmartFilterPanel";
import { SortDropdown } from "@/components/opportunities/SortDropdown";
import { OpportunitiesSkeleton } from "@/components/opportunities/OpportunitiesSkeleton";
import { ErrorState } from "@/components/shared/ErrorState";
import { useJobs } from "@/hooks/useJobs";

export default function OpportunitiesPage() {
  const [filters, setFilters] = useState({
    search: "",
    price_min: null as number | null,
    price_max: null as number | null,
    location: "",
  });
  const [sortBy, setSortBy] = useState("rate");

  const { data: jobs, isLoading, error, refetch } = useJobs({
    search: filters.search,
    price_min: filters.price_min || undefined,
    price_max: filters.price_max || undefined,
    location: filters.location || undefined,
    sort_by: sortBy as "rate" | "jobs_completed" | "trust_score" | "response_time" | "nearest",
  });

  if (isLoading) {
    return (
      <WorkerLayout>
        <OpportunitiesSkeleton />
      </WorkerLayout>
    );
  }

  if (error) {
    return (
      <WorkerLayout>
        <ErrorState onRetry={() => refetch()} />
      </WorkerLayout>
    );
  }

  return (
    <WorkerLayout>
      <div className="space-y-4">
        {/* Header */}
        <div>
          <h1 className="text-xl font-bold text-primary">Opportunities</h1>
          <p className="text-sm text-primary-300 mt-0.5">
            Browse jobs matched to your skills
          </p>
        </div>

        {/* Search + Filters */}
        <SmartFilterPanel
          filters={filters}
          onFiltersChange={setFilters}
          resultCount={jobs?.length || 0}
        />

        {/* Sort */}
        <div className="flex justify-end">
          <SortDropdown value={sortBy} onChange={setSortBy} />
        </div>

        {/* Job list */}
        {jobs && jobs.length > 0 ? (
          <div className="grid gap-3">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-sm text-primary-300">No jobs match your filters</p>
            <button
              onClick={() =>
                setFilters({ search: "", price_min: null, price_max: null, location: "" })
              }
              className="text-sm text-accent font-medium hover:underline mt-2"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </WorkerLayout>
  );
}