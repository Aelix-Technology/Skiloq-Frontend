// src/hooks/useWallet.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import { mockWallet } from "@/lib/mock-wallet";
import { mockDelay } from "@/lib/mock-delay";
import { toasts } from "@/lib/toasts";
import type { WalletData, WithdrawRequest, WithdrawResponse } from "@/types/wallet";

export function useWorkerWallet() {
  return useQuery<WalletData>({
    queryKey: ["workers", "wallet"],
    queryFn: async () => {
      // TODO: Replace with apiClient.get("/workers/wallet")
      await mockDelay(500);
      return mockWallet;
    },
    staleTime: 30 * 1000,
    refetchInterval: 60 * 1000,
  });
}

export function useWithdraw() {
  const queryClient = useQueryClient();

  return useMutation<WithdrawResponse, Error, WithdrawRequest>({
    mutationFn: async (data) => {
      // TODO: Replace with apiClient.post("/workers/wallet/withdraw", data)
      await mockDelay(2000);

      if (data.amount < 10) throw new Error("MIN_WITHDRAWAL");
      if (data.amount > 10000) throw new Error("DAILY_LIMIT");
      if (data.pin !== "1234") throw new Error("INVALID_PIN");

      return {
        success: true,
        amount: data.amount,
        fee: data.amount * 0.015,
        net_amount: data.amount * 0.985,
        estimated_arrival: "0-2 minutes",
        new_balance: 750 - data.amount,
        transaction_id: `WD-${Date.now()}`,
      };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["workers", "wallet"] });
      toasts.withdrawSuccess(data.amount);
    },
    onError: (error) => {
      switch (error.message) {
        case "MIN_WITHDRAWAL": toasts.minWithdrawal(); break;
        case "DAILY_LIMIT": toasts.dailyLimit(); break;
        case "INVALID_PIN": toasts.invalidWithdrawPIN(); break;
        default: toasts.withdrawError(); break;
      }
    },
  });
}
