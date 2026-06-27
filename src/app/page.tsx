// src/app/page.tsx
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { SocialProof } from "@/components/landing/SocialProof";
import { TalentCategories } from "@/components/landing/TalentCategories";

import { HowItWorks } from "@/components/landing/HowItWorks";
import { HireTopTalent } from "@/components/landing/HireTopTalent";
import { FeaturedJobs } from "@/components/landing/FeaturedJobs";
import { Testimonials } from "@/components/landing/Testimonials";
import { FAQ } from "@/components/landing/FAQ";

import { Footer } from "@/components/landing/Footer";


export default function LandingPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-white">
      <Navbar />
      <Hero />
      <SocialProof />
      <HireTopTalent />
      <TalentCategories />
      <HowItWorks />
      <FeaturedJobs />
      
      <Testimonials />
       <FAQ />
    
      <Footer />
    </main>
  );
}
