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
import { Briefcase } from "lucide-react";
import { IconTile, PremiumCard } from "@/components/ui/premium-card";
import { MotionDiv, listContainer, listItem } from "@/components/ui/motion-list";

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
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-xl font-bold tracking-tight text-primary">Opportunities</h1>
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
          <MotionDiv variants={listContainer} initial="hidden" animate="show" className="grid gap-3">
            {jobs.map((job) => (
              <MotionDiv key={job.id} variants={listItem}>
                <JobCard job={job} />
              </MotionDiv>
            ))}
          </MotionDiv>
        ) : (
          <PremiumCard className="py-12 text-center">
            <IconTile tone="accent" className="mx-auto mb-3">
              <Briefcase className="h-5 w-5" />
            </IconTile>
            <p className="text-sm font-semibold text-primary">No jobs match your filters</p>
            <p className="mt-1 text-xs text-primary-300">Try widening the budget, location, or keyword search.</p>
            <button
              onClick={() =>
                setFilters({ search: "", price_min: null, price_max: null, location: "" })
              }
              className="mt-4 min-h-11 rounded-xl px-4 text-sm font-semibold text-accent transition-all hover:-translate-y-1 hover:bg-accent-50 hover:shadow-lg active:scale-95"
            >
              Clear filters
            </button>
          </PremiumCard>
        )}
      </div>
    </WorkerLayout>
  );
}
