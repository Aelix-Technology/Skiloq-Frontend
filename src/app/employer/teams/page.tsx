// src/app/employer/teams/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { EmployerLayout } from "@/components/layout/EmployerLayout";
import {
  Users, Plus, Calendar, MapPin, ShieldCheck, CheckCircle2,
  Clock, DollarSign, Building2, ChevronRight, Phone, Award,
  Sparkles, Filter, FileText, Download, Check
} from "lucide-react";
import { mockEnterpriseProjects, mockTeamMembers } from "@/lib/mock-phase3";
import type { EnterpriseTeamProject } from "@/types/phase3";
import { toast } from "sonner";

export default function EnterpriseTeamsPage() {
  const router = useRouter();
  const [projects] = useState<EnterpriseTeamProject[]>(mockEnterpriseProjects);
  const [selectedProjectId, setSelectedProjectId] = useState<string>(mockEnterpriseProjects[0].id);

  const selectedProject = projects.find((p) => p.id === selectedProjectId) || projects[0];

  const handleDownloadInvoice = () => {
    toast.success("Corporate Invoice Generated", {
      description: `Consolidated tax invoice for ${selectedProject.companyName} downloaded.`,
    });
  };

  return (
    <EmployerLayout>
      <div className="space-y-8">
        {/* Top Hero Banner */}
        <div className="bg-gradient-to-br from-[#0B0F19] via-[#111827] to-[#1E293B] rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden shadow-xl border border-white/10">
          <div className="pointer-events-none absolute -right-20 -top-20 w-72 h-72 rounded-full bg-blue-600/20 blur-3xl" />
          <div className="pointer-events-none absolute left-1/3 -bottom-20 w-64 h-64 rounded-full bg-indigo-500/15 blur-3xl" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-bold">
                <Building2 className="w-3.5 h-3.5" />
                Enterprise & Team Procurement
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                Assembled Multi-Worker Crews & Corporate Teams
              </h1>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                Post high-volume requirements for construction crews, event personnel, survey enumerators, and tech teams. Consolidated escrow, supervisor logs, and single-invoice corporate settlement.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <button
                type="button"
                onClick={() => router.push("/employer/post-team-job")}
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-sm transition-all shadow-[0_8px_25px_-6px_rgba(37,99,235,0.6)] cursor-pointer"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span>Post Team Requirement</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadInvoice}
                className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm transition-all border border-white/15 cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>Consolidated Statement</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-white/10 relative z-10 text-xs">
            <div>
              <span className="text-gray-400 block font-medium">Active Crew Projects</span>
              <span className="text-xl sm:text-2xl font-black text-white mt-0.5 block">2 Enterprise</span>
            </div>
            <div>
              <span className="text-gray-400 block font-medium">Assembled Headcount</span>
              <span className="text-xl sm:text-2xl font-black text-emerald-400 mt-0.5 block">18 Verified Pros</span>
            </div>
            <div>
              <span className="text-gray-400 block font-medium">Total Escrow Backing</span>
              <span className="text-xl sm:text-2xl font-black text-white mt-0.5 block">GHS 87,700</span>
            </div>
            <div>
              <span className="text-gray-400 block font-medium">Check-In Compliance</span>
              <span className="text-xl sm:text-2xl font-black text-blue-400 mt-0.5 block">96.4% Verified</span>
            </div>
          </div>
        </div>

        {/* Projects Selector Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Active Crew Engagements</h2>
            <span className="text-xs text-gray-500">Showing {projects.length} team projects</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((proj) => {
              const isSelected = proj.id === selectedProjectId;
              const percentAssembled = Math.round((proj.assembledCrewSize / proj.totalCrewSize) * 100);

              return (
                <div
                  key={proj.id}
                  onClick={() => setSelectedProjectId(proj.id)}
                  className={`p-6 rounded-3xl border-2 transition-all cursor-pointer relative bg-white ${
                    isSelected
                      ? "border-[#2563EB] shadow-md shadow-blue-500/10 ring-1 ring-blue-500/20"
                      : "border-gray-200/80 hover:border-gray-300 hover:shadow-sm"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block">
                        {proj.companyName}
                      </span>
                      <h3 className="text-lg font-bold text-gray-900 mt-0.5">
                        {proj.projectTitle}
                      </h3>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        proj.status === "in_progress"
                          ? "bg-blue-50 text-blue-700 border border-blue-200"
                          : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      }`}
                    >
                      {proj.status === "in_progress" ? "In Execution" : "Crew Assembled"}
                    </span>
                  </div>

                  <p className="text-xs text-gray-500 line-clamp-2 mb-4 leading-relaxed">
                    {proj.description}
                  </p>

                  {/* Progress bar */}
                  <div className="space-y-1.5 mb-4">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-gray-700">
                        Crew Assembly: {proj.assembledCrewSize} of {proj.totalCrewSize} spots filled
                      </span>
                      <span className="text-blue-600">{percentAssembled}%</span>
                    </div>
                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 rounded-full transition-all duration-500"
                        style={{ width: `${percentAssembled}%` }}
                      />
                    </div>
                  </div>

                  {/* Footer tags */}
                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-gray-400" />
                      <span className="truncate max-w-[200px]">{proj.location}</span>
                    </div>
                    <span className="font-extrabold text-gray-900">
                      GHS {proj.totalBudgetGhs.toLocaleString()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Project Breakdown Roster */}
        {selectedProject && (
          <div className="bg-white rounded-3xl border border-gray-200/90 shadow-sm p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-gray-900">
                    Live Team Roster & Check-In Log
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    GPS Geofenced
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Project: <strong className="text-gray-800">{selectedProject.projectTitle}</strong> • Billing Ref: {selectedProject.corporateBillingReference}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => toast.success("Attendance alert broadcast sent to all team members via SMS & App.")}
                  className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-bold text-gray-700 transition-colors"
                >
                  Broadcast Roll Call
                </button>
              </div>
            </div>

            {/* Roles Breakdown */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
                Team Role Quotas & Allocations
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {selectedProject.roles.map((role) => (
                  <div key={role.id} className="p-4 rounded-2xl bg-gray-50 border border-gray-200/80">
                    <span className="text-[10px] font-bold uppercase tracking-wide text-blue-600 block">
                      {role.category}
                    </span>
                    <h5 className="font-bold text-sm text-gray-900 mt-0.5">{role.roleTitle}</h5>
                    <div className="flex items-center justify-between text-xs mt-3 pt-2 border-t border-gray-200/60">
                      <span className="text-gray-500">
                        {role.assignedWorkerIds.length}/{role.headcountNeeded} Placed
                      </span>
                      <span className="font-bold text-gray-800">
                        GHS {role.dailyRatePerWorkerGhs}/day
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Assembled Members Cards */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
                Current Assigned Team Personnel ({mockTeamMembers.length})
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockTeamMembers.map((member) => (
                  <div
                    key={member.id}
                    className="p-4 rounded-2xl border border-gray-200 bg-white shadow-xs flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-12 h-12 rounded-2xl object-cover shrink-0 border border-gray-100"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h5 className="font-bold text-sm text-gray-900 truncate">{member.name}</h5>
                          <span className="inline-flex items-center text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-100">
                            ★ {member.trustScore}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">{member.role}</p>
                        <p className="text-[11px] text-gray-400 font-mono mt-0.5">{member.phone}</p>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 ${
                          member.checkInStatus === "checked_in"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-amber-50 text-amber-700 border border-amber-200"
                        }`}
                      >
                        {member.checkInStatus === "checked_in" ? (
                          <>
                            <Check className="w-3 h-3" /> Checked In
                          </>
                        ) : (
                          <>
                            <Clock className="w-3 h-3" /> Pending
                          </>
                        )}
                      </span>
                      <span className="text-xs font-extrabold text-gray-800">
                        GHS {member.earningsGhs.toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </EmployerLayout>
  );
}
