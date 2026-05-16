// src/components/onboarding/steps/ProfileSetup.tsx
"use client";

import { useState } from "react";
import { ghanaDistricts, ghanaianLanguages } from "@/lib/categories";
import type { ProfileData } from "@/types/onboarding";
import { Info } from "lucide-react";

interface ProfileSetupProps {
  profile: ProfileData;
  onUpdate: (profile: Partial<ProfileData>) => void;
}

export function ProfileSetup({ profile, onUpdate }: ProfileSetupProps) {
  const [bioLength, setBioLength] = useState(profile.bio.length);
  const [showDistrictDropdown, setShowDistrictDropdown] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  const handleBioChange = (value: string) => {
    if (value.length <= 500) {
      onUpdate({ bio: value });
      setBioLength(value.length);
    }
  };

  const toggleLanguage = (lang: string) => {
    const languages = profile.languages.includes(lang)
      ? profile.languages.filter((l) => l !== lang)
      : [...profile.languages, lang];
    onUpdate({ languages });
  };

  const isValid = profile.bio.length >= 20 && profile.location_district && profile.hourly_rate_ghs > 0;

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-xl font-bold text-primary">Tell us about yourself</h1>
        <p className="text-sm text-primary-300">This helps employers find you</p>
      </div>

      {/* Bio */}
      <div>
        <label className="text-sm font-medium text-primary-400 mb-2 block">
          Bio <span className="text-danger">*</span>
        </label>
        <textarea
          value={profile.bio}
          onChange={(e) => handleBioChange(e.target.value)}
          placeholder="Describe your skills, experience, and what makes you great at what you do..."
          rows={4}
          maxLength={500}
          className="w-full bg-primary-50 border border-primary-100 rounded-input px-4 py-3 text-sm text-primary placeholder:text-primary-200 focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none"
        />
        <div className="flex justify-between mt-1">
          <p className="text-xs text-primary-300">
            {bioLength < 20 ? `Min 20 characters (${20 - bioLength} more)` : `${bioLength}/500`}
          </p>
          {bioLength > 400 && (
            <p className="text-xs text-warning">{bioLength}/500</p>
          )}
        </div>
      </div>

      {/* District selector */}
      <div className="relative">
        <label className="text-sm font-medium text-primary-400 mb-2 block">
          District <span className="text-danger">*</span>
        </label>
        <button
          onClick={() => setShowDistrictDropdown(!showDistrictDropdown)}
          className="w-full bg-primary-50 border border-primary-100 rounded-input px-4 py-3 text-sm text-left text-primary focus:outline-none focus:ring-2 focus:ring-accent/50"
        >
          {profile.location_district || "Select your district"}
        </button>
        {showDistrictDropdown && (
          <div className="absolute z-10 mt-1 w-full bg-white border border-primary-100 rounded-card shadow-lg max-h-48 overflow-y-auto">
            {ghanaDistricts.map((district) => (
              <button
                key={district}
                onClick={() => {
                  onUpdate({ location_district: district });
                  setShowDistrictDropdown(false);
                }}
                className={`w-full px-4 py-2.5 text-sm text-left hover:bg-primary-50 transition-colors ${
                  profile.location_district === district
                    ? "bg-accent-50 text-accent font-medium"
                    : "text-primary"
                }`}
              >
                {district}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Languages */}
      <div className="relative">
        <label className="text-sm font-medium text-primary-400 mb-2 block">
          Languages
        </label>
        <button
          onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
          className="w-full bg-primary-50 border border-primary-100 rounded-input px-4 py-3 text-sm text-left text-primary focus:outline-none focus:ring-2 focus:ring-accent/50"
        >
          {profile.languages.length > 0
            ? profile.languages.join(", ")
            : "Select languages"}
        </button>
        {showLanguageDropdown && (
          <div className="absolute z-10 mt-1 w-full bg-white border border-primary-100 rounded-card shadow-lg max-h-48 overflow-y-auto">
            {ghanaianLanguages.map((lang) => (
              <button
                key={lang}
                onClick={() => toggleLanguage(lang)}
                className="w-full px-4 py-2.5 text-sm text-left hover:bg-primary-50 transition-colors flex items-center justify-between"
              >
                <span>{lang}</span>
                {profile.languages.includes(lang) && (
                  <span className="text-accent font-medium">✓</span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Hourly rate */}
      <div>
        <label className="text-sm font-medium text-primary-400 mb-2 block">
          Hourly Rate (GHS) <span className="text-danger">*</span>
        </label>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min={0}
            max={200}
            step={5}
            value={profile.hourly_rate_ghs}
            onChange={(e) => onUpdate({ hourly_rate_ghs: parseInt(e.target.value) })}
            className="flex-1 accent-accent"
          />
          <div className="w-20 bg-primary-50 border border-primary-100 rounded-input px-3 py-2 text-center">
            <input
              type="number"
              value={profile.hourly_rate_ghs || ""}
              onChange={(e) => {
                const val = parseInt(e.target.value) || 0;
                onUpdate({ hourly_rate_ghs: Math.min(200, Math.max(0, val)) });
              }}
              placeholder="0"
              className="w-full bg-transparent text-sm text-center text-primary focus:outline-none"
            />
          </div>
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-xs text-primary-300">GHS 0</span>
          <span className="text-xs text-primary-300">GHS 200/hr</span>
        </div>
      </div>

      {/* Availability toggle */}
      <div className="flex items-center justify-between py-3 px-4 bg-primary-50 rounded-card">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-primary-300" />
          <span className="text-sm text-primary">Available for work</span>
        </div>
        <button
          onClick={() => onUpdate({ availability: !profile.availability })}
          className={`relative w-11 h-6 rounded-pill transition-colors ${
            profile.availability ? "bg-success" : "bg-primary-200"
          }`}
        >
          <div
            className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${
              profile.availability ? "translate-x-5" : "translate-x-0.5"
            }`}
          />
        </button>
      </div>
    </div>
  );
}
