// src/app/page.tsx
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { SocialProof } from "@/components/landing/SocialProof";
import { TalentCategories } from "@/components/landing/TalentCategories";
import { LanguageDiversity } from "@/components/landing/LanguageDiversity";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { BuiltForAfrica } from "@/components/landing/BuiltForAfrica";
import { Testimonials } from "@/components/landing/Testimonials";
import { FAQ } from "@/components/landing/FAQ";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";


export default function LandingPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-white">
      <Navbar />
      <Hero />
      <SocialProof />
     
      <HowItWorks />
      <BuiltForAfrica />
      <LanguageDiversity />
      <Testimonials />
      <div className="my-16 border-t border-gray-200" />
       <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
