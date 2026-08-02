// src/components/layout/EmployerNavbar.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Bell, Menu, X, LogOut, Settings, User, Plus } from "lucide-react";
import { useAuthStore } from "@/stores/auth.store";
import { toasts } from "@/lib/toasts";

const navLinks = [
  { label: "Dashboard", href: "/employer/dashboard" },
  { label: "Find Talent", href: "/employer/find-talent" },
  { label: "Academy", href: "/academy" },
  { label: "Messages", href: "/employer/messages" },
  { label: "Payments", href: "/employer/payments" },
];

export function EmployerNavbar() {
  const router = useRouter();
  const pathname = usePathname();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMobileMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const id = setTimeout(() => setMobileMenuOpen(false), 0);
    return () => clearTimeout(id);
  }, [pathname]);

  const handleLogout = () => {
    logout();
    router.push("/login");
    toasts.loggedOut();
  };

  const isActive = (href: string) => {
    if (href === "/employer/dashboard") return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/82 backdrop-blur-xl border-b border-primary-50/60 shadow-[0_1px_0_rgba(26,31,54,0.04)]">
      <div className="flex items-center justify-between h-16 sm:px-6 px-4 max-w-7xl mx-auto">
        {/* ── Left: Logo ── */}
        <div className="flex items-center gap-10">
          <button
            onClick={() => router.push("/employer/dashboard")}
            className="flex items-center gap-2.5"
          >
            <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-sm tracking-tight">S</span>
            </div>
            <span className="font-bold text-lg text-primary tracking-tight">Skiloq</span>
          </button>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => router.push(link.href)}
                className={`relative px-4 pb-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive(link.href)
                    ? "text-accent bg-accent/5"
                    : "text-primary-400 hover:text-primary hover:bg-primary-50/60"
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent rounded-full" />
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* ── Right: Actions ── */}
        <div className="flex items-center gap-3">
          {/* Post a Job — prominent CTA */}
          <button
            onClick={() => router.push("/employer/post-job")}
            className="hidden sm:flex items-center gap-1.5 bg-gradient-to-br from-accent to-accent-600 text-white text-sm font-semibold px-4 py-2 rounded-xl shadow-[0_6px_24px_-6px_rgba(79,106,245,0.55)] hover:shadow-[0_10px_32px_-8px_rgba(79,106,245,0.65)] hover:-translate-y-0.5 transition-all duration-200 active:scale-95"
          >
            <Plus className="w-4 h-4" />
            Post a Job
          </button>

          {/* Notification */}
          <button className="relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-primary-50/60 transition-colors">
            <Bell className="w-5 h-5 text-primary-300" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-danger rounded-full ring-2 ring-white" />
          </button>

          {/* Profile */}
          <div ref={profileRef} className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-primary-50/60 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-accent-700 flex items-center justify-center text-white text-xs font-bold ring-2 ring-white shadow-sm">
                {user?.phone?.slice(-2) || "E"}
              </div>
            </button>

            {profileOpen && (
              <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl border border-primary-50/60 shadow-xl shadow-primary-200/50 overflow-hidden z-50">
                {/* User info */}
                <div className="px-4 py-3.5 border-b border-primary-50/60">
                  <p className="text-sm font-semibold text-primary">Employer Account</p>
                  <p className="text-xs text-primary-300 mt-0.5">{user?.phone || "+233 XX XXX XXXX"}</p>
                </div>

                {/* Links */}
                <div className="py-1">
                  <button
                    onClick={() => { router.push("/employer/dashboard"); setProfileOpen(false); }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-primary-500 hover:bg-primary-50/60 transition-colors"
                  >
                    <User className="w-4 h-4 text-primary-300" />
                    Dashboard
                  </button>
                  <button
                    onClick={() => { router.push("/employer/payments"); setProfileOpen(false); }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-primary-500 hover:bg-primary-50/60 transition-colors"
                  >
                    <Settings className="w-4 h-4 text-primary-300" />
                    Billing & Settings
                  </button>
                </div>

                {/* Logout */}
                <div className="border-t border-primary-50/60 py-1">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-danger hover:bg-danger-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-primary-50/60 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-primary-500" /> : <Menu className="w-5 h-5 text-primary-500" />}
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      {mobileMenuOpen && (
        <div ref={menuRef} className="md:hidden border-t border-primary-50/60 bg-white px-4 py-3 space-y-1 animate-in slide-in-from-top-2 duration-200">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => router.push(link.href)}
              className={`w-full text-left px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                isActive(link.href)
                  ? "text-accent bg-accent/5"
                  : "text-primary-500 hover:text-primary hover:bg-primary-50/60"
              }`}
            >
              {link.label}
            </button>
          ))}

          <button
            onClick={() => { router.push("/employer/post-job"); setMobileMenuOpen(false); }}
            className="w-full text-center mt-2 bg-accent text-white text-sm font-semibold py-3 rounded-lg hover:bg-accent-600 transition-colors"
          >
            Post a Job
          </button>

          <div className="border-t border-primary-50/60 pt-2 mt-2">
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-3 text-sm font-medium text-danger hover:bg-danger-50 rounded-lg transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
