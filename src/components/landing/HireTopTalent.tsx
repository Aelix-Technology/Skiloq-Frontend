"use client";

import { motion } from "framer-motion";
import Image from "next/image";

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
  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-br from-[#1A1F36] via-[#2A3156] to-[#1A1F36] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Overlapping Images */}
          <div className="relative h-[400px] md:h-[500px]">
            {/* Background Blur */}
            <div className="absolute top-10 left-10 w-40 h-40 bg-[#4F6AF5]/20 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-48 h-48 bg-[#4F6AF5]/10 rounded-full blur-3xl" />

            {/* Image 1 (Front) */}
            <motion.div
              animate={{
                y: [0, -10, 0],
                z: [0, 50, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-0 left-0 z-30 w-48 md:w-64 h-64 md:h-80 rounded-xl overflow-hidden shadow-2xl"
            >
              <Image
                src={images[0].src}
                alt={images[0].alt}
                fill
                className="object-cover"
                priority
              />
            </motion.div>

            {/* Image 2 (Middle) */}
            <motion.div
              animate={{
                y: [0, 5, 0],
                z: [0, 30, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="absolute top-20 left-24 z-20 w-44 md:w-56 h-56 md:h-72 rounded-xl overflow-hidden shadow-xl"
            >
              <Image
                src={images[1].src}
                alt={images[1].alt}
                fill
                className="object-cover"
              />
            </motion.div>

            {/* Image 3 (Back) */}
            <motion.div
              animate={{
                y: [0, -5, 0],
                z: [0, 10, 0],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute top-40 left-8 z-10 w-40 md:w-52 h-52 md:h-68 rounded-xl overflow-hidden shadow-lg"
            >
              <Image
                src={images[2].src}
                alt={images[2].alt}
                fill
                className="object-cover"
              />
            </motion.div>
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
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
