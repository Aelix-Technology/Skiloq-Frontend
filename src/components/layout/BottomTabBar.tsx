// src/components/layout/BottomTabBar.tsx
"use client";

import { usePathname, useRouter } from "next/navigation";
import { Home, Briefcase, MessageCircle, Wallet, User, Calendar } from "lucide-react";

const tabs = [
  {
    id: "home",
    label: "Home",
    icon: Home,
    href: "/worker/dashboard",
  },
  {
    id: "opportunities",
    label: "Jobs",
    icon: Briefcase,
    href: "/worker/opportunities",
  },
  {
    id: "bookings",
    label: "Bookings",
    icon: Calendar,
    href: "/worker/bookings",
  },
  {
    id: "messages",
    label: "Messages",
    icon: MessageCircle,
    href: "/worker/messages",
  },
  {
    id: "wallet",
    label: "Wallet",
    icon: Wallet,
    href: "/worker/wallet",
  },
  {
    id: "profile",
    label: "Profile",
    icon: User,
    href: "/worker/profile",
  },
];

export function BottomTabBar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-primary-100 safe-area-bottom z-50 backdrop-blur-md bg-white/95">
      <div className="flex items-center justify-around h-16 max-w-2xl mx-auto">
        {tabs.map((tab) => {
          const isActive = pathname.startsWith(tab.href);
          return (
            <button
              key={tab.id}
              onClick={() => router.push(tab.href)}
              className={`flex flex-col items-center justify-center gap-1 min-w-[64px] h-full transition-all duration-200 ${isActive
                  ? "text-accent scale-105"
                  : "text-primary-300 hover:text-primary-400"
                }`}
            >
              <div className={`p-1 rounded-pill transition-colors ${isActive ? "bg-accent/10" : ""}`}>
                <tab.icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className={`text-xs ${isActive ? "font-semibold" : "font-medium"}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
