// src/components/landing/TalentCategories.tsx
"use client";

import { motion } from "framer-motion";
import {
  Laptop,
  ShoppingCart,
  Bone,
  GraduationCap,
  Mail,
  Scissors,
  BriefcaseBusiness,
  Languages,
  Video,
  BrainCircuit,
  Music,
  Wallet,
  Handshake,
  Wrench,
} from "lucide-react";

const workerTypes = [
  { title: "Digital Workers", icon: Laptop },
  { title: "Trade Workers", icon: ShoppingCart },
  { title: "Skill Workers", icon: Bone },
  { title: "Educator", icon: GraduationCap },
];

const categories = [
  { title: "Programming & IT", icon: Mail },
  { title: "Design & Creative", icon: Scissors },
  { title: "Digital Sales & Marketing", icon: BriefcaseBusiness },
  { title: "Writing & Translation", icon: Languages },
  { title: "Video & Animation", icon: Video },
  { title: "AI Services", icon: BrainCircuit },
  { title: "Music & Audio", icon: Music },
  { title: "Finance & Accounting", icon: Wallet },
  { title: "Consulting", icon: Handshake },
  { title: "Engineering & Architecture", icon: Wrench },
];

export function TalentCategories() {
  return (
    <section className="py-20 md:py-28 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#111827] tracking-tight mb-4">
            Match with the right opportunities.
          </h2>
          <p className="text-[#6B7280] text-sm md:text-base max-w-3xl mx-auto">
            Don't just find a job find your fit. We bypass the clutter to deliver tailored career opportunities straight to you, based on what you do best.
          </p>
        </motion.div>

        {/* Worker Types */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {workerTypes.map((worker, i) => {
            const Icon = worker.icon;
            return (
              <motion.div
                key={i}
                whileHover={{ y: -4, scale: 1.02 }}
                className="bg-white border border-[#1A2B52] rounded-xl p-6 text-center cursor-pointer transition-all shadow-sm hover:shadow-md"
              >
                <Icon size={32} className="text-[#4F6AF5] mx-auto mb-3" />
                <span className="text-[#1A1F36] font-medium">{worker.title}</span>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Categories Header */}
        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-2xl md:text-3xl font-bold text-[#111827] text-center mb-8"
        >
          Categories
        </motion.h3>

        {/* Categories Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
        >
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={i}
                whileHover={{ y: -4, boxShadow: "0 10px 25px -5px rgba(26, 43, 82, 0.15)" }}
                className="bg-white border border-[#1A2B52] rounded-xl p-5 cursor-pointer transition-all shadow-sm hover:shadow-md"
              >
                <Icon size={24} className="text-[#4F6AF5] mb-3" />
                <h4 className="text-[#1A1F36] font-medium">{cat.title}</h4>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
