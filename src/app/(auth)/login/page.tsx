// src/app/(auth)/login/page.tsx
"use client";

import { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Shield,
  Key,
  Smartphone,
  ShieldCheck,
  Sparkles,
  Lock,
  Globe2,
} from "lucide-react";
import { useLogin, useVerifyOTP } from "@/hooks/useAuth";
import { useAuthStore } from "@/stores/auth.store";

type Step = "phone" | "otp";

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0B0F19]" />}>
      <LoginPageContent />
    </Suspense>
  );
}

function LoginPageContent() {
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
      setError("Please enter a valid phone number");
      return;
    }
    setError("");
    loginMutation.mutate(
      { phone },
      {
        onSuccess: () => setStep("otp"),
        onError: (err) => setError(err.detail || "Failed to send code"),
      }
    );
  };

  const handleOTPSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 4) {
      setError("Please enter the verification code");
      return;
    }
    setError("");
    verifyMutation.mutate(
      { phone, pin: otp },
      {
        onError: (err) => setError(err.detail || "Invalid code entered"),
      }
    );
  };

  return (
    <div className="min-h-screen w-full flex bg-[#F8FAFC]">
      {/* ── Left Hero Brand Panel (Desktop) ── */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-5/12 bg-[#0B0F19] text-white relative overflow-hidden flex-col justify-between p-10 xl:p-14 border-r border-white/10 select-none">
        {/* Glow ambient background meshes */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full bg-blue-600/25 blur-[120px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute top-1/2 -right-24 w-96 h-96 rounded-full bg-indigo-600/20 blur-[130px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 left-1/3 w-96 h-96 rounded-full bg-emerald-600/15 blur-[140px]"
        />
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Top: Logo */}
        <div className="relative z-10 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 bg-gradient-to-br from-blue-500 via-indigo-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25 ring-1 ring-white/20 group-hover:scale-105 transition-transform">
              <span className="text-white font-black text-xl tracking-tight">S</span>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-2xl tracking-tight text-white leading-none">
                Skiloq
              </span>
              <span className="text-[11px] font-medium text-blue-300/80 tracking-wider uppercase mt-0.5">
                Verified Talent Network
              </span>
            </div>
          </Link>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-blue-200 border border-white/15 backdrop-blur-md">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Pan-African Escrow
          </span>
        </div>

        {/* Middle: Feature Showcase */}
        <div className="relative z-10 my-auto py-8 space-y-6 max-w-lg">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
            Trusted by Businesses Across Africa
          </div>

          <h2 className="text-3xl xl:text-4xl font-extrabold tracking-tight leading-tight text-white">
            Proof of work, not CV claims.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-emerald-400">
              Verified & Guaranteed.
            </span>
          </h2>

          <p className="text-gray-400 text-sm leading-relaxed">
            Sign in securely using your mobile phone number. Instant verification, zero passwords to remember, protected by encrypted session security.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">
                  <Globe2 className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Ghana • Nigeria</p>
                  <p className="text-[11px] text-gray-400">Regional coverage</p>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Passwordless</p>
                  <p className="text-[11px] text-gray-400">Secure OTP login</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom: Footer Info */}
        <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
          <span>&copy; {new Date().getFullYear()} Skiloq Technologies Inc.</span>
          <span className="text-gray-500">Security Verified 🔒</span>
        </div>
      </div>

      {/* ── Right Form Panel ── */}
      <div className="flex-1 flex flex-col justify-between p-4 sm:p-8 lg:p-12 overflow-y-auto">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between mb-6">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-base">S</span>
            </div>
            <span className="font-extrabold text-xl text-gray-900 tracking-tight">Skiloq</span>
          </Link>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100">
            Secure Portal
          </span>
        </div>

        <div className="max-w-md w-full mx-auto my-auto py-6 space-y-6">
          {/* Form Card */}
          <div className="bg-white rounded-3xl border border-gray-200/80 shadow-[0_20px_50px_-20px_rgba(15,23,42,0.08)] p-6 sm:p-8 space-y-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                Welcome back
              </h1>
              <p className="text-sm text-gray-500 mt-1.5">
                Sign in with your phone number to access your account.
              </p>
            </div>

            {/* Stepper Breadcrumb */}
            <div className="flex items-center gap-2 p-1.5 bg-gray-50 rounded-2xl border border-gray-100">
              <div
                className={`flex-1 py-1.5 px-3 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${
                  step === "phone"
                    ? "bg-white text-blue-600 shadow-sm border border-black/5"
                    : "text-gray-400"
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>1. Phone Number</span>
              </div>
              <div
                className={`flex-1 py-1.5 px-3 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${
                  step === "otp"
                    ? "bg-white text-blue-600 shadow-sm border border-black/5"
                    : "text-gray-400"
                }`}
              >
                <Key className="w-3.5 h-3.5" />
                <span>2. Verification Code</span>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {step === "phone" ? (
                <motion.form
                  key="phone-form"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  onSubmit={handlePhoneSubmit}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                      Mobile Phone Number
                    </label>
                    <div className="relative flex items-center">
                      <div className="absolute left-3 flex items-center gap-1.5 text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1.5 rounded-lg border border-gray-200 pointer-events-none select-none">
                        <span>🇬🇭</span>
                        <span>+233</span>
                      </div>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value.replace(/\D/g, ""));
                          setError("");
                        }}
                        placeholder="0542727188"
                        maxLength={15}
                        className="w-full bg-gray-50/50 border-2 border-gray-200 rounded-2xl pl-24 pr-4 py-3.5 text-sm font-semibold text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-all shadow-sm"
                        autoFocus
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs font-semibold text-red-600 flex items-center gap-2">
                      <span>⚠️</span>
                      <span>{error}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={phone.length < 9 || loginMutation.isPending}
                    className="w-full py-3.5 px-6 rounded-2xl font-bold text-sm text-white bg-[#2563EB] hover:bg-[#1D4ED8] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_8px_20px_-6px_rgba(37,99,235,0.5)] active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    {loginMutation.isPending ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending code...</span>
                      </div>
                    ) : (
                      <>
                        <span>Continue</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-gray-500 pt-2">
                    Don&apos;t have an account yet?{" "}
                    <Link
                      href="/register"
                      className="text-blue-600 font-bold hover:underline"
                    >
                      Create account
                    </Link>
                  </p>
                </motion.form>
              ) : (
                <motion.form
                  key="otp-form"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  onSubmit={handleOTPSubmit}
                  className="space-y-5"
                >
                  <div className="flex items-center justify-between bg-blue-50/60 p-3 rounded-2xl border border-blue-100">
                    <div className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                      <Smartphone className="w-4 h-4 text-blue-600" />
                      <span>Code sent to <strong className="text-gray-900 font-mono">{phone}</strong></span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setStep("phone");
                        setError("");
                        setOtp("");
                      }}
                      className="text-xs font-bold text-blue-600 hover:underline"
                    >
                      Change
                    </button>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2 text-center">
                      6-Digit Security Code
                    </label>
                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      value={otp}
                      onChange={(e) => {
                        setOtp(e.target.value.replace(/\D/g, "").slice(0, 6));
                        setError("");
                      }}
                      placeholder="123456"
                      className="w-full bg-gray-50/50 border-2 border-gray-200 rounded-2xl py-4 text-center text-3xl font-extrabold tracking-[0.4em] font-mono text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-blue-600 focus:bg-white transition-all shadow-sm"
                      autoFocus
                    />
                  </div>

                  {error && (
                    <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs font-semibold text-red-600 flex items-center gap-2">
                      <span>⚠️</span>
                      <span>{error}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={otp.length < 4 || verifyMutation.isPending}
                    className="w-full py-3.5 px-6 rounded-2xl font-bold text-sm text-white bg-[#2563EB] hover:bg-[#1D4ED8] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_8px_20px_-6px_rgba(37,99,235,0.5)] active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    {verifyMutation.isPending ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Verifying...</span>
                      </div>
                    ) : (
                      <>
                        <Shield className="w-4 h-4" />
                        <span>Verify & Sign In</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-between text-xs text-gray-500 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        loginMutation.mutate({ phone });
                        setOtp("");
                      }}
                      className="text-blue-600 font-bold hover:underline"
                    >
                      Resend code
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep("phone")}
                      className="text-gray-400 hover:text-gray-600 inline-flex items-center gap-1"
                    >
                      <ArrowLeft className="w-3 h-3" /> Back
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom footer text */}
        <div className="max-w-md w-full mx-auto text-center text-xs text-gray-400 py-2">
          By continuing, you agree to Skiloq&apos;s Terms of Service and Privacy Policy.
        </div>
      </div>
    </div>
  );
}
