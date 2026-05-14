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
  <MotionDiv variants={listContainer} initial="hidden" animate="show" className="space-y-6">
    {/* Welcome */}
    <MotionDiv variants={listItem} className="pb-1">
      <h1 className="text-xl font-bold tracking-tight text-primary">Dashboard</h1>
      <p className="text-sm text-primary-300 mt-0.5">
        Welcome back. Your Trust Score is{" "}
        <span className="font-semibold text-accent">{data.trust_score}/100</span>.
      </p>
    </MotionDiv>

    {/* Verification */}
    {!data.verification_checklist.all_verified && (
      <MotionDiv variants={listItem}>
        <VerificationChecklist checklist={data.verification_checklist} />
      </MotionDiv>
    )}

    {/* Trust Score + Earnings in a row on desktop */}
    <MotionDiv variants={listItem} className="grid sm:grid-cols-2 gap-5">
      <TrustScoreRing score={data.trust_score} breakdown={data.trust_score_breakdown} />
      <EarningsSummary earnings={data.earnings} />
    </MotionDiv>

    {/* Active Jobs */}
    <MotionDiv variants={listItem}>
      <ActiveJobsList jobs={data.active_jobs} />
    </MotionDiv>

    {/* Matched Opportunities */}
    <MotionDiv variants={listItem}>
      <MatchedOpportunities jobs={data.matched_opportunities} />
    </MotionDiv>
  </MotionDiv>
</WorkerLayout>
  );
}
