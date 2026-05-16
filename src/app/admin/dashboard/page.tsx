// src/app/admin/dashboard/page.tsx
"use client";

import { AdminLayout } from "@/components/layout/AdminLayout";
import { useAdminStats } from "@/hooks/useAdmin";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Users, UserCheck, AlertTriangle, Shield,
  DollarSign, Clock, ArrowRight
} from "lucide-react";

const statCards = [
  { key: "totalUsers", label: "Total Users", icon: Users, color: "bg-blue-50 text-blue-600", isCurrency: false },
  { key: "pendingVerifications", label: "Pending Verifications", icon: Shield, color: "bg-amber-50 text-amber-600", isCurrency: false },
  { key: "openDisputes", label: "Open Disputes", icon: AlertTriangle, color: "bg-red-50 text-red-600", isCurrency: false },
  { key: "flaggedAccounts", label: "Flagged Accounts", icon: AlertTriangle, color: "bg-orange-50 text-orange-600", isCurrency: false },
  { key: "totalTransactionsGHS", label: "Total Transactions", icon: DollarSign, color: "bg-emerald-50 text-emerald-600", isCurrency: true },
  { key: "verificationSLABreach", label: "SLA Breaches", icon: Clock, color: "bg-red-50 text-red-600", isCurrency: false },
] as const;

export default function AdminDashboardPage() {
  const router = useRouter();
  const { data: stats, isLoading } = useAdminStats();

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="space-y-6 animate-pulse">
          <div className="h-8 w-48 bg-gray-100 rounded-lg" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-28 bg-white rounded-2xl border border-gray-100" />
            ))}
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (!stats) return null;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-sm text-gray-500 mt-0.5">Platform overview and quick actions</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {statCards.map((card, i) => (
            <motion.div
              key={card.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-all"
            >
              <div className={`w-10 h-10 rounded-xl ${card.color} flex items-center justify-center mb-3`}>
                <card.icon className="w-5 h-5" />
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {card.isCurrency ? `GHS ${(stats[card.key] as number).toLocaleString()}` : String(stats[card.key])}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">{card.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid sm:grid-cols-3 gap-3">
          {[
            { label: "Review Verifications", href: "/admin/verification-queue", color: "bg-amber-50 text-amber-700 border-amber-200" },
            { label: "Manage Disputes", href: "/admin/disputes", color: "bg-red-50 text-red-700 border-red-200" },
            { label: "View Users", href: "/admin/users", color: "bg-blue-50 text-blue-700 border-blue-200" },
          ].map((action) => (
            <button
              key={action.label}
              onClick={() => router.push(action.href)}
              className={`flex items-center justify-between p-4 rounded-2xl border ${action.color} hover:shadow-md transition-all`}
            >
              <span className="text-sm font-semibold">{action.label}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
