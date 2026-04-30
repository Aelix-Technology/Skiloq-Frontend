// src/components/opportunities/OpportunitiesSkeleton.tsx
export function OpportunitiesSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      {/* Search bar skeleton */}
      <div className="flex gap-2">
        <div className="flex-1 h-12 bg-white rounded-input border border-primary-100" />
        <div className="w-24 h-12 bg-white rounded-input border border-primary-100" />
      </div>

      {/* Result count */}
      <div className="h-4 bg-primary-100 rounded w-24" />

      {/* Job cards */}
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="bg-white rounded-card border border-primary-100 p-4"
        >
          <div className="flex justify-between mb-3">
            <div className="space-y-2 flex-1">
              <div className="h-4 bg-primary-100 rounded w-3/4" />
              <div className="h-3 bg-primary-100 rounded w-1/3" />
            </div>
            <div className="h-5 bg-primary-100 rounded w-20" />
          </div>
          <div className="flex gap-3 mb-3">
            <div className="h-3 bg-primary-100 rounded w-16" />
            <div className="h-3 bg-primary-100 rounded w-20" />
            <div className="h-3 bg-primary-100 rounded w-14" />
          </div>
          <div className="flex gap-1.5">
            <div className="h-5 bg-primary-100 rounded-pill w-20" />
            <div className="h-5 bg-primary-100 rounded-pill w-16" />
            <div className="h-5 bg-primary-100 rounded-pill w-18" />
          </div>
        </div>
      ))}
    </div>
  );
}