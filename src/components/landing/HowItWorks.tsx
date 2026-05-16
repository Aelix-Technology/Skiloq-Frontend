// src/components/landing/HowItWorks.tsx
"use client";

import { motion } from "framer-motion";
import { UserCheck, Award, Banknote } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: UserCheck,
    title: "Verify your identity",
    desc: "Upload your Ghana Card or Passport. We verify you're real. No fake profiles, no bots — just real people ready to work.",
    color: "bg-blue-50 text-blue-600 border-blue-100",
  },
  {
    step: "02",
    icon: Award,
    title: "Prove your skills",
    desc: "Take assessments or submit your portfolio. Your Trust Score builds on real results, not self-reported claims that can't be verified.",
    color: "bg-purple-50 text-purple-600 border-purple-100",
  },
  {
    step: "03",
    icon: Banknote,
    title: "Get hired, get paid",
    desc: "Employers find you. Payment held securely in escrow. MoMo payout within minutes. Fair for everyone — no international bank account needed.",
    color: "bg-emerald-50 text-emerald-600 border-emerald-100",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-gray-50/50">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
            How Skiloq works
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Three simple steps from sign-up to getting paid. No CVs. Just proof.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative group"
            >
              {/* Connector line (desktop) */}
              {i < 2 && (
                <div className="hidden md:block absolute top-12 left-[calc(100%-0.5px)] w-6 h-0.5 bg-gray-200">
                  <div className="absolute right-0 -top-0.5 w-2 h-2 rounded-full bg-gray-300" />
                </div>
              )}

              <div className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 h-full">
                <div className={`w-12 h-12 rounded-xl ${step.color} flex items-center justify-center mb-4`}>
                  <step.icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-gray-300 tracking-widest">{step.step}</span>
                <h3 className="text-lg font-semibold text-gray-900 mt-1 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
