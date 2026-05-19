// src/app/(auth)/login/page.tsx
"use client";

import { useState } from "react";
import { PhoneInput } from "@/components/auth/PhoneInput";
import { PINInput } from "@/components/auth/PINInput";
import { useLogin } from "@/hooks/useAuth";
import Link from "next/link";

type Step = "phone" | "pin";

export default function LoginPage() {
  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const loginMutation = useLogin();

  const handlePhoneSubmit = (submittedPhone: string) => {
    setPhone(submittedPhone);
    setStep("pin");
    setError("");
  };

  const handlePINComplete = (pin: string) => {
    loginMutation.mutate(
      { phone, pin },
      {
        onError: (err) => {
          setError(err.detail || "Invalid PIN");
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* ── Left: Brand Panel ── */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden flex-col justify-between p-12">
        {/* subtle dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "38px 38px",
          }}
        />

        {/* soft glow */}
        <div className="absolute top-[-120px] right-[-120px] w-[500px] h-[500px] bg-accent/10 rounded-full blur-[140px]" />

        <Link href="/" className="relative flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-md">
            <span className="text-primary font-bold text-lg">S</span>
          </div>
          <span className="text-white font-bold text-xl tracking-tight">
            Skiloq
          </span>
        </Link>

        <div className="relative">
          <p className="text-white/70 text-lg leading-relaxed max-w-md">
            Africa&apos;s #1 verified talent platform. Proof of work, not CV
            claims.
          </p>

          <div className="flex items-center gap-3 mt-7">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white text-sm font-bold">
              ✓
            </div>
            <div>
              <p className="text-white text-sm font-semibold">
                Trusted by 500+ businesses
              </p>
              <p className="text-white/40 text-xs">
                Across Africa and beyond
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right: Form ── */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-8 py-12">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2.5 mb-10">
            <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="font-bold text-lg text-primary tracking-tight">
              Skiloq
            </span>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              Welcome back
            </h1>
            <p className="text-sm text-gray-500 mt-1.5">
              Sign in to your Skiloq account
            </p>
          </div>

          {/* Step Indicator */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <div
              className={`h-1.5 w-10 rounded-full transition-all duration-300 ${
                step === "phone" ? "bg-primary" : "bg-gray-200"
              }`}
            />
            <div
              className={`h-1.5 w-10 rounded-full transition-all duration-300 ${
                step === "pin" ? "bg-primary" : "bg-gray-200"
              }`}
            />
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6">
            {step === "phone" ? (
              <div className="space-y-4">
                <PhoneInput onSubmit={handlePhoneSubmit} buttonLabel="Continue" />

                <p className="text-center text-sm text-gray-500">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/register"
                    className="text-primary font-semibold hover:underline"
                  >
                    Sign up
                  </Link>
                </p>

                <div className="bg-gray-50 rounded-xl p-3 text-center border border-gray-100">
                  <p className="text-[11px] text-gray-400">
                    Demo:{" "}
                    <span className="font-mono text-gray-600">
                      +233000000000
                    </span>{" "}
                    /{" "}
                    <span className="font-mono text-gray-600">0000</span>
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-gray-500 text-center">
                  Enter PIN for{" "}
                  <span className="font-medium text-gray-900">{phone}</span>
                </p>

                <PINInput
                  mode="login"
                  onComplete={handlePINComplete}
                  onBack={() => {
                    setStep("phone");
                    setError("");
                  }}
                  isLoading={loginMutation.isPending}
                  error={error}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}