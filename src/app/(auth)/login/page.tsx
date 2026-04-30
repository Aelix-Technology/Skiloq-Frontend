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
    <div className="space-y-8">
      {/* Logo + Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-primary rounded-card">
          <span className="text-white text-xl font-bold">A</span>
        </div>
        <h1 className="text-xl font-bold text-primary">Welcome back</h1>
        <p className="text-sm text-primary-300">Sign in to your Aelix account</p>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center justify-center gap-2">
        <div className={`h-1 w-8 rounded-pill ${step === "phone" ? "bg-accent" : "bg-success"}`} />
        <div className={`h-1 w-8 rounded-pill ${step === "pin" ? "bg-accent" : "bg-primary-100"}`} />
      </div>

      {/* Forms */}
      <div className="bg-white rounded-card border border-primary-50 shadow-sm p-6">
        {step === "phone" ? (
          <div className="space-y-4">
            <PhoneInput
              onSubmit={handlePhoneSubmit}
              buttonLabel="Continue"
            />
            <p className="text-center text-sm text-primary-300">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-accent font-medium hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-primary-300 text-center">
              Enter PIN for <span className="font-medium text-primary">{phone}</span>
            </p>
            <PINInput
              mode="login"
              onComplete={handlePINComplete}
              onBack={() => { setStep("phone"); setError(""); }}
              isLoading={loginMutation.isPending}
              error={error}
            />
          </div>
        )}
      </div>
    </div>
  );
}