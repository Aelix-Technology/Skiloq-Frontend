"use client";

import { motion } from "framer-motion";

const logos = [
  "FinTech Ghana", "TechHub Accra", "Kumasi Homes",
  "Green Energy", "PayHub", "Digital Marketing Pro",
  "Naija Ventures", "Safari Tech", "EcoBuild",
];

export function SocialProof() {
  // Triple the array for a guaranteed seamless infinite loop
  const tripledLogos = [...logos, ...logos, ...logos];

  return (
    // Added a subtle drop shadow to create depth before the dark section
    <section className="relative py-16 bg-white border-b border-slate-100 overflow-hidden z-10 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center mb-12"
        >
          <p className="text-[10px] md:text-xs font-black text-slate-900 uppercase tracking-[0.3em] mb-4 opacity-50">
            Powering Trust Across Africa
          </p>
          <div className="h-px w-12 bg-slate-900/20" />
        </motion.div>

        {/* INFINITE MARQUEE */}
        <div className="relative flex overflow-hidden">
          {/* Gradient Masks */}
          <div className="absolute inset-y-0 left-0 w-20 md:w-40 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-20 md:w-40 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <motion.div
            animate={{ x: ["0%", "-33.33%"] }} // Smooth infinite loop
            transition={{
              repeat: Infinity,
              duration: 30,
              ease: "linear",
            }}
            className="flex gap-16 md:gap-24 items-center whitespace-nowrap"
          >
            {tripledLogos.map((name, i) => (
              <div
                key={i}
                className="flex items-center gap-3 group cursor-default"
              >
                {/* Modern Abstract "Logo" Icon */}
                <div className="w-9 h-9 bg-slate-900/[0.04] rounded-lg flex items-center justify-center group-hover:bg-slate-900/[0.08] transition-colors">
                  <div className="w-3 h-3 bg-slate-900 rotate-45 group-hover:scale-110 transition-transform" />
                </div>
                
                <span className="text-lg md:text-xl font-bold text-slate-900 tracking-tight opacity-30 group-hover:opacity-80 transition-opacity">
                  {name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
