// src/app/employer/payments/page.tsx
"use client";

import { EmployerLayout } from "@/components/layout/EmployerLayout";
import { ErrorState } from "@/components/shared/ErrorState";
import { useEmployerPayments } from "@/hooks/useEmployer";
import { Shield, Clock, CheckCircle, DollarSign } from "lucide-react";

export default function EmployerPaymentsPage() {
  const { data, isLoading, error, refetch } = useEmployerPayments();

  const statusConfig = {
    held: { icon: Clock, color: "text-warning bg-warning/10", label: "In Escrow" },
    released: { icon: CheckCircle, color: "text-success bg-success/10", label: "Released" },
    refunded: { icon: Shield, color: "text-primary-300 bg-primary-50", label: "Refunded" },
    disputed: { icon: Shield, color: "text-danger bg-danger/10", label: "Disputed" },
  };

  return (
    <EmployerLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-bold text-primary">Payments</h1>
          <p className="text-sm text-primary-300 mt-0.5">Manage escrow and payment history</p>
        </div>

        {isLoading && (
          <div className="space-y-2 animate-pulse">
            <div className="h-20 bg-white rounded-card border border-primary-100" />
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-white rounded-card border border-primary-100" />
            ))}
          </div>
        )}

        {error && <ErrorState title="Couldn't load payments" onRetry={() => refetch()} />}

        {data && (
          <>
            {/* Escrow summary */}
            <div className="bg-primary rounded-card p-6 text-white">
              <div className="flex items-center gap-2 mb-1">
                <Shield className="w-4 h-4 text-primary-200" />
                <span className="text-sm text-primary-200">Total in Escrow</span>
              </div>
              <p className="text-2xl font-bold">GHS {data.total_in_escrow_ghs.toLocaleString()}</p>
              <p className="text-xs text-primary-200 mt-1">Funds held securely until work is completed</p>
            </div>

            {/* Active escrows */}
            <div>
              <h2 className="text-md font-semibold text-primary mb-3">Active Escrows</h2>
              {data.active_escrows.length > 0 ? (
                <div className="grid gap-2">
                  {data.active_escrows.map((escrow) => {
                    const status = statusConfig[escrow.status as keyof typeof statusConfig] || statusConfig.held;
                    const StatusIcon = status.icon;
                    return (
                      <div key={escrow.id} className="bg-white rounded-card border border-primary-100 p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h3 className="text-sm font-semibold text-primary">{escrow.job_title}</h3>
                            <p className="text-xs text-primary-300">{escrow.worker_name}</p>
                          </div>
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-pill text-xs font-bold ${status.color}`}>
                            <StatusIcon className="w-3 h-3" />
                            {status.label}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-accent">GHS {escrow.amount_ghs.toLocaleString()}</span>
                          <span className="text-xs text-primary-300">
                            Funded {new Date(escrow.funded_at).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-sm text-primary-300 text-center py-8">No active escrows</p>
              )}
            </div>
          </>
        )}
      </div>
    </EmployerLayout>
  );
}
