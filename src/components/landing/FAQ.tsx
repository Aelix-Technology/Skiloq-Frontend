"use client";

import { motion } from "framer-motion";

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
];

export function FAQ() {
  return (
    <section id="faq" className="py-16 md:py-28 bg-[#F5F7FA]">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="heading-2 text-[#111827] mb-3 md:mb-4">
            Frequently Asked Questions
          </h2>
          <p className="body-text text-[#4B5563] max-w-2xl mx-auto">
            Find immediate answers to our most frequently asked questions
          </p>
        </motion.div>

        {/* FAQs */}
        <div className="space-y-0">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="border-b border-[#E5E7EB] py-6"
            >
              <h3 className="text-xl font-semibold text-[#111827] mb-3 font-[var(--font-heading)]">
                {faq.question}
              </h3>
              <p className="body-text text-[#4B5563] mb-3">
                {faq.answer}
              </p>
              <a href="#" className="inline-block text-[#4F6AF5] text-sm font-medium hover:underline">
                Read More
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
