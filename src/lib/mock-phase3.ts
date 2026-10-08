// src/lib/mock-phase3.ts
// Phase 3 Mock Data & Business Logic Services

import type {
  EnterpriseTeamProject,
  TeamMember,
  B2BAPIKey,
  B2BWebhookEndpoint,
  B2BUsageMetrics,
  WorkerAICareerProfile,
  SkillDemandTrend,
  InsurancePolicy,
  WorkerInsuranceEnrollment,
  InsuranceClaim,
  FrancophoneCountryConfig,
  USSDJobAlert,
} from "@/types/phase3";

// ── 1. USSD Engine Simulator Logic ──────────────────────

export const USSD_SHORTCODE = "*920*88#";

export interface USSDMenuResponse {
  message: string;
  isEnd: boolean;
  options?: { key: string; label: string }[];
}

export function processUSSDInput(
  sessionPath: string[],
  workerState = {
    balanceGhs: 2450.0,
    isAvailable: true,
    pendingJobCount: 2,
    phone: "+233 54 272 7188",
  }
): USSDMenuResponse {
  // If fresh session or root
  if (sessionPath.length === 0) {
    return {
      message: `Skiloq Mobile (No Data)\n1. Wallet Balance\n2. Pending Job Offers (${workerState.pendingJobCount})\n3. Toggle Available (Now: ${workerState.isAvailable ? "ON" : "OFF"})\n4. Emergency MoMo Cashout\n0. Exit`,
      isEnd: false,
    };
  }

  const rootChoice = sessionPath[0];

  // 1. Check Balance
  if (rootChoice === "1") {
    return {
      message: `Skiloq Wallet:\nAvailable: GHS ${workerState.balanceGhs.toFixed(2)}\nSavings Vault: GHS 1,200.00\nLast Payout: GHS 450.00 (MTN MoMo)\n\nDial 1 to Cashout now, 0 to return`,
      isEnd: false,
    };
  }

  // 2. Pending Jobs
  if (rootChoice === "2") {
    if (sessionPath.length === 1) {
      return {
        message: `New Booking Offers:\n1. Event Electrical (East Legon) - GHS 650\n2. AC Maintenance (Airport Res) - GHS 300\n\nReply with job number to accept or decline.`,
        isEnd: false,
      };
    }
    const jobChoice = sessionPath[1];
    if (sessionPath.length === 2) {
      return {
        message: `Job #${jobChoice} Details:\nClient: K. Mensah (Trust 95)\nBudget: Escrow Funded\n\nReply:\n1. Accept & Reveal Address\n2. Decline offer`,
        isEnd: false,
      };
    }
    if (sessionPath[2] === "1") {
      return {
        message: `Accepted! Employer notified via SMS. Job address: Plot 44 Boundary Rd, East Legon. Check SMS for client phone number.`,
        isEnd: true,
      };
    }
    if (sessionPath[2] === "2") {
      return {
        message: `Offer declined. You remain available for other matches.`,
        isEnd: true,
      };
    }
  }

  // 3. Toggle Availability
  if (rootChoice === "3") {
    const newState = !workerState.isAvailable;
    return {
      message: `Status updated! You are now ${newState ? "AVAILABLE for instant gigs" : "OFFLINE / Busy"}. Clients will ${newState ? "see your profile in live search" : "not be able to instant-book"}.`,
      isEnd: true,
    };
  }

  // 4. Emergency MoMo Cashout
  if (rootChoice === "4") {
    if (sessionPath.length === 1) {
      return {
        message: `Fast MoMo Cashout:\nEnter amount in GHS (Max: GHS ${workerState.balanceGhs.toFixed(0)}):`,
        isEnd: false,
      };
    }
    const amount = sessionPath[1];
    return {
      message: `Withdrawal initiated! GHS ${amount} is being disbursed to your registered MTN MoMo line (${workerState.phone}). Arrival in 60-120 seconds.`,
      isEnd: true,
    };
  }

  return {
    message: "Thank you for using Skiloq Offline USSD. Stay safe!",
    isEnd: true,
  };
}

