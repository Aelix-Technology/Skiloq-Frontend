// src/components/landing/FAQ.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, MessageCircle } from "lucide-react";
import Link from "next/link";

const faqs = [
  {
    question: "What is Skiloq and how does it work?",
    answer: "Skiloq is Africa's verified talent marketplace. Workers prove skills, employers hire with confidence, and payments are held securely in escrow until work is completed.",
  },
  {
    question: "How is Skiloq different from Fiverr or Upwork?",
    answer: "Skiloq is built for Africa — supporting Mobile Money payments, low-data usage, multilingual access, and physical verification for trust-based hiring.",
  },
  {
    question: "How do I get verified?",
    answer: "Verification includes phone OTP, ID upload, skill validation, and optional physical verification for trade workers. Most accounts are approved within 24 hours.",
  },
  {
    question: "How does payment work?",
    answer: "Employers fund escrow before work begins. After completion and approval, funds are released instantly to your wallet and can be withdrawn via Mobile Money.",
  },
  {
    question: "Is Skiloq mobile friendly?",
    answer: "Yes. Skiloq is built as a lightweight PWA optimized for Android devices, low bandwidth, and offline-friendly performance.",
  },
  {
    question: "Is my data safe?",
    answer: "All personal data is encrypted using AES-256 standards. We comply with data protection laws and never share user data without consent.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="relative py-24 md:py-32 bg-[#1A1F36] text-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#4F6AF5]/10 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-[#4F6AF5]/10 blur-3xl rounded-full" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 md:px-6">
        <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-5">
            <HelpCircle size={14} className="text-[#4F6AF5]" />
            <span className="text-[11px] uppercase tracking-[0.15em] text-white/60">Frequently Asked Questions</span>
          </div>
          <h2 className="text-[34px] md:text-[52px] font-bold leading-tight mb-4">Everything you need to know</h2>
          <p className="text-white/60 text-[15px] max-w-xl mx-auto leading-7">Clear answers about how Skiloq works, payments, verification, and trust.</p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? "bg-white/10 border-white/15" : "bg-white/5 border-white/10 hover:bg-white/10"}`}
              >
                <button onClick={() => toggle(i)} className="w-full flex items-center justify-between px-5 py-5 text-left">
                  <span className={`text-[14px] md:text-[15px] font-semibold transition-colors ${isOpen ? "text-white" : "text-white/70"}`}>{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? "rotate-180 text-[#4F6AF5]" : "text-white/40"}`} />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                      <div className="px-5 pb-5">
                        <p className="text-white/60 text-[13px] leading-7">{faq.answer}</p>
                        <div className="mt-4 h-[1px] w-full bg-gradient-to-r from-transparent via-[#4F6AF5]/30 to-transparent" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-16 flex flex-col md:flex-row items-center justify-between gap-6 p-6 rounded-2xl bg-white/5 border border-white/10">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#4F6AF5]/10 flex items-center justify-center">
              <MessageCircle size={18} className="text-[#4F6AF5]" />
            </div>
            <div>
              <p className="font-semibold text-[14px]">Still have questions?</p>
              <p className="text-white/50 text-[12px]">Our support team is ready to help you anytime.</p>
            </div>
          </div>
          <Link href="mailto:hello@skiloq.com" className="px-5 py-3 rounded-lg bg-[#4F6AF5] text-white text-[13px] font-semibold hover:bg-[#3f5be0] transition">
            Contact Support →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}