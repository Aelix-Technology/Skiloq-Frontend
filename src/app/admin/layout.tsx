// src/app/admin/layout.tsx
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function AdminRouteLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      {children}
    </ProtectedRoute>
  );
}
