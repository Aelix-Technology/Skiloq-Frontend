// src/components/landing/LanguageDiversity.tsx
"use client";

import { motion } from "framer-motion";
import { Globe } from "lucide-react";

const languages = [
  { name: "English", flag: "/assets/images/flag-english.png", speakers: "Official", accent: "#4F6AF5" },
  { name: "Twi", flag: "/assets/images/flag-ghana.png", speakers: "18M+ speakers", accent: "#22C55E" },
  { name: "Hausa", flag: "/assets/images/flag-nigeria.png", speakers: "70M+ speakers", accent: "#F59E0B" },
  { name: "Français", flag: "/assets/images/flag-france.png", speakers: "120M+ speakers", accent: "#A855F7" },
  { name: "Swahili", flag: "/assets/images/flag-kenya.png", speakers: "100M+ speakers", accent: "#EF4444" },
  { name: "Yorùbá", flag: "/assets/images/flag-nigeria.png", speakers: "45M+ speakers", accent: "#06B6D4" },
];

export function LanguageDiversity() {
  return (
    <section className="relative py-24 md:py-32 bg-[#1A1F36] text-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#4F6AF5]/10 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-[#4F6AF5]/10 blur-3xl rounded-full" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 md:px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-5">
            <Globe size={14} className="text-[#4F6AF5]" />
            <span className="text-[11px] uppercase tracking-[0.15em] text-white/60">Multi-language Platform</span>
          </div>
          <h2 className="text-[34px] md:text-[52px] font-bold leading-tight mb-4">
            Work in your <span className="text-[#4F6AF5]">language</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-[15px] leading-7">
            Skiloq is built for Africa linguistic diversity. No one is left behind — your language is supported from day one.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {languages.map((lang, i) => (
            <motion.div
              key={lang.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -6, scale: 1.03 }}
              className="relative bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-xl hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition" style={{ background: `radial-gradient(circle at top, ${lang.accent}20, transparent 70%)` }} />
              <div className="relative z-10 flex flex-col items-center">
                <div className="relative">
                  <img src={lang.flag} alt={lang.name} className="w-14 h-14 rounded-full object-cover border-2 border-white/20 shadow-lg group-hover:scale-110 transition-transform" />
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full ring-2 ring-[#1A1F36]" style={{ backgroundColor: lang.accent }} />
                </div>
                <p className="mt-3 text-[13px] font-semibold text-white group-hover:text-white">{lang.name}</p>
                <p className="text-[11px] text-white/40 mt-1">{lang.speakers}</p>
                <div className="mt-3 w-8 h-[2px] rounded-full opacity-60 group-hover:opacity-100 transition" style={{ backgroundColor: lang.accent }} />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="mt-14 text-white/40 text-[12px]">
          More languages coming soon as Skiloq expands across Africa 🌍
        </motion.p>
      </div>
    </section>
  );
}