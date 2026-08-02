"use client";

import { useParams, useRouter } from "next/navigation";
import { WorkerLayout } from "@/components/layout/WorkerLayout";
import { ArrowLeft, User, Building, FileText, MessageCircle } from "lucide-react";

// Mock data
const mockDisputeDetail = {
  id: "dis-002",
  jobId: "j004",
  jobTitle: "Emergency Plumbing Repair",
  workerName: "Yaw Takyi",
  employerName: "Kofi Asante",
  amountGHS: 800,
  status: "under_review",
  raisedBy: "worker",
  raisedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  evidence: {
    worker: ["/assets/images/hired.png"],
    employer: [],
  },
  chatTranscript: [
    { sender: "Yaw Takyi", message: "I completed the repair but the client hasn't marked it complete.", timestamp: "2026-02-15T14:00:00Z" },
  ],
};

export default function WorkerDisputeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const disputeId = params.id as string;

  const dispute = mockDisputeDetail;

  return (
    <WorkerLayout>
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
              <FileText className="w-4 h-4 text-blue-500" /> Your Evidence
            </h3>
            {dispute.evidence.worker.length > 0 ? (
              <div className="grid grid-cols-2 gap-2">
                {dispute.evidence.worker.map((url, i) => (
                  <img key={i} src={url} alt={`Your evidence ${i + 1}`} className="rounded-xl w-full aspect-square object-cover border border-gray-100" />
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
      </div>
    </WorkerLayout>
  );
}
