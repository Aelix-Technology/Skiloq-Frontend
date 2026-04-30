// src/app/worker/wallet/page.tsx
"use client";

import { useState } from "react";
import { WorkerLayout } from "@/components/layout/WorkerLayout";
import { BalanceDisplay } from "@/components/wallet/BalanceDisplay";
import { TransactionHistory } from "@/components/wallet/TransactionHistory";
import { WithdrawFlow } from "@/components/wallet/WithdrawFlow";
import { EarningsBadge } from "@/components/wallet/EarningsBadge";
import { WalletSkeleton } from "@/components/wallet/WalletSkeleton";
import { ErrorState } from "@/components/shared/ErrorState";
import { useWorkerWallet, useWithdraw } from "@/hooks/useWallet";
import { ArrowUpRight } from "lucide-react";

const INCOME_CERTIFICATE_THRESHOLD = 5000;

export default function WalletPage() {
  const { data: wallet, isLoading, error, refetch } = useWorkerWallet();
  const withdrawMutation = useWithdraw();
  const [showWithdraw, setShowWithdraw] = useState(false);

  if (isLoading) {
    return (
      <WorkerLayout>
        <WalletSkeleton />
      </WorkerLayout>
    );
  }

  if (error || !wallet) {
    return (
      <WorkerLayout>
        <ErrorState onRetry={() => refetch()} />
      </WorkerLayout>
    );
  }

  const handleWithdraw = (amount: number, pin: string) => {
    withdrawMutation.mutate(
      { amount, momo_number: wallet.momo_number, pin },
      {
        onError: () => {
          setShowWithdraw(false);
        },
      }
    );
  };

  return (
    <WorkerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-xl font-bold text-primary">Wallet</h1>
          <p className="text-sm text-primary-300 mt-0.5">Manage your earnings and withdrawals</p>
        </div>

        {/* Balance */}
        <BalanceDisplay
          balance_ghs={wallet.balance_ghs}
          pending_ghs={wallet.pending_ghs}
          available_ghs={wallet.available_ghs}
          currency={wallet.currency}
          momo_provider={wallet.momo_provider}
          momo_number={wallet.momo_number}
        />

        {/* Withdraw button */}
        <button
          onClick={() => setShowWithdraw(true)}
          disabled={wallet.available_ghs < 10}
          className="w-full bg-white border-2 border-accent text-accent font-semibold py-3 rounded-input hover:bg-accent-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 touch-target"
        >
          <ArrowUpRight className="w-4 h-4" />
          Withdraw
        </button>

        {/* Earnings Badge */}
        <EarningsBadge
          totalEarnings={wallet.total_earnings}
          unlocked={wallet.earnings_badge_unlocked}
          threshold={INCOME_CERTIFICATE_THRESHOLD}
        />

        {/* Transaction History */}
        <TransactionHistory transactions={wallet.transactions} />

        {/* Withdraw Modal */}
        <WithdrawFlow
          isOpen={showWithdraw}
          onClose={() => {
            if (!withdrawMutation.isPending) setShowWithdraw(false);
          }}
          available_ghs={wallet.available_ghs}
          momo_number={wallet.momo_number}
          onWithdraw={handleWithdraw}
          isWithdrawing={withdrawMutation.isPending}
        />
      </div>
    </WorkerLayout>
  );
}