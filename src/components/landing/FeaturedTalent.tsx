"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  MapPin,
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  Users,
} from "lucide-react";
import { useRef, useState } from "react";

interface Subcategory {
  id: string;
  title: string;
}

interface Talent {
  id: number;
  name: string;
  role: string;
  location: string;
  trustScore: number;
  verified: boolean;
  skills: string[];
  bio: string;
  hourlyRate: string;
  image: string;
  category: string;
}

const subcategoriesByCategory: Record<string, Subcategory[]> = {
  programming: [
    { id: "all", title: "All" },
    { id: "frontend", title: "Frontend" },
    { id: "backend", title: "Backend" },
    { id: "fullstack", title: "Full Stack" },
    { id: "dotnet", title: ".NET" },
    { id: "java", title: "Java" },
    { id: "python", title: "Python" },
    { id: "devops", title: "DevOps" },
    { id: "cybersecurity", title: "Cybersecurity" },
    { id: "aiml", title: "AI/ML" },
  ],
  design: [
    { id: "all", title: "All" },
    { id: "ui", title: "UI/UX" },
    { id: "graphic", title: "Graphic Design" },
    { id: "product", title: "Product Design" },
  ],
  marketing: [
    { id: "all", title: "All" },
    { id: "seo", title: "SEO" },
    { id: "social", title: "Social Media" },
    { id: "content", title: "Content Strategy" },
  ],
  writing: [
    { id: "all", title: "All" },
    { id: "copywriting", title: "Copywriting" },
    { id: "translation", title: "Translation" },
  ],
  video: [
    { id: "all", title: "All" },
    { id: "videoediting", title: "Video Editing" },
    { id: "animation", title: "Animation" },
  ],
  ai: [
    { id: "all", title: "All" },
    { id: "prompts", title: "Prompt Engineering" },
    { id: "modeling", title: "AI Modeling" },
  ],
};

const talents: Talent[] = [
  {
    id: 1,
    name: "Muqadas Olasunkanmi",
    role: "Senior Product Designer",
    location: "Lagos, Nigeria",
    trustScore: 98,
    verified: true,
    skills: ["Figma", "UI Design", "Prototyping"],
    bio: "Passionate about creating intuitive user experiences that solve real problems. 5+ years of experience designing digital products for African startups.",
    hourlyRate: "$35/hr",
    image: "/assets/images/landing/Frame 279.png",
    category: "design",
  },
  {
    id: 2,
    name: "Jenipha Amara",
    role: "Full Stack Developer",
    location: "Accra, Ghana",
    trustScore: 97,
    verified: true,
    skills: ["React", "Node.js", "TypeScript"],
    bio: "Building scalable web applications that deliver exceptional performance. 4+ years of experience with modern JS frameworks.",
    hourlyRate: "$40/hr",
    image: "/assets/images/landing/Frame 280 (1).png",
    category: "programming",
  },
  {
    id: 3,
    name: "Kwame Asante",
    role: "Mobile App Developer",
    location: "Nairobi, Kenya",
    trustScore: 96,
    verified: true,
    skills: ["React Native", "iOS", "Android"],
    bio: "Crafting seamless mobile experiences for both iOS and Android platforms. 3+ years of experience.",
    hourlyRate: "$38/hr",
    image: "/assets/images/landing/Frame 280.png",
    category: "programming",
  },
  {
    id: 4,
    name: "Fatima Abubakar",
    role: "Digital Marketer",
    location: "Kampala, Uganda",
    trustScore: 95,
    verified: true,
    skills: ["SEO", "Social Media", "Content Strategy"],
    bio: "Helping businesses grow their online presence through data-driven marketing strategies. 5+ years experience.",
    hourlyRate: "$30/hr",
    image: "/assets/images/landing/Frame 288.png",
    category: "marketing",
  },
  {
    id: 5,
    name: "David Mensah",
    role: "Content Strategist",
    location: "Johannesburg, SA",
    trustScore: 94,
    verified: true,
    skills: ["Copywriting", "Editing", "Brand Voice"],
    bio: "Telling compelling stories that resonate with audiences. 6+ years of experience in content creation.",
    hourlyRate: "$32/hr",
    image: "/assets/images/landing/Frame 279.png",
    category: "writing",
  },
];

interface FeaturedTalentProps {
  selectedCategory: string | null;
}

