// src/app/employer/dashboard/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { EmployerLayout } from "@/components/layout/EmployerLayout";
import { ActivePostsList } from "@/components/employer/ActivePostsList";
import { PendingApplications } from "@/components/employer/PendingApplications";
import { QuickRehire } from "@/components/employer/QuickRehire";
import { ErrorState } from "@/components/shared/ErrorState";
import { useEmployerDashboard } from "@/hooks/useEmployer";
import { Briefcase, Users, DollarSign, Star, Plus } from "lucide-react";

export default function EmployerDashboardPage() {
  const router = useRouter();
  const { data, isLoading, error, refetch } = useEmployerDashboard();

  if (isLoading) {
    return (
      <EmployerLayout>
        <div className="space-y-6 animate-pulse">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-24 bg-white rounded-card border border-primary-100" />
            ))}
          </div>
          <div className="h-64 bg-white rounded-card border border-primary-100" />
        </div>
      </EmployerLayout>
    );
  }

  if (error || !data) {
    return (
      <EmployerLayout>
        <ErrorState title="Couldn't load dashboard" onRetry={() => refetch()} />
      </EmployerLayout>
    );
  }

  return (
    <EmployerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-primary">Dashboard</h1>
            <p className="text-sm text-primary-300 mt-0.5">Manage your jobs and hires</p>
          </div>
          <button
            onClick={() => router.push("/employer/post-job")}
            className="flex items-center gap-2 bg-accent text-white text-sm font-semibold px-4 py-2.5 rounded-input hover:bg-accent-600 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Post a Job
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { icon: Briefcase, label: "Jobs Posted", value: data.stats.total_jobs_posted, color: "text-accent bg-accent/10" },
            { icon: Users, label: "Hired", value: data.stats.total_hired, color: "text-success bg-success/10" },
            { icon: DollarSign, label: "Total Spent", value: `GHS ${data.stats.total_spent_ghs.toLocaleString()}`, color: "text-warning bg-warning/10" },
            { icon: Star, label: "Rating", value: `${data.stats.average_rating}`, color: "text-accent bg-accent/10" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-card border border-primary-100 p-4">
              <div className={`w-9 h-9 rounded-lg ${stat.color} flex items-center justify-center mb-2`}>
                <stat.icon className="w-4 h-4" />
              </div>
              <p className="text-lg font-bold text-primary">{stat.value}</p>
              <p className="text-xs text-primary-300">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Active Jobs */}
        <div>
          <h2 className="text-md font-semibold text-primary mb-3">Active Jobs</h2>
          <ActivePostsList jobs={data.active_jobs} />
        </div>

        {/* Pending Applications */}
        <div>
          <h2 className="text-md font-semibold text-primary mb-3">
            Pending Applications ({data.pending_applications.length})
          </h2>
          <PendingApplications applications={data.pending_applications} />
        </div>

        {/* Quick Re-hire */}
        {data.quick_rehire.length > 0 && (
          <div>
            <h2 className="text-md font-semibold text-primary mb-3">Quick Re-hire</h2>
            <QuickRehire workers={data.quick_rehire} />
          </div>
        )}
      </div>
    </EmployerLayout>
  );
}