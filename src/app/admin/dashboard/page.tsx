// src/app/admin/dashboard/page.tsx
"use client";

import { AdminLayout } from "@/components/layout/AdminLayout";
import { useAdminStats } from "@/hooks/useAdmin";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Users, AlertTriangle, Shield,
  DollarSign, Clock, ArrowRight
} from "lucide-react";

const statCards = [
  { key: "totalUsers", label: "Total Users", icon: Users, color: "bg-accent/10 text-accent", isCurrency: false },
  { key: "pendingVerifications", label: "Pending Verifications", icon: Shield, color: "bg-warning/10 text-warning", isCurrency: false },
  { key: "openDisputes", label: "Open Disputes", icon: AlertTriangle, color: "bg-danger/10 text-danger", isCurrency: false },
  { key: "flaggedAccounts", label: "Flagged Accounts", icon: AlertTriangle, color: "bg-warning/15 text-warning-700", isCurrency: false },
  { key: "totalTransactionsGHS", label: "Total Transactions", icon: DollarSign, color: "bg-success/10 text-success", isCurrency: true },
  { key: "verificationSLABreach", label: "SLA Breaches", icon: Clock, color: "bg-danger/10 text-danger", isCurrency: false },
] as const;

const statBlobs = ["bg-accent/15", "bg-success/15", "bg-warning/15", "bg-primary/15", "bg-accent/15", "bg-success/15"];

export default function AdminDashboardPage() {
  const router = useRouter();
  const { data: stats, isLoading } = useAdminStats();

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="mx-auto px-4 lg:px-6 max-w-7xl space-y-6 animate-pulse">
          <div className="h-8 w-48 bg-white/75 rounded-lg" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-28 bg-white/75 rounded-2xl border border-white/60" />
            ))}
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (!stats) return null;

  return (
    <AdminLayout>
      <div className="mx-auto px-4 lg:px-6 max-w-7xl space-y-6">
        <div>
          <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">Admin Dashboard</h1>
          <p className="text-sm text-primary-300 mt-1">Platform overview and quick actions</p>
        </div>

        {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
          {statCards.map((card, i) => (
            <motion.div
              key={card.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="relative overflow-hidden rounded-2xl border border-white/70 bg-white/75 backdrop-blur-xl p-5 shadow-[0_8px_30px_-12px_rgba(26,31,54,0.10)] before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white before:to-transparent hover:-translate-y-1 hover:shadow-[0_16px_40px_-14px_rgba(26,31,54,0.18)] transition-all duration-300"
            >
              <div className={`absolute -bottom-6 -right-6 h-24 w-24 rounded-full blur-2xl opacity-60 ${statBlobs[i]}`} />
              <div className="relative">
                <div className={`w-10 h-10 rounded-xl ${card.color} flex items-center justify-center mb-3`}>
                  <card.icon className="w-5 h-5" />
                </div>
                <p className="text-2xl font-bold tracking-tight text-primary">
                  {card.isCurrency ? `GHS ${(stats[card.key] as number).toLocaleString()}` : String(stats[card.key])}
                </p>
                <p className="text-xs text-primary-300 font-medium uppercase tracking-wider mt-0.5">{card.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-md font-semibold tracking-tight text-primary mb-4">Quick Actions</h2>
          <div className="relative overflow-hidden rounded-2xl border border-white/70 bg-white/75 backdrop-blur-xl p-5 shadow-[0_8px_30px_-12px_rgba(26,31,54,0.10)] before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white before:to-transparent">
            <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full blur-2xl opacity-60 bg-primary/15" />
            <div className="relative grid sm:grid-cols-3 gap-4 sm:gap-5">
              {[
                { label: "Review Verifications", href: "/admin/verification-queue", color: "bg-warning/10 text-warning-700 border-warning-100/60" },
                { label: "Manage Disputes", href: "/admin/disputes", color: "bg-danger/10 text-danger-700 border-danger-100/60" },
                { label: "View Users", href: "/admin/users", color: "bg-accent/10 text-accent-600 border-accent-100/60" },
              ].map((action) => (
                <button
                  key={action.label}
                  onClick={() => router.push(action.href)}
                  className={`flex items-center justify-between p-4 rounded-2xl border ${action.color} hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-14px_rgba(26,31,54,0.18)] transition-all duration-300`}
                >
                  <span className="text-sm font-semibold">{action.label}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
