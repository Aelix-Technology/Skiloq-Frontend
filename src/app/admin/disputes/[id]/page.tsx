// src/app/admin/disputes/[id]/page.tsx
"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { useDisputes, useResolveDispute } from "@/hooks/useAdmin";
import { ArrowLeft, User, Building, FileText, MessageCircle, Check } from "lucide-react";
import { toast } from "sonner";

export default function DisputeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const disputeId = params.id as string;

  const { data: disputes } = useDisputes();
  const resolveMutation = useResolveDispute();

  const dispute = disputes?.find((d) => d.id === disputeId);
  const [outcome, setOutcome] = useState("");
  const [adminNotes, setAdminNotes] = useState("");

  const handleResolve = () => {
    if (!outcome) {
      toast.error("Select an outcome");
      return;
    }
    resolveMutation.mutate({ id: disputeId, outcome }, {
      onSuccess: () => {
        toast.success("Dispute resolved");
        router.push("/admin/disputes");
      },
      onError: () => toast.error("Failed to resolve dispute"),
    });
  };

  if (!dispute) {
    return (
      <AdminLayout>
        <div className="text-center py-16">
          <p className="text-gray-500">Dispute not found</p>
          <button onClick={() => router.back()} className="text-accent font-medium mt-2 hover:underline">Go back</button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl space-y-6">
        {/* Back */}
        <button onClick={() => router.back()} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to disputes
        </button>

        {/* Header */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h1 className="text-lg font-bold text-gray-900">{dispute.jobTitle}</h1>
          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
            <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> {dispute.workerName}</span>
            <span>vs</span>
            <span className="flex items-center gap-1"><Building className="w-3.5 h-3.5" /> {dispute.employerName}</span>
          </div>
          <div className="flex items-center gap-3 mt-3">
            <span className="text-lg font-bold text-accent">GHS {dispute.amountGHS.toLocaleString()}</span>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
              dispute.status === "open" ? "bg-red-50 text-red-600" : "bg-amber-50 text-amber-600"
            }`}>
              {dispute.status === "open" ? "Open" : "In Review"}
            </span>
          </div>
        </div>

        {/* Evidence — side by side */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Worker evidence */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-500" /> Worker Evidence
            </h3>
            {dispute.evidence.worker.length > 0 ? (
              <div className="grid grid-cols-2 gap-2">
                {dispute.evidence.worker.map((url, i) => (
                  <img key={i} src={url} alt={`Worker evidence ${i + 1}`} className="rounded-xl w-full aspect-square object-cover border border-gray-100" />
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400">No evidence submitted</p>
            )}
          </div>

          {/* Employer evidence */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4 text-purple-500" /> Employer Evidence
            </h3>
            {dispute.evidence.employer.length > 0 ? (
              <div className="grid grid-cols-2 gap-2">
                {dispute.evidence.employer.map((url, i) => (
                  <img key={i} src={url} alt={`Employer evidence ${i + 1}`} className="rounded-xl w-full aspect-square object-cover border border-gray-100" />
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400">No evidence submitted</p>
            )}
          </div>
        </div>

        {/* Chat transcript */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <MessageCircle className="w-4 h-4 text-gray-400" /> Chat Transcript
          </h3>
          <div className="space-y-3">
            {dispute.chatTranscript.map((msg, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  msg.sender === dispute.workerName ? "bg-blue-100 text-blue-600" : "bg-purple-100 text-purple-600"
                }`}>
                  {msg.sender.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-900">{msg.sender}</p>
                  <p className="text-sm text-gray-600">{msg.message}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {new Date(msg.timestamp).toLocaleString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resolution panel */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Resolution Decision</h3>

          <div className="grid grid-cols-3 gap-2 mb-4">
            {[
              { value: "release_to_worker", label: "Pay Worker", color: "border-emerald-500 text-emerald-600 bg-emerald-50" },
              { value: "full_refund", label: "Refund Client", color: "border-blue-500 text-blue-600 bg-blue-50" },
              { value: "partial_refund", label: "Split Payment", color: "border-amber-500 text-amber-600 bg-amber-50" },
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() => setOutcome(opt.value)}
                className={`p-3 rounded-xl border-2 text-sm font-semibold transition-all ${
                  outcome === opt.value ? opt.color : "border-gray-200 text-gray-500 hover:border-gray-300"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <textarea
            value={adminNotes}
            onChange={(e) => setAdminNotes(e.target.value)}
            placeholder="Admin notes (optional)..."
            rows={3}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none mb-4"
          />

          <button
            onClick={handleResolve}
            disabled={resolveMutation.isPending || !outcome}
            className="w-full flex items-center justify-center gap-2 py-3 bg-accent text-white font-semibold rounded-xl hover:bg-accent-600 transition-all disabled:opacity-50 active:scale-[0.98]"
          >
            <Check className="w-4 h-4" />
            {resolveMutation.isPending ? "Resolving..." : "Submit Decision"}
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}