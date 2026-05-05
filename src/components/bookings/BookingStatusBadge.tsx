// src/components/bookings/BookingStatusBadge.tsx
"use client";

import { Clock, CheckCircle, AlertCircle, Circle } from "lucide-react";

type Status = "pending" | "confirmed" | "in_progress" | "completed" | "cancelled" | "disputed";

const config: Record<Status, { label: string; icon: typeof Clock; color: string }> = {
  pending: { label: "Pending", icon: Clock, color: "text-warning bg-warning/10 border-warning/20" },
  confirmed: { label: "Confirmed", icon: CheckCircle, color: "text-accent bg-accent/10 border-accent/20" },
  in_progress: { label: "In Progress", icon: AlertCircle, color: "text-success bg-success/10 border-success/20" },
  completed: { label: "Completed", icon: CheckCircle, color: "text-primary-300 bg-primary-50 border-primary-100" },
  cancelled: { label: "Cancelled", icon: Circle, color: "text-danger bg-danger/10 border-danger/20" },
  disputed: { label: "Disputed", icon: AlertCircle, color: "text-danger bg-danger/10 border-danger/20" },
};

export function BookingStatusBadge({ status }: { status: Status }) {
  const { label, icon: Icon, color } = config[status];

  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-pill text-xs font-semibold border ${color}`}>
      <Icon className="w-3 h-3" />
      {label}
    </span>
  );
}