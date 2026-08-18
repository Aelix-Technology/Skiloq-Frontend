"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type PremiumCardProps = React.HTMLAttributes<HTMLDivElement> & {
  interactive?: boolean;
  elevated?: boolean;
  paddingSize?: "sm" | "md" | "lg" | "xl";
  radius?: "sm" | "md" | "lg";
};

export function PremiumCard({
  className,
  interactive = false,
  elevated = false,
  paddingSize = "lg",
  radius = "lg",
  children,
  ...props
}: PremiumCardProps) {
  const paddings = {
    sm: "p-5",
    md: "p-6",
    lg: "p-8",
    xl: "p-10",
  };

  const radii = {
    sm: "rounded-2xl",
    md: "rounded-[20px]",
    lg: "rounded-[24px]",
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden border-0 bg-surface shadow-sm",
        radii[radius],
        paddings[paddingSize],
        "before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/80 before:to-transparent",
        "after:pointer-events-none after:absolute after:inset-0 after:rounded-inherit after:border after:border-border-light after:-z-[1]",
        elevated && "shadow-xl shadow-primary-900/5",
        interactive &&
          "transition-all duration-350 ease-out hover:-translate-y-1.5 hover:shadow-card-hover hover:border-accent-100 cursor-pointer",
        className
      )}
      style={{
        boxShadow: elevated
          ? "0 20px 50px -15px rgba(15, 23, 42, 0.08)"
          : "0 1px 3px rgba(15, 23, 42, 0.04), 0 1px 2px -1px rgba(15, 23, 42, 0.03)",
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export function IconTile({
  children,
  tone = "accent",
  size = "md",
  className,
}: {
  children: React.ReactNode;
  tone?: "accent" | "success" | "warning" | "danger" | "primary" | "warm";
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const tones = {
    accent: "bg-accent-50 text-accent-600 ring-accent-100",
    success: "bg-success-50 text-success-600 ring-success-100",
    warning: "bg-warning-50 text-warning-600 ring-warning-100",
    danger: "bg-danger-50 text-danger-600 ring-danger-100",
    primary: "bg-primary-50 text-primary-700 ring-primary-100",
    warm: "bg-accent-warm-50 text-accent-warm ring-accent-warm-50",
  };

  const sizes = {
    sm: "size-10 rounded-xl",
    md: "size-12 rounded-2xl",
    lg: "size-16 rounded-[20px]",
  };

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center ring-1 transition-all duration-300",
        sizes[size],
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
