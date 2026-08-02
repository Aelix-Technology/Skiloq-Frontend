"use client";

import { useState } from "react";
import { X, Upload, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

interface FileDisputeModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobId: string;
  jobTitle: string;
  currentUserRole: "worker" | "employer";
}

export function FileDisputeModal({
  isOpen,
  onClose,
  jobId,
  jobTitle,
  currentUserRole,
}: FileDisputeModalProps) {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles([...files, ...Array.from(e.target.files)]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !description.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Dispute filed successfully!");
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-gray-100">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-bold text-gray-900">File a Dispute</h2>
            <p className="text-sm text-gray-500">{jobTitle}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Subject */}
          <div>
            <label className="text-sm font-semibold text-gray-900 mb-1.5 block">
              Subject <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Brief description of the issue"
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-semibold text-gray-900 mb-1.5 block">
              Details <span className="text-red-500">*</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Explain the issue in detail..."
              rows={5}
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none"
            />
          </div>

          {/* Evidence Upload */}
          <div>
            <label className="text-sm font-semibold text-gray-900 mb-1.5 block">
              Evidence (Optional)
            </label>
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 bg-gray-50">
              <input
                type="file"
                id="dispute-evidence"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />
              <label
                htmlFor="dispute-evidence"
                className="flex flex-col items-center justify-center cursor-pointer text-sm text-gray-500 hover:text-accent transition-colors"
              >
                <Upload className="w-8 h-8 mb-2 text-gray-400" />
                Click to upload or drag and drop
                <p className="text-xs text-gray-400 mt-1">
                  Images, PDFs, screenshots. Max 10MB per file.
                </p>
              </label>
            </div>
            {files.length > 0 && (
              <div className="mt-3 space-y-2">
                {files.map((file, i) => (
                  <div key={i} className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2">
                    <span className="text-xs text-gray-600">{file.name}</span>
                    <button
                      type="button"
                      onClick={() => removeFile(i)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Warning */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-3">
            <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-700">
              Disputes are reviewed by our team. Please provide as much detail and evidence as possible.
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 text-sm font-medium text-gray-500 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-3 bg-accent text-white text-sm font-semibold rounded-xl hover:bg-accent-600 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "File Dispute"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
