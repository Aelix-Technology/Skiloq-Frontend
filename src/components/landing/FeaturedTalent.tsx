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
    { id: "motion", title: "Motion Graphics" },
  ],
  marketing: [
    { id: "all", title: "All" },
    { id: "seo", title: "SEO" },
    { id: "social", title: "Social Media" },
    { id: "content", title: "Content Strategy" },
    { id: "email", title: "Email Marketing" },
  ],
  writing: [
    { id: "all", title: "All" },
    { id: "copywriting", title: "Copywriting" },
    { id: "translation", title: "Translation" },
    { id: "blogging", title: "Blog Writing" },
    { id: "technical", title: "Technical Writing" },
  ],
  video: [
    { id: "all", title: "All" },
    { id: "videoediting", title: "Video Editing" },
    { id: "animation", title: "Animation" },
    { id: "motion", title: "Motion Graphics" },
    { id: "production", title: "Video Production" },
  ],
  ai: [
    { id: "all", title: "All" },
    { id: "prompts", title: "Prompt Engineering" },
    { id: "modeling", title: "AI Modeling" },
    { id: "nlp", title: "NLP" },
    { id: "data", title: "Data Science" },
  ],
  music: [
    { id: "all", title: "All" },
    { id: "production", title: "Music Production" },
    { id: "mixing", title: "Mixing & Mastering" },
    { id: "composition", title: "Composition" },
    { id: "sounddesign", title: "Sound Design" },
  ],
  finance: [
    { id: "all", title: "All" },
    { id: "accounting", title: "Accounting" },
    { id: "bookkeeping", title: "Bookkeeping" },
    { id: "tax", title: "Tax Preparation" },
    { id: "financialplanning", title: "Financial Planning" },
  ],
  consulting: [
    { id: "all", title: "All" },
    { id: "business", title: "Business Consulting" },
    { id: "strategy", title: "Strategy Consulting" },
    { id: "hr", title: "HR Consulting" },
    { id: "management", title: "Management Consulting" },
  ],
  engineering: [
    { id: "all", title: "All" },
    { id: "civil", title: "Civil Engineering" },
    { id: "mechanical", title: "Mechanical Engineering" },
    { id: "electrical", title: "Electrical Engineering" },
    { id: "architecture", title: "Architecture" },
  ],
};

