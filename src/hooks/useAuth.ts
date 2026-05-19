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

interface AuthResponse {
  accessToken: string;
  refreshToken?: string;
  user: User;
}

interface MessageResponse {
  message: string;
  expires_in?: number;
}

// Demo credentials for all roles
const DEMO_CREDENTIALS: Record<string, { pin: string; role: User["role"] }> = {
  "+233000000000": { pin: "0000", role: "worker" },
  "+233111111111": { pin: "1111", role: "employer" },
  "+233222222222": { pin: "2222", role: "admin" },
  "+233333333333": { pin: "3333", role: "agent" },
};

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

export function useLogin() {
  const setAuth = useAuthStore((s) => s.setAuth);
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: LoginRequest) => {
      // Demo login for all roles
      const demo = DEMO_CREDENTIALS[data.phone];
      if (demo && data.pin === demo.pin) {
        await new Promise((resolve) => setTimeout(resolve, 800));
        return {
          accessToken: "demo-token",
          user: {
            id: `demo-${demo.role}`,
            phone: data.phone,
            phone_verified: true,
            role: demo.role,
            is_active: true,
            created_at: new Date().toISOString(),
          },
        };
      }

      return apiClient.post<AuthResponse>("/auth/login", data);
    },
    onSuccess: (data) => {
      setAuth(data.user, { accessToken: data.accessToken });
      toasts.welcomeBack();

      switch (data.user.role) {
        case "worker":
          router.push("/worker/dashboard");
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
      if (error.code === "LOCKED") toasts.accountLocked();
      else if (error.code === "INVALID_PIN") toasts.invalidPIN();
      else toast.error(error.detail || "Login failed");
    },
  });
}

export function useSetPIN() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);

  return useMutation({
    mutationFn: (data: SetPINRequest) =>
      apiClient.post<MessageResponse>("/auth/set-pin", data),
    onSuccess: () => {
      toasts.pinSet();
      if (user?.role === "employer") router.push("/employer/dashboard");
      else router.push("/worker/onboarding");
    },
    onError: (error: ApiError) => {
      toast.error(error.detail || "Failed to set PIN");
    },
  });
}

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