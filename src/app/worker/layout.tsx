// src/app/worker/layout.tsx
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function WorkerRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={["worker"]}>
      {children}
    </ProtectedRoute>
  );
}