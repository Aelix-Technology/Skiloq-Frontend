// src/components/wallet/SavingsVaultCard.tsx
"use client";

import { useState } from "react";
import { PiggyBank, Lock, ArrowUpRight, Percent, Sparkles, CheckCircle2, ChevronRight, X } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface SavingsVaultCardProps {
  currentBalanceGhs?: number;
  goalGhs?: number;
  interestRateAnnual?: number;
  interestEarnedGhs?: number;
  lockedUntil?: string;
  isRoundUpEnabled?: boolean;
}

export function SavingsVaultCard({
  currentBalanceGhs = 2450.0,
  goalGhs = 5000.0,
  interestRateAnnual = 10.5,
  interestEarnedGhs = 142.8,
  lockedUntil = "15 Dec 2026",
  isRoundUpEnabled: initialRoundUp = true,
}: SavingsVaultCardProps) {
  const [balance, setBalance] = useState(currentBalanceGhs);
  const [roundUp, setRoundUp] = useState(initialRoundUp);
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [depositAmount, setDepositAmount] = useState("");
  const [lockMonths, setLockMonths] = useState(6);

  const progress = Math.min(100, Math.round((balance / goalGhs) * 100));

  const handleToggleRoundUp = () => {
    const nextState = !roundUp;
    setRoundUp(nextState);
    if (nextState) {
      toast.success("Round-Up Savings Enabled", {
        description: "Withdrawals will round up to nearest GHS 10, difference deposited into your vault.",
      });
    } else {
      toast.info("Round-Up Savings Paused");
    }
  };

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(depositAmount);
    if (!val || val <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    setBalance((prev) => prev + val);
    setDepositAmount("");
    setIsDepositOpen(false);
    toast.success(`GHS ${val.toFixed(2)} locked into Savings Vault!`, {
      description: `Earning ${interestRateAnnual}% APY via licensed partner.`,
    });
  };

  return (
    <>
      <div className="bg-gradient-to-br from-white via-emerald-50/30 to-teal-50/40 rounded-3xl p-6 border border-emerald-200/60 shadow-lg shadow-emerald-500/5 relative overflow-hidden transition-all hover:shadow-xl">
        {/* Glow ambient */}
        <div className="pointer-events-none absolute -right-16 -top-16 w-44 h-44 rounded-full bg-emerald-400/10 blur-2xl" />

        {/* Top bar */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/20">
              <PiggyBank className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-gray-900 text-base">Savings Vault</h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-200">
                  {interestRateAnnual}% APY
                </span>
              </div>
              <p className="text-xs text-gray-500">Lock & Earn • Licensed Microfinance Partner</p>
            </div>
          </div>

          <button
            onClick={() => setIsDepositOpen(true)}
            className="flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-100/80 hover:bg-emerald-200/80 px-3 py-1.5 rounded-xl transition-all active:scale-95"
          >
            <span>Lock Funds</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Progress & Balances */}
        <div className="grid sm:grid-cols-2 gap-4 items-center bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-emerald-100/80 mb-4">
          <div>
            <p className="text-xs font-semibold text-gray-500">Locked Vault Balance</p>
            <p className="text-2xl font-extrabold text-gray-900 mt-0.5">
              GHS {balance.toLocaleString("en-GH", { minimumFractionDigits: 2 })}
            </p>
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium mt-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>GHS {interestEarnedGhs.toFixed(2)} interest accrued so far</span>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-gray-500">Target: GHS {goalGhs.toLocaleString()}</span>
              <span className="text-emerald-700">{progress}% reached</span>
            </div>
            <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full rounded-full transition-all duration-700"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-[11px] text-gray-400 flex items-center gap-1">
              <Lock className="w-3 h-3 text-gray-400" />
              Locked until {lockedUntil} for guaranteed yield
            </p>
          </div>
        </div>

        {/* Round-up Auto Savings Toggle */}
        <div className="flex items-center justify-between pt-3 border-t border-emerald-100/80">
          <div className="pr-4">
            <div className="flex items-center gap-1.5">
              <p className="text-xs font-bold text-gray-800">Auto Round-Up Savings</p>
              <span className="text-[10px] bg-emerald-50 text-emerald-600 px-1.5 py-0.2 rounded font-medium">Recommended</span>
            </div>
            <p className="text-[11px] text-gray-500 mt-0.5">
              Round withdrawals to the nearest GHS 10 and auto-save the difference into this vault
            </p>
          </div>

          <button
            type="button"
            onClick={handleToggleRoundUp}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              roundUp ? "bg-emerald-600" : "bg-gray-200"
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                roundUp ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Deposit / Lock Modal */}
      <AnimatePresence>
        {isDepositOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-primary/60 backdrop-blur-sm"
              onClick={() => setIsDepositOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl z-10 border border-gray-100"
            >
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                    <PiggyBank className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-base">Lock & Earn Savings</h3>
                    <p className="text-xs text-gray-500">Fixed rate 10.5% APY</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsDepositOpen(false)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleDeposit} className="mt-5 space-y-4">
                <div>
                  <label className="text-xs font-semibold text-gray-700 mb-1 block">Amount to Lock (GHS)</label>
                  <input
                    type="number"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    placeholder="e.g. 500"
                    min="50"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-lg font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    autoFocus
                  />
                  <p className="text-[11px] text-gray-500 mt-1">Minimum deposit is GHS 50</p>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-700 mb-1.5 block">Lock Period</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { months: 3, label: "3 Months", apy: "8.5%" },
                      { months: 6, label: "6 Months", apy: "10.5%" },
                      { months: 12, label: "12 Months", apy: "12.0%" },
                    ].map((period) => (
                      <button
                        key={period.months}
                        type="button"
                        onClick={() => setLockMonths(period.months)}
                        className={`p-2.5 rounded-xl border text-center transition-all ${
                          lockMonths === period.months
                            ? "bg-emerald-50 border-emerald-500 text-emerald-800 font-bold"
                            : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                        }`}
                      >
                        <p className="text-xs font-semibold">{period.label}</p>
                        <p className="text-[10px] text-emerald-600 mt-0.5">{period.apy} APY</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-emerald-50/70 rounded-2xl p-3.5 border border-emerald-100 text-xs text-emerald-900 space-y-1">
                  <div className="flex justify-between">
                    <span>Est. Maturity Interest:</span>
                    <span className="font-bold">
                      GHS {((parseFloat(depositAmount) || 0) * (lockMonths === 12 ? 0.12 : lockMonths === 6 ? 0.105 : 0.085) * (lockMonths / 12)).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-emerald-700 text-[11px]">
                    <span>Custodian:</span>
                    <span>Licensed Partner Trust Acct</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsDepositOpen(false)}
                    className="flex-1 py-3 text-xs font-semibold text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-md shadow-emerald-600/30 transition-all active:scale-95"
                  >
                    Confirm & Lock
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
