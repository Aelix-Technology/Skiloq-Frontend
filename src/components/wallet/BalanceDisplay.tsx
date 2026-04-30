// src/components/wallet/BalanceDisplay.tsx
"use client";

import { Wallet, Clock, ArrowDown } from "lucide-react";

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
    <div className="bg-primary rounded-card p-6 text-white space-y-4">
      {/* Total Balance */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Wallet className="w-4 h-4 text-primary-200" />
          <span className="text-sm text-primary-200">Total Balance</span>
        </div>
        <p className="text-2xl font-bold">
          {currency} {balance_ghs.toLocaleString("en-GH", { minimumFractionDigits: 2 })}
        </p>
      </div>

      {/* Pending / Available */}
      <div className="grid grid-cols-2 gap-3">
        {/* Pending */}
        <div className="bg-primary-600 rounded-card p-3">
          <div className="flex items-center gap-1.5 mb-1">
            <Clock className="w-3.5 h-3.5 text-warning" />
            <span className="text-xs text-primary-200">Pending</span>
          </div>
          <p className="text-lg font-bold text-warning">
            {currency} {pending_ghs.toLocaleString("en-GH", { minimumFractionDigits: 2 })}
          </p>
        </div>

        {/* Available */}
        <div className="bg-primary-600 rounded-card p-3">
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
      <div className="pt-3 border-t border-primary-600">
        <div className="flex items-center justify-between">
          <span className="text-xs text-primary-200">Payout Method</span>
          <span className="text-xs font-medium text-white">
            {momo_provider} • {maskedNumber}
          </span>
        </div>
      </div>
    </div>
  );
}