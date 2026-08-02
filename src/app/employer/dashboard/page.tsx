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
        <div className="mx-auto px-4 lg:px-6 max-w-full md:max-w-7xl space-y-6 animate-pulse">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-28 bg-white/75 rounded-2xl border border-white/60" />
            ))}
          </div>
          <div className="h-64 bg-white/75 rounded-2xl border border-white/60" />
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

  const statBlobs = ["bg-accent/15", "bg-success/15", "bg-warning/15", "bg-primary/15"];

  return (
    <EmployerLayout>
      <div className="mx-auto px-4 lg:px-6 max-w-full md:max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">Dashboard</h1>
            <p className="text-sm text-primary-300 mt-1">Manage your jobs and hires</p>
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
          {[
            { icon: Briefcase, label: "Jobs Posted", value: data.stats.total_jobs_posted, color: "text-accent bg-accent/10" },
            { icon: Users, label: "Hired", value: data.stats.total_hired, color: "text-success bg-success/10" },
            { icon: DollarSign, label: "Total Spent", value: `GHS ${data.stats.total_spent_ghs.toLocaleString()}`, color: "text-warning bg-warning/10" },
            { icon: Star, label: "Rating", value: `${data.stats.average_rating}`, color: "text-accent bg-accent/10" },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className="relative overflow-hidden rounded-2xl border border-white/70 bg-white/75 backdrop-blur-xl p-5 shadow-[0_8px_30px_-12px_rgba(26,31,54,0.10)] before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white before:to-transparent hover:-translate-y-1 hover:shadow-[0_16px_40px_-14px_rgba(26,31,54,0.18)] transition-all duration-300"
            >
              <div className={`absolute -bottom-6 -right-6 h-24 w-24 rounded-full blur-2xl opacity-60 ${statBlobs[i]}`} />
              <div className="relative">
                <div className={`w-9 h-9 rounded-lg ${stat.color} flex items-center justify-center mb-3`}>
                  <stat.icon className="w-4 h-4" />
                </div>
                <p className="text-2xl font-bold tracking-tight text-primary">{stat.value}</p>
                <p className="text-xs text-primary-300 font-medium uppercase tracking-wider mt-0.5">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Active Jobs */}
        <div>
          <h2 className="text-md font-semibold tracking-tight text-primary mb-4">Active Jobs</h2>
          <div className="relative overflow-hidden rounded-2xl border border-white/70 bg-white/75 backdrop-blur-xl shadow-[0_8px_30px_-12px_rgba(26,31,54,0.10)] before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white before:to-transparent hover:-translate-y-1 hover:shadow-[0_16px_40px_-14px_rgba(26,31,54,0.18)] transition-all duration-300">
            <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full blur-2xl opacity-60 bg-accent/15" />
            <ActivePostsList jobs={data.active_jobs} />
          </div>
        </div>

        {/* Pending Applications */}
        <div>
          <h2 className="text-md font-semibold tracking-tight text-primary mb-4">
            Pending Applications ({data.pending_applications.length})
          </h2>
          <div className="relative overflow-hidden rounded-2xl border border-white/70 bg-white/75 backdrop-blur-xl shadow-[0_8px_30px_-12px_rgba(26,31,54,0.10)] before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white before:to-transparent hover:-translate-y-1 hover:shadow-[0_16px_40px_-14px_rgba(26,31,54,0.18)] transition-all duration-300">
            <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full blur-2xl opacity-60 bg-warning/15" />
            <PendingApplications applications={data.pending_applications} />
          </div>
        </div>

        {/* Quick Re-hire */}
        {data.quick_rehire.length > 0 && (
          <div>
            <h2 className="text-md font-semibold tracking-tight text-primary mb-4">Quick Re-hire</h2>
            <div className="relative overflow-hidden rounded-2xl border border-white/70 bg-white/75 backdrop-blur-xl shadow-[0_8px_30px_-12px_rgba(26,31,54,0.10)] before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white before:to-transparent hover:-translate-y-1 hover:shadow-[0_16px_40px_-14px_rgba(26,31,54,0.18)] transition-all duration-300">
              <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full blur-2xl opacity-60 bg-success/15" />
              <QuickRehire workers={data.quick_rehire} />
            </div>
          </div>
        )}
      </div>
    </EmployerLayout>
  );
}
