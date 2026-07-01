"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const images = [
  {
    src: "/assets/images/landing/About Img 1.png",
    alt: "Professional 1",
  },
  {
    src: "/assets/images/landing/HireTalent3 1 (1).png",
    alt: "Professional 2",
  },
  {
    src: "/assets/images/landing/HireTalents2 1.png",
    alt: "Professional 3",
  },
];

export function HireTopTalent() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-br from-[#1A1F36] via-[#2A3156] to-[#1A1F36] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Overlapping Images with Circular Motion */}
          <div className="relative h-[400px] md:h-[500px] flex items-center justify-center">
            {/* Background Blur */}
            <div className="absolute top-10 left-10 w-40 h-40 bg-[#4F6AF5]/20 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-48 h-48 bg-[#4F6AF5]/10 rounded-full blur-3xl" />

            {/* Circular Motion Images */}
            <div className="relative w-72 h-72 md:w-96 md:h-96 lg:w-[480px] lg:h-[480px]">
              {images.map((image, index) => {
                const isActive = index === currentIndex;
                const nextIndex = (index + 1) % images.length;
                const isNext = index === nextIndex;
                
                return (
                  <motion.div
                    key={index}
                    initial={{ scale: 0.7, opacity: 0, x: 50, y: 0 }}
                    animate={{
                      scale: isActive ? 1 : isNext ? 0.85 : 0.75,
                      opacity: isActive ? 1 : isNext ? 0.7 : 0.4,
                      zIndex: isActive ? 30 : isNext ? 20 : 10,
                      x: isActive ? 0 : isNext ? 60 : -60,
                      y: isActive ? 0 : isNext ? 30 : -30,
                    }}
                    transition={{
                      duration: 0.8,
                      ease: "easeInOut",
                    }}
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 md:w-60 lg:w-72 h-52 md:h-72 lg:h-80 rounded-xl overflow-hidden shadow-2xl`}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover"
                      priority={isActive}
                      unoptimized
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Side - Text Content */}
          <div className="relative z-40">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Hire top talent on your own terms.
              </h2>
              
              <h3 className="text-xl md:text-2xl font-semibold text-white mb-4">
                Find the Right Talent, Faster and Safer
              </h3>
              
              <p className="text-white/80 text-base md:text-lg leading-relaxed mb-8">
                Skip the uncertainty of traditional hiring. Aelix helps you discover pre-verified talent 
                backed by identity checks, skill assessments, and escrow-protected payments designed 
                for secure collaboration.
              </p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#4F6AF5] hover:bg-[#3d56e0] text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  Join Our Community
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