export const mockUSSDAlerts: USSDJobAlert[] = [
  {
    id: "ussd-job-1",
    jobId: "job-101",
    workerPhone: "+233 54 272 7188",
    title: "Urgent Residential Wiring Inspection",
    location: "Achimota, Accra",
    budgetGhs: 450,
    ussdPromptCode: "*920*88*101#",
    status: "pending",
    sentAt: "10 mins ago",
  },
  {
    id: "ussd-job-2",
    jobId: "job-102",
    workerPhone: "+233 54 272 7188",
    title: "Plumbing Pipe Relocation & Valve Fit",
    location: "Dzorwulu, Accra",
    budgetGhs: 320,
    ussdPromptCode: "*920*88*102#",
    status: "accepted",
    sentAt: "2 hours ago",
  },
];

// ── 2. Enterprise & Team Hiring Mock Projects ──────────────────────

export const mockEnterpriseProjects: EnterpriseTeamProject[] = [
  {
    id: "ent-team-1",
    employerId: "emp-corp-01",
    companyName: "Ecobank West Africa Foundation",
    projectTitle: "Annual Pan-African Youth Summit Logistics & Crew",
    description: "Requires a vetted 12-person operational crew covering event audiovisual, stage electrics, guest concierge, and live transcription.",
    location: "Grand Arena, Accra International Conference Centre",
    startDate: "2026-11-14",
    endDate: "2026-11-18",
    totalCrewSize: 12,
    assembledCrewSize: 10,
    totalBudgetGhs: 38500,
    status: "in_progress",
    isNgoContract: true,
    corporateBillingReference: "ECO-NGO-2026-884",
    createdAt: "2026-10-02",
    roles: [
      {
        id: "role-1",
        roleTitle: "Lead Event Electrician",
        category: "trade",
        headcountNeeded: 2,
        assignedWorkerIds: ["w-1", "w-2"],
        dailyRatePerWorkerGhs: 650,
        requiredSkills: ["Electrical", "Solar Installation"],
      },
      {
        id: "role-2",
        roleTitle: "Live Transcription & Audio Capture",
        category: "online_income",
        headcountNeeded: 3,
        assignedWorkerIds: ["w-3", "w-4", "w-5"],
        dailyRatePerWorkerGhs: 500,
        requiredSkills: ["Transcription", "Copywriting"],
      },
      {
        id: "role-3",
        roleTitle: "Stage Technical Operations & Logistics",
        category: "trade",
        headcountNeeded: 5,
        assignedWorkerIds: ["w-6", "w-7", "w-8", "w-9", "w-10"],
        dailyRatePerWorkerGhs: 420,
        requiredSkills: ["Carpentry", "Electrical"],
      },
      {
        id: "role-4",
        roleTitle: "Conference Content Translators (French/English)",
        category: "educator",
        headcountNeeded: 2,
        assignedWorkerIds: [],
        dailyRatePerWorkerGhs: 750,
        requiredSkills: ["Language Tutor"],
      },
    ],
  },
  {
    id: "ent-team-2",
    employerId: "emp-corp-02",
    companyName: "Stanbic Bank Real Estate Assets",
    projectTitle: "Ridge Commercial Plaza Facility Upgrade Crew",
    description: "Assembly of 8 multi-disciplinary trade artisans for structural masonry, electrical rewiring, and HVAC inspection.",
    location: "Ridge Business District, Accra",
    startDate: "2026-11-20",
    endDate: "2026-12-05",
    totalCrewSize: 8,
    assembledCrewSize: 8,
    totalBudgetGhs: 49200,
    status: "assembled",
    corporateBillingReference: "SB-FAC-ACCRA-902",
    createdAt: "2026-10-04",
    roles: [
      {
        id: "role-5",
        roleTitle: "Commercial Plumbing Specialists",
        category: "trade",
        headcountNeeded: 3,
        assignedWorkerIds: ["w-11", "w-12", "w-13"],
        dailyRatePerWorkerGhs: 600,
        requiredSkills: ["Plumbing"],
      },
      {
        id: "role-6",
        roleTitle: "Industrial Electricians",
        category: "trade",
        headcountNeeded: 3,
        assignedWorkerIds: ["w-14", "w-15", "w-16"],
        dailyRatePerWorkerGhs: 650,
        requiredSkills: ["Electrical", "Solar Installation"],
      },
      {
        id: "role-7",
        roleTitle: "Tiling & Finishing Artisans",
        category: "trade",
        headcountNeeded: 2,
        assignedWorkerIds: ["w-17", "w-18"],
        dailyRatePerWorkerGhs: 550,
        requiredSkills: ["Tiling"],
      },
    ],
  },
];

