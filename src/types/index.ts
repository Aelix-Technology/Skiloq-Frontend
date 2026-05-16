// src/types/index.ts

// Auth
export * from "./auth";

// Worker — exclude types that conflict with wallet
export type {
  Worker,
  WorkerCategory,
  WorkerSkill,
  PortfolioItem,
  Review,
  VerificationLevel,
  WorkerBadge,
  VerificationStatus,
  VerificationStep,
  VerificationStepStatus,
  IdentityVerificationResponse,
  IncomeCertificate,
  WorkerFilters,
} from "./worker";

// Job & Booking
export * from "./job";

// Dashboard
export type {
  WorkerDashboard,
  MatchedJob,
  ActiveJob,
  EarningsData,
  TrustScoreBreakdown,
} from "./dashboard";

// Wallet — has Transaction, WorkerWallet, WithdrawRequest, WithdrawResponse
export * from "./wallet";

// Onboarding
export * from "./onboarding";

// Messages
export * from "./messages";

// Employer
export * from "./employer";

// Admin
export * from "./admin";

// Agent
export * from "./agent";