// src/components/onboarding/OnboardingWizard.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { useOnboardingStore } from "@/stores/onboarding.store";
import { useAuthStore } from "@/stores/auth.store";
import { OnboardingProgress } from "./OnboardingProgress";
import { CategorySelection } from "./steps/CategorySelection";
import { IdentityUpload } from "./steps/IdentityUpload";
import { ProfileSetup } from "./steps/ProfileSetup";
import { SkillTagSelection } from "./steps/SkillTagSelection";
import { SkillAssessment } from "./steps/SkillAssessment";
import { PortfolioSubmission } from "./steps/PortfolioSubmission";
import type { WorkerCategory, AssessmentResult, PortfolioItem } from "@/types/onboarding";

const TOTAL_STEPS = 6;

// Direction for slide animation
const slideVariants = {
  enter: (direction: number) => ({ x: direction > 0 ? 200 : -200, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction > 0 ? -200 : 200, opacity: 0 }),
};

export function OnboardingWizard() {
  const router = useRouter();
  const [direction, setDirection] = useState(0);

  const {
    currentStep, category, identityDoc, profile,
    selectedSkills, assessmentResult, portfolio,
    setStep, setCategory, setIdentityDoc, setProfile,
    toggleSkill, setSelectedSkills,
    setAssessmentResult, addPortfolioItem, removePortfolioItem,
    completeOnboarding,
  } = useOnboardingStore();

  const setOnboardingStep = useAuthStore((s) => s.setOnboardingStep);
  const [isCompleting, setIsCompleting] = useState(false);

  // Check if current step is valid to proceed
  const canProceed = (): boolean => {
    switch (currentStep) {
      case 1: return category !== null;
      case 2: return identityDoc.frontFile !== null;
      case 3:
        return profile.bio.length >= 20 &&
               profile.location_district !== "" &&
               profile.hourly_rate_ghs > 0;
      case 4: return selectedSkills.length > 0;
      case 5: return assessmentResult !== null;
      case 6: return portfolio.length >= 2;
      default: return false;
    }
  };

  // Navigate to next step
  const handleNext = () => {
    if (currentStep < TOTAL_STEPS && canProceed()) {
      setDirection(1);
      const next = currentStep + 1;
      setStep(next);
      setOnboardingStep(next);
    }
  };

  // Navigate to previous step
  const handleBack = () => {
    if (currentStep > 1) {
      setDirection(-1);
      const prev = currentStep - 1;
      setStep(prev);
      setOnboardingStep(prev);
    }
  };

  // Jump to a specific step (via progress bar)
  const handleJumpToStep = (step: number) => {
    // Only allow jumping to completed steps or the current one
    if (step <= currentStep) {
      setDirection(step > currentStep ? 1 : -1);
      setStep(step);
      setOnboardingStep(step);
    }
  };

  // Complete onboarding
  const handleComplete = () => {
    if (!canProceed()) return;
    setIsCompleting(true);

    // Simulate API call
    setTimeout(() => {
      completeOnboarding();
      setOnboardingStep(TOTAL_STEPS);
      toast.success("Onboarding complete! Welcome to Skiloq.");
      router.push("/worker/dashboard");
      setIsCompleting(false);
    }, 2000);
  };

  // Step titles for the header
  const stepTitles: Record<number, string> = {
    1: "Choose your category",
    2: "Verify your identity",
    3: "Set up your profile",
    4: "Select your skills",
    5: "Prove your skills",
    6: "Show your work",
  };

  // Check if we can go back (not on first step)
  const canGoBack = currentStep > 1;
  // Check if this is the last step
  const isLastStep = currentStep === TOTAL_STEPS;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* ── Header ── */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-100">
        <div className="max-w-lg mx-auto px-4 py-4">
          {/* Step title */}
          <div className="flex items-center gap-3 mb-3">
            {canGoBack && (
              <button
                onClick={handleBack}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-gray-500" />
              </button>
            )}
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider">
                Step {currentStep} of {TOTAL_STEPS}
              </p>
              <h2 className="text-base font-semibold text-gray-900">
                {stepTitles[currentStep]}
              </h2>
            </div>
          </div>

          {/* Progress bar */}
          <OnboardingProgress
            currentStep={currentStep}
          />
        </div>
      </div>

      {/* ── Step Content ── */}
      <div className="flex-1 max-w-lg mx-auto w-full px-4 py-6 overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25, ease: "easeInOut" }}
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

      {/* ── Bottom Navigation ── */}
      <div className="sticky bottom-0 z-20 bg-white border-t border-gray-100">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center gap-3">
          {/* Back button */}
          <button
            onClick={handleBack}
            disabled={!canGoBack}
            className="w-11 h-11 flex items-center justify-center rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 transition-all disabled:opacity-30 disabled:cursor-not-allowed shrink-0"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Next / Complete button */}
          {!isLastStep ? (
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className="flex-1 bg-primary text-white font-semibold py-3.5 rounded-xl hover:bg-primary-600 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              Continue
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleComplete}
              disabled={!canProceed() || isCompleting}
              className="flex-1 bg-emerald-500 text-white font-semibold py-3.5 rounded-xl hover:bg-emerald-600 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isCompleting ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Completing...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  Complete Onboarding
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
