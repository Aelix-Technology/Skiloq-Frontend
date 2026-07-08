"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, CheckCircle, ChevronRight, ChevronLeft } from "lucide-react";
import { useRef } from "react";

const talents = [
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
  },
];

export function FeaturedTalent() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -380, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 380, behavior: "smooth" });
    }
  };

  return (
    <section className="relative py-20 md:py-28 bg-white overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="heading-2 text-gray-900 mb-4">
            Featured Talents
          </h2>
          <p className="body-text text-gray-600 max-w-2xl mx-auto">
            Find the talent your business needs without the uncertainty.
          </p>
        </motion.div>

        {/* Talents Slider Container */}
        <div className="relative mb-20">
          {/* Navigation Buttons */}
          <button
            onClick={scrollLeft}
            className="absolute left-2 md:left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-all duration-200 hover:shadow-lg hidden md:flex"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <button
            onClick={scrollRight}
            className="absolute right-2 md:right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-[#4F6AF5] rounded-full shadow-md flex items-center justify-center hover:bg-[#3d56e0] transition-all duration-200 hover:shadow-lg"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          {/* Slider */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory px-0 md:px-2"
          >
            {talents.map((talent, index) => (
              <motion.div
                key={talent.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex-shrink-0 w-full sm:w-[340px] md:w-[360px] snap-center group"
              >
                <div className="bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all duration-200 border border-gray-100 h-full p-6">
                  {/* Profile Image & Top Info */}
                  <div className="flex items-start gap-4 mb-5">
                    {/* Profile Image (64px) */}
                    <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border border-gray-100">
                      <Image
                        src={talent.image}
                        alt={talent.name}
                        width={64}
                        height={64}
                        className="object-cover w-full h-full"
                        unoptimized
                      />
                    </div>
                    
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 text-lg mb-1">{talent.name}</h3>
                      <p className="text-gray-600 text-sm mb-3">{talent.role}</p>
                      <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                        <MapPin size={14} />
                        {talent.location}
                      </div>
                    </div>
                  </div>
                  {/* Verified Badge */}
                  {talent.verified && (
                    <div className="flex items-center gap-1 bg-[#4F6AF5]/10 text-[#4F6AF5] text-xs font-medium px-2.5 py-1 rounded-full">
                      <CheckCircle size={14} />
                      Verified
                    </div>
                  )}
                </div>

                {/* Trust Score */}
                <div className="flex items-center gap-2 mb-4 px-1">
                  <span className="text-[#4F6AF5] font-bold text-lg">{talent.trustScore}</span>
                  <span className="text-gray-500 text-sm">Trust Score</span>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-4 px-6">
                  {talent.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 bg-gray-50 text-gray-700 text-xs font-medium rounded-full border border-gray-100"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Bio */}
                <p className="text-gray-600 text-sm leading-relaxed mb-5 px-6 line-clamp-2">
                  {talent.bio}
                </p>

                {/* Hourly Rate & Button */}
                <div className="flex items-center justify-between px-6">
                  <span className="font-bold text-gray-900 text-base">{talent.hourlyRate}</span>
                  <button className="px-5 py-2.5 bg-[#4F6AF5] hover:bg-[#3d56e0] text-white text-sm font-semibold rounded-lg transition-all duration-200 hover:shadow-md">
                    View Profile
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-[#1A1F36] overflow-visible"
        >
          <div className="relative max-w-7xl mx-auto px-0">
            <div className="relative flex flex-col md:flex-row items-center">
              {/* Image */}
              <div className="relative w-full md:w-2/5 h-[340px] md:h-[440px] lg:h-[500px] -mt-20 md:-mt-24">
                <Image
                  src="/assets/images/landing/Img 1.png"
                  alt="Join Skiloq"
                  fill
                  className="object-contain object-center md:object-left-bottom"
                  unoptimized
                />
              </div>
              
              {/* Content */}
              <div className="w-full md:w-3/5 py-12 px-6 sm:py-16 sm:px-8 lg:py-20 lg:px-20 text-center md:text-left">
                <h3 className="heading-2 text-white mb-6">
                  Join a community of thousands of happy members.
                </h3>
                <button className="px-7 py-3.5 bg-white text-[#1A1F36] rounded-lg font-bold text-base hover:bg-gray-100 transition-all">
                  Join Skiloq
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
