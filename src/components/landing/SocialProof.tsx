// src/components/landing/SocialProof.tsx
"use client";

import { motion } from "framer-motion";
import {
  Building2,
  Users,
  Globe2,
  ShieldCheck,
  Star,
} from "lucide-react";

const logos = [
  "FinTech Ghana",
  "TechHub Accra",
  "Kumasi Homes",
  "Green Energy",
  "PayHub",
  "Digital Marketing Pro",
  "Naija Ventures",
  "Safari Tech",
  "EcoBuild",
];

const stats = [
  { icon: Users, value: "2k+", label: "Skilled Workers" },
  { icon: Building2, value: "500+", label: "Businesses" },
  { icon: Globe2, value: "4+", label: "Countries" },
];

export function SocialProof() {
  const marquee = [...logos, ...logos];

  return (
    <section className="relative overflow-hidden bg-white py-16 md:py-20 border-y border-slate-100">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #1A1F36 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Ambient glow */}
      <div className="absolute left-0 top-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute right-0 bottom-10 w-80 h-80 bg-primary/3 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 mb-5">
            <ShieldCheck size={14} className="text-success" />
            <span className="text-[11px] uppercase tracking-[0.15em] text-slate-600 font-semibold">
              Trusted Across Africa
            </span>
          </span>

          <h2 className="text-[28px] md:text-[38px] font-black text-primary tracking-tight mb-3">
            Businesses hiring with confidence
          </h2>

          <p className="text-[14px] md:text-[16px] text-slate-500 max-w-2xl mx-auto leading-7">
            From startups to growing companies, Skiloq connects trusted
            businesses with skilled African talent.
          </p>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12"
        >
          {stats.map((stat, i) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={stat.label}
                whileHover={{ y: -3 }}
                className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all p-5 flex items-center gap-4"
              >
                <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Icon size={18} className="text-accent" />
                </div>
                <div>
                  <h3 className="text-[22px] font-bold text-primary">{stat.value}</h3>
                  <p className="text-[13px] text-slate-500">{stat.label}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Marquee */}
        <div className="relative overflow-hidden">
          {/* Gradient masks */}
          <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 28, ease: "linear" }}
            className="flex gap-4 whitespace-nowrap"
          >
            {marquee.map((name, i) => (
              <div
                key={i}
                className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white px-5 py-3 shadow-sm hover:shadow-md transition-all shrink-0"
              >
                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                  <Star size={14} className="text-accent" />
                </div>
                <span className="text-[14px] font-semibold text-primary">{name}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}