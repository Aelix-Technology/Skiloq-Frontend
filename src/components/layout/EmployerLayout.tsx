// src/components/layout/EmployerLayout.tsx
"use client";

import { useRouter, usePathname } from "next/navigation";
import { Bell, Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { label: "Dashboard", href: "/employer/dashboard" },
  { label: "Post a Job", href: "/employer/post-job" },
  { label: "Find Talent", href: "/employer/find-talent" },
  { label: "Messages", href: "/employer/messages" },
  { label: "Payments", href: "/employer/payments" },
];

export function EmployerLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-primary-50">
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-primary-100">
        <div className="flex items-center justify-between h-14 px-4 max-w-6xl mx-auto">
          {/* Logo */}
          <button onClick={() => router.push("/employer/dashboard")} className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-white text-sm font-bold">S</span>
            </div>
            <span className="font-semibold text-primary text-md">Skiloq</span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname.startsWith(link.href);
              return (
                <button
                  key={link.href}
                  onClick={() => router.push(link.href)}
                  className={`px-3 py-2 text-sm font-medium rounded-input transition-colors ${
                    isActive
                      ? "bg-accent/10 text-accent"
                      : "text-primary-300 hover:text-primary hover:bg-primary-50"
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <button className="relative w-10 h-10 flex items-center justify-center rounded-input hover:bg-primary-50 transition-colors">
              <Bell className="w-5 h-5 text-primary-300" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-danger rounded-full ring-2 ring-white" />
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-input hover:bg-primary-50 transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-primary" />
              ) : (
                <Menu className="w-5 h-5 text-primary" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <nav className="md:hidden border-t border-primary-50 bg-white px-4 py-2 space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname.startsWith(link.href);
              return (
                <button
                  key={link.href}
                  onClick={() => {
                    router.push(link.href);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2.5 text-sm font-medium rounded-input transition-colors ${
                    isActive
                      ? "bg-accent/10 text-accent"
                      : "text-primary-300 hover:text-primary hover:bg-primary-50"
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
}