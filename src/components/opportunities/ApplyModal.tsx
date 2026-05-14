// src/components/opportunities/ApplyModal.tsx
"use client";

import { useState } from "react";
import { X, Send } from "lucide-react";
import { toast } from "sonner";

interface ApplyModalProps {
  jobId: string;
  jobTitle: string;
  isOpen: boolean;
  onClose: () => void;
}

export function ApplyModal({ jobId, jobTitle, isOpen, onClose }: ApplyModalProps) {
  const [coverNote, setCoverNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const maxLength = 200;

  const handleSubmit = () => {
    void jobId;

    if (coverNote.length < 10) {
      toast.error("Cover note must be at least 10 characters");
      return;
    }

    setIsSubmitting(true);

    // TODO: Replace with apiClient.post(`/jobs/${jobId}/apply`, { cover_note: coverNote })
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Application submitted!");
      setCoverNote("");
      onClose();
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Modal */}
      <div className="relative max-h-[90vh] w-full overflow-y-auto rounded-t-2xl bg-white/95 p-6 shadow-2xl backdrop-blur-xl sm:max-w-md sm:rounded-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold tracking-tight text-primary">Apply for Job</h2>
          <button
            onClick={onClose}
            className="flex min-h-11 w-11 items-center justify-center rounded-xl transition-all hover:-translate-y-1 hover:bg-primary-50 hover:shadow-lg active:scale-95"
          >
            <X className="w-4 h-4 text-primary-300" />
          </button>
        </div>

        <p className="text-sm text-primary-300 mb-4">{jobTitle}</p>

        {/* Cover note */}
        <div>
          <label className="text-sm font-medium text-primary-400 mb-2 block">
            Cover Note
          </label>
          <textarea
            value={coverNote}
            onChange={(e) => setCoverNote(e.target.value.slice(0, maxLength))}
            placeholder="Briefly describe why you're a good fit for this job..."
            rows={4}
            maxLength={maxLength}
            className="w-full rounded-xl border border-primary-100 bg-primary-50 px-4 py-3 text-sm text-primary placeholder:text-primary-200 focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none"
          />
          <div className="flex justify-between mt-1">
            <p className="text-xs text-primary-300">
              {coverNote.length < 10
                ? `Min 10 characters (${10 - coverNote.length} more needed)`
                : ""}
            </p>
            <p className="text-xs text-primary-300">{coverNote.length}/{maxLength}</p>
          </div>
        </div>

        {/* Info */}
        <div className="mt-4 rounded-2xl bg-primary-50 p-3">
          <p className="text-xs text-primary-300">
            Your profile, Trust Score, and portfolio will be shared with the employer.
          </p>
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={coverNote.length < 10 || isSubmitting}
          className="mt-4 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-accent py-3 font-semibold text-white transition-all hover:-translate-y-1 hover:bg-accent-600 hover:shadow-xl hover:shadow-accent/20 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Submitting...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Submit Application
            </>
          )}
        </button>
      </div>
    </div>
  );
}
