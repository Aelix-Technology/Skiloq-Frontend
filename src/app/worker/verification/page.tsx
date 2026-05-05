// src/app/worker/verification/page.tsx
"use client";

import { WorkerLayout } from "@/components/layout/WorkerLayout";
import { ErrorState } from "@/components/shared/ErrorState";
import { useVerificationStatus } from "@/hooks/useVerification";
import { Check, Clock, AlertCircle, Shield, ChevronRight } from "lucide-react";

export default function VerificationPage() {
    const { data, isLoading, error, refetch } = useVerificationStatus();

    return (
        <WorkerLayout>
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-xl font-bold text-primary">Verification Status</h1>
                    <p className="text-sm text-primary-300 mt-0.5">
                        Complete all steps to appear in search results
                    </p>
                </div>

                {/* Loading */}
                {isLoading && (
                    <div className="space-y-2 animate-pulse">
                        <div className="h-2 bg-primary-100 rounded-pill w-full" />
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="h-16 bg-white rounded-card border border-primary-100" />
                        ))}
                    </div>
                )}

                {/* Error */}
                {error && (
                    <ErrorState title="Couldn't load verification" onRetry={() => refetch()} />
                )}

                {/* Content */}
                {data && (
                    <>
                        {/* Overall progress */}
                        <div className="bg-white rounded-card border border-primary-100 p-4">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <Shield className="w-4 h-4 text-accent" />
                                    <span className="text-sm font-semibold text-primary">Overall Progress</span>
                                </div>
                                <span className="text-sm font-bold text-accent">{data.overall_progress}%</span>
                            </div>
                            <div className="h-2 bg-primary-100 rounded-pill overflow-hidden">
                                <div
                                    className="h-full bg-accent rounded-pill transition-all duration-500"
                                    style={{ width: `${data.overall_progress}%` }}
                                />
                            </div>
                        </div>

                        {/* Steps */}
                        <div className="space-y-2">
                            {data.steps.map((step) => (
                                <div
                                    key={step.name}
                                    className="bg-white rounded-card border border-primary-100 p-4"
                                >
                                    <div className="flex items-start gap-3">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${step.status === "completed"
                                            ? "bg-success/10"
                                            : step.status === "in_review"
                                                ? "bg-warning/10"
                                                : step.status === "rejected"
                                                    ? "bg-danger/10"
                                                    : "bg-primary-100"
                                            }`}>
                                            {step.status === "completed" ? (
                                                <Check className="w-4 h-4 text-success" />
                                            ) : step.status === "in_review" ? (
                                                <Clock className="w-4 h-4 text-warning" />
                                            ) : step.status === "rejected" ? (
                                                <AlertCircle className="w-4 h-4 text-danger" />
                                            ) : (
                                                <AlertCircle className="w-4 h-4 text-primary-300" />
                                            )}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between">
                                                <h4 className="text-sm font-semibold text-primary">{step.name}</h4>
                                                <span className={`text-xs font-medium px-2 py-0.5 rounded-pill ${step.status === "completed"
                                                    ? "bg-success/10 text-success"
                                                    : step.status === "in_review"
                                                        ? "bg-warning/10 text-warning"
                                                        : step.status === "rejected"
                                                            ? "bg-danger/10 text-danger"
                                                            : "bg-primary-50 text-primary-300"
                                                    }`}>
                                                    {step.status === "completed" && "Verified"}
                                                    {step.status === "in_review" && "In Review"}
                                                    {step.status === "pending" && "Pending"}
                                                    {step.status === "rejected" && "Rejected"}
                                                </span>
                                            </div>
                                            <p className="text-xs text-primary-300 mt-0.5">{step.description}</p>
                                            {step.eta && (
                                                <p className="text-xs text-warning font-medium mt-1">ETA: {step.eta}</p>
                                            )}
                                        </div>

                                        {step.status === "pending" && (
                                            <ChevronRight className="w-4 h-4 text-primary-200 shrink-0" />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </WorkerLayout>
    );
}