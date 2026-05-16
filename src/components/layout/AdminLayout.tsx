// src/components/layout/AdminLayout.tsx
"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  LayoutDashboard, Shield, AlertTriangle, Users,
  ChevronLeft, Menu, Bell, LogOut
} from "lucide-react";
import { useAuthStore } from "@/stores/auth.store";
import { toasts } from "@/lib/toasts";

const sidebarLinks = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Verification Queue", href: "/admin/verification-queue", icon: Shield },
  { label: "Disputes", href: "/admin/disputes", icon: AlertTriangle },
  { label: "Fraud Alerts", href: "/admin/fraud-alerts", icon: AlertTriangle },
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
    <div className="min-h-screen bg-gray-50">
      {/* ── Mobile overlay ── */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <aside
        className={`fixed top-0 left-0 h-full z-50 bg-primary text-white transition-all duration-300 flex flex-col
          ${collapsed ? "w-[72px]" : "w-64"}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex items-center h-16 px-4 border-b border-white/10 shrink-0">
          {collapsed ? (
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center mx-auto">
              <span className="text-primary font-bold text-sm">S</span>
            </div>
          ) : (
            <div className="flex items-center justify-between w-full">
              <button onClick={() => router.push("/admin/dashboard")} className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-primary font-bold text-sm">S</span>
                </div>
                <span className="font-bold text-white text-sm">Skiloq Admin</span>
              </button>
              <button
                onClick={() => setCollapsed(!collapsed)}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Links */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {sidebarLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => { router.push(link.href); setMobileOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive(link.href)
                  ? "bg-white/10 text-white"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              <link.icon className="w-5 h-5 shrink-0" />
              {!collapsed && <span className="truncate">{link.label}</span>}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-white/10 shrink-0">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/60 hover:text-red-400 hover:bg-white/5 transition-all"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {!collapsed && <span>Sign Out</span>}
          </button>
        </div>

        {/* Expand button when collapsed */}
        {collapsed && (
          <div className="px-3 py-4 border-t border-white/10 shrink-0 flex justify-center">
            <button
              onClick={() => setCollapsed(false)}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors"
            >
              <ChevronLeft className="w-4 h-4 rotate-180" />
            </button>
          </div>
        )}
      </aside>

      {/* ── Main Content ── */}
      <div
        className="lg:pl-64 transition-all duration-300"
        style={{ paddingLeft: collapsed ? "72px" : undefined }}
      >
        {/* Top bar */}
        <header className="sticky top-0 z-20 bg-white border-b border-gray-100 h-16 flex items-center px-4 gap-4">
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-50"
          >
            <Menu className="w-5 h-5 text-gray-700" />
          </button>
          <div className="flex-1" />
          <button className="relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-50">
            <Bell className="w-5 h-5 text-gray-400" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
          </button>
        </header>

        <main className="p-4 md:p-6 max-w-7xl">{children}</main>
      </div>
    </div>
  );
}
