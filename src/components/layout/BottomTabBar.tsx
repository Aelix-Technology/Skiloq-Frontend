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
    <nav className="fixed bottom-0 left-0 right-0 glass-bottom-tab shadow-[0_-4px_20px_-8px_rgba(26,31,54,0.12)] safe-area-bottom z-50">
      <div className="flex items-center justify-around gap-0 sm:gap-1 h-16 max-w-2xl mx-auto px-1 sm:px-2">
        {tabs.map((tab) => {
          const isActive = pathname.startsWith(tab.href);
          return (
            <button
              key={tab.id}
              onClick={() => router.push(tab.href)}
              className={`flex flex-col items-center justify-center py-1 px-1.5 sm:px-2 min-w-0 flex-1 h-full transition-all duration-200 ${isActive
                  ? "text-accent bg-accent/10 rounded-xl ring-1 ring-accent-100/50 shadow-sm scale-[1.03]"
                  : "text-primary-300 hover:text-primary transition-colors"
                }`}
            >
              <tab.icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
              <span className={`text-[10px] sm:text-xs mt-0.5 ${isActive ? "font-semibold" : "font-medium"}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
