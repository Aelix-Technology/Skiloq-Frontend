// src/app/providers.tsx 
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState, useEffect, type ReactNode } from "react";
import { Toaster } from "sonner";
import { useAuthStore } from "@/stores/auth.store";
import { setAccessToken } from "@/lib/api";

function AuthInitializer({ children }: { children: ReactNode }) {
  const accessToken = useAuthStore((s) => s.accessToken);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  useEffect(() => {
    // Re-hydrate the API client with persisted token on page load
    if (isAuthenticated && accessToken) {
      setAccessToken(accessToken);
    }
  }, [isAuthenticated, accessToken]);

  return <>{children}</>;
}

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            retry: 2,
            refetchOnWindowFocus: true,
          },
          mutations: {
            retry: 0,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <AuthInitializer>
        {children}
      </AuthInitializer>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#1A1F36",
            color: "#fff",
            border: "none",
            fontSize: "14px",
            borderRadius: "8px",
          },
        }}
      />
      <ReactQueryDevtools initialIsOpen={false} position="bottom" />
    </QueryClientProvider>
  );
}
