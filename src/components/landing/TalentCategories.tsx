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
import { useState } from "react";

const workerTypes = [
  { title: "Digital Workers", icon: Laptop },
  { title: "Trade Workers", icon: ShoppingCart },
  { title: "Skill Workers", icon: Bone },
  { title: "Educator", icon: GraduationCap },
];

const categories = [
  { id: "programming", title: "Programming & IT", icon: Mail },
  { id: "design", title: "Design & Creative", icon: Scissors },
  { id: "marketing", title: "Digital Sales & Marketing", icon: BriefcaseBusiness },
  { id: "writing", title: "Writing & Translation", icon: Languages },
  { id: "video", title: "Video & Animation", icon: Video },
  { id: "ai", title: "AI Services", icon: BrainCircuit },
  { id: "music", title: "Music & Audio", icon: Music },
  { id: "finance", title: "Finance & Accounting", icon: Wallet },
  { id: "consulting", title: "Consulting", icon: Handshake },
  { id: "engineering", title: "Engineering & Architecture", icon: Wrench },
];

interface TalentCategoriesProps {
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string) => void;
}

export function TalentCategories({ selectedCategory, onSelectCategory }: TalentCategoriesProps) {
  const [showAll, setShowAll] = useState(false);
  const visibleCategories = showAll ? categories : categories.slice(0, 6);

  return (
    <section className="py-20 md:py-28 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#111827] mb-4">
            Browse by Category
          </h2>
          <p className="text-sm md:text-base text-[#6B7280] max-w-2xl mx-auto leading-relaxed">
            Find the perfect talent from our verified categories of skilled professionals.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-8"
        >
          {visibleCategories.map((cat, i) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <motion.button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                whileHover={{ y: -4, boxShadow: "0 10px 25px -5px rgba(26, 31, 54, 0.12)" }}
                whileTap={{ scale: 0.98 }}
                className={`bg-white rounded-2xl p-6 text-center cursor-pointer transition-all shadow-sm hover:shadow-md border-2 ${
                  isSelected ? "border-[#4F6AF5] bg-[#4F6AF5]/5" : "border-gray-200"
                }`}
              >
                <Icon size={32} className={`mx-auto mb-4 ${isSelected ? "text-[#4F6AF5]" : "text-gray-400"}`} />
                <h4 className={`font-semibold text-sm md:text-base ${isSelected ? "text-[#4F6AF5]" : "text-[#1A1F36]"}`}>{cat.title}</h4>
              </motion.button>
            );
          })}
        </motion.div>

        {/* View More Button */}
        {categories.length > 6 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-6 py-3 bg-white border-2 border-gray-200 text-[#1A1F36] font-semibold rounded-xl hover:border-[#4F6AF5] hover:text-[#4F6AF5] transition-all shadow-sm"
            >
              {showAll ? "Show Less" : "View More Categories"}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}