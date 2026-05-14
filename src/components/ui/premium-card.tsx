"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type PremiumCardProps = React.HTMLAttributes<HTMLDivElement> & {
  interactive?: boolean;
  elevated?: boolean;
};

export function PremiumCard({
  className,
  interactive = false,
  elevated = false,
  children,
  ...props
}: PremiumCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/70 bg-white/80 p-5 shadow-sm backdrop-blur-xl",
        "before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white before:to-transparent",
        elevated && "shadow-lg shadow-primary/10",
        interactive &&
          "transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/10",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function IconTile({
  children,
  tone = "accent",
  className,
}: {
  children: React.ReactNode;
  tone?: "accent" | "success" | "warning" | "danger" | "primary";
  className?: string;
}) {
  const tones = {
    accent: "bg-accent/10 text-accent ring-accent/15",
    success: "bg-success/10 text-success ring-success/15",
    warning: "bg-warning/10 text-warning ring-warning/15",
    danger: "bg-danger/10 text-danger ring-danger/15",
    primary: "bg-primary/10 text-primary ring-primary/15",
  };

  return (
    <span
      className={cn(
        "inline-flex size-11 shrink-0 items-center justify-center rounded-xl ring-1",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
