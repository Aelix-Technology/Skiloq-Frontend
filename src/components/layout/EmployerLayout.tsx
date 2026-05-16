// src/components/layout/EmployerLayout.tsx
"use client";

import { EmployerNavbar } from "./EmployerNavbar";

export function EmployerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-primary-50">
      <EmployerNavbar />
      <main className="max-w-6xl mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
}
