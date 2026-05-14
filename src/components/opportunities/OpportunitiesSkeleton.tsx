import { PremiumCard } from "@/components/ui/premium-card";
import { SkeletonBlock } from "@/components/ui/skeleton";

export function OpportunitiesSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <SkeletonBlock className="h-12 flex-1 rounded-xl bg-white" />
        <SkeletonBlock className="h-12 w-28 rounded-xl bg-white" />
      </div>

      <SkeletonBlock className="h-4 w-24" />

      {[1, 2, 3, 4].map((i) => (
        <PremiumCard key={i} className="space-y-3">
          <div className="flex justify-between gap-3">
            <div className="flex-1 space-y-2">
              <SkeletonBlock className="h-4 w-3/4" />
              <SkeletonBlock className="h-3 w-1/3" />
            </div>
            <SkeletonBlock className="h-9 w-24 rounded-xl" />
          </div>
          <div className="flex flex-wrap gap-3">
            <SkeletonBlock className="h-3 w-16" />
            <SkeletonBlock className="h-3 w-20" />
            <SkeletonBlock className="h-3 w-14" />
          </div>
          <div className="flex gap-1.5">
            <SkeletonBlock className="h-6 w-20 rounded-full" />
            <SkeletonBlock className="h-6 w-16 rounded-full" />
            <SkeletonBlock className="h-6 w-18 rounded-full" />
          </div>
        </PremiumCard>
      ))}
    </div>
  );
}
