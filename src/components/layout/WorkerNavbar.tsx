// src/components/layout/WorkerNavbar.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Bell, Menu, X, LogOut, User, Shield } from "lucide-react";
import { useAuthStore } from "@/stores/auth.store";
import { toasts } from "@/lib/toasts";

export function WorkerNavbar() {
  const router = useRouter();
  const pathname = usePathname();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const [hasNotification] = useState(true);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMobileMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => { setMobileMenuOpen(false); }, [pathname]);

  const handleLogout = () => {
    logout();
    router.push("/login");
    toasts.loggedOut();
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="flex items-center justify-between h-16 px-4 max-w-2xl mx-auto">
        {/* ── Left: Logo ── */}
        <button
          onClick={() => router.push("/worker/dashboard")}
          className="flex items-center gap-2.5"
        >
          <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-sm tracking-tight">S</span>
          </div>
          <span className="font-bold text-lg text-primary tracking-tight">Skiloq</span>
        </button>

        {/* ── Right: Actions ── */}
        <div className="flex items-center gap-1">
          {/* Notification */}
          <button className="relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-50 transition-colors">
            <Bell className="w-5 h-5 text-gray-400" />
            {hasNotification && (
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-danger rounded-full ring-2 ring-white" />
            )}
          </button>

          {/* Profile */}
          <div ref={profileRef} className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-accent-700 flex items-center justify-center text-white text-xs font-bold ring-2 ring-gray-100">
                {user?.phone?.slice(-2) || "W"}
              </div>
            </button>

            {profileOpen && (
              <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl border border-gray-100 shadow-xl shadow-gray-200/50 overflow-hidden z-50">
                <div className="px-4 py-3.5 border-b border-gray-50">
                  <p className="text-sm font-semibold text-gray-900">Worker Account</p>
                  <p className="text-xs text-gray-400 mt-0.5">{user?.phone || "+233 XX XXX XXXX"}</p>
                </div>

                <div className="py-1">
                  <button
                    onClick={() => { router.push("/worker/profile"); setProfileOpen(false); }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    <User className="w-4 h-4 text-gray-400" />
                    View Profile
                  </button>
                  <button
                    onClick={() => { router.push("/worker/verification"); setProfileOpen(false); }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    <Shield className="w-4 h-4 text-gray-400" />
                    Verification Status
                  </button>
                </div>

                <div className="border-t border-gray-50 py-1">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
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
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-50 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-gray-700" /> : <Menu className="w-5 h-5 text-gray-700" />}
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      {mobileMenuOpen && (
        <div ref={menuRef} className="md:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-1 animate-in slide-in-from-top-2 duration-200">
          {[
            { label: "Dashboard", href: "/worker/dashboard" },
            { label: "Find Jobs", href: "/worker/opportunities" },
            { label: "Bookings", href: "/worker/bookings" },
            { label: "Messages", href: "/worker/messages" },
            { label: "Wallet", href: "/worker/wallet" },
          ].map((link) => (
            <button
              key={link.href}
              onClick={() => router.push(link.href)}
              className={`w-full text-left px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                pathname.startsWith(link.href)
                  ? "text-accent bg-accent/5"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              {link.label}
            </button>
          ))}

          <div className="border-t border-gray-100 pt-2 mt-2">
            <button
              onClick={() => { router.push("/worker/profile"); setMobileMenuOpen(false); }}
              className="w-full text-left px-4 py-3 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
            >
              View Profile
            </button>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </header>
  );
}