export const mockTeamMembers: TeamMember[] = [
  {
    id: "tm-1",
    workerId: "w-1",
    name: "Kweku Boateng",
    role: "Lead Event Electrician",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces",
    trustScore: 98,
    phone: "+233 24 411 2938",
    checkInStatus: "checked_in",
    earningsGhs: 3250,
  },
  {
    id: "tm-2",
    workerId: "w-3",
    name: "Abena Mansa",
    role: "Live Transcription Lead",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces",
    trustScore: 96,
    phone: "+233 20 892 1049",
    checkInStatus: "checked_in",
    earningsGhs: 2500,
  },
  {
    id: "tm-3",
    workerId: "w-7",
    name: "Samuel Osei",
    role: "Stage Technical Ops",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces",
    trustScore: 92,
    phone: "+233 55 930 2011",
    checkInStatus: "checked_in",
    earningsGhs: 2100,
  },
  {
    id: "tm-4",
    workerId: "w-9",
    name: "Eunice Addo",
    role: "Stage Technical Ops",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=faces",
    trustScore: 94,
    phone: "+233 27 618 3920",
    checkInStatus: "pending",
    earningsGhs: 2100,
  },
];

// ── 3. B2B API Developer Platform Mock Data ──────────────────────

export const mockB2BKeys: B2BAPIKey[] = [
  {
    id: "key-live-1",
    name: "Production Core Integration (Stanbic Payroll)",
    prefix: "sk_live",
    keyMasked: "sk_live_98ab••••••••••••••••34ef",
    environment: "production",
    scopes: ["workers:read", "workers:verify", "escrow:create", "payouts:execute"],
    createdAt: "2026-08-15",
    lastUsedAt: "4 mins ago",
    requestCountLast30Days: 148200,
    rateLimitPerMin: 1200,
    status: "active",
  },
  {
    id: "key-sand-2",
    name: "Staging Sandbox Integration",
    prefix: "sk_test",
    keyMasked: "sk_test_41cc••••••••••••••••911a",
    environment: "sandbox",
    scopes: ["workers:read", "jobs:write", "kyc:simulate"],
    createdAt: "2026-09-01",
    lastUsedAt: "1 day ago",
    requestCountLast30Days: 18450,
    rateLimitPerMin: 300,
    status: "active",
  },
];

export const mockB2BWebhooks: B2BWebhookEndpoint[] = [
  {
    id: "wh-1",
    url: "https://api.partnerbank.com.gh/v1/webhooks/skiloq-escrow",
    secret: "whsec_live_9981240aabce91",
    events: ["escrow.funded", "job.milestone_approved", "payout.disbursed"],
    status: "active",
    successRatePercent: 99.8,
    createdAt: "2026-08-20",
  },
  {
    id: "wh-2",
    url: "https://ngo-tracker.org/api/hooks/worker-attendance",
    secret: "whsec_live_771824aa09b33a",
    events: ["team.worker_checked_in", "kyc.worker_verified"],
    status: "active",
    successRatePercent: 100,
    createdAt: "2026-09-12",
  },
];

export const mockB2BMetrics: B2BUsageMetrics = {
  totalCallsMonth: 166650,
  quotaMonth: 500000,
  activeWorkersQueried: 4210,
  payoutVolumeGhs: 428000,
  averageLatencyMs: 64,
};

// ── 4. AI Career Dashboard Mock Data ──────────────────────

