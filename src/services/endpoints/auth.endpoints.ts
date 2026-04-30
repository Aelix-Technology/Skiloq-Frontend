// src/services/endpoints/auth.endpoints.ts
import { apiClient } from "@/lib/api";
import type {
  RegisterPhoneRequest,
  VerifyOTPRequest,
  SetPINRequest,
  LoginRequest,
  User,
  AuthTokens,
} from "@/types/auth";

const AUTH = "/auth";

export const authEndpoints = {
  registerPhone: (data: RegisterPhoneRequest) =>
    apiClient.post<{ message: string; expires_in: number }>(
      `${AUTH}/register/phone`,
      data
    ),

  verifyOTP: (data: VerifyOTPRequest) =>
    apiClient.post<AuthTokens & { user: User }>(
      `${AUTH}/verify-otp`,
      data
    ),

  login: (data: LoginRequest) =>
    apiClient.post<AuthTokens & { user: User }>(
      `${AUTH}/login`,
      data
    ),

  refreshToken: () =>
    apiClient.post<{ accessToken: string }>(`${AUTH}/refresh`),

  logout: () =>
    apiClient.post<{ message: string }>(`${AUTH}/logout`),

  setPIN: (data: SetPINRequest) =>
    apiClient.post<{ message: string }>(`${AUTH}/set-pin`, data),

  resetPIN: (data: { phone: string; otp: string; new_pin: string }) =>
    apiClient.post<{ message: string }>(`${AUTH}/reset-pin`, data),
};