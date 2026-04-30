// src/types/auth.ts
export type UserRole = "worker" | "employer" | "admin" | "agent";

export interface User {
  id: string;
  phone: string;
  phone_verified: boolean;
  role: UserRole;
  is_active: boolean;
  created_at: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
}

export interface LoginRequest {
  phone: string;
  pin: string;
}

export interface RegisterPhoneRequest {
  phone: string;
}

export interface VerifyOTPRequest {
  phone: string;
  otp: string;
}

export interface SetPINRequest {
  pin: string;
}

export interface ResetPINRequest {
  phone: string;
  otp: string;
  new_pin: string;
}