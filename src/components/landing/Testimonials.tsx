"use client";

import { motion } from "framer-motion";
import { Star, Quote, ShieldCheck } from "lucide-react";
import { useState, useEffect } from "react";
const testimonials = [
  {
    name: "Akua Serwaa",
    role: "Frontend Developer",
    location: "Accra",
    quote:
      "Skiloq changed everything for me. I don't have a degree, but my Trust Score proves I can deliver. I've earned GHS 12,000+ building dashboards for fintech startups.",
    rating: 5,
  },
  {
    name: "Kwame Boateng",
    role: "Electrician",
    location: "Kumasi",
    quote:
      "Before Skiloq, I relied on word-of-mouth. Now employers find me through my verified profile. The escrow system means I always get paid on time.",
    rating: 5,
  },
  {
    name: "Fatima Ibrahim",
    role: "Virtual Assistant",
    location: "Tamale",
    quote:
      "I work from Tamale for clients in Accra and Lagos. Skiloq made distance irrelevant. My verified skills speak louder than my location.",
    rating: 4,
  },
];

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating
              ? "text-amber-400 fill-amber-400"
              : "text-gray-200"
          }`}
        />
      ))}
    </div>
  );
}

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000); // 5s autoplay

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white">

      {/* Ambient glow */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 left-1/2 w-[600px] h-[600px] bg-blue-200 blur-[140px] opacity-40 rounded-full" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-200 blur-[140px] opacity-30 rounded-full" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
            Built on trust, proven by people
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Real workers. Verified skills. Transparent earnings.
          </p>
        </div>
{/* MOBILE SLIDESHOW */}
<div className="md:hidden relative">

  {/* viewport */}
  <div className="overflow-hidden rounded-3xl">
    <div
      className="flex transition-transform duration-700 ease-in-out"
      style={{
        transform: `translateX(-${activeIndex * 100}%)`,
      }}
    >
      {testimonials.map((t) => (
        <div
          key={t.name}
          className="min-w-full neon-border p-6 bg-white/70 backdrop-blur-xl border border-white/40"
        >
          {/* Trust badge */}
          <div className="flex items-center gap-2 mb-3">
            <div className="trust-pulse w-2.5 h-2.5 rounded-full bg-blue-900" />
            <span className="text-xs text-gray-500 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-blue-900" />
              Verified Worker
            </span>
          </div>

          <Quote className="w-9 h-9 text-gray-200 mb-3" />

          <Stars rating={t.rating} />

          <p className="mt-4 text-sm text-gray-600 leading-relaxed">
            “{t.quote}”
          </p>

          <div className="mt-6 flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-900 to-indigo-600 flex items-center justify-center text-white font-semibold">
              {t.name.split(" ").map((n) => n[0]).join("")}
            </div>

            <div>
              <p className="text-sm font-semibold">{t.name}</p>
              <p className="text-xs text-gray-400">
                {t.role} · {t.location}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>

  {/* DOT INDICATORS */}
  <div className="flex justify-center gap-2 mt-5">
    {testimonials.map((_, i) => (
      <button
        key={i}
        onClick={() => setActiveIndex(i)}
        className={`h-2 rounded-full transition-all duration-300 ${
          activeIndex === i
            ? "w-6 bg-blue-900"
            : "w-2 bg-gray-300"
        }`}
      />
    ))}
  </div>
</div>
        

        {/* DESKTOP: spotlight + grid hybrid */}
        <div className="hidden md:grid grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative group"
            >
              {/* outer neon layer */}
              <div className="neon-border rounded-3xl p-[1px] group-hover:scale-[1.02] transition-transform duration-300">

                {/* inner glass card */}
                <div className="relative p-7 rounded-3xl bg-white/70 backdrop-blur-xl border border-white/40 shadow-md group-hover:shadow-xl transition-all duration-300">

                  {/* Trust indicator */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="trust-pulse w-2.5 h-2.5 rounded-full bg-blue-900" />
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-blue-900" />
                      Verified Worker
                    </span>
                  </div>

                  <Quote className="absolute top-5 right-5 w-10 h-10 text-gray-100" />

                  <Stars rating={t.rating} />

                  <p className="mt-5 text-sm text-gray-600 leading-relaxed">
                    “{t.quote}”
                  </p>

                  <div className="mt-8 flex items-center gap-3 pt-5 border-t border-gray-100">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-900 to-indigo-600 flex items-center justify-center text-white font-semibold">
                      {t.name.split(" ").map((n) => n[0]).join("")}
                    </div>

                    <div>
                      <p className="text-sm font-semibold">{t.name}</p>
                      <p className="text-xs text-gray-400">
                        {t.role} · {t.location}
                      </p>
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