// src/components/landing/FeaturedJobs.tsx
"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, DollarSign, Briefcase } from "lucide-react";

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
    title: "Graphic Design",
    type: "Full-Time",
    location: "Remote",
    description: "Create visually compelling designs for digital and print media, including social media graphics, marketing materials, brand assets, and promotional content.",
    duration: "2-4 Weeks",
    level: "Intermediate Level",
    price: "$1,100",
  },
  {
    id: 3,
    title: "Graphic Design",
    type: "Full-Time",
    location: "Remote",
    description: "Create visually compelling designs for digital and print media, including social media graphics, marketing materials, brand assets, and promotional content.",
    duration: "2-4 Weeks",
    level: "Intermediate Level",
    price: "$1,100",
  },
  {
    id: 4,
    title: "Graphic Design",
    type: "Full-Time",
    location: "Remote",
    description: "Create visually compelling designs for digital and print media, including social media graphics, marketing materials, brand assets, and promotional content.",
    duration: "2-4 Weeks",
    level: "Intermediate Level",
    price: "$1,100",
  },
];

export function FeaturedJobs() {
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

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredJobs.map((job, idx) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-lg transition-all duration-300">
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
    </section>
  );
}
