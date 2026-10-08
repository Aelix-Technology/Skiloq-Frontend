// src/components/onboarding/OnboardingWizard.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { ChevronLeft, ChevronRight, Check, ShieldCheck, Sparkles, HelpCircle } from "lucide-react";
import { useOnboardingStore } from "@/stores/onboarding.store";
import { useAuthStore } from "@/stores/auth.store";
import { OnboardingProgress } from "./OnboardingProgress";
import { CategorySelection } from "./steps/CategorySelection";
import { IdentityUpload } from "./steps/IdentityUpload";
import { ProfileSetup } from "./steps/ProfileSetup";
import { SkillTagSelection } from "./steps/SkillTagSelection";
import { SkillAssessment } from "./steps/SkillAssessment";
import { PortfolioSubmission } from "./steps/PortfolioSubmission";
import type { WorkerCategory, AssessmentResult } from "@/types/onboarding";

const TOTAL_STEPS = 6;

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -60 : 60,
    opacity: 0,
  }),
};

export function OnboardingWizard() {
  const router = useRouter();
  const [direction, setDirection] = useState(0);

  const {
    currentStep,
    category,
    identityDoc,
    profile,
    selectedSkills,
    assessmentResult,
    portfolio,
    setStep,
    setCategory,
    setIdentityDoc,
    setProfile,
    toggleSkill,
    setAssessmentResult,
    addPortfolioItem,
    removePortfolioItem,
    completeOnboarding,
  } = useOnboardingStore();

  const setOnboardingStep = useAuthStore((s) => s.setOnboardingStep);
  const [isCompleting, setIsCompleting] = useState(false);

  // Validation per step
  const canProceed = (): boolean => {
    switch (currentStep) {
      case 1:
        return category !== null;
      case 2:
        return (
          identityDoc.frontFile !== null &&
          (identityDoc.documentType === "passport" || identityDoc.backFile !== null)
        );
      case 3:
        return (
          profile.bio.trim().length >= 20 &&
          profile.location_district !== "" &&
          profile.hourly_rate_ghs > 0
        );
      case 4:
        return selectedSkills.length > 0;
      case 5:
        return assessmentResult !== null;
      case 6:
        return portfolio.length >= 2;
      default:
        return false;
    }
  };

  const getMissingRequirementHint = (): string => {
    switch (currentStep) {
      case 1:
        return "Select a primary category to continue";
      case 2:
        return identityDoc.documentType === "passport"
          ? "Upload passport photo to continue"
          : "Upload front and back ID images to continue";
      case 3:
        if (profile.bio.trim().length < 20) return "Provide at least 20 characters in your bio";
        if (!profile.location_district) return "Select your operational district";
        if (profile.hourly_rate_ghs <= 0) return "Set an hourly rate greater than 0";
        return "";
      case 4:
        return "Select at least 1 skill tag to continue";
      case 5:
        return "Complete the quick assessment quiz to continue";
      case 6:
        return `Add ${Math.max(0, 2 - portfolio.length)} more work sample(s) to finish`;
      default:
        return "";
    }
  };

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS && canProceed()) {
      setDirection(1);
      const next = currentStep + 1;
      setStep(next);
      setOnboardingStep(next);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setDirection(-1);
      const prev = currentStep - 1;
      setStep(prev);
      setOnboardingStep(prev);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleJumpToStep = (step: number) => {
    if (step < currentStep) {
      setDirection(step > currentStep ? 1 : -1);
      setStep(step);
      setOnboardingStep(step);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleComplete = () => {
    if (!canProceed()) return;
    setIsCompleting(true);

    setTimeout(() => {
      completeOnboarding();
      setOnboardingStep(TOTAL_STEPS);
      toast.success("Onboarding complete! Welcome to the Skiloq Network.");
      router.push("/worker/dashboard");
      setIsCompleting(false);
    }, 1500);
  };

  const canGoBack = currentStep > 1;
  const isLastStep = currentStep === TOTAL_STEPS;
  const isAllowedToProceed = canProceed();
  const requirementHint = !isAllowedToProceed ? getMissingRequirementHint() : "";

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col selection:bg-blue-100 selection:text-blue-900">
      {/* ── Top Navigation Bar ── */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-gray-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          {/* Left: Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-[#2563EB] to-indigo-700 rounded-2xl flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <span className="text-white font-extrabold text-lg">S</span>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl text-gray-900 leading-none tracking-tight">
                Skiloq
              </span>
              <span className="text-[11px] font-semibold text-blue-600 tracking-wider uppercase mt-0.5">
                Worker Verification
              </span>
            </div>
          </Link>

          {/* Right: Security & Exit */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Identity Encrypted</span>
            </div>

            <button
              type="button"
              onClick={() => router.push("/worker/dashboard")}
              className="text-xs font-bold text-gray-500 hover:text-gray-900 px-3 py-1.5 rounded-xl hover:bg-gray-100 transition-colors"
            >
              Save & Exit
            </button>
          </div>
        </div>
      </header>

      {/* ── Main Container (Spacious & Breathable) ── */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col justify-between">
        <div className="space-y-8">
          {/* Progress Track Section with ample breathing room */}
          <div className="bg-white rounded-2xl border border-gray-200/80 p-5 sm:p-6 shadow-xs">
            <OnboardingProgress
              currentStep={currentStep}
              onStepClick={handleJumpToStep}
            />
          </div>

          {/* Elevated Step Content Card */}
          <div className="bg-white rounded-3xl border border-gray-200/90 shadow-[0_20px_50px_-20px_rgba(15,23,42,0.06)] p-6 sm:p-10 md:p-12 relative overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentStep}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.28, ease: "easeInOut" }}
              >
                {currentStep === 1 && (
                  <CategorySelection
                    selected={category}
                    onSelect={(cat: WorkerCategory) => setCategory(cat)}
                  />
                )}

                {currentStep === 2 && (
                  <IdentityUpload
                    identityDoc={identityDoc}
                    onUpdate={setIdentityDoc}
                  />
                )}

                {currentStep === 3 && (
                  <ProfileSetup
                    profile={profile}
                    onUpdate={setProfile}
                  />
                )}

                {currentStep === 4 && category && (
                  <SkillTagSelection
                    category={category}
                    selectedSkills={selectedSkills}
                    onToggleSkill={toggleSkill}
                  />
                )}

                {currentStep === 5 && (
                  <SkillAssessment
                    category={category}
                    onComplete={(result: AssessmentResult) => setAssessmentResult(result)}
                  />
                )}

                {currentStep === 6 && (
                  <PortfolioSubmission
                    items={portfolio}
                    onAddItem={addPortfolioItem}
                    onRemoveItem={removePortfolioItem}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ── Navigation Dock (Generous Padding & Responsive) ── */}
        <div className="pt-8 mt-4">
          <div className="bg-white rounded-2xl border border-gray-200/90 shadow-sm p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Left: Back button & hint */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
              <button
                type="button"
                onClick={handleBack}
                disabled={!canGoBack}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-gray-200 font-bold text-sm text-gray-700 hover:bg-gray-50 transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              {requirementHint && (
                <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200/80 sm:hidden">
                  {requirementHint}
                </span>
              )}
            </div>

            {/* Center Hint (Desktop) */}
            <div className="hidden sm:block text-center">
              {requirementHint ? (
                <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200/80">
                  ⚠️ {requirementHint}
                </span>
              ) : (
                <span className="text-xs font-semibold text-gray-400">
                  Step {currentStep} of {TOTAL_STEPS} • All changes auto-saved
                </span>
              )}
            </div>

            {/* Right: Continue or Complete */}
            <div className="w-full sm:w-auto">
              {!isLastStep ? (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!isAllowedToProceed}
                  className="w-full sm:w-auto px-7 py-3 rounded-xl font-bold text-sm text-white bg-[#2563EB] hover:bg-[#1D4ED8] transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_8px_20px_-6px_rgba(37,99,235,0.4)] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Continue</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleComplete}
                  disabled={!isAllowedToProceed || isCompleting}
                  className="w-full sm:w-auto px-7 py-3 rounded-xl font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_8px_20px_-6px_rgba(16,185,129,0.4)] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isCompleting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Completing...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>Complete Onboarding</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="py-6 text-center text-xs text-gray-400 border-t border-gray-100 bg-white">
        <p>&copy; {new Date().getFullYear()} Skiloq Technologies Inc. • Encrypted Identity & Skill Verification Network</p>
      </footer>
    </div>
  );
}
