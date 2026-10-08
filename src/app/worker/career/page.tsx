// src/app/worker/career/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { WorkerLayout } from "@/components/layout/WorkerLayout";
import {
  Sparkles, TrendingUp, DollarSign, Award, BookOpen, ArrowRight,
  Target, Zap, Compass, CheckCircle2, ChevronRight, BarChart3,
  Calendar, ShieldCheck
} from "lucide-react";
import { mockAICareerProfile } from "@/lib/mock-phase3";
import { toast } from "sonner";

export default function WorkerAICareerPage() {
  const router = useRouter();
  const [profile] = useState(mockAICareerProfile);

  const earningsDiff =
    profile.projectedAnnualIncomeGhs.withRecommendedUpskilling -
    profile.projectedAnnualIncomeGhs.currentTrajectory;
  const earningsUpliftPercent = Math.round(
    (earningsDiff / profile.projectedAnnualIncomeGhs.currentTrajectory) * 100
  );

  return (
    <WorkerLayout>
      <div className="space-y-8 pb-12">
        {/* Top AI Copilot Banner */}
        <div className="bg-gradient-to-br from-[#1A1F36] via-[#1E2548] to-[#11162B] rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden shadow-xl border border-indigo-500/20">
          <div className="pointer-events-none absolute -right-20 -top-20 w-72 h-72 rounded-full bg-indigo-500/25 blur-3xl" />
          <div className="pointer-events-none absolute left-1/4 -bottom-20 w-64 h-64 rounded-full bg-blue-600/20 blur-3xl" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4F6AF5]/20 text-[#859BFF] border border-[#4F6AF5]/30 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                AI Career Copilot
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                Skill Demand Intelligence & Earnings Forecasting
              </h1>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                Personalized talent market analytics calibrated to your Trust Score and completed jobs. Discover high-demand regional skills and maximize your lifetime earnings potential.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 shrink-0 text-center sm:text-left space-y-1">
              <span className="text-xs text-blue-200 block font-medium">Earning Power Index</span>
              <p className="text-3xl font-black text-white">
                Top {100 - profile.currentEarningPowerPercentile}%
              </p>
              <p className="text-[11px] text-emerald-300 font-semibold flex items-center justify-center sm:justify-start gap-1">
                <TrendingUp className="w-3 h-3" /> Exceeding 82% of regional peers
              </p>
            </div>
          </div>

          {/* Earnings Projection Comparison Meter */}
          <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 relative z-10 text-xs">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-gray-400 block font-medium">Current Projected Annual Income</span>
              <p className="text-2xl font-black text-white mt-1">
                GHS {profile.projectedAnnualIncomeGhs.currentTrajectory.toLocaleString()}
              </p>
              <span className="text-[11px] text-gray-400">Based on past 90 days</span>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-400/20">
              <span className="text-emerald-300 block font-medium">With Recommended Upskilling</span>
              <p className="text-2xl font-black text-emerald-300 mt-1">
                GHS {profile.projectedAnnualIncomeGhs.withRecommendedUpskilling.toLocaleString()}
              </p>
              <span className="text-[11px] text-emerald-400 font-bold">
                +{earningsUpliftPercent}% projected wage expansion
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between">
              <div>
                <span className="text-gray-400 block font-medium">Net Additional Potential</span>
                <p className="text-xl font-black text-white mt-1">
                  +GHS {earningsDiff.toLocaleString()} / year
                </p>
              </div>
              <button
                type="button"
                onClick={() => router.push("/academy")}
                className="mt-2 text-xs font-bold text-blue-400 hover:text-blue-300 inline-flex items-center gap-1"
              >
                Browse Recommended Courses <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Actionable Academy Recommendations */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Recommended Learning Paths</h2>
              <p className="text-xs text-gray-500">Curated specifically based on high-budget employer hiring trends</p>
            </div>
            <button
              onClick={() => router.push("/academy")}
              className="text-xs font-bold text-blue-600 hover:underline"
            >
              View Academy Catalog
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {profile.recommendations.map((rec) => (
              <div
                key={rec.id}
                className="bg-white rounded-3xl border border-gray-200/90 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        rec.urgency === "high"
                          ? "bg-red-50 text-red-700 border border-red-200"
                          : rec.urgency === "medium"
                          ? "bg-amber-50 text-amber-700 border border-amber-200"
                          : "bg-blue-50 text-blue-700 border border-blue-200"
                      }`}
                    >
                      {rec.urgency} Impact
                    </span>

                    <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      +{rec.projectedEarningsIncreasePercent}% Earnings
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-base text-gray-900 group-hover:text-blue-600 transition-colors">
                      {rec.recommendedSkill}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      Builds on: <strong>{rec.relatedCurrentSkill}</strong>
                    </p>
                  </div>

                  <p className="text-xs text-gray-600 leading-relaxed bg-gray-50 p-3 rounded-2xl border border-gray-100">
                    &ldquo;{rec.whyRecommended}&rdquo;
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs text-gray-400 font-medium">
                    ⏱️ {rec.estimatedWeeks} Weeks self-paced
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      toast.success(`Enrolling in ${rec.courseTitle}...`);
                      router.push("/academy");
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all"
                  >
                    <span>Start Course</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Regional Market Demand Trends Feed */}
        <div className="bg-white rounded-3xl border border-gray-200/90 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <div className="flex items-center gap-2.5">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              <div>
                <h2 className="text-lg font-bold text-gray-900">Regional Skill Market Radar</h2>
                <p className="text-xs text-gray-500">Live demand tracking based on last 500 employer postings in Ghana & Nigeria</p>
              </div>
            </div>

            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Updated Today
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {profile.demandTrends.map((trend) => (
              <div
                key={trend.skillId}
                className="p-5 rounded-2xl border border-gray-200 bg-gray-50/50 hover:bg-white transition-all space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-bold text-sm text-gray-900">{trend.skillName}</h4>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      trend.marketOutlook === "surging"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-blue-50 text-blue-700 border border-blue-200"
                    }`}
                  >
                    +{trend.demandGrowthPercent}% Demand
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-gray-200/60">
                  <span className="text-gray-500">Avg Market Rate</span>
                  <span className="font-extrabold text-gray-900">
                    GHS {trend.currentAverageHourlyRateGhs}/hr
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-gray-400">
                  <span>Open Job Postings</span>
                  <span className="font-semibold text-gray-700">{trend.jobPostingsCount} gigs</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </WorkerLayout>
  );
}
