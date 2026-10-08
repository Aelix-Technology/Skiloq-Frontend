// src/app/worker/insurance/page.tsx
"use client";

import { useState } from "react";
import { WorkerLayout } from "@/components/layout/WorkerLayout";
import {
  HeartPulse, ShieldCheck, Check, Plus, AlertCircle, FileText,
  Clock, CheckCircle2, ArrowRight, Shield, Award, Stethoscope,
  X, Upload
} from "lucide-react";
import {
  mockInsurancePolicies,
  mockActiveEnrollment,
  mockInsuranceClaims,
} from "@/lib/mock-phase3";
import type { InsurancePolicy, InsuranceClaim } from "@/types/phase3";
import { toast } from "sonner";

export default function MicroInsurancePage() {
  const [policies] = useState<InsurancePolicy[]>(mockInsurancePolicies);
  const [activeEnrollment, setActiveEnrollment] = useState(mockActiveEnrollment);
  const [claims, setClaims] = useState<InsuranceClaim[]>(mockInsuranceClaims);
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);

  // New claim form state
  const [claimType, setClaimType] = useState<"accident" | "hospital_cash" | "tool_theft">("hospital_cash");
  const [claimAmount, setClaimAmount] = useState("");
  const [incidentDate, setIncidentDate] = useState("2026-10-04");
  const [incidentDescription, setIncidentDescription] = useState("");

  const handleSelectPolicy = (pol: InsurancePolicy) => {
    setActiveEnrollment({
      ...activeEnrollment,
      policyId: pol.id,
      policyName: pol.planName,
      tier: pol.planId,
      monthlyDeductionGhs: pol.monthlyPremiumGhs,
      coverageLimitGhs: pol.totalAccidentCoverageGhs,
    });
    toast.success(`Enrolled in ${pol.planName}!`, {
      description: `Premium of GHS ${pol.monthlyPremiumGhs}/mo will be auto-deducted from your gig earnings.`,
    });
  };

  const handleSubmitClaim = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(claimAmount);
    if (!amount || amount <= 0) {
      toast.error("Please enter a valid claim amount");
      return;
    }

    const newClaim: InsuranceClaim = {
      id: `claim-${Date.now()}`,
      enrollmentId: activeEnrollment.id,
      claimType,
      amountClaimedGhs: amount,
      status: "under_review",
      incidentDate,
      filedAt: "Today",
      incidentDescription,
    };

    setClaims([newClaim, ...claims]);
    setIsClaimModalOpen(false);
    setClaimAmount("");
    setIncidentDescription("");
    toast.success("Insurance claim submitted successfully!", {
      description: "Our underwriting partner will review medical proof and disburse to your MoMo within 48h.",
    });
  };

  return (
    <WorkerLayout>
      <div className="space-y-8 pb-12">
        {/* Hero Banner */}
        <div className="bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden shadow-xl border border-white/10">
          <div className="pointer-events-none absolute -right-20 -top-20 w-72 h-72 rounded-full bg-emerald-500/20 blur-3xl" />
          <div className="pointer-events-none absolute left-1/3 -bottom-20 w-64 h-64 rounded-full bg-blue-500/15 blur-3xl" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/20 text-emerald-300 text-xs font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Underwritten by Licensed Insurers
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                Worker Micro-Insurance & Injury Shield
              </h1>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                Accident protection, hospital daily cash allowances, and gig site tool theft coverage. Embedded micro-premiums automatically deducted from completed milestones with instant MoMo claims.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsClaimModalOpen(true)}
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-all shadow-[0_8px_25px_-6px_rgba(16,185,129,0.5)] cursor-pointer self-start lg:self-center shrink-0"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>File Insurance Claim</span>
            </button>
          </div>

          {/* Active Policy Status Bar */}
          <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 relative z-10 text-xs">
            <div>
              <span className="text-gray-400 block font-medium">Enrolled Plan</span>
              <span className="text-sm sm:text-base font-black text-white mt-0.5 block truncate">
                {activeEnrollment.policyName}
              </span>
            </div>
            <div>
              <span className="text-gray-400 block font-medium">Coverage Limit</span>
              <span className="text-sm sm:text-base font-black text-emerald-400 mt-0.5 block">
                GHS {activeEnrollment.coverageLimitGhs.toLocaleString()}
              </span>
            </div>
            <div>
              <span className="text-gray-400 block font-medium">Monthly Premium</span>
              <span className="text-sm sm:text-base font-black text-white mt-0.5 block">
                GHS {activeEnrollment.monthlyDeductionGhs}/mo
              </span>
            </div>
            <div>
              <span className="text-gray-400 block font-medium">Policy Status</span>
              <span className="inline-flex items-center gap-1 text-emerald-400 font-bold mt-0.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> Active Protected
              </span>
            </div>
          </div>
        </div>

        {/* Insurance Tiers Cards */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Available Protection Tiers</h2>
              <p className="text-xs text-gray-500">Select the coverage level tailored to your trade and gig risk profile</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {policies.map((pol) => {
              const isSelected = activeEnrollment.tier === pol.planId;
              return (
                <div
                  key={pol.id}
                  className={`bg-white rounded-3xl p-6 border-2 transition-all flex flex-col justify-between space-y-5 ${
                    isSelected
                      ? "border-emerald-600 shadow-lg shadow-emerald-600/10 ring-1 ring-emerald-500/20"
                      : "border-gray-200/90 hover:border-gray-300"
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                        {pol.underwritingPartner}
                      </span>
                      {isSelected && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          Active Plan
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{pol.planName}</h3>
                      <div className="flex items-baseline gap-1 mt-2">
                        <span className="text-3xl font-black text-gray-900">GHS {pol.monthlyPremiumGhs}</span>
                        <span className="text-xs text-gray-500">/ month</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-2xl bg-emerald-50/50 border border-emerald-100 text-xs text-emerald-900 space-y-1">
                      <div className="flex justify-between font-semibold">
                        <span>Max Accident Cover:</span>
                        <span>GHS {pol.totalAccidentCoverageGhs.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between font-semibold">
                        <span>Daily Hospital Cash:</span>
                        <span>GHS {pol.dailyHospitalCashGhs} / day</span>
                      </div>
                      {pol.toolsTheftCoverageGhs > 0 && (
                        <div className="flex justify-between font-semibold">
                          <span>Tool & Gear Theft:</span>
                          <span>GHS {pol.toolsTheftCoverageGhs.toLocaleString()}</span>
                        </div>
                      )}
                    </div>

                    <ul className="space-y-2 text-xs text-gray-600">
                      {pol.benefits.map((b, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5 stroke-[2.5]" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSelectPolicy(pol)}
                    className={`w-full py-3 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                      isSelected
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-sm"
                    }`}
                  >
                    {isSelected ? "Current Policy" : "Switch to this Policy"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Claims History */}
        <div className="bg-white rounded-3xl border border-gray-200/90 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <div className="flex items-center gap-2.5">
              <FileText className="w-5 h-5 text-blue-600" />
              <div>
                <h2 className="text-lg font-bold text-gray-900">Claims History & Disbursements</h2>
                <p className="text-xs text-gray-500">Direct payouts sent straight to your registered Mobile Money wallet</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsClaimModalOpen(true)}
              className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> New Claim
            </button>
          </div>

          <div className="space-y-3">
            {claims.map((claim) => (
              <div
                key={claim.id}
                className="p-5 rounded-2xl border border-gray-200 bg-gray-50/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-gray-900 capitalize">
                      {claim.claimType.replace("_", " ")} Claim
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        claim.status === "disbursed"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-blue-50 text-blue-700 border border-blue-200"
                      }`}
                    >
                      {claim.status === "disbursed" ? "Paid Out to MoMo" : "Under Review"}
                    </span>
                  </div>

                  <p className="text-xs text-gray-600">{claim.incidentDescription}</p>
                  <p className="text-[11px] text-gray-400">
                    Incident Date: {claim.incidentDate} • Filed: {claim.filedAt}
                  </p>
                </div>

                <div className="text-left sm:text-right shrink-0">
                  <span className="text-xs text-gray-400 block font-medium">Claim Amount</span>
                  <span className="text-lg font-extrabold text-gray-900 block">
                    GHS {claim.amountClaimedGhs.toFixed(2)}
                  </span>
                  {claim.payoutDate && (
                    <span className="text-[11px] text-emerald-600 font-semibold block">
                      Disbursed on {claim.payoutDate}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Claim Submission Modal */}
        {isClaimModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-150">
            <div className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl border border-gray-100">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Stethoscope className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-lg font-bold text-gray-900">File Insurance Claim</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsClaimModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSubmitClaim} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                    Claim Category
                  </label>
                  <select
                    value={claimType}
                    onChange={(e) => setClaimType(e.target.value as any)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500"
                  >
                    <option value="hospital_cash">Hospital Cash (Inpatient Admission)</option>
                    <option value="accident">Accident Emergency Medical Expense</option>
                    <option value="tool_theft">Site Tool / Equipment Theft</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                      Amount Claimed (GHS)
                    </label>
                    <input
                      type="number"
                      value={claimAmount}
                      onChange={(e) => setClaimAmount(e.target.value)}
                      placeholder="e.g. 450"
                      required
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500 font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                      Incident Date
                    </label>
                    <input
                      type="date"
                      value={incidentDate}
                      onChange={(e) => setIncidentDate(e.target.value)}
                      required
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                    Incident Description & Hospital Name
                  </label>
                  <textarea
                    value={incidentDescription}
                    onChange={(e) => setIncidentDescription(e.target.value)}
                    placeholder="Describe what occurred, attending medical facility or police station..."
                    rows={3}
                    required
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm text-gray-900 focus:outline-none focus:border-blue-500 resize-none"
                  />
                </div>

                <div className="p-4 rounded-xl border border-dashed border-gray-300 text-center text-xs text-gray-500 bg-gray-50/50">
                  <Upload className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                  <span>Attach hospital discharge summary, pharmacy receipt, or incident report</span>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsClaimModalOpen(false)}
                    className="px-4 py-2.5 text-xs font-bold text-gray-500 hover:text-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
                  >
                    Submit Claim
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </WorkerLayout>
  );
}
