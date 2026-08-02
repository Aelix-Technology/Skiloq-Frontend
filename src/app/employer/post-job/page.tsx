// src/app/employer/post-job/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { EmployerLayout } from "@/components/layout/EmployerLayout";
import { usePostJob } from "@/hooks/useEmployer";
import { toasts } from "@/lib/toasts";
import { ArrowLeft, Plus, X, Info, Trash2 } from "lucide-react";
import { toast } from "sonner";
import type { JobType, TutoringDetails, OnlineIncomeDetails, Milestone } from "@/types/job";

const skillOptions = [
  "React Developer", "TypeScript", "UI Designer", "Figma", "Node.js",
  "Python", "Copywriting", "Content Strategy", "Graphic Design",
  "Virtual Assistant", "Data Entry", "WordPress", "SEO",
  "Tailoring", "Plumbing", "Electrical", "Auto Mechanic",
  "Solar Installation", "Carpentry", "Hairdressing",
  "Mathematics Tutor", "English Tutor", "Science Tutor",
  "Transcription", "Micro-tasking",
];

const countries = [
  { code: "GH", name: "Ghana", currency: "GHS", currencySymbol: "GHS" },
  { code: "NG", name: "Nigeria", currency: "NGN", currencySymbol: "NGN" },
  { code: "KE", name: "Kenya", currency: "KES", currencySymbol: "KES" },
];

const districtsByCountry: Record<string, string[]> = {
  GH: [
    "Accra Metropolitan", "Kumasi Metropolitan", "Tema Metropolitan",
    "Tamale Metropolitan", "Adenta Municipal", "Ashaiman Municipal",
    "Cape Coast Metropolitan", "Koforidua Municipal",
  ],
  NG: [
    "Lagos Mainland", "Lagos Island", "Ikeja", "Surulere", "Abuja Municipal",
    "Wuse", "Garki", "Maitama",
  ],
  KE: [
    "Nairobi Central", "Westlands", "Kibera", "Mombasa Island", "Kisauni",
    "Nyali",
  ],
};

const subjectOptions = ["Mathematics", "English Language", "Science", "Social Studies", "ICT", "Business Studies"];
const levelOptions = ["Primary", "JHS", "SHS", "Tertiary"];
const taskTypeOptions = ["Data Entry", "Transcription", "Micro-tasking", "Content Moderation", "Survey Taking"];

