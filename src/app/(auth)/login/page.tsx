// src/app/(auth)/login/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Shield, Key, Smartphone, Check } from "lucide-react";
import { useLogin, useVerifyOTP } from "@/hooks/useAuth";

type Step = "phone" | "otp";

export default function LoginPage() {
  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const loginMutation = useLogin();
  const verifyMutation = useVerifyOTP();

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.trim().length < 9) {
      setError("Enter a valid phone number");
      return;
    }
    loginMutation.mutate(
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
        onError: (err) => setError(err.detail || "Invalid code"),
      }
    );
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Brand Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden flex-col justify-between p-12">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />
        <Link href="/" className="relative flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-primary font-bold text-lg">S</span>
          </div>
          <span className="text-white font-bold text-xl tracking-tight">Skiloq</span>
        </Link>
        <div className="relative">
          <p className="text-white/60 text-lg leading-relaxed max-w-md"> Africa&apos;s #1 verified talent platform. Proof of work, not CV claims.</p>
          <div className="flex items-center gap-3 mt-6">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white text-sm font-bold">✓</div>
            <div>
              <p className="text-white text-sm font-semibold">Trusted by 500+ businesses</p>
              <p className="text-white/40 text-xs">Across Ghana and beyond</p>
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
            <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
            <p className="text-sm text-gray-500 mt-1.5">Sign in to your Skiloq account</p>
          </div>

          {/* Step indicator */}
          <div className="flex items-center gap-2 mb-8">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${step === "otp" ? "bg-emerald-500 text-white" : "bg-primary text-white ring-4 ring-primary/10"}`}>
              {step === "otp" ? <Check className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
            </div>
            <span className="text-sm font-medium text-gray-900">Phone</span>
            <div className="flex-1 h-px bg-gray-200" />
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${step === "otp" ? "bg-primary text-white ring-4 ring-primary/10" : "bg-gray-100 text-gray-400"}`}>
              <Key className="w-4 h-4" />
            </div>
            <span className={`text-sm font-medium ${step === "otp" ? "text-gray-900" : "text-gray-400"}`}>Code</span>
          </div>

          <AnimatePresence mode="wait">
            {step === "phone" ? (
              <motion.form key="phone" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }} onSubmit={handlePhoneSubmit} className="space-y-4">
                <label className="text-sm font-semibold text-gray-700 block">Phone Number</label>
                <div className="relative">
                  <input type="tel" value={phone} onChange={(e) => { setPhone(e.target.value.replace(/\D/g, "")); setError(""); }} placeholder="0542727188" maxLength={15} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" autoFocus />
                </div>
                {error && <p className="text-sm text-red-500">{error}</p>}
                <button type="submit" disabled={phone.length < 9 || loginMutation.isPending} className="w-full bg-primary text-white font-semibold py-3.5 rounded-xl hover:bg-primary-600 transition-all disabled:opacity-40 flex items-center justify-center gap-2 active:scale-[0.98]">
                  {loginMutation.isPending ? "Sending code..." : <>Continue <ArrowLeft className="w-4 h-4 rotate-180" /></>}
                </button>
                <p className="text-center text-sm text-gray-500">
                   Don&apos;t have an account? <Link href="/register" className="text-primary font-semibold hover:underline">Sign up</Link>
                </p>
              </motion.form>
            ) : (
              <motion.form key="otp" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }} onSubmit={handleOTPSubmit} className="space-y-5">
                <div className="text-center">
                  <button type="button" onClick={() => { setStep("phone"); setError(""); setOtp(""); }} className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-4">
                    <ArrowLeft className="w-4 h-4" /> {phone}
                  </button>
                  <p className="text-sm text-gray-500">Enter the verification code sent to your phone</p>
                </div>
                <input type="text" inputMode="numeric" maxLength={6} value={otp} onChange={(e) => { setOtp(e.target.value.replace(/\D/g, "").slice(0, 6)); setError(""); }} placeholder="000000" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-center text-2xl font-bold tracking-[0.3em] text-gray-900 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" autoFocus />
                {error && <p className="text-sm text-red-500 text-center">{error}</p>}
                <button type="submit" disabled={otp.length < 4 || verifyMutation.isPending} className="w-full bg-primary text-white font-semibold py-3.5 rounded-xl hover:bg-primary-600 transition-all disabled:opacity-40 flex items-center justify-center gap-2 active:scale-[0.98]">
                  {verifyMutation.isPending ? "Verifying..." : <>Verify <Shield className="w-4 h-4" /></>}
                </button>
                <button type="button" onClick={() => loginMutation.mutate({ phone })} className="w-full text-center text-sm text-primary font-medium hover:underline">
                  Resend code
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}