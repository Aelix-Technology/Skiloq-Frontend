// src/components/landing/Hero.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  Users,
  BadgeCheck,
  TrendingUp,
} from "lucide-react";

const slides = [
  {
    image: "/assets/images/couple.png",
    lang: "English",
    headline: "Hire skilled African talent or get hired — faster, safer, smarter.",
    subtext:
      "Skiloq connects businesses with skilled African professionals and helps workers find opportunities without traditional barriers.",
  },
  {
    image: "/assets/images/tradewoman.png",
    lang: "Twi",
    headline: "Fa adwumayɛfo pa anaa nya adwuma — ntɛm, ahotoso mu, na nyansa mu.",
    subtext:
      "Skiloq boa nnwumayɛfo ne adwumayɛfo wɔ Afrika ma wonya hokwan ne adwuma.",
  },
  {
    image: "/assets/images/marketwoman.png",
    lang: "Hausa",
    headline: "Dauki kwararru ko sami aiki — cikin sauri da tsaro.",
    subtext:
      "Skiloq na haɗa ƙwararrun ma'aikata da kamfanoni a duk faɗin Afrika.",
  },
  {
    image: "/assets/images/sawman.png",
    lang: "Français",
    headline: "Recrutez ou trouvez un emploi — plus vite et en toute confiance.",
    subtext:
      "Skiloq connecte les talents africains et les entreprises sans barrières traditionnelles.",
  },
  {
    image: "/assets/images/africa-one.png",
    lang: "English",
    headline: "Opportunities built for Africa's growing workforce.",
    subtext:
      "Find projects, hire verified talent and grow without limitations.",
  },
  {
    image: "/assets/images/africa-two.png",
    lang: "Français",
    headline: "Une plateforme conçue pour les talents africains.",
    subtext:
      "Développez votre activité et trouvez les meilleurs professionnels.",
  },
];

const trendingSkills = [
  "AI Voice Agent",
  "UI/UX Design",
  "Next.js",
  "Content Writing",
  "Video Editing",
  "Virtual Assistant",
  "Tailwind CSS",
  "Social Media",
  "Translation",
  "Graphic Design",
  "Data Entry",
  "React",
];

export function Hero() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const slide = slides[current];

  return (
    <section className="relative overflow-hidden bg-[#1A1F36] text-white pt-28 md:pt-36">
      {/* Ambient Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Image
          src="/assets/images/bg2.png"
          alt=""
          fill
          className="object-cover opacity-15 blur-3xl scale-110"
          priority
        />

        <div className="absolute top-0 left-0 w-[420px] h-[420px] bg-[#4F6AF5]/10 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-0 w-[320px] h-[320px] bg-[#4F6AF5]/10 blur-3xl rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[82vh]">
          {/* LEFT */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45 }}
              className="max-w-xl"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 mb-6">
                <BadgeCheck size={14} className="text-[#22C55E]" />
                <span className="text-[12px] text-white/80 font-medium">
                  {slide.lang}
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-[34px] md:text-[56px] font-bold leading-tight tracking-tight mb-5">
                {slide.headline}
              </h1>

              {/* Subtext */}
              <p className="text-[16px] text-white/70 leading-7 mb-8 max-w-lg">
                {slide.subtext}
              </p>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <button
                  onClick={() => router.push("/register?role=employer")}
                  className="bg-[#4F6AF5] hover:bg-[#3d59f0] transition-all rounded-lg px-6 py-3 text-[14px] font-semibold flex items-center justify-center gap-2 shadow-md active:scale-95"
                >
                  Hire Talent
                  <ArrowRight size={16} />
                </button>

                <button
                  onClick={() => router.push("/register")}
                  className="border border-white/10 bg-white/5 hover:bg-white/10 transition-all rounded-lg px-6 py-3 text-[14px] font-semibold active:scale-95"
                >
                  Find Work
                </button>
              </div>

              {/* Trust */}
              <div className="flex flex-wrap gap-5 text-[12px] text-white/60">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-[#22C55E]" />
                  Verified Talent
                </div>
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-[#4F6AF5]" />
                  Multilingual Workforce
                </div>
                <div className="flex items-center gap-2">
                  <BadgeCheck size={16} className="text-[#22C55E]" />
                  Secure Hiring
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* RIGHT IMAGE SLIDESHOW */}
          <div className="relative flex justify-center">
            <div className="relative rounded-lg border border-white/10 bg-white/5 backdrop-blur-md p-4 shadow-lg w-full max-w-[520px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={slide.image}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="relative w-full h-[420px] rounded-lg overflow-hidden"
                >
                  <Image
                    src={slide.image}
                    alt={slide.lang}
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* Floating Card */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 left-4 bg-[#1A1F36] border border-white/10 rounded-lg p-4 shadow-md flex items-center gap-3"
              >
                <Image
                  src="/assets/images/hire.png"
                  alt=""
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
                <div>
                  <p className="text-[12px] text-white/50">Recently hired</p>
                  <p className="text-[14px] font-medium">Verified African Talent</p>
                </div>
              </motion.div>

              {/* Top Badge */}
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-5 -right-4 bg-[#4F6AF5] rounded-lg px-4 py-3 shadow-md text-[12px] font-medium"
              >
                +2k skilled workers
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Trending Skills */}
      <div className="relative z-10 border-t border-white/5 mt-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-5 flex items-center gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <TrendingUp size={16} className="text-[#22C55E]" />
            <span className="text-[12px] uppercase tracking-wider text-white/50 font-semibold whitespace-nowrap">
              Trending Skills
            </span>
          </div>

          <div className="overflow-hidden flex-1 [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
            <motion.div
              animate={{ x: [0, -1200] }}
              transition={{ repeat: Infinity, duration: 32, ease: "linear" }}
              className="flex gap-3 whitespace-nowrap"
            >
              {[...trendingSkills, ...trendingSkills].map((skill, i) => (
                <span
                  key={i}
                  className="rounded-full bg-white/5 border border-white/10 px-3 py-2 text-[12px] text-white/70 hover:bg-white/10 transition-colors cursor-default"
                >
                  {skill}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}