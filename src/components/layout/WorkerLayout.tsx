"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  LayoutDashboard, Briefcase, Wallet, MessageSquare, CalendarDays,
  Shield, Search, Bell, HelpCircle, ChevronLeft, Menu, LogOut,
} from "lucide-react";
import { useAuthStore } from "@/stores/auth.store";
import { toasts } from "@/lib/toasts";

const sidebarLinks = [
  { label: "Dashboard", href: "/worker/dashboard", icon: LayoutDashboard },
  { label: "Jobs", href: "/worker/opportunities", icon: Briefcase },
  { label: "Wallet", href: "/worker/wallet", icon: Wallet },
  { label: "Messages", href: "/worker/messages", icon: MessageSquare },
  { label: "Bookings", href: "/worker/bookings", icon: CalendarDays },
  { label: "Verification", href: "/worker/verification", icon: Shield },
];

export function WorkerLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/login");
    toasts.loggedOut();
  };

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <div className="min-h-screen bg-[#F8FAFF]">
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-primary/40 backdrop-blur-sm z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full z-50 bg-white border-r border-gray-100 shadow-sm text-gray-800 transition-all duration-300 flex flex-col
          ${collapsed ? "w-[72px]" : "w-64"}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className="flex items-center h-16 px-4 border-b border-gray-100 shrink-0">
          {collapsed ? (
            <div className="w-10 h-10 bg-[#2563EB] rounded-xl flex items-center justify-center mx-auto">
              <span className="text-white font-bold text-sm">S</span>
            </div>
          ) : (
            <div className="flex items-center justify-between w-full">
              <button onClick={() => router.push("/worker/dashboard")} className="flex items-center gap-2.5">
                <div className="w-10 h-10 bg-[#2563EB] rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-xl text-gray-900 leading-tight">Skiloq</span>
                  <span className="font-medium text-xs text-gray-500 leading-tight">Worker</span>
                </div>
              </button>
              <button
                onClick={() => setCollapsed(!collapsed)}
                className="w-8 h-8 hidden lg:flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ChevronLeft className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          )}
        </div>

        <div className="px-3 py-4 border-b border-gray-100">
          <div className={`rounded-xl bg-[#1A1F36] text-white p-3 ${collapsed ? "px-2 py-2" : ""}`}>
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=faces"
                alt="User"
                className="w-9 h-9 rounded-lg object-cover"
              />
              {!collapsed && (
                <div className="flex-1">
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-bold">Trust Score: 98</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] uppercase tracking-wide text-gray-300">Top Rated Pro</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {sidebarLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => { router.push(link.href); setMobileOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-semibold transition-all ${
                isActive(link.href)
                  ? "text-[#2563EB] bg-transparent border-l-4 border-[#2563EB] rounded-none pl-2"
                  : "text-gray-500 hover:text-gray-800 hover:bg-gray-50 border-l-4 border-transparent"
              }`}
            >
              <link.icon className="w-5 h-5 shrink-0" />
              {!collapsed && <span className="truncate">{link.label}</span>}
            </button>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-gray-100 shrink-0">
          <button
            onClick={() => router.push("/worker/opportunities")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
              collapsed ? "justify-center px-2 py-2" : ""
            } bg-[#2563EB] text-white hover:bg-[#1D4ED8] shadow-[0_8px_20px_-6px_rgba(37,99,235,0.5)]`}
          >
            <Search className="w-4 h-4 shrink-0" />
            {!collapsed && <span>Find Jobs</span>}
          </button>
        </div>

        {collapsed && (
          <div className="px-3 py-4 border-t border-gray-100 shrink-0 flex justify-center">
            <button
              onClick={() => setCollapsed(false)}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-gray-500 rotate-180" />
            </button>
          </div>
        )}
      </aside>

      <div
        className="lg:pl-64 transition-all duration-300"
        style={{ paddingLeft: collapsed ? "72px" : undefined }}
      >
        <header className="sticky top-0 z-20 bg-white border-b border-gray-100 h-16 flex items-center px-4 md:px-6 gap-4">
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-50"
          >
            <Menu className="w-5 h-5 text-gray-500" />
          </button>

          <nav className="hidden md:flex items-center gap-8">
            {[
              { label: "Dashboard", href: "/worker/dashboard" },
              { label: "Jobs", href: "/worker/opportunities" },
              { label: "Messages", href: "/worker/messages" },
            ].map((link) => (
              <button
                key={link.href}
                onClick={() => router.push(link.href)}
                className={`relative text-sm font-semibold py-1 transition-colors ${
                  isActive(link.href)
                    ? "text-[#2563EB]"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute -bottom-[17px] left-0 w-full h-0.5 bg-[#2563EB] rounded-full" />
                )}
              </button>
            ))}
          </nav>

          <div className="flex-1" />

          <div className="hidden md:flex items-center w-80">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search for gigs..."
                className="w-full bg-[#F0F5FF] text-gray-700 text-sm rounded-full pl-10 pr-4 py-2.5 border-0 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20"
              />
            </div>
          </div>

          <button className="relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-50 transition-colors">
            <Bell className="w-5 h-5 text-gray-500" />
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white" />
          </button>

          <button className="relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-50 transition-colors">
            <HelpCircle className="w-5 h-5 text-gray-500" />
          </button>

          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=faces"
            alt="User"
            className="w-10 h-10 rounded-full object-cover border-2 border-gray-100 cursor-pointer hover:border-[#2563EB] transition-colors"
          />
        </header>

        <main className="p-4 md:p-6 max-w-[1400px] mx-auto">{children}</main>
      </div>
    </div>
  );
}
