// src/components/landing/HowItWorks.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  BadgeCheck,
  Wallet,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    id: 0,
    step: "01",
    icon: ShieldCheck,
    title: "Verify your identity",
    desc: "Upload your Ghana Card or Passport. Skiloq verifies you securely so businesses hire with confidence.",
    image: "/assets/images/passport.jpg",
    accent: "#4F6AF5",
  },
  {
    id: 1,
    step: "02",
    icon: BadgeCheck,
    title: "Prove your skills",
    desc: "Take skill assessments or showcase real work. Build a trusted reputation through proof, not claims.",
    image: "/assets/images/skill.png",
    accent: "#22C55E",
  },
  {
    id: 2,
    step: "03",
    icon: Wallet,
    title: "Get hired & paid",
    desc: "Secure escrow payments with fast mobile money payouts. No international banking barriers.",
    image: "/assets/images/hire.png",
    accent: "#F59E0B",
  },
];

export function HowItWorks() {
  const [active, setActive] = useState(0);

  const current = steps[active];
  const Icon = current.icon;

  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-primary py-20 md:py-28 text-white"
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Ambient glow */}
      <div className="absolute left-0 top-0 w-[380px] h-[380px] bg-accent/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute right-0 bottom-0 w-[300px] h-[300px] bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-4 py-2 mb-5">
            <Sparkles size={14} className="text-accent" />
            <span className="text-[11px] uppercase tracking-[0.15em] text-white/70 font-semibold">
              How It Works
            </span>
          </span>

          <h2 className="text-[34px] md:text-[52px] font-bold tracking-tight mb-4">
            Start earning in{" "}
            <span className="text-accent">3 simple steps</span>
          </h2>

          <p className="text-white/60 text-[15px] md:text-[16px] max-w-2xl mx-auto leading-7">
            No traditional CV process. Just verification, proof of skill and secure payments.
          </p>
        </motion.div>

        {/* ── DESKTOP: Timeline + Showcase ── */}
        <div className="hidden lg:grid lg:grid-cols-[360px_1fr] gap-12 items-center">
          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-8 bottom-8 w-px bg-white/10" />

            {/* Active progress */}
            <motion.div
              animate={{ height: `${((active + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.4 }}
              className="absolute left-6 top-8 w-px bg-accent"
            />

            <div className="space-y-4">
              {steps.map((step, i) => {
                const StepIcon = step.icon;
                const isActive = active === i;

                return (
                  <motion.button
                    key={step.step}
                    onClick={() => setActive(i)}
                    whileHover={{ x: 6 }}
                    className={`relative w-full text-left rounded-xl border transition-all duration-300 p-4 flex items-start gap-4 backdrop-blur-md ${
                      isActive
                        ? "bg-white/10 border-white/15 shadow-lg"
                        : "bg-white/[0.03] border-white/5 hover:bg-white/[0.05]"
                    }`}
                  >
                    <div
                      className={`relative z-10 w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                        isActive ? "bg-accent text-white" : "bg-white/5 text-white/60"
                      }`}
                    >
                      <StepIcon size={20} />
                    </div>

                    <div>
                      <div className="text-[11px] uppercase tracking-[0.15em] text-white/40 font-semibold mb-1">
                        Step {step.step}
                      </div>
                      <h3 className={`font-semibold text-base ${isActive ? "text-white" : "text-white/70"}`}>
                        {step.title}
                      </h3>
                      <p className="text-[13px] text-white/45 mt-1 line-clamp-2">{step.desc}</p>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Showcase */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -25 }}
              transition={{ duration: 0.45 }}
              className="relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl"
            >
              <div className="grid md:grid-cols-2">
                {/* Image */}
                <div className="relative min-h-[380px] overflow-hidden">
                  <img
                    src={current.image}
                    alt={current.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent" />
                  <div className="absolute bottom-5 left-5 text-7xl font-black text-white/20">
                    {current.step}
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 md:p-10 flex flex-col justify-center">
                  <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
                    <Icon size={24} style={{ color: current.accent }} />
                  </div>

                  <div className="text-[11px] uppercase tracking-[0.15em] text-white/40 font-semibold mb-3">
                    Step {current.step}
                  </div>

                  <h3 className="text-[28px] font-bold mb-4 leading-tight">{current.title}</h3>

                  <p className="text-white/60 leading-8 text-[15px] mb-7">{current.desc}</p>

                  <button className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-[14px] font-semibold hover:bg-accent-600 transition-colors w-fit active:scale-95">
                    Continue
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── MOBILE: Timeline + Showcase (same design as desktop) ── */}
        <div className="lg:hidden space-y-8">
          {/* Steps selector */}
          <div className="flex gap-2 justify-center">
            {steps.map((step, i) => (
              <button
                key={step.step}
                onClick={() => setActive(i)}
                className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                  active === i
                    ? "bg-accent border-accent text-white"
                    : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"
                }`}
              >
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  active === i ? "bg-white text-accent" : "bg-white/10 text-white/60"
                }`}>
                  {step.step}
                </div>
                {step.title}
              </button>
            ))}
          </div>

          {/* Active card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
              className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={current.image}
                  alt={current.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent" />
                <div className="absolute bottom-4 left-4 text-6xl font-black text-white/20">
                  {current.step}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Icon size={20} style={{ color: current.accent }} />
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.15em] text-white/40">
                      Step {current.step}
                    </div>
                    <h3 className="font-semibold text-lg text-white">{current.title}</h3>
                  </div>
                </div>

                <p className="text-white/60 text-sm leading-7 mb-5">{current.desc}</p>

                <button className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold hover:bg-accent-600 transition-colors w-full justify-center active:scale-95">
                  Continue
                  <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="flex justify-center gap-2">
            {steps.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`h-2 rounded-full transition-all ${
                  active === i ? "w-8 bg-accent" : "w-2 bg-white/20"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}