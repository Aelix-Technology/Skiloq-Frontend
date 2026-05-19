"use client";

import { motion } from "framer-motion";
import {
  Globe,
  Smartphone,
  Zap,
  MapPin,
  Shield,
  Check,
} from "lucide-react";

const features = [
  {
    icon: Smartphone,
    title: "Works on any phone",
    desc: "Optimized for low-end Android devices and unstable networks.",
  },
  {
    icon: Zap,
    title: "MoMo-first payments",
    desc: "MTN MoMo, Vodafone Cash, AirtelTigo — no bank needed.",
  },
  {
    icon: MapPin,
    title: "Real-world verification",
    desc: "Workers verified physically to ensure trust and authenticity.",
  },
  {
    icon: Globe,
    title: "Built in multiple languages",
    desc: "English, Twi, Hausa, French — your language included.",
  },
  {
    icon: Shield,
    title: "Escrow protection",
    desc: "Funds are only released when work is completed properly.",
  },
];

const stats = [
  { value: "10K+", label: "Verified Workers" },
  { value: "500+", label: "Businesses" },
  { value: "GHS 2M+", label: "Paid Out" },
  { value: "98%", label: "Satisfaction" },
];

export function BuiltForAfrica() {
  return (
    <section className="relative overflow-hidden bg-[#1A1F36] py-20 md:py-28 text-white">

      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src="/assets/images/bg2.png"
          className="absolute inset-0 w-full h-full object-cover opacity-10 blur-3xl"
        />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#4F6AF5]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#4F6AF5]/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">

        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* LEFT CONTENT */}
          <div>
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-5">
              <Globe size={14} className="text-[#4F6AF5]" />
              <span className="text-[11px] uppercase tracking-[0.15em] text-white/70">
                Built for Africa
              </span>
            </div>

            <h2 className="text-[34px] md:text-[52px] font-bold leading-tight mb-5">
              Designed for how Africa
              <span className="text-[#4F6AF5]"> actually works</span>
            </h2>

            <p className="text-white/60 text-[15px] leading-7 mb-10 max-w-xl">
              Most global platforms assume fast internet, foreign banks and
              perfect infrastructure. Skiloq is built for reality — African reality.
            </p>

            {/* FEATURES */}
            <div className="space-y-5">
              {features.map((f, i) => {
                const Icon = f.icon;

                return (
                  <motion.div
                    key={f.title}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex gap-4 items-start"
                  >
                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
                      <Icon size={18} className="text-[#4F6AF5]" />
                    </div>

                    <div>
                      <h4 className="text-[14px] font-semibold">
                        {f.title}
                      </h4>
                      <p className="text-[13px] text-white/50 leading-6">
                        {f.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* TRUST BADGES */}
            <div className="flex items-center gap-4 mt-10 text-white/60 text-[12px]">
              <div className="flex items-center gap-2">
                <Check size={14} className="text-[#22C55E]" />
                Verified Talent
              </div>
              <div className="flex items-center gap-2">
                <Check size={14} className="text-[#22C55E]" />
                Secure Payments
              </div>
            </div>
          </div>

          {/* RIGHT VISUAL STACK */}
          <div className="relative">

            {/* Main Image Stack */}
            <div className="relative h-[520px]">

              {/* Background image */}
              <motion.img
                src="/assets/images/africa-one.png"
                className="absolute inset-0 w-full h-full object-cover rounded-2xl"
                initial={{ scale: 1.05 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 1 }}
              />

              {/* Overlay image */}
              <motion.img
                src="/assets/images/africa-two.png"
                className="absolute inset-0 w-full h-full object-cover rounded-2xl opacity-60"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.6 }}
                transition={{ duration: 1 }}
              />

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1F36]/70 via-transparent to-[#1A1F36]/30 rounded-2xl" />

              {/* Floating stats cards */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="absolute top-6 left-6 bg-white/10 backdrop-blur-md border border-white/10 px-4 py-3 rounded-xl"
              >
                <p className="text-[20px] font-bold">10K+</p>
                <p className="text-[11px] text-white/60">Workers</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="absolute bottom-6 right-6 bg-[#4F6AF5]/20 backdrop-blur-md border border-white/10 px-4 py-3 rounded-xl"
              >
                <p className="text-[20px] font-bold">500+</p>
                <p className="text-[11px] text-white/60">Businesses</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="absolute top-6 right-6 bg-white/10 backdrop-blur-md border border-white/10 px-4 py-3 rounded-xl"
              >
                <p className="text-[20px] font-bold">98%</p>
                <p className="text-[11px] text-white/60">Success</p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}