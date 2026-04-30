// src/components/layout/WorkerLayout.tsx
"use client";

import { Bell } from "lucide-react";
import { BottomTabBar } from "./BottomTabBar";
import { useRouter } from "next/navigation";

export function WorkerLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-primary-50">
      {/* Top Navigation Bar */}
     
<header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-primary-50">
  <div className="flex items-center justify-between h-14 px-4 max-w-2xl mx-auto">
    <div className="flex items-center gap-2.5">
      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-sm">
        <span className="text-white text-sm font-bold tracking-tight">S</span>
      </div>
      <span className="font-semibold text-primary text-md tracking-tight">Skiloq</span>
    </div>
    <button className="relative w-10 h-10 flex items-center justify-center rounded-input hover:bg-primary-50 transition-colors">
      <Bell className="w-5 h-5 text-primary-300" />
      <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-danger rounded-full ring-2 ring-white" />
    </button>
  </div>
</header>
      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-6 pb-24">
        {children}
      </main>

      {/* Bottom Navigation */}
      <BottomTabBar />
    </div>
  );
}