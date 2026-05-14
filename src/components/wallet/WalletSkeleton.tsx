import { PremiumCard } from "@/components/ui/premium-card";
import { SkeletonBlock } from "@/components/ui/skeleton";

export function WalletSkeleton() {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-primary p-6 space-y-5">
        <SkeletonBlock className="h-9 w-32 bg-primary-600" />
        <SkeletonBlock className="h-8 w-44 bg-primary-600" />
        <div className="grid grid-cols-2 gap-3">
          <SkeletonBlock className="h-20 rounded-2xl bg-primary-600" />
          <SkeletonBlock className="h-20 rounded-2xl bg-primary-600" />
        </div>
      </div>

      <SkeletonBlock className="h-12 w-full rounded-xl bg-white" />

      <div className="space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <PremiumCard key={i} className="flex items-center gap-3">
            <SkeletonBlock className="h-11 w-11 rounded-xl" />
            <div className="flex-1 space-y-2">
              <SkeletonBlock className="h-4 w-48" />
              <SkeletonBlock className="h-3 w-20" />
            </div>
            <SkeletonBlock className="h-5 w-16" />
          </PremiumCard>
        ))}
      </div>
    </div>
  );
}
