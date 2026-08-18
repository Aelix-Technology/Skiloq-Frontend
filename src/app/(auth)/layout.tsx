// src/app/(auth)/layout.tsx
"use client";

import { usePathname } from "next/navigation";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isOnboarding = pathname?.includes("/onboarding");

  if (isOnboarding) {
    return (
      <div className="min-h-screen bg-[#2563EB] relative overflow-hidden flex flex-col">
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute top-1/3 -right-40 w-[28rem] h-[28rem] rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] rounded-full bg-[#1D4ED8]/40 blur-3xl" />
        </div>

        <div className="relative z-10 flex flex-col min-h-screen">
          <main className="flex-1 flex items-center justify-center w-full px-3 sm:px-4 py-8">
            <div className="w-full max-w-[520px]">{children}</div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#F8FAFF] to-[#F0F5FF] flex flex-col">
      <header className="h-16 flex items-center px-5 border-b border-white/60 bg-white/70 backdrop-blur-xl">
        <div className="flex items-center gap-2.5 w-full max-w-6xl mx-auto">
          <div className="w-9 h-9 bg-[#1A1F36] rounded-lg flex items-center justify-center shadow-md">
            <span className="text-white text-sm font-bold">S</span>
          </div>
          <span className="font-extrabold text-xl text-[#1A1F36] tracking-tight">Skiloq</span>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-3 sm:px-4 py-6 lg:py-4 relative">
        <div aria-hidden className="pointer-events-none absolute top-12 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-[#2563EB]/10 blur-3xl lg:hidden" />
        <div className="w-full max-w-md relative z-10">
          {children}
        </div>
      </main>

      <footer className="py-4 text-center text-xs text-gray-400">
        Skiloq Technology Inc. — Ghana • Nigeria • Kenya
      </footer>
    </div>
  );
}
