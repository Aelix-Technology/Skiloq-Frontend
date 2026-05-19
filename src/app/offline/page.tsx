// src/app/offline/page.tsx
import { WifiOff } from "lucide-react";

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-primary flex items-center justify-center px-4">
      <div className="text-center text-white">
        <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6">
          <WifiOff className="w-10 h-10 text-white/60" />
        </div>
        <h1 className="text-2xl font-bold mb-2">You&apos;re offline</h1>
        <p className="text-white/60 max-w-sm mx-auto mb-6">
          Skiloq works offline. Some features may be limited until you reconnect.
        </p>
        <div className="flex items-center justify-center gap-2 text-sm text-white/40">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <span className="text-primary font-bold text-xs">S</span>
          </div>
          <span className="font-semibold">Skiloq</span>
        </div>
      </div>
    </div>
  );
}
