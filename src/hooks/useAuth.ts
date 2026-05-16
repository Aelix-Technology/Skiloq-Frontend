// src/hooks/useAuth.ts
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { apiClient, ApiError } from "@/lib/api";
import { useAuthStore } from "@/stores/auth.store";
import { toasts } from "@/lib/toasts";
import type {
  RegisterPhoneRequest,
  VerifyOTPRequest,
  SetPINRequest,
  LoginRequest,
  User,
} from "@/types/auth";

// Response types
interface AuthResponse {
  accessToken: string;
  refreshToken?: string;
  user: User;
}

interface MessageResponse {
  message: string;
  expires_in?: number;
}

/**
 * Sends OTP to the provided phone number.
 * Used in Step 1 of registration.
 */
export function useRegisterPhone() {
  return useMutation({
    mutationFn: (data: RegisterPhoneRequest) =>
      apiClient.post<MessageResponse>("/auth/register/phone", data),
    onSuccess: () => toasts.otpSent(),
    onError: (error: ApiError) => {
      toast.error(error.detail || "Failed to send OTP");
    },
  });
}

/**
 * Verifies the OTP and sets auth state.
 * Does NOT redirect — the register page handles the next step (PIN setup).
 */
export function useVerifyOTP() {
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation({
    mutationFn: (data: VerifyOTPRequest) =>
      apiClient.post<AuthResponse>("/auth/verify-otp", data),
    onSuccess: (data) => {
      setAuth(data.user, { accessToken: data.accessToken });
      toasts.otpVerified();
    },
    onError: (error: ApiError) => {
      toast.error(error.detail || "Invalid OTP");
    },
  });
}

/**
 * Logs in with phone and PIN.
 * Routes to the correct dashboard based on user role.
 */
export function useLogin() {
  const setAuth = useAuthStore((s) => s.setAuth);
  const router = useRouter();

  return useMutation({
    mutationFn: (data: LoginRequest) =>
      apiClient.post<AuthResponse>("/auth/login", data),
    onSuccess: (data) => {
      setAuth(data.user, { accessToken: data.accessToken });
      toasts.welcomeBack();

      switch (data.user.role) {
        case "worker":
          router.push("/worker/onboarding");
          break;
        case "employer":
          router.push("/employer/dashboard");
          break;
        case "admin":
          router.push("/admin/dashboard");
          break;
        case "agent":
          router.push("/agent/dashboard");
          break;
      }
    },
    onError: (error: ApiError) => {
      if (error.code === "LOCKED") {
        toasts.accountLocked();
      } else if (error.code === "INVALID_PIN") {
        toasts.invalidPIN();
      } else {
        toast.error(error.detail || "Login failed");
      }
    },
  });
}

/**
 * Sets the user's 4-digit PIN after OTP verification.
 */
export function useSetPIN() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);

  return useMutation({
    mutationFn: (data: SetPINRequest) =>
      apiClient.post<MessageResponse>("/auth/set-pin", data),
    onSuccess: () => {
      toasts.pinSet();
      if (user?.role === "employer") {
        router.push("/employer/dashboard");
      } else {
        router.push("/worker/onboarding");
      }
    },
    onError: (error: ApiError) => {
      toast.error(error.detail || "Failed to set PIN");
    },
  });
}

/**
 * Logs out the user. Forces logout even if the API call fails.
 */
export function useLogout() {
  const logout = useAuthStore((s) => s.logout);
  const router = useRouter();

  return useMutation({
    mutationFn: () => apiClient.post<MessageResponse>("/auth/logout"),
    onSuccess: () => {
      logout();
      router.push("/login");
      toasts.loggedOut();
    },
    onError: () => {
      logout();
      router.push("/login");
    },
  });
}