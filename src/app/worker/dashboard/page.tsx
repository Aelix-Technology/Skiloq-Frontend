// src/app/worker/dashboard/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { WorkerLayout } from "@/components/layout/WorkerLayout";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ArrowRight,
  Wallet,
  Pencil,
  CreditCard,
  UserCircle,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  Code2,
  ShieldCheck,
  Palette,
  Clock,
  Briefcase,
  MapPin,
  DollarSign,
  Zap,
  Sparkles,
  Trophy,
  Users,
  PiggyBank,
  Check,
  ExternalLink,
  ChevronRight,
  Radio,
} from "lucide-react";
import { useWorkerDashboard } from "@/hooks/useWorker";
import { TrustScoreRing } from "@/components/dashboard/TrustScoreRing";
import { VerificationChecklist } from "@/components/dashboard/VerificationChecklist";
import { EarningsSummary } from "@/components/dashboard/EarningsSummary";
import { ActiveJobsList } from "@/components/dashboard/ActiveJobsList";
import { MatchedOpportunities } from "@/components/dashboard/MatchedOpportunities";
import { AICoachPanel } from "@/components/dashboard/AICoachPanel";
import { DashboardSkeleton } from "@/components/dashboard/DashboardSkeleton";
import { ErrorState } from "@/components/shared/ErrorState";
import { toast } from "sonner";

export default function WorkerDashboardPage() {
  const router = useRouter();
  const { data: dashboard, isLoading, error, refetch } = useWorkerDashboard();

  // Phase 2: Live Availability Status & Instant Book Toggle (Blueprint page 30)
  const [isAvailableNow, setIsAvailableNow] = useState(true);
  const [instantBookPremium, setInstantBookPremium] = useState(true); // +10% rate premium

  const handleToggleAvailability = () => {
    const nextState = !isAvailableNow;
    setIsAvailableNow(nextState);
    if (nextState) {
      toast.success("Instant Book Active — Available Now!", {
        description: "Clients can book you with one click. You have a 15-minute response window.",
      });
    } else {
      toast.info("Instant Book Paused — Set to Offline");
    }
  };

  if (isLoading) {
    return (
      <WorkerLayout>
        <DashboardSkeleton />
      </WorkerLayout>
    );
  }

  if (error || !dashboard) {
    return (
      <WorkerLayout>
        <ErrorState onRetry={() => refetch()} />
      </WorkerLayout>
    );
  }

  return (
    <WorkerLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Top Worker Status & Live Availability Bar */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-gray-500 font-medium">Welcome back,</span>
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#1A1F36]">
                Oluwaseun Adeyemi
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Verified Expert
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold flex items-center gap-1">
                <Trophy className="w-3 h-3 text-amber-600" />
                #3 Top 10 Accra
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Full-Stack TypeScript & Mobile Architecture • Accra Metropolitan
            </p>
          </div>

          {/* Phase 2: Real-Time Availability Switcher */}
          <div className="flex items-center gap-4 bg-gray-50 p-2.5 rounded-2xl border border-gray-200/80 self-start md:self-auto shrink-0">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${isAvailableNow ? "bg-emerald-500 animate-pulse" : "bg-gray-300"}`} />
              <div className="text-left">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-bold text-gray-900">Available Now</span>
                  <Zap className={`w-3.5 h-3.5 ${isAvailableNow ? "text-amber-500 fill-amber-500" : "text-gray-400"}`} />
                </div>
                <span className="text-[10px] text-gray-500 block">
                  {isAvailableNow ? "Instant Book +10% Active" : "Currently Offline"}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleToggleAvailability}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                isAvailableNow ? "bg-emerald-600" : "bg-gray-300"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  isAvailableNow ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Primary Row: Trust Score Ring & Verification Checklist */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5">
            <TrustScoreRing
              score={dashboard.trust_score}
              breakdown={dashboard.trust_score_breakdown}
            />
          </div>

          <div className="lg:col-span-7">
            <VerificationChecklist checklist={dashboard.verification_checklist} />
          </div>
        </div>

        {/* Phase 2 AI Layer: AI Career Coach */}
        <div>
          <AICoachPanel />
        </div>

        {/* Phase 2 Ecosystem Quick Hub: Savings Vault, Leaderboards, Community */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Quick Hub: Savings Vault */}
          <div
            onClick={() => router.push("/worker/wallet")}
            className="bg-white rounded-3xl p-5 border border-emerald-200/80 hover:border-emerald-400 shadow-sm hover:shadow-md cursor-pointer transition-all group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <PiggyBank className="w-5 h-5" />
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-emerald-700 group-hover:translate-x-1 transition-transform" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">Lock & Earn Vault</span>
            <h4 className="font-extrabold text-lg text-gray-900 mt-0.5">GHS 2,450.00</h4>
            <p className="text-xs text-gray-500 mt-1">Earning 10.5% APY • Round-up ON</p>
          </div>

          {/* Quick Hub: Regional Leaderboards */}
          <div
            onClick={() => router.push("/worker/leaderboards")}
            className="bg-white rounded-3xl p-5 border border-amber-200/80 hover:border-amber-400 shadow-sm hover:shadow-md cursor-pointer transition-all group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                <Trophy className="w-5 h-5" />
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-amber-700 group-hover:translate-x-1 transition-transform" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700">Regional Ranking</span>
            <h4 className="font-extrabold text-lg text-gray-900 mt-0.5">#3 in Accra</h4>
            <p className="text-xs text-gray-500 mt-1">Top 10 Accra verified badge unlocked</p>
          </div>

          {/* Quick Hub: Community Channels */}
          <div
            onClick={() => router.push("/worker/community")}
            className="bg-white rounded-3xl p-5 border border-indigo-200/80 hover:border-indigo-400 shadow-sm hover:shadow-md cursor-pointer transition-all group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold">
                <Users className="w-5 h-5" />
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-indigo-700 group-hover:translate-x-1 transition-transform" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700">Verified Channels</span>
            <h4 className="font-extrabold text-lg text-gray-900 mt-0.5">184 Active Peers</h4>
            <p className="text-xs text-gray-500 mt-1">#developers-accra • 6 new job leads</p>
          </div>
        </div>

        {/* Active Jobs & Phased Milestone Tracker */}
        <div>
          <ActiveJobsList jobs={dashboard.active_jobs} />
        </div>

        {/* Earnings Performance Summary with Platform Benchmark */}
        <div>
          <EarningsSummary earnings={dashboard.earnings} />
        </div>

        {/* Matched Opportunities Feed */}
        <div>
          <MatchedOpportunities jobs={dashboard.matched_opportunities} />
        </div>
      </div>
    </WorkerLayout>
  );
}
