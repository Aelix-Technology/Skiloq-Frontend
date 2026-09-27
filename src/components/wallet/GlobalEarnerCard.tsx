// src/components/wallet/GlobalEarnerCard.tsx
"use client";

import { useState } from "react";
import { Globe2, DollarSign, ArrowRightLeft, ShieldCheck, Check, Sparkles, X, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface GlobalEarnerCardProps {
  usdBalance?: number;
  exchangeRateUsdToGhs?: number;
  isGlobalEarner?: boolean;
}

export function GlobalEarnerCard({
  usdBalance = 840.0,
  exchangeRateUsdToGhs = 15.45,
  isGlobalEarner = true,
}: GlobalEarnerCardProps) {
  const [balanceUsd, setBalanceUsd] = useState(usdBalance);
  const [isConvertModalOpen, setIsConvertModalOpen] = useState(false);
  const [convertAmount, setConvertAmount] = useState("");

  const handleConvert = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(convertAmount);
    if (!val || val <= 0) {
      toast.error("Please enter a valid USD amount");
      return;
    }
    if (val > balanceUsd) {
      toast.error("Insufficient USD balance");
      return;
    }

    const ghsReceived = val * exchangeRateUsdToGhs;
    setBalanceUsd((prev) => prev - val);
    setConvertAmount("");
    setIsConvertModalOpen(false);

    toast.success(`Converted $${val.toFixed(2)} to GHS ${ghsReceived.toFixed(2)}!`, {
      description: "Funds credited to your GHS MoMo wallet at competitive Wise rate.",
    });
  };

  return (
    <>
      <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 rounded-3xl p-6 text-white border border-indigo-500/20 shadow-xl shadow-indigo-950/30 relative overflow-hidden">
        {/* Ambient lighting */}
        <div className="pointer-events-none absolute -right-16 -top-16 w-48 h-48 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-16 -bottom-16 w-44 h-44 rounded-full bg-blue-500/15 blur-3xl" />

        {/* Header */}
        <div className="flex items-start justify-between mb-5 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300">
              <Globe2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-white">Global Earner Account</h3>
                <span className="px-2 py-0.5 rounded-full bg-indigo-500/30 text-indigo-200 border border-indigo-400/40 text-[10px] font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-indigo-300" />
                  Verified Global
                </span>
              </div>
              <p className="text-xs text-indigo-200/70">Virtual USD Holding • Powered by Wise / Grey</p>
            </div>
          </div>

          <button
            onClick={() => setIsConvertModalOpen(true)}
            className="flex items-center gap-1.5 text-xs font-semibold bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-xl border border-white/15 transition-all active:scale-95"
          >
            <ArrowRightLeft className="w-3.5 h-3.5" />
            <span>Convert to GHS</span>
          </button>
        </div>

        {/* Balances & Conversion Preview */}
        <div className="grid sm:grid-cols-2 gap-4 items-center bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 mb-4 relative z-10">
          <div>
            <span className="text-xs text-indigo-200/80 font-medium">Virtual USD Balance</span>
            <p className="text-2xl sm:text-3xl font-extrabold text-white mt-0.5">
              ${balanceUsd.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </p>
            <p className="text-xs text-emerald-400 font-medium mt-1 flex items-center gap-1">
              <span>≈ GHS {(balanceUsd * exchangeRateUsdToGhs).toLocaleString("en-GH", { minimumFractionDigits: 2 })}</span>
            </p>
          </div>

          <div className="text-xs space-y-1.5 border-t sm:border-t-0 sm:border-l border-white/10 pt-3 sm:pt-0 sm:pl-4">
            <div className="flex justify-between text-indigo-200/80">
              <span>Live Wise Mid-Market:</span>
              <span className="font-bold text-white">1 USD = {exchangeRateUsdToGhs.toFixed(2)} GHS</span>
            </div>
            <div className="flex justify-between text-indigo-200/80">
              <span>Global Earner Margin:</span>
              <span className="font-semibold text-emerald-300">0.5% (Saved 50% vs bank)</span>
            </div>
            <div className="flex justify-between text-indigo-200/80">
              <span>Payout Method:</span>
              <span className="font-semibold text-white">Direct MTN MoMo / Bank</span>
            </div>
          </div>
        </div>

        {/* Benefits ticker */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-indigo-200/70 pt-2 border-t border-white/10 relative z-10">
          <span className="flex items-center gap-1">
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            International Employer Invoicing (Stripe)
          </span>
          <span className="flex items-center gap-1">
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            Zero Foreign Wire Fees
          </span>
        </div>
      </div>

      {/* Convert USD to GHS Modal */}
      <AnimatePresence>
        {isConvertModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-primary/60 backdrop-blur-sm"
              onClick={() => setIsConvertModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl z-10 border border-gray-100"
            >
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                    <ArrowRightLeft className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-base">Convert USD to GHS</h3>
                    <p className="text-xs text-gray-500">Live Wise Real-Time Rate</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsConvertModalOpen(false)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleConvert} className="mt-5 space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-semibold text-gray-700">Amount (USD)</label>
                    <span className="text-xs text-indigo-600 font-semibold cursor-pointer" onClick={() => setConvertAmount(balanceUsd.toString())}>
                      Max: ${balanceUsd.toFixed(2)}
                    </span>
                  </div>
                  <input
                    type="number"
                    value={convertAmount}
                    onChange={(e) => setConvertAmount(e.target.value)}
                    placeholder="e.g. 200"
                    min="1"
                    max={balanceUsd}
                    step="0.01"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-lg font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    autoFocus
                  />
                </div>

                <div className="bg-indigo-50/60 rounded-2xl p-4 border border-indigo-100 text-xs space-y-2 text-indigo-950">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Exchange Rate:</span>
                    <span className="font-bold">1 USD = {exchangeRateUsdToGhs.toFixed(2)} GHS</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Platform Fee:</span>
                    <span className="font-semibold text-emerald-700">0.5% (GHS {((parseFloat(convertAmount) || 0) * exchangeRateUsdToGhs * 0.005).toFixed(2)})</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-indigo-200/60 text-sm font-extrabold text-indigo-900">
                    <span>You Receive (GHS):</span>
                    <span>
                      GHS {Math.max(0, (parseFloat(convertAmount) || 0) * exchangeRateUsdToGhs * 0.995).toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsConvertModalOpen(false)}
                    className="flex-1 py-3 text-xs font-semibold text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md shadow-indigo-600/30 transition-all active:scale-95"
                  >
                    Confirm Conversion
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