export const mockDemandTrends: SkillDemandTrend[] = [
  {
    skillId: "react-next",
    skillName: "Next.js & Fullstack React",
    demandGrowthPercent: 38,
    currentAverageHourlyRateGhs: 95,
    jobPostingsCount: 142,
    marketOutlook: "surging",
  },
  {
    skillId: "solar-install",
    skillName: "Commercial Solar & Inverter Tech",
    demandGrowthPercent: 54,
    currentAverageHourlyRateGhs: 80,
    jobPostingsCount: 98,
    marketOutlook: "surging",
  },
  {
    skillId: "figma-ui",
    skillName: "UI/UX Product Design (Mobile-First)",
    demandGrowthPercent: 29,
    currentAverageHourlyRateGhs: 75,
    jobPostingsCount: 110,
    marketOutlook: "high_demand",
  },
  {
    skillId: "transcription-fr",
    skillName: "French-English Bilingual Transcription",
    demandGrowthPercent: 42,
    currentAverageHourlyRateGhs: 65,
    jobPostingsCount: 76,
    marketOutlook: "high_demand",
  },
  {
    skillId: "cctv-smart",
    skillName: "IoT CCTV & Access Security",
    demandGrowthPercent: 22,
    currentAverageHourlyRateGhs: 60,
    jobPostingsCount: 52,
    marketOutlook: "stable",
  },
];

export const mockAICareerProfile: WorkerAICareerProfile = {
  workerId: "w-current",
  currentEarningPowerPercentile: 82,
  topMarketStrengths: [
    "High Trust Score (98/100)",
    "Consistent On-Time Milestone Completion (99%)",
    "Verified Identity & Verified Skill Credential",
  ],
  priorityGrowthAreas: [
    "Expanding from Front-end to Cloud Full-Stack Deployment",
    "International Multi-Currency Escrow Contracts (USD / CFA)",
    "Team Lead Certification for Enterprise Multi-Worker Gigs",
  ],
  projectedAnnualIncomeGhs: {
    currentTrajectory: 48000,
    withRecommendedUpskilling: 82500,
  },
  demandTrends: mockDemandTrends,
  recommendations: [
    {
      id: "rec-1",
      recommendedSkill: "Next.js & Production TypeScript",
      relatedCurrentSkill: "React Developer",
      targetCourseId: "course-nextjs-afri",
      courseTitle: "Enterprise Next.js Architecture for African FinTechs",
      estimatedWeeks: 3,
      projectedEarningsIncreasePercent: 45,
      urgency: "high",
      whyRecommended: "Employer job budgets for Next.js are currently 45% higher than standard React postings in Accra and Lagos.",
    },
    {
      id: "rec-2",
      recommendedSkill: "Team Supervisor & Quality Assurance",
      relatedCurrentSkill: "Top Rated Worker Status",
      targetCourseId: "course-team-lead",
      courseTitle: "Enterprise Team Crew Lead & Site Operations",
      estimatedWeeks: 2,
      projectedEarningsIncreasePercent: 30,
      urgency: "medium",
      whyRecommended: "Unlocks eligibility to be hired as Team Supervisor on high-budget Enterprise contracts (paying GHS 650+/day).",
    },
    {
      id: "rec-3",
      recommendedSkill: "Francophone Bilingual Localization",
      relatedCurrentSkill: "Online Income / Content",
      targetCourseId: "course-fr-tech",
      courseTitle: "Technical French for West African Digital Work",
      estimatedWeeks: 2,
      projectedEarningsIncreasePercent: 25,
      urgency: "low",
      whyRecommended: "Our Abidjan and Dakar expansion opens direct remote projects paid in CFA Francs.",
    },
  ],
};

// ── 5. Micro-Insurance Products Mock Data ──────────────────────

