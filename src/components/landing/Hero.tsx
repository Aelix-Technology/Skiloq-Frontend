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
    <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden min-h-[90vh] flex items-center justify-center">
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
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 md:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-8 w-full"
        >
          {/* Pre-heading badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-5 py-2.5 rounded-full border border-white/25 mx-auto"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#4F6AF5] animate-pulse" />
            <span className="text-white/95 text-sm font-medium">The Marketplace Built on Trust, Not Guesswork</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="heading-1 text-white leading-tight"
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
            className="body-text text-white/90 max-w-2xl mx-auto"
          >
            Find verified digital professionals, skilled tradespeople, and tutors across Africa with secure escrow payments, trust scores, and identity verification built into every interaction.
          </motion.p>

          {/* Search Bar */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            onSubmit={handleSearch}
            className="flex flex-col gap-5"
          >
            <div className="relative max-w-2xl mx-auto w-full">
              {/* Search bar container */}
              <div className="bg-white/10 backdrop-blur-xl rounded-[26px] p-2 shadow-2xl border border-white/20">
                <div className="flex items-center gap-3 px-5 py-3 bg-white rounded-[20px]">
                  <div className="flex items-center justify-center w-12 h-12 bg-[#f0f4ff] rounded-xl">
                    <Search className="h-6 w-6 text-[#4F6AF5]" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for skills, job titles, or locations..."
                    className="flex-1 text-gray-900 placeholder-gray-500 bg-transparent border-0 focus:ring-0 text-base md:text-lg font-medium outline-none"
                  />
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 bg-[#4F6AF5] hover:bg-[#3d56e0] text-white font-bold rounded-xl px-7 py-3 md:px-10 md:py-4 transition-all shadow-lg"
                  >
                    <span className="hidden md:inline">Search</span>
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Popular searches */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="flex flex-wrap items-center justify-center gap-2.5"
            >
              <span className="text-white/70 text-sm font-medium">Popular searches:</span>
              {popularSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSearchQuery(search);
                    router.push(`/employer/find-talent?search=${encodeURIComponent(search)}`);
                  }}
                  className="px-4.5 py-2 bg-white/12 hover:bg-white/22 text-white/95 text-sm font-medium rounded-full border border-white/25 transition-all hover:scale-[1.03]"
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
            className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-center justify-center pt-3"
          >
            <button
              onClick={() => router.push("/employer/find-talent")}
              className="px-8 py-4 bg-white text-[#1A1F36] hover:bg-gray-50 font-bold rounded-2xl transition-all flex items-center justify-center gap-2.5 shadow-2xl text-base sm:text-lg"
            >
              Hire a Talent
              <ArrowRight size={20} />
            </button>
            <button
              onClick={() => router.push("/register")}
              className="px-8 py-4 bg-[#4F6AF5] hover:bg-[#3d56e0] text-white font-semibold rounded-2xl transition-all flex items-center justify-center gap-2.5 border border-white/30 text-base shadow-xl shadow-[#4F6AF5]/30"
            >
              Find a Job
              <ArrowRight size={20} />
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
