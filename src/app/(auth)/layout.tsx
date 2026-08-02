// src/app/(auth)/layout.tsx
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-primary-50/40 to-accent-50/40 flex flex-col">
      {/* Top bar - glass nav */}
      <header className="h-14 flex items-center px-4 border-b border-white/60 bg-white/70 backdrop-blur-xl shadow-[0_1px_0_rgba(26,31,54,0.04)]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent-600 rounded-lg flex items-center justify-center ring-2 ring-accent/20 shadow-md">
            <span className="text-white text-sm font-bold">S</span>
          </div>
          <span className="font-semibold text-primary text-md">Skiloq</span>
        </div>
      </header>

      {/* Centered content */}
      <main className="flex-1 flex items-center justify-center px-3 sm:px-4 py-6 lg:py-4 relative">
        <div aria-hidden className="pointer-events-none absolute top-12 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-accent/10 blur-3xl lg:hidden" />
        <div className="w-full max-w-sm relative z-10">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-primary-200">
        Skiloq Technology Inc. — Ghana
      </footer>
    </div>
  );
}
