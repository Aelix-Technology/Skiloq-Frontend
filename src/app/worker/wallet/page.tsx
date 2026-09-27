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

import { SavingsVaultCard } from "@/components/wallet/SavingsVaultCard";
import { GlobalEarnerCard } from "@/components/wallet/GlobalEarnerCard";
import { IncomeCertificateModal } from "@/components/wallet/IncomeCertificateModal";

const INCOME_CERTIFICATE_THRESHOLD = 5000;

export default function WalletPage() {
  const { data: wallet, isLoading, error, refetch } = useWorkerWallet();
  const withdrawMutation = useWithdraw();
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [showCertificateModal, setShowCertificateModal] = useState(false);

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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-primary">Financial Hub & Wallet</h1>
            <p className="text-sm text-primary-300 mt-0.5">Dual-currency accounts, MoMo disbursements & verified savings</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200">
              MTN MoMo Rails Active
            </span>
          </div>
        </div>

        {/* Primary MoMo GHS Balance */}
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
          className="flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#4F6AF5] hover:bg-[#3d56e0] py-3.5 font-bold text-white shadow-lg shadow-[#4F6AF5]/25 transition-all hover:-translate-y-0.5 active:scale-98 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ArrowUpRight className="w-5 h-5" />
          <span>Withdraw to MoMo (0–2 Min Disbursement)</span>
        </button>

        {/* Phase 2: Virtual USD Global Earner Account */}
        <GlobalEarnerCard
          usdBalance={840.0}
          exchangeRateUsdToGhs={15.45}
          isGlobalEarner={true}
        />

        {/* Phase 2: Savings Vault Lock & Earn */}
        <SavingsVaultCard
          currentBalanceGhs={2450.0}
          goalGhs={5000.0}
          interestRateAnnual={10.5}
          interestEarnedGhs={142.8}
          lockedUntil="15 Dec 2026"
          isRoundUpEnabled={true}
        />

        {/* Earnings Badge with downloadable certificate modal */}
        <EarningsBadge
          totalEarnings={wallet.total_earnings}
          unlocked={wallet.earnings_badge_unlocked}
          threshold={INCOME_CERTIFICATE_THRESHOLD}
          onOpenCertificate={() => setShowCertificateModal(true)}
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

        {/* Phase 2: Income Certificate Downloadable Modal */}
        <IncomeCertificateModal
          isOpen={showCertificateModal}
          onClose={() => setShowCertificateModal(false)}
          workerName="Oluwaseun Adeyemi"
          totalEarningsGhs={wallet.total_earnings || 12500}
          averageMonthlyIncomeGhs={3125}
          completedJobs={34}
          monthsActive={4}
          trustScore={82.5}
        />
      </div>
    </WorkerLayout>
  );
}
