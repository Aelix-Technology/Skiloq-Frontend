// src/components/wallet/TransactionHistory.tsx
"use client";

import { useState } from "react";
import type { Transaction } from "@/types/wallet";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Minus,
  Filter,
} from "lucide-react";

interface TransactionHistoryProps {
  transactions: Transaction[];
}

type FilterType = "all" | "earning" | "withdrawal" | "fee";

const filterConfig: { value: FilterType; label: string; color: string; icon: typeof ArrowDownLeft }[] = [
  { value: "all", label: "All", color: "text-primary", icon: ArrowDownLeft },
  { value: "earning", label: "Earnings", color: "text-success", icon: ArrowDownLeft },
  { value: "withdrawal", label: "Withdrawals", color: "text-accent", icon: ArrowUpRight },
  { value: "fee", label: "Fees", color: "text-warning", icon: Minus },
];

export function TransactionHistory({ transactions }: TransactionHistoryProps) {
  const [filter, setFilter] = useState<FilterType>("all");

  const filtered = filter === "all"
    ? transactions
    : transactions.filter((t) => t.type === filter);

  const getIcon = (type: string) => {
    switch (type) {
      case "earning": return ArrowDownLeft;
      case "withdrawal": return ArrowUpRight;
      case "fee": return Minus;
      default: return ArrowDownLeft;
    }
  };

  const getColors = (type: string) => {
    switch (type) {
      case "earning": return { bg: "bg-success/10", text: "text-success" };
      case "withdrawal": return { bg: "bg-accent/10", text: "text-accent" };
      case "fee": return { bg: "bg-warning/10", text: "text-warning" };
      default: return { bg: "bg-primary-50", text: "text-primary-300" };
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
    });
  };

  return (
    <div className="space-y-3">
      <h2 className="text-md font-semibold text-primary">Transactions</h2>

      {/* Filter tabs */}
      <div className="flex gap-1 overflow-x-auto pb-1">
        {filterConfig.map((f) => {
          const Icon = f.icon;
          return (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-pill text-xs font-medium whitespace-nowrap transition-colors ${
                filter === f.value
                  ? "bg-accent text-white"
                  : "bg-primary-50 text-primary-300 hover:bg-primary-100"
              }`}
            >
              <Icon className="w-3 h-3" />
              {f.label}
            </button>
          );
        })}
      </div>

      {/* Transaction list */}
      {filtered.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-sm text-primary-300">No {filter} transactions</p>
        </div>
      ) : (
        <div className="bg-white rounded-card border border-primary-100 divide-y divide-primary-50">
          {filtered.map((tx) => {
            const Icon = getIcon(tx.type);
            const colors = getColors(tx.type);

            return (
              <div key={tx.id} className="flex items-center gap-3 p-4">
                {/* Icon */}
                <div className={`w-9 h-9 rounded-full ${colors.bg} flex items-center justify-center shrink-0`}>
                  <Icon className={`w-4 h-4 ${colors.text}`} />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-primary truncate">
                    {tx.description}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-primary-300">{formatDate(tx.date)}</span>
                    {tx.status === "pending" && (
                      <span className="text-xs text-warning font-medium bg-warning/10 px-1.5 py-0.5 rounded-pill">
                        Pending
                      </span>
                    )}
                    {tx.status === "failed" && (
                      <span className="text-xs text-danger font-medium bg-danger/10 px-1.5 py-0.5 rounded-pill">
                        Failed
                      </span>
                    )}
                  </div>
                </div>

                {/* Amount */}
                <div className="text-right shrink-0">
                  <p className={`text-sm font-semibold ${colors.text}`}>
                    {tx.type === "earning" ? "+" : tx.type === "fee" ? "−" : "−"}
                    GHS {tx.amount.toLocaleString("en-GH", { minimumFractionDigits: 2 })}
                  </p>
                  <p className="text-xs text-primary-300">{tx.reference}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}