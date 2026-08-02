// src/app/(auth)/login/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Shield, Key, Smartphone, Check, CheckCircle } from "lucide-react";
import { useLogin, useVerifyOTP } from "@/hooks/useAuth";
import { useAuthStore } from "@/stores/auth.store";

type Step = "phone" | "otp";

export default function LoginPage() {
  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    if (isAuthenticated && user) {
      const dashboards: Record<string, string> = {
        worker: "/worker/dashboard",
        employer: "/employer/dashboard",
        admin: "/admin/dashboard",
        agent: "/agent/dashboard",
      };
      if (redirect) {
        try {
          const decoded = decodeURIComponent(redirect);
          if (decoded.startsWith("/") && !decoded.startsWith("//")) {
            router.replace(decoded);
            return;
          }
        } catch {
          // fall through
        }
      }
      const role = (user.role as keyof typeof dashboards) ?? "worker";
      router.replace(dashboards[role] ?? "/worker/dashboard");
    }
  }, [isAuthenticated, user, router, redirect]);

  const loginMutation = useLogin();
  const verifyMutation = useVerifyOTP(redirect);

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
    <div className="min-h-screen bg-gradient-to-br from-white via-primary-50/40 to-accent-50/40 flex">
      {/* Brand Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden flex-col justify-between p-12 xl:p-20">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />
        <div aria-hidden className="pointer-events-none absolute w-[480px] h-[480px] -top-32 -right-32 rounded-full bg-accent/30 blur-[120px]" />
        <div aria-hidden className="pointer-events-none absolute w-[400px] h-[400px] -bottom-24 -left-20 rounded-full bg-primary-700/40 blur-[120px]" />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-transparent" />
        <Link href="/" className="relative flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-xl ring-2 ring-white/20">
            <span className="text-primary font-bold text-lg">S</span>
          </div>
          <span className="text-white font-bold text-xl tracking-tight">Skiloq</span>
        </Link>
        <div className="relative">
          <p className="text-white/60 text-lg leading-relaxed max-w-md"> Africa&apos;s #1 verified talent platform. Proof of work, not CV claims.</p>
          <div className="backdrop-blur-md bg-white/10 ring-1 ring-white/15 rounded-2xl p-4 mt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-success-100" />
              </div>
              <div>
                <p className="text-white text-sm font-semibold">Trusted by 500+ businesses</p>
                <p className="text-white/40 text-xs">Across Ghana and beyond</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 flex items-center justify-center px-3 sm:px-8 py-8 sm:py-12 relative">
        <div aria-hidden className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-accent/10 blur-3xl" />
        <div className="w-full max-w-sm relative z-10">
          <div className="lg:hidden flex items-center gap-2.5 mb-10">
            <div className="w-9 h-9 bg-gradient-to-br from-primary to-accent-600 rounded-xl flex items-center justify-center ring-2 ring-accent/20 shadow-md">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="font-bold text-lg text-primary tracking-tight">Skiloq</span>
          </div>

          <div className="relative rounded-3xl border border-white/80 bg-white/70 backdrop-blur-xl shadow-[0_30px_80px_-22px_rgba(26,31,54,0.18)] p-6 sm:p-8 before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white before:to-transparent before:pointer-events-none">
            <div className="mb-8">
              <h1 className="bg-gradient-to-r from-primary via-primary-700 to-accent-600 bg-clip-text text-transparent text-2xl font-extrabold tracking-tight">Welcome back</h1>
              <p className="text-sm text-primary-300 mt-1.5 leading-relaxed">Sign in to your Skiloq account</p>
            </div>

            {/* Step indicator */}
            <div className="flex items-center gap-2 mb-8">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${step === "otp" ? "bg-success text-white ring-1 ring-success-200/50 shadow-sm" : "bg-gradient-to-br from-accent to-accent-600 text-white ring-4 ring-accent-50 shadow-[0_6px_18px_-6px_rgba(79,106,245,0.65)]"}`}>
                {step === "otp" ? <Check className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
              </div>
              <span className="text-sm font-medium text-primary">Phone</span>
              <div className="flex-1 h-px bg-gradient-to-r from-primary-100 to-primary-50" />
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${step === "otp" ? "bg-gradient-to-br from-accent to-accent-600 text-white ring-4 ring-accent-50 shadow-[0_6px_18px_-6px_rgba(79,106,245,0.65)]" : "bg-primary-50 text-primary-300 ring-1 ring-primary-100/70"}`}>
                <Key className="w-4 h-4" />
              </div>
              <span className={`text-sm font-medium ${step === "otp" ? "text-primary" : "text-primary-300"}`}>Code</span>
            </div>

            <AnimatePresence mode="wait">
              {step === "phone" ? (
                <motion.form key="phone" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }} onSubmit={handlePhoneSubmit} className="space-y-4">
                  <label className="text-sm font-semibold text-primary block">Phone Number</label>
                  <div className="relative">
                    <input type="tel" value={phone} onChange={(e) => { setPhone(e.target.value.replace(/\D/g, "")); setError(""); }} placeholder="0542727188" maxLength={15} className="w-full bg-white/70 backdrop-blur-sm border border-primary-100/70 rounded-2xl px-4 py-3.5 text-sm text-primary placeholder:text-primary-200 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all duration-200 shadow-sm focus:shadow-[0_0_0_4px_rgba(79,106,245,0.08)]" autoFocus />
                  </div>
                  {error && <p className="text-sm text-danger">{error}</p>}
                  <button type="submit" disabled={phone.length < 9 || loginMutation.isPending} className="w-full rounded-2xl font-semibold py-3.5 text-white transition-all duration-200 active:scale-[0.98] disabled:opacity-40 flex items-center justify-center gap-2 bg-gradient-to-br from-accent via-accent-500 to-accent-600 shadow-[0_10px_32px_-10px_rgba(79,106,245,0.70)] hover:shadow-[0_16px_40px_-10px_rgba(79,106,245,0.80)] hover:-translate-y-0.5">
                    {loginMutation.isPending ? "Sending code..." : <>Continue <ArrowLeft className="w-4 h-4 rotate-180" /></>}
                  </button>
                  <p className="text-center text-sm text-primary-300">
                     Don&apos;t have an account? <Link href="/register" className="text-accent font-semibold hover:underline">Sign up</Link>
                  </p>
                </motion.form>
              ) : (
                <motion.form key="otp" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }} onSubmit={handleOTPSubmit} className="space-y-5">
                  <div className="text-center">
                    <button type="button" onClick={() => { setStep("phone"); setError(""); setOtp(""); }} className="inline-flex items-center gap-1.5 text-sm text-primary-300 hover:text-primary transition-colors mb-4 px-3 py-1.5 rounded-xl hover:bg-accent/5">
                      <ArrowLeft className="w-4 h-4" /> {phone}
                    </button>
                    <p className="text-sm text-primary-300">Enter the verification code sent to your phone</p>
                  </div>
                  <input type="text" inputMode="numeric" maxLength={6} value={otp} onChange={(e) => { setOtp(e.target.value.replace(/\D/g, "").slice(0, 6)); setError(""); }} placeholder="000000" className="w-full bg-white/80 backdrop-blur-sm border border-primary-100/70 rounded-2xl px-4 py-5 text-center text-3xl font-extrabold tracking-[0.4em] text-primary placeholder:text-primary-200 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all duration-200 shadow-sm focus:shadow-[0_0_0_4px_rgba(79,106,245,0.08)]" autoFocus />
                  {error && <p className="text-sm text-danger text-center">{error}</p>}
                  <button type="submit" disabled={otp.length < 4 || verifyMutation.isPending} className="w-full rounded-2xl font-semibold py-3.5 text-white transition-all duration-200 active:scale-[0.98] disabled:opacity-40 flex items-center justify-center gap-2 bg-gradient-to-br from-accent via-accent-500 to-accent-600 shadow-[0_10px_32px_-10px_rgba(79,106,245,0.70)] hover:shadow-[0_16px_40px_-10px_rgba(79,106,245,0.80)] hover:-translate-y-0.5">
                    {verifyMutation.isPending ? "Verifying..." : <>Verify <Shield className="w-4 h-4" /></>}
                  </button>
                  <button type="button" onClick={() => loginMutation.mutate({ phone })} className="w-full text-center text-sm text-accent font-medium px-3 py-1.5 rounded-xl hover:bg-accent/5 transition-colors">
                    Resend code
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}