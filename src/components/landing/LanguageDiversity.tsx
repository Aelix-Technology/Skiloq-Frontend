"use client";

import { motion, Variants } from "framer-motion";
import { Globe } from "lucide-react";

const languages = [
  {
    name: "English",
    flag: "/assets/images/flag-english.png",
    speakers: "Official",
  },
  {
    name: "Twi",
    flag: "/assets/images/flag-ghana.png",
    speakers: "18M+ speakers",
  },
  {
    name: "Hausa",
    flag: "/assets/images/flag-nigeria.png",
    speakers: "70M+ speakers",
  },
  {
    name: "Français",
    flag: "/assets/images/flag-france.png",
    speakers: "120M+ speakers",
  },
  {
    name: "Swahili",
    flag: "/assets/images/flag-kenya.png",
    speakers: "100M+ speakers",
  },
  {
    name: "Yorùbá",
    flag: "/assets/images/flag-nigeria.png", 
    speakers: "45M+ speakers",
  },
];

// Continuous floating animation variants with fixed TypeScript casting
const floatingVariants: Variants = {
  initial: { y: 0 },
  animate: (i: number) => ({
    y: [10, -10],
    transition: {
      repeat: Infinity,
      repeatType: "reverse" as const, // The "as const" fixes the TypeScript error
      ease: "easeInOut", 
      duration: 3 + i * 0.5, 
      delay: i * 0.2,
    },
  }),
};

export function LanguageDiversity() {
  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 text-center">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 md:mb-24"
        >
          <span className="inline-flex items-center gap-1.5 bg-accent/5 text-accent text-xs font-medium px-3 py-1.5 rounded-full border border-accent/10 mb-4">
            <Globe className="w-3.5 h-3.5" />
            Multi-Language Support
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-gray-950 mb-6 tracking-tighter">
            Your language, your platform
          </h2>
          <p className="text-lg text-gray-600 max-w-xl mx-auto leading-relaxed">
            Skiloq speaks your language. Full platform support for major African languages — not just English.
          </p>
        </motion.div>

        {/* The Floating Card Grid */}
        <div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 relative"
          style={{ perspective: "1000px" }}
        >
          {languages.map((lang, i) => (
            <div key={lang.name} className="relative">
              <motion.div
                custom={i}
                variants={floatingVariants}
                initial="initial"
                animate="animate"
                className="group relative bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:border-accent/10 transition-shadow duration-500 text-center flex flex-col items-center h-full"
              >
                <motion.div
                  className="w-full h-full"
                  whileHover={{ 
                    scale: 1.05, 
                    rotateX: 5, 
                    rotateY: -5,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                >
                  <img
                    src={lang.flag}
                    alt={`${lang.name} Flag`}
                    className="w-12 h-12 rounded-full object-cover mx-auto mb-4 border-2 border-gray-100 shadow-inner"
                  />
                  <p className="text-lg font-bold text-gray-950 tracking-tight mb-1">
                    {lang.name}
                  </p>
                  <p className="text-xs text-gray-500 font-medium whitespace-nowrap">
                    {lang.speakers}
                  </p>
                </motion.div>
                
                {/* Visual shadow beneath */}
                <motion.div 
                  className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-2 bg-black/5 rounded-full blur-sm pointer-events-none"
                  style={{ zIndex: -1 }}
                  animate={{ 
                    scaleX: [1, 0.8], 
                    opacity: [0.8, 0.4] 
                  }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "reverse" as const,
                    ease: "easeInOut",
                    duration: 3 + i * 0.5,
                    delay: i * 0.2,
                  }}
                />
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}