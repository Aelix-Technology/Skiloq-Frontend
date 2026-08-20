// src/components/auth/MockAccountSelector.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Zap,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  UserCheck,
  Building2,
  ShieldCheck,
  UserCog,
  ArrowRight,
} from "lucide-react";
import { getAllMockAccounts, type MockAccountConfig } from "@/lib/mock-auth";
import { useQuickMockLogin } from "@/hooks/useAuth";
import type { UserRole } from "@/types/auth";
import { toast } from "sonner";

interface MockAccountSelectorProps {
  onSelectPhone?: (phone: string) => void;
  redirectUrl?: string | null;
  className?: string;
}

const ROLE_ICONS: Record<UserRole, React.ComponentType<{ className?: string }>> = {
  worker: UserCheck,
  employer: Building2,
  admin: ShieldCheck,
  agent: UserCog,
};

const ROLE_COLORS: Record<
  UserRole,
  {
    bg: string;
    border: string;
    badgeBg: string;
    badgeText: string;
    accentBtn: string;
    iconBg: string;
    iconText: string;
  }
> = {
  worker: {
    bg: "bg-emerald-50/50",
    border: "border-emerald-200/70",
    badgeBg: "bg-emerald-100/80",
    badgeText: "text-emerald-800",
    accentBtn: "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20",
    iconBg: "bg-emerald-100",
    iconText: "text-emerald-700",
  },
  employer: {
    bg: "bg-blue-50/50",
    border: "border-blue-200/70",
    badgeBg: "bg-blue-100/80",
    badgeText: "text-blue-800",
    accentBtn: "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/20",
    iconBg: "bg-blue-100",
    iconText: "text-blue-700",
  },
  admin: {
    bg: "bg-purple-50/50",
    border: "border-purple-200/70",
    badgeBg: "bg-purple-100/80",
    badgeText: "text-purple-800",
    accentBtn: "bg-purple-600 hover:bg-purple-700 text-white shadow-purple-600/20",
    iconBg: "bg-purple-100",
    iconText: "text-purple-700",
  },
  agent: {
    bg: "bg-amber-50/50",
    border: "border-amber-200/70",
    badgeBg: "bg-amber-100/80",
    badgeText: "text-amber-800",
    accentBtn: "bg-amber-600 hover:bg-amber-700 text-white shadow-amber-600/20",
    iconBg: "bg-amber-100",
    iconText: "text-amber-700",
  },
};

export function MockAccountSelector({
  onSelectPhone,
  redirectUrl,
  className = "",
}: MockAccountSelectorProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [activeRole, setActiveRole] = useState<UserRole>("worker");
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [loggingInRole, setLoggingInRole] = useState<UserRole | null>(null);

  const accounts = getAllMockAccounts();
  const quickLogin = useQuickMockLogin();

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    toast.success(`Copied ${label} (${text})`);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleQuickLogin = (role: UserRole) => {
    setLoggingInRole(role);
    quickLogin(role, redirectUrl);
  };

  const currentAccount = accounts.find((a) => a.role === activeRole) || accounts[0];
  const Icon = ROLE_ICONS[activeRole] || UserCheck;
  const colors = ROLE_COLORS[activeRole] || ROLE_COLORS.worker;

  return (
    <div
      className={`rounded-2xl border border-accent-100/80 bg-gradient-to-b from-white/95 to-accent-50/30 backdrop-blur-xl shadow-lg shadow-accent-900/5 transition-all overflow-hidden ${className}`}
    >
      {/* Header toggle */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-accent-50/40 transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-accent to-accent-600 flex items-center justify-center text-white shadow-sm shadow-accent-500/30">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Demo Accounts
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-700">
                1-Click Ready
              </span>
            </div>
            <p className="text-[11px] text-primary-400">
              Instant login for testing in production
            </p>
          </div>
        </div>
        <div className="text-primary-400 p-1">
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {/* Expandable content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="border-t border-accent-100/60 px-4 pb-4 pt-3 space-y-3"
          >
            {/* Role Selection Tabs */}
            <div className="grid grid-cols-4 gap-1.5 p-1 bg-primary-50/80 rounded-xl">
              {accounts.map((acc) => {
                const isSelected = acc.role === activeRole;
                const RoleIcon = ROLE_ICONS[acc.role];
                return (
                  <button
                    key={acc.role}
                    type="button"
                    onClick={() => setActiveRole(acc.role)}
                    className={`py-1.5 px-2 rounded-lg text-xs font-semibold capitalize flex flex-col sm:flex-row items-center justify-center gap-1 transition-all ${
                      isSelected
                        ? "bg-white text-primary shadow-sm ring-1 ring-black/5"
                        : "text-primary-400 hover:text-primary hover:bg-white/40"
                    }`}
                  >
                    <RoleIcon className="w-3.5 h-3.5" />
                    <span className="truncate">{acc.role}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Role Card */}
            <div
              className={`p-3.5 rounded-xl border ${colors.border} ${colors.bg} space-y-3 transition-colors`}
            >
              {/* Account details */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-9 h-9 rounded-xl ${colors.iconBg} ${colors.iconText} flex items-center justify-center font-bold text-xs`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-primary">{currentAccount.name}</h4>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${colors.badgeBg} ${colors.badgeText}`}
                      >
                        {currentAccount.badge}
                      </span>
                    </div>
                    <p className="text-[11px] text-primary-500 mt-0.5 line-clamp-1">
                      {currentAccount.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Credentials Pills */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-white/90 rounded-lg p-2 border border-black/5 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-primary-400 block">
                      Phone
                    </span>
                    <span className="font-mono font-bold text-primary">
                      {currentAccount.phone}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(currentAccount.phone, "Phone")}
                    className="p-1 hover:bg-primary-50 rounded text-primary-400 hover:text-primary transition-colors"
                    title="Copy Phone"
                  >
                    {copiedField === "Phone" ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                <div className="bg-white/90 rounded-lg p-2 border border-black/5 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-primary-400 block">
                      OTP Code
                    </span>
                    <span className="font-mono font-bold text-primary">
                      {currentAccount.code}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(currentAccount.code, "Code")}
                    className="p-1 hover:bg-primary-50 rounded text-primary-400 hover:text-primary transition-colors"
                    title="Copy Code"
                  >
                    {copiedField === "Code" ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Actions: 1-Click Login & Fill Form */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                {onSelectPhone && (
                  <button
                    type="button"
                    onClick={() => onSelectPhone(currentAccount.phone)}
                    className="w-full py-2 px-3 bg-white/90 hover:bg-white text-primary border border-primary-200/80 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-sm active:scale-95"
                  >
                    <span>Fill Form</span>
                    <ArrowRight className="w-3 h-3 text-primary-400" />
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => handleQuickLogin(currentAccount.role)}
                  disabled={loggingInRole === currentAccount.role}
                  className={`${
                    onSelectPhone ? "w-full" : "col-span-2"
                  } py-2 px-3 ${
                    colors.accentBtn
                  } rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95 disabled:opacity-50`}
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>
                    {loggingInRole === currentAccount.role
                      ? "Logging in..."
                      : `1-Click ${currentAccount.title.split(" ")[0]} Login`}
                  </span>
                </button>
              </div>
            </div>

            <p className="text-[11px] text-center text-primary-400">
              💡 Any phone number with code <span className="font-mono font-bold text-primary">123456</span> or <span className="font-mono font-bold text-primary">000000</span> also works.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
