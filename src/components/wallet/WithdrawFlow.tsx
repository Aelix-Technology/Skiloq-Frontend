// src/components/wallet/WithdrawFlow.tsx
"use client";

import { useState } from "react";
import { X, Check, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface WithdrawFlowProps {
  isOpen: boolean;
  onClose: () => void;
  available_ghs: number;
  momo_number: string;
  onWithdraw: (amount: number, pin: string) => void;
  isWithdrawing: boolean;
}

type Step = "amount" | "confirm" | "pin" | "processing" | "success";

export function WithdrawFlow({
  isOpen,
  onClose,
  available_ghs,
  momo_number,
  onWithdraw,
}: WithdrawFlowProps) {
  const [step, setStep] = useState<Step>("amount");
  const [amount, setAmount] = useState("");
  const [pin, setPin] = useState<string[]>(new Array(4).fill(""));

  const maskedNumber = momo_number.replace(/(\d{3})\d{4}(\d{3})/, "$1****$2");
  const fee = parseFloat(amount) * 0.015 || 0;
  const netAmount = parseFloat(amount) - fee || 0;

  const reset = () => {
    setStep("amount");
    setAmount("");
    setPin(new Array(4).fill(""));
  };

  const handleClose = () => {
    if (step === "processing") return; // Don't close during processing
    reset();
    onClose();
  };

  const handleAmountSubmit = () => {
    const value = parseFloat(amount);
    if (value < 10) {
      toast.error("Minimum withdrawal is GHS 10");
      return;
    }
    if (value > available_ghs) {
      toast.error("Insufficient available balance");
      return;
    }
    if (value > 10000) {
      toast.error("Daily limit is GHS 10,000");
      return;
    }
    setStep("confirm");
  };

  const handlePinChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newPin = [...pin];
    newPin[index] = value.slice(-1);
    setPin(newPin);

    if (value && index < 3) {
      const nextInput = document.getElementById(`pin-${index + 1}`);
      nextInput?.focus();
    }

    const pinString = newPin.join("");
    if (pinString.length === 4 && !newPin.includes("")) {
      handleWithdraw(pinString);
    }
  };

  const handlePinKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      const prevInput = document.getElementById(`pin-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleWithdraw = (pinString: string) => {
    setStep("processing");
    onWithdraw(parseFloat(amount), pinString);
    // Simulate success after delay (real flow handles this in mutation)
    setTimeout(() => setStep("success"), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-primary/60 backdrop-blur-sm" onClick={handleClose} />
      <div className="relative min-h-[320px] w-full rounded-t-2xl bg-white/95 p-6 shadow-2xl backdrop-blur-xl sm:max-w-md sm:rounded-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold tracking-tight text-primary">
            {step === "amount" && "Withdraw"}
            {step === "confirm" && "Confirm"}
            {step === "pin" && "Enter PIN"}
            {step === "processing" && "Processing"}
            {step === "success" && "Success!"}
          </h2>
          {step !== "processing" && (
            <button
              onClick={handleClose}
              className="flex min-h-11 w-11 items-center justify-center rounded-xl transition-all hover:-translate-y-1 hover:bg-primary-50 hover:shadow-lg active:scale-95"
            >
              <X className="w-4 h-4 text-primary-300" />
            </button>
          )}
        </div>

        {/* Step: Amount */}
        {step === "amount" && (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-primary-400 mb-2 block">
                Amount (GHS)
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full rounded-xl border border-primary-100 bg-primary-50 px-4 py-4 text-center text-2xl font-bold text-primary focus:outline-none focus:ring-2 focus:ring-accent/50"
                autoFocus
              />
              <p className="text-xs text-primary-300 mt-2 text-center">
                Fee: GHS {fee.toFixed(2)} (1.5%) - Net: GHS {netAmount.toFixed(2)}
              </p>
            </div>

            <div className="rounded-2xl bg-primary-50 p-3">
              <div className="flex justify-between text-xs text-primary-300">
                <span>Available</span>
                <span>GHS {available_ghs.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs text-primary-300 mt-1">
                <span>Daily limit</span>
                <span>GHS 10,000</span>
              </div>
            </div>

            <button
              onClick={handleAmountSubmit}
              disabled={!amount || parseFloat(amount) < 10}
              className="min-h-11 w-full rounded-xl bg-accent py-3 font-semibold text-white transition-all hover:-translate-y-1 hover:bg-accent-600 hover:shadow-xl hover:shadow-accent/20 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Continue
            </button>
          </div>
        )}

        {/* Step: Confirm */}
        {step === "confirm" && (
          <div className="space-y-4">
            <div className="rounded-2xl bg-primary-50 p-4">
              <p className="text-sm text-primary-300 mb-3">Review withdrawal details</p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-primary-300">Amount</span>
                  <span className="font-medium text-primary">GHS {parseFloat(amount).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-primary-300">Fee (1.5%)</span>
                  <span className="font-medium text-primary">GHS {fee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm pt-2 border-t border-primary-100">
                  <span className="text-primary-300">You receive</span>
                  <span className="font-bold text-accent">GHS {netAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm pt-2 border-t border-primary-100">
                  <span className="text-primary-300">To</span>
                  <span className="font-medium text-primary">{maskedNumber}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setStep("pin")}
              className="min-h-11 w-full rounded-xl bg-accent py-3 font-semibold text-white transition-all hover:-translate-y-1 hover:bg-accent-600 hover:shadow-xl hover:shadow-accent/20 active:scale-95"
            >
              Confirm & Enter PIN
            </button>
            <button
              onClick={() => setStep("amount")}
              className="min-h-11 w-full rounded-xl text-center text-sm font-semibold text-accent transition-all hover:-translate-y-1 hover:bg-accent-50 hover:shadow-lg active:scale-95"
            >
              Back to amount
            </button>
          </div>
        )}

        {/* Step: PIN */}
        {step === "pin" && (
          <div className="space-y-6">
            <p className="text-sm text-primary-300 text-center">
              Enter your 4-digit security PIN to confirm
            </p>

            <div className="flex gap-3 justify-center">
              {pin.map((digit, index) => (
                <input
                  key={index}
                  id={`pin-${index}`}
                  type="password"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handlePinChange(index, e.target.value)}
                  onKeyDown={(e) => handlePinKeyDown(index, e)}
                  className="h-16 w-14 rounded-xl border-2 border-primary-100 bg-primary-50 text-center text-2xl font-bold focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
                  autoFocus={index === 0}
                />
              ))}
            </div>

            <p className="text-xs text-primary-300 text-center">
              PIN is separate from your login PIN
            </p>

            <button
              onClick={() => setStep("confirm")}
              className="min-h-11 w-full rounded-xl text-center text-sm font-semibold text-accent transition-all hover:-translate-y-1 hover:bg-accent-50 hover:shadow-lg active:scale-95"
            >
              Back
            </button>
          </div>
        )}

        {/* Step: Processing */}
        {step === "processing" && (
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <Loader2 className="w-12 h-12 text-accent animate-spin" />
            <p className="text-sm text-primary-300">Processing your withdrawal...</p>
            <p className="text-xs text-primary-200">This usually takes under 2 minutes</p>
          </div>
        )}

        {/* Step: Success */}
        {step === "success" && (
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-success/10 flex items-center justify-center">
              <Check className="w-8 h-8 text-success" />
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-primary">GHS {netAmount.toFixed(2)} Sent!</p>
              <p className="text-sm text-primary-300 mt-1">To {maskedNumber}</p>
              <p className="text-xs text-success font-medium mt-2">
                Arrives in 0-2 minutes (MTN)
              </p>
            </div>
            <button
              onClick={handleClose}
              className="mt-4 min-h-11 w-full rounded-xl bg-accent py-3 font-semibold text-white transition-all hover:-translate-y-1 hover:bg-accent-600 hover:shadow-xl hover:shadow-accent/20 active:scale-95"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
