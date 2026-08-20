// src/app/(auth)/layout.tsx
"use client";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-[#0E131F] selection:bg-accent selection:text-white">{children}</div>;
}
