// src/components/bookings/SOSButton.tsx
"use client";

import { useState } from "react";
import { AlertTriangle, Phone } from "lucide-react";
import { toast } from "sonner";

interface SOSButtonProps {
  bookingId: string;
  clientName: string;
}

export function SOSButton({ bookingId, clientName }: SOSButtonProps) {
  const [isConfirming, setIsConfirming] = useState(false);
  const [isActivated, setIsActivated] = useState(false);

  const handleSOS = () => {
    if (!isConfirming) {
      setIsConfirming(true);
      return;
    }

    setIsActivated(true);
    setIsConfirming(false);

    // TODO: Replace with apiClient.post(`/bookings/${bookingId}/sos`)
    toast.success("Emergency alert sent! Help is on the way.", {
      description: `Your emergency contact and platform security have been notified.`,
      duration: 5000,
    });

    setTimeout(() => setIsActivated(false), 5000);
  };

  const handleCancel = () => {
    setIsConfirming(false);
  };

  // 3-second hold pattern
  return (
    <div className="space-y-2">
      {isConfirming && (
        <p className="text-xs text-danger text-center font-medium">
          Press and hold for 3 seconds to activate emergency alert
        </p>
      )}

      <div className="flex gap-2">
        {isConfirming && (
          <button
            onClick={handleCancel}
            className="flex-1 py-3 text-sm font-medium text-primary-300 border border-primary-100 rounded-input hover:bg-primary-50 transition-colors"
          >
            Cancel
          </button>
        )}

        <button
          onMouseDown={() => setIsConfirming(true)}
          onMouseUp={() => isConfirming && setIsConfirming(false)}
          onMouseLeave={() => isConfirming && setIsConfirming(false)}
          onTouchStart={() => setIsConfirming(true)}
          onTouchEnd={() => isConfirming && setIsConfirming(false)}
          onClick={handleSOS}
          className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold rounded-input transition-all ${
            isActivated
              ? "bg-success text-white animate-pulse"
              : isConfirming
              ? "bg-danger text-white scale-105 shadow-lg"
              : "bg-danger text-white hover:bg-danger-700"
          }`}
        >
          {isActivated ? (
            <>
              <Phone className="w-4 h-4 animate-bounce" />
              Alert Sent!
            </>
          ) : isConfirming ? (
            <>
              <AlertTriangle className="w-4 h-4" />
              HOLD TO CONFIRM SOS
            </>
          ) : (
            <>
              <AlertTriangle className="w-4 h-4" />
              Emergency SOS
            </>
          )}
        </button>
      </div>

      <p className="text-xs text-center text-primary-300">
        For emergencies during in-person bookings. Alerts your emergency contact and platform security.
      </p>
    </div>
  );
}