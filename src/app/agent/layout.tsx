// src/app/agent/layout.tsx
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function AgentRouteLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute allowedRoles={["agent"]}>
      {children}
    </ProtectedRoute>
  );
}
