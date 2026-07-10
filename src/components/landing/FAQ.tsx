"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    id: 1,
    question: "How does Skiloq work?",
    answer: "Skiloq connects verified African professionals with businesses and clients looking for trusted talent. Workers create verified profiles, employers post opportunities, and the platform matches them based on skills, location, and trust scores. Payments are secured through escrow to protect both parties.",
  },
  {
    id: 2,
    question: "How do I create an account?",
    answer: "Getting started is simple. Sign up using your phone number, verify your account with OTP authentication, complete your profile with your skills and experience, and you're ready to start exploring opportunities or hiring talent.",
  },
  {
    id: 3,
    question: "Why do workers need verification?",
    answer: "Verification helps build trust between workers and employers. It ensures profiles are authentic and allows businesses to hire with confidence knowing they're working with qualified, verified professionals.",
  },
  {
    id: 4,
    question: "How are payments protected?",
    answer: "All payments are secured through escrow protection. Employers fund payments before work begins, and funds are only released to the worker once the job is completed and approved, ensuring both parties are protected.",
  },
];

export function FAQ() {
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 md:py-32 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-[#4F6AF5]/10 px-4 py-2 rounded-full mb-5">
            <HelpCircle className="w-4 h-4 text-[#4F6AF5]" />
            <span className="text-[#4F6AF5] text-xs font-semibold uppercase tracking-widest">
              FAQ
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-5 leading-tight">
            Got questions? We've got answers
          </h2>
          <p className="text-sm md:text-base text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Find immediate answers to our most frequently asked questions about Skiloq.
          </p>
        </motion.div>

        {/* FAQs */}
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="border border-gray-200 rounded-2xl overflow-hidden bg-white hover:border-[#4F6AF5]/30 transition-colors"
            >
              <button
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                className="w-full flex items-center justify-between px-6 py-5 md:px-8 md:py-6 text-left"
              >
                <span className="text-base md:text-lg font-semibold text-gray-900 pr-4">
                  {faq.question}
                </span>
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[#4F6AF5] transition-all">
                  {openId === faq.id ? (
                    <Minus className="w-4 h-4" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                </div>
              </button>

              <AnimatePresence>
                {openId === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 md:px-8 md:pb-8">
                      <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