export default function PostJobPage() {
  const router = useRouter();
  const postJob = usePostJob();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [countryCode, setCountryCode] = useState("GH");
  const [location, setLocation] = useState("");
  const [isRemote, setIsRemote] = useState(true);
  const [showSkillDropdown, setShowSkillDropdown] = useState(false);
  const [jobType, setJobType] = useState<JobType | "">("");

  // Tutoring State
  const [tutoringSubject, setTutoringSubject] = useState("");
  const [tutoringLevel, setTutoringLevel] = useState("");
  const [sessionPrice, setSessionPrice] = useState("");
  const [sessionDuration, setSessionDuration] = useState("60");
  const [isGroupTutoring, setIsGroupTutoring] = useState(false);
  const [maxStudents, setMaxStudents] = useState("5");
  const [availableSchedules, setAvailableSchedules] = useState<string[]>([]);
  const [newSchedule, setNewSchedule] = useState("");

  // Online Income State
  const [taskType, setTaskType] = useState("");
  const [perTaskPayment, setPerTaskPayment] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [availableTasks, setAvailableTasks] = useState("");
  const [onlineRequirements, setOnlineRequirements] = useState<string[]>([]);
  const [newRequirement, setNewRequirement] = useState("");

  // Milestone State
  const [milestones, setMilestones] = useState<Milestone[]>([]);

  const toggleSkill = (skill: string) => {
    setSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const removeSkill = (skill: string) => {
    setSkills((prev) => prev.filter((s) => s !== skill));
  };

  const addSchedule = () => {
    if (newSchedule.trim() && !availableSchedules.includes(newSchedule.trim())) {
      setAvailableSchedules([...availableSchedules, newSchedule.trim()]);
      setNewSchedule("");
    }
  };

  const removeSchedule = (schedule: string) => {
    setAvailableSchedules(availableSchedules.filter(s => s !== schedule));
  };

  const addRequirement = () => {
    if (newRequirement.trim() && !onlineRequirements.includes(newRequirement.trim())) {
      setOnlineRequirements([...onlineRequirements, newRequirement.trim()]);
      setNewRequirement("");
    }
  };

  const removeRequirement = (req: string) => {
    setOnlineRequirements(onlineRequirements.filter(r => r !== req));
  };

  const addMilestone = () => {
    setMilestones([
      ...milestones,
      {
        id: `milestone-${Date.now()}`,
        job_id: "",
        title: "",
        description: "",
        amount: 0,
        status: "pending",
        due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      }
    ]);
  };

  const updateMilestone = (id: string, updates: Partial<Milestone>) => {
    setMilestones(milestones.map(m => m.id === id ? { ...m, ...updates } : m));
  };

  const removeMilestone = (id: string) => {
    setMilestones(milestones.filter(m => m.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) { toast.error("Job title is required"); return; }
    if (!description.trim()) { toast.error("Description is required"); return; }
    const minBudget = countryCode === "GH" ? 50 : countryCode === "NG" ? 1000 : 500;
    const currency = countries.find(c => c.code === countryCode)?.currency;
    if (!budget || parseInt(budget) < minBudget) { 
      toast.error(`Minimum budget is ${currency} ${minBudget}`); 
      return; 
    }
    if (skills.length === 0) { toast.error("Select at least one skill"); return; }

    let tutoring_details: TutoringDetails | undefined;
    if (jobType === "tutoring") {
      if (!tutoringSubject) { toast.error("Subject is required"); return; }
      if (!tutoringLevel) { toast.error("Level is required"); return; }
      if (!sessionPrice) { toast.error("Session price is required"); return; }
      if (availableSchedules.length === 0) { toast.error("Add at least one schedule"); return; }

      tutoring_details = {
        subject: tutoringSubject,
        level: tutoringLevel,
        session_price_amount: parseInt(sessionPrice),
        session_duration_minutes: parseInt(sessionDuration),
        available_schedules: availableSchedules,
        is_group_tutoring: isGroupTutoring,
        max_students: isGroupTutoring ? parseInt(maxStudents) : undefined,
      };
    }

    let online_income_details: OnlineIncomeDetails | undefined;
    if (jobType === "online_income") {
      if (!taskType) { toast.error("Task type is required"); return; }
      if (!perTaskPayment) { toast.error("Per-task payment is required"); return; }
      if (!availableTasks) { toast.error("Available tasks count is required"); return; }

      online_income_details = {
        task_type: taskType,
        per_task_payment_amount: parseFloat(perTaskPayment),
        estimated_time_minutes: estimatedTime ? parseInt(estimatedTime) : 0,
        requirements: onlineRequirements,
        available_tasks_count: parseInt(availableTasks),
      };
    }

    let finalMilestones: Milestone[] | undefined;
    if (jobType === "project" && milestones.length > 0) {
      const totalMilestoneAmount = milestones.reduce((sum, m) => sum + (m.amount || 0), 0);
      if (totalMilestoneAmount !== parseInt(budget)) {
        toast.error(`Total milestone amount (${currency} ${totalMilestoneAmount}) must equal budget (${currency} ${budget})`);
        return;
      }
      finalMilestones = milestones;
    }

    postJob.mutate(
      {
        title,
        description,
        budget_amount: parseInt(budget),
        currency,
        country_code: countryCode,
        skills_required: skills,
        location_district: location || undefined,
        is_remote: isRemote,
        type: jobType || undefined,
        tutoring_details,
        online_income_details,
        milestones: finalMilestones,
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

  return (
    <EmployerLayout>
      <div className="max-w-3xl mx-auto space-y-6">
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
          {/* Job Type */}
          <div>
            <label className="text-sm font-semibold text-primary mb-1.5 block">
              Job Type <span className="text-danger">*</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { value: "", label: "Standard" },
                { value: "tutoring", label: "Tutoring" },
                { value: "online_income", label: "Online Income" },
                { value: "project", label: "Milestone Project" },
              ].map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setJobType(type.value as JobType)}
                  className={`p-3 border rounded-card text-sm font-medium transition-all ${
                    jobType === type.value 
                      ? "bg-accent text-white border-accent" 
                      : "bg-white border-primary-100 text-primary hover:border-accent/50"
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

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

          {/* Tutoring Fields */}
          {jobType === "tutoring" && (
            <div className="space-y-4 bg-accent-50 border border-accent-200 rounded-card p-4">
              <h3 className="text-sm font-semibold text-accent-700">Tutoring Details</h3>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-primary mb-1.5 block">Subject <span className="text-danger">*</span></label>
                  <select
                    value={tutoringSubject}
                    onChange={(e) => setTutoringSubject(e.target.value)}
                    className="w-full bg-white border border-primary-100 rounded-input px-4 py-3 text-sm"
                  >
                    <option value="">Select subject</option>
                    {subjectOptions.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-primary mb-1.5 block">Level <span className="text-danger">*</span></label>
                  <select
                    value={tutoringLevel}
                    onChange={(e) => setTutoringLevel(e.target.value)}
                    className="w-full bg-white border border-primary-100 rounded-input px-4 py-3 text-sm"
                  >
                    <option value="">Select level</option>
                    {levelOptions.map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-primary mb-1.5 block">Price per Session ({countries.find(c => c.code === countryCode)?.currency}) <span className="text-danger">*</span></label>
                  <input
                    type="number"
                    value={sessionPrice}
                    onChange={(e) => setSessionPrice(e.target.value)}
                    placeholder={countryCode === "GH" ? "50" : countryCode === "NG" ? "1000" : "500"}
                    min={countryCode === "GH" ? 10 : countryCode === "NG" ? 200 : 100}
                    className="w-full bg-white border border-primary-100 rounded-input px-4 py-3 text-sm"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-primary mb-1.5 block">Session Duration (minutes)</label>
                  <select
                    value={sessionDuration}
                    onChange={(e) => setSessionDuration(e.target.value)}
                    className="w-full bg-white border border-primary-100 rounded-input px-4 py-3 text-sm"
                  >
                    <option value="30">30</option>
                    <option value="45">45</option>
                    <option value="60">60</option>
                    <option value="90">90</option>
                  </select>
                </div>
              </div>

              <div className="flex items-end gap-3 p-3 bg-white border border-primary-100 rounded-input">
                <div className="flex-1">
                  <p className="text-sm font-medium text-primary">Group Tutoring</p>
                  <p className="text-xs text-primary-300">Allow multiple students per session</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsGroupTutoring(!isGroupTutoring)}
                  className={`relative w-11 h-6 rounded-pill transition-colors ${
                    isGroupTutoring ? "bg-success" : "bg-primary-200"
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${
                      isGroupTutoring ? "translate-x-5" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>

              {isGroupTutoring && (
                <div>
                  <label className="text-sm font-medium text-primary mb-1.5 block">Max Students</label>
                  <input
                    type="number"
                    value={maxStudents}
                    onChange={(e) => setMaxStudents(e.target.value)}
                    placeholder="5"
                    min="2"
                    className="w-full bg-white border border-primary-100 rounded-input px-4 py-3 text-sm"
                  />
                </div>
              )}

              <div>
                <label className="text-sm font-medium text-primary mb-1.5 block">Available Schedules <span className="text-danger">*</span></label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newSchedule}
                    onChange={(e) => setNewSchedule(e.target.value)}
                    placeholder="e.g., Monday 4:00 PM"
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSchedule())}
                    className="flex-1 bg-white border border-primary-100 rounded-input px-4 py-3 text-sm"
                  />
                  <button
                    type="button"
                    onClick={addSchedule}
                    className="px-4 py-3 bg-accent text-white rounded-input text-sm font-medium"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {availableSchedules.map((schedule, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1 bg-white border border-primary-100 px-3 py-1 rounded-pill text-sm">
                      {schedule}
                      <button type="button" onClick={() => removeSchedule(schedule)}><X className="w-3 h-3" /></button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Online Income Fields */}
          {jobType === "online_income" && (
            <div className="space-y-4 bg-success-50 border border-success-200 rounded-card p-4">
              <h3 className="text-sm font-semibold text-success-700">Online Income Task Details</h3>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-primary mb-1.5 block">Task Type <span className="text-danger">*</span></label>
                  <select
                    value={taskType}
                    onChange={(e) => setTaskType(e.target.value)}
                    className="w-full bg-white border border-primary-100 rounded-input px-4 py-3 text-sm"
                  >
                    <option value="">Select type</option>
                    {taskTypeOptions.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-primary mb-1.5 block">Payment per Task (GHS) <span className="text-danger">*</span></label>
                  <input
                    type="number"
                    step="0.01"
                    value={perTaskPayment}
                    onChange={(e) => setPerTaskPayment(e.target.value)}
                    placeholder="0.50"
                    min="0.01"
                    className="w-full bg-white border border-primary-100 rounded-input px-4 py-3 text-sm"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-primary mb-1.5 block">Available Tasks <span className="text-danger">*</span></label>
                  <input
                    type="number"
                    value={availableTasks}
                    onChange={(e) => setAvailableTasks(e.target.value)}
                    placeholder="100"
                    min="1"
                    className="w-full bg-white border border-primary-100 rounded-input px-4 py-3 text-sm"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-primary mb-1.5 block">Estimated Time (minutes per task)</label>
                  <input
                    type="number"
                    value={estimatedTime}
                    onChange={(e) => setEstimatedTime(e.target.value)}
                    placeholder="10"
                    className="w-full bg-white border border-primary-100 rounded-input px-4 py-3 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-primary mb-1.5 block">Requirements</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newRequirement}
                    onChange={(e) => setNewRequirement(e.target.value)}
                    placeholder="e.g., Excel proficiency"
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addRequirement())}
                    className="flex-1 bg-white border border-primary-100 rounded-input px-4 py-3 text-sm"
                  />
                  <button
                    type="button"
                    onClick={addRequirement}
                    className="px-4 py-3 bg-success text-white rounded-input text-sm font-medium"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {onlineRequirements.map((req, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1 bg-white border border-primary-100 px-3 py-1 rounded-pill text-sm">
                      {req}
                      <button type="button" onClick={() => removeRequirement(req)}><X className="w-3 h-3" /></button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Milestone Fields */}
          {jobType === "project" && (
            <div className="space-y-4 bg-primary-50 border border-primary-200 rounded-card p-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-semibold text-primary-800">Payment Milestones</h3>
                <button
                  type="button"
                  onClick={addMilestone}
                  className="flex items-center gap-1 text-accent text-sm font-medium"
                >
                  <Plus className="w-4 h-4" /> Add Milestone
                </button>
              </div>

              {milestones.map((milestone, idx) => (
                <div key={milestone.id} className="bg-white border border-primary-100 rounded-card p-3 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-primary">Milestone {idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => removeMilestone(milestone.id)}
                      className="text-danger"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-primary-500 mb-1 block">Title</label>
                      <input
                        type="text"
                        value={milestone.title}
                        onChange={(e) => updateMilestone(milestone.id, { title: e.target.value })}
                        placeholder="e.g., Design Phase"
                        className="w-full bg-white border border-primary-100 rounded-input px-3 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-primary-500 mb-1 block">Amount ({countries.find(c => c.code === countryCode)?.currency})</label>
                      <input
                        type="number"
                        value={milestone.amount}
                        onChange={(e) => updateMilestone(milestone.id, { amount: parseInt(e.target.value) || 0 })}
                        placeholder={countryCode === "GH" ? "1000" : countryCode === "NG" ? "20000" : "10000"}
                        min="0"
                        className="w-full bg-white border border-primary-100 rounded-input px-3 py-2 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-primary-500 mb-1 block">Description</label>
                    <textarea
                      value={milestone.description}
                      onChange={(e) => updateMilestone(milestone.id, { description: e.target.value })}
                      placeholder="What needs to be done for this milestone"
                      rows={2}
                      className="w-full bg-white border border-primary-100 rounded-input px-3 py-2 text-sm resize-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-primary-500 mb-1 block">Due Date</label>
                    <input
                      type="date"
                      value={milestone.due_date ? new Date(milestone.due_date).toISOString().split("T")[0] : ""}
                      onChange={(e) => updateMilestone(milestone.id, { due_date: e.target.value })}
                      className="w-full bg-white border border-primary-100 rounded-input px-3 py-2 text-sm"
                    />
                  </div>
                </div>
              ))}

              {milestones.length > 0 && (
                <div className="text-sm text-primary-600">
                  Total: GHS {milestones.reduce((sum, m) => sum + (m.amount || 0), 0).toLocaleString()}
                </div>
              )}
            </div>
          )}

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
              Budget ({countries.find(c => c.code === countryCode)?.currency}) <span className="text-danger">*</span>
            </label>
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="0.00"
              min={countryCode === "GH" ? 50 : countryCode === "NG" ? 1000 : 500}
              className="w-full bg-white border border-primary-100 rounded-input px-4 py-3 text-sm text-primary placeholder:text-primary-200 focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
            <p className="text-xs text-primary-300 mt-1">
              Minimum {countries.find(c => c.code === countryCode)?.currency} {countryCode === "GH" ? 50 : countryCode === "NG" ? 1000 : 500}
            </p>
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

          {/* Country + Location + Remote toggle */}
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-semibold text-primary mb-1.5 block">Country</label>
              <select
                value={countryCode}
                onChange={(e) => {
                  setCountryCode(e.target.value);
                  setLocation("");
                }}
                className="w-full bg-white border border-primary-100 rounded-input px-4 py-3 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-accent/50"
              >
                {countries.map((c) => (
                  <option key={c.code} value={c.code}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold text-primary mb-1.5 block">Location</label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-white border border-primary-100 rounded-input px-4 py-3 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-accent/50"
              >
                <option value="">Any location</option>
                {districtsByCountry[countryCode]?.map((d) => (
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
