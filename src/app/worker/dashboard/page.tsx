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
  <div className="space-y-5">
    {/* Welcome */}
    <div className="pb-1">
      <h1 className="text-xl font-bold text-primary tracking-tight">Dashboard</h1>
      <p className="text-sm text-primary-300 mt-0.5">
        Welcome back. Your Trust Score is{" "}
        <span className="font-semibold text-accent">{data.trust_score}/100</span>.
      </p>
    </div>

    {/* Verification */}
    {!data.verification_checklist.all_verified && (
      <VerificationChecklist checklist={data.verification_checklist} />
    )}

    {/* Trust Score + Earnings in a row on desktop */}
    <div className="grid sm:grid-cols-2 gap-5">
      <TrustScoreRing score={data.trust_score} breakdown={data.trust_score_breakdown} />
      <EarningsSummary earnings={data.earnings} />
    </div>

    {/* Active Jobs */}
    <ActiveJobsList jobs={data.active_jobs} />

    {/* Matched Opportunities */}
    <MatchedOpportunities jobs={data.matched_opportunities} />
  </div>
</WorkerLayout>
  );
}