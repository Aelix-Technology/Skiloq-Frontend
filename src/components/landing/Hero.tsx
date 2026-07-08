"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export function Hero() {
  const router = useRouter();

  return (
    <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/assets/images/landing/Frame 215.png"
          alt="African marketplace"
          fill
          className="object-cover"
          priority
          unoptimized
        />
        {/* Subtle overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1F36]/65 via-[#1A1F36]/45 to-[#1A1F36]/75" />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-3xl space-y-8"
        >
          {/* Heading */}
          <h1 className="heading-1 text-white">
            Hire verified African talent<br className="hidden sm:block" />based on proven skills, not just CVs.
          </h1>

          {/* Subheading */}
          <p className="body-text text-white/85 max-w-2xl">
            Connect with skilled professionals, verified through identity checks and skill assessments, with secure escrow payments built in.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-stretch sm:items-center">
            <button
              onClick={() => router.push("/employer/find-talent")}
              className="px-7 py-4 bg-[#4F6AF5] hover:bg-[#3d56e0] text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2 shadow-xl shadow-[#4F6AF5]/30 text-base sm:text-lg"
            >
              Hire a Talent
              <ArrowRight size={20} />
            </button>
            <button
              onClick={() => router.push("/register")}
              className="px-7 py-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2 border border-white/25 text-base"
            >
              Find a Job
              <ArrowRight size={20} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
