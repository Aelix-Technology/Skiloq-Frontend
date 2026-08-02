// src/app/worker/dashboard/page.tsx
"use client";

import { useWorkerDashboard } from "@/hooks/useWorker";
import { WorkerLayout } from "@/components/layout/WorkerLayout";
import { DashboardSkeleton } from "@/components/dashboard/DashboardSkeleton";
import { ErrorState } from "@/components/shared/ErrorState";
import { VerificationChecklist } from "@/components/dashboard/VerificationChecklist";
import { TrustScoreRing } from "@/components/dashboard/TrustScoreRing";
import { MatchedOpportunities } from "@/components/dashboard/MatchedOpportunities";
import { ActiveJobsList } from "@/components/dashboard/ActiveJobsList";
import { EarningsSummary } from "@/components/dashboard/EarningsSummary";
import { MotionDiv, listContainer, listItem } from "@/components/ui/motion-list";

export default function WorkerDashboardPage() {
  const { data, isLoading, error, refetch } = useWorkerDashboard();

  if (isLoading) {
    return (
      <WorkerLayout>
        <DashboardSkeleton />
      </WorkerLayout>
    );
  }

  if (error || !data) {
    return (
      <WorkerLayout>
        <ErrorState onRetry={() => refetch()} />
      </WorkerLayout>
    );
  }

  return (
<WorkerLayout>
  <div className="mx-auto px-4 lg:px-6 max-w-2xl lg:max-w-4xl">
  <MotionDiv variants={listContainer} initial="hidden" animate="show" className="space-y-6">
    {/* Welcome */}
    <MotionDiv variants={listItem} className="pb-1">
      <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">Dashboard</h1>
      <p className="text-sm text-primary-300 mt-1">
        Welcome back. Your Trust Score is{" "}
        <span className="font-semibold text-accent">{data.trust_score}/100</span>.
      </p>
    </MotionDiv>

    {/* Verification */}
    {!data.verification_checklist.all_verified && (
      <MotionDiv variants={listItem}>
        <div className="relative overflow-hidden rounded-2xl border border-white/70 bg-white/75 backdrop-blur-xl shadow-[0_8px_30px_-12px_rgba(26,31,54,0.10)] before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white before:to-transparent hover:-translate-y-1 hover:shadow-[0_16px_40px_-14px_rgba(26,31,54,0.18)] transition-all duration-300">
          <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full blur-2xl opacity-60 bg-warning/15" />
          <VerificationChecklist checklist={data.verification_checklist} />
        </div>
      </MotionDiv>
    )}

    {/* Trust Score + Earnings in a row on desktop */}
    <MotionDiv variants={listItem} className="grid sm:grid-cols-2 gap-4 sm:gap-5">
      <div className="relative overflow-hidden rounded-2xl border border-white/70 bg-white/75 backdrop-blur-xl shadow-[0_8px_30px_-12px_rgba(26,31,54,0.10)] before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white before:to-transparent hover:-translate-y-1 hover:shadow-[0_16px_40px_-14px_rgba(26,31,54,0.18)] transition-all duration-300">
        <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full blur-2xl opacity-60 bg-success/15" />
        <TrustScoreRing score={data.trust_score} breakdown={data.trust_score_breakdown} />
      </div>
      <div className="relative overflow-hidden rounded-2xl border border-white/70 bg-white/75 backdrop-blur-xl shadow-[0_8px_30px_-12px_rgba(26,31,54,0.10)] before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white before:to-transparent hover:-translate-y-1 hover:shadow-[0_16px_40px_-14px_rgba(26,31,54,0.18)] transition-all duration-300">
        <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full blur-2xl opacity-60 bg-accent/15" />
        <EarningsSummary earnings={data.earnings} />
      </div>
    </MotionDiv>

    {/* Active Jobs */}
    <MotionDiv variants={listItem}>
      <div className="relative overflow-hidden rounded-2xl border border-white/70 bg-white/75 backdrop-blur-xl shadow-[0_8px_30px_-12px_rgba(26,31,54,0.10)] before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white before:to-transparent hover:-translate-y-1 hover:shadow-[0_16px_40px_-14px_rgba(26,31,54,0.18)] transition-all duration-300">
        <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full blur-2xl opacity-60 bg-primary/15" />
        <ActiveJobsList jobs={data.active_jobs} />
      </div>
    </MotionDiv>

    {/* Matched Opportunities */}
    <MotionDiv variants={listItem}>
      <div className="relative overflow-hidden rounded-2xl border border-white/70 bg-white/75 backdrop-blur-xl shadow-[0_8px_30px_-12px_rgba(26,31,54,0.10)] before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white before:to-transparent hover:-translate-y-1 hover:shadow-[0_16px_40px_-14px_rgba(26,31,54,0.18)] transition-all duration-300">
        <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full blur-2xl opacity-60 bg-accent/15" />
        <MatchedOpportunities jobs={data.matched_opportunities} />
      </div>
    </MotionDiv>
  </MotionDiv>
  </div>
</WorkerLayout>
  );
}
