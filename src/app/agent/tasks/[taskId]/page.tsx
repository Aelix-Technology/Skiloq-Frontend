// src/app/agent/tasks/[taskId]/page.tsx
"use client";

import { useParams, useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { AgentLayout } from "@/components/layout/AgentLayout";
import { useAgentTask, useAcceptTask, useUploadEvidence } from "@/hooks/useAgent";
import { ArrowLeft, MapPin, Clock, Camera, Upload, Check, Phone } from "lucide-react";
import { toast } from "sonner";

const typeLabels: Record<string, string> = {
  identity_verification: "Identity Verification",
  workspace_check: "Workspace Check",
  skill_demo: "Skill Demonstration",
};

export default function TaskDetailPage() {
  const params = useParams();
  const router = useRouter();
  const taskId = params.taskId as string;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: task, isLoading } = useAgentTask(taskId);
  const acceptMutation = useAcceptTask();
  const uploadMutation = useUploadEvidence();

  const handleAccept = () => {
    acceptMutation.mutate(taskId, {
      onSuccess: () => toast.success("Task accepted"),
      onError: () => toast.error("Failed to accept task"),
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    uploadMutation.mutate(
      { taskId, file },
      {
        onSuccess: () => toast.success("Evidence uploaded"),
        onError: () => toast.error("Upload failed"),
      }
    );

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  if (isLoading) {
    return (
      <AgentLayout>
        <div className="animate-pulse space-y-4">
          <div className="h-6 w-32 bg-white rounded-lg" />
          <div className="h-40 bg-white rounded-2xl" />
        </div>
      </AgentLayout>
    );
  }

  if (!task) {
    return (
      <AgentLayout>
        <div className="text-center py-16">
          <p className="text-gray-500">Task not found</p>
          <button onClick={() => router.back()} className="text-accent font-medium mt-2 hover:underline">Go back</button>
        </div>
      </AgentLayout>
    );
  }

  const isActive = task.status === "assigned" || task.status === "accepted" || task.status === "in_progress";

  return (
    <AgentLayout>
      <div className="space-y-5">
        {/* Back */}
        <button onClick={() => router.back()} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to dashboard
        </button>

        {/* Task info card */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-lg font-bold text-gray-900">{task.workerName}</h1>
              <p className="text-sm text-gray-500">{typeLabels[task.type]}</p>
            </div>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
              task.status === "assigned" ? "bg-blue-50 text-blue-600" :
              task.status === "accepted" ? "bg-amber-50 text-amber-600" :
              task.status === "in_progress" ? "bg-emerald-50 text-emerald-600" :
              "bg-gray-50 text-gray-600"
            }`}>
              {task.status === "assigned" ? "New" : task.status === "accepted" ? "Accepted" : task.status === "in_progress" ? "In Progress" : "Completed"}
            </span>
          </div>

          {/* Details grid */}
          <div className="grid sm:grid-cols-2 gap-3 mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 rounded-xl p-3">
              <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
              <span>{task.location.address}, {task.location.district}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 rounded-xl p-3">
              <Phone className="w-4 h-4 text-gray-400 shrink-0" />
              <span>{task.workerPhone}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 rounded-xl p-3">
              <Clock className="w-4 h-4 text-gray-400 shrink-0" />
              <span>Due: {new Date(task.deadlineAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}</span>
            </div>
          </div>

          {/* Notes */}
          <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
            <p className="text-sm font-medium text-amber-900 mb-1">Instructions</p>
            <p className="text-sm text-amber-700">{task.notes}</p>
          </div>
        </div>

        {/* Submitted evidence */}
        {task.submittedEvidence.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Submitted Evidence ({task.submittedEvidence.length}/{task.requiredEvidence.length})
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {task.submittedEvidence.map((evidence, i) => (
                <div key={i} className="relative rounded-xl overflow-hidden border border-gray-100 aspect-square">
                  <img src={evidence.url} alt={`Evidence ${i + 1}`} className="w-full h-full object-cover" />
                  <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded-full">
                    {evidence.type === "photo" ? <Camera className="w-3 h-3" /> : <Upload className="w-3 h-3" />}
                    {evidence.type}
                  </div>
                  {evidence.gpsCoordinates && (
                    <div className="absolute top-2 right-2 bg-emerald-500 text-white text-xs px-1.5 py-0.5 rounded-full flex items-center gap-1">
                      <MapPin className="w-2.5 h-2.5" /> GPS
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upload button */}
        {isActive && (
          <div className="space-y-3">
            {task.status === "assigned" && (
              <button
                onClick={handleAccept}
                disabled={acceptMutation.isPending}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-accent text-white font-semibold rounded-2xl hover:bg-accent-600 transition-all active:scale-[0.98] disabled:opacity-50"
              >
                <Check className="w-5 h-5" />
                {acceptMutation.isPending ? "Accepting..." : "Accept Task"}
              </button>
            )}

            {task.status !== "assigned" && task.submittedEvidence.length < task.requiredEvidence.length && (
              <>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,video/*"
                  capture="environment"
                  className="hidden"
                  onChange={handleFileUpload}
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadMutation.isPending}
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-white border-2 border-accent text-accent font-semibold rounded-2xl hover:bg-accent-50 transition-all active:scale-[0.98] disabled:opacity-50"
                >
                  <Camera className="w-5 h-5" />
                  {uploadMutation.isPending ? "Uploading..." : `Upload Evidence (${task.submittedEvidence.length}/${task.requiredEvidence.length})`}
                </button>
              </>
            )}

            {task.submittedEvidence.length >= task.requiredEvidence.length && task.status !== "completed" && (
              <div className="bg-emerald-50 rounded-2xl p-4 text-center border border-emerald-100">
                <Check className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                <p className="text-sm font-semibold text-emerald-700">All evidence submitted</p>
                <p className="text-xs text-emerald-600 mt-0.5">Waiting for admin review</p>
              </div>
            )}
          </div>
        )}
      </div>
    </AgentLayout>
  );
}