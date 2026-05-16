// src/components/layout/AgentLayout.tsx
"use client";

import { useRouter } from "next/navigation";
import { Bell, LogOut, MapPin } from "lucide-react";
import { useAuthStore } from "@/stores/auth.store";
import { toasts } from "@/lib/toasts";

export function AgentLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const logout = useAuthStore((s) => s.logout);

  const handleLogout = () => {
    logout();
    router.push("/login");
    toasts.loggedOut();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <header className="sticky top-0 z-30 bg-primary text-white">
        <div className="flex items-center justify-between h-14 px-4 max-w-4xl mx-auto">
          <button onClick={() => router.push("/agent/dashboard")} className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <span className="text-primary font-bold text-sm">S</span>
            </div>
            <span className="font-bold text-sm">Skiloq Agent</span>
          </button>

          <div className="flex items-center gap-2">
            <button className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <button
              onClick={handleLogout}
              className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4">{children}</main>
    </div>
  );
}
