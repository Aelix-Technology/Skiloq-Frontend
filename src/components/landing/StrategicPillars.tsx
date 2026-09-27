// src/components/landing/StrategicPillars.tsx
"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Wallet, Gauge, MapPin, CheckCircle, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const pillars = [
  {
    pillar: "Pillar 1",
    title: "Identity is Earned, Not Claimed",
    description: "Every worker profile is an earned record of demonstrated skill. Workers complete seven-layer verification: ID dual-upload with OCR, timed skill assessments, and field agent audits. No unverified worker ever appears in search results.",
    icon: ShieldCheck,
    tag: "Zero-Trust Architecture",
    color: "from-blue-600 to-indigo-700",
  },
  {
    pillar: "Pillar 2",
    title: "Built for African Payment Infrastructure",
    description: "MTN Mobile Money, Telecel Cash, AirtelTigo, and M-Pesa are treated as first-class rails with sub-2-minute MoMo disbursements. Stripe acts as an international USD gateway with automated escrow protection.",
    icon: Wallet,
    tag: "MoMo-First Escrow",
    color: "from-emerald-600 to-teal-700",
  },
  {
    pillar: "Pillar 3",
    title: "Trust Score Over Star Ratings",
    description: "Star ratings can easily be gamed by bots. Skiloq relies on an algorithmic 0–100 Trust Score composed of 6 hard data points: assessments (25%), completion rate (20%), on-time rate (15%), dispute rate (15%), repeat-hire rate (15%), and peer vouches (10%).",
    icon: Gauge,
    tag: "Tamper-Resistant",
    color: "from-amber-600 to-orange-700",
  },
  {
    pillar: "Pillar 4",
    title: "Local Knowledge as a Competitive Moat",
    description: "Global gig platforms cannot verify physical African artisans. We deploy a certified physical agent network with GPS-enforced evidence upload, Emergency SOS buttons for in-person home visits, and local curriculum support.",
    icon: MapPin,
    tag: "Physical Agent Network",
    color: "from-purple-600 to-indigo-800",
  },
];

export function StrategicPillars() {
  const router = useRouter();

  return (
    <section className="py-20 md:py-28 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#4F6AF5] bg-[#4F6AF5]/10 px-4 py-1.5 rounded-full">
            Strategic Foundation
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1A1F36] mt-3 tracking-tight">
            Four Non-Negotiable Pillars
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto mt-3">
            Why Skiloq is fundamentally different from Western freelance platforms: engineered from the ground up for Sub-Saharan African reality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {pillars.map((item, idx) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.pillar}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group relative overflow-hidden"
              >
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-gray-100 text-gray-700">
                    {item.tag}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#4F6AF5] uppercase tracking-wider mb-1">
                  <span>{item.pillar}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#1A1F36] mb-3">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
