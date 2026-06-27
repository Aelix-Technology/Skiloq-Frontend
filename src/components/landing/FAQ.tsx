// src/components/landing/FAQ.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "How does Skiloq work?",
    answer: "Skiloq connects verified African professionals with businesses and clients looking for trusted talent. Workers create verified profiles, employers post opportunities, and the platform matches them based on skills, location, and trust scores. Payments are secured through escrow to protect both parties.",
  },
  {
    question: "How do I create an account?",
    answer: "Getting started is simple. Sign up using your phone number, verify your account with OTP authentication, complete your profile with your skills and experience, and you're ready to start exploring opportunities or hiring talent.",
  },
  {
    question: "Why do workers need verification?",
    answer: "Verification helps build trust between workers and employers. It ensures profiles are authentic and allows businesses to hire with confidence knowing they're working with qualified, verified professionals.",
  },
  {
    question: "How are payments protected?",
    answer: "All payments are secured through escrow protection. Employers fund payments before work begins, and funds are only released to the worker once the job is completed and approved, ensuring both parties are protected.",
  },
  {
    question: "What kind of jobs are available on Skiloq?",
    answer: "Skiloq offers a wide range of opportunities across multiple categories including digital services (web development, design, writing), trade skills (carpentry, plumbing, electrical work), professional services (consulting, accounting), and more.",
  },
  {
    question: "Is Skiloq available in my country?",
    answer: "Skiloq is currently expanding across Africa. We're working hard to make our platform available in more countries. Check our website or contact support to see if we're active in your region.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="py-20 md:py-28 bg-[#F5F7FA]">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#111827] tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-[#4B5563] text-sm md:text-base max-w-2xl mx-auto">
            Find immediate answers to our most frequently asked questions
          </p>
        </motion.div>

        {/* FAQs */}
        <div className="space-y-1">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="border-b border-[#E5E7EB]"
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between py-6 text-left"
                >
                  <span className="text-lg md:text-xl font-semibold text-[#111827]">
                    {faq.question}
                  </span>
                  <div className="w-8 h-8 rounded-full border border-[#4F6AF5] flex items-center justify-center flex-shrink-0 ml-4">
                    {isOpen ? (
                      <Minus size={16} className="text-[#4F6AF5]" />
                    ) : (
                      <Plus size={16} className="text-[#4F6AF5]" />
                    )}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6">
                        <p className="text-[#4B5563] text-sm md:text-base leading-relaxed">
                          {faq.answer}
                        </p>
                        <a href="#" className="inline-block mt-4 text-[#4F6AF5] text-sm font-medium hover:underline">
                          Read More
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
