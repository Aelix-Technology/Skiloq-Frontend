// src/lib/mock-admin.ts
import type { AdminStats, VerificationItem, DisputeItem, FraudAlert, AdminUser } from "@/types/admin";

export const mockAdminStats: AdminStats = {
  totalUsers: 5432,
  totalWorkers: 4890,
  totalEmployers: 520,
  pendingVerifications: 47,
  openDisputes: 8,
  flaggedAccounts: 12,
  totalTransactionsGHS: 245000,
  verificationSLABreach: 3,
};

export const mockVerificationQueue: VerificationItem[] = [
  {
    id: "ver-001",
    workerId: "w001",
    workerName: "Akua Serwaa",
    type: "identity",
    status: "pending",
    submittedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    slaHoursRemaining: 22,
    documentUrls: ["/assets/images/passport.jpg", "/assets/images/passport.jpg"],
    ocrData: { fullName: "Akua Serwaa", idNumber: "GHA-12345678-9", dateOfBirth: "1995-04-12" },
  },
  {
    id: "ver-002",
    workerId: "w002",
    workerName: "Kwame Boateng",
    type: "portfolio",
    status: "in_review",
    submittedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    slaHoursRemaining: 19,
    documentUrls: ["/assets/images/skill.png", "/assets/images/hired.png"],
  },
  {
    id: "ver-003",
    workerId: "w003",
    workerName: "Ama Nyarko",
    type: "identity",
    status: "pending",
    submittedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    slaHoursRemaining: 23,
    documentUrls: ["/assets/images/passport.jpg"],
    ocrData: { fullName: "Ama Nyarko", idNumber: "GHA-87654321-0", dateOfBirth: "1998-08-23" },
  },
  {
    id: "ver-004",
    workerId: "w005",
    workerName: "Kojo Essel",
    type: "agent_visit",
    status: "pending",
    submittedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    slaHoursRemaining: 16,
    notes: "Agent requested for Accra Central area",
  },
  {
    id: "ver-005",
    workerId: "w006",
    workerName: "Fatima Ibrahim",
    type: "portfolio",
    status: "pending",
    submittedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    slaHoursRemaining: 23.5,
    documentUrls: [],
  },
];

export const mockDisputes: DisputeItem[] = [
  {
    id: "dis-001",
    jobId: "j001",
    jobTitle: "Landing Page Redesign",
    workerName: "Akua Serwaa",
    employerName: "John Mensah",
    amountGHS: 1200,
    status: "open",
    raisedBy: "employer",
    raisedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    evidence: {
      worker: ["/assets/images/skill.png"],
      employer: ["/assets/images/passport.jpg"],
    },
    chatTranscript: [
      { sender: "John Mensah", message: "The landing page doesn't match the agreed design.", timestamp: "2026-02-16T10:00:00Z" },
      { sender: "Akua Serwaa", message: "I followed the scope document exactly. Which part doesn't match?", timestamp: "2026-02-16T10:15:00Z" },
      { sender: "John Mensah", message: "The mobile version is missing the hero animation we discussed.", timestamp: "2026-02-16T10:30:00Z" },
    ],
  },
  {
    id: "dis-002",
    jobId: "j004",
    jobTitle: "Emergency Plumbing Repair",
    workerName: "Yaw Takyi",
    employerName: "Kofi Asante",
    amountGHS: 800,
    status: "under_review",
    raisedBy: "worker",
    raisedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    evidence: {
      worker: ["/assets/images/hired.png"],
      employer: [],
    },
    chatTranscript: [
      { sender: "Yaw Takyi", message: "I completed the repair but the client hasn't marked it complete.", timestamp: "2026-02-15T14:00:00Z" },
    ],
  },
];

export const mockFraudAlerts: FraudAlert[] = [
  {
    id: "fraud-001",
    userId: "u010",
    userName: "Suspicious Account 1",
    type: "multi_account",
    severity: "high",
    description: "3 accounts detected sharing the same device fingerprint within 24 hours.",
    detectedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    status: "new",
    relatedAccounts: ["u010", "u011", "u012"],
  },
  {
    id: "fraud-002",
    userId: "u020",
    userName: "Review Farmer",
    type: "fake_reviews",
    severity: "critical",
    description: "12 reviews posted within 10 minutes, all 5-star, all from zero-history accounts.",
    detectedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    status: "investigating",
    relatedAccounts: ["u020", "u021"],
  },
  {
    id: "fraud-003",
    userId: "u030",
    userName: "Quick Payout",
    type: "payment_fraud",
    severity: "medium",
    description: "3x average payout amount requested within 1 hour window.",
    detectedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    status: "new",
    relatedAccounts: ["u030"],
  },
];

export const mockAdminUsers: AdminUser[] = [
  {
    id: "u001", phone: "+233241234567", role: "worker", fullName: "Akua Serwaa",
    isActive: true, verificationLevel: "verified", trustScore: 82.5,
    joinedAt: "2025-11-15", totalJobs: 34, disputeRate: 2.1,
  },
  {
    id: "u002", phone: "+233501234567", role: "worker", fullName: "Kwame Boateng",
    isActive: true, verificationLevel: "partial", trustScore: 68.0,
    joinedAt: "2025-12-01", totalJobs: 12, disputeRate: 4.5,
  },
  {
    id: "u010", phone: "+233201234567", role: "worker", fullName: "Suspicious Account 1",
    isActive: false, verificationLevel: "none", trustScore: 25.0,
    joinedAt: "2026-02-01", totalJobs: 0, disputeRate: 0,
  },
  {
    id: "e001", phone: "+233241112233", role: "employer", fullName: "John Mensah",
    isActive: true, verificationLevel: "verified", trustScore: 0,
    joinedAt: "2025-10-01", totalJobs: 8, disputeRate: 12.5,
  },
  {
    id: "e002", phone: "+233551112233", role: "employer", fullName: "Sarah Osei",
    isActive: true, verificationLevel: "verified", trustScore: 0,
    joinedAt: "2025-10-15", totalJobs: 5, disputeRate: 0,
  },
];