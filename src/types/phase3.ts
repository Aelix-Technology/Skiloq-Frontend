// src/types/phase3.ts
// Phase 3 Enterprise, Infrastructure & Continental Scale Types

import type { Currency, Country } from "./phase2";
import type { WorkerCategory } from "./onboarding";

// ── 1. USSD Interface (Offline Feature Phone Layer) ──────────────────────

export interface USSDSession {
  sessionId: string;
  phoneNumber: string;
  workerId?: string;
  currentScreen: "MAIN_MENU" | "BALANCE_CHECK" | "ACCEPT_JOBS" | "AVAILABILITY" | "CASHOUT" | "CONFIRMATION";
  inputHistory: string[];
  lastResponse: string;
  isClosed: boolean;
}

export interface USSDJobAlert {
  id: string;
  jobId: string;
  workerPhone: string;
  title: string;
  location: string;
  budgetGhs: number;
  ussdPromptCode: string;
  status: "pending" | "accepted" | "declined" | "expired";
  sentAt: string;
}

// ── 2. Enterprise & Team Hiring ──────────────────────

export type TeamStatus = "draft" | "matching" | "assembled" | "in_progress" | "completed" | "disbanded";

export interface TeamRoleRequirement {
  id: string;
  roleTitle: string;
  category: WorkerCategory;
  headcountNeeded: number;
  assignedWorkerIds: string[];
  dailyRatePerWorkerGhs: number;
  requiredSkills: string[];
}

export interface EnterpriseTeamProject {
  id: string;
  employerId: string;
  companyName: string;
  projectTitle: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  totalCrewSize: number;
  assembledCrewSize: number;
  totalBudgetGhs: number;
  status: TeamStatus;
  roles: TeamRoleRequirement[];
  supervisorId?: string;
  isNgoContract?: boolean;
  corporateBillingReference?: string;
  createdAt: string;
}

export interface TeamMember {
  id: string;
  workerId: string;
  name: string;
  role: string;
  avatar: string;
  trustScore: number;
  phone: string;
  checkInStatus: "checked_in" | "pending" | "absent";
  earningsGhs: number;
}

// ── 3. B2B API Access & Developer Platform ──────────────────────

export type APIKeyEnvironment = "sandbox" | "production";

export interface B2BAPIKey {
  id: string;
  name: string;
  prefix: string;
  keyMasked: string;
  rawKey?: string;
  environment: APIKeyEnvironment;
  scopes: string[];
  createdAt: string;
  lastUsedAt?: string;
  requestCountLast30Days: number;
  rateLimitPerMin: number;
  status: "active" | "revoked";
}

export interface B2BWebhookEndpoint {
  id: string;
  url: string;
  secret: string;
  events: string[];
  status: "active" | "failing" | "disabled";
  successRatePercent: number;
  createdAt: string;
}

export interface B2BUsageMetrics {
  totalCallsMonth: number;
  quotaMonth: number;
  activeWorkersQueried: number;
  payoutVolumeGhs: number;
  averageLatencyMs: number;
}

// ── 4. AI Career Dashboard (Per-Worker) ──────────────────────

export interface SkillDemandTrend {
  skillId: string;
  skillName: string;
  demandGrowthPercent: number; // e.g. +28%
  currentAverageHourlyRateGhs: number;
  jobPostingsCount: number;
  marketOutlook: "high_demand" | "surging" | "stable" | "declining";
}

export interface CareerUpskillRecommendation {
  id: string;
  recommendedSkill: string;
  relatedCurrentSkill: string;
  targetCourseId: string;
  courseTitle: string;
  estimatedWeeks: number;
  projectedEarningsIncreasePercent: number; // e.g. +35%
  urgency: "high" | "medium" | "low";
  whyRecommended: string;
}

export interface WorkerAICareerProfile {
  workerId: string;
  currentEarningPowerPercentile: number;
  topMarketStrengths: string[];
  priorityGrowthAreas: string[];
  projectedAnnualIncomeGhs: {
    currentTrajectory: number;
    withRecommendedUpskilling: number;
  };
  demandTrends: SkillDemandTrend[];
  recommendations: CareerUpskillRecommendation[];
}

// ── 5. Micro-Insurance Products ──────────────────────

export type InsurancePlanTier = "accident_basic" | "income_shield" | "artisan_comprehensive";

export interface InsurancePolicy {
  id: string;
  planId: InsurancePlanTier;
  planName: string;
  monthlyPremiumGhs: number;
  dailyHospitalCashGhs: number;
  totalAccidentCoverageGhs: number;
  toolsTheftCoverageGhs: number;
  underwritingPartner: string; // e.g. "Enterprise Life Assurance"
  benefits: string[];
}

export interface WorkerInsuranceEnrollment {
  id: string;
  workerId: string;
  policyId: string;
  policyName: string;
  tier: InsurancePlanTier;
  status: "active" | "grace_period" | "lapsed";
  monthlyDeductionGhs: number;
  nextRenewalDate: string;
  activeClaimsCount: number;
  coverageLimitGhs: number;
  coveredUntil: string;
}

export interface InsuranceClaim {
  id: string;
  enrollmentId: string;
  claimType: "accident" | "hospital_cash" | "tool_theft";
  amountClaimedGhs: number;
  amountApprovedGhs?: number;
  status: "under_review" | "approved" | "disbursed" | "rejected";
  hospitalOrPoliceReportUrl?: string;
  incidentDate: string;
  filedAt: string;
  payoutDate?: string;
  incidentDescription: string;
}

// ── 6. Francophone West Africa Expansion ──────────────────────

export type FrancophoneCountry = "cote_divoire" | "senegal" | "cameroon";
export type FrancophoneCurrency = "XOF" | "XAF";

export interface FrancophoneCountryConfig {
  code: FrancophoneCountry;
  name: string;
  nativeName: string;
  flag: string;
  currency: FrancophoneCurrency;
  currencySymbol: string;
  exchangeRateToGhs: number;
  majorHubs: string[];
  localPaymentMethods: ("orange_money" | "wave" | "mtn_momo_fr")[];
}
