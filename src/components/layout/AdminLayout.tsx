"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  LayoutDashboard, Shield, AlertTriangle, Users,
  ChevronLeft, Menu, Bell, LogOut, Search, ListFilter, LayoutList,
} from "lucide-react";
import { useAuthStore } from "@/stores/auth.store";
import { toasts } from "@/lib/toasts";

const sidebarLinks = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Verification Queue", href: "/admin/verification-queue", icon: Shield },
  { label: "Disputes", href: "/admin/disputes", icon: AlertTriangle },
  { label: "Fraud Watch", href: "/admin/fraud-alerts", icon: AlertTriangle },
  { label: "Users", href: "/admin/users", icon: Users },
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
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
        className={`fixed top-0 left-0 h-full z-50 bg-[#1A1F36] text-white transition-all duration-300 flex flex-col
          ${collapsed ? "w-[72px]" : "w-64"}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className="flex items-center h-16 px-4 border-b border-white/10 shrink-0">
          {collapsed ? (
            <div className="w-10 h-10 bg-[#2563EB] rounded-xl flex items-center justify-center mx-auto ring-2 ring-[#2563EB]/40">
              <Shield className="w-5 h-5 text-white" />
            </div>
          ) : (
            <div className="flex items-center justify-between w-full">
              <button onClick={() => router.push("/admin/dashboard")} className="flex items-center gap-2.5">
                <div className="w-10 h-10 bg-[#2563EB] rounded-xl flex items-center justify-center ring-2 ring-[#2563EB]/40">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="font-extrabold text-2xl text-white tracking-tight">Skiloq</span>
              </button>
              <button
                onClick={() => setCollapsed(!collapsed)}
                className="w-8 h-8 hidden lg:flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors"
              >
                <ChevronLeft className="w-4 h-4 text-white/60" />
              </button>
            </div>
          )}
        </div>

        <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
          {sidebarLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => { router.push(link.href); setMobileOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-3.5 rounded-lg text-sm font-semibold transition-all ${
                isActive(link.href)
                  ? "bg-white/10 text-white ring-1 ring-white/15"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              <link.icon className="w-5 h-5 shrink-0" />
              {!collapsed && <span className="truncate">{link.label}</span>}
            </button>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-white/10 shrink-0">
          <div className="flex items-center gap-3 px-3 py-3">
            <img
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=160&h=160&fit=crop&crop=faces"
              alt="Admin"
              className="w-10 h-10 rounded-xl object-cover shrink-0 border-2 border-white/20"
            />
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white truncate">Admin One</p>
                <p className="text-xs text-white/50 truncate">Super Admin</p>
              </div>
            )}
          </div>
        </div>

        {collapsed && (
          <div className="px-3 py-4 border-t border-white/10 shrink-0 flex justify-center">
            <button
              onClick={() => setCollapsed(false)}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-white/60 rotate-180" />
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

          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Verification Queue</h1>

          <div className="flex-1 flex justify-center px-4">
            <div className="w-full max-w-md relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search workers..."
                className="w-full bg-[#F0F5FF] text-gray-700 text-sm rounded-2xl pl-11 pr-4 py-2.5 border-2 border-[#DBEAFE] focus:outline-none focus:border-[#2563EB]/50 focus:bg-white transition-all"
              />
            </div>
          </div>

          <button className="relative w-11 h-11 flex items-center justify-center rounded-xl hover:bg-gray-50 transition-colors">
            <Bell className="w-5 h-5 text-gray-500" />
            <span className="absolute top-2.5 right-2.5 w-3 h-3 bg-red-500 rounded-full ring-2 ring-white" />
          </button>

          <div className="h-8 w-px bg-gray-200 mx-1 hidden md:block" />

          <button className="hidden md:flex items-center gap-2 bg-white border-2 border-gray-200 rounded-2xl px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
            Queue Live
          </button>
        </header>

        <main className="p-4 md:p-6 max-w-[1600px] mx-auto">{children}</main>
      </div>
    </div>
  );
}
