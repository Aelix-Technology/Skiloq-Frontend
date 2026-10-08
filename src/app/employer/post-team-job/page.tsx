// src/app/employer/post-team-job/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { EmployerLayout } from "@/components/layout/EmployerLayout";
import {
  Users, Plus, Trash2, ArrowLeft, Building2, Calendar, MapPin,
  DollarSign, ShieldCheck, CheckCircle2, Sparkles, AlertCircle
} from "lucide-react";
import type { WorkerCategory } from "@/types/onboarding";
import { toast } from "sonner";

interface NewTeamRole {
  id: string;
  roleTitle: string;
  category: WorkerCategory;
  headcountNeeded: number;
  dailyRateGhs: number;
  skills: string;
}

export default function PostTeamJobPage() {
  const router = useRouter();
  const [projectTitle, setProjectTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("Accra, Ghana");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [durationDays, setDurationDays] = useState(5);
  const [poReference, setPoReference] = useState("");
  const [isNgoContract, setIsNgoContract] = useState(false);

  const [roles, setRoles] = useState<NewTeamRole[]>([
    {
      id: "r-1",
      roleTitle: "Lead Event Electrician",
      category: "trade",
      headcountNeeded: 2,
      dailyRateGhs: 600,
      skills: "Electrical, Lighting",
    },
    {
      id: "r-2",
      roleTitle: "Stage Technical Handlers",
      category: "trade",
      headcountNeeded: 4,
      dailyRateGhs: 400,
      skills: "Carpentry, General Trade",
    },
    {
      id: "r-3",
      roleTitle: "Live Transcriptionists",
      category: "online_income",
      headcountNeeded: 2,
      dailyRateGhs: 450,
      skills: "Transcription, Fast Typing",
    },
  ]);

  const handleAddRole = () => {
    const newRole: NewTeamRole = {
      id: `r-${Date.now()}`,
      roleTitle: "",
      category: "trade",
      headcountNeeded: 2,
      dailyRateGhs: 400,
      skills: "",
    };
    setRoles([...roles, newRole]);
  };

  const handleRemoveRole = (id: string) => {
    if (roles.length <= 1) return;
    setRoles(roles.filter((r) => r.id !== id));
  };

  const handleUpdateRole = (id: string, updates: Partial<NewTeamRole>) => {
    setRoles(roles.map((r) => (r.id === id ? { ...r, ...updates } : r)));
  };

  const totalHeadcount = roles.reduce((acc, r) => acc + (Number(r.headcountNeeded) || 0), 0);
  const grossDailyCost = roles.reduce(
    (acc, r) => acc + (Number(r.headcountNeeded) || 0) * (Number(r.dailyRateGhs) || 0),
    0
  );
  const grossTotalBudget = grossDailyCost * durationDays;
  // 5% corporate volume incentive for 8+ workers
  const volumeDiscountPercent = totalHeadcount >= 8 ? 5 : 0;
  const discountGhs = (grossTotalBudget * volumeDiscountPercent) / 100;
  const netEscrowBudget = grossTotalBudget - discountGhs;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectTitle || !companyName) {
      toast.error("Please fill in project title and company name");
      return;
    }

    toast.success("Enterprise Team Requirement Published!", {
      description: `Matching algorithm initiated for ${totalHeadcount} positions across ${roles.length} roles.`,
    });

    setTimeout(() => {
      router.push("/employer/teams");
    }, 1500);
  };

  return (
    <EmployerLayout>
      <div className="max-w-4xl mx-auto space-y-8 pb-12">
        {/* Top Back Link */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Post Multi-Worker Team Project
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              Assemble coordinated teams with consolidated escrow & single corporate invoice
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Project Details Section */}
          <div className="bg-white rounded-3xl border border-gray-200/90 shadow-sm p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-2 pb-4 border-b border-gray-100">
              <Building2 className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-bold text-gray-900">Project & Corporate Details</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                  Corporate / Client Organization <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Standard Chartered Bank / UNICEF"
                  required
                  className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                  Project Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  placeholder="e.g. Regional Branch Electrical Upgrade Crew"
                  required
                  className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                Work Scope & Deliverables
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe team shift times, on-site supervision guidelines, equipment requirements, safety PPE needed, and key deliverables..."
                rows={3}
                className="w-full bg-gray-50/50 border border-gray-200 rounded-xl p-4 text-sm text-gray-900 focus:outline-none focus:border-blue-600 focus:bg-white resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                  Project Location
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Ridge Business District, Accra"
                  className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                  Duration (Days)
                </label>
                <input
                  type="number"
                  min={1}
                  max={90}
                  value={durationDays}
                  onChange={(e) => setDurationDays(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                  PO / Billing Reference
                </label>
                <input
                  type="text"
                  value={poReference}
                  onChange={(e) => setPoReference(e.target.value)}
                  placeholder="e.g. PO-CORP-2026-99"
                  className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-blue-600 focus:bg-white font-mono"
                />
              </div>
            </div>
          </div>

          {/* Role Requirements Builder */}
          <div className="bg-white rounded-3xl border border-gray-200/90 shadow-sm p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Crew Roles & Quotas</h2>
                  <p className="text-xs text-gray-500">Specify each required skill position, headcount, and daily wage</p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleAddRole}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Position
              </button>
            </div>

            <div className="space-y-4">
              {roles.map((role, idx) => (
                <div
                  key={role.id}
                  className="p-5 rounded-2xl bg-gray-50/80 border border-gray-200 space-y-3 relative group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-blue-600 uppercase tracking-wider">
                      Role #{idx + 1}
                    </span>
                    {roles.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveRole(role.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                    <div className="sm:col-span-5">
                      <label className="block text-[11px] font-bold text-gray-600 mb-1">
                        Role Title
                      </label>
                      <input
                        type="text"
                        value={role.roleTitle}
                        onChange={(e) => handleUpdateRole(role.id, { roleTitle: e.target.value })}
                        placeholder="e.g. Senior Electrician"
                        required
                        className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2 text-sm text-gray-900 focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div className="sm:col-span-3">
                      <label className="block text-[11px] font-bold text-gray-600 mb-1">
                        Domain
                      </label>
                      <select
                        value={role.category}
                        onChange={(e) =>
                          handleUpdateRole(role.id, { category: e.target.value as WorkerCategory })
                        }
                        className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-blue-500"
                      >
                        <option value="trade">Trade & Artisan</option>
                        <option value="digital">Digital & Tech</option>
                        <option value="educator">Educator / Training</option>
                        <option value="online_income">Online Income / Tasks</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-bold text-gray-600 mb-1">
                        Headcount
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={50}
                        value={role.headcountNeeded}
                        onChange={(e) =>
                          handleUpdateRole(role.id, {
                            headcountNeeded: Math.max(1, parseInt(e.target.value) || 1),
                          })
                        }
                        className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm text-center text-gray-900 focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-bold text-gray-600 mb-1">
                        Daily Rate (GHS)
                      </label>
                      <input
                        type="number"
                        min={50}
                        step={10}
                        value={role.dailyRateGhs}
                        onChange={(e) =>
                          handleUpdateRole(role.id, {
                            dailyRateGhs: Math.max(50, parseInt(e.target.value) || 50),
                          })
                        }
                        className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm text-right text-gray-900 focus:outline-none focus:border-blue-500 font-semibold"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Consolidated Escrow Summary Card */}
          <div className="bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold">Consolidated Escrow Calculation</h3>
              </div>
              <span className="text-xs font-mono text-emerald-300 bg-emerald-500/20 px-2.5 py-1 rounded-full border border-emerald-400/30">
                100% Milestone Protected
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-gray-400">Total Crew Size:</span>
                <p className="text-xl font-extrabold text-white mt-0.5">{totalHeadcount} Workers</p>
              </div>
              <div>
                <span className="text-gray-400">Engagement Duration:</span>
                <p className="text-xl font-extrabold text-white mt-0.5">{durationDays} Days</p>
              </div>
              <div>
                <span className="text-gray-400">Daily Crew Payroll:</span>
                <p className="text-xl font-extrabold text-white mt-0.5">GHS {grossDailyCost.toLocaleString()}</p>
              </div>
              <div>
                <span className="text-gray-400">Corporate Volume Discount:</span>
                <p className="text-xl font-extrabold text-emerald-400 mt-0.5">
                  {volumeDiscountPercent > 0 ? `-${volumeDiscountPercent}% (GHS ${discountGhs.toLocaleString()})` : "0% (Add 8+ crew)"}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs text-gray-300">Net Escrow Deposit Required:</span>
                <h2 className="text-3xl font-black text-white tracking-tight">
                  GHS {netEscrowBudget.toLocaleString()}
                </h2>
              </div>

              <button
                type="submit"
                className="px-8 py-4 rounded-2xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-extrabold text-sm shadow-[0_8px_25px_-6px_rgba(37,99,235,0.7)] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Publish & Assemble Crew
              </button>
            </div>
          </div>
        </form>
      </div>
    </EmployerLayout>
  );
}
