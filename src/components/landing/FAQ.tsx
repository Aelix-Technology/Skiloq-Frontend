// src/components/landing/FAQ.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "What is Skiloq and how does it work?",
    answer: "Skiloq is Africa's #1 verified talent platform. Workers create profiles with proof of their skills — not just CV claims. Employers find verified talent, hire them, and payment is held securely in escrow until the work is completed. Payouts happen via Mobile Money (MoMo) within minutes.",
  },
  {
    question: "How is Skiloq different from Upwork or Fiverr?",
    answer: "Unlike global platforms, Skiloq is built specifically for African workers and employers. We support Mobile Money payments (MTN MoMo, Vodafone Cash, AirtelTigo), work on budget Android devices and 2G/3G networks, offer multi-language support (English, Twi, Hausa, French), and provide physical agent verification for trade workers — not just digital profiles.",
  },
  {
    question: "How do I get verified on Skiloq?",
    answer: "Verification happens in layers: 1) Phone OTP verification, 2) Government ID upload (Ghana Card, Passport, or Voter ID), 3) Skill assessments or portfolio submission, 4) Our team reviews your documents within 24 hours. For trade workers, a field agent may visit your workspace for physical verification.",
  },
  {
    question: "How does payment and escrow work?",
    answer: "When an employer hires you, they fund the payment into Skiloq's secure escrow. You complete the work, the employer marks it as complete, and after a 48-hour review window, the funds are automatically released to your wallet. You can withdraw to your MoMo account anytime. Platform fees start at 15% and decrease as you complete more jobs.",
  },
  {
    question: "What is the Trust Score and how is it calculated?",
    answer: "Your Trust Score is a composite rating from 0-100 based on: assessment results (25%), job completion rate (20%), on-time delivery rate (15%), dispute rate (15%), repeat-hire rate (15%), and peer vouches (10%). Higher scores unlock better badges (Rising Talent → Top Rated → Verified Expert), lower fees, and priority in search results.",
  },
  {
    question: "Can I use Skiloq on my phone?",
    answer: "Absolutely! Skiloq is designed mobile-first. It works as a Progressive Web App (PWA) that you can install on your home screen. It's optimized for budget Android devices (Tecno, Infinix) and works on 2G and 3G networks. No high-speed internet or expensive smartphone required.",
  },
  {
    question: "What types of jobs can I find or post?",
    answer: "We serve four categories: 1) Digital & Remote (developers, designers, VAs, copywriters), 2) Trade & Skilled (tailors, electricians, plumbers, mechanics), 3) Educators & Tutors (academic, language, music, coding), and 4) Online Income (data entry, transcription, micro-tasks). Categories 3 and 4 are coming in Phase 2.",
  },
  {
    question: "Is my personal information safe?",
    answer: "Yes. Your Ghana Card and personal documents are encrypted at rest (AES-256). Only a hash is stored in our database. We comply with Ghana's Data Protection Act. You can request full data deletion at any time. We never share your information with third parties without your consent.",
  },
  {
    question: "How do I get help if something goes wrong?",
    answer: "We have a dedicated dispute resolution system. If there's a disagreement, both parties submit evidence and our admin team reviews within 72 hours. For in-person trade services, we have an emergency SOS button that alerts your emergency contact and platform security. You can also reach us at hello@skiloq.com.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 md:py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-flex items-center gap-2 bg-accent/5 text-accent text-xs font-bold px-4 py-2 rounded-full border border-accent/10 mb-5 uppercase tracking-[0.15em]">
            <HelpCircle size={14} />
            Got Questions?
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Everything you need to know about Skiloq. Can&apos;t find what you&apos;re
            looking for?{" "}
            <a href="mailto:hello@skiloq.com" className="text-accent font-semibold hover:underline">
              Contact us
            </a>
            .
          </p>
        </div>

        {/* ── DESKTOP: Clean accordion ── */}
        <div className=" md:block divide-y divide-gray-100">
          {faqs.map((faq, i) => (
            <div key={i} className="py-1">
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between py-5 text-left group"
              >
                <span className="text-base font-semibold text-gray-900 group-hover:text-accent transition-colors pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-300 ${
                    openIndex === i ? "rotate-180 text-accent" : ""
                  }`}
                />
              </button>
              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="text-gray-500 leading-relaxed pb-5 text-sm">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* ── MOBILE: Card-style accordion ── */}
        <div className="md:hidden space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`rounded-2xl border transition-all duration-300 ${
                openIndex === i
                  ? "bg-white border-accent/20 shadow-lg"
                  : "bg-gray-50 border-gray-100"
              }`}
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="text-sm font-semibold text-gray-900 pr-3">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-300 ${
                    openIndex === i ? "rotate-180 text-accent" : ""
                  }`}
                />
              </button>
              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="text-gray-500 text-sm leading-relaxed px-5 pb-5">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
