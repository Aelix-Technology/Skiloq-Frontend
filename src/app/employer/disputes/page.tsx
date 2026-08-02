"use client";

import { useRouter } from "next/navigation";
import { EmployerLayout } from "@/components/layout/EmployerLayout";
import { ArrowLeft, AlertTriangle, Clock, ChevronRight, DollarSign } from "lucide-react";

// Mock data for now
const mockEmployerDisputes = [
  {
    id: "dis-001",
    jobId: "j001",
    jobTitle: "Landing Page Redesign",
    otherPartyName: "Akua Serwaa",
    otherPartyType: "worker",
    amountGHS: 1200,
    status: "open",
    raisedBy: "employer",
    raisedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
  },
];

export default function EmployerDisputesPage() {
  const router = useRouter();

  return (
    <EmployerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Disputes</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Manage your active and past disputes
          </p>
        </div>

        {/* Disputes List */}
        <div className="grid gap-3">
          {mockEmployerDisputes.map((dispute) => (
            <button
              key={dispute.id}
              onClick={() => router.push(`/employer/disputes/${dispute.id}`)}
              className="bg-white rounded-2xl border border-gray-100 p-5 text-left shadow-sm hover:shadow-md hover:border-gray-200 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">{dispute.jobTitle}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {dispute.otherPartyType === "employer" ? "With employer" : "With worker"}: {dispute.otherPartyName}
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
                <ChevronRight className="w-4 h-4 text-gray-300" />
              </div>
            </button>
          ))}
        </div>

        {mockEmployerDisputes.length === 0 && (
          <div className="text-center py-16">
            <AlertTriangle className="w-12 h-12 text-gray-200 mx-auto mb-3" />
            <p className="text-gray-500">No disputes yet</p>
          </div>
        )}
      </div>
    </EmployerLayout>
  );
}
