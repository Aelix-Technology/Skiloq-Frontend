// src/app/(auth)/layout.tsx
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-primary-50 flex flex-col">
      {/* Top bar - minimal, just branding */}
      <header className="h-14 flex items-center px-4 border-b border-primary-100 bg-white">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-card flex items-center justify-center">
            <span className="text-white text-sm font-bold">A</span>
          </div>
          <span className="font-semibold text-primary text-md">Skiloq</span>
        </div>
      </header>

      {/* Centered content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-primary-300">
        Skiloq Technology Inc. — Ghana
      </footer>
    </div>
  );
}
