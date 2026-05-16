// src/app/admin/disputes/page.tsx
"use client";

import { AdminLayout } from "@/components/layout/AdminLayout";
import { useDisputes } from "@/hooks/useAdmin";
import { useRouter } from "next/navigation";
import { AlertTriangle, Clock, ChevronRight, DollarSign } from "lucide-react";

export default function DisputesPage() {
  const router = useRouter();
  const { data: disputes, isLoading } = useDisputes();

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="space-y-4 animate-pulse">
          <div className="h-8 w-48 bg-gray-100 rounded-lg" />
          {[1, 2].map((i) => (
            <div key={i} className="h-28 bg-white rounded-2xl border border-gray-100" />
          ))}
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Disputes</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {disputes?.length || 0} active disputes requiring review
          </p>
        </div>

        <div className="grid gap-3">
          {disputes?.map((dispute) => (
            <button
              key={dispute.id}
              onClick={() => router.push(`/admin/disputes/${dispute.id}`)}
              className="bg-white rounded-2xl border border-gray-100 p-5 text-left shadow-sm hover:shadow-md hover:border-gray-200 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">{dispute.jobTitle}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {dispute.workerName} vs {dispute.employerName}
                  </p>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                  dispute.status === "open"
                    ? "bg-red-50 text-red-600"
                    : dispute.status === "under_review"
                    ? "bg-amber-50 text-amber-600"
                    : "bg-emerald-50 text-emerald-600"
                }`}>
                  {dispute.status === "open" ? "Open" : dispute.status === "under_review" ? "In Review" : "Resolved"}
                </span>
              </div>

              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <DollarSign className="w-3 h-3" />
                  GHS {dispute.amountGHS.toLocaleString()}
                </span>
                <span className="flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  Raised by {dispute.raisedBy}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {(() => {
                    const hours = Math.floor((Date.now() - new Date(dispute.raisedAt).getTime()) / (1000 * 60 * 60));
                    return hours < 24 ? `${hours}h ago` : `${Math.floor(hours / 24)}d ago`;
                  })()}
                </span>
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
                <span className="text-xs text-gray-400">
                  Evidence: {dispute.evidence.worker.length + dispute.evidence.employer.length} files
                </span>
                <ChevronRight className="w-4 h-4 text-gray-300" />
              </div>
            </button>
          ))}
        </div>

        {disputes?.length === 0 && (
          <div className="text-center py-16">
            <AlertTriangle className="w-12 h-12 text-gray-200 mx-auto mb-3" />
            <p className="text-gray-500">No active disputes</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
