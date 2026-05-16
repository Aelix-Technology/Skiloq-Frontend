// src/app/(auth)/register/page.tsx
"use client";

import { useState } from "react";
import { PhoneInput } from "@/components/auth/PhoneInput";
import { OTPInput } from "@/components/auth/OTPInput";
import { PINInput } from "@/components/auth/PINInput";
import { useRegisterPhone, useVerifyOTP, useSetPIN } from "@/hooks/useAuth";
import Link from "next/link";

type Step = "phone" | "otp" | "pin" | "confirm-pin";

export default function RegisterPage() {
  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [firstPin, setFirstPin] = useState("");
  const [error, setError] = useState("");

  const registerMutation = useRegisterPhone();
  const verifyMutation = useVerifyOTP();
  const setPinMutation = useSetPIN();

  const handlePhoneSubmit = (submittedPhone: string) => {
    setPhone(submittedPhone);
    registerMutation.mutate(
      { phone: submittedPhone },
      {
        onSuccess: () => setStep("otp"),
        onError: (err) => setError(err.detail || "Failed to send OTP"),
      }
    );
  };

  const handleOTPComplete = (otp: string) => {
    verifyMutation.mutate(
      { phone, otp },
      {
        onSuccess: () => setStep("pin"),
        onError: (err) => setError(err.detail || "Invalid OTP"),
      }
    );
  };

  const handleFirstPIN = (pin: string) => {
    setFirstPin(pin);
    setStep("confirm-pin");
    setError("");
  };

  const handleConfirmPIN = (pin: string) => {
    if (pin !== firstPin) {
      setError("PINs don't match. Try again.");
      // Reset confirm inputs
      return;
    }
    setPinMutation.mutate(
      { pin },
      {
        onError: (err) => setError(err.detail || "Failed to set PIN"),
      }
    );
  };

  const steps = [
    { key: "phone", label: "Phone" },
    { key: "otp", label: "Verify" },
    { key: "pin", label: "PIN" },
  ];

  const currentStepIndex = steps.findIndex((s) => s.key === step || s.key === "pin" && (step === "pin" || step === "confirm-pin"));

  return (
    <div className="space-y-8">
      {/* Logo + Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-primary rounded-card">
          <span className="text-white text-xl font-bold">A</span>
        </div>
        <h1 className="text-xl font-bold text-primary">Create your account</h1>
        <p className="text-sm text-primary-300">Join Africa&apos;s verified talent network</p>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center justify-center gap-2">
        {steps.map((s, i) => (
          <div
            key={s.key}
            className={`h-1 w-8 rounded-pill transition-colors ${
              i < currentStepIndex
                ? "bg-success"
                : i === currentStepIndex
                ? "bg-accent"
                : "bg-primary-100"
            }`}
          />
        ))}
      </div>

      {/* Forms */}
      <div className="bg-white rounded-card border border-primary-50 shadow-sm p-6">
        {step === "phone" && (
          <div className="space-y-4">
            <PhoneInput
              onSubmit={handlePhoneSubmit}
              isLoading={registerMutation.isPending}
            />
            <p className="text-center text-sm text-primary-300">
              Already have an account?{" "}
              <Link href="/login" className="text-accent font-medium hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        )}

        {step === "otp" && (
          <div className="space-y-4">
            <p className="text-sm text-primary-300 text-center">
              We sent a code to <span className="font-medium text-primary">{phone}</span>
            </p>
            <OTPInput
              onComplete={handleOTPComplete}
              isLoading={verifyMutation.isPending}
              onResend={() => registerMutation.mutate({ phone })}
            />

            {error && (
              <p className="text-center text-sm text-danger">{error}</p>
            )}

            <button
              onClick={() => setStep("phone")}
              className="w-full text-center text-sm text-accent font-medium hover:underline"
            >
              ← Change phone number
            </button>
          </div>
        )}

        {(step === "pin" || step === "confirm-pin") && (
          <PINInput
            mode={step === "pin" ? "create" : "confirm"}
            onComplete={step === "pin" ? handleFirstPIN : handleConfirmPIN}
            onBack={() => {
              if (step === "confirm-pin") {
                setStep("pin");
                setFirstPin("");
              } else {
                setStep("otp");
              }
              setError("");
            }}
            isLoading={setPinMutation.isPending}
            error={error}
          />
        )}
      </div>
    </div>
  );
}
