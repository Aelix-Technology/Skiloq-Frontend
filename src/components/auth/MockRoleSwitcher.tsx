// src/components/auth/MockRoleSwitcher.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  UserCheck,
  Building2,
  ShieldCheck,
  UserCog,
  RefreshCw,
  X,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { useAuthStore } from "@/stores/auth.store";
import { isMockToken, getAllMockAccounts, getMockUserByRole, getDashboardForRole } from "@/lib/mock-auth";
import type { UserRole } from "@/types/auth";
import { toasts } from "@/lib/toasts";

const ROLE_ICONS: Record<UserRole, React.ComponentType<{ className?: string }>> = {
  worker: UserCheck,
  employer: Building2,
  admin: ShieldCheck,
  agent: UserCog,
};

export function MockRoleSwitcher() {
  const user = useAuthStore((s) => s.user);
  const accessToken = useAuthStore((s) => s.accessToken);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const setAuth = useAuthStore((s) => s.setAuth);
  const logout = useAuthStore((s) => s.logout);
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  const isMock = isAuthenticated && (user?.is_mock || isMockToken(accessToken));

  if (!isMock || isDismissed) {
    return null;
  }

  const currentRole = (user?.role as UserRole) || "worker";
  const accounts = getAllMockAccounts();

  const handleSwitchRole = (newRole: UserRole) => {
    const { user: newUser, accessToken: newToken } = getMockUserByRole(newRole);
    setAuth(newUser, { accessToken: newToken });
    toasts.otpVerified();
    setIsOpen(false);
    router.replace(getDashboardForRole(newRole));
  };

  const handleLogout = () => {
    logout();
    router.push("/login");
    toasts.loggedOut();
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Floating Toggle Button */}
      {!isOpen ? (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex items-center gap-1.5 bg-primary/95 text-white backdrop-blur-xl border border-white/20 shadow-2xl rounded-full p-1.5 pr-3 hover:shadow-accent-500/20 transition-all cursor-pointer group"
          onClick={() => setIsOpen(true)}
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-accent to-accent-400 flex items-center justify-center text-white shadow-sm">
            <Sparkles className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-accent-300 leading-none">
              Demo Mode
            </span>
            <span className="text-xs font-semibold capitalize text-white leading-tight">
              {currentRole}
            </span>
          </div>
          <RefreshCw className="w-3.5 h-3.5 text-white/60 group-hover:text-white group-hover:rotate-90 transition-all ml-1" />
        </motion.div>
      ) : (
        /* Expanded Switcher Card */
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 10 }}
          className="w-72 bg-white/95 backdrop-blur-2xl rounded-2xl border border-primary-100 shadow-2xl overflow-hidden text-primary"
        >
          {/* Header */}
          <div className="px-4 py-3 bg-gradient-to-r from-primary to-primary-800 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-accent-300" />
              <div>
                <h4 className="text-xs font-bold">Switch Demo Role</h4>
                <p className="text-[10px] text-white/70">
                  Current: <span className="font-semibold capitalize text-accent-200">{currentRole}</span>
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/10 rounded-lg text-white/80 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Role options */}
          <div className="p-2 space-y-1">
            {accounts.map((acc) => {
              const isCurrent = acc.role === currentRole;
              const Icon = ROLE_ICONS[acc.role];
              return (
                <button
                  key={acc.role}
                  onClick={() => handleSwitchRole(acc.role)}
                  className={`w-full p-2 rounded-xl flex items-center justify-between text-left transition-all ${
                    isCurrent
                      ? "bg-accent/10 border border-accent/30 text-accent font-bold"
                      : "hover:bg-primary-50/80 text-primary-600 hover:text-primary border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs ${
                        isCurrent
                          ? "bg-accent text-white"
                          : "bg-primary-100/70 text-primary-600"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold leading-tight">{acc.title}</p>
                      <p className="text-[10px] text-primary-400 leading-none mt-0.5 font-mono">
                        {acc.phone}
                      </p>
                    </div>
                  </div>
                  {isCurrent ? (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-accent/20 text-accent">
                      Active
                    </span>
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-primary-300" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Footer Actions */}
          <div className="px-3 py-2 border-t border-primary-50 bg-primary-50/50 flex items-center justify-between text-xs">
            <button
              onClick={() => setIsDismissed(true)}
              className="text-[11px] text-primary-400 hover:text-primary-600"
            >
              Hide Switcher
            </button>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1 text-[11px] font-medium text-danger hover:underline"
            >
              <LogOut className="w-3 h-3" />
              Sign Out
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
