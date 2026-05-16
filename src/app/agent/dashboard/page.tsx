// src/app/agent/dashboard/page.tsx
"use client";

import { AgentLayout } from "@/components/layout/AgentLayout";
import { useAgentStats, useAgentTasks } from "@/hooks/useAgent";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ClipboardList, CheckCircle, Clock, MapPin,
  ChevronRight, Camera, Video, Star
} from "lucide-react";

const typeLabels: Record<string, string> = {
  identity_verification: "Identity Check",
  workspace_check: "Workspace Visit",
  skill_demo: "Skill Demo",
};

const typeIcons: Record<string, typeof Camera> = {
  identity_verification: Camera,
  workspace_check: MapPin,
  skill_demo: Video,
};

export default function AgentDashboardPage() {
  const router = useRouter();
  const { data: stats, isLoading: statsLoading } = useAgentStats();
  const { data: tasks, isLoading: tasksLoading } = useAgentTasks();

  const isLoading = statsLoading || tasksLoading;

  if (isLoading) {
    return (
      <AgentLayout>
        <div className="space-y-6 animate-pulse">
          <div className="h-8 w-40 bg-white rounded-lg" />
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-24 bg-white rounded-2xl" />
            ))}
          </div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-white rounded-2xl" />
            ))}
          </div>
        </div>
      </AgentLayout>
    );
  }

  const activeTasks = tasks?.filter((t) => t.status !== "completed") || [];
  const completedTasks = tasks?.filter((t) => t.status === "completed") || [];

  return (
    <AgentLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-xl font-bold text-gray-900">Agent Dashboard</h1>
          <p className="text-sm text-gray-500 mt-0.5">Your assigned verification tasks</p>
        </div>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Assigned", value: stats.totalAssigned, icon: ClipboardList, color: "bg-blue-50 text-blue-600" },
              { label: "Completed Today", value: stats.completedToday, icon: CheckCircle, color: "bg-emerald-50 text-emerald-600" },
              { label: "Pending Review", value: stats.pendingReview, icon: Clock, color: "bg-amber-50 text-amber-600" },
              { label: "Acceptance Rate", value: `${stats.acceptanceRate}%`, icon: Star, color: "bg-purple-50 text-purple-600" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm"
              >
                <div className={`w-9 h-9 rounded-xl ${stat.color} flex items-center justify-center mb-2`}>
                  <stat.icon className="w-4 h-4" />
                </div>
                <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        )}

        {/* Active Tasks */}
        <div>
          <h2 className="text-base font-semibold text-gray-900 mb-3">
            Active Tasks ({activeTasks.length})
          </h2>
          <div className="grid gap-3">
            {activeTasks.map((task) => {
              const Icon = typeIcons[task.type] || ClipboardList;
              return (
                <button
                  key={task.id}
                  onClick={() => router.push(`/agent/tasks/${task.id}`)}
                  className="bg-white rounded-2xl border border-gray-100 p-4 text-left shadow-sm hover:shadow-md hover:border-accent-100 transition-all"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        task.type === "identity_verification" ? "bg-blue-50 text-blue-600" :
                        task.type === "workspace_check" ? "bg-purple-50 text-purple-600" :
                        "bg-orange-50 text-orange-600"
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900">{task.workerName}</h3>
                        <p className="text-xs text-gray-500">{typeLabels[task.type]}</p>
                      </div>
                    </div>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      task.status === "assigned" ? "bg-blue-50 text-blue-600" :
                      task.status === "accepted" ? "bg-amber-50 text-amber-600" :
                      "bg-emerald-50 text-emerald-600"
                    }`}>
                      {task.status === "assigned" ? "New" : task.status === "accepted" ? "Accepted" : "In Progress"}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {task.location.district}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {(() => {
                        const hours = Math.floor((new Date(task.deadlineAt).getTime() - Date.now()) / (1000 * 60 * 60));
                        return hours > 0 ? `${hours}h remaining` : "Overdue";
                      })()}
                    </span>
                  </div>

                  {/* Evidence progress */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                    <span className="text-xs text-gray-400">
                      Evidence: {task.submittedEvidence.length}/{task.requiredEvidence.length}
                    </span>
                    <ChevronRight className="w-4 h-4 text-gray-300" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Completed Tasks */}
        {completedTasks.length > 0 && (
          <div>
            <h2 className="text-base font-semibold text-gray-900 mb-3">
              Completed ({completedTasks.length})
            </h2>
            <div className="grid gap-2 opacity-60">
              {completedTasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center justify-between"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900">{task.workerName}</p>
                    <p className="text-xs text-gray-500">{typeLabels[task.type]} · {task.location.district}</p>
                  </div>
                  <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Done</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AgentLayout>
  );
}
