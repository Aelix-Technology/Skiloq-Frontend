"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Clock, DollarSign, Briefcase, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";

const featuredJobs = [
  {
    id: 1,
    title: "Graphic Design",
    type: "Full-Time",
    location: "Remote",
    description: "Create visually compelling designs for digital and print media, including social media graphics, marketing materials, brand assets, and promotional content.",
    duration: "2-4 Weeks",
    level: "Intermediate Level",
    price: "$1,100",
  },
  {
    id: 2,
    title: "Web Development",
    type: "Part-Time",
    location: "Accra, Ghana",
    description: "Build and maintain responsive websites using React, Node.js, and modern web technologies. Collaborate with designers to implement pixel-perfect interfaces.",
    duration: "4-6 Weeks",
    level: "Senior Level",
    price: "$2,500",
  },
  {
    id: 3,
    title: "Content Writing",
    type: "Freelance",
    location: "Nairobi, Kenya",
    description: "Write SEO-optimized blog posts, articles, and social media content for tech startups across Africa. Help businesses grow their online presence.",
    duration: "1-2 Weeks",
    level: "Entry Level",
    price: "$600",
  },
  {
    id: 4,
    title: "UI/UX Design",
    type: "Contract",
    location: "Lagos, Nigeria",
    description: "Design intuitive user interfaces and experiences for mobile and web applications. Conduct user research, create wireframes, prototypes, and high-fidelity mockups.",
    duration: "3-5 Weeks",
    level: "Intermediate Level",
    price: "$1,800",
  },
  {
    id: 5,
    title: "Mobile App Development",
    type: "Full-Time",
    location: "Remote",
    description: "Develop cross-platform mobile applications using React Native. Work with backend APIs, implement user authentication, and optimize for performance.",
    duration: "6-8 Weeks",
    level: "Senior Level",
    price: "$3,200",
  },
  {
    id: 6,
    title: "Social Media Management",
    type: "Part-Time",
    location: "Johannesburg, SA",
    description: "Manage social media accounts for small businesses. Create content calendars, schedule posts, engage with audiences, and track performance metrics.",
    duration: "Ongoing",
    level: "Entry Level",
    price: "$400/month",
  },
];

export function FeaturedJobs() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide for desktop
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    const timer = setInterval(() => {
      if (scrollRef.current) {
        const cardWidth = 350 + 24; // 350px width + 24px gap
        const currentScroll = scrollRef.current.scrollLeft;
        const maxScroll = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
        
        if (currentScroll >= maxScroll - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollRef.current.scrollBy({ left: cardWidth, behavior: "smooth" });
        }
      }
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  // Manual navigation
  const scrollLeft = () => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      setCurrentIndex((prev) => (prev - 1 + featuredJobs.length) % featuredJobs.length);
    } else if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -350, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      setCurrentIndex((prev) => (prev + 1) % featuredJobs.length);
    } else if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 350, behavior: "smooth" });
    }
  };

  // Drag handlers for mobile
  const handleDragEnd = (event: any, info: any) => {
    if (info.offset.x < -50) {
      // Swiped left
      scrollRight();
    } else if (info.offset.x > 50) {
      // Swiped right
      scrollLeft();
    }
  };

  return (
    <section className="relative py-20 md:py-28 bg-gray-50">
      <div className="relative max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Jobs
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
            Explore handpicked opportunities from trusted employers looking for verified professionals.
          </p>
        </motion.div>

        {/* Mobile Stacked Cards */}
        <div className="md:hidden relative h-[550px]">
          <div className="relative w-full h-full">
            <AnimatePresence>
              {featuredJobs.map((job, idx) => {
                const offset = idx - currentIndex;
                if (Math.abs(offset) > 2) return null;

                return (
                  <motion.div
                    key={job.id}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.1}
                    onDragEnd={handleDragEnd}
                    initial={{
                      scale: 1 - Math.abs(offset) * 0.05,
                      y: Math.abs(offset) * 15,
                      x: 0,
                      zIndex: featuredJobs.length - Math.abs(offset),
                    }}
                    animate={{
                      scale: 1 - Math.abs(offset) * 0.05,
                      y: Math.abs(offset) * 15,
                      x: offset * 10,
                      zIndex: featuredJobs.length - Math.abs(offset),
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="absolute top-0 left-0 w-full"
                  >
                    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-lg h-full">
                      {/* Job Header */}
                      <div className="mb-5">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-md font-medium">
                              {job.type}
                            </span>
                            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-md font-medium">
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
                      <p className="text-gray-600 text-sm mb-4">
                        {job.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="flex items-center gap-1 text-gray-600 text-xs">
                          <Clock className="w-3 h-3" />
                          {job.duration}
                        </span>
                        <span className="flex items-center gap-1 text-gray-600 text-xs">
                          <MapPin className="w-3 h-3" />
                          {job.level}
                        </span>
                      </div>

                      {/* Price */}
                      <div className="flex items-center gap-1 text-gray-800 font-bold mb-5">
                        <DollarSign className="w-4 h-4" />
                        {job.price}
                      </div>

                      {/* Buttons */}
                      <div className="flex gap-3">
                        <button className="flex-1 py-2 border border-gray-300 text-gray-800 rounded-md text-sm font-semibold hover:bg-gray-50 transition-all">
                          Details
                        </button>
                        <button className="flex-1 py-2 bg-[#1A2B52] hover:bg-[#2a3b65] text-white rounded-md text-sm font-semibold transition-all">
                          Apply
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* Mobile Navigation Dots */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2">
              {featuredJobs.map((_, idx) => (
                <div
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2 h-2 rounded-full cursor-pointer transition-all ${
                    idx === currentIndex ? "w-6 bg-[#1A2B52]" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Desktop Slider */}
        <div className="hidden md:block relative">
          {/* Navigation Buttons */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-all"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-all"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>

          {/* Slider */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory px-2"
          >
            {featuredJobs.map((job, idx) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex-shrink-0 w-[350px] snap-center group"
              >
                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-xl transition-all duration-300 h-full">
                  {/* Job Header */}
                  <div className="mb-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-md font-medium">
                          {job.type}
                        </span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-md font-medium">
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
                  <p className="text-gray-600 text-sm mb-4">
                    {job.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="flex items-center gap-1 text-gray-600 text-xs">
                      <Clock className="w-3 h-3" />
                      {job.duration}
                    </span>
                    <span className="flex items-center gap-1 text-gray-600 text-xs">
                      <MapPin className="w-3 h-3" />
                      {job.level}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-1 text-gray-800 font-bold mb-5">
                    <DollarSign className="w-4 h-4" />
                    {job.price}
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3">
                    <button className="flex-1 py-2 border border-gray-300 text-gray-800 rounded-md text-sm font-semibold hover:bg-gray-50 transition-all">
                      Details
                    </button>
                    <button className="flex-1 py-2 bg-[#1A2B52] hover:bg-[#2a3b65] text-white rounded-md text-sm font-semibold transition-all">
                      Apply
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
