// src/components/auth/ProtectedRoute.tsx
"use client";

import { useAuthStore } from "@/stores/auth.store";
import { useAuthSession } from "@/hooks/useAuth";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: string[];
}

// Auth bypass — enabled only when NEXT_PUBLIC_API_MODE is explicitly
// set to "mock" so you can iterate on UI without a running backend.
const IS_MOCK_MODE = process.env.NEXT_PUBLIC_API_MODE === "mock";

const ROLE_DASHBOARDS: Record<string, string> = {
  worker: "/worker/dashboard",
  employer: "/employer/dashboard",
  admin: "/admin/dashboard",
  agent: "/agent/dashboard",
};

function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-50">
      <div className="animate-spin h-8 w-8 border-2 border-accent border-t-transparent rounded-full" />
    </div>
  );
}

function detectRoleFromPath(pathname: string) {
  if (pathname.startsWith("/employer")) return "employer";
  if (pathname.startsWith("/admin")) return "admin";
  if (pathname.startsWith("/agent")) return "agent";
  return "worker";
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const user = useAuthStore((s) => s.user);
  const router = useRouter();
  const pathname = usePathname();
  const [isHydrated, setIsHydrated] = useState(IS_MOCK_MODE);

  const { data: session, isFetching } = useAuthSession();

  // Mock mode: inject a fake user whose role matches the URL path segment.
  // Runs once per path change so /employer/* vs /admin/* get the right role.
  useEffect(() => {
    if (!IS_MOCK_MODE) return;
    const role = detectRoleFromPath(pathname) as
      | "worker"
      | "employer"
      | "admin"
      | "agent";
    useAuthStore.setState({
      user: {
        id: "u001",
        phone: "+233241234567",
        phone_verified: true,
        role,
        is_active: true,
        created_at: new Date().toISOString(),
      },
      accessToken: "preview-token",
      isAuthenticated: true,
    });
  }, [pathname]);

  // Live mode: wait for Zustand persist to rehydrate before deciding auth state.
  useEffect(() => {
    if (IS_MOCK_MODE) return;
    const t = setTimeout(() => setIsHydrated(true), 0);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (IS_MOCK_MODE) return;
    if (!isHydrated) return;
    if (isFetching) return;

    if (!isAuthenticated || session?.valid === false) {
      const redirect = encodeURIComponent(pathname);
      router.replace(`/login?redirect=${redirect}`);
      return;
    }

    if (allowedRoles && user?.role && !allowedRoles.includes(user.role)) {
      const roleKey = (user.role as keyof typeof ROLE_DASHBOARDS) ?? "worker";
      const target = ROLE_DASHBOARDS[roleKey] ?? "/worker/dashboard";
      router.replace(target);
    }
  }, [
    isHydrated,
    isFetching,
    isAuthenticated,
    user,
    allowedRoles,
    router,
    pathname,
    session,
  ]);

  if (IS_MOCK_MODE) return <>{children}</>;

  if (!isHydrated) return <LoadingScreen />;
  if (isFetching) return <LoadingScreen />;
  if (!isAuthenticated) return <LoadingScreen />;
  if (allowedRoles && user?.role && !allowedRoles.includes(user.role)) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
}
