import * as React from "react";
import { cn } from "@/lib/utils";

type StatusTone = "success" | "pending" | "progress" | "danger" | "neutral";

const toneClasses: Record<StatusTone, string> = {
  success:
    "border-success-100 bg-success-50 text-success-700",
  pending:
    "border-warning-100 bg-warning-50 text-warning-700",
  progress:
    "border-accent-100 bg-accent-50 text-accent-700",
  danger:
    "border-danger-100 bg-danger-50 text-danger-700",
  neutral:
    "border-primary-100 bg-primary-50 text-primary-600",
};

export function StatusBadge({
  tone = "neutral",
  className,
  children,
}: {
  tone?: StatusTone;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold shadow-xs tracking-wide",
        toneClasses[tone],
        className
      )}
    >
      <span className="relative flex size-1.5">
        <span className={cn(
          "animate-ping absolute inline-flex h-full w-full rounded-full opacity-40",
          tone === "success" && "bg-success-400",
          tone === "pending" && "bg-warning-400",
          tone === "progress" && "bg-accent-400",
          tone === "danger" && "bg-danger-400",
          tone === "neutral" && "bg-primary-400",
        )}></span>
        <span className={cn(
          "relative inline-flex rounded-full size-1.5",
          tone === "success" && "bg-success-500",
          tone === "pending" && "bg-warning-500",
          tone === "progress" && "bg-accent-500",
          tone === "danger" && "bg-danger-500",
          tone === "neutral" && "bg-primary-500",
        )}></span>
      </span>
      {children}
    </span>
  );
}
