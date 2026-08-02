// src/stores/auth.store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, AuthTokens } from "@/types/auth";
import { setAccessToken } from "@/lib/api";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isVerifying: boolean;
  onboardingStep: number;

  // Actions
  setAuth: (user: User, tokens: AuthTokens) => void;
  setUser: (user: User) => void;
  setLoading: (loading: boolean) => void;
  setVerifying: (verifying: boolean) => void;
  setOnboardingStep: (step: number) => void;
  logout: () => void;
}

const STORAGE_KEY = "skiloq-auth-storage";

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      isLoading: false,
      isVerifying: false,
      onboardingStep: 0,

      setAuth: (user: User, tokens: AuthTokens) => {
        setAccessToken(tokens.accessToken);
        set({
          user,
          accessToken: tokens.accessToken,
          isAuthenticated: true,
          isLoading: false,
        });
      },

      setUser: (user: User) => set({ user }),

      setLoading: (isLoading: boolean) => set({ isLoading }),

      setVerifying: (isVerifying: boolean) => set({ isVerifying }),

      setOnboardingStep: (step: number) => set({ onboardingStep: step }),

      logout: () => {
        setAccessToken(null);
        if (typeof window !== "undefined") {
          localStorage.removeItem(STORAGE_KEY);
        }
        set({
          user: null,
          accessToken: null,
          isAuthenticated: false,
          isLoading: false,
          isVerifying: false,
          onboardingStep: 0,
        });
      },
    }),
    {
      name: STORAGE_KEY,
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        isAuthenticated: state.isAuthenticated,
        onboardingStep: state.onboardingStep,
      }),
      onRehydrateStorage: () => {
        return (state, error) => {
          if (error) {
            console.error("Error rehydrating auth store:", error);
            return;
          }
          if (state?.accessToken) {
            setAccessToken(state.accessToken);
          }
        };
      },
    }
  )
);

// Mock mode: clear corrupted persisted state on load
if (
  typeof window !== "undefined" &&
  process.env.NEXT_PUBLIC_API_MODE === "mock"
) {
  // Clear old mis-keyed storage entries
  const oldStorage = localStorage.getItem("Skiloq-auth-storage");
  if (oldStorage) {
    localStorage.removeItem("Skiloq-auth-storage");
  }

  // Validate current storage — drop unauthenticated entries so
  // ProtectedRoute IS_DEV path can inject a fresh mock user
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (!parsed?.state?.isAuthenticated) {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }
}
