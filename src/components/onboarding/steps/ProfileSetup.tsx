// src/components/onboarding/steps/ProfileSetup.tsx
"use client";

import { useState } from "react";
import { ghanaDistricts, ghanaianLanguages } from "@/lib/categories";
import type { ProfileData } from "@/types/onboarding";
import { User, MapPin, Languages, DollarSign, Check, Info, Sparkles, ChevronDown } from "lucide-react";

interface ProfileSetupProps {
  profile: ProfileData;
  onUpdate: (profile: Partial<ProfileData>) => void;
}

export function ProfileSetup({ profile, onUpdate }: ProfileSetupProps) {
  const [showDistrictDropdown, setShowDistrictDropdown] = useState(false);
  const [districtSearch, setDistrictSearch] = useState("");

  const handleBioChange = (value: string) => {
    if (value.length <= 500) {
      onUpdate({ bio: value });
    }
  };

  const toggleLanguage = (lang: string) => {
    const languages = profile.languages.includes(lang)
      ? profile.languages.filter((l) => l !== lang)
      : [...profile.languages, lang];
    onUpdate({ languages });
  };

  const filteredDistricts = ghanaDistricts.filter((d) =>
    d.toLowerCase().includes(districtSearch.toLowerCase())
  );

  const bioLength = profile.bio.length;
  const isBioValid = bioLength >= 20;

  return (
    <div className="space-y-8">
      {/* Step Header */}
      <div className="text-center max-w-xl mx-auto space-y-2.5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          Public Profile
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
          Tell clients about yourself
        </h1>
        <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
          Set up your professional presence. Clear profiles with defined hourly rates receive high-intent project offers.
        </p>
      </div>

      {/* Responsive Form Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        {/* Left Column (6 cols): Bio & Location */}
        <div className="lg:col-span-7 space-y-6">
          {/* Professional Bio */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-blue-600" />
                Professional Summary & Bio <span className="text-red-500">*</span>
              </label>
              <span
                className={`text-xs font-semibold ${
                  isBioValid ? "text-emerald-600" : "text-amber-600"
                }`}
              >
                {bioLength < 20 ? `${20 - bioLength} more chars needed` : `${bioLength}/500`}
              </span>
            </div>
            <div className="relative">
              <textarea
                value={profile.bio}
                onChange={(e) => handleBioChange(e.target.value)}
                placeholder="Describe your background, major skills, past experience, and what makes you reliable and great to work with..."
                rows={5}
                className="w-full bg-gray-50/50 border-2 border-gray-200 rounded-2xl p-4 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-all shadow-sm leading-relaxed"
              />
            </div>
            <p className="text-[11px] text-gray-400">
              💡 Tip: Include years of experience, specific equipment or tools you own, and key strengths.
            </p>
          </div>

          {/* Operating District Selector */}
          <div className="space-y-2 relative">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              Primary Operational District <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowDistrictDropdown(!showDistrictDropdown)}
                className="w-full bg-gray-50/50 border-2 border-gray-200 rounded-2xl px-4 py-3.5 text-sm text-left flex items-center justify-between text-gray-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-all shadow-sm"
              >
                <span className={profile.location_district ? "font-semibold" : "text-gray-400"}>
                  {profile.location_district || "Select your main metropolitan area"}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>

              {showDistrictDropdown && (
                <div className="absolute z-30 mt-2 w-full bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden animate-in fade-in-50 zoom-in-95 duration-150">
                  <div className="p-2 border-b border-gray-100 bg-gray-50/50">
                    <input
                      type="text"
                      value={districtSearch}
                      onChange={(e) => setDistrictSearch(e.target.value)}
                      placeholder="Search district..."
                      className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500"
                      autoFocus
                    />
                  </div>
                  <div className="max-h-48 overflow-y-auto p-1 divide-y divide-gray-50">
                    {filteredDistricts.map((district) => (
                      <button
                        key={district}
                        type="button"
                        onClick={() => {
                          onUpdate({ location_district: district });
                          setShowDistrictDropdown(false);
                          setDistrictSearch("");
                        }}
                        className={`w-full px-4 py-2.5 text-xs text-left rounded-xl transition-colors flex items-center justify-between ${
                          profile.location_district === district
                            ? "bg-blue-50 text-blue-600 font-bold"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <span>{district}</span>
                        {profile.location_district === district && <Check className="w-3.5 h-3.5" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Languages, Rates, Availability */}
        <div className="lg:col-span-5 space-y-6">
          {/* Spoken Languages */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
              <Languages className="w-3.5 h-3.5 text-blue-600" />
              Languages Spoken
            </label>
            <p className="text-[11px] text-gray-400">Select all languages you speak fluently:</p>
            <div className="flex flex-wrap gap-2 pt-1">
              {ghanaianLanguages.map((lang) => {
                const isSelected = profile.languages.includes(lang);
                return (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => toggleLanguage(lang)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? "bg-[#2563EB] text-white shadow-sm ring-1 ring-blue-600"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200/70"
                    }`}
                  >
                    <span>{lang}</span>
                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Hourly Rate */}
          <div className="space-y-3 p-4 sm:p-5 rounded-2xl bg-gray-50/80 border border-gray-200/90">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                Target Hourly Rate <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-xl border border-gray-200 shadow-sm">
                <span className="text-xs font-bold text-gray-400">GHS</span>
                <input
                  type="number"
                  min={1}
                  max={500}
                  value={profile.hourly_rate_ghs || ""}
                  onChange={(e) => {
                    const val = parseInt(e.target.value) || 0;
                    onUpdate({ hourly_rate_ghs: Math.min(500, Math.max(0, val)) });
                  }}
                  className="w-16 text-right text-sm font-extrabold text-blue-600 focus:outline-none"
                  placeholder="35"
                />
                <span className="text-xs text-gray-400">/hr</span>
              </div>
            </div>

            <div className="pt-2">
              <input
                type="range"
                min={0}
                max={200}
                step={5}
                value={profile.hourly_rate_ghs}
                onChange={(e) => onUpdate({ hourly_rate_ghs: parseInt(e.target.value) || 0 })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#2563EB]"
              />
              <div className="flex justify-between text-[11px] font-semibold text-gray-400 mt-1.5">
                <span>GHS 0/hr</span>
                <span>GHS 100/hr</span>
                <span>GHS 200+/hr</span>
              </div>
            </div>
          </div>

          {/* Availability Toggle */}
          <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200 flex items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <h4 className="text-sm font-bold text-gray-900">Immediate Availability</h4>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                Display &ldquo;Available Now&rdquo; badge in employer search results
              </p>
            </div>

            <button
              type="button"
              onClick={() => onUpdate({ availability: !profile.availability })}
              className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                profile.availability ? "bg-emerald-500" : "bg-gray-300"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                  profile.availability ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
