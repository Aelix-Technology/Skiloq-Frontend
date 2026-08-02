// src/hooks/useAuth.ts
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { apiClient, ApiError } from "@/lib/api";
import { useAuthStore } from "@/stores/auth.store";
import { toasts } from "@/lib/toasts";
import type { User } from "@/types/auth";
import { useState, useCallback } from "react";

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
 * Supports an optional post-login redirect URL (from ?redirect= query param).
 */
export function useVerifyOTP(redirectUrl?: string | null) {
  const setAuth = useAuthStore((s) => s.setAuth);
  const router = useRouter();
  const [currentPhone, setCurrentPhone] = useState<string>("");

  return useMutation({
    mutationFn: (data: { phone: string; pin: string }) => {
      console.log("Sending verify OTP request with data:", data);
      setCurrentPhone(data.phone);
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

      if (redirectUrl) {
        try {
          const decoded = decodeURIComponent(redirectUrl);
          if (decoded.startsWith("/") && !decoded.startsWith("//")) {
            router.replace(decoded);
            return;
          }
        } catch {
          // fall through to role-based dashboard
        }
      }

      const dashboards: Record<string, string> = {
        worker: "/worker/dashboard",
        employer: "/employer/dashboard",
        admin: "/admin/dashboard",
        agent: "/agent/dashboard",
      };
      const role = (user.role as keyof typeof dashboards) ?? "worker";
      router.replace(dashboards[role] ?? "/worker/dashboard");
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

/**
 * Verifies the current session by validating the token with the backend.
 * Calls /auth/me to get the current user profile. If the token is invalid
 * or expired (and refresh fails), it clears the local auth state.
 */
export function useVerifySession() {
  const accessToken = useAuthStore((s) => s.accessToken);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const setUser = useAuthStore((s) => s.setUser);
  const logout = useAuthStore((s) => s.logout);
  const setVerifying = useAuthStore((s) => s.setVerifying);
  const isVerifying = useAuthStore((s) => s.isVerifying);

  const verifySession = useCallback(async (): Promise<boolean> => {
    if (!accessToken || !isAuthenticated) {
      return false;
    }

    setVerifying(true);
    try {
      const data = await apiClient.get<unknown>("/auth/me");
      const backendData = data as Record<string, unknown>;

      let updatedUser: User | null = null;
      const currentPhone = useAuthStore.getState().user?.phone || "";

      if (backendData.user && typeof backendData.user === "object") {
        updatedUser = mapUser(backendData.user as Record<string, unknown>, currentPhone);
      } else if (backendData.data && typeof backendData.data === "object") {
        const dataObj = backendData.data as Record<string, unknown>;
        if (dataObj.user && typeof dataObj.user === "object") {
          updatedUser = mapUser(dataObj.user as Record<string, unknown>, currentPhone);
        } else {
          updatedUser = mapUser(dataObj, currentPhone);
        }
      } else if (backendData.id || backendData._id) {
        updatedUser = mapUser(backendData, currentPhone);
      }

      if (updatedUser) {
        setUser(updatedUser);
      }

      setVerifying(false);
      return true;
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.status === 401) {
          console.error("Session verification 401 — logging out.");
          logout();
          setVerifying(false);
          return false;
        }
        if (error.status === 404 || error.status === 405) {
          console.warn(
            `Session verification skipped: /auth/me returned ${error.status} (endpoint not deployed yet).`
          );
          setVerifying(false);
          return true;
        }
      }
      console.warn("Session verification failed (non-fatal); keeping session:", error);
      setVerifying(false);
      return true;
    }
  }, [accessToken, isAuthenticated, setUser, logout, setVerifying]);

  return { verifySession, isVerifying };
}

/**
 * React Query wrapper for session verification — used in ProtectedRoute
 * to validate authentication state before rendering protected content.
 *
 * Graceful degradation:
 * - In NEXT_PUBLIC_API_MODE=mock → query is disabled entirely (no network call).
 * - Endpoint not yet deployed (404/405) → treated as "still valid, skip validation".
 * - Only 401 (after refresh-flow in api.ts also fails) invalidates the session.
 */
export function useAuthSession() {
  const accessToken = useAuthStore((s) => s.accessToken);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const setUser = useAuthStore((s) => s.setUser);
  const logout = useAuthStore((s) => s.logout);
  const currentPhone = useAuthStore((s) => s.user?.phone || "");

  const isMockMode = process.env.NEXT_PUBLIC_API_MODE === "mock";
  const canRun = !!accessToken && !!isAuthenticated && !isMockMode;

  return useQuery({
    queryKey: ["auth-session", accessToken],
    queryFn: async (): Promise<{ valid: boolean; user: User | null }> => {
      if (!accessToken || !isAuthenticated) {
        return { valid: false, user: null };
      }

      try {
        const data = await apiClient.get<unknown>("/auth/me");
        const backendData = data as Record<string, unknown>;

        let updatedUser: User | null = null;

        if (backendData.user && typeof backendData.user === "object") {
          updatedUser = mapUser(backendData.user as Record<string, unknown>, currentPhone);
        } else if (backendData.data && typeof backendData.data === "object") {
          const dataObj = backendData.data as Record<string, unknown>;
          if (dataObj.user && typeof dataObj.user === "object") {
            updatedUser = mapUser(dataObj.user as Record<string, unknown>, currentPhone);
          } else {
            updatedUser = mapUser(dataObj, currentPhone);
          }
        } else if (backendData.id || backendData._id) {
          updatedUser = mapUser(backendData, currentPhone);
        }

        if (updatedUser) {
          setUser(updatedUser);
        }

        return { valid: true, user: updatedUser };
      } catch (error) {
        if (error instanceof ApiError) {
          if (error.status === 401) {
            console.error("Session expired (401), logging out.");
            logout();
            return { valid: false, user: null };
          }
          if (error.status === 404 || error.status === 405) {
            // Endpoint not deployed yet — treat session as valid (rely on
            // 401 auto-refresh inside api.ts for actual token validation).
            console.warn(
              `/auth/me returned ${error.status} — endpoint not deployed yet; skipping session verification.`
            );
            return { valid: true, user: null };
          }
          console.warn(
            `Session check failed with status ${error.status}; keeping session (backend may be unavailable).`
          );
        } else {
          console.warn("Session check failed with non-ApiError; keeping session:", error);
        }
        return { valid: true, user: null };
      }
    },
    enabled: canRun,
    staleTime: 5 * 60 * 1000,
    retry: (failureCount, error) => {
      if (error instanceof ApiError) {
        if (error.status === 401 || error.status === 404 || error.status === 405) {
          return false;
        }
      }
      return failureCount < 2;
    },
  });
}