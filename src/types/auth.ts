// src/types/auth.ts
import type { Country, Locale } from "./phase2";

export type UserRole = "worker" | "employer" | "admin" | "agent";

export interface User {
  id: string;
  phone: string;
  phone_verified?: boolean;
  role?: UserRole;
  is_active?: boolean;
  created_at?: string;
  country?: Country;
  preferred_locale?: Locale;
  preferred_currency?: "GHS" | "NGN" | "KES" | "USD";
  [key: string]: unknown;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
}

export interface LoginRequest {
  phone: string;
}

export interface RegisterPhoneRequest {
  phone: string;
}

export interface VerifyOTPRequest {
  phone: string;
  pin: string;
}

export interface SetPINRequest {
  pin: string;
}

export interface ResetPINRequest {
  phone: string;
  otp: string;
  new_pin: string;
}
