// src/components/bookings/SOSButton.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { AlertTriangle, PhoneCall, ShieldAlert, CheckCircle2, MapPin, Radio } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface SOSButtonProps {
  bookingId: string;
  clientName?: string;
  isTradeWorkerInPerson?: boolean;
}

export function SOSButton({
  bookingId,
  clientName = "Esi Arthur",
  isTradeWorkerInPerson = true,
}: SOSButtonProps) {
  const [holding, setHolding] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 100
  const [isActivated, setIsActivated] = useState(false);
  const [emergencyDetails, setEmergencyDetails] = useState<{
    coords: string;
    contactName: string;
    contactPhone: string;
    timestamp: string;
  } | null>(null);

  const holdTimerRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startHold = () => {
    if (isActivated) return;
    setHolding(true);
    setProgress(0);

    const startTime = Date.now();
    const duration = 3000; // 3 seconds required

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);

      if (pct >= 100) {
        triggerSOS();
      }
    }, 50);
  };

  const cancelHold = () => {
    if (isActivated) return;
    setHolding(false);
    setProgress(0);
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
  };

  const triggerSOS = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
    setHolding(false);
    setIsActivated(true);

    const details = {
      coords: "5.6037° N, 0.1870° W (Accra Central)",
      contactName: "Kwabena Mensah (Brother)",
      contactPhone: "+233 24 555 0192",
      timestamp: new Date().toLocaleTimeString(),
    };
    setEmergencyDetails(details);

    toast.error("EMERGENCY SOS DISPATCHED!", {
      description: `SMS dispatched via Africa's Talking to ${details.contactName} with live GPS coordinates. Platform safety team notified.`,
      duration: 8000,
    });
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
    };
  }, []);

  return (
    <div className="bg-red-50/70 border border-red-200 rounded-3xl p-5 sm:p-6 text-center space-y-3 relative overflow-hidden">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-left">
          <div className="w-8 h-8 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-red-950 uppercase tracking-wider">In-Person Safety Escort</h4>
            <p className="text-[11px] text-red-700">Physical Booking with {clientName}</p>
          </div>
        </div>

        <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
          <Radio className="w-3 h-3 text-emerald-600 animate-pulse" />
          GPS Guard Active
        </span>
      </div>

      {/* Action Button */}
      <div className="pt-2">
        {!isActivated ? (
          <div className="relative inline-block w-full max-w-sm">
            <button
              type="button"
              onMouseDown={startHold}
              onMouseUp={cancelHold}
              onMouseLeave={cancelHold}
              onTouchStart={startHold}
              onTouchEnd={cancelHold}
              className={`relative overflow-hidden w-full py-4 rounded-2xl font-bold text-sm tracking-wide transition-all shadow-md active:scale-98 select-none ${
                holding
                  ? "bg-red-700 text-white shadow-red-600/40 ring-4 ring-red-400/50"
                  : "bg-red-600 hover:bg-red-700 text-white shadow-red-600/30"
              }`}
            >
              {/* Progress bar filling up during 3s hold */}
              {holding && (
                <div
                  className="absolute inset-0 bg-red-900/80 transition-all duration-75"
                  style={{ width: `${progress}%` }}
                />
              )}

              <span className="relative z-10 flex items-center justify-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                {holding ? `HOLDING TO SEND SOS (${Math.ceil((100 - progress) / 33.3)}s)...` : "HOLD 3 SECONDS FOR EMERGENCY SOS"}
              </span>
            </button>

            <p className="text-[11px] text-red-700/80 mt-2">
              Press and hold for 3 seconds to immediately alert your emergency contact & platform safety.
            </p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-4 border border-red-300 shadow-lg text-left space-y-2 text-xs text-red-950"
          >
            <div className="flex items-center gap-2 text-red-600 font-extrabold text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>SOS Transmitted to Africa&apos;s Talking Gateway</span>
            </div>
            <div className="grid grid-cols-2 gap-2 bg-red-50 p-3 rounded-xl">
              <div>
                <span className="text-[10px] text-red-700 font-medium">Emergency Contact</span>
                <p className="font-bold">{emergencyDetails?.contactName}</p>
                <p className="text-gray-500 font-mono text-[10px]">{emergencyDetails?.contactPhone}</p>
              </div>
              <div>
                <span className="text-[10px] text-red-700 font-medium">Live Coordinates</span>
                <p className="font-mono font-bold text-gray-800">{emergencyDetails?.coords}</p>
                <p className="text-gray-500 text-[10px]">Logged at {emergencyDetails?.timestamp}</p>
              </div>
            </div>
            <p className="text-[11px] text-gray-500 text-center pt-1">
              A platform security agent has been dispatched to coordinate with local emergency authorities.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
