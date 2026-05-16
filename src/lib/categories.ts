// src/lib/categories.ts
import type { CategoryOption } from "@/types/onboarding";

export type WorkerCategory = "digital" | "trade" | "educator" | "online_income";

export const workerCategories: CategoryOption[] = [
  {
    id: "digital",
    icon: "💻",
    label: "Digital & Remote",
    description: "Developers, designers, VAs, analysts, copywriters — get verified and land remote jobs.",
  },
  {
    id: "trade",
    icon: "🔧",
    label: "Trade & Skilled",
    description: "Tailors, electricians, plumbers, hairdressers, mechanics — get booked through your calendar.",
  },
  {
    id: "educator",
    icon: "📚",
    label: "Educators & Tutors",
    description: "Academic, language, music, coding, vocational — sell session bundles. (Phase 2)",
  },
  {
    id: "online_income",
    icon: "📊",
    label: "Online Income",
    description: "Verified data entry, transcription, micro-tasks — curated listings only. (Phase 2)",
  },
];

export const ghanaDistricts = [
  "Accra Metropolitan",
  "Adenta Municipal",
  "Ashaiman Municipal",
  "Ga East Municipal",
  "Ga West Municipal",
  "Kumasi Metropolitan",
  "Tamale Metropolitan",
  "Tema Metropolitan",
  "Koforidua Municipal",
  "Cape Coast Metropolitan",
  "Sekondi-Takoradi Metropolitan",
  "Ho Municipal",
  "Sunyani Municipal",
  "Bolgatanga Municipal",
  "Wa Municipal",
];

export const ghanaianLanguages = [
  "English",
  "Twi",
  "Ga",
  "Ewe",
  "Hausa",
  "Dagbani",
  "Fante",
  "Nzema",
  "Dagaare",
  "Gonja",
  "Kasem",
  "French",
];

export const locationPhrases: Record<WorkerCategory, string> = {
  digital: "Where are you based?",
  trade: "What areas do you serve?",
  educator: "Where do you teach?",
  online_income: "Where are you based?",
};
