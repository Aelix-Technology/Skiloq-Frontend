// src/app/admin/fraud-alerts/page.tsx
"use client";

import { AdminLayout } from "@/components/layout/AdminLayout";
import { useFraudAlerts } from "@/hooks/useAdmin";
import { AlertTriangle, Shield, Users, DollarSign, Eye } from "lucide-react";

const severityConfig = {
  low: "bg-gray-50 text-gray-600",
  medium: "bg-amber-50 text-amber-600",
  high: "bg-orange-50 text-orange-600",
  critical: "bg-red-50 text-red-600",
};

const typeIcons: Record<string, typeof Shield> = {
  multi_account: Users,
  fake_reviews: Eye,
  payment_fraud: DollarSign,
  id_reuse: Shield,
  suspicious_activity: AlertTriangle,
};

export default function FraudAlertsPage() {
  const { data: alerts, isLoading } = useFraudAlerts();

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="space-y-4 animate-pulse">
          <div className="h-8 w-48 bg-gray-100 rounded-lg" />
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-white rounded-2xl border border-gray-100" />
          ))}
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Fraud Alerts</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {alerts?.filter((a) => a.status === "new").length || 0} new alerts
          </p>
        </div>

        <div className="grid gap-3">
          {alerts?.map((alert) => {
            const Icon = typeIcons[alert.type] || AlertTriangle;

            return (
              <div
                key={alert.id}
                className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      alert.severity === "critical" ? "bg-red-50 text-red-600" :
                      alert.severity === "high" ? "bg-orange-50 text-orange-600" :
                      "bg-amber-50 text-amber-600"
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">{alert.userName}</h3>
                      <p className="text-xs text-gray-500 capitalize">{alert.type.replace("_", " ")}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${severityConfig[alert.severity]}`}>
                      {alert.severity}
                    </span>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      alert.status === "new" ? "bg-red-50 text-red-600" :
                      alert.status === "investigating" ? "bg-amber-50 text-amber-600" :
                      "bg-emerald-50 text-emerald-600"
                    }`}>
                      {alert.status}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-3">{alert.description}</p>

                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>Related: {alert.relatedAccounts.length} account{alert.relatedAccounts.length !== 1 ? "s" : ""}</span>
                  <span>Detected {new Date(alert.detectedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}</span>
                </div>
              </div>
            );
          })}
        </div>

        {alerts?.length === 0 && (
          <div className="text-center py-16">
            <Shield className="w-12 h-12 text-gray-200 mx-auto mb-3" />
            <p className="text-gray-500">No fraud alerts</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
