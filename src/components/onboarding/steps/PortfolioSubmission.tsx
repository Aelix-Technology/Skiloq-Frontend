// src/components/onboarding/steps/PortfolioSubmission.tsx
"use client";

import { useState, useRef } from "react";
import { Upload, Link as LinkIcon, X, FileText, CheckCircle2, ShieldCheck, Sparkles, Plus, Image as ImageIcon } from "lucide-react";
import type { PortfolioItem } from "@/types/onboarding";

interface PortfolioSubmissionProps {
  items: PortfolioItem[];
  onAddItem: (item: PortfolioItem) => void;
  onRemoveItem: (id: string) => void;
}

export function PortfolioSubmission({
  items,
  onAddItem,
  onRemoveItem,
}: PortfolioSubmissionProps) {
  const [urlInput, setUrlInput] = useState("");
  const [urlTitle, setUrlTitle] = useState("");
  const [showUrlInput, setShowUrlInput] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const preview = e.target?.result as string;
      const newItem: PortfolioItem = {
        id: `file-${Date.now()}`,
        type: "file",
        file,
        preview,
        title: file.name.replace(/\.[^/.]+$/, ""),
      };
      onAddItem(newItem);
    };
    reader.readAsDataURL(file);
  };

  const handleUrlAdd = () => {
    if (!urlInput.trim() || !urlTitle.trim()) return;
    const newItem: PortfolioItem = {
      id: `url-${Date.now()}`,
      type: "url",
      url: urlInput.startsWith("http") ? urlInput : `https://${urlInput}`,
      title: urlTitle,
    };
    onAddItem(newItem);
    setUrlInput("");
    setUrlTitle("");
    setShowUrlInput(false);
  };

  const minRequired = 2;
  const isComplete = items.length >= minRequired;

  return (
    <div className="space-y-8">
      {/* Step Header */}
      <div className="text-center max-w-xl mx-auto space-y-2.5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          Work Samples
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
          Showcase your past work
        </h1>
        <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
          Provide at least {minRequired} verified samples of your past projects or links to live work. This establishes proof-of-work with high-paying clients.
        </p>
      </div>

      {/* Action Buttons Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Upload File Button */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="p-6 rounded-2xl border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50/30 transition-all text-center flex flex-col items-center justify-center cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-2xl bg-gray-100 group-hover:bg-blue-100/60 text-gray-500 group-hover:text-blue-600 flex items-center justify-center transition-colors mb-3">
            <Upload className="w-6 h-6" />
          </div>
          <h4 className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
            Upload Work File or Photos
          </h4>
          <p className="text-xs text-gray-400 mt-1">
            Images (JPG/PNG), PDF case studies, certificates
          </p>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,application/pdf,video/*"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
        />

        {/* Add Link Button */}
        <button
          type="button"
          onClick={() => setShowUrlInput(true)}
          className="p-6 rounded-2xl border-2 border-dashed border-gray-300 hover:border-indigo-500 hover:bg-indigo-50/30 transition-all text-center flex flex-col items-center justify-center cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-2xl bg-gray-100 group-hover:bg-indigo-100/60 text-gray-500 group-hover:text-indigo-600 flex items-center justify-center transition-colors mb-3">
            <LinkIcon className="w-6 h-6" />
          </div>
          <h4 className="text-sm font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
            Add External Project URL
          </h4>
          <p className="text-xs text-gray-400 mt-1">
            GitHub, Behance, Google Drive, Live Website
          </p>
        </button>
      </div>

      {/* URL Entry Card (if open) */}
      {showUrlInput && (
        <div className="p-5 sm:p-6 rounded-2xl bg-gray-50 border border-gray-200 space-y-4 animate-in fade-in-50 zoom-in-95 duration-150">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-gray-900">Add External Work Link</h4>
            <button
              type="button"
              onClick={() => setShowUrlInput(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">
                Project or Link Title
              </label>
              <input
                type="text"
                value={urlTitle}
                onChange={(e) => setUrlTitle(e.target.value)}
                placeholder="e.g. Modern E-commerce Website"
                className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">
                Direct URL
              </label>
              <input
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://github.com/..."
                className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setShowUrlInput(false)}
              className="px-4 py-2 text-xs font-semibold text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleUrlAdd}
              disabled={!urlTitle.trim() || !urlInput.trim()}
              className="px-5 py-2 rounded-xl text-xs font-bold bg-[#2563EB] text-white hover:bg-[#1D4ED8] disabled:opacity-50 transition-colors"
            >
              Save Link
            </button>
          </div>
        </div>
      )}

      {/* Portfolio Items List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-600">
            Added Work Samples ({items.length}/{minRequired} required)
          </label>
          {isComplete && (
            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5" /> Minimum Met
            </span>
          )}
        </div>

        {items.length === 0 ? (
          <div className="p-8 rounded-2xl bg-gray-50/70 border border-gray-100 text-center">
            <p className="text-sm text-gray-400">
              No samples added yet. Tap an option above to add your first work sample.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-white border border-gray-200 shadow-xs flex items-center gap-3.5 justify-between group"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  {item.type === "file" && item.preview ? (
                    <img
                      src={item.preview}
                      alt={item.title}
                      className="w-12 h-12 rounded-xl object-cover shrink-0 border border-gray-100"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center shrink-0 text-gray-500">
                      {item.type === "url" ? (
                        <LinkIcon className="w-5 h-5 text-indigo-500" />
                      ) : (
                        <FileText className="w-5 h-5 text-blue-500" />
                      )}
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <h5 className="text-sm font-bold text-gray-900 truncate">
                      {item.title}
                    </h5>
                    <p className="text-xs text-gray-400 truncate mt-0.5">
                      {item.type === "url" ? item.url : "Uploaded File"}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onRemoveItem(item.id)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Review Notice */}
      <div className="bg-blue-50/60 border border-blue-100 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5">
        <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm font-bold text-blue-900">
            Immediate Platform Access
          </h4>
          <p className="text-xs text-blue-700/90 mt-0.5 leading-relaxed">
            Your portfolio submissions are verified by our team within 24–48 hours. You may browse job opportunities and submit initial proposals immediately after onboarding completion.
          </p>
        </div>
      </div>
    </div>
  );
}