export function FeaturedTalent({ selectedCategory }: FeaturedTalentProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState("all");
  const [showAllTalents, setShowAllTalents] = useState(false);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -280, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 280, behavior: "smooth" });
    }
  };

  const activeSubcategories = selectedCategory && subcategoriesByCategory[selectedCategory]
    ? subcategoriesByCategory[selectedCategory]
    : [{ id: "all", title: "All" }];

  const filteredTalents = talents.filter((talent) => {
    if (!selectedCategory) return true;
    return talent.category === selectedCategory;
  });

  const visibleTalents = showAllTalents
    ? filteredTalents
    : filteredTalents.slice(0, 4);

  return (
    <section className="py-20 md:py-28 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-[#4F6AF5]/5 to-transparent pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-[#4F6AF5]/10 px-5 py-2.5 rounded-full mb-6 mx-auto">
            <Users className="w-4 h-4 text-[#4F6AF5]" />
            <span className="text-[#4F6AF5] text-xs font-semibold uppercase tracking-widest">
              Featured Talents
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-5 leading-tight">
            {selectedCategory ? `Find ${selectedCategory} Experts` : "Meet Verified African Professionals"}
          </h2>
          <p className="text-sm md:text-base text-gray-500 max-w-2xl mx-auto leading-relaxed">
            {selectedCategory
              ? `Browse verified professionals in ${selectedCategory} category.`
              : "Find the talent your business needs without the uncertainty."}
          </p>
        </motion.div>

        {/* Subcategories */}
        <div className="relative mb-12">
          <div className="flex items-center gap-2">
            {/* Left Arrow */}
            <button
              onClick={scrollLeft}
              className="hidden md:flex flex-shrink-0 w-10 h-10 bg-white rounded-full border border-gray-200 items-center justify-center text-gray-700 hover:border-[#4F6AF5] hover:text-[#4F6AF5] transition-all shadow-sm"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Scrollable Subcategories */}
            <div
              ref={scrollRef}
              className="flex gap-3 overflow-x-auto scrollbar-hide px-1 flex-1"
            >
              {activeSubcategories.map((subcat) => (
                <button
                  key={subcat.id}
                  onClick={() => setSelectedSubcategory(subcat.id)}
                  className={`flex-shrink-0 px-4 py-2.5 rounded-full font-medium text-sm transition-all ${
                    selectedSubcategory === subcat.id
                      ? "bg-[#4F6AF5] text-white shadow-md"
                      : "bg-white border border-gray-200 text-gray-700 hover:border-[#4F6AF5]/50"
                  }`}
                >
                  {subcat.title}
                </button>
              ))}
            </div>

            {/* Right Arrow */}
            <button
              onClick={scrollRight}
              className="hidden md:flex flex-shrink-0 w-10 h-10 bg-white rounded-full border border-gray-200 items-center justify-center text-gray-700 hover:border-[#4F6AF5] hover:text-[#4F6AF5] transition-all shadow-sm"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Talent Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {visibleTalents.map((talent, index) => (
            <motion.div
              key={talent.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              {/* Top Section */}
              <div className="p-7">
                <div className="flex items-start gap-5 mb-6">
                  {/* Profile Image */}
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border-3 border-gray-100 flex-shrink-0">
                    <Image
                      src={talent.image}
                      alt={talent.name}
                      width={96}
                      height={96}
                      className="object-cover w-full h-full"
                      unoptimized
                    />
                  </div>
                  {/* Info */}
                  <div className="flex-1 pt-1">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 className="font-bold text-gray-900 text-lg">{talent.name}</h3>
                      {talent.verified && (
                        <div className="flex items-center gap-1.5 bg-[#4F6AF5]/10 text-[#4F6AF5] text-xs font-semibold px-3 py-1.5 rounded-full">
                          <CheckCircle size={14} />
                          Verified
                        </div>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{talent.role}</p>
                    <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                      <MapPin size={14} />
                      {talent.location}
                    </div>
                  </div>
                </div>

                {/* Trust Score */}
                <div className="flex items-center gap-2 mb-5">
                  <span className="font-bold text-[#4F6AF5] text-xl">{talent.trustScore}</span>
                  <span className="text-gray-500 text-sm">Trust Score</span>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {talent.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 bg-gray-100 text-gray-700 text-xs font-medium rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Bio */}
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {talent.bio}
                </p>

                {/* Hourly Rate & Button */}
                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-900 text-base">{talent.hourlyRate}</span>
                  <button className="px-5 py-3 bg-[#4F6AF5] hover:bg-[#3d56e0] text-white text-sm font-semibold rounded-xl transition-all shadow-sm">
                    View Profile
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        {filteredTalents.length > 4 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <button
              onClick={() => setShowAllTalents(!showAllTalents)}
              className="px-8 py-3.5 bg-white border-2 border-gray-200 text-[#1A1F36] font-semibold rounded-xl hover:border-[#4F6AF5] hover:text-[#4F6AF5] transition-all shadow-sm"
            >
              {showAllTalents ? "Show Less" : "View All Talents"}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}