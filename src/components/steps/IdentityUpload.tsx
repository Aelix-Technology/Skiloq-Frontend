// src/components/onboarding/steps/IdentityUpload.tsx
"use client";

import { useState, useRef } from "react";
import { Camera, Upload, X, Check } from "lucide-react";
import type { IdentityDocument } from "@/types/onboarding";

interface IdentityUploadProps {
  identityDoc: IdentityDocument;
  onUpdate: (doc: Partial<IdentityDocument>) => void;
}

type DocumentType = "ghana_card" | "passport" | "voter_id";

const documentTypes: { value: DocumentType; label: string }[] = [
  { value: "ghana_card", label: "Ghana Card" },
  { value: "passport", label: "Passport" },
  { value: "voter_id", label: "Voter ID" },
];

export function IdentityUpload({ identityDoc, onUpdate }: IdentityUploadProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const frontInputRef = useRef<HTMLInputElement>(null);
  const backInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (side: "front" | "back", file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const preview = e.target?.result as string;
      if (side === "front") {
        onUpdate({ frontFile: file, frontPreview: preview });
      } else {
        onUpdate({ backFile: file, backPreview: preview });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    if (!identityDoc.frontFile || (identityDoc.documentType !== "passport" && !identityDoc.backFile)) {
      return;
    }
    setIsSubmitting(true);
    // Simulate OCR + submission
    setTimeout(() => {
      setIsSubmitting(false);
      onUpdate({}); // Triggers parent to move to next step
    }, 2000);
  };

  const isValid =
    identityDoc.frontFile &&
    (identityDoc.documentType === "passport" || identityDoc.backFile);

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-xl font-bold text-primary">Verify your identity</h1>
        <p className="text-sm text-primary-300">
          Upload your government ID. Your information is encrypted and secure.
        </p>
      </div>

      {/* Document type selector */}
      <div>
        <label className="text-sm font-medium text-primary-400 mb-2 block">
          Document Type
        </label>
        <div className="flex gap-2">
          {documentTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => onUpdate({ documentType: type.value })}
              className={`flex-1 py-2 px-3 text-sm font-medium rounded-input border transition-colors ${
                identityDoc.documentType === type.value
                  ? "border-accent bg-accent-50 text-accent"
                  : "border-primary-100 text-primary-300 hover:border-primary-200"
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* Upload areas */}
      <div className="grid gap-4">
        {/* Front side — always required */}
        <UploadSlot
          label={`Front of ${documentTypes.find((d) => d.value === identityDoc.documentType)?.label}`}
          preview={identityDoc.frontPreview}
          onRemove={() => onUpdate({ frontFile: null, frontPreview: "" })}
          onUpload={() => frontInputRef.current?.click()}
          required
        />
        <input
          ref={frontInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && handleFileSelect("front", e.target.files[0])}
        />

        {/* Back side — not required for passport */}
        {identityDoc.documentType !== "passport" && (
          <>
            <UploadSlot
              label={`Back of ${documentTypes.find((d) => d.value === identityDoc.documentType)?.label}`}
              preview={identityDoc.backPreview}
              onRemove={() => onUpdate({ backFile: null, backPreview: "" })}
              onUpload={() => backInputRef.current?.click()}
              required
            />
            <input
              ref={backInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleFileSelect("back", e.target.files[0])}
            />
          </>
        )}
      </div>

      {/* OCR preview */}
      {(identityDoc.frontPreview || identityDoc.backPreview) && (
        <div className="bg-success/5 border border-success/20 rounded-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <Check className="w-4 h-4 text-success" />
            <span className="text-sm font-medium text-success">Document captured</span>
          </div>
          <p className="text-xs text-primary-300">
            OCR will extract your name and ID number. Review expected within 24 hours.
          </p>
        </div>
      )}

      {/* Submit button */}
      <button
        onClick={handleSubmit}
        disabled={!isValid || isSubmitting}
        className="w-full bg-accent text-white font-medium py-3 rounded-input hover:bg-accent-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed touch-target"
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Submitting...
          </span>
        ) : (
          "Submit for Review"
        )}
      </button>

      <p className="text-xs text-center text-primary-300">
        Your data is encrypted at rest. Only hash stored in database.
      </p>
    </div>
  );
}

// Upload slot sub-component
function UploadSlot({
  label,
  preview,
  onRemove,
  onUpload,
  required,
}: {
  label: string;
  preview: string;
  onRemove: () => void;
  onUpload: () => void;
  required: boolean;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-primary-400 mb-2 block">
        {label} {required && <span className="text-danger">*</span>}
      </label>

      {preview ? (
        <div className="relative rounded-card overflow-hidden border border-primary-100">
          <img
            src={preview}
            alt={label}
            className="w-full h-48 object-cover"
          />
          <button
            onClick={onRemove}
            className="absolute top-2 right-2 w-8 h-8 bg-danger text-white rounded-full flex items-center justify-center shadow-md hover:bg-danger-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <button
          onClick={onUpload}
          className="w-full h-48 border-2 border-dashed border-primary-200 rounded-card flex flex-col items-center justify-center gap-2 hover:border-accent-300 hover:bg-accent-50/30 transition-colors"
        >
          <Camera className="w-8 h-8 text-primary-300" />
          <span className="text-sm text-primary-300">Tap to take photo</span>
        </button>
      )}
    </div>
  );
}