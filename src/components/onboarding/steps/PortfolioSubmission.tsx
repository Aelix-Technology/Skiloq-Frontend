// src/components/onboarding/steps/PortfolioSubmission.tsx
"use client";

import { useState, useRef } from "react";
import { Upload, Link, X, Image, FileText } from "lucide-react";
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
        title: file.name,
      };
      onAddItem(newItem);
    };
    reader.readAsDataURL(file);
  };

  const handleUrlAdd = () => {
    if (!urlInput || !urlTitle) return;
    const newItem: PortfolioItem = {
      id: `url-${Date.now()}`,
      type: "url",
      url: urlInput,
      title: urlTitle,
    };
    onAddItem(newItem);
    setUrlInput("");
    setUrlTitle("");
    setShowUrlInput(false);
  };

  const minRequired = 2;

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-xl font-bold text-primary">Show your work</h1>
        <p className="text-sm text-primary-300">
          Add at least {minRequired} samples. Photos, links, or files that prove your skills.
        </p>
      </div>

      {/* Upload buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex flex-col items-center justify-center gap-2 p-6 border-2 border-dashed border-primary-200 rounded-card hover:border-accent-300 hover:bg-accent-50/30 transition-colors"
        >
          <Upload className="w-6 h-6 text-primary-300" />
          <span className="text-sm text-primary-300">Upload File</span>
          <span className="text-xs text-primary-200">Image, PDF, Video</span>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,.pdf,video/*"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
        />

        <button
          onClick={() => setShowUrlInput(true)}
          className="flex flex-col items-center justify-center gap-2 p-6 border-2 border-dashed border-primary-200 rounded-card hover:border-accent-300 hover:bg-accent-50/30 transition-colors"
        >
          <Link className="w-6 h-6 text-primary-300" />
          <span className="text-sm text-primary-300">Add Link</span>
          <span className="text-xs text-primary-200">GitHub, Behance, etc.</span>
        </button>
      </div>

      {/* URL input modal */}
      {showUrlInput && (
        <div className="bg-primary-50 rounded-card p-4 space-y-3 border border-primary-100">
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://..."
            className="w-full bg-white border border-primary-100 rounded-input px-3 py-2 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-accent/50"
          />
          <input
            type="text"
            value={urlTitle}
            onChange={(e) => setUrlTitle(e.target.value)}
            placeholder="Title (e.g., My GitHub Portfolio)"
            className="w-full bg-white border border-primary-100 rounded-input px-3 py-2 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-accent/50"
          />
          <div className="flex gap-2">
            <button
              onClick={handleUrlAdd}
              disabled={!urlInput || !urlTitle}
              className="flex-1 bg-accent text-white text-sm font-medium py-2 rounded-input hover:bg-accent-600 transition-colors disabled:opacity-50"
            >
              Add
            </button>
            <button
              onClick={() => setShowUrlInput(false)}
              className="px-4 py-2 text-sm text-primary-300 hover:text-primary transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Portfolio items */}
      {items.length > 0 && (
        <div className="grid gap-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 p-3 bg-primary-50 rounded-card border border-primary-100"
            >
              {item.type === "file" && item.preview ? (
                <img
                  src={item.preview}
                  alt={item.title}
                  className="w-12 h-12 rounded object-cover"
                />
              ) : (
                <div className="w-12 h-12 rounded bg-primary-100 flex items-center justify-center">
                  {item.type === "url" ? (
                    <Link className="w-5 h-5 text-primary-300" />
                  ) : (
                    <FileText className="w-5 h-5 text-primary-300" />
                  )}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-primary truncate">
                  {item.title}
                </p>
                <p className="text-xs text-primary-300">{item.type === "file" ? "File" : "Link"}</p>
              </div>
              <button
                onClick={() => onRemoveItem(item.id)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-danger/10 transition-colors"
              >
                <X className="w-4 h-4 text-primary-300 hover:text-danger" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Count */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-primary-300">
          {items.length} of {minRequired} minimum
        </span>
        {items.length >= minRequired && (
          <span className="text-success font-medium">Minimum met ✓</span>
        )}
      </div>

      {/* Moderation notice */}
      {items.length >= minRequired && (
        <div className="bg-accent/5 border border-accent/20 rounded-card p-4">
          <p className="text-sm text-primary">
            Your portfolio will be reviewed within{" "}
            <span className="font-semibold">48 hours</span>. You can continue
            using the platform while we review.
          </p>
        </div>
      )}
    </div>
  );
}