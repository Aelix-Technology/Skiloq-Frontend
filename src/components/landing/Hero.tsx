"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Search } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export function Hero() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/employer/find-talent?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const popularSearches = [
    "Product Designer",
    "Full Stack Developer",
    "Digital Marketer",
    "Mobile App Developer",
    "Content Strategist"
  ];

  return (
    <section className="relative pt-36 pb-28 md:pt-44 md:pb-36 overflow-hidden min-h-[80vh] flex items-center justify-center">
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
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 md:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-10 w-full"
        >
          {/* Pre-heading badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="inline-flex items-center gap-2.5 bg-white/15 backdrop-blur-sm px-6 py-3 rounded-full border border-white/25 mx-auto"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#4F6AF5] animate-pulse" />
            <span className="text-white/95 text-xs sm:text-sm font-medium">The Marketplace Built on Trust, Not Guesswork</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[2.5rem] sm:text-[3.5rem] md:text-[4.25rem] font-bold text-white leading-tight"
          >
            Africa's Trust-First
            <br className="hidden sm:block" />
            Talent Marketplace
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-sm sm:text-base md:text-lg text-white/85 max-w-2xl mx-auto leading-relaxed"
          >
            Find verified digital professionals, skilled tradespeople, and tutors across Africa with secure escrow payments, trust scores, and identity verification built into every interaction.
          </motion.p>

          {/* Search Bar */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            onSubmit={handleSearch}
            className="flex flex-col gap-6"
          >
            <div className="relative max-w-xl mx-auto w-full">
              {/* Search bar container */}
              <div className="bg-white/10 backdrop-blur-xl rounded-full p-1.5 shadow-2xl border border-white/20">
                <div className="flex items-center gap-3 px-4 sm:px-6 py-3.5 bg-white rounded-full">
                  <div className="flex items-center justify-center w-10 h-10 bg-[#f0f4ff] rounded-full">
                    <Search className="h-5 w-5 text-[#4F6AF5]" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for skills, job titles, or locations..."
                    className="flex-1 text-gray-900 placeholder-gray-400 bg-transparent border-0 focus:ring-0 text-sm sm:text-base font-medium outline-none"
                  />
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 bg-[#4F6AF5] hover:bg-[#3d56e0] text-white font-semibold rounded-full px-5 sm:px-7 py-2.5 sm:py-3 transition-all shadow-md"
                  >
                    <span className="hidden sm:inline text-sm">Search</span>
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Popular searches */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3"
            >
              <span className="text-white/70 text-xs sm:text-sm font-medium">Popular searches:</span>
              {popularSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSearchQuery(search);
                    router.push(`/employer/find-talent?search=${encodeURIComponent(search)}`);
                  }}
                  className="px-4 py-2 bg-white/12 hover:bg-white/22 text-white/95 text-xs sm:text-sm font-medium rounded-full border border-white/25 transition-all hover:scale-[1.03]"
                >
                  {search}
                </button>
              ))}
            </motion.div>
          </motion.form>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-center justify-center pt-2"
          >
            <button
              onClick={() => router.push("/employer/find-talent")}
              className="px-7 sm:px-9 py-3.5 sm:py-4 bg-white text-[#1A1F36] hover:bg-gray-50 font-bold rounded-2xl transition-all flex items-center justify-center gap-2 shadow-xl text-sm sm:text-base"
            >
              Hire a Talent
              <ArrowRight size={18} />
            </button>
            <button
              onClick={() => router.push("/register")}
              className="px-7 sm:px-9 py-3.5 sm:py-4 bg-[#4F6AF5] hover:bg-[#3d56e0] text-white font-semibold rounded-2xl transition-all flex items-center justify-center gap-2 border border-white/30 text-sm shadow-lg shadow-[#4F6AF5]/25"
            >
              Find a Job
              <ArrowRight size={18} />
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
