// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Skiloq - Verified Talent Infrastructure for Africa",
  description:
    "Proof-of-work talent infrastructure connecting verified African workers with local and international employers.",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#1A1F36",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-white antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
