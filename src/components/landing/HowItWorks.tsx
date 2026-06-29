// src/components/landing/HowItWorks.tsx
"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Target, Video, Clipboard, Settings } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Identity Verification",
    description: ["Government-issued ID verification", "Personal information validation", "Profile authenticity checks"],
    icon: ShieldCheck,
  },
  {
    id: 2,
    title: "Skill Assessment",
    description: ["Practical skill tests", "Role-specific assessments", "Knowledge validation"],
    icon: Target,
  },
  {
    id: 3,
    title: "Interview Verification",
    description: ["Live interview with the Skiloq team", "Communication skills", "Professionalism assessment"],
    icon: Video,
  },
  {
    id: 4,
    title: "Work History Verification",
    description: ["Previous employment verification", "Portfolio review", "Professional references"],
    icon: Clipboard,
  },
  {
    id: 5,
    title: "Trust Score Generation",
    description: ["Verification results", "Assessment performance", "Interview outcomes", "Project completion history", "Platform activity"],
    icon: Settings,
  },
];

export function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#1A1F36] via-[#2A3156] to-[#1A1F36] py-16 md:py-28">
      {/* Background blur effects */}
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#4F6AF5]/20 rounded-full blur-3xl" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#4F6AF5]/10 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-3 md:mb-4">
            Trust and Verification Process
          </h2>
          <p className="text-white/70 text-sm sm:text-base max-w-3xl mx-auto">
            Before any professional matches with an opportunity, they pass through our 5-layer verification framework
          </p>
        </motion.div>

        {/* Steps */}
        <div className="space-y-4 md:space-y-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative"
              >
                {/* Timeline line - hidden except between items */}
                {idx < steps.length - 1 && (
                  <div className="absolute left-6 top-20 bottom-0 w-0.5 bg-white/20 md:left-9 md:top-28" />
                )}

                <div className="flex items-start gap-4 md:gap-6">
                  {/* Timeline dot with icon */}
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-[#4F6AF5] to-[#6F8AFF] flex items-center justify-center shadow-lg shadow-[#4F6AF5]/30 border-4 border-[#1A1F36]">
                      <Icon size={20} className="text-white md:w-7 md:h-7" />
                    </div>
                  </div>

                  {/* Card content */}
                  <div className="flex-1 bg-gradient-to-br from-[#4F6AF5]/20 to-[#1A1F36] rounded-2xl md:rounded-3xl p-4 md:p-8 lg:p-10 border border-[#4F6AF5]/30 shadow-xl">
                    <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8 lg:gap-10 flex-1">
                      <div className="flex items-center gap-4 md:gap-8">
                        <span className="text-2xl md:text-4xl font-bold text-[#4F6AF5]/70">0{step.id}</span>
                        <h3 className="text-lg md:text-2xl lg:text-3xl font-bold text-white flex-shrink-0">{step.title}</h3>
                      </div>
                      <ul className="flex-1 space-y-2 md:space-y-2">
                        {step.description.map((item, i) => (
                          <li key={i} className="flex items-end gap-3 md:gap-4 text-white/80 text-xs sm:text-sm md:text-base lg:text-lg lg:ml-10">
                            <span className="w-2 h-2 md:w-2 md:h-2 rounded-full bg-[#4F6AF5] flex-shrink-0" />
                            <span className="md:justify-end">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
