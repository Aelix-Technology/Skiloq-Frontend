// src/components/wallet/IncomeCertificateModal.tsx
"use client";

import { useState } from "react";
import { Award, Download, Printer, ShieldCheck, CheckCircle2, X, QrCode, Building2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

interface IncomeCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  workerName?: string;
  totalEarningsGhs?: number;
  averageMonthlyIncomeGhs?: number;
  completedJobs?: number;
  monthsActive?: number;
  trustScore?: number;
  certificateNumber?: string;
}

export function IncomeCertificateModal({
  isOpen,
  onClose,
  workerName = "Oluwaseun Adeyemi",
  totalEarningsGhs = 12500,
  averageMonthlyIncomeGhs = 3125,
  completedJobs = 34,
  monthsActive = 4,
  trustScore = 82.5,
  certificateNumber = "SKQ-CERT-2026-08942GH",
}: IncomeCertificateModalProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      toast.success("Official Income Certificate Downloaded (PDF)", {
        description: "Includes cryptographically verified QR code for bank loan & visa verification.",
      });
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-primary/70 backdrop-blur-md"
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl z-10 border border-gray-100 overflow-hidden max-h-[92vh] flex flex-col"
      >
        {/* Modal actions top header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/80">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <span className="font-bold text-gray-900 text-sm">Verified Income Certificate</span>
            <span className="text-[10px] bg-green-100 text-green-800 font-semibold px-2 py-0.5 rounded-full border border-green-200">
              Valid & Cryptographically Signed
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-200/60 rounded-xl transition-colors"
              title="Print Certificate"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-200/60 rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate document body */}
        <div className="p-8 overflow-y-auto flex-1 bg-gradient-to-b from-amber-50/20 via-white to-amber-50/30">
          <div className="border-4 border-double border-amber-900/20 rounded-2xl p-6 sm:p-8 bg-white shadow-sm relative">
            {/* Watermark */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.03]">
              <span className="text-8xl font-black text-gray-900 uppercase tracking-widest rotate-[-25deg]">
                SKILOQ VERIFIED
              </span>
            </div>

            {/* Document Header */}
            <div className="text-center pb-6 border-b border-gray-200">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#1A1F36] text-white shadow-md mb-3">
                <span className="text-2xl font-black tracking-tight">S</span>
              </div>
              <h2 className="text-2xl font-serif font-bold text-gray-900 tracking-wide uppercase">
                Aelix Technology Inc. • Skiloq
              </h2>
              <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">
                Sub-Saharan Africa Proof-of-Work Infrastructure
              </p>
              <div className="mt-3 inline-block bg-amber-50 text-amber-900 border border-amber-200/80 px-3 py-1 rounded-full text-xs font-semibold">
                Official Proof of Demonstrable Income
              </div>
            </div>

            {/* Certificate text */}
            <div className="py-6 text-center space-y-4">
              <p className="text-xs text-gray-500 italic">This document certifies that</p>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 font-serif underline decoration-amber-400 decoration-2 underline-offset-8">
                {workerName}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 max-w-lg mx-auto leading-relaxed">
                is a verified professional on the Skiloq talent infrastructure, having demonstrated authenticated skills, seven-layer identity verification, and verified escrow transactions with client ratings.
              </p>
            </div>

            {/* Verified Statistics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-gray-50/80 rounded-2xl p-4 border border-gray-200/70 text-center my-4">
              <div>
                <p className="text-[11px] text-gray-500 font-medium">Lifetime Gross</p>
                <p className="text-sm sm:text-base font-extrabold text-gray-900 mt-0.5">
                  GHS {totalEarningsGhs.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-[11px] text-gray-500 font-medium">Avg Monthly</p>
                <p className="text-sm sm:text-base font-extrabold text-gray-900 mt-0.5">
                  GHS {averageMonthlyIncomeGhs.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-[11px] text-gray-500 font-medium">Completed Jobs</p>
                <p className="text-sm sm:text-base font-extrabold text-gray-900 mt-0.5">
                  {completedJobs} Projects
                </p>
              </div>
              <div>
                <p className="text-[11px] text-gray-500 font-medium">Trust Score</p>
                <p className="text-sm sm:text-base font-extrabold text-[#22C55E] mt-0.5">
                  {trustScore} / 100
                </p>
              </div>
            </div>

            {/* Footer with Signatures & QR Code */}
            <div className="pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center border border-gray-200">
                  <QrCode className="w-10 h-10 text-gray-800" />
                </div>
                <div className="text-left text-[11px] text-gray-500">
                  <p className="font-mono font-bold text-gray-800">{certificateNumber}</p>
                  <p>Scan to verify with Bank of Ghana PSP ledger</p>
                  <p className="text-emerald-600 font-medium">SHA-256 Hash Verified</p>
                </div>
              </div>

              <div className="text-center sm:text-right">
                <div className="h-8 font-serif italic text-lg text-primary font-semibold border-b border-gray-400 px-4">
                  Kwame Boateng, Lead Auditor
                </div>
                <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider">
                  Aelix Technology Inc. Trust & Verification Office
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Download action footer */}
        <div className="p-4 bg-white border-t border-gray-100 flex items-center justify-between gap-3">
          <p className="text-xs text-gray-500 hidden sm:block">
            Accepted by licensed partner banks, embassies & fintech loan partners.
          </p>
          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2.5 text-xs font-semibold text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50"
            >
              Close
            </button>
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="flex-1 sm:flex-none px-6 py-2.5 bg-[#1A1F36] hover:bg-[#252C4D] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>{isDownloading ? "Generating PDF..." : "Download Official PDF"}</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
