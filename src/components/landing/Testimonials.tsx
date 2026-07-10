"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import Image from "next/image";

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
    quote: "Before joining Skiloq, it was difficult finding clients who trusted remote African creatives. After verifying my profile, I started receiving consistent project offers.",
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
];

export function Testimonials() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-white to-[#F8F9FF]">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-[#4F6AF5]/10 px-4 py-2 rounded-full mb-4">
            <Quote className="w-4 h-4 text-[#4F6AF5]" />
            <span className="text-[#4F6AF5] text-xs font-semibold uppercase tracking-wider">
              Testimonials
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            What our community is saying
          </h2>
          <p className="text-sm md:text-base text-gray-500 max-w-2xl mx-auto">
            Real stories from real people about their experience with Skiloq.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="lg:col-span-1"
            >
              <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-7 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all">
                <div className="flex justify-start mb-5">
                  <div className="w-10 h-10 rounded-full bg-[#4F6AF5]/10 flex items-center justify-center">
                    <Quote className="w-5 h-5 text-[#4F6AF5]" />
                  </div>
                </div>

                <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-6">
                  {t.quote}
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden border-2 border-[#4F6AF5]/20">
                    <Image
                      src={t.image}
                      alt={t.name}
                      width={56}
                      height={56}
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm md:text-base">
                      {t.name}
                    </p>
                    <p className="text-xs md:text-sm text-gray-500">{t.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
