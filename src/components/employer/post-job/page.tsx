// src/app/employer/post-job/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { EmployerLayout } from "@/components/layout/EmployerLayout";
import { JobForm } from "@/components/employer/JobForm";
import { usePostJob } from "@/hooks/useEmployer";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

export default function PostJobPage() {
  const router = useRouter();
  const postJob = usePostJob();

  const handleSubmit = (data: Parameters<typeof postJob.mutate>[0]) => {
    postJob.mutate(data, {
      onSuccess: () => {
        toast.success("Job posted successfully!");
        router.push("/employer/dashboard");
      },
      onError: () => {
        toast.error("Failed to post job. Try again.");
      },
    });
  };

  return (
    <EmployerLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="w-9 h-9 flex items-center justify-center rounded-input hover:bg-primary-50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-primary" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-primary">Post a Job</h1>
            <p className="text-sm text-primary-300 mt-0.5">
              Describe what you need and find the right talent
            </p>
          </div>
        </div>

        <JobForm
          onSubmit={handleSubmit}
          isSubmitting={postJob.isPending}
          onCancel={() => router.back()}
        />
      </div>
    </EmployerLayout>
  );
}
