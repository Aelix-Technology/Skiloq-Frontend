// src/components/landing/TalentCategories.tsx
"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Wrench,
  GraduationCap,
  Sparkles,
  Scissors,
  Zap,
  BookOpen,
  FileCheck2,
  Laptop,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  MapPin,
  Calendar,
  DollarSign,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface TalentCategoriesProps {
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string) => void;
}

const workerCategories = [
  {
    id: "digital",
    title: "Digital & Remote",
    subtitle: "Developers, Designers, Analysts & VAs",
    mode: "Jobs portal • Milestone escrow • Direct contracts",
    icon: Laptop,
    badge: "Phase 1 Core",
    popularSkills: ["React Developer", "UI/UX Figma", "TypeScript", "Python", "Copywriting", "Virtual Assistant"],
    stats: "1,200+ Verified Developers & Designers",
  },
  {
    id: "trade",
    title: "Trade & Skilled Artisans",
    subtitle: "Electricians, Tailors, Plumbers, Mechanics",
    mode: "Direct Booking • Local Map & GPS • Physical Agent Vetted",
    icon: Wrench,
    badge: "Field Agent Verified",
    popularSkills: ["Certified Electrician", "Bespoke Tailoring", "Plumbing", "Solar Installation", "Auto Mechanic"],
    stats: "850+ Vetted Artisans with In-Person SOS Guard",
  },
  {
    id: "educator",
    title: "Educators & Tutors",
    subtitle: "Academic, STEM, Coding & Language Instructors",
    mode: "Session Booking • Multi-Lesson Bundles • Curriculum Aligned",
    icon: GraduationCap,
    badge: "Phase 2 Track",
    popularSkills: ["Mathematics Tutor", "Science & Physics", "English & French", "Python for Kids", "Vocational Prep"],
    stats: "400+ Certified Tutors across Accra & Lagos",
  },
  {
    id: "online_income",
    title: "Online Income & Micro-Tasks",
    subtitle: "Data Entry, Transcription & Content Quality",
    mode: "Curated Listings • Fast USD/GHS Payouts • Pre-Screened",
    icon: FileCheck2,
    badge: "Curated Listings",
    popularSkills: ["Audio Transcription", "OCR Data Entry", "Survey Quality", "Annotation", "Spreadsheet Cleanup"],
    stats: "5,000+ Tasks Completed with Instant Escrow Release",
  },
];

export function TalentCategories({ selectedCategory, onSelectCategory }: TalentCategoriesProps) {
  const router = useRouter();

  return (
    <section className="py-20 md:py-28 bg-[#F8FAFC] relative overflow-hidden">
      {/* Background glow subtle */}
      <div className="pointer-events-none absolute -left-20 top-20 w-72 h-72 rounded-full bg-[#4F6AF5]/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-20 w-72 h-72 rounded-full bg-[#22C55E]/5 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 bg-[#4F6AF5]/10 text-[#4F6AF5] px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            Four Dedicated Worker Infrastructure Tracks
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1A1F36] tracking-tight">
            Proof-of-Work Across Every Discipline
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto mt-3 leading-relaxed">
            Every professional on Skiloq passes structured assessments and demonstrated proof-of-work. Choose your track to hire with verified confidence.
          </p>
        </motion.div>

        {/* 4 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {workerCategories.map((cat, idx) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;

            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onClick={() => {
                  onSelectCategory(cat.id);
                  router.push(`/employer/find-talent?category=${cat.id}`);
                }}
                className={`bg-white rounded-3xl p-6 sm:p-8 border-2 transition-all cursor-pointer relative overflow-hidden group shadow-sm hover:shadow-xl hover:-translate-y-1 ${
                  isSelected ? "border-[#4F6AF5] ring-4 ring-[#4F6AF5]/10" : "border-gray-200/80 hover:border-[#4F6AF5]/50"
                }`}
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1A1F36] to-[#2B3560] text-white flex items-center justify-center shadow-md shadow-[#1A1F36]/20 group-hover:scale-105 transition-transform">
                    <Icon className="w-7 h-7 text-[#6F8AFF]" />
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#4F6AF5]/10 text-[#4F6AF5] border border-[#4F6AF5]/20">
                    {cat.badge}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-[#1A1F36] mb-1">
                  {cat.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 font-medium mb-3">
                  {cat.subtitle}
                </p>

                <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100 mb-4 text-xs font-semibold text-[#1A1F36] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
                  <span>Platform Mode: {cat.mode}</span>
                </div>

                {/* Popular Skill chips */}
                <div className="space-y-2 mb-4">
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Top Verified Skills</p>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.popularSkills.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs px-2.5 py-1 rounded-xl bg-white border border-gray-200 text-gray-700 font-medium group-hover:border-[#4F6AF5]/30"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100 text-xs text-gray-500">
                  <span className="font-semibold text-emerald-700">{cat.stats}</span>
                  <div className="flex items-center gap-1 font-bold text-[#4F6AF5] group-hover:translate-x-1 transition-transform">
                    <span>Explore Talent</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Callout box */}
        <div className="bg-gradient-to-r from-[#1A1F36] to-[#2B3560] rounded-3xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h4 className="text-xl font-bold tracking-tight text-white">Need a multi-worker crew or bespoke contract?</h4>
            <p className="text-xs sm:text-sm text-white/70 mt-1 max-w-xl">
              From enterprise tech teams to vetted event artisans, Skiloq assembles guaranteed, escrow-backed teams across Sub-Saharan Africa.
            </p>
          </div>
          <button
            onClick={() => router.push("/employer/post-job")}
            className="px-6 py-3.5 bg-[#4F6AF5] hover:bg-[#3d56e0] text-white text-xs sm:text-sm font-bold rounded-2xl shadow-lg shadow-[#4F6AF5]/30 transition-all active:scale-95 shrink-0"
          >
            Post a Requirement Now
          </button>
        </div>
      </div>
    </section>
  );
}