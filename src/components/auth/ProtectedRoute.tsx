// src/components/auth/ProtectedRoute.tsx
"use client";

import { useAuthStore } from "@/stores/auth.store";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

const IS_DEV = process.env.NEXT_PUBLIC_API_MODE === "mock";

// Create the mock user once outside the component
const MOCK_WORKER = {
  id: "u001",
  phone: "+233241234567",
  phone_verified: true,
  role: "worker" as const,
  is_active: true,
  created_at: new Date().toISOString(),
};

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: string[];
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const user = useAuthStore((s) => s.user);
  const router = useRouter();
  const pathname = usePathname();
  const [isReady, setIsReady] = useState(false);

  // In dev mode, immediately set auth state before any redirect
  useEffect(() => {
    if (IS_DEV) {
      // Directly set the store state
      useAuthStore.setState({
        user: MOCK_WORKER,
        accessToken: "mock-token",
        isAuthenticated: true,
      });
    }
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) return;

    if (!isAuthenticated && !IS_DEV) {
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }

    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
      const dashboards: Record<string, string> = {
        worker: "/worker/dashboard",
        employer: "/employer/dashboard",
        admin: "/admin/dashboard",
        agent: "/agent/dashboard",
      };
      router.push(dashboards[user.role] || "/");
    }
  }, [isReady, isAuthenticated, user, allowedRoles, router, pathname]);

  // Show loading until auth state is initialized
  if (!isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary-50">
        <div className="animate-spin h-8 w-8 border-2 border-accent border-t-transparent rounded-full" />
      </div>
    );
  }

  // In dev mode, always allow
  if (IS_DEV) return <>{children}</>;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary-50">
        <div className="animate-spin h-8 w-8 border-2 border-accent border-t-transparent rounded-full" />
      </div>
    );
  }

  return <>{children}</>;
}