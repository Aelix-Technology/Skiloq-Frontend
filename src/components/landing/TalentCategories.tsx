// src/components/landing/TalentCategories.tsx
"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const categories = [
  {
    title: "Digital & Remote",
    desc: "Developers, designers, VAs, copywriters — land remote jobs with global clients.",
    image: "/assets/images/worker-digital.jpg",
    href: "/register?category=digital",
    phase: false,
  },
  {
    title: "Trade & Skilled",
    desc: "Tailors, electricians, plumbers, mechanics — get booked through your calendar.",
    image: "/assets/images/worker-trade.jpg",
    href: "/register?category=trade",
    phase: false,
  },
  {
    title: "Educators & Tutors",
    desc: "Academic, language, music, coding tutors — sell session bundles.",
    image: "/assets/images/worker-educator.jpg",
    href: "#",
    phase: true,
  },
  {
    title: "Online Income",
    desc: "Data entry, transcription, micro-tasks — curated verified listings.",
    image: "/assets/images/worker-income.jpg",
    href: "#",
    phase: true,
  },
];

export function TalentCategories() {
  const router = useRouter();

  return (
    <section id="categories" className="py-16 md:py-24 bg-gray-50/50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
            Four ways to work
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Whatever your skill, there's a place for you on Skiloq
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => !cat.phase && router.push(cat.href)}
              className={`relative group overflow-hidden rounded-2xl bg-white border border-gray-100 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 ${
                cat.phase ? "opacity-70 cursor-default" : "cursor-pointer"
              }`}
            >
              {/* Image */}
              <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-semibold text-gray-900 mb-1">{cat.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{cat.desc}</p>
                {!cat.phase && (
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-accent mt-3 group-hover:gap-2 transition-all">
                    Get started <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </div>

              {/* Phase badge */}
              {cat.phase && (
                <span className="absolute top-3 right-3 bg-amber-50 text-amber-600 text-xs font-semibold px-2.5 py-1 rounded-full border border-amber-200">
                  <Sparkles className="w-3 h-3 inline mr-1" />
                  Phase 2
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}