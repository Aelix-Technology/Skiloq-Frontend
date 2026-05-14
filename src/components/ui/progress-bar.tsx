import { cn } from "@/lib/utils";

export function ProgressBar({
  value,
  tone = "accent",
  className,
}: {
  value: number;
  tone?: "accent" | "success" | "warning" | "danger";
  className?: string;
}) {
  const tones = {
    accent: "from-accent to-accent-300",
    success: "from-success to-emerald-300",
    warning: "from-warning to-amber-300",
    danger: "from-danger to-red-300",
  };

  return (
    <div className={cn("h-2 overflow-hidden rounded-full bg-primary-100/80", className)}>
      <div
        className={cn(
          "h-full rounded-full bg-gradient-to-r transition-[width] duration-700 ease-out",
          tones[tone]
        )}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}
