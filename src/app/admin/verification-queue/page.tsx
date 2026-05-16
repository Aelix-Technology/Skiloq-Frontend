// src/app/admin/verification-queue/page.tsx
"use client";

import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { useVerificationQueue, useApproveVerification, useRejectVerification } from "@/hooks/useAdmin";
import { motion } from "framer-motion";
import { Clock, Check, X, FileText, User, Search, Shield } from "lucide-react";
import { toast } from "sonner";

const filterTabs = ["all", "identity", "portfolio", "agent_visit"] as const;
type FilterTab = (typeof filterTabs)[number];

export default function VerificationQueuePage() {
  const { data: items, isLoading } = useVerificationQueue();
  const approveMutation = useApproveVerification();
  const rejectMutation = useRejectVerification();

  const [filter, setFilter] = useState<FilterTab>("all");
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  const filtered = items?.filter((item) => filter === "all" || item.type === filter) || [];

  const handleApprove = (id: string) => {
    approveMutation.mutate(id, {
      onSuccess: () => toast.success("Verification approved"),
      onError: () => toast.error("Failed to approve"),
    });
  };

  const handleReject = (id: string) => {
    if (!rejectReason.trim()) {
      toast.error("Please provide a reason for rejection");
      return;
    }
    rejectMutation.mutate({ id, reason: rejectReason }, {
      onSuccess: () => {
        toast.success("Verification rejected");
        setSelectedItem(null);
        setRejectReason("");
      },
      onError: () => toast.error("Failed to reject"),
    });
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="space-y-4 animate-pulse">
          <div className="h-8 w-48 bg-gray-100 rounded-lg" />
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-white rounded-2xl border border-gray-100" />
          ))}
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Verification Queue</h1>
          <p className="text-sm text-gray-500 mt-0.5">{filtered.length} pending verifications</p>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                filter === tab
                  ? "bg-primary text-white"
                  : "bg-white text-gray-500 border border-gray-200 hover:border-gray-300"
              }`}
            >
              {tab === "all" ? "All" : tab.replace("_", " ")}
            </button>
          ))}
        </div>

        {/* Queue list */}
        <div className="grid gap-3">
          {filtered.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`bg-white rounded-2xl border p-5 transition-all ${
                selectedItem === item.id ? "border-accent shadow-md" : "border-gray-100 shadow-sm"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    item.type === "identity" ? "bg-blue-50 text-blue-600" :
                    item.type === "portfolio" ? "bg-purple-50 text-purple-600" :
                    "bg-emerald-50 text-emerald-600"
                  }`}>
                    {item.type === "identity" ? <User className="w-5 h-5" /> :
                     item.type === "portfolio" ? <FileText className="w-5 h-5" /> :
                     <Search className="w-5 h-5" />}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">{item.workerName}</h3>
                    <p className="text-xs text-gray-500 capitalize">{item.type.replace("_", " ")} verification</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${
                    item.slaHoursRemaining < 4 ? "bg-red-50 text-red-600" : "bg-amber-50 text-amber-600"
                  }`}>
                    <Clock className="w-3 h-3" />
                    {item.slaHoursRemaining}h left
                  </span>
                </div>
              </div>

              {/* OCR data for identity */}
              {item.ocrData && (
                <div className="grid grid-cols-2 gap-2 mb-3 p-3 bg-gray-50 rounded-xl text-xs">
                  <div><span className="text-gray-400">Name:</span> <span className="font-medium">{item.ocrData.fullName}</span></div>
                  <div><span className="text-gray-400">ID:</span> <span className="font-medium">{item.ocrData.idNumber}</span></div>
                  <div><span className="text-gray-400">DOB:</span> <span className="font-medium">{item.ocrData.dateOfBirth}</span></div>
                </div>
              )}

              {/* Action buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleApprove(item.id)}
                  disabled={approveMutation.isPending}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-emerald-500 text-white text-sm font-semibold rounded-xl hover:bg-emerald-600 transition-all active:scale-95 disabled:opacity-50"
                >
                  <Check className="w-4 h-4" /> Approve
                </button>
                <button
                  onClick={() => setSelectedItem(selectedItem === item.id ? null : item.id)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-red-50 text-red-600 text-sm font-semibold rounded-xl hover:bg-red-100 transition-all active:scale-95"
                >
                  <X className="w-4 h-4" /> Reject
                </button>
              </div>

              {/* Reject reason input */}
              {selectedItem === item.id && (
                <div className="mt-3 space-y-2">
                  <textarea
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    placeholder="Reason for rejection (required)..."
                    rows={2}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-200 resize-none"
                  />
                  <button
                    onClick={() => handleReject(item.id)}
                    disabled={rejectMutation.isPending}
                    className="w-full py-2 bg-red-500 text-white text-sm font-semibold rounded-xl hover:bg-red-600 transition-all active:scale-95 disabled:opacity-50"
                  >
                    Confirm Rejection
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <Shield className="w-12 h-12 text-gray-200 mx-auto mb-3" />
            <p className="text-gray-500">No pending verifications</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
