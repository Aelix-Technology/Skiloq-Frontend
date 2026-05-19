// src/components/landing/FinalCTA.tsx
"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const stats = [
  { value: "10K+", label: "Verified Workers" },
  { value: "GHS 2M+", label: "Paid to Workers" },
  { value: "98%", label: "Client Satisfaction" },
];

export function FinalCTA() {
  const router = useRouter();

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-700 to-primary-900" />

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      {/* Animated orbs */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-20 -right-20 w-80 h-80 bg-accent/20 rounded-full blur-[100px] pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1.1, 0.95, 1.1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-20 -left-20 w-72 h-72 bg-accent/10 rounded-full blur-[80px] pointer-events-none"
      />

      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-xl text-white text-xs font-medium px-4 py-2 rounded-full border border-white/10 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
            Join the movement
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-2xl sm:text-3xl md:text-5xl font-black text-white mb-4 tracking-tight"
        >
          Ready to prove what you can do?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-sm md:text-base text-white/50 max-w-lg mx-auto mb-10 leading-relaxed"
        >
          Join thousands of verified African workers earning on their own terms. No CV required — just proof of work.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row justify-center gap-3 mb-14"
        >
          <button
            onClick={() => router.push("/register")}
            className="group inline-flex items-center justify-center gap-2 bg-white text-primary font-bold px-8 py-4 rounded-xl hover:bg-gray-100 transition-all shadow-2xl shadow-black/20 active:scale-95 text-sm md:text-base"
          >
            Sign Up as a Worker
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => router.push("/register?role=employer")}
            className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-xl text-white font-bold px-8 py-4 rounded-xl border border-white/20 hover:bg-white/20 transition-all active:scale-95 text-sm md:text-base"
          >
            Hire Talent
          </button>
        </motion.div>

        {/* Trust stats */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-6 md:gap-10"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-xl md:text-2xl font-black text-white">{stat.value}</p>
              <p className="text-[11px] text-white/40 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}