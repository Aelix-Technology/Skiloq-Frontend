# Skiloq-Frontend

Skills-first hiring platform with verification, task-based matching, and global job access. Built for African workers — MoMo-first, 2G-ready, proof-of-work verified.

## Tech Stack

- **Framework:** Next.js 16 (App Router) + TypeScript
- **Styling:** Tailwind CSS + shadcn/ui + Radix + Lucide Icons
- **State:** Zustand (client), TanStack React Query (server)
- **Animation:** Framer Motion

## Project Structure
src/
├── app/ # Next.js App Router — routing only
│ ├── (auth)/ # Auth route group (no layout wrapper in URL)
│ │ ├── login/page.tsx
│ │ ├── register/page.tsx
│ │ └── onboarding/page.tsx
│ ├── worker/ # Worker portal
│ │ ├── layout.tsx # Protected route + WorkerLayout
│ │ ├── dashboard/page.tsx
│ │ ├── opportunities/
│ │ │ ├── page.tsx # Job listings
│ │ │ └── [id]/page.tsx # Job detail
│ │ ├── messages/
│ │ │ ├── page.tsx # Thread list
│ │ │ └── [threadId]/page.tsx
│ │ ├── wallet/page.tsx
│ │ └── profile/page.tsx
│ ├── layout.tsx # Root layout + providers
│ ├── providers.tsx # QueryClient, Toaster, Auth init
│ └── page.tsx # Landing page (Skiloq)
│
├── components/ # Reusable UI components
│ ├── ui/ # shadcn primitives (Button, Input, Badge, etc.)
│ ├── layout/ # WorkerLayout, BottomTabBar
│ ├── auth/ # PhoneInput, OTPInput, PINInput, ProtectedRoute
│ ├── onboarding/ # OnboardingWizard + 6 step components
│ ├── dashboard/ # VerificationChecklist, TrustScoreRing, EarningsSummary
│ ├── opportunities/ # JobCard, SmartFilterPanel, SortDropdown, ApplyModal
│ ├── wallet/ # BalanceDisplay, TransactionHistory, WithdrawFlow
│ ├── profile/ # ProfileHeader, SkillDisplay, PortfolioGrid, ReviewsList
│ ├── messages/ # MessageBubble, MessageInput, ThreadList
│ └── ErrorState.tsx # Generic error component
│
├── hooks/ # React Query hooks (one file per domain)
│ ├── useAuth.ts # Login, register, verifyOTP, setPIN, logout
│ ├── useWorker.ts # Dashboard, verification status
│ ├── useJobs.ts # Job listings, detail, apply
│ ├── useWallet.ts # Balance, transactions, withdraw
│ ├── useProfile.ts # Worker profile, update
│ ├── useMessages.ts # Threads, messages, send
│ └── useOnboarding.ts # Categories, skills, assessment
│
├── stores/ # Zustand stores (client state)
│ ├── auth.store.ts # User, tokens, login/logout
│ ├── ui.store.ts # Mobile nav, bottom tab, theme
│ └── onboarding.store.ts # Onboarding progress (persisted)
│
├── lib/ # Utilities
│ ├── api.ts # Central API client (auth headers, token refresh)
│ ├── toasts.ts # Centralized toast messages
│ ├── mock-delay.ts # Mock API delay utility (dev only)
│ ├── mock-dashboard.ts # Mock data (dev only)
│ ├── mock-jobs.ts # Mock data (dev only)
│ ├── mock-wallet.ts # Mock data (dev only)
│ ├── mock-messages.ts # Mock data (dev only)
│ ├── categories.ts # Category/district/language config
│ └── skill-tags.ts # Skill taxonomy (dev only)
│
├── types/ # TypeScript interfaces
│ ├── auth.ts
│ ├── worker.ts
│ ├── job.ts
│ ├── dashboard.ts
│ ├── wallet.ts
│ ├── onboarding.ts
│ └── messages.ts
│
├── middleware.ts # Next.js Edge middleware (auth redirects)
└── .env.local # Environment variables (not committed)

## Key Architecture Decisions

### 1. app/ is for routing only
Pages are thin wrappers. Business logic lives in `hooks/` and `stores/`. Reusable UI lives in `components/`.

### 2. One hook file per domain
`hooks/useAuth.ts`, `hooks/useJobs.ts`, `hooks/useWallet.ts` — each handles one business domain. No mixing.

### 3. Mock-to-API pattern
Every hook currently returns mock data. When the backend is ready, change `queryFn` from `mockDelay()` + mock data to `apiClient.get("/endpoint")`. Zero component changes needed.

### 4. Design tokens
Colors: `#1A1F36` (Primary), `#4F6AF5` (Accent), `#22C55E` (Success). Typography: Inter. Spacing: 4px base unit.

## Getting Started

```bash
npm install
npm run dev