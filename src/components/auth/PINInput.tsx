// src/components/auth/PINInput.tsx
"use client";

import { useState, useRef, useEffect } from "react";

interface PINInputProps {
  mode: "create" | "confirm" | "login";
  onComplete: (pin: string) => void;
  onBack?: () => void;
  isLoading?: boolean;
  error?: string;
}

export function PINInput({ mode, onComplete, onBack, isLoading, error }: PINInputProps) {
  const [pin, setPin] = useState<string[]>(new Array(4).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const getTitle = () => {
    switch (mode) {
      case "create": return "Create your 4-digit PIN";
      case "confirm": return "Confirm your PIN";
      case "login": return "Enter your PIN";
    }
  };

  const getSubtitle = () => {
    switch (mode) {
      case "create": return "You'll use this PIN to log in and confirm withdrawals";
      case "confirm": return "Enter the same PIN to confirm";
      case "login": return "Enter your 4-digit security PIN";
    }
  };

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newPin = [...pin];
    newPin[index] = value.slice(-1);
    setPin(newPin);

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }

    const pinString = newPin.join("");
    if (pinString.length === 4 && !newPin.includes("")) {
      onComplete(pinString);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      const newPin = [...pin];
      newPin[index - 1] = "";
      setPin(newPin);
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Masked display for login mode dots
  const isMasked = mode === "login";

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-primary">{getTitle()}</h2>
        <p className="text-sm text-primary-300 mt-1">{getSubtitle()}</p>
      </div>

      <div className="flex gap-3 justify-center">
        {pin.map((digit, index) => (
          <input
            key={index}
            ref={(el) => { inputRefs.current[index] = el; }}
            type={isMasked ? "password" : "text"}
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className={`w-14 h-16 text-center text-2xl font-bold rounded-input border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-accent/30 ${
              error
                ? "border-danger bg-danger-50"
                : digit
                ? "border-accent bg-accent-50"
                : "border-primary-100 bg-primary-50"
            }`}
            autoComplete="off"
          />
        ))}
      </div>

      {error && (
        <p className="text-center text-sm text-danger font-medium">{error}</p>
      )}

      {isLoading && (
        <div className="flex items-center justify-center gap-2 text-sm text-primary-300">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Verifying...
        </div>
      )}

      {onBack && (
        <button
          onClick={onBack}
          className="w-full text-center text-sm text-accent font-medium hover:underline"
        >
          ← Back
        </button>
      )}
    </div>
  );
}