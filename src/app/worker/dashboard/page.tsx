"use client";

import { useRouter } from "next/navigation";
import { WorkerLayout } from "@/components/layout/WorkerLayout";
import { motion } from "framer-motion";
import {
  Search, ArrowRight, Wallet, Pencil, CreditCard, UserCircle,
  CheckCircle2, AlertTriangle, FileCheck, Code2, ShieldCheck, Palette,
  Clock, Briefcase, MapPin, DollarSign,
} from "lucide-react";

export default function WorkerDashboardPage() {
  const router = useRouter();

  return (
    <WorkerLayout>
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-[#2563EB]/10 to-transparent rounded-full -translate-y-1/3 translate-x-1/3" />
              <p className="text-sm text-gray-500 mb-1">Good morning, Oluwaseun</p>
              <h3 className="text-lg font-bold text-gray-800 mb-6">Trust Score</h3>
              <div className="flex items-center justify-center py-4">
                <div className="relative w-44 h-44">
                  <svg className="w-44 h-44 -rotate-90" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="50" fill="none" stroke="#E0E7FF" strokeWidth="8" />
                    <circle
                      cx="60" cy="60" r="50" fill="none" stroke="#2563EB" strokeWidth="10"
                      strokeDasharray={`${(98 / 100) * 314} 314`} strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-extrabold text-gray-900">98</span>
                    <span className="text-sm font-bold uppercase tracking-widest text-[#2563EB]">Excellent</span>
                  </div>
                </div>
              </div>
              <p className="text-center text-sm text-gray-500 mt-4 max-w-xs mx-auto">
                You are in the top 2% of workers globally.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Verification Checklist</h3>
                  <p className="text-sm text-red-500 mt-1 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" />
                    Actions required to maintain "Verified" status
                  </p>
                </div>
                <span className="px-4 py-1.5 rounded-full bg-red-50 text-red-600 text-xs font-bold border border-red-100">
                  Urgent
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-[#F0F5FF] border border-[#E0E7FF]">
                  <div className="flex items-start sm:items-center gap-4 flex-1">
                    <div className="w-10 h-10 rounded-lg bg-white border border-[#E0E7FF] flex items-center justify-center text-[#2563EB] shrink-0">
                      <UserCircle className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-bold text-gray-900 text-sm truncate">Biometric Identity Update</h4>
                      <p className="text-xs text-gray-500 mt-0.5">Update your face-match verification for the new quarter.</p>
                    </div>
                  </div>
                  <button className="w-full sm:w-auto px-5 py-2.5 bg-[#2563EB] text-white text-xs font-bold rounded-lg hover:bg-[#1D4ED8] transition-colors text-center shrink-0">
                    Start
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border border-gray-100 bg-gray-50/50">
                  <div className="flex items-start sm:items-center gap-4 flex-1">
                    <div className="w-10 h-10 rounded-lg bg-white border border-green-100 flex items-center justify-center text-green-600 shrink-0">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-bold text-gray-900 text-sm truncate">Phone Number Verified</h4>
                      <p className="text-xs text-gray-500 mt-0.5">Successfully linked to +234 ••• ••• 44</p>
                    </div>
                  </div>
                  <div className="flex justify-end sm:block shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border border-gray-100 bg-gray-50/50">
                  <div className="flex items-start sm:items-center gap-4 flex-1">
                    <div className="w-10 h-10 rounded-lg bg-white border border-[#E0E7FF] flex items-center justify-center text-[#2563EB] shrink-0">
                      <FileCheck className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-bold text-gray-900 text-sm truncate">Bank Account Link</h4>
                      <p className="text-xs text-gray-500 mt-0.5">Required for withdrawal to USD accounts.</p>
                    </div>
                  </div>
                  <button className="w-full sm:w-auto px-5 py-2.5 bg-white text-[#2563EB] text-xs font-bold rounded-lg border-2 border-[#2563EB] hover:bg-[#F0F5FF] transition-colors text-center shrink-0">
                    Connect
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8">
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-bold text-gray-900">Earnings Performance</h3>
                <div className="flex items-center bg-[#F0F5FF] rounded-xl p-1">
                  <button className="px-5 py-2 text-xs font-bold rounded-lg bg-white text-gray-900 shadow-sm">
                    Week
                  </button>
                  <button className="px-5 py-2 text-xs font-bold rounded-lg text-gray-500">
                    Month
                  </button>
                </div>
              </div>

              <div className="h-72 flex items-end justify-around gap-4 px-4">
                {[
                  { day: "Mon", skiloq: 90, market: 70 },
                  { day: "Tue", skiloq: 75, market: 62 },
                  { day: "Wed", skiloq: 78, market: 55 },
                  { day: "Thu", skiloq: 68, market: 88 },
                  { day: "Fri", skiloq: 92, market: 72 },
                  { day: "Sat", skiloq: 85, market: 65 },
                  { day: "Sun", skiloq: 60, market: 48 },
                ].map((d, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-3">
                    <div className="w-full flex items-end justify-center gap-1.5 h-56">
                      <div
                        className="w-6 bg-[#2563EB] rounded-t-md transition-all"
                        style={{ height: `${d.skiloq * 2}px` }}
                      />
                      <div
                        className="w-6 bg-[#C7D2FE] rounded-t-md transition-all"
                        style={{ height: `${d.market * 2}px` }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-gray-500">{d.day}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-center gap-8 mt-8">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#2563EB]" />
                  <span className="text-sm font-semibold text-gray-600">Skiloq Platform</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#C7D2FE]" />
                  <span className="text-sm font-semibold text-gray-600">Market Average</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-4">
            <div
              onClick={() => router.push("/worker/wallet")}
              className="bg-[#1A1F36] rounded-2xl p-6 text-white cursor-pointer hover:shadow-2xl hover:scale-[1.01] transition-all group"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <Wallet className="w-5 h-5" />
                </div>
                <ArrowRight className="w-6 h-6 text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>
              <h3 className="text-xl font-bold mb-1">Withdraw</h3>
              <p className="text-sm text-gray-400">Current balance: <span className="text-white font-semibold">$12,450.00</span></p>
            </div>

            <div
              onClick={() => router.push("/worker/opportunities")}
              className="bg-[#2563EB] rounded-2xl p-6 text-white cursor-pointer hover:shadow-2xl hover:scale-[1.01] transition-all group"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
                  <Search className="w-5 h-5" />
                </div>
                <Search className="w-6 h-6 text-white/50 group-hover:text-white transition-all" />
              </div>
              <h3 className="text-xl font-bold mb-1">Find New Jobs</h3>
              <p className="text-sm text-white/70">34 matched opportunities today</p>
            </div>

            <div
              onClick={() => router.push("/worker/profile")}
              className="bg-[#DBEAFE] rounded-2xl p-6 cursor-pointer hover:shadow-2xl hover:scale-[1.01] transition-all group"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#2563EB]">
                  <Pencil className="w-5 h-5" />
                </div>
                <Pencil className="w-6 h-6 text-[#2563EB]/50 group-hover:text-[#2563EB] transition-all" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">Update Portfolio</h3>
              <p className="text-sm text-gray-600">Boost your trust score by 2%</p>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">Active Jobs</h3>
            <button
              onClick={() => router.push("/worker/opportunities")}
              className="text-sm font-bold text-[#2563EB] hover:underline"
            >
              View All
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="font-bold text-lg text-gray-900">Fintech UI Redesign</h4>
                  <p className="text-sm text-gray-500 mt-1">Client: Nexus Global Finance</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#EEF2FF] text-[#6366F1] text-xs font-bold">
                  In Progress
                </span>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-gray-600">Milestone 3 of 5</span>
                  <span className="text-xs font-bold text-gray-700">60%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
                  <div className="h-full rounded-full bg-[#2563EB]" style={{ width: "60%" }} />
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Clock className="w-4 h-4" />
                <span className="font-medium text-gray-700">Next: Final Prototype Handover (Due in 3 days)</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="font-bold text-lg text-gray-900">AWS Cloud Migration</h4>
                  <p className="text-sm text-gray-500 mt-1">Client: Heritage Bank PLC</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#FEF3C7] text-[#D97706] text-xs font-bold">
                  Pending Approval
                </span>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-gray-600">Milestone 5 of 5</span>
                  <span className="text-xs font-bold text-gray-700">95%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
                  <div className="h-full rounded-full bg-[#2563EB]" style={{ width: "95%" }} />
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Clock className="w-4 h-4" />
                <span className="font-medium text-gray-700">Action: Client reviewing final deployment scripts.</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">Matched Opportunities</h3>
            <button className="text-sm font-bold text-[#2563EB] hover:underline flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              Verified Only
            </button>
          </div>

          <div className="space-y-3">
            {[
              {
                title: "Senior React Developer for Healthcare Portal",
                tags: ["React", "Node.js"],
                type: "Full-time",
                budget: "$4,500 - $6,000",
                icon: Code2,
                match: null,
              },
              {
                title: "Cybersecurity Audit - Banking Infrastructure",
                tags: [],
                type: "Fixed Price",
                budget: "$12,000",
                icon: ShieldCheck,
                match: "95% MATCH",
              },
              {
                title: "Brand Identity for Emerging Tech Startup",
                tags: ["Figma"],
                type: "1 Month Contract",
                budget: "$2,200",
                icon: Palette,
                match: null,
              },
            ].map((job, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-200 p-5 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5 hover:shadow-lg hover:border-[#DBEAFE] transition-all">
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[#F0F5FF] flex items-center justify-center text-[#2563EB] shrink-0">
                    <job.icon className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-900 mb-1.5 text-sm sm:text-base truncate">{job.title}</h4>
                    <div className="flex items-center gap-3 sm:gap-4 text-xs text-gray-500 flex-wrap">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {job.type}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-3.5 h-3.5" />
                        {job.budget}
                      </span>
                      {job.tags.length > 0 && (
                        <div className="flex items-center gap-1.5">
                          {job.tags.map((tag) => (
                            <span key={tag} className="px-2 py-0.5 rounded-lg bg-gray-100 text-gray-600 font-semibold text-[10px]">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 pt-3 sm:pt-0 border-t border-gray-50 sm:border-0 shrink-0">
                  {job.match && (
                    <span className="px-3 py-1 rounded-full bg-green-50 text-green-600 text-xs font-bold">
                      {job.match}
                    </span>
                  )}
                  <button
                    onClick={() => router.push("/worker/opportunities")}
                    className="w-full sm:w-auto px-5 py-2.5 bg-[#2563EB] text-white text-xs font-bold rounded-lg hover:bg-[#1D4ED8] transition-colors shadow-[0_4px_12px_-2px_rgba(37,99,235,0.4)] text-center"
                  >
                    Apply
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-6">
            <button
              onClick={() => router.push("/worker/opportunities")}
              className="text-sm font-bold text-[#2563EB] hover:underline"
            >
              View 28 More Opportunities
            </button>
          </div>
        </div>
      </div>
    </WorkerLayout>
  );
}
