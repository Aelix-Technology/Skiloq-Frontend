"use client";

import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import {
  Clock, CheckCircle2, XCircle, FileText, User, Search, Shield,
  AlertTriangle, ChevronDown, ListFilter, LayoutGrid,
} from "lucide-react";
import { toast } from "sonner";

const filterTabs = [
  { label: "All Cases", key: "all", count: 24 },
  { label: "Identity", key: "identity", count: 12 },
  { label: "Portfolio", key: "portfolio", count: 8 },
  { label: "Agent Visit", key: "agent_visit", count: 4 },
] as const;
type FilterTab = typeof filterTabs[number]["key"];

export default function VerificationQueuePage() {
  const [filter, setFilter] = useState<FilterTab>("all");

  const handleApprove = () => toast.success("Verification approved");
  const handleReject = () => toast.success("Verification rejected");

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3 overflow-x-auto pb-1">
            {filterTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`px-6 py-3 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                  filter === tab.key
                    ? "bg-[#2563EB] text-white shadow-[0_8px_24px_-8px_rgba(37,99,235,0.6)]"
                    : "text-gray-600 hover:text-gray-900 hover:bg-white"
                }`}
              >
                {tab.label} {tab.count && `(${tab.count})`}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button className="w-11 h-11 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
              <ListFilter className="w-5 h-5" />
            </button>
            <button className="w-11 h-11 rounded-xl bg-white border-2 border-[#2563EB] flex items-center justify-center text-[#2563EB] transition-colors">
              <LayoutGrid className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <div className="p-8 border-r border-gray-100 border-b lg:border-b-0">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <span className="px-3 py-1.5 rounded-lg bg-[#2563EB] text-white text-xs font-bold uppercase tracking-wider">
                    Identity Document
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">OCR Confidence</p>
                  <p className="text-2xl font-extrabold text-green-600">98.4%</p>
                </div>
              </div>

              <div className="relative rounded-2xl overflow-hidden border border-gray-200 mb-6 bg-gray-50">
                <img
                  src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800&h=500&fit=crop"
                  alt="Kenya ID Card"
                  className="w-full h-64 object-cover"
                />
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-[#F0F5FF] border border-[#DBEAFE]">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">OCR Extracted Name</p>
                  <p className="font-bold text-gray-900">AMARA CHIDIMMA OKORO</p>
                </div>
                <div className="p-4 rounded-xl bg-[#F0F5FF] border border-[#DBEAFE]">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">Document Number</p>
                  <p className="font-bold text-gray-900">NGA-4491-002-X</p>
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="flex items-start justify-between mb-8">
                <div className="flex items-start gap-4">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=faces"
                    alt="Amara Okoro"
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-gray-100"
                  />
                  <div>
                    <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight">Amara Okoro</h3>
                    <p className="text-base text-gray-500 mt-1">Full-Stack Developer • Lagos, NG</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-red-500 uppercase tracking-wider mb-1.5">SLA Deadline</p>
                  <div className="flex items-center gap-2 justify-end">
                    <Clock className="w-5 h-5 text-red-500" />
                    <p className="text-2xl font-extrabold text-red-500">04:09</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between p-5 rounded-xl border border-gray-100">
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-500 mb-1">Profile Name Match</p>
                    <p className="text-lg font-extrabold text-gray-900">Amara Okoro</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center ml-4 shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                  </div>
                </div>

                <div className="flex items-center justify-between p-5 rounded-xl border border-red-200 bg-red-50/50">
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-500 mb-1">DOB Match (1994 vs 1995)</p>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-red-500" />
                      <p className="text-lg font-extrabold text-red-600">Discrepancy Found</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-2xl border-2 border-dashed border-[#DBEAFE] bg-[#F0F5FF]/40 mb-8">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-[#2563EB] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-gray-900 mb-3">Review Notes</p>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p><span className="font-semibold text-gray-800">System:</span> Face similarity score: 92%</p>
                      <p><span className="font-semibold text-gray-800">System:</span> IP Address matches registration city (Lagos).</p>
                      <p><span className="font-semibold text-gray-800">Agent:</span> User updated phone number 2 hours ago.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={handleReject}
                  className="flex items-center justify-center gap-3 py-4.5 rounded-2xl border-2 border-red-300 bg-white text-red-600 text-base font-extrabold hover:bg-red-50 transition-all active:scale-[0.98]"
                >
                  <XCircle className="w-6 h-6" />
                  Reject Submission
                </button>
                <button
                  onClick={handleApprove}
                  className="flex items-center justify-center gap-3 py-4.5 rounded-2xl bg-[#2563EB] text-white text-base font-extrabold hover:bg-[#1D4ED8] transition-all shadow-[0_10px_28px_-8px_rgba(37,99,235,0.6)] active:scale-[0.98]"
                >
                  <Shield className="w-6 h-6" />
                  Approve Worker
                </button>
              </div>
            </div>
          </div>

          <div className="p-8 border-t border-gray-100">
            <div className="rounded-2xl border border-gray-200 overflow-hidden">
              <div className="grid grid-cols-12 px-6 py-4 bg-[#F0F5FF] text-xs font-bold uppercase tracking-wider text-gray-500">
                <div className="col-span-5">Worker</div>
                <div className="col-span-2">Type</div>
                <div className="col-span-2">Wait Time</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-1 text-right">Action</div>
              </div>

              <div className="divide-y divide-gray-100">
                {[
                  {
                    name: "John Doe",
                    role: "Architect",
                    loc: "Nairobi",
                    initials: "JD",
                    type: "Portfolio Review",
                    wait: "08m 12s",
                    waitColor: "text-[#2563EB]",
                    status: "In Review",
                    statusColor: "text-amber-600",
                    statusDot: "bg-amber-500",
                  },
                  {
                    name: "Kwame Ansah",
                    role: "Civil Engineer",
                    loc: "Accra",
                    initials: "KA",
                    type: "Agent Visit",
                    wait: "42m 05s",
                    waitColor: "text-red-500",
                    status: "Queued",
                    statusColor: "text-gray-500",
                    statusDot: "bg-gray-400",
                  },
                  {
                    name: "Sarah Musa",
                    role: "UI/UX Designer",
                    loc: "Lagos",
                    initials: "SM",
                    type: "Identity",
                    wait: "02m 44s",
                    waitColor: "text-green-600",
                    status: "Queued",
                    statusColor: "text-gray-500",
                    statusDot: "bg-gray-400",
                  },
                ].map((row, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-12 items-center px-6 py-5 hover:bg-[#F8FAFF] transition-colors cursor-pointer"
                  >
                    <div className="col-span-5 flex items-center gap-4">
                      <div className="w-11 h-11 rounded-full bg-[#F0F5FF] text-[#2563EB] flex items-center justify-center text-sm font-extrabold shrink-0 border-2 border-white shadow-sm">
                        {row.initials}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-extrabold text-gray-900 truncate">{row.name}</p>
                        <p className="text-xs text-gray-500 truncate">{row.role} • {row.loc}</p>
                      </div>
                    </div>
                    <div className="col-span-2">
                      <span className="inline-block px-3 py-1.5 rounded-lg bg-[#F0F5FF] text-[#1E40AF] text-xs font-bold">
                        {row.type}
                      </span>
                    </div>
                    <div className={`col-span-2 text-sm font-bold ${row.waitColor}`}>
                      {row.wait}
                    </div>
                    <div className="col-span-2">
                      <span className={`inline-flex items-center gap-2 text-xs font-bold ${row.statusColor}`}>
                        <span className={`w-2 h-2 rounded-full ${row.statusDot}`} />
                        {row.status}
                      </span>
                    </div>
                    <div className="col-span-1 text-right">
                      <button className="text-sm font-extrabold text-[#2563EB] hover:underline">
                        Review
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center pt-6">
              <button className="text-sm font-bold text-gray-500 hover:text-gray-800 transition-colors">
                Load 12 more tickets
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
