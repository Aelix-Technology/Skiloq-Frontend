"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, CheckCircle, ChevronRight, ChevronLeft } from "lucide-react";
import { useRef } from "react";

const talents = [
  {
    id: 1,
    name: "Muqadas Olasunkanmi",
    role: "Senior Product Designer",
    location: "Lagos, Nigeria",
    trustScore: 98,
    verification: "ID Verified",
    skills: "Figma,",
    image: "/assets/images/landing/Frame 279.png",
  },
  {
    id: 2,
    name: "Jenipha",
    role: "Senior Product Designer",
    location: "Lagos, Nigeria",
    trustScore: 98,
    verification: "ID Verified",
    skills: "Figma,",
    image: "/assets/images/landing/Frame 280 (1).png",
  },
  {
    id: 3,
    name: "Muqadas Olasunkanmi",
    role: "Senior Product Designer",
    location: "Lagos, Nigeria",
    trustScore: 98,
    verification: "ID Verified",
    skills: "Figma,",
    image: "/assets/images/landing/Frame 280.png",
  },
  {
    id: 4,
    name: "Muqadas Olasunkanmi",
    role: "Senior Product Designer",
    location: "Lagos, Nigeria",
    trustScore: 98,
    verification: "ID Verified",
    skills: "Figma,",
    image: "/assets/images/landing/Frame 288.png",
  },
  {
    id: 5,
    name: "Muqadas Olasunkanmi",
    role: "Senior Product Designer",
    location: "Lagos, Nigeria",
    trustScore: 98,
    verification: "ID Verified",
    skills: "Figma,",
    image: "/assets/images/landing/Frame 279.png",
  },
];

export function FeaturedTalent() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -350, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 350, behavior: "smooth" });
    }
  };

  return (
    <section className="relative py-16 md:py-28 bg-white overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
            Featured Talents
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-lg">
            Find the talent your business needs without the uncertainty.
          </p>
        </motion.div>

        {/* Talents Slider Container */}
        <div className="relative mb-16">
          {/* Navigation Buttons */}
          <button
            onClick={scrollLeft}
            className="absolute left-2 md:left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-all hidden md:flex"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
          </button>
          <button
            onClick={scrollRight}
            className="absolute right-2 md:right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-[#1A2B52] rounded-full shadow-lg flex items-center justify-center hover:bg-[#2a3b65] transition-all"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </button>

          {/* Slider */}
          <div
            ref={scrollRef}
            className="flex gap-4 md:gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory px-0 md:px-2"
          >
            {talents.map((talent, idx) => (
              <motion.div
                key={talent.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex-shrink-0 w-[260px] sm:w-[300px] md:w-[320px] lg:w-[350px] snap-center group"
              >
                <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full">
                  {/* Top Section */}
                  <div className="bg-[#1A2B52] p-6 text-white text-center rounded-t-xl">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden mx-auto mb-3 border-2 border-white bg-white">
                      <Image
                        src={talent.image}
                        alt={talent.name}
                        width={80}
                        height={80}
                        className="object-cover w-full h-full"
                        unoptimized
                      />
                    </div>
                    <h3 className="font-bold text-base md:text-lg mb-1">{talent.name}</h3>
                    <p className="text-gray-200 text-xs md:text-sm mb-2">{talent.role}</p>
                    <div className="flex items-center justify-center gap-1 text-gray-300 text-xs">
                      <MapPin className="w-3 h-3" />
                      {talent.location}
                    </div>
                  </div>

                  {/* Bottom Section */}
                  <div className="p-6 border border-gray-100 rounded-b-xl bg-white">
                    <div className="mb-4">
                      <p className="text-gray-600 text-xs md:text-sm mb-1">
                        Trust Score: <span className="font-semibold text-gray-900">{talent.trustScore}</span>
                      </p>
                      <p className="text-gray-600 text-xs md:text-sm mb-1 flex items-center gap-1">
                        Verification: <span className="font-semibold text-gray-900 flex items-center gap-1"><CheckCircle className="w-3 h-3 text-green-600" /> {talent.verification}</span>
                      </p>
                      <p className="text-gray-600 text-xs md:text-sm">
                        Skills: <span className="font-semibold text-gray-900">{talent.skills}</span>
                      </p>
                    </div>
                    <button className="w-full py-2 border border-gray-400 text-gray-700 rounded-md text-xs md:text-sm font-semibold hover:bg-gray-50 transition-all">
                      View Profile
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-[#1E243B] overflow-visible mt-12"
        >
          <div className="relative max-w-7xl mx-auto px-0">
            <div className="relative flex flex-col md:flex-row items-center">
              {/* Image */}
              <div className="relative w-full md:w-2/5 h-[320px] md:h-[420px] lg:h-[480px] -mt-16 md:-mt-20">
                <Image
                  src="/assets/images/landing/Img 1.png"
                  alt="Join Skiloq"
                  fill
                  className="object-contain object-center md:object-left-bottom"
                  unoptimized
                />
              </div>
              
              {/* Content */}
              <div className="w-full md:w-3/5 py-10 px-6 sm:py-12 sm:px-8 lg:py-16 lg:px-16 text-center md:text-left">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6">
                  Join a community of thousands of happy members.
                </h3>
                <button className="px-5 py-2.5 sm:px-6 sm:py-3 bg-white text-[#1A2B52] rounded-md font-bold text-base sm:text-lg hover:bg-gray-100 transition-all">
                  Join Skiloq
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
