// src/components/auth/PhoneInput.tsx
"use client";

import { useState } from "react";
import { CountryFlagSelect } from "./CountryFlagSelect";

interface PhoneInputProps {
  onSubmit: (phone: string) => void;
  isLoading?: boolean;
  buttonLabel?: string;
}

export function PhoneInput({ onSubmit, isLoading, buttonLabel = "Send OTP" }: PhoneInputProps) {
  const [dialCode, setDialCode] = useState("+233");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const validatePhone = (number: string): boolean => {
    const digits = number.replace(/\D/g, "");
    if (digits.length < 9) {
      setError("Phone number must be at least 9 digits");
      return false;
    }
    if (digits.length > 10) {
      setError("Phone number too long");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullPhone = `${dialCode}${phone.replace(/\D/g, "")}`;
    if (validatePhone(phone)) {
      onSubmit(fullPhone);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-primary-400 mb-2">
          Phone Number
        </label>
        <div className="flex gap-2">
          <CountryFlagSelect value={dialCode} onChange={setDialCode} />
          <input
            type="tel"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value.replace(/\D/g, ""));
              if (error) validatePhone(e.target.value);
            }}
            placeholder="24 123 4567"
            maxLength={10}
            className="flex-1 bg-primary-50 border border-primary-100 rounded-input px-4 py-3 text-md text-primary placeholder:text-primary-200 focus:outline-none focus:ring-2 focus:ring-accent/50"
            autoComplete="tel"
            inputMode="numeric"
          />
        </div>
        {error && (
          <p className="mt-1 text-xs text-danger">{error}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={!phone || isLoading}
        className="w-full bg-accent text-white font-medium py-3 rounded-input hover:bg-accent-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed touch-target"
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Sending...
          </span>
        ) : (
          buttonLabel
        )}
      </button>
    </form>
  );
}
