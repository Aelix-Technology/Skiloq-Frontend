"use client";

import { motion } from "framer-motion";
import {
  MapPin,
  Clock,
  DollarSign,
  Briefcase,
} from "lucide-react";
import { useState } from "react";

interface Job {
  id: number;
  title: string;
  type: string;
  location: string;
  description: string;
  duration: string;
  level: string;
  price: string;
  category: string;
}

const jobs: Job[] = [
  // Programming & IT
  {
    id: 1,
    title: "Senior Frontend Developer",
    type: "Full-Time",
    location: "Remote",
    description: "Build and maintain responsive web applications for an African fintech startup.",
    duration: "6 Months",
    level: "Senior Level",
    price: "$3,500/month",
    category: "programming",
  },
  {
    id: 2,
    title: "Backend Engineer",
    type: "Contract",
    location: "Accra, Ghana",
    description: "Design and implement scalable APIs using Node.js and AWS.",
    duration: "3 Months",
    level: "Mid Level",
    price: "$2,800/month",
    category: "programming",
  },
  {
    id: 3,
    title: "DevOps Specialist",
    type: "Part-Time",
    location: "Lagos, Nigeria",
    description: "Optimize deployment pipelines and ensure high availability.",
    duration: "Ongoing",
    level: "Senior Level",
    price: "$150/hr",
    category: "programming",
  },
  {
    id: 4,
    title: "AI/ML Developer",
    type: "Freelance",
    location: "Nairobi, Kenya",
    description: "Build predictive models for a Kenyan agritech company.",
    duration: "4 Months",
    level: "Senior Level",
    price: "$3,000",
    category: "programming",
  },
  // Design & Creative
  {
    id: 5,
    title: "UI/UX Designer",
    type: "Full-Time",
    location: "Remote",
    description: "Create user-centered designs for a mobile health platform.",
    duration: "12 Months",
    level: "Senior Level",
    price: "$2,500/month",
    category: "design",
  },
  {
    id: 6,
    title: "Graphic Designer",
    type: "Freelance",
    location: "Johannesburg, SA",
    description: "Design brand identity and marketing materials.",
    duration: "6 Weeks",
    level: "Mid Level",
    price: "$1,200",
    category: "design",
  },
  {
    id: 7,
    title: "Motion Graphics Artist",
    type: "Project-Based",
    location: "Cape Town, SA",
    description: "Create animated explainer videos for an edtech startup.",
    duration: "2 Months",
    level: "Mid Level",
    price: "$2,000",
    category: "design",
  },
  // Digital Sales & Marketing
  {
    id: 8,
    title: "Digital Marketing Specialist",
    type: "Full-Time",
    location: "Kampala, Uganda",
    description: "Manage SEO, social media, and paid campaigns.",
    duration: "12 Months",
    level: "Mid Level",
    price: "$1,800/month",
    category: "marketing",
  },
  {
    id: 9,
    title: "Content Strategist",
    type: "Part-Time",
    location: "Remote",
    description: "Develop content strategy for a pan-African brand.",
    duration: "Ongoing",
    level: "Senior Level",
    price: "$100/hr",
    category: "marketing",
  },
  // Writing & Translation
  {
    id: 10,
    title: "Technical Writer",
    type: "Contract",
    location: "Dakar, Senegal",
    description: "Write documentation for software products.",
    duration: "3 Months",
    level: "Mid Level",
    price: "$1,500",
    category: "writing",
  },
  {
    id: 11,
    title: "Translator (English/French)",
    type: "Freelance",
    location: "Remote",
    description: "Translate website content for a regional e-commerce platform.",
    duration: "4 Weeks",
    level: "Entry Level",
    price: "$600",
    category: "writing",
  },
  // Video & Animation
  {
    id: 12,
    title: "Video Editor",
    type: "Project-Based",
    location: "Lagos, Nigeria",
    description: "Edit promotional videos for a Nigerian fashion brand.",
    duration: "2 Months",
    level: "Mid Level",
    price: "$1,800",
    category: "video",
  },
  {
    id: 13,
    title: "2D Animator",
    type: "Freelance",
    location: "Remote",
    description: "Create animated content for kids' learning platform.",
    duration: "3 Months",
    level: "Senior Level",
    price: "$2,200",
    category: "video",
  },
  // AI Services
  {
    id: 14,
    title: "Prompt Engineer",
    type: "Part-Time",
    location: "Remote",
    description: "Optimize prompts for AI-powered customer service tool.",
    duration: "Ongoing",
    level: "Mid Level",
    price: "$120/hr",
    category: "ai",
  },
  {
    id: 15,
    title: "Data Scientist",
    type: "Full-Time",
    location: "Nairobi, Kenya",
    description: "Analyze data to drive business decisions.",
    duration: "12 Months",
    level: "Senior Level",
    price: "$3,200/month",
    category: "ai",
  },
];

