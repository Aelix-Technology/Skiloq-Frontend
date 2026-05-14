import { PremiumCard } from "@/components/ui/premium-card";
import { SkeletonBlock } from "@/components/ui/skeleton";

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <PremiumCard className="space-y-4">
        <div className="flex items-center justify-between">
          <SkeletonBlock className="h-4 w-40" />
          <SkeletonBlock className="h-4 w-10" />
        </div>
        <SkeletonBlock className="h-2 w-full rounded-full" />
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <SkeletonBlock className="h-9 w-9 rounded-xl" />
              <SkeletonBlock className="h-3 w-36" />
            </div>
          ))}
        </div>
      </PremiumCard>

      <div className="grid gap-5 sm:grid-cols-2">
        <PremiumCard className="flex flex-col items-center gap-3">
          <SkeletonBlock className="h-11 w-11 rounded-xl" />
          <SkeletonBlock className="h-[120px] w-[120px] rounded-full" />
          <SkeletonBlock className="h-4 w-24" />
        </PremiumCard>
        <PremiumCard className="space-y-4">
          <SkeletonBlock className="h-11 w-11 rounded-xl" />
          <div className="flex h-24 items-end gap-3">
            <SkeletonBlock className="h-16 flex-1 rounded-t-xl" />
            <SkeletonBlock className="h-20 flex-1 rounded-t-xl" />
            <SkeletonBlock className="h-24 flex-1 rounded-t-xl" />
          </div>
          <SkeletonBlock className="h-14 w-full rounded-xl" />
        </PremiumCard>
      </div>

      <div className="space-y-3">
        <SkeletonBlock className="h-5 w-40" />
        {[1, 2].map((i) => (
          <PremiumCard key={i} className="space-y-3">
            <SkeletonBlock className="h-4 w-3/4" />
            <SkeletonBlock className="h-3 w-1/2" />
            <div className="flex gap-2">
              <SkeletonBlock className="h-6 w-20 rounded-full" />
              <SkeletonBlock className="h-6 w-16 rounded-full" />
            </div>
          </PremiumCard>
        ))}
      </div>
    </div>
  );
}
