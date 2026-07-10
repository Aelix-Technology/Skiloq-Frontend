"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    name: "Daniel Okafor",
    role: "Full Stack Developer",
    quote: "The assessment system helped me showcase my real abilities instead of competing with fake profiles and unverified freelancers.",
    image: "/assets/images/landing/Ellipse 1.png",
    rating: 5,
  },
  {
    id: 2,
    name: "Esther Mensah",
    role: "UI/UX Designer",
    quote: "Before joining Skiloq, it was difficult finding clients who trusted remote African creatives. After verifying my profile, I started receiving consistent project offers.",
    image: "/assets/images/landing/Ellipse 1 (1).png",
    rating: 5,
  },
  {
    id: 3,
    name: "David Menson",
    role: "Founder, NovaTech",
    quote: "The verification system saved us from wasting time on fake profiles and unreliable freelancers. We found quality talent much quicker.",
    image: "/assets/images/landing/Ellipse 1 (2).png",
    rating: 5,
  },
  {
    id: 4,
    name: "Amara Chukwu",
    role: "Content Strategist",
    quote: "As a remote worker based in Lagos, the platform's global reach has opened doors to clients I never would have connected with otherwise.",
    image: "/assets/images/landing/Ellipse 1 (3).png",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-white to-[#F8F9FF]">
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-[#4F6AF5]/5 to-transparent pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-[#4F6AF5]/10 px-5 py-2.5 rounded-full mb-6 mx-auto">
            <Quote className="w-4 h-4 text-[#4F6AF5]" />
            <span className="text-[#4F6AF5] text-xs font-semibold uppercase tracking-widest">
              Testimonials
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-5 leading-tight">
            Loved by African professionals
          </h2>
          <p className="text-sm md:text-base text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Join thousands of verified talents and employers who trust Skiloq for their professional needs.
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
              transition={{ duration: 0.6, delay: idx * 0.12 }}
              whileHover={{ y: -4 }}
              className="lg:col-span-1"
            >
              <div className="bg-white rounded-2xl border border-gray-100 p-7 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#4F6AF5]/5 rounded-full -translate-y-1/2 translate-x-1/2" />

                <div className="relative">
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 mb-6">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-amber-400 fill-amber-400"
                      />
                    ))}
                  </div>

                  {/* Quote Icon */}
                  <div className="flex justify-start mb-5">
                    <div className="w-11 h-11 rounded-2xl bg-[#4F6AF5]/10 flex items-center justify-center">
                      <Quote className="w-5 h-5 text-[#4F6AF5]" />
                    </div>
                  </div>

                  {/* Quote Text */}
                  <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-7">
                    {t.quote}
                  </p>

                  {/* Divider */}
                  <div className="w-full h-px bg-gray-100 mb-7" />

                  {/* User Info */}
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl overflow-hidden border-2 border-[#4F6AF5]/20">
                      <Image
                        src={t.image}
                        alt={t.name}
                        width={64}
                        height={64}
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
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}