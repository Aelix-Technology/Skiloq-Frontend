// src/components/landing/BuiltForAfrica.tsx
"use client";

import { motion } from "framer-motion";
import { Globe, MapPin, Shield, Smartphone, Zap } from "lucide-react";

const features = [
  {
    icon: Smartphone,
    title: "Works on any phone",
    desc: "Optimized for budget Android devices and 2G/3G networks. No high-speed internet needed.",
  },
  {
    icon: Zap,
    title: "MoMo-first payments",
    desc: "MTN MoMo, Vodafone Cash, AirtelTigo. No international bank account required.",
  },
  {
    icon: MapPin,
    title: "Physical verification",
    desc: "Field agents verify trade workers in person. GPS-enforced. Real workspaces, real tools.",
  },
  {
    icon: Globe,
    title: "Multi-language ready",
    desc: "English, Twi, Hausa, French. Your platform, your language.",
  },
  {
    icon: Shield,
    title: "Escrow protected",
    desc: "Payment held securely until work is done. Fair for both workers and employers.",
  },
];

const stats = [
  { value: "10K+", label: "Verified Workers" },
  { value: "500+", label: "Businesses Hiring" },
  { value: "GHS 2M+", label: "Paid to Workers" },
  { value: "98%", label: "Satisfaction Rate" },
];

export function BuiltForAfrica() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Features */}
          <div>
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
              Built for Africa,{" "}
              <span className="text-accent">by Africans</span>
            </h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              Unlike global platforms that assume fast internet, English fluency, and international banking - Skiloq is designed for how Africa works.
            </p>

            <div className="space-y-4">
              {features.map((feat, i) => (
                <motion.div
                  key={feat.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-4 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0 group-hover:bg-accent/10 transition-colors">
                    <feat.icon className="w-5 h-5 text-gray-400 group-hover:text-accent transition-colors" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">{feat.title}</h4>
                    <p className="text-sm text-gray-500 mt-0.5">{feat.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Stats Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Glass card */}
            <div className="relative bg-primary rounded-3xl p-8 md:p-10 text-white overflow-hidden shadow-2xl shadow-primary/20">
              {/* Background glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/10 rounded-full blur-3xl" />

              <div className="relative grid grid-cols-2 gap-6">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <p className="text-3xl md:text-4xl font-bold">{stat.value}</p>
                    <p className="text-sm text-white/60 mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Trust indicator */}
              <div className="relative mt-8 pt-6 border-t border-white/10 flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-accent-700 ring-2 ring-primary flex items-center justify-center text-xs font-bold"
                    >
                      ✓
                    </div>
                  ))}
                </div>
                <span className="text-sm text-white/60">New workers join every day</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
