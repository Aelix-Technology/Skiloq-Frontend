// src/components/wallet/BalanceDisplay.tsx
"use client";

import { Wallet, Clock, ArrowDown } from "lucide-react";
import { IconTile } from "@/components/ui/premium-card";

interface BalanceDisplayProps {
  balance_ghs: number;
  pending_ghs: number;
  available_ghs: number;
  currency: string;
  momo_provider: string;
  momo_number: string;
}

export function BalanceDisplay({
  balance_ghs,
  pending_ghs,
  available_ghs,
  currency,
  momo_provider,
  momo_number,
}: BalanceDisplayProps) {
  const maskedNumber = momo_number.replace(/(\d{3})\d{4}(\d{3})/, "$1****$2");

  return (
    <div className="relative overflow-hidden rounded-2xl bg-primary p-6 text-white shadow-xl shadow-primary/20 space-y-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl active:scale-[0.99]">
      <div className="pointer-events-none absolute -right-14 -top-14 h-40 w-40 rounded-full bg-accent/25 blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      {/* Total Balance */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <IconTile tone="accent" className="size-9 bg-white/10 text-white ring-white/10">
            <Wallet className="w-4 h-4" />
          </IconTile>
          <span className="text-sm text-primary-200">Total Balance</span>
        </div>
        <p className="text-2xl font-bold">
          {currency} {balance_ghs.toLocaleString("en-GH", { minimumFractionDigits: 2 })}
        </p>
      </div>

      {/* Pending / Available */}
      <div className="grid grid-cols-2 gap-3">
        {/* Pending */}
        <div className="rounded-2xl bg-white/10 p-3 ring-1 ring-white/10 backdrop-blur-xl">
          <div className="flex items-center gap-1.5 mb-1">
            <Clock className="w-3.5 h-3.5 text-warning" />
            <span className="text-xs text-primary-200">Pending</span>
          </div>
          <p className="text-lg font-bold text-warning">
            {currency} {pending_ghs.toLocaleString("en-GH", { minimumFractionDigits: 2 })}
          </p>
        </div>

        {/* Available */}
        <div className="rounded-2xl bg-white/10 p-3 ring-1 ring-white/10 backdrop-blur-xl">
          <div className="flex items-center gap-1.5 mb-1">
            <ArrowDown className="w-3.5 h-3.5 text-success" />
            <span className="text-xs text-primary-200">Available</span>
          </div>
          <p className="text-lg font-bold text-success">
            {currency} {available_ghs.toLocaleString("en-GH", { minimumFractionDigits: 2 })}
          </p>
        </div>
      </div>

      {/* MoMo info */}
      <div className="pt-3 border-t border-white/10">
        <div className="flex items-center justify-between">
          <span className="text-xs text-primary-200">Payout Method</span>
          <span className="text-xs font-medium text-white">
            {momo_provider} - {maskedNumber}
          </span>
        </div>
      </div>
    </div>
  );
}
