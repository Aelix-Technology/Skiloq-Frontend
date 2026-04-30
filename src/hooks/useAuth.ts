// src/hooks/useAuth.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authEndpoints } from "@/services/endpoints/auth.endpoints";
import { useAuthStore } from "@/stores/auth.store";
import { ApiError } from "@/lib/api";
import type {
  RegisterPhoneRequest,
  VerifyOTPRequest,
  SetPINRequest,
  LoginRequest,
} from "@/types/auth";

export function useRegisterPhone() {
  return useMutation({
    mutationFn: (data: RegisterPhoneRequest) => authEndpoints.registerPhone(data),
    onSuccess: () => {
      toast.success("OTP sent to your phone");
    },
    onError: (error: ApiError) => {
      toast.error(error.detail || "Failed to send OTP");
    },
  });
}

export function useVerifyOTP() {
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation({
    mutationFn: (data: VerifyOTPRequest) => authEndpoints.verifyOTP(data),
    onSuccess: (data) => {
      setAuth(data.user, { accessToken: data.accessToken });
      toast.success("Phone verified!");
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
    mutationFn: (data: LoginRequest) => authEndpoints.login(data),
    onSuccess: (data) => {
      setAuth(data.user, { accessToken: data.accessToken });
      toast.success(`Welcome back!`);

      // Route based on role AND onboarding status
      switch (data.user.role) {
        case "worker":
          // Check if worker has completed onboarding
          // This will come from the user object or a separate check
          const needsOnboarding = !data.user.phone_verified; // Simplified check
          if (needsOnboarding) {
            router.push("/worker/onboarding");
          } else {
            router.push("/worker/dashboard");
          }
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
        toast.error("Account locked. Try again in 15 minutes.");
      } else if (error.code === "INVALID_PIN") {
        toast.error("Invalid PIN. Please try again.");
      } else {
        toast.error(error.detail || "Login failed");
      }
    },
  });
}

export function useSetPIN() {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: SetPINRequest) => authEndpoints.setPIN(data),
    onSuccess: () => {
      toast.success("PIN set successfully!");
      router.push("/worker/onboarding");
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
    mutationFn: () => authEndpoints.logout(),
    onSuccess: () => {
      logout();
      router.push("/login");
      toast.success("Logged out");
    },
    onError: () => {
      // Force logout even if API fails
      logout();
      router.push("/login");
    },
  });
}