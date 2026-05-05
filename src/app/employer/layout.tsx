// src/app/employer/layout.tsx
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function EmployerRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={["employer"]}>
      {children}
    </ProtectedRoute>
  );
}