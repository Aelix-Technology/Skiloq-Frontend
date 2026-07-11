"use client";

import { motion } from "framer-motion";
import {
  MapPin,
  Clock,
  DollarSign,
  Briefcase,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useRef, useState } from "react";

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
  {
    id: 1,
    title: "Graphic Designer",
    type: "Full-Time",
    location: "Remote",
    description: "Create visually compelling designs for digital and print media, including social media graphics, marketing materials, brand assets, and promotional content.",
    duration: "2-4 Weeks",
    level: "Intermediate Level",
    price: "$1,100",
    category: "design",
  },
  {
    id: 2,
    title: "Web Developer",
    type: "Part-Time",
    location: "Accra, Ghana",
    description: "Build and maintain responsive websites using React, Node.js, and modern web technologies. Collaborate with designers to implement pixel-perfect interfaces.",
    duration: "4-6 Weeks",
    level: "Senior Level",
    price: "$2,500",
    category: "programming",
  },
  {
    id: 3,
    title: "Content Writer",
    type: "Freelance",
    location: "Nairobi, Kenya",
    description: "Write SEO-optimized blog posts, articles, and social media content for tech startups across Africa. Help businesses grow their online presence.",
    duration: "1-2 Weeks",
    level: "Entry Level",
    price: "$600",
    category: "writing",
  },
  {
    id: 4,
    title: "UI/UX Designer",
    type: "Contract",
    location: "Lagos, Nigeria",
    description: "Design intuitive user interfaces and experiences for mobile and web applications. Conduct user research, create wireframes, prototypes, and high-fidelity mockups.",
    duration: "3-5 Weeks",
    level: "Intermediate Level",
    price: "$1,800",
    category: "design",
  },
  {
    id: 5,
    title: "Mobile App Developer",
    type: "Full-Time",
    location: "Remote",
    description: "Develop cross-platform mobile applications using React Native. Work with backend APIs, implement user authentication, and optimize for performance.",
    duration: "6-8 Weeks",
    level: "Senior Level",
    price: "$3,200",
    category: "programming",
  },
  {
    id: 6,
    title: "Social Media Manager",
    type: "Part-Time",
    location: "Johannesburg, SA",
    description: "Manage social media accounts for small businesses. Create content calendars, schedule posts, engage with audiences, and track performance metrics.",
    duration: "Ongoing",
    level: "Entry Level",
    price: "$400/month",
    category: "marketing",
  },
];

interface FeaturedJobsProps {
  selectedCategory: string | null;
}

export function FeaturedJobs({ selectedCategory }: FeaturedJobsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showAllJobs, setShowAllJobs] = useState(false);

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