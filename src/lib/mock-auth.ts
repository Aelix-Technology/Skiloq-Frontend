// src/lib/mock-auth.ts
import type { User, UserRole } from "@/types/auth";

export interface MockAccountConfig {
  role: UserRole;
  title: string;
  phone: string;
  code: string;
  name: string;
  badge: string;
  description: string;
  dashboardUrl: string;
  avatarInitials: string;
  user: User;
}

export const MOCK_UNIVERSAL_CODES = ["123456", "000000", "111111", "1234", "0000"];

export const MOCK_ACCOUNTS: Record<UserRole, MockAccountConfig> = {
  worker: {
    role: "worker",
    title: "Verified Worker",
    phone: "0540000001",
    code: "123456",
    name: "Kwame Mensah",
    badge: "Level 2 • Verified",
    description: "Full access to worker dashboard, job search, bookings, and wallet.",
    dashboardUrl: "/worker/dashboard",
    avatarInitials: "KM",
    user: {
      id: "mock-worker-001",
      phone: "0540000001",
      phone_verified: true,
      role: "worker",
      full_name: "Kwame Mensah",
      category: "Electrical & Plumbing",
      rating: 4.9,
      review_count: 38,
      trust_score: 96,
      verification_level: "full",
      is_active: true,
      country: "ghana",
      preferred_locale: "en",
      preferred_currency: "GHS",
      created_at: "2024-01-15T10:00:00.000Z",
      is_mock: true,
    },
  },
  employer: {
    role: "employer",
    title: "Employer / Business",
    phone: "0540000002",
    code: "123456",
    name: "Kofi Boateng",
    badge: "FinTech Ghana Ltd",
    description: "Post jobs, hire talent, manage contracts, and process payroll.",
    dashboardUrl: "/employer/dashboard",
    avatarInitials: "KB",
    user: {
      id: "mock-employer-001",
      phone: "0540000002",
      phone_verified: true,
      role: "employer",
      full_name: "Kofi Boateng",
      company_name: "FinTech Ghana Ltd",
      industry: "Financial Technology",
      rating: 4.8,
      active_jobs_count: 5,
      is_active: true,
      country: "ghana",
      preferred_locale: "en",
      preferred_currency: "GHS",
      created_at: "2024-02-01T10:00:00.000Z",
      is_mock: true,
    },
  },
  admin: {
    role: "admin",
    title: "Platform Admin",
    phone: "0540000003",
    code: "123456",
    name: "Skiloq Operations Admin",
    badge: "Super Admin",
    description: "Review verifications, resolve disputes, monitor fraud, and manage users.",
    dashboardUrl: "/admin/dashboard",
    avatarInitials: "AD",
    user: {
      id: "mock-admin-001",
      phone: "0540000003",
      phone_verified: true,
      role: "admin",
      full_name: "Admin Officer",
      is_active: true,
      country: "ghana",
      preferred_locale: "en",
      preferred_currency: "GHS",
      created_at: "2024-01-01T00:00:00.000Z",
      is_mock: true,
    },
  },
  agent: {
    role: "agent",
    title: "Verification Agent",
    phone: "0540000004",
    code: "123456",
    name: "Ama Serwaa",
    badge: "Field Agent • Accra",
    description: "Onboard local workers, verify offline identities, and run physical checks.",
    dashboardUrl: "/agent/dashboard",
    avatarInitials: "AS",
    user: {
      id: "mock-agent-001",
      phone: "0540000004",
      phone_verified: true,
      role: "agent",
      full_name: "Ama Serwaa",
      assigned_district: "Accra Metropolitan",
      verified_count: 142,
      is_active: true,
      country: "ghana",
      preferred_locale: "en",
      preferred_currency: "GHS",
      created_at: "2024-03-01T10:00:00.000Z",
      is_mock: true,
    },
  },
};

/** Normalize phone number by removing spaces, dashes, +233 prefix, etc. */
export function normalizePhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.startsWith("233") && cleaned.length > 9) {
    return "0" + cleaned.slice(3);
  }
  return cleaned;
}

/** Check if phone is one of the recognized mock test phones */
export function isMockPhone(phone: string): boolean {
  const norm = normalizePhone(phone);
  return (
    norm === "0540000001" ||
    norm === "0540000002" ||
    norm === "0540000003" ||
    norm === "0540000004" ||
    norm === "0541111111" ||
    norm === "0542222222" ||
    norm === "0543333333" ||
    norm === "0544444444" ||
    norm.startsWith("054000") ||
    norm.startsWith("0000")
  );
}

/** Check if OTP is a universal mock OTP code */
export function isMockOTP(otp: string): boolean {
  const cleaned = otp.trim();
  return MOCK_UNIVERSAL_CODES.includes(cleaned) || cleaned === "999999" || cleaned === "9999";
}

/** Check if access token is a mock token */
export function isMockToken(token: string | null | undefined): boolean {
  if (!token) return false;
  return token.startsWith("mock-") || token.startsWith("preview-") || token.includes("mock-jwt");
}

/** Get dashboard URL for role */
export function getDashboardForRole(role: UserRole | string | undefined): string {
  const dashboards: Record<string, string> = {
    worker: "/worker/dashboard",
    employer: "/employer/dashboard",
    admin: "/admin/dashboard",
    agent: "/agent/dashboard",
  };
  return dashboards[role || "worker"] || "/worker/dashboard";
}

/** Identify role from phone number */
export function detectRoleFromPhone(phone: string): UserRole {
  const norm = normalizePhone(phone);
  if (norm.endsWith("2") || norm === "0542222222") return "employer";
  if (norm.endsWith("3") || norm === "0543333333") return "admin";
  if (norm.endsWith("4") || norm === "0544444444") return "agent";
  return "worker";
}

/** Retrieve mock user and token for a given phone */
export function getMockUserByPhone(phone: string): { user: User; accessToken: string } {
  const role = detectRoleFromPhone(phone);
  const account = MOCK_ACCOUNTS[role];
  const norm = normalizePhone(phone);

  const user: User = {
    ...account.user,
    phone: norm || account.phone,
    id: `mock-${role}-${norm || "custom"}`,
    is_mock: true,
  };

  const accessToken = `mock-jwt-${role}-token-${Date.now()}`;
  return { user, accessToken };
}

/** Retrieve mock user and token for a role */
export function getMockUserByRole(role: UserRole): { user: User; accessToken: string } {
  const account = MOCK_ACCOUNTS[role] || MOCK_ACCOUNTS.worker;
  const accessToken = `mock-jwt-${account.role}-token-${Date.now()}`;
  return {
    user: { ...account.user, is_mock: true },
    accessToken,
  };
}

/** List all available mock accounts for UI selectors */
export function getAllMockAccounts(): MockAccountConfig[] {
  return [
    MOCK_ACCOUNTS.worker,
    MOCK_ACCOUNTS.employer,
    MOCK_ACCOUNTS.admin,
    MOCK_ACCOUNTS.agent,
  ];
}
