// src/components/auth/ProtectedRoute.tsx
"use client";

import { useAuthStore } from "@/stores/auth.store";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

const IS_DEV = process.env.NEXT_PUBLIC_API_MODE === "mock";

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

  // Dev mode: set role based on the current route
  useEffect(() => {
    if (IS_DEV) {
      const role = pathname.startsWith("/employer")
        ? "employer"
        : pathname.startsWith("/admin")
        ? "admin"
        : pathname.startsWith("/agent")
        ? "agent"
        : "worker";

      useAuthStore.setState({
        user: {
          id: "u001",
          phone: "+233241234567",
          phone_verified: true,
          role: role as "worker" | "employer" | "admin" | "agent",
          is_active: true,
          created_at: new Date().toISOString(),
        },
        accessToken: "mock-token",
        isAuthenticated: true,
      });
    }
    setIsReady(true);
  }, [pathname]);

  // Redirect only in production
  useEffect(() => {
    if (IS_DEV || !isReady) return;

    if (!isAuthenticated) {
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
  }, [IS_DEV, isReady, isAuthenticated, user, allowedRoles, router, pathname]);

  // Loading state
  if (!isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary-50">
        <div className="animate-spin h-8 w-8 border-2 border-accent border-t-transparent rounded-full" />
      </div>
    );
  }

  // Dev mode: always allow, no checks
  if (IS_DEV) return <>{children}</>;

  // Production: not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary-50">
        <div className="animate-spin h-8 w-8 border-2 border-accent border-t-transparent rounded-full" />
      </div>
    );
  }

  return <>{children}</>;
}