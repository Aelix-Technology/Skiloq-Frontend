"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Quote } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

const testimonials = [
  {
    id: 1,
    name: "Daniel Okafor",
    role: "Full Stack Developer",
    quote: "The assessment system helped me showcase my real abilities instead of competing with fake profiles and unverified freelancers.",
    image: "/assets/images/landing/Ellipse 1.png",
  },
  {
    id: 2,
    name: "Esther Mensah",
    role: "UI/UX Designer",
    quote: "Before joining Skiloq, it was difficult finding clients who trusted remote African creatives. After verifying my profile and uploading my portfolio, I started receiving consistent project offers from serious employers.",
    image: "/assets/images/landing/Ellipse 1 (1).png",
  },
  {
    id: 3,
    name: "David Menson",
    role: "Founder, NovaTech",
    quote: "The verification system saved us from wasting time on fake profiles and unreliable freelancers. We found quality talent much quicker.",
    image: "/assets/images/landing/Ellipse 1 (2).png",
  },
  {
    id: 4,
    name: "Amara Chukwu",
    role: "Content Strategist",
    quote: "As a remote worker based in Lagos, the platform's global reach has opened doors to clients I never would have connected with otherwise.",
    image: "/assets/images/landing/Ellipse 1 (3).png",
  },
  {
    id: 5,
    name: "Kwame Asante",
    role: "Mobile App Developer",
    quote: "The escrow payment system gave me confidence to take on bigger projects knowing my payments were secured and protected.",
    image: "/assets/images/landing/Ellipse 1 (2).png",
  },
  {
    id: 6,
    name: "Fatima Abubakar",
    role: "Digital Marketer",
    quote: "Skiloq's talent matching system connected me with clients who actually needed my specific skills, making every project more fulfilling.",
    image: "/assets/images/landing/Ellipse 1 (1).png",
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate for desktop
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Drag handlers for mobile
  const handleDragEnd = (event: any, info: any) => {
    if (info.offset.x < -50) {
      // Swiped left
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    } else if (info.offset.x > 50) {
      // Swiped right
      setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    }
  };

  return (
    <section className="relative py-24 overflow-hidden bg-white">
      <div className="relative max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
            Testimonials
          </h2>
          <p className="mt-4 text-gray-500 text-lg">
            Real stories from real people.
          </p>
        </div>

        {/* Mobile View - Overlayed Swipe Cards */}
        <div className="md:hidden relative h-[500px] w-full flex items-center justify-center">
          <div className="relative w-full max-w-sm h-full flex items-center justify-center">
            <AnimatePresence>
              {testimonials.map((t, index) => {
                const offset = index - currentIndex;
                if (Math.abs(offset) > 2) return null;

                const isActive = offset === 0;
                const isNext = offset === 1 || (offset === -(testimonials.length - 1));
                const isPrev = offset === -1 || (offset === testimonials.length - 1);

                return (
                  <motion.div
                    key={t.id}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.1}
                    onDragEnd={isActive ? handleDragEnd : undefined}
                    initial={{
                      scale: 0.9,
                      opacity: 0,
                      y: 20,
                      zIndex: testimonials.length - Math.abs(offset),
                    }}
                    animate={{
                      scale: isActive ? 1 : isNext || isPrev ? 0.85 : 0.8,
                      opacity: isActive ? 1 : isNext || isPrev ? 0.5 : 0.3,
                      y: isActive ? 0 : isNext || isPrev ? 20 : 40,
                      x: isNext ? 30 : isPrev ? -30 : 0,
                      zIndex: testimonials.length - Math.abs(offset),
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm"
                  >
                    <div className="bg-[#1A2B52] rounded-lg border border-[#4F6AF5]/30 p-6 shadow-md h-full">
                      <div className="flex justify-end mb-4">
                        <Quote className="w-8 h-8 text-amber-400" />
                      </div>
                      <p className="text-white/80 text-sm leading-relaxed mb-8">
                        {t.quote}
                      </p>
                      <div className="border-t border-white/20 pt-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full overflow-hidden">
                            <Image
                              src={t.image}
                              alt={t.name}
                              width={48}
                              height={48}
                              className="object-cover"
                              unoptimized
                            />
                          </div>
                          <div>
                            <p className="text-white font-bold">{t.name}</p>
                            <p className="text-white/60 text-sm">{t.role}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* Mobile Navigation Dots */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2">
              {testimonials.map((_, idx) => (
                <div
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2 h-2 rounded-full cursor-pointer transition-all ${
                    idx === currentIndex ? "w-6 bg-[#4F6AF5]" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Desktop View - Circular Carousel */}
        <div className="hidden md:flex relative h-[600px] w-full items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center">
            {testimonials.map((t, index) => {
              const total = testimonials.length;
              const angle = ((index - currentIndex + total) % total) * (360 / total);
              const isCenter = angle === 0;

              return (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{
                    x: isCenter
                      ? 0
                      : Math.cos((angle * Math.PI) / 180) * 300,
                    y: isCenter
                      ? 0
                      : Math.sin((angle * Math.PI) / 180) * 200,
                    scale: isCenter ? 1.2 : 0.7,
                    opacity: isCenter ? 1 : 0.4,
                    zIndex: isCenter ? 50 : total - Math.abs(angle / (360 / total)),
                  }}
                  transition={{
                    duration: 0.8,
                    ease: "easeInOut",
                  }}
                  className="absolute w-72"
                >
                  <div className="bg-[#1A2B52] rounded-lg border border-[#4F6AF5]/30 p-6 shadow-md hover:shadow-lg transition-all duration-300">
                    <div className="flex justify-end mb-4">
                      <Quote className="w-6 h-6 text-amber-400" />
                    </div>
                    <p className="text-white/80 text-xs leading-relaxed mb-4">
                      {isCenter ? t.quote : t.quote.slice(0, 80) + "..."}
                    </p>
                    <div className="border-t border-white/20 pt-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden">
                          <Image
                            src={t.image}
                            alt={t.name}
                            width={40}
                            height={40}
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                        <div>
                          <p className="text-white font-bold text-sm">{t.name}</p>
                          <p className="text-white/60 text-xs">{t.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
