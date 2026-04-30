// src/components/onboarding/OnboardingWizard.tsx
"use client";

import { useOnboardingStore } from "@/stores/onboarding.store";
import { useAuthStore } from "@/stores/auth.store";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { OnboardingProgress } from "./OnboardingProgress";
import { CategorySelection } from "@/components/steps/CategorySelection";
import { IdentityUpload } from "@/components/steps/IdentityUpload";
import { ProfileSetup } from "@/components/steps/ProfileSetup";
import { SkillTagSelection } from "@/components/steps/SkillTagSelection";
import { SkillAssessment } from "@/components/steps/SkillAssessment";
import { PortfolioSubmission } from "@/components/steps/PortfolioSubmission";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { WorkerCategory } from "@/types/onboarding";

export function OnboardingWizard() {
  const router = useRouter();
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

  const totalSteps = 6;

  const canProceed = (): boolean => {
    switch (currentStep) {
      case 1: return !!category;
      case 2: return !!identityDoc.frontFile;
      case 3: return profile.bio.length >= 20 && !!profile.location_district && profile.hourly_rate_ghs > 0;
      case 4: return selectedSkills.length > 0;
      case 5: return !!assessmentResult;
      case 6: return portfolio.length >= 2;
      default: return false;
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps && canProceed()) {
      const nextStep = currentStep + 1;
      setStep(nextStep);
      setOnboardingStep(nextStep);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      const prevStep = currentStep - 1;
      setStep(prevStep);
      setOnboardingStep(prevStep);
    }
  };

  const handleComplete = () => {
    setIsCompleting(true);

    // Simulate API call
    setTimeout(() => {
      completeOnboarding();
      setOnboardingStep(totalSteps);
      toast.success("Onboarding complete! Welcome to Aelix.");
      router.push("/worker/dashboard");
      setIsCompleting(false);
    }, 2000);
  };

  const handleIdentitySubmit = () => {
    // Identity upload step handles its own submission
    // After successful upload, move to next step
    setIdentityDoc({});
    handleNext();
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-primary-50 z-10">
        <div className="max-w-lg mx-auto px-4 py-4">
          <OnboardingProgress currentStep={currentStep} />
        </div>
      </div>

      {/* Step content */}
      <div className="flex-1 max-w-lg mx-auto w-full px-4 py-8">
        {currentStep === 1 && (
          <CategorySelection
            selected={category}
            onSelect={(cat: WorkerCategory) => {
              setCategory(cat);
            }}
          />
        )}

        {currentStep === 2 && (
          <IdentityUpload
            identityDoc={identityDoc}
            onUpdate={(doc) => {
              setIdentityDoc(doc);
              // If front and back uploaded, treat as submitted
              if (doc.frontFile && !doc.backFile === false) {
                handleIdentitySubmit();
              }
            }}
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
            onComplete={(result) => setAssessmentResult(result)}
          />
        )}

        {currentStep === 6 && (
          <PortfolioSubmission
            items={portfolio}
            onAddItem={addPortfolioItem}
            onRemoveItem={removePortfolioItem}
          />
        )}
      </div>

      {/* Bottom navigation */}
      <div className="sticky bottom-0 bg-white border-t border-primary-50">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center gap-3">
          {/* Back button */}
          {currentStep > 1 && currentStep !== 5 && (
            <button
              onClick={handleBack}
              className="w-10 h-10 flex items-center justify-center rounded-input border border-primary-100 text-primary-300 hover:bg-primary-50 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {/* Next / Complete button */}
          {currentStep < totalSteps ? (
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className="flex-1 bg-accent text-white font-medium py-3 rounded-input hover:bg-accent-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 touch-target"
            >
              Continue
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleComplete}
              disabled={!canProceed() || isCompleting}
              className="flex-1 bg-success text-white font-medium py-3 rounded-input hover:bg-success-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 touch-target"
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
                "Complete Onboarding"
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}