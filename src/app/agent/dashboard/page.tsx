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

const statBlobs = ["bg-accent/15", "bg-success/15", "bg-warning/15", "bg-primary/15"];

export default function AgentDashboardPage() {
  const router = useRouter();
  const { data: stats, isLoading: statsLoading } = useAgentStats();
  const { data: tasks, isLoading: tasksLoading } = useAgentTasks();

  const isLoading = statsLoading || tasksLoading;

  if (isLoading) {
    return (
      <AgentLayout>
        <div className="mx-auto px-4 lg:px-6 max-w-7xl space-y-6 animate-pulse">
          <div className="h-8 w-40 bg-white/75 rounded-lg" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-28 bg-white/75 rounded-2xl border border-white/60" />
            ))}
          </div>
          <div className="space-y-4 sm:space-y-5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-white/75 rounded-2xl border border-white/60" />
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
      <div className="mx-auto px-4 lg:px-6 max-w-7xl space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">Agent Dashboard</h1>
          <p className="text-sm text-primary-300 mt-1">Your assigned verification tasks</p>
        </div>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {[
              { label: "Assigned", value: stats.totalAssigned, icon: ClipboardList, color: "bg-accent/10 text-accent" },
              { label: "Completed Today", value: stats.completedToday, icon: CheckCircle, color: "bg-success/10 text-success" },
              { label: "Pending Review", value: stats.pendingReview, icon: Clock, color: "bg-warning/10 text-warning" },
              { label: "Acceptance Rate", value: `${stats.acceptanceRate}%`, icon: Star, color: "bg-primary/10 text-primary-500" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative overflow-hidden rounded-2xl border border-white/70 bg-white/75 backdrop-blur-xl p-5 shadow-[0_8px_30px_-12px_rgba(26,31,54,0.10)] before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white before:to-transparent hover:-translate-y-1 hover:shadow-[0_16px_40px_-14px_rgba(26,31,54,0.18)] transition-all duration-300"
              >
                <div className={`absolute -bottom-6 -right-6 h-24 w-24 rounded-full blur-2xl opacity-60 ${statBlobs[i]}`} />
                <div className="relative">
                  <div className={`w-9 h-9 rounded-xl ${stat.color} flex items-center justify-center mb-3`}>
                    <stat.icon className="w-4 h-4" />
                  </div>
                  <p className="text-2xl font-bold tracking-tight text-primary">{stat.value}</p>
                  <p className="text-xs text-primary-300 font-medium uppercase tracking-wider mt-0.5">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Active Tasks */}
        <div>
          <h2 className="text-md font-semibold tracking-tight text-primary mb-4">
            Active Tasks ({activeTasks.length})
          </h2>
          <div className="relative overflow-hidden rounded-2xl border border-white/70 bg-white/75 backdrop-blur-xl p-5 shadow-[0_8px_30px_-12px_rgba(26,31,54,0.10)] before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white before:to-transparent">
            <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full blur-2xl opacity-60 bg-accent/15" />
            <div className="relative grid gap-4 sm:gap-5">
              {activeTasks.map((task) => {
                const Icon = typeIcons[task.type] || ClipboardList;
                return (
                  <button
                    key={task.id}
                    onClick={() => router.push(`/agent/tasks/${task.id}`)}
                    className="relative overflow-hidden w-full text-left bg-white/80 backdrop-blur-xl rounded-2xl border border-white/60 p-4 shadow-sm hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-14px_rgba(26,31,54,0.18)] hover:border-accent-100 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          task.type === "identity_verification" ? "bg-accent/10 text-accent" :
                          task.type === "workspace_check" ? "bg-primary/10 text-primary-500" :
                          "bg-warning/10 text-warning"
                        }`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-primary">{task.workerName}</h3>
                          <p className="text-xs text-primary-300">{typeLabels[task.type]}</p>
                        </div>
                      </div>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        task.status === "assigned" ? "bg-accent/10 text-accent" :
                        task.status === "accepted" ? "bg-warning/10 text-warning" :
                        "bg-success/10 text-success"
                      }`}>
                        {task.status === "assigned" ? "New" : task.status === "accepted" ? "Accepted" : "In Progress"}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-primary-300 mb-2">
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
                    <div className="flex items-center justify-between pt-3 border-t border-primary-50/70">
                      <span className="text-xs text-primary-200">
                        Evidence: {task.submittedEvidence.length}/{task.requiredEvidence.length}
                      </span>
                      <ChevronRight className="w-4 h-4 text-primary-100" />
                    </div>
                  </button>
                );
              })}
              {activeTasks.length === 0 && (
                <div className="text-center py-10">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/8 text-accent ring-1 ring-accent-100/40 mb-3">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-semibold text-primary">No active tasks</p>
                  <p className="text-xs text-primary-300 mt-1">All caught up — check back soon for new assignments.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Completed Tasks */}
        {completedTasks.length > 0 && (
          <div>
            <h2 className="text-md font-semibold tracking-tight text-primary mb-4">
              Completed ({completedTasks.length})
            </h2>
            <div className="relative overflow-hidden rounded-2xl border border-white/70 bg-white/75 backdrop-blur-xl p-5 shadow-[0_8px_30px_-12px_rgba(26,31,54,0.10)] before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white before:to-transparent">
              <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full blur-2xl opacity-60 bg-success/15" />
              <div className="relative grid gap-4 sm:gap-5 opacity-60">
                {completedTasks.map((task) => (
                  <div
                    key={task.id}
                    className="bg-white/80 rounded-2xl border border-white/60 p-4 flex items-center justify-between backdrop-blur-xl"
                  >
                    <div>
                      <p className="text-sm font-medium text-primary">{task.workerName}</p>
                      <p className="text-xs text-primary-300">{typeLabels[task.type]} · {task.location.district}</p>
                    </div>
                    <span className="text-xs font-medium text-success bg-success/10 px-2 py-0.5 rounded-full">Done</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </AgentLayout>
  );
}
