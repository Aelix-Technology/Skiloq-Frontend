// src/components/landing/Testimonials.tsx
"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Akua Serwaa",
    role: "Frontend Developer",
    location: "Accra",
    quote: "Skiloq changed everything for me. I don't have a degree, but my Trust Score proves I can deliver. I've earned GHS 12,000+ building dashboards for fintech startups.",
    rating: 5,
    image: "/assets/images/testimonial-akua.jpg",
  },
  {
    name: "Kwame Boateng",
    role: "Electrician",
    location: "Kumasi",
    quote: "Before Skiloq, I relied on word-of-mouth. Now employers find me through my verified profile. The escrow system means I always get paid on time.",
    rating: 5,
    image: "/assets/images/testimonial-kwame.jpg",
  },
  {
    name: "Fatima Ibrahim",
    role: "Virtual Assistant",
    location: "Tamale",
    quote: "I work from Tamale for clients in Accra and Lagos. Skiloq made distance irrelevant. My verified skills speak louder than my location.",
    rating: 4,
    image: "/assets/images/testimonial-fatima.jpg",
  },
];

export function Testimonials() {
  return (
    <section className="py-16 md:py-24 bg-gray-50/50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
            Trusted by workers across Ghana
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Real stories from real people who built their careers on Skiloq
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 relative"
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 text-gray-100" />

              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`w-4 h-4 ${
                      s <= t.rating ? "text-amber-400 fill-amber-400" : "text-gray-200"
                    }`}
                  />
                ))}
              </div>

              <p className="text-sm text-gray-600 leading-relaxed mb-6 relative z-10">
                &quot;{t.quote}&quot;
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-accent-700 flex items-center justify-center text-white text-sm font-bold ring-2 ring-gray-100">
                  {t.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.role} / {t.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
