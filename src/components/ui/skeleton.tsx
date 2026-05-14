import { cn } from "@/lib/utils";

export function SkeletonBlock({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-xl bg-gradient-to-r from-primary-50 via-white to-primary-50 bg-[length:200%_100%]",
        className
      )}
    />
  );
}
