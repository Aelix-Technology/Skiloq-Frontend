"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export function Hero() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <section className="relative pt-28 pb-16 md:pt-32 md:pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/assets/images/landing/Frame 215.png"
          alt="African marketplace"
          fill
          className="object-cover"
          priority
          unoptimized
          quality={100}
        />
        {/* Subtle overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1F36]/60 via-[#1A1F36]/40 to-[#1A1F36]/70" />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-3xl space-y-6 md:space-y-8"
        >
          {/* Pre-Heading Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#4F6AF5]/15 backdrop-blur-sm border border-[#4F6AF5]/30">
            <span className="text-xs sm:text-sm font-medium text-white tracking-wide">The Marketplace Built on Trust, Not Guesswork</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight">
            Africa’s Trust-First<br className="hidden sm:block" />Talent Marketplace
          </h1>

          {/* Subheading */}
          <p className="text-sm sm:text-base md:text-lg text-white/80 max-w-2xl leading-relaxed">
            Find verified digital professionals, skilled trades people, and tutors across Africa with secure escrow payments, trust scores, and identity verification built into every interaction.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 max-w-2xl">
            <div className="flex-1 relative group">
              <input
                type="text"
                placeholder="Search for services"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-5 pr-12 py-3.5 sm:py-4 bg-white rounded-full text-[#1A1F36] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4F6AF5] transition-all shadow-lg text-sm sm:text-base"
              />
              <div className="absolute inset-y-0 right-0 pr-4 sm:pr-6 flex items-center pointer-events-none">
                <Search className="w-5 h-5 sm:w-6 sm:h-6 text-[#4F6AF5]" />
              </div>
            </div>
          </form>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              onClick={() => router.push("/employer/find-talent")}
              className="px-5 py-3 sm:px-6 sm:py-3 bg-[#1A1F36] hover:bg-[#2d3553] text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2 border border-white/20 text-sm sm:text-base"
            >
              Hire a Talent
              <ArrowRight size={18} />
            </button>
            <button
              onClick={() => router.push("/register")}
              className="px-5 py-3 sm:px-6 sm:py-3 bg-white hover:bg-gray-100 text-[#1A1F36] font-semibold rounded-lg transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              Find a Job
              <ArrowRight size={18} />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Service Marquee - Full width */}
      <div className="overflow-hidden mt-12 md:mt-16 lg:mt-20">
        <motion.div
          animate={{ x: [0, -2400] }}
          transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
          className="flex gap-3 md:gap-4 whitespace-nowrap"
        >
          {[
            "Product Design",
            "Website Development",
            "Carpentering",
            "Fashion Design",
            "Plumbing",
            "Video Editing",
            "Graphic Design",
            "Writing",
            "Translation",
            "Teaching",
            "Electrician",
            "Mechanic",
            "Product Design",
            "Website Development",
            "Carpentering",
            "Fashion Design",
            "Plumbing",
            "Video Editing",
            "Graphic Design",
            "Writing",
            "Translation",
            "Teaching",
            "Electrician",
            "Mechanic"
          ].map((service, idx) => (
            <span key={idx} className="px-4 sm:px-6 py-1.5 sm:py-2 bg-[#1A1F36]/90 text-white rounded-full border border-white/30 text-xs sm:text-sm whitespace-nowrap">
              {service}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
