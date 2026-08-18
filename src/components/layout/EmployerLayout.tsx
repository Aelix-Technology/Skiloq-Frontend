"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Bell, Menu, X, LogOut, Settings, User, Plus, Search, HelpCircle, MessageSquare, Users } from "lucide-react";
import { useAuthStore } from "@/stores/auth.store";
import { toasts } from "@/lib/toasts";

const navLinks = [
  { label: "Dashboard", href: "/employer/dashboard" },
  { label: "Jobs", href: "/employer/jobs" },
  { label: "Messages", href: "/employer/messages" },
];

export function EmployerLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

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
    if (href === "/employer/jobs") {
      return pathname.startsWith("/employer/jobs") || pathname.startsWith("/employer/post-job") || pathname.startsWith("/employer/find-talent");
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFF]">
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="flex items-center justify-between h-16 sm:px-8 px-4 max-w-[1600px] mx-auto">
          <div className="flex items-center gap-12">
            <button
              onClick={() => router.push("/employer/dashboard")}
              className="flex items-center gap-2.5"
            >
              <div className="w-9 h-9 bg-[#1A1F36] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-base tracking-tight">S</span>
              </div>
              <span className="font-extrabold text-2xl text-[#1A1F36] tracking-tight">Skiloq</span>
            </button>

            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => router.push(link.href)}
                  className={`relative text-base font-semibold py-2 transition-colors ${
                    isActive(link.href)
                      ? "text-[#2563EB]"
                      : "text-gray-500 hover:text-gray-800"
                  }`}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <span className="absolute -bottom-[17px] left-0 w-full h-1 bg-[#2563EB] rounded-full" />
                  )}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <button className="relative w-11 h-11 flex items-center justify-center rounded-xl hover:bg-gray-50 transition-colors">
              <Bell className="w-5 h-5 text-gray-500" />
              <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white" />
            </button>

            <button className="relative w-11 h-11 flex items-center justify-center rounded-xl hover:bg-gray-50 transition-colors">
              <HelpCircle className="w-5 h-5 text-gray-500" />
            </button>

            <div ref={profileRef} className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 p-1 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=faces"
                  alt="User"
                  className="w-11 h-11 rounded-xl object-cover border-2 border-gray-100"
                />
              </button>

              {profileOpen && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-2xl border border-gray-100 shadow-2xl shadow-gray-200/60 overflow-hidden z-50">
                  <div className="px-5 py-4 border-b border-gray-100">
                    <p className="text-sm font-bold text-gray-900">Employer Account</p>
                    <p className="text-xs text-gray-500 mt-1">{user?.phone || "+233 XX XXX XXXX"}</p>
                  </div>

                  <div className="py-2">
                    <button
                      onClick={() => { router.push("/employer/dashboard"); setProfileOpen(false); }}
                      className="w-full flex items-center gap-3 px-5 py-3 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                      <User className="w-4 h-4 text-gray-400" />
                      Dashboard
                    </button>
                    <button
                      onClick={() => { router.push("/employer/payments"); setProfileOpen(false); }}
                      className="w-full flex items-center gap-3 px-5 py-3 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                      <Settings className="w-4 h-4 text-gray-400" />
                      Billing & Settings
                    </button>
                  </div>

                  <div className="border-t border-gray-100 py-2">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-5 py-3 text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-11 h-11 flex items-center justify-center rounded-xl hover:bg-gray-50 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-gray-600" /> : <Menu className="w-5 h-5 text-gray-600" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div ref={menuRef} className="md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-2 animate-in slide-in-from-top-2 duration-200">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => router.push(link.href)}
                className={`w-full text-left px-4 py-3 text-sm font-bold rounded-xl transition-colors ${
                  isActive(link.href)
                    ? "text-[#2563EB] bg-[#F0F5FF]"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                {link.label}
              </button>
            ))}

            <button
              onClick={() => { router.push("/employer/post-job"); setMobileMenuOpen(false); }}
              className="w-full text-center mt-2 bg-[#2563EB] text-white text-sm font-bold py-3.5 rounded-xl hover:bg-[#1D4ED8] transition-colors flex items-center justify-center gap-2 shadow-[0_8px_20px_-6px_rgba(37,99,235,0.5)]"
            >
              <Plus className="w-4 h-4" />
              Post a Job
            </button>

            <div className="border-t border-gray-100 pt-3 mt-3">
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        )}
      </header>

      <main className="p-5 md:p-8 max-w-[1600px] mx-auto">{children}</main>
    </div>
  );
}
