// src/hooks/useAuth.ts
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { apiClient, ApiError } from "@/lib/api";
import { useAuthStore } from "@/stores/auth.store";
import { toasts } from "@/lib/toasts";
import type { User } from "@/types/auth";
import { useState } from "react";

// Convert backend user to our User type
function mapUser(backendUser: Record<string, unknown>, phone: string): User {
  return {
    id: String(backendUser.id || backendUser._id || ""),
    phone: phone,
    phone_verified: true,
    role: (backendUser.role as "worker" | "employer" | "admin" | "agent") || "worker",
    is_active: true,
    created_at: new Date().toISOString(),
    ...backendUser,
  };
}

function getAccessTokenFromResponse(data: unknown): string {
  console.log("getAccessTokenFromResponse called with data:", data);
  if (typeof data === "object" && data !== null) {
    const d = data as Record<string, unknown>;
    // Try root level
    if (d.token) return String(d.token);
    if (d.accessToken) return String(d.accessToken);
    if (d.access_token) return String(d.access_token);
    // Try data level
    if (d.data && typeof d.data === "object" && d.data !== null) {
      const dataObj = d.data as Record<string, unknown>;
      if (dataObj.token) return String(dataObj.token);
      if (dataObj.accessToken) return String(dataObj.accessToken);
      if (dataObj.access_token) return String(dataObj.access_token);
    }
  }
  console.log("No access token found in response");
  return "";
}

function getUserFromResponse(data: unknown, phone: string): User {
  console.log("getUserFromResponse called with data:", data);
  if (typeof data === "object" && data !== null) {
    const d = data as Record<string, unknown>;
    // Try root level
    if (d.user && typeof d.user === "object" && d.user !== null) {
      return mapUser(d.user as Record<string, unknown>, phone);
    }
    if (d.data && typeof d.data === "object" && d.data !== null) {
      const dataObj = d.data as Record<string, unknown>;
      // Try data.user
      if (dataObj.user && typeof dataObj.user === "object" && dataObj.user !== null) {
        return mapUser(dataObj.user as Record<string, unknown>, phone);
      }
      // If data itself is the user object (no user key)
      return mapUser(dataObj, phone);
    }
    // If root object is the user object
    return mapUser(d, phone);
  }
  console.log("No user found in response, returning default user");
  return mapUser({}, phone);
}

/**
 * Register — sends OTP to phone number.
 */
export function useRegisterPhone() {
  return useMutation({
    mutationFn: (data: { phone: string }) => {
      console.log("Sending register phone request with data:", data);
      return apiClient.post("/auth/register", { phone: data.phone });
    },
    onSuccess: (responseData) => {
      console.log("Register phone success, response data:", responseData);
      toasts.otpSent();
    },
    onError: (error: ApiError) => {
      console.error("Register phone error:", error);
      toast.error(error.detail || "Failed to send OTP");
    },
  });
}

/**
 * Login — sends OTP to phone number.
 */
export function useLogin() {
  return useMutation({
    mutationFn: (data: { phone: string }) => {
      console.log("Sending login request with data:", data);
      return apiClient.post("/auth/login", { phone: data.phone });
    },
    onSuccess: (responseData) => {
      console.log("Login success, response data:", responseData);
      toasts.otpSent();
    },
    onError: (error: ApiError) => {
      console.error("Login error:", error);
      toast.error(error.detail || "Login failed");
    },
  });
}

/**
 * Verify OTP/PIN — used for both register and login.
 */
export function useVerifyOTP() {
  const setAuth = useAuthStore((s) => s.setAuth);
  const router = useRouter();
  // Store the phone number when we start the mutation
  const [currentPhone, setCurrentPhone] = useState<string>("");

  return useMutation({
    mutationFn: (data: { phone: string; pin: string }) => {
      console.log("Sending verify OTP request with data:", data);
      setCurrentPhone(data.phone); // Store the phone number
      return apiClient.post("/auth/verify-otp", {
        phone: data.phone,
        pin: data.pin,
      });
    },
    onSuccess: (responseData) => {
      console.log("Verify OTP success, response data:", responseData);
      const accessToken = getAccessTokenFromResponse(responseData);
      const user = getUserFromResponse(responseData, currentPhone);
      console.log("Extracted access token:", accessToken);
      console.log("Extracted user:", user);
      setAuth(user, { accessToken });
      toasts.otpVerified();

      // Route based on role
      switch (user.role) {
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
        default:
          router.push("/worker/dashboard");
          break;
      }
    },
    onError: (error: ApiError) => {
      console.error("Verify OTP error:", error);
      toast.error(error.detail || "Invalid verification code");
    },
  });
}

/**
 * Sets the user's 4-digit PIN.
 */
export function useSetPIN() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);

  return useMutation({
    mutationFn: (data: { pin: string }) =>
      apiClient.post("/auth/set-pin", { pin: data.pin }),
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

/**
 * Logs out the user.
 */
export function useLogout() {
  const logout = useAuthStore((s) => s.logout);
  const router = useRouter();

  return useMutation({
    mutationFn: () => apiClient.post("/auth/logout"),
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