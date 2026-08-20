// src/components/auth/ProtectedRoute.tsx
"use client";

import { useAuthStore } from "@/stores/auth.store";
import { useAuthSession } from "@/hooks/useAuth";
import { getDashboardForRole } from "@/lib/mock-auth";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: string[];
}

function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
      <div className="animate-spin h-8 w-8 border-3 border-[#2563EB] border-t-transparent rounded-full" />
    </div>
  );
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const user = useAuthStore((s) => s.user);
  const router = useRouter();
  const pathname = usePathname();
  const [isHydrated, setIsHydrated] = useState(false);

  const { data: session, isFetching } = useAuthSession();

  // Wait for Zustand persist to rehydrate from localStorage
  useEffect(() => {
    const t = setTimeout(() => setIsHydrated(true), 0);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    if (isFetching) return;

    if (!isAuthenticated || session?.valid === false) {
      const redirect = encodeURIComponent(pathname);
      router.replace(`/login?redirect=${redirect}`);
      return;
    }

    if (allowedRoles && user?.role && !allowedRoles.includes(user.role)) {
      const target = getDashboardForRole(user.role);
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

  if (!isHydrated) return <LoadingScreen />;
  if (!isAuthenticated) return <LoadingScreen />;
  if (allowedRoles && user?.role && !allowedRoles.includes(user.role)) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
}
