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
          className="max-w-4xl space-y-8"
        >
          {/* Pre-heading badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20"
          >
            <span className="w-2 h-2 rounded-full bg-[#4F6AF5] animate-pulse" />
            <span className="text-white/90 text-sm font-medium">The Marketplace Built on Trust, Not Guesswork</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="heading-1 text-white"
          >
            Africa's Trust-First<br className="hidden sm:block" />Talent Marketplace
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="body-text text-white/85 max-w-2xl"
          >
            Find verified digital professionals, skilled tradespeople, and tutors across Africa with secure escrow payments, trust scores, and identity verification built into every interaction.
          </motion.p>

          {/* Search Bar */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            onSubmit={handleSearch}
            className="flex flex-col gap-4"
          >
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <Search className="h-6 w-6 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for skills, job titles, or locations..."
                className="w-full pl-14 pr-32 py-5 bg-white rounded-xl shadow-2xl text-gray-900 placeholder-gray-400 focus:ring-4 focus:ring-[#4F6AF5]/30 focus:outline-none text-base font-medium"
              />
              <button
                type="submit"
                className="absolute inset-y-0 right-2 my-2 px-7 bg-[#4F6AF5] hover:bg-[#3d56e0] text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                Search
                <ArrowRight size={18} />
              </button>
            </div>

            {/* Popular searches */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="flex flex-wrap items-center gap-2"
            >
              <span className="text-white/70 text-sm font-medium">Popular searches:</span>
              {popularSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSearchQuery(search);
                    router.push(`/employer/find-talent?search=${encodeURIComponent(search)}`);
                  }}
                  className="px-4 py-1.5 bg-white/10 hover:bg-white/20 text-white/90 text-sm font-medium rounded-full border border-white/20 transition-all"
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
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-stretch sm:items-center pt-2"
          >
            <button
              onClick={() => router.push("/employer/find-talent")}
              className="px-7 py-4 bg-white text-[#1A1F36] hover:bg-gray-100 font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-xl text-base sm:text-lg"
            >
              Hire a Talent
              <ArrowRight size={20} />
            </button>
            <button
              onClick={() => router.push("/register")}
              className="px-7 py-4 bg-[#4F6AF5] hover:bg-[#3d56e0] text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 border border-white/25 text-base shadow-xl shadow-[#4F6AF5]/20"
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
