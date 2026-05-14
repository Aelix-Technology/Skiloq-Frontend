"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function FinalCTA() {
  const router = useRouter();

  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-700 to-primary-900" />
      <div className="absolute inset-x-0 top-0 h-px bg-white/20" />

      <div className="relative mx-auto max-w-2xl px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-4 text-2xl font-bold text-white md:text-4xl">
            Ready to prove what you can do?
          </h2>
          <p className="mx-auto mb-8 max-w-md text-white/60">
            Join thousands of verified African workers earning on their own
            terms. No CV required - just proof of work.
          </p>

          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <button
              onClick={() => router.push("/register")}
              className="group inline-flex items-center justify-center gap-2 rounded-lg bg-white px-8 py-4 font-semibold text-primary shadow-xl transition-all hover:bg-gray-100"
            >
              Sign Up as a Worker
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => router.push("/register?role=employer")}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-md transition-all hover:bg-white/20"
            >
              Hire Talent
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
