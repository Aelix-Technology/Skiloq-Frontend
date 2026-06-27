"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    name: "Daniel Okafor",
    role: "Full Stack Developer",
    quote: "The assessment system helped me showcase my real abilities instead of competing with fake profiles and unverified freelancers.",
    image: "/assets/images/landing/Ellipse 1.png",
  },
  {
    name: "Esther Mensah",
    role: "UI/UX Designer",
    quote: "Before joining Skiloq, it was difficult finding clients who trusted remote African creatives. After verifying my profile and uploading my portfolio, I started receiving consistent project offers from serious employers.",
    image: "/assets/images/landing/Ellipse 1 (1).png",
  },
  {
    name: "David Menson",
    role: "Founder, NovaTech",
    quote: "The verification system saved us from wasting time on fake profiles and unreliable freelancers. We found quality talent much quicker.",
    image: "/assets/images/landing/Ellipse 1 (2).png",
  },
  {
    name: "Amara Chukwu",
    role: "Content Strategist",
    quote: "As a remote worker based in Lagos, the platform's global reach has opened doors to clients I never would have connected with otherwise.",
    image: "/assets/images/landing/Ellipse 1 (3).png",
  },
];

export function Testimonials() {
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

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-lg transition-all duration-300 h-full">
                {/* Quote icon */}
                <div className="flex justify-end mb-4">
                  <Quote className="w-8 h-8 text-amber-400" />
                </div>

                {/* Quote text */}
                <p className="text-gray-600 text-sm leading-relaxed mb-8">
                  {t.quote}
                </p>

                {/* Divider */}
                <div className="border-t border-gray-200 pt-6">
                  <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        src={t.image}
                        alt={t.name}
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    </div>
                    {/* Name & role */}
                    <div>
                      <p className="text-gray-800 font-bold">{t.name}</p>
                      <p className="text-gray-500 text-sm">{t.role}</p>
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
