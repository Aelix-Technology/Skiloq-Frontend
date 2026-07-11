"use client";
// src/app/page.tsx
import { useState } from "react";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { SocialProof } from "@/components/landing/SocialProof";
import { AboutUs } from "@/components/landing/AboutUs";
import { TalentCategories } from "@/components/landing/TalentCategories";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { HireTopTalent } from "@/components/landing/HireTopTalent";
import { FeaturedJobs } from "@/components/landing/FeaturedJobs";
import { FeaturedTalent } from "@/components/landing/FeaturedTalent";
import { Testimonials } from "@/components/landing/Testimonials";
import { FAQ } from "@/components/landing/FAQ";
import { Footer } from "@/components/landing/Footer";


export default function LandingPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <main className="min-h-screen overflow-x-hidden bg-white">
      <Navbar />
      <Hero />
      <TalentCategories
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
       <FeaturedTalent selectedCategory={selectedCategory} />
      <FeaturedJobs selectedCategory={selectedCategory} />
      <SocialProof />
      
      {/* Continuous gradient section with HireTopTalent, HowItWorks, AboutUs */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#1A1F36] via-[#2A3156] to-[#1A1F36]">
        {/* Floating blur effects for visual appeal */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#4F6AF5]/20 rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#6F8AFF]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] bg-[#4F6AF5]/15 rounded-full blur-3xl" />
        
        <HireTopTalent />
        <HowItWorks />
        <AboutUs />
      </section>
      
      <Testimonials />
       <FAQ />
      <Footer />
    </main>
  );
}
