// src/components/wallet/WalletSkeleton.tsx
export function WalletSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Balance card skeleton */}
      <div className="bg-primary rounded-card p-6 space-y-4">
        <div className="h-4 bg-primary-600 rounded w-24" />
        <div className="h-8 bg-primary-600 rounded w-40" />
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-primary-600 rounded-card p-3">
            <div className="h-3 bg-primary-500 rounded w-14 mb-2" />
            <div className="h-6 bg-primary-500 rounded w-20" />
          </div>
          <div className="bg-primary-600 rounded-card p-3">
            <div className="h-3 bg-primary-500 rounded w-14 mb-2" />
            <div className="h-6 bg-primary-500 rounded w-20" />
          </div>
        </div>
      </div>

      {/* Withdraw button skeleton */}
      <div className="h-12 bg-white rounded-input border border-primary-100" />

      {/* Transactions skeleton */}
      <div className="space-y-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-card border border-primary-100 p-4 flex items-center gap-3">
            <div className="w-9 h-9 bg-primary-100 rounded-full" />
            <div className="flex-1 space-y-1">
              <div className="h-4 bg-primary-100 rounded w-48" />
              <div className="h-3 bg-primary-100 rounded w-20" />
            </div>
            <div className="h-5 bg-primary-100 rounded w-16" />
          </div>
        ))}
      </div>
    </div>
  );
}