import * as React from "react";
import { cn } from "@/lib/utils";

type StatusTone = "success" | "pending" | "progress" | "danger" | "neutral";

const toneClasses: Record<StatusTone, string> = {
  success: "border-success/20 bg-success/10 text-success",
  pending: "border-warning/20 bg-warning/10 text-warning",
  progress: "border-accent/20 bg-accent/10 text-accent",
  danger: "border-danger/20 bg-danger/10 text-danger",
  neutral: "border-primary-100 bg-primary-50 text-primary-300",
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
        "inline-flex min-h-6 items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold",
        toneClasses[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
