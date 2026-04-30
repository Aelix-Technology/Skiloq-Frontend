// src/components/auth/OTPInput.tsx
"use client";

import { useState, useRef, useEffect } from "react";

interface OTPInputProps {
  length?: number;
  onComplete: (otp: string) => void;
  isLoading?: boolean;
  onResend: () => void;
}

export function OTPInput({ length = 6, onComplete, isLoading, onResend }: OTPInputProps) {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
  const [resendTimer, setResendTimer] = useState(30);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Focus first input on mount
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Take only last digit
    setOtp(newOtp);

    // Auto-advance to next input
    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Check if complete
    const otpString = newOtp.join("");
    if (otpString.length === length && !newOtp.includes("")) {
      onComplete(otpString);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    const newOtp = [...otp];
    pasted.split("").forEach((char, i) => {
      if (i < length) newOtp[i] = char;
    });
    setOtp(newOtp);

    // Focus last filled or next empty
    const focusIndex = Math.min(pasted.length, length - 1);
    inputRefs.current[focusIndex]?.focus();

    if (newOtp.join("").length === length) {
      onComplete(newOtp.join(""));
    }
  };

  const handleResend = () => {
    setResendTimer(30);
    onResend();
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-primary-300 mb-1">Enter the 6-digit code sent to your phone</p>
      </div>

      <div className="flex gap-2 justify-center" onPaste={handlePaste}>
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => { inputRefs.current[index] = el; }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="w-12 h-14 text-center text-xl font-semibold bg-primary-50 border-2 border-primary-100 rounded-input focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 transition-colors"
            autoComplete="one-time-code"
          />
        ))}
      </div>

      {isLoading && (
        <div className="flex items-center justify-center gap-2 text-sm text-primary-300">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Verifying...
        </div>
      )}

      <div className="text-center">
        {resendTimer > 0 ? (
          <p className="text-sm text-primary-300">
            Resend code in <span className="font-medium text-primary">{resendTimer}s</span>
          </p>
        ) : (
          <button
            onClick={handleResend}
            className="text-sm text-accent font-medium hover:underline"
          >
            Resend OTP
          </button>
        )}
      </div>
    </div>
  );
}