interface FeaturedJobsProps {
  selectedCategory: string | null;
}

export function FeaturedJobs({ selectedCategory }: FeaturedJobsProps) {
  const [showAllJobs, setShowAllJobs] = useState(false);

  const filteredJobs = jobs.filter((job) => {
    if (!selectedCategory) return true;
    return job.category === selectedCategory;
  });

  const visibleJobs = showAllJobs ? filteredJobs : filteredJobs.slice(0, 4);

  return (
    <section className="py-20 md:py-28 bg-gray-50 relative overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-[#4F6AF5]/10 px-5 py-2.5 rounded-full mb-6 mx-auto">
            <Briefcase className="w-4 h-4 text-[#4F6AF5]" />
            <span className="text-[#4F6AF5] text-xs font-semibold uppercase tracking-widest">
              Featured Jobs
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-5 leading-tight">
            {selectedCategory ? `Find ${selectedCategory} Jobs` : "Browse Featured Opportunities"}
          </h2>
          <p className="text-sm md:text-base text-gray-500 max-w-2xl mx-auto leading-relaxed">
            {selectedCategory
              ? `Explore verified job opportunities in ${selectedCategory} category.`
              : "Explore handpicked opportunities from trusted employers looking for verified professionals."}
          </p>
        </motion.div>

        {/* Job Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {visibleJobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="p-7">
                {/* Job Header */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1.5 bg-gray-100 text-gray-700 text-xs rounded-full font-medium">
                        {job.type}
                      </span>
                      <span className="px-3 py-1.5 bg-gray-100 text-gray-700 text-xs rounded-full font-medium">
                        {job.location}
                      </span>
                    </div>
                    <Briefcase className="w-4 h-4 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {job.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-5 leading-relaxed">
                  {job.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="flex items-center gap-1 text-gray-600 text-xs">
                    <Clock className="w-3.5 h-3.5" />
                    {job.duration}
                  </span>
                  <span className="flex items-center gap-1 text-gray-600 text-xs">
                    <MapPin className="w-3.5 h-3.5" />
                    {job.level}
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-1.5 text-gray-800 font-bold mb-6 text-lg">
                  <DollarSign className="w-5 h-5" />
                  {job.price}
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                  <button className="flex-1 py-3 border border-gray-300 text-gray-800 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-all">
                    Details
                  </button>
                  <button className="flex-1 py-3 bg-[#4F6AF5] hover:bg-[#3d56e0] text-white rounded-xl text-sm font-semibold transition-all">
                    Apply
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        {filteredJobs.length > 4 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <button
              onClick={() => setShowAllJobs(!showAllJobs)}
              className="px-8 py-3.5 bg-white border-2 border-gray-200 text-[#1A1F36] font-semibold rounded-xl hover:border-[#4F6AF5] hover:text-[#4F6AF5] transition-all shadow-sm"
            >
              {showAllJobs ? "Show Less" : "View All Jobs"}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}