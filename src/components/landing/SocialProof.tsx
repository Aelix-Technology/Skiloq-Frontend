// src/components/landing/SocialProof.tsx
"use client";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import Image from "next/image";

const logos = [
  {
    name: "Stripe",
    image: "/assets/images/landing/stripe 1.png",
  },
  {
    name: "MTN Momo",
    image: "/assets/images/landing/mtn-momo.png",
  },
  {
    name: "Vodafone Cash",
    image: "/assets/images/landing/Vodafonecash2 1.png",
  },
  {
    name: "AirtelTigo",
    image: "/assets/images/landing/AirtelTigo-Logo-White-background 1.png",
  },
];

const stats = [
  { value: "10K+", label: "Verified Workers" },
  { value: "15K+", label: "Jobs Completed" },
  { value: "500K+", label: "Secured Payment" },
  { value: "98%", label: "Successful Escrow Release" },
];

export function SocialProof() {
  const marquee = [...logos, ...logos];

  return (
    <section className="relative overflow-hidden bg-white py-16 md:py-20">
      <div className="relative max-w-7xl mx-auto px-4 md:px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="inline-flex items-center gap-2 text-slate-600 mb-5">
            <ShieldCheck size={14} className="text-slate-600" />
            <span className="text-[13px] uppercase tracking-[0.15em] text-slate-600 font-semibold">
              Trusted Across Africa
            </span>
          </span>

          <h2 className="text-[28px] md:text-[38px] font-black text-gray-900 tracking-tight mb-3">
            Businesses hiring with confidence
          </h2>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {stats.map((stat, i) => {
            return (
              <motion.div
                key={stat.label}
                whileHover={{ y: -3 }}
                className="bg-[#f0f4ff] rounded-xl shadow-sm hover:shadow-md transition-all p-6 text-center"
              >
                <h3 className="text-[36px] md:text-[42px] font-bold text-gray-900 mb-2">
                  {stat.value}
                </h3>
                <p className="text-[14px] text-gray-700 font-medium">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Logo Marquee */}
        <div className="relative overflow-hidden">
          {/* Gradient masks */}
          <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
            className="flex items-center gap-16 whitespace-nowrap"
          >
            {marquee.map((logo, i) => (
              <div key={i} className="inline-flex items-center shrink-0">
                <Image
                  src={logo.image}
                  alt={logo.name}
                  width={120}
                  height={48}
                  className="object-contain h-12 w-auto"
                  style={{ width: 'auto', height: '3rem' }}
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
