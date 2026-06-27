// src/components/auth/ProtectedRoute.tsx
"use client";

import { useAuthStore } from "@/stores/auth.store";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

// Always bypass auth in non-production Vercel environments and local dev
const IS_DEV =
  process.env.NEXT_PUBLIC_API_MODE === "mock" ||
  process.env.NEXT_PUBLIC_VERCEL_ENV === "preview" ||
  process.env.NEXT_PUBLIC_VERCEL_ENV === "development" ||
  process.env.NODE_ENV === "development";

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
        accessToken: "preview-token",
        isAuthenticated: true,
      });
    }

    const readyTimer = setTimeout(() => {
      setIsReady(true);
    }, 0);

    return () => clearTimeout(readyTimer);
  }, [pathname]);

  useEffect(() => {
    if (IS_DEV || !isReady) return;

    if (!isAuthenticated) {
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }

    if (allowedRoles && user?.role && !allowedRoles.includes(user.role)) {
      const dashboards: Record<string, string> = {
        worker: "/worker/dashboard",
        employer: "/employer/dashboard",
        admin: "/admin/dashboard",
        agent: "/agent/dashboard",
      };
      router.push(dashboards[user.role] || "/");
    }
  }, [IS_DEV, isReady, isAuthenticated, user, allowedRoles, router, pathname]);

  if (!isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary-50">
        <div className="animate-spin h-8 w-8 border-2 border-accent border-t-transparent rounded-full" />
      </div>
    );
  }

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