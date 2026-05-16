// src/types/admin.ts
export interface AdminStats {
  totalUsers: number;
  totalWorkers: number;
  totalEmployers: number;
  pendingVerifications: number;
  openDisputes: number;
  flaggedAccounts: number;
  totalTransactionsGHS: number;
  verificationSLABreach: number;
}

export interface VerificationItem {
  id: string;
  workerId: string;
  workerName: string;
  type: "identity" | "portfolio" | "agent_visit" | "assessment";
  status: "pending" | "in_review" | "approved" | "rejected";
  submittedAt: string;
  slaHoursRemaining: number;
  documentUrls?: string[];
  ocrData?: {
    fullName?: string;
    idNumber?: string;
    dateOfBirth?: string;
  };
  notes?: string;
}

export interface DisputeItem {
  id: string;
  jobId: string;
  jobTitle: string;
  workerName: string;
  employerName: string;
  amountGHS: number;
  status: "open" | "under_review" | "resolved";
  raisedBy: "worker" | "employer";
  raisedAt: string;
  evidence: {
    worker: string[];
    employer: string[];
  };
  chatTranscript: Array<{
    sender: string;
    message: string;
    timestamp: string;
  }>;
}

export interface FraudAlert {
  id: string;
  userId: string;
  userName: string;
  type: "multi_account" | "fake_reviews" | "payment_fraud" | "id_reuse" | "suspicious_activity";
  severity: "low" | "medium" | "high" | "critical";
  description: string;
  detectedAt: string;
  status: "new" | "investigating" | "resolved" | "dismissed";
  relatedAccounts: string[];
}

export interface AdminUser {
  id: string;
  phone: string;
  role: "worker" | "employer" | "admin" | "agent";
  fullName: string;
  isActive: boolean;
  verificationLevel: string;
  trustScore: number;
  joinedAt: string;
  totalJobs: number;
  disputeRate: number;
}
