import { PremiumCard } from "@/components/ui/premium-card";
import { SkeletonBlock } from "@/components/ui/skeleton";

export function ProfileSkeleton() {
  return (
    <div className="space-y-6">
      <PremiumCard className="overflow-hidden p-0">
        <SkeletonBlock className="h-24 w-full rounded-none" />
        <div className="px-4 pb-5">
          <div className="-mt-8 mb-3 flex items-end gap-4">
            <SkeletonBlock className="h-16 w-16 rounded-2xl border-4 border-white" />
            <SkeletonBlock className="ml-auto h-20 w-20 rounded-full" />
          </div>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <SkeletonBlock className="h-6 w-40" />
              <SkeletonBlock className="h-4 w-56" />
            </div>
            <SkeletonBlock className="h-11 w-11 rounded-xl" />
          </div>
          <div className="mt-3 flex gap-2">
            <SkeletonBlock className="h-6 w-24 rounded-full" />
            <SkeletonBlock className="h-6 w-20 rounded-full" />
            <SkeletonBlock className="h-6 w-16 rounded-full" />
          </div>
        </div>
      </PremiumCard>

      <PremiumCard className="space-y-2">
        <SkeletonBlock className="h-5 w-16" />
        <SkeletonBlock className="h-4 w-full" />
        <SkeletonBlock className="h-4 w-3/4" />
      </PremiumCard>

      <div className="space-y-3">
        <SkeletonBlock className="h-5 w-16" />
        {[1, 2, 3].map((i) => (
          <PremiumCard key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <SkeletonBlock className="h-11 w-11 rounded-xl" />
              <div className="space-y-2">
                <SkeletonBlock className="h-4 w-32" />
                <SkeletonBlock className="h-3 w-24" />
              </div>
            </div>
            <SkeletonBlock className="h-6 w-12 rounded-full" />
          </PremiumCard>
        ))}
      </div>

      <div className="space-y-3">
        <SkeletonBlock className="h-5 w-20" />
        <div className="grid grid-cols-2 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <SkeletonBlock key={i} className="aspect-[4/3] rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