const talents: Talent[] = [
  // Programming & IT
  {
    id: 1,
    name: "Kofi Mensah",
    role: "Senior Frontend Developer",
    location: "Accra, Ghana",
    trustScore: 99,
    verified: true,
    skills: ["React", "Next.js", "TypeScript"],
    bio: "Building high-performance web applications with modern JavaScript frameworks. 6+ years of experience.",
    hourlyRate: "$45/hr",
    image: "/assets/images/landing/Frame 279.png",
    category: "programming",
  },
  {
    id: 2,
    name: "Ama Asante",
    role: "Backend Engineer",
    location: "Lagos, Nigeria",
    trustScore: 97,
    verified: true,
    skills: ["Node.js", "Python", "PostgreSQL"],
    bio: "Designing scalable APIs and microservices. 5+ years of experience with cloud technologies.",
    hourlyRate: "$42/hr",
    image: "/assets/images/landing/Frame 280 (1).png",
    category: "programming",
  },
  {
    id: 3,
    name: "Kwame Boateng",
    role: "Full Stack Developer",
    location: "Nairobi, Kenya",
    trustScore: 96,
    verified: true,
    skills: ["React Native", "Express", "MongoDB"],
    bio: "End-to-end development from database to user interface. 4+ years experience.",
    hourlyRate: "$38/hr",
    image: "/assets/images/landing/Frame 280.png",
    category: "programming",
  },
  {
    id: 4,
    name: "Esi Yankah",
    role: "DevOps Engineer",
    location: "Cape Town, SA",
    trustScore: 95,
    verified: true,
    skills: ["AWS", "Docker", "Kubernetes"],
    bio: "Automating deployments and ensuring high availability. 3+ years experience.",
    hourlyRate: "$50/hr",
    image: "/assets/images/landing/Frame 288.png",
    category: "programming",
  },
  {
    id: 5,
    name: "Bisi Olajide",
    role: "AI/ML Specialist",
    location: "Kampala, Uganda",
    trustScore: 94,
    verified: true,
    skills: ["TensorFlow", "PyTorch", "NLP"],
    bio: "Building intelligent systems using machine learning. 5+ years experience.",
    hourlyRate: "$55/hr",
    image: "/assets/images/landing/Frame 279.png",
    category: "programming",
  },
  // Design & Creative
  {
    id: 6,
    name: "Zainab Abdullahi",
    role: "UI/UX Designer",
    location: "Abuja, Nigeria",
    trustScore: 98,
    verified: true,
    skills: ["Figma", "User Research", "Prototyping"],
    bio: "Creating intuitive user experiences with 5+ years in product design.",
    hourlyRate: "$35/hr",
    image: "/assets/images/landing/Frame 280 (1).png",
    category: "design",
  },
  {
    id: 7,
    name: "Lerato Mokoena",
    role: "Graphic Designer",
    location: "Johannesburg, SA",
    trustScore: 96,
    verified: true,
    skills: ["Adobe Creative Suite", "Branding", "Print Design"],
    bio: "Crafting visual identities for African startups. 4+ years experience.",
    hourlyRate: "$30/hr",
    image: "/assets/images/landing/Frame 279.png",
    category: "design",
  },
  {
    id: 8,
    name: "Tariq Kamau",
    role: "Motion Designer",
    location: "Nairobi, Kenya",
    trustScore: 95,
    verified: true,
    skills: ["After Effects", "Cinema 4D", "Animation"],
    bio: "Bringing ideas to life with motion graphics. 3+ years experience.",
    hourlyRate: "$40/hr",
    image: "/assets/images/landing/Frame 280.png",
    category: "design",
  },
  // Digital Sales & Marketing
  {
    id: 9,
    name: "Amaka Okafor",
    role: "Digital Marketer",
    location: "Onitsha, Nigeria",
    trustScore: 97,
    verified: true,
    skills: ["SEO", "Google Ads", "Social Media"],
    bio: "Growing online presence for businesses across Africa. 5+ years experience.",
    hourlyRate: "$28/hr",
    image: "/assets/images/landing/Frame 288.png",
    category: "marketing",
  },
  {
    id: 10,
    name: "Yaw Addo",
    role: "Content Strategist",
    location: "Kumasi, Ghana",
    trustScore: 94,
    verified: true,
    skills: ["Content Strategy", "Copywriting", "Analytics"],
    bio: "Creating data-driven content strategies. 4+ years experience.",
    hourlyRate: "$32/hr",
    image: "/assets/images/landing/Frame 279.png",
    category: "marketing",
  },
  // Writing & Translation
  {
    id: 11,
    name: "Fatoumata Diallo",
    role: "Technical Writer",
    location: "Dakar, Senegal",
    trustScore: 96,
    verified: true,
    skills: ["Technical Writing", "Documentation", "API Docs"],
    bio: "Simplifying complex technical concepts. 6+ years experience.",
    hourlyRate: "$35/hr",
    image: "/assets/images/landing/Frame 280 (1).png",
    category: "writing",
  },
  {
    id: 12,
    name: "Daniel Kimani",
    role: "Translator",
    location: "Nairobi, Kenya",
    trustScore: 95,
    verified: true,
    skills: ["English", "Swahili", "French"],
    bio: "Professional translation services for businesses. 5+ years experience.",
    hourlyRate: "$25/hr",
    image: "/assets/images/landing/Frame 280.png",
    category: "writing",
  },
  // Video & Animation
  {
    id: 13,
    name: "Ngozi Okoro",
    role: "Video Editor",
    location: "Port Harcourt, Nigeria",
    trustScore: 98,
    verified: true,
    skills: ["Premiere Pro", "Final Cut", "Color Grading"],
    bio: "Producing high-quality video content for brands. 4+ years experience.",
    hourlyRate: "$38/hr",
    image: "/assets/images/landing/Frame 288.png",
    category: "video",
  },
  {
    id: 14,
    name: "Sabelo Dube",
    role: "Animator",
    location: "Durban, SA",
    trustScore: 94,
    verified: true,
    skills: ["Blender", "Toon Boom", "2D Animation"],
    bio: "Creating engaging animations for various platforms. 3+ years experience.",
    hourlyRate: "$42/hr",
    image: "/assets/images/landing/Frame 279.png",
    category: "video",
  },
  // AI Services
  {
    id: 15,
    name: "Musa Sesay",
    role: "Prompt Engineer",
    location: "Freetown, Sierra Leone",
    trustScore: 95,
    verified: true,
    skills: ["Prompt Engineering", "GPT", "Claude"],
    bio: "Optimizing AI prompts for maximum effectiveness. 2+ years experience.",
    hourlyRate: "$45/hr",
    image: "/assets/images/landing/Frame 280 (1).png",
    category: "ai",
  },
  {
    id: 16,
    name: "Zola Ndlovu",
    role: "Data Scientist",
    location: "Gaborone, Botswana",
    trustScore: 97,
    verified: true,
    skills: ["Python", "R", "Machine Learning"],
    bio: "Extracting insights from data. 6+ years experience.",
    hourlyRate: "$50/hr",
    image: "/assets/images/landing/Frame 280.png",
    category: "ai",
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