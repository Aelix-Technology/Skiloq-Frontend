// src/components/ussd/USSDPhoneSimulatorModal.tsx
"use client";

import { useState } from "react";
import { Phone, X, RefreshCw, Send, CheckCircle2, Smartphone, Signal, BatteryMedium, MessageSquare } from "lucide-react";
import { processUSSDInput, USSD_SHORTCODE, type USSDMenuResponse } from "@/lib/mock-phase3";
import { toast } from "sonner";

interface USSDPhoneSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  workerPhone?: string;
  workerBalanceGhs?: number;
  isAvailable?: boolean;
}

export function USSDPhoneSimulatorModal({
  isOpen,
  onClose,
  workerPhone = "+233 54 272 7188",
  workerBalanceGhs = 2450.0,
  isAvailable = true,
}: USSDPhoneSimulatorModalProps) {
  const [dialInput, setDialInput] = useState(USSD_SHORTCODE);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [sessionPath, setSessionPath] = useState<string[]>([]);
  const [currentResponse, setCurrentResponse] = useState<USSDMenuResponse | null>(null);
  const [replyInput, setReplyInput] = useState("");
  const [recentSms, setRecentSms] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleStartSession = () => {
    if (dialInput.trim() !== USSD_SHORTCODE) {
      toast.error(`Invalid shortcode. Dial ${USSD_SHORTCODE} for Skiloq.`);
      return;
    }
    setIsSessionActive(true);
    setSessionPath([]);
    const res = processUSSDInput([], {
      balanceGhs: workerBalanceGhs,
      isAvailable,
      pendingJobCount: 2,
      phone: workerPhone,
    });
    setCurrentResponse(res);
  };

  const handleSendReply = (replyChoice?: string) => {
    const val = (replyChoice !== undefined ? replyChoice : replyInput).trim();
    if (!val) return;

    const newPath = [...sessionPath, val];
    setSessionPath(newPath);
    setReplyInput("");

    const res = processUSSDInput(newPath, {
      balanceGhs: workerBalanceGhs,
      isAvailable,
      pendingJobCount: 2,
      phone: workerPhone,
    });
    setCurrentResponse(res);

    if (res.isEnd) {
      setRecentSms(`[Skiloq SMS] Action confirmed via USSD session. Ref #${Math.floor(100000 + Math.random() * 900000)}.`);
    }
  };

  const handleResetSession = () => {
    setIsSessionActive(false);
    setSessionPath([]);
    setCurrentResponse(null);
    setReplyInput("");
    setDialInput(USSD_SHORTCODE);
  };

  const handleKeyPress = (num: string) => {
    if (!isSessionActive) {
      setDialInput((prev) => prev + num);
    } else {
      setReplyInput((prev) => prev + num);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden my-auto">
        {/* Top bar with close */}
        <div className="bg-[#1A1F36] text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-blue-400" />
            <div>
              <h3 className="font-bold text-sm">USSD Offline Terminal</h3>
              <p className="text-[10px] text-gray-400">Zero-Data Feature Phone Simulator</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-gray-300 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Feature Phone Body */}
        <div className="p-5 bg-gradient-to-b from-gray-100 to-gray-200 flex flex-col items-center">
          {/* LCD Screen Container */}
          <div className="w-full bg-[#A8B59F] text-[#1E2519] border-4 border-[#374151] rounded-2xl p-3 font-mono shadow-inner mb-4 relative min-h-[220px] flex flex-col justify-between">
            {/* Screen Header */}
            <div className="flex items-center justify-between text-[11px] pb-1.5 border-b border-[#1E2519]/30">
              <span className="flex items-center gap-1 font-bold">
                <Signal className="w-3 h-3" /> MTN 2G
              </span>
              <span className="font-bold text-[10px]">{workerPhone}</span>
              <BatteryMedium className="w-3.5 h-3.5" />
            </div>

            {/* Screen Content */}
            <div className="py-2 flex-1 text-xs leading-relaxed whitespace-pre-wrap select-none overflow-y-auto max-h-[150px]">
              {!isSessionActive ? (
                <div className="text-center py-6 space-y-2">
                  <p className="font-extrabold text-sm tracking-widest text-[#1E2519]">
                    READY TO DIAL
                  </p>
                  <p className="text-base font-bold bg-[#1E2519]/10 px-2 py-1 rounded inline-block">
                    {dialInput}
                  </p>
                  <p className="text-[10px] text-[#1E2519]/70 pt-2">
                    Press CALL to initiate USSD gateway session
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="font-medium">{currentResponse?.message}</p>
                </div>
              )}
            </div>

            {/* Screen Footer / Input status */}
            <div className="pt-1.5 border-t border-[#1E2519]/30 flex items-center justify-between text-[11px]">
              {isSessionActive && !currentResponse?.isEnd ? (
                <div className="w-full flex items-center gap-1.5 bg-[#1E2519]/10 px-2 py-1 rounded">
                  <span className="font-bold text-[10px]">Reply:</span>
                  <input
                    type="text"
                    value={replyInput}
                    onChange={(e) => setReplyInput(e.target.value)}
                    placeholder="e.g. 1"
                    className="w-full bg-transparent text-xs font-bold text-[#1E2519] focus:outline-none"
                    autoFocus
                  />
                </div>
              ) : (
                <span className="text-[10px] text-[#1E2519]/60">
                  {isSessionActive && currentResponse?.isEnd ? "Session Terminated" : "Press CALL"}
                </span>
              )}
            </div>
          </div>

          {/* Action buttons (CALL / END) */}
          <div className="w-full grid grid-cols-2 gap-3 mb-4">
            {!isSessionActive ? (
              <button
                type="button"
                onClick={handleStartSession}
                className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all"
              >
                <Phone className="w-4 h-4" />
                CALL ({USSD_SHORTCODE})
              </button>
            ) : !currentResponse?.isEnd ? (
              <button
                type="button"
                onClick={() => handleSendReply()}
                className="py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                SEND REPLY
              </button>
            ) : (
              <button
                type="button"
                onClick={handleResetSession}
                className="py-2.5 px-4 rounded-xl bg-gray-700 hover:bg-gray-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                NEW SESSION
              </button>
            )}

            <button
              type="button"
              onClick={handleResetSession}
              className="py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all"
            >
              <Phone className="w-4 h-4 rotate-[135deg]" />
              END CALL
            </button>
          </div>

          {/* Numeric Keypad */}
          <div className="w-full grid grid-cols-3 gap-2 px-1">
            {["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"].map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => handleKeyPress(key)}
                className="h-11 rounded-xl bg-white hover:bg-gray-50 border border-gray-300 text-gray-800 font-extrabold text-sm shadow-sm active:scale-95 transition-all flex flex-col items-center justify-center"
              >
                <span>{key}</span>
              </button>
            ))}
          </div>
        </div>

        {/* SMS Preview Footer */}
        {recentSms && (
          <div className="p-4 bg-emerald-50 border-t border-emerald-100 flex items-start gap-2.5">
            <MessageSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-bold text-emerald-900">SMS Received:</span>
              <p className="text-emerald-700 mt-0.5">{recentSms}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
