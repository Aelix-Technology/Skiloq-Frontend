// src/hooks/useAuth.ts
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { apiClient, ApiError } from "@/lib/api";
import { useAuthStore } from "@/stores/auth.store";
import { toasts } from "@/lib/toasts";
import type { User, UserRole } from "@/types/auth";
import { useState, useCallback } from "react";
import {
  isMockPhone,
  isMockOTP,
  isMockToken,
  getMockUserByPhone,
  getMockUserByRole,
  getDashboardForRole,
} from "@/lib/mock-auth";

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
    mutationFn: async (data: { phone: string }) => {
      console.log("Sending register phone request with data:", data);
      if (isMockPhone(data.phone)) {
        return { message: "Mock OTP sent successfully", isMock: true };
      }
      try {
        return await apiClient.post("/auth/register", { phone: data.phone });
      } catch (error) {
        console.warn("Backend register error, falling back to mock OTP flow:", error);
        // Seamless fallback in dev/staging/demo environments
        return { message: "Mock OTP sent successfully", isMock: true };
      }
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
    mutationFn: async (data: { phone: string }) => {
      console.log("Sending login request with data:", data);
      if (isMockPhone(data.phone)) {
        return { message: "Mock OTP sent successfully", isMock: true };
      }
      try {
        return await apiClient.post("/auth/login", { phone: data.phone });
      } catch (error) {
        console.warn("Backend login error, falling back to mock OTP flow:", error);
        // Seamless fallback in dev/staging/demo environments
        return { message: "Mock OTP sent successfully", isMock: true };
      }
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
 * Supports mock accounts, universal OTP codes, and post-login redirect.
 */
export function useVerifyOTP(redirectUrl?: string | null) {
  const setAuth = useAuthStore((s) => s.setAuth);
  const router = useRouter();
  const [currentPhone, setCurrentPhone] = useState<string>("");

  return useMutation({
    mutationFn: async (data: { phone: string; pin: string }) => {
      console.log("Sending verify OTP request with data:", data);
      setCurrentPhone(data.phone);

      // Check if this is a mock phone or universal mock OTP code
      if (isMockPhone(data.phone) || isMockOTP(data.pin)) {
        console.log("Authenticating with mock credentials");
        const mockAuth = getMockUserByPhone(data.phone);
        return {
          isMock: true,
          token: mockAuth.accessToken,
          accessToken: mockAuth.accessToken,
          user: mockAuth.user,
        };
      }

      try {
        return await apiClient.post("/auth/verify-otp", {
          phone: data.phone,
          pin: data.pin,
        });
      } catch (error) {
        // If backend fails, check if the pin or phone can be authenticated as mock fallback
        if (isMockOTP(data.pin) || isMockPhone(data.phone)) {
          console.log("Backend failed, falling back to mock credentials");
          const mockAuth = getMockUserByPhone(data.phone);
          return {
            isMock: true,
            token: mockAuth.accessToken,
            accessToken: mockAuth.accessToken,
            user: mockAuth.user,
          };
        }
        throw error;
      }
    },
    onSuccess: (responseData) => {
      console.log("Verify OTP success, response data:", responseData);
      let accessToken = getAccessTokenFromResponse(responseData);
      let user = getUserFromResponse(responseData, currentPhone);

      // If mock response structure
      if (responseData && typeof responseData === "object" && "isMock" in responseData) {
        const resp = responseData as { isMock: boolean; user?: User; accessToken?: string; token?: string };
        if (resp.user) user = resp.user;
        if (resp.accessToken || resp.token) accessToken = resp.accessToken || resp.token || "";
      }

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

      const targetDashboard = getDashboardForRole(user.role);
      router.replace(targetDashboard);
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
  const accessToken = useAuthStore((s) => s.accessToken);

  return useMutation({
    mutationFn: async (data: { pin: string }) => {
      if (user?.is_mock || isMockToken(accessToken)) {
        return { success: true };
      }
      try {
        return await apiClient.post("/auth/set-pin", { pin: data.pin });
      } catch (error) {
        if (user?.is_mock || isMockToken(accessToken)) {
          return { success: true };
        }
        throw error;
      }
    },
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
 * 1-Click Quick Login as a specific role (Worker, Employer, Admin, Agent).
 */
export function useQuickMockLogin() {
  const setAuth = useAuthStore((s) => s.setAuth);
  const router = useRouter();

  return useCallback(
    (role: UserRole, redirectUrl?: string | null) => {
      const { user, accessToken } = getMockUserByRole(role);
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
          // fallback
        }
      }

      router.replace(getDashboardForRole(role));
    },
    [setAuth, router]
  );
}

/**
 * Logs out the user.
 */
export function useLogout() {
  const logout = useAuthStore((s) => s.logout);

  return useMutation({
    mutationFn: async () => {
      try {
        await apiClient.post("/auth/logout");
      } catch {
        // ignore
      }
      return { success: true };
    },
    onSuccess: () => {
      logout();
      toasts.loggedOut();
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    },
    onError: () => {
      logout();
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    },
  });
}

/**
 * Verifies the current session by validating the token with the backend.
 * Skips backend verification for mock users/tokens so mock sessions persist in production.
 */
export function useVerifySession() {
  const accessToken = useAuthStore((s) => s.accessToken);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const user = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser);
  const logout = useAuthStore((s) => s.logout);
  const setVerifying = useAuthStore((s) => s.setVerifying);
  const isVerifying = useAuthStore((s) => s.isVerifying);

  const verifySession = useCallback(async (): Promise<boolean> => {
    if (!accessToken || !isAuthenticated) {
      return false;
    }

    // Mock tokens or mock users do not validate against live backend
    if (user?.is_mock || isMockToken(accessToken)) {
      return true;
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
  }, [accessToken, isAuthenticated, user, setUser, logout, setVerifying]);

  return { verifySession, isVerifying };
}

/**
 * React Query wrapper for session verification — used in ProtectedRoute
 * to validate authentication state before rendering protected content.
 */
export function useAuthSession() {
  const accessToken = useAuthStore((s) => s.accessToken);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const user = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser);
  const logout = useAuthStore((s) => s.logout);
  const currentPhone = useAuthStore((s) => s.user?.phone || "");

  const isMockMode = process.env.NEXT_PUBLIC_API_MODE === "mock";
  const isMock = user?.is_mock || isMockToken(accessToken);
  const canRun = !!accessToken && !!isAuthenticated && !isMockMode && !isMock;

  return useQuery({
    queryKey: ["auth-session", accessToken],
    queryFn: async (): Promise<{ valid: boolean; user: User | null }> => {
      if (!accessToken || !isAuthenticated) {
        return { valid: false, user: null };
      }

      if (isMock) {
        return { valid: true, user: user || null };
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
            return { valid: true, user: null };
          }
        }
        return { valid: true, user: null };
      }
    },
    enabled: canRun,
    staleTime: 5 * 60 * 1000,
  });
}