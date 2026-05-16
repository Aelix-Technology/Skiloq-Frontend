"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, Shield, Users, Zap, TrendingUp } from "lucide-react";

const slides = [
  {
    image: "/assets/images/couple.png",
    welcome: "Welcome to Skiloq",
    headline: "Africa's #1 place to hire, get hired, and get paid — without a CV.",
    lang: "English",
    icon: Shield,
  },
  {
    image: "/assets/images/tradewoman.png",
    welcome: "Akwaaba ba Skiloq",
    headline: "Baabi a wɔgye wo tom yɛ adwuma, nya akatua — a wommisa CV.",
    lang: "Twi",
    icon: Users,
  },
  {
    image: "/assets/images/marketwoman.png",
    welcome: "Barka da zuwa Skiloq",
    headline: "Wurin #1 na Afrika don ɗaukar ma'aikata, samun aiki, da biyan kuɗi — ba tare da CV ba.",
    lang: "Hausa",
    icon: Zap,
  },
  {
    image: "/assets/images/sawman.png",
    welcome: "Bienvenue sur Skiloq",
    headline: "La plateforme #1 en Afrique pour recruter, être recruté et être payé — sans CV.",
    lang: "Français",
    icon: Shield,
  },
];

const trendingSkills = [
  "AI Voice Agent", "AI Chatbot", "AI Copywriting", "AI Creative Design",
  "Next.js", "React Native", "Content Writing", "UI/UX Design",
  "Graphic Design", "Data Entry", "Social Media", "Video Editing",
  "Twi Translation", "Tailwind CSS", "SEO Writing", "Virtual Assistant",
];

export function Hero() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const slide = slides[current];
  const IconComponent = slide.icon;

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background image */}
      <AnimatePresence mode="wait">
        <motion.img
          key={`img-${current}`}
          src={slide.image}
          alt={slide.lang}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/80" />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 text-center text-white pt-28 md:pt-36 flex-1 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6 }}
          >
            {/* Language badge */}
            <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md text-white/90 text-8xs font-medium px-4 py-2 rounded-full border border-white/20 mb-6 md:mb-10">
              <Sparkles className="w-3 h-3 text-yellow-400" />
              {slide.lang}
            </span>

            {/* Welcome heading */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black mb-4 md:mb-6 leading-[0.95] tracking-tight px-2 drop-shadow-lg">
              {slide.welcome}
            </h1>

            {/* Headline */}
            <p className="text-base sm:text-4xl md:text-x5l text-white/90 max-w-3xl mx-auto mb-8 md:mb-12 font-medium leading-snug px-2 drop-shadow-md">
              {slide.headline}
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 px-2">
              <button
                onClick={() => router.push("/register")}
                className="bg-white text-primary font-bold px-8 py-4 rounded-xl hover:bg-slate-100 transition-all shadow-xl shadow-black/20 flex items-center justify-center gap-2 group text-sm md:text-base"
              >
                <IconComponent className="w-4 h-4" />
                Find Work
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => router.push("/register?role=employer")}
                className="bg-white/10 backdrop-blur-md text-white font-bold px-8 py-4 rounded-xl border border-white/20 hover:bg-white/20 transition-all text-sm md:text-base"
              >
                Hire Talent
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Trending Skills Bar */}
      <div className="relative z-10 w-full py-5 mt-auto  border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-white flex items-center gap-4">
          <span className="text-white/50 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] whitespace-nowrap shrink-0 flex items-center gap-1.5">
            <TrendingUp className="w-3 h-3 text-green-400" />
            Trending
          </span>
          
          <div className="overflow-hidden flex-1 [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
            <motion.div
              animate={{ x: ["0%", "-33.33%"] }} // Seamless infinite loop calculation
              transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
              className="flex gap-3 whitespace-nowrap w-max"
            >
              {/* Triple duplicate for seamless infinite scroll */}
              {[...trendingSkills, ...trendingSkills, ...trendingSkills].map((skill, i) => (
                <span
                  key={i}
                  className="bg-white/5 border border-white/10 text-white/70 px-4 py-1.5 rounded-full text-xs font-medium hover:bg-white/10 hover:text-white transition-colors cursor-default"
                >
                  {skill}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Slide indicators (Fixed typo 'flex t' and positioning) */}
      <div className="absolute bottom-24 flex justify-center gap-2 z-20 w-full">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1 rounded-full transition-all duration-500 ${
              i === current
                ? "w-8 bg-white/90"
                : "w-2 bg-white/20 hover:bg-white/40"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
