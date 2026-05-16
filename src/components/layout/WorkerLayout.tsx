// src/components/layout/WorkerLayout.tsx
"use client";

import { WorkerNavbar } from "./WorkerNavbar";
import { BottomTabBar } from "./BottomTabBar";

export function WorkerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-primary-50">
      <WorkerNavbar />
      <main className="max-w-2xl mx-auto px-4 py-6 pb-24">
        {children}
      </main>
      <BottomTabBar />
    </div>
  );
}
