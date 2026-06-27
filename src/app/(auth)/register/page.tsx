// src/app/(auth)/register/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Shield, Key, Smartphone, Check, MessageCircle } from "lucide-react";
import { useRegisterPhone, useVerifyOTP, useSetPIN } from "@/hooks/useAuth";

type Step = "phone" | "otp" | "pin" | "confirm-pin";

export default function RegisterPage() {
  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [firstPin, setFirstPin] = useState("");
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [error, setError] = useState("");

  const registerMutation = useRegisterPhone();
  const verifyMutation = useVerifyOTP();
  const setPinMutation = useSetPIN();

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.trim().length < 9) {
      setError("Enter a valid phone number");
      return;
    }
    registerMutation.mutate(
      { phone },
      {
        onSuccess: () => setStep("otp"),
        onError: (err) => setError(err.detail || "Failed to send OTP"),
      }
    );
  };

  const handleOTPSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 4) {
      setError("Enter the verification code");
      return;
    }
    verifyMutation.mutate(
      { phone, pin: otp },
      {
        onSuccess: () => setStep("pin"),
        onError: (err) => setError(err.detail || "Invalid code"),
      }
    );
  };

  const handlePinChange = (setter: (v: string) => void, current: string, index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const arr = current.padEnd(4, "").split("");
    arr[index] = value;
    const newPin = arr.join("").slice(0, 4);
    setter(newPin);
    if (value && index < 3) document.getElementById(`reg-pin-${index + 1}`)?.focus();
  };

  const handlePinKeyDown = (current: string, index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !current[index] && index > 0) {
      document.getElementById(`reg-pin-${index - 1}`)?.focus();
    }
  };

  const handleFirstPinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.length !== 4) { setError("PIN must be 4 digits"); return; }
    setFirstPin(pin);
    setStep("confirm-pin");
    setError("");
  };

  const handleConfirmPinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (confirmPin !== firstPin) {
      setError("PINs don't match. Try again.");
      setConfirmPin("");
      return;
    }
    setPinMutation.mutate({ pin: confirmPin }, {
      onError: (err) => setError(err.detail || "Failed to set PIN"),
    });
  };

  const stepLabels = [
    { key: "phone", icon: Smartphone, label: "Phone" },
    { key: "otp", icon: MessageCircle, label: "Verify" },
    { key: "pin", icon: Key, label: "PIN" },
  ];

  const currentStepIndex = stepLabels.findIndex(
    (s) => s.key === step || (s.key === "pin" && (step === "pin" || step === "confirm-pin"))
  );

  return (
    <div className="min-h-screen bg-white flex">
      {/* Brand Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden flex-col justify-between p-12">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />
        <Link href="/" className="relative flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-primary font-bold text-lg">S</span>
          </div>
          <span className="text-white font-bold text-xl tracking-tight">Skiloq</span>
        </Link>
        <div className="relative">
          <p className="text-white/60 text-lg leading-relaxed max-w-md">Join thousands of verified African workers earning on their own terms. No CV required.</p>
          <div className="flex items-center gap-3 mt-6">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <Check className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-white text-sm font-semibold">Free to join</p>
              <p className="text-white/40 text-xs">Start earning in minutes</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-8 py-12">
        <div className="w-full max-w-sm">
          <div className="lg:hidden flex items-center gap-2.5 mb-10">
            <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="font-bold text-lg text-primary tracking-tight">Skiloq</span>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Create your account</h1>
            <p className="text-sm text-gray-500 mt-1.5">Join Africa&apos;s  verified talent network</p>
          </div>

          {/* Step indicator */}
          <div className="flex items-center gap-2 mb-8">
            {stepLabels.map((s, i) => (
              <div key={s.key} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${i < currentStepIndex ? "bg-emerald-500 text-white" : i === currentStepIndex ? "bg-primary text-white ring-4 ring-primary/10" : "bg-gray-100 text-gray-400"}`}>
                  {i < currentStepIndex ? <Check className="w-4 h-4" /> : <s.icon className="w-4 h-4" />}
                </div>
                <span className={`text-sm font-medium hidden sm:block ${i <= currentStepIndex ? "text-gray-900" : "text-gray-400"}`}>{s.label}</span>
                {i < 2 && <div className="flex-1 h-px bg-gray-200 hidden sm:block" />}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {step === "phone" && (
              <motion.form key="phone" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }} onSubmit={handlePhoneSubmit} className="space-y-4">
                <label className="text-sm font-semibold text-gray-700 block">Phone Number</label>
                <div className="relative">
                  <input type="tel" value={phone} onChange={(e) => { setPhone(e.target.value.replace(/\D/g, "")); setError(""); }} placeholder="0542727188" maxLength={15} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" autoFocus />
                </div>
                {error && <p className="text-sm text-red-500">{error}</p>}
                <button type="submit" disabled={phone.length < 9 || registerMutation.isPending} className="w-full bg-primary text-white font-semibold py-3.5 rounded-xl hover:bg-primary-600 transition-all disabled:opacity-40 flex items-center justify-center gap-2 active:scale-[0.98]">
                  {registerMutation.isPending ? "Sending OTP..." : <>Continue <ArrowLeft className="w-4 h-4 rotate-180" /></>}
                </button>
                <p className="text-center text-sm text-gray-500">
                  Already have an account? <Link href="/login" className="text-primary font-semibold hover:underline">Sign in</Link>
                </p>
              </motion.form>
            )}

            {step === "otp" && (
              <motion.form key="otp" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }} onSubmit={handleOTPSubmit} className="space-y-5">
                <div className="text-center">
                  <button type="button" onClick={() => { setStep("phone"); setError(""); setOtp(""); }} className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 mb-3">
                    <ArrowLeft className="w-4 h-4" /> {phone}
                  </button>
                  <p className="text-sm text-gray-500">Enter the verification code sent to your phone</p>
                </div>
                <input type="text" inputMode="numeric" maxLength={6} value={otp} onChange={(e) => { setOtp(e.target.value.replace(/\D/g, "").slice(0, 6)); setError(""); }} placeholder="000000" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-center text-2xl font-bold tracking-[0.3em] text-gray-900 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" autoFocus />
                {error && <p className="text-sm text-red-500 text-center">{error}</p>}
                <button type="submit" disabled={otp.length < 4 || verifyMutation.isPending} className="w-full bg-primary text-white font-semibold py-3.5 rounded-xl hover:bg-primary-600 transition-all disabled:opacity-40 flex items-center justify-center gap-2 active:scale-[0.98]">
                  {verifyMutation.isPending ? "Verifying..." : <>Verify <Shield className="w-4 h-4" /></>}
                </button>
                <button type="button" onClick={() => registerMutation.mutate({ phone })} className="w-full text-center text-sm text-primary font-medium hover:underline">Resend code</button>
              </motion.form>
            )}

            {(step === "pin" || step === "confirm-pin") && (
              <motion.form key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }} onSubmit={step === "pin" ? handleFirstPinSubmit : handleConfirmPinSubmit} className="space-y-5">
                <div className="text-center">
                  <button type="button" onClick={() => { if (step === "confirm-pin") { setStep("pin"); setConfirmPin(""); } else { setStep("otp"); setPin(""); } setError(""); }} className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 mb-3">
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  <p className="text-sm text-gray-500">{step === "pin" ? "Create your 4-digit security PIN" : "Confirm your PIN"}</p>
                </div>
                <div className="flex gap-3 justify-center">
                  {[0, 1, 2, 3].map((i) => (
                    <input key={i} id={`reg-pin-${i}`} type="password" inputMode="numeric" maxLength={1}
                      value={step === "pin" ? (pin[i] || "") : (confirmPin[i] || "")}
                      onChange={(e) => { if (step === "pin") handlePinChange(setPin, pin, i, e.target.value); else handlePinChange(setConfirmPin, confirmPin, i, e.target.value); setError(""); }}
                      onKeyDown={(e) => { if (step === "pin") handlePinKeyDown(pin, i, e); else handlePinKeyDown(confirmPin, i, e); }}
                      className={`w-14 h-16 text-center text-xl font-bold rounded-xl border-2 transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 ${error ? "border-red-300 bg-red-50" : (step === "pin" ? pin[i] : confirmPin[i]) ? "border-primary bg-primary/5" : "border-gray-200 bg-gray-50"}`}
                      autoFocus={i === 0} />
                  ))}
                </div>
                {error && <p className="text-sm text-red-500 text-center">{error}</p>}
                <button type="submit" disabled={(step === "pin" ? pin.length !== 4 : confirmPin.length !== 4) || setPinMutation.isPending} className="w-full bg-primary text-white font-semibold py-3.5 rounded-xl hover:bg-primary-600 transition-all disabled:opacity-40 flex items-center justify-center gap-2 active:scale-[0.98]">
                  {setPinMutation.isPending ? "Creating account..." : step === "pin" ? <>Continue <ArrowLeft className="w-4 h-4 rotate-180" /></> : <>Complete <Check className="w-4 h-4" /></>}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}