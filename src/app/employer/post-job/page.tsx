// src/app/employer/post-job/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { EmployerLayout } from "@/components/layout/EmployerLayout";
import { usePostJob } from "@/hooks/useEmployer";
import { toasts } from "@/lib/toasts";
import { ArrowLeft, Plus, X, Info } from "lucide-react";
import { toast } from "sonner";

const skillOptions = [
  "React Developer", "TypeScript", "UI Designer", "Figma", "Node.js",
  "Python", "Copywriting", "Content Strategy", "Graphic Design",
  "Virtual Assistant", "Data Entry", "WordPress", "SEO",
  "Tailoring", "Plumbing", "Electrical", "Auto Mechanic",
  "Solar Installation", "Carpentry", "Hairdressing",
];

const ghanaDistricts = [
  "Accra Metropolitan", "Kumasi Metropolitan", "Tema Metropolitan",
  "Tamale Metropolitan", "Adenta Municipal", "Ashaiman Municipal",
  "Cape Coast Metropolitan", "Koforidua Municipal",
];

export default function PostJobPage() {
  const router = useRouter();
  const postJob = usePostJob();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [location, setLocation] = useState("");
  const [isRemote, setIsRemote] = useState(true);
  const [showSkillDropdown, setShowSkillDropdown] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) { toast.error("Job title is required"); return; }
    if (!description.trim()) { toast.error("Description is required"); return; }
    if (!budget || parseInt(budget) < 50) { toast.error("Minimum budget is GHS 50"); return; }
    if (skills.length === 0) { toast.error("Select at least one skill"); return; }

    postJob.mutate(
      {
        title,
        description,
        budget_ghs: parseInt(budget),
        skills_required: skills,
        location_district: location || undefined,
        is_remote: isRemote,
      },
      {
        onSuccess: () => {
          toast.success("Job posted successfully!");
          router.push("/employer/dashboard");
        },
        onError: () => {
          toast.error("Failed to post job. Try again.");
        },
      }
    );
  };

  const toggleSkill = (skill: string) => {
    setSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const removeSkill = (skill: string) => {
    setSkills((prev) => prev.filter((s) => s !== skill));
  };

  return (
    <EmployerLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="w-9 h-9 flex items-center justify-center rounded-input hover:bg-primary-50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-primary" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-primary">Post a Job</h1>
            <p className="text-sm text-primary-300 mt-0.5">
              Describe what you need and find the right talent
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="text-sm font-semibold text-primary mb-1.5 block">
              Job Title <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., React Frontend Developer for Mobile App"
              maxLength={120}
              className="w-full bg-white border border-primary-100 rounded-input px-4 py-3 text-sm text-primary placeholder:text-primary-200 focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
            <p className="text-xs text-primary-300 mt-1">{title.length}/120</p>
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-semibold text-primary mb-1.5 block">
              Description <span className="text-danger">*</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the project, deliverables, timeline, and any specific requirements..."
              rows={6}
              maxLength={2000}
              className="w-full bg-white border border-primary-100 rounded-input px-4 py-3 text-sm text-primary placeholder:text-primary-200 resize-none focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
            <p className="text-xs text-primary-300 mt-1">{description.length}/2000</p>
          </div>

          {/* Budget */}
          <div>
            <label className="text-sm font-semibold text-primary mb-1.5 block">
              Budget (GHS) <span className="text-danger">*</span>
            </label>
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="0.00"
              min={50}
              className="w-full bg-white border border-primary-100 rounded-input px-4 py-3 text-sm text-primary placeholder:text-primary-200 focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
            <p className="text-xs text-primary-300 mt-1">Minimum GHS 50</p>
          </div>

          {/* Skills */}
          <div className="relative">
            <label className="text-sm font-semibold text-primary mb-1.5 block">
              Skills Required <span className="text-danger">*</span>
            </label>

            {/* Selected skills */}
            {skills.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1 bg-accent/10 text-accent text-xs font-medium px-2.5 py-1 rounded-pill"
                  >
                    {skill}
                    <button type="button" onClick={() => removeSkill(skill)}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}

            <button
              type="button"
              onClick={() => setShowSkillDropdown(!showSkillDropdown)}
              className="w-full flex items-center justify-between bg-white border border-primary-100 rounded-input px-4 py-3 text-sm text-primary-300 hover:border-primary-200 transition-colors"
            >
              <span>{skills.length > 0 ? `${skills.length} selected` : "Select skills"}</span>
              <Plus className="w-4 h-4" />
            </button>

            {showSkillDropdown && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-primary-100 rounded-card shadow-lg max-h-48 overflow-y-auto">
                {skillOptions.map((skill) => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => toggleSkill(skill)}
                    className={`w-full px-4 py-2.5 text-sm text-left hover:bg-primary-50 transition-colors flex items-center justify-between ${
                      skills.includes(skill) ? "bg-accent-50 text-accent font-medium" : "text-primary"
                    }`}
                  >
                    {skill}
                    {skills.includes(skill) && <span>✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Location + Remote toggle */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-primary mb-1.5 block">Location</label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-white border border-primary-100 rounded-input px-4 py-3 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-accent/50"
              >
                <option value="">Any location</option>
                {ghanaDistricts.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div className="flex items-end pb-1">
              <label className="flex items-center gap-3 p-3 bg-white border border-primary-100 rounded-input cursor-pointer w-full">
                <div className="flex-1">
                  <p className="text-sm font-medium text-primary">Remote job</p>
                  <p className="text-xs text-primary-300">Work can be done from anywhere</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsRemote(!isRemote)}
                  className={`relative w-11 h-6 rounded-pill transition-colors ${
                    isRemote ? "bg-success" : "bg-primary-200"
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${
                      isRemote ? "translate-x-5" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </label>
            </div>
          </div>

          {/* Info box */}
          <div className="bg-accent/5 border border-accent/20 rounded-card p-4 flex items-start gap-3">
            <Info className="w-4 h-4 text-accent shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-primary">Payment required to post</p>
              <p className="text-xs text-primary-300 mt-0.5">
                You&apos;ll need a payment method on file before your job goes live. Escrow protects both you and the worker.
              </p>
            </div>
          </div>

          {/* Submit */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 py-3 text-sm font-medium text-primary-300 border border-primary-100 rounded-input hover:bg-primary-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={postJob.isPending}
              className="flex-1 bg-accent text-white text-sm font-semibold py-3 rounded-input hover:bg-accent-600 transition-colors disabled:opacity-50"
            >
              {postJob.isPending ? "Posting..." : "Post Job"}
            </button>
          </div>
        </form>
      </div>
    </EmployerLayout>
  );
}
