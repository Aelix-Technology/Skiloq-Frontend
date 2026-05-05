// src/components/employer/WorkerGrid.tsx
"use client";

import { WorkerCard } from "./WorkerCard";
import type { Worker } from "@/types/worker";

interface WorkerGridProps {
  workers: Worker[];
}

export function WorkerGrid({ workers }: WorkerGridProps) {
  if (workers.length === 0) return null;

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {workers.map((worker) => (
        <WorkerCard key={worker.id} worker={worker} />
      ))}
    </div>
  );
}