// src/types/wallet.ts
export interface WalletData {
  balance_ghs: number;
  pending_ghs: number;
  available_ghs: number;
  currency: string;
  momo_number: string;
  momo_provider: string;
  transactions: Transaction[];
  total_earnings: number;
  earnings_badge_unlocked: boolean;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: "earning" | "withdrawal" | "fee";
  status: "completed" | "pending" | "failed";
  reference: string;
}

export interface WithdrawRequest {
  amount: number;
  momo_number: string;
  pin: string;
}

export interface WithdrawResponse {
  success: boolean;
  amount: number;
  fee: number;
  net_amount: number;
  estimated_arrival: string;
  new_balance: number;
  transaction_id: string;
}
