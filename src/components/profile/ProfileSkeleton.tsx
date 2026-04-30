// src/components/profile/ProfileSkeleton.tsx
export function ProfileSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header skeleton */}
      <div className="bg-white rounded-card border border-primary-100 overflow-hidden">
        {/* Cover */}
        <div className="h-20 bg-gradient-to-r from-primary-100 to-primary-50" />

        <div className="px-4 pb-4">
          {/* Avatar + Trust Score */}
          <div className="flex items-end gap-4 -mt-8 mb-3">
            <div className="w-16 h-16 rounded-full bg-primary-100 border-4 border-white" />
            <div className="w-20 h-20 rounded-full bg-primary-100 ml-auto" />
          </div>

          {/* Name */}
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="h-6 bg-primary-100 rounded w-40" />
              <div className="h-4 bg-primary-100 rounded w-56" />
            </div>
            <div className="w-9 h-9 rounded-input bg-primary-100" />
          </div>

          {/* Badges */}
          <div className="flex gap-2 mt-3">
            <div className="h-6 bg-primary-100 rounded-pill w-24" />
            <div className="h-6 bg-primary-100 rounded-pill w-20" />
            <div className="h-6 bg-primary-100 rounded-pill w-16" />
          </div>
        </div>
      </div>

      {/* Bio skeleton */}
      <div className="space-y-2">
        <div className="h-5 bg-primary-100 rounded w-16" />
        <div className="h-4 bg-primary-100 rounded w-full" />
        <div className="h-4 bg-primary-100 rounded w-3/4" />
        <div className="h-4 bg-primary-100 rounded w-1/2" />
      </div>

      {/* Skills skeleton */}
      <div className="space-y-2">
        <div className="h-5 bg-primary-100 rounded w-16" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center justify-between bg-white rounded-card border border-primary-100 p-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary-100" />
              <div className="space-y-1">
                <div className="h-4 bg-primary-100 rounded w-32" />
                <div className="h-3 bg-primary-100 rounded w-24" />
              </div>
            </div>
            <div className="h-5 bg-primary-100 rounded w-12" />
          </div>
        ))}
      </div>

      {/* Portfolio skeleton */}
      <div className="space-y-2">
        <div className="h-5 bg-primary-100 rounded w-20" />
        <div className="grid grid-cols-2 gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="aspect-[4/3] bg-primary-100 rounded-card" />
          ))}
        </div>
      </div>

      {/* Reviews skeleton */}
      <div className="space-y-2">
        <div className="h-5 bg-primary-100 rounded w-20" />
        {[1, 2].map((i) => (
          <div key={i} className="bg-white rounded-card border border-primary-100 p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="space-y-1">
                <div className="h-4 bg-primary-100 rounded w-28" />
                <div className="h-3 bg-primary-100 rounded w-20" />
              </div>
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <div key={s} className="w-3.5 h-3.5 bg-primary-100 rounded" />
                ))}
              </div>
            </div>
            <div className="h-4 bg-primary-100 rounded w-full" />
            <div className="h-4 bg-primary-100 rounded w-2/3 mt-1" />
          </div>
        ))}
      </div>
    </div>
  );
}