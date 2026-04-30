// src/components/dashboard/DashboardSkeleton.tsx
export function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Verification checklist skeleton */}
      <div className="bg-white rounded-card border border-primary-100 p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="h-4 bg-primary-100 rounded w-40" />
          <div className="h-4 bg-primary-100 rounded w-10" />
        </div>
        <div className="h-2 bg-primary-100 rounded-pill w-full" />
        <div className="mt-3 space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-6 h-6 bg-primary-100 rounded-full" />
              <div className="h-3 bg-primary-100 rounded w-32" />
            </div>
          ))}
        </div>
      </div>

      {/* Trust score skeleton */}
      <div className="bg-white rounded-card border border-primary-100 p-4 flex flex-col items-center gap-3">
        <div className="w-[120px] h-[120px] bg-primary-100 rounded-full" />
        <div className="h-4 bg-primary-100 rounded w-20" />
      </div>

      {/* Opportunities skeleton */}
      <div className="space-y-2">
        <div className="h-5 bg-primary-100 rounded w-40" />
        {[1, 2].map((i) => (
          <div key={i} className="bg-white rounded-card border border-primary-100 p-4">
            <div className="h-4 bg-primary-100 rounded w-3/4 mb-2" />
            <div className="h-3 bg-primary-100 rounded w-1/2 mb-3" />
            <div className="flex gap-2">
              <div className="h-5 bg-primary-100 rounded-pill w-20" />
              <div className="h-5 bg-primary-100 rounded-pill w-16" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}