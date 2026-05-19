// src/components/landing/TalentCategories.tsx
"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Laptop,
  Wrench,
  GraduationCap,
  Coins,
} from "lucide-react";

const categories = [
  {
    title: "Digital & Remote",
    desc: "Developers, designers, virtual assistants and remote professionals working with global clients.",
    image: "/assets/images/laptop.png",
    href: "/register?category=digital",
    phase: false,
    icon: Laptop,
    gradient: "from-blue-500/40 to-blue-900/60",
  },
  {
    title: "Trade & Skilled",
    desc: "Tailors, artisans, mechanics and skilled workers getting booked through trusted opportunities.",
    image: "/assets/images/Tailor.png",
    href: "/register?category=trade",
    phase: false,
    icon: Wrench,
    gradient: "from-amber-500/40 to-amber-900/60",
  },
  {
    title: "Educators & Tutors",
    desc: "Academic, language, coding and specialist tutors offering structured learning sessions.",
    image: "/assets/images/tutor.png",
    href: "#",
    phase: true,
    icon: GraduationCap,
    gradient: "from-purple-500/40 to-purple-900/60",
  },
  {
    title: "Online Income",
    desc: "Micro-jobs, verified tasks and flexible online earning opportunities across Africa.",
    image: "/assets/images/skill.png",
    href: "#",
    phase: true,
    icon: Coins,
    gradient: "from-emerald-500/40 to-emerald-900/60",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export function TalentCategories() {
  const router = useRouter();

  return (
    <section id="categories" className="py-20 md:py-28 bg-white relative overflow-hidden">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #1A1F36 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14 md:mb-20"
        >
          <span className="inline-flex items-center gap-2 bg-accent/5 text-accent text-xs font-bold px-4 py-2 rounded-full border border-accent/10 mb-5 uppercase tracking-[0.15em]">
            <Sparkles size={14} />
            Explore Opportunities
          </span>

          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
            Four ways to work on Skiloq
          </h2>

          <p className="text-gray-500 max-w-2xl mx-auto text-base leading-relaxed">
            Whether you&apos;re a remote professional, skilled worker, or growing your
            income online — there&apos;s a place for you here.
          </p>
        </motion.div>

        {/* ── DESKTOP: 4-column grid ── */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
        >
          {categories.map((cat) => {
            const Icon = cat.icon;

            return (
              <motion.div
                key={cat.title}
                variants={cardVariant}
                whileHover={!cat.phase ? { y: -6 } : {}}
                onClick={() => !cat.phase && router.push(cat.href)}
                className={`relative overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group ${
                  cat.phase ? "opacity-70 cursor-default" : "cursor-pointer"
                }`}
              >
                {/* Image */}
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${cat.gradient}`} />

                  {/* Icon */}
                  <div className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm">
                    <Icon size={18} className="text-primary" />
                  </div>

                  {/* Phase badge */}
                  {cat.phase && (
                    <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-amber-600 text-[10px] font-bold px-2.5 py-1 rounded-full border border-amber-200 shadow-sm flex items-center gap-1">
                      <Sparkles size={12} />
                      Phase 2
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{cat.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{cat.desc}</p>
                  {!cat.phase && (
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent mt-3 group-hover:gap-2 transition-all">
                      Explore
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  )}
                </div>

                {/* Hover glow */}
                {!cat.phase && (
                  <div className="absolute inset-0 bg-accent/[0.02] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── MOBILE: 2-column grid ── */}
        <div className="sm:hidden grid grid-cols-2 gap-3">
          {categories.map((cat) => {
            const Icon = cat.icon;

            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={!cat.phase ? { y: -4 } : {}}
                onClick={() => !cat.phase && router.push(cat.href)}
                className={`relative overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 ${
                  cat.phase ? "opacity-70 cursor-default" : "cursor-pointer"
                }`}
              >
                <div className="aspect-[3/4] overflow-hidden relative">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${cat.gradient}`} />

                  <div className="absolute top-3 left-3 w-8 h-8 rounded-lg bg-white/90 backdrop-blur-sm flex items-center justify-center">
                    <Icon size={14} className="text-primary" />
                  </div>

                  {cat.phase && (
                    <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-amber-600 text-[9px] font-bold px-2 py-0.5 rounded-full border border-amber-200 flex items-center gap-0.5">
                      <Sparkles size={10} />
                      Phase 2
                    </span>
                  )}
                </div>

                <div className="p-3">
                  <h3 className="text-sm font-bold text-gray-900 mb-1">{cat.title}</h3>
                  <p className="text-[11px] text-gray-500 leading-relaxed line-clamp-2">{cat.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}