export const mockInsurancePolicies: InsurancePolicy[] = [
  {
    id: "pol-accident",
    planId: "accident_basic",
    planName: "Essential Accident & Injury Shield",
    monthlyPremiumGhs: 8,
    dailyHospitalCashGhs: 150,
    totalAccidentCoverageGhs: 12000,
    toolsTheftCoverageGhs: 0,
    underwritingPartner: "Enterprise Life Assurance PLC",
    benefits: [
      "GHS 150/day hospital cash during injury admission (up to 30 days)",
      "Up to GHS 12,000 emergency medical expense reimbursement",
      "Auto-deducted seamlessly from your completed job escrow earnings",
      "Immediate coverage activation after 1st verified booking",
    ],
  },
  {
    id: "pol-income",
    planId: "income_shield",
    planName: "Pro Earner Income Protection",
    monthlyPremiumGhs: 18,
    dailyHospitalCashGhs: 250,
    totalAccidentCoverageGhs: 25000,
    toolsTheftCoverageGhs: 3000,
    underwritingPartner: "Hollard Insurance Ghana",
    benefits: [
      "All Essential Shield accident & emergency benefits",
      "GHS 250/day income replacement during medical incapacity",
      "GHS 3,000 coverage against theft of trade tools / laptop on gig site",
      "Fast claim disbursement to MTN / Telecel MoMo within 48 hours",
    ],
  },
  {
    id: "pol-master",
    planId: "artisan_comprehensive",
    planName: "Master Artisan & Contractor Shield",
    monthlyPremiumGhs: 32,
    dailyHospitalCashGhs: 400,
    totalAccidentCoverageGhs: 50000,
    toolsTheftCoverageGhs: 10000,
    underwritingPartner: "Sanlam General Insurance",
    benefits: [
      "Comprehensive site third-party liability (up to GHS 30,000)",
      "Full tooling & equipment replacement cover up to GHS 10,000",
      "Family emergency cash allowance in case of permanent disability",
      "24/7 Telehealth doctor consultation access on WhatsApp",
    ],
  },
];

export const mockActiveEnrollment: WorkerInsuranceEnrollment = {
  id: "enr-worker-99",
  workerId: "w-current",
  policyId: "pol-income",
  policyName: "Pro Earner Income Protection",
  tier: "income_shield",
  status: "active",
  monthlyDeductionGhs: 18,
  nextRenewalDate: "2026-11-01",
  activeClaimsCount: 0,
  coverageLimitGhs: 25000,
  coveredUntil: "31 Oct 2026",
};

export const mockInsuranceClaims: InsuranceClaim[] = [
  {
    id: "claim-01",
    enrollmentId: "enr-worker-99",
    claimType: "hospital_cash",
    amountClaimedGhs: 450,
    amountApprovedGhs: 450,
    status: "disbursed",
    incidentDate: "2026-09-14",
    filedAt: "2026-09-16",
    payoutDate: "2026-09-18",
    incidentDescription: "Hospital stay at Ridge Regional for acute malaria treatment (3 days admission).",
  },
];

// ── 6. Francophone West Africa Expansion Config ──────────────────────

export const mockFrancophoneCountries: FrancophoneCountryConfig[] = [
  {
    code: "cote_divoire",
    name: "Côte d'Ivoire",
    nativeName: "République de Côte d'Ivoire",
    flag: "🇨🇮",
    currency: "XOF",
    currencySymbol: "CFA",
    exchangeRateToGhs: 42.5, // 1 GHS ≈ 42.5 XOF
    majorHubs: ["Abidjan (Plateau, Cocody, Marcory)", "Bouaké", "San-Pédro"],
    localPaymentMethods: ["orange_money", "wave", "mtn_momo_fr"],
  },
  {
    code: "senegal",
    name: "Senegal",
    nativeName: "République du Sénégal",
    flag: "🇸🇳",
    currency: "XOF",
    currencySymbol: "CFA",
    exchangeRateToGhs: 42.5,
    majorHubs: ["Dakar (Plateau, Almadies, Mermoz)", "Thiès", "Saint-Louis"],
    localPaymentMethods: ["wave", "orange_money"],
  },
  {
    code: "cameroon",
    name: "Cameroon",
    nativeName: "République du Cameroun",
    flag: "🇨🇲",
    currency: "XAF",
    currencySymbol: "FCFA",
    exchangeRateToGhs: 42.1,
    majorHubs: ["Douala (Akwa, Bonanjo)", "Yaoundé", "Bafoussam"],
    localPaymentMethods: ["orange_money", "mtn_momo_fr"],
  },
];
