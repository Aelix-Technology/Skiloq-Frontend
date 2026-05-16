// src/components/employer/QuickRehire.tsx
"use client";

import { useRouter } from "next/navigation";
import type { Worker } from "@/types/worker";

interface QuickRehireProps {
  workers: Worker[];
}

export function QuickRehire({ workers }: QuickRehireProps) {
  const router = useRouter();

  if (workers.length === 0) return null;

  return (
    <div className="grid gap-2">
      {workers.map((worker) => (
        <button
          key={worker.id}
          onClick={() => router.push(`/employer/find-talent/${worker.id}`)}
          className="bg-white rounded-card border border-primary-100 p-4 text-left hover:border-accent-200 hover:shadow-sm transition-all flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-full bg-accent-100 flex items-center justify-center shrink-0">
            <span className="text-sm font-bold text-accent">
              {worker.full_name.split(" ").map((n) => n[0]).join("")}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-primary">{worker.full_name}</h3>
            <p className="text-xs text-primary-300">
              {worker.completed_jobs} jobs completed • GHS {worker.hourly_rate_ghs}/hr
            </p>
          </div>
          <span className="text-xs text-accent font-medium">Re-hire →</span>
        </button>
      ))}
    </div>
  );
}
