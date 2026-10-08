// src/components/onboarding/steps/IdentityUpload.tsx
"use client";

import { useState, useRef } from "react";
import { Camera, Upload, X, Check, ShieldCheck, Lock, FileText, AlertCircle } from "lucide-react";
import type { IdentityDocument } from "@/types/onboarding";

interface IdentityUploadProps {
  identityDoc: IdentityDocument;
  onUpdate: (doc: Partial<IdentityDocument>) => void;
}

type DocumentType = "ghana_card" | "passport" | "voter_id";

const documentTypes: { value: DocumentType; label: string; icon: string; subtitle: string }[] = [
  { value: "ghana_card", label: "Ghana Card", icon: "🇬🇭", subtitle: "National ID (Front & Back)" },
  { value: "passport", label: "Passport", icon: "🛂", subtitle: "Information Page Only" },
  { value: "voter_id", label: "Voter ID", icon: "🗳️", subtitle: "Electoral Card (Front & Back)" },
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

  const isPassport = identityDoc.documentType === "passport";
  const isValid = identityDoc.frontFile && (isPassport || identityDoc.backFile);

  return (
    <div className="space-y-8">
      {/* Step Header */}
      <div className="text-center max-w-xl mx-auto space-y-2.5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          Bank-Grade Security
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
          Verify your identity
        </h1>
        <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
          Upload a clear photograph or scan of your government ID. Verified workers get up to 4x more employer booking requests.
        </p>
      </div>

      {/* Document Type Selector */}
      <div className="space-y-3">
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-600">
          Select Document Type
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {documentTypes.map((type) => {
            const isCurrent = identityDoc.documentType === type.value;
            return (
              <button
                key={type.value}
                type="button"
                onClick={() => onUpdate({ documentType: type.value })}
                className={`p-4 rounded-2xl border-2 text-left transition-all flex flex-col justify-between ${
                  isCurrent
                    ? "border-[#2563EB] bg-blue-50/50 shadow-sm ring-1 ring-blue-500/20"
                    : "border-gray-200/90 bg-white hover:border-gray-300 hover:bg-gray-50/50"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{type.icon}</span>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      isCurrent ? "border-[#2563EB] bg-[#2563EB] text-white" : "border-gray-300"
                    }`}
                  >
                    {isCurrent && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-gray-900">{type.label}</h4>
                  <p className="text-[11px] text-gray-400 mt-0.5">{type.subtitle}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Upload Areas (Side-by-side on md screens) */}
      <div className={`grid gap-5 ${isPassport ? "grid-cols-1 max-w-lg mx-auto" : "grid-cols-1 md:grid-cols-2"}`}>
        {/* Front side */}
        <UploadSlot
          label={`Front of ${documentTypes.find((d) => d.value === identityDoc.documentType)?.label}`}
          sublabel="Must clearly display your full name, photo, and ID number"
          preview={identityDoc.frontPreview}
          file={identityDoc.frontFile}
          onRemove={() => onUpdate({ frontFile: null, frontPreview: "" })}
          onUpload={() => frontInputRef.current?.click()}
          required
        />
        <input
          ref={frontInputRef}
          type="file"
          accept="image/*,application/pdf"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && handleFileSelect("front", e.target.files[0])}
        />

        {/* Back side (if not passport) */}
        {!isPassport && (
          <>
            <UploadSlot
              label={`Back of ${documentTypes.find((d) => d.value === identityDoc.documentType)?.label}`}
              sublabel="Must clearly display the barcode, issue date, and security seal"
              preview={identityDoc.backPreview}
              file={identityDoc.backFile}
              onRemove={() => onUpdate({ backFile: null, backPreview: "" })}
              onUpload={() => backInputRef.current?.click()}
              required
            />
            <input
              ref={backInputRef}
              type="file"
              accept="image/*,application/pdf"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleFileSelect("back", e.target.files[0])}
            />
          </>
        )}
      </div>

      {/* Status Notice */}
      {isValid ? (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm">
            <Check className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-emerald-900">Documents Captured Successfully</h4>
            <p className="text-xs text-emerald-700 mt-0.5 leading-relaxed">
              Our automated KYC verification will confirm document authenticity. You can proceed with profile setup while verification completes in the background.
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-blue-50/60 border border-blue-100 rounded-2xl p-4 flex items-center gap-3 text-xs text-blue-800">
          <Lock className="w-4 h-4 text-blue-600 shrink-0" />
          <span>
            Your identity information is encrypted at rest using AES-256. Only cryptographic hashes are retained for verification.
          </span>
        </div>
      )}
    </div>
  );
}

// Upload Slot Component
function UploadSlot({
  label,
  sublabel,
  preview,
  file,
  onRemove,
  onUpload,
  required,
}: {
  label: string;
  sublabel: string;
  preview: string;
  file: File | null;
  onRemove: () => void;
  onUpload: () => void;
  required: boolean;
}) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-2">
        <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        {preview && (
          <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 flex items-center gap-1">
            <Check className="w-3 h-3" /> Ready
          </span>
        )}
      </div>

      {preview ? (
        <div className="relative rounded-2xl overflow-hidden border-2 border-emerald-200 bg-gray-50 flex-1 min-h-[200px] flex flex-col justify-between group">
          <div className="relative w-full h-44 overflow-hidden bg-black/5">
            <img
              src={preview}
              alt={label}
              className="w-full h-full object-cover transition-transform group-hover:scale-105"
            />
          </div>
          <div className="p-3 bg-white border-t border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0 pr-2">
              <FileText className="w-4 h-4 text-gray-400 shrink-0" />
              <span className="text-xs font-semibold text-gray-700 truncate">
                {file?.name || "Uploaded Document"}
              </span>
            </div>
            <button
              type="button"
              onClick={onRemove}
              className="px-2.5 py-1 text-xs font-bold text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" /> Remove
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={onUpload}
          className="border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50/30 rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center text-center transition-all cursor-pointer flex-1 min-h-[200px] group"
        >
          <div className="w-12 h-12 rounded-2xl bg-gray-100 group-hover:bg-blue-100/60 text-gray-500 group-hover:text-blue-600 flex items-center justify-center transition-colors mb-3">
            <Camera className="w-6 h-6" />
          </div>
          <p className="text-sm font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
            Tap to capture or upload
          </p>
          <p className="text-xs text-gray-400 mt-1 max-w-xs leading-relaxed">
            {sublabel}
          </p>
          <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-gray-400 bg-gray-100/80 px-2.5 py-1 rounded-full">
            <Upload className="w-3 h-3" /> JPG, PNG, or PDF up to 10MB
          </span>
        </button>
      )}
    </div>
  );
}
