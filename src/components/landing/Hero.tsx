// src/components/landing/Hero.tsx
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
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
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
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-3xl space-y-8"
        >
          {/* Pre-Heading Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#4F6AF5]/15 backdrop-blur-sm border border-[#4F6AF5]/30">
            <span className="text-sm font-medium text-white tracking-wide">The Marketplace Built on Trust, Not Guesswork</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight">
            Africa’s Trust-First<br />Talent Marketplace
          </h1>

          {/* Subheading */}
          <p className="text-lg text-white/80 max-w-2xl leading-relaxed">
            Find verified digital professionals, skilled, trades people, and tutors across Africa with secure escrow payments, trust scores, and identity verification built into every interaction.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 max-w-2xl">
            <div className="flex-1 relative group">
              <input
                type="text"
                placeholder="Search for services"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-6 pr-12 py-4 bg-white rounded-full text-[#1A1F36] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4F6AF5] transition-all shadow-lg"
              />
              <div className="absolute inset-y-0 right-0 pr-6 flex items-center pointer-events-none">
                <Search className="w-6 h-6 text-[#4F6AF5]" />
              </div>
            </div>
          </form>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => router.push("/employer/find-talent")}
              className="px-6 py-3 bg-[#1A1F36] hover:bg-[#2d3553] text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2 border border-white/20"
            >
              Hire a Talent
              <ArrowRight size={20} />
            </button>
            <button
              onClick={() => router.push("/register")}
              className="px-6 py-3 bg-white hover:bg-gray-100 text-[#1A1F36] font-semibold rounded-lg transition-all flex items-center justify-center gap-2"
            >
              Find a Job
              <ArrowRight size={20} />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Service Marquee - Full width */}
      <div className="overflow-hidden mt-20">
        <motion.div
          animate={{ x: [0, -2400] }}
          transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
          className="flex gap-4 whitespace-nowrap"
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
            <span key={idx} className="px-6 mt-20 py-2 bg-[#1A1F36]/90 text-white rounded-full border border-white/30 text-sm whitespace-nowrap">
              {service}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
