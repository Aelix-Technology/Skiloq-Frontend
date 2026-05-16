// src/lib/skill-tags.ts
import type { SkillTag } from "@/types/onboarding";

export const skillTagsByCategory: Record<string, SkillTag[]> = {
  digital: [
    { id: "react", name: "React Developer", category: "digital", assessment_required: true, selected: false },
    { id: "node", name: "Node.js Developer", category: "digital", assessment_required: true, selected: false },
    { id: "ui-design", name: "UI Designer", category: "digital", assessment_required: false, selected: false },
    { id: "ux-design", name: "UX Designer", category: "digital", assessment_required: false, selected: false },
    { id: "figma", name: "Figma", category: "digital", assessment_required: false, selected: false },
    { id: "typescript", name: "TypeScript", category: "digital", assessment_required: true, selected: false },
    { id: "python", name: "Python Developer", category: "digital", assessment_required: true, selected: false },
    { id: "copywriting", name: "Copywriting", category: "digital", assessment_required: true, selected: false },
    { id: "va", name: "Virtual Assistant", category: "digital", assessment_required: true, selected: false },
    { id: "data-entry", name: "Data Entry", category: "digital", assessment_required: false, selected: false },
    { id: "wordpress", name: "WordPress Developer", category: "digital", assessment_required: false, selected: false },
    { id: "seo", name: "SEO Specialist", category: "digital", assessment_required: true, selected: false },
    { id: "content", name: "Content Strategy", category: "digital", assessment_required: false, selected: false },
    { id: "graphic-design", name: "Graphic Design", category: "digital", assessment_required: false, selected: false },
    { id: "flutter", name: "Flutter Developer", category: "digital", assessment_required: true, selected: false },
  ],
  trade: [
    { id: "tailoring", name: "Tailoring", category: "trade", assessment_required: false, selected: false },
    { id: "electrical", name: "Residential Electrician", category: "trade", assessment_required: false, selected: false },
    { id: "plumbing", name: "Plumbing", category: "trade", assessment_required: false, selected: false },
    { id: "hairdressing", name: "Hairdressing", category: "trade", assessment_required: false, selected: false },
    { id: "mechanic", name: "Auto Mechanic", category: "trade", assessment_required: false, selected: false },
    { id: "carpentry", name: "Carpentry", category: "trade", assessment_required: false, selected: false },
    { id: "masonry", name: "Masonry", category: "trade", assessment_required: false, selected: false },
    { id: "painting", name: "Painting", category: "trade", assessment_required: false, selected: false },
    { id: "welding", name: "Welding", category: "trade", assessment_required: false, selected: false },
    { id: "tiling", name: "Tiling", category: "trade", assessment_required: false, selected: false },
    { id: "solar", name: "Solar Installation", category: "trade", assessment_required: true, selected: false },
    { id: "cctv", name: "CCTV Installation", category: "trade", assessment_required: true, selected: false },
  ],
  educator: [
    { id: "math-tutor", name: "Math Tutor", category: "educator", assessment_required: true, selected: false },
    { id: "english-tutor", name: "English Tutor", category: "educator", assessment_required: true, selected: false },
    { id: "coding-tutor", name: "Coding Tutor", category: "educator", assessment_required: true, selected: false },
    { id: "music-tutor", name: "Music Tutor", category: "educator", assessment_required: false, selected: false },
    { id: "language-tutor", name: "Language Tutor", category: "educator", assessment_required: true, selected: false },
  ],
  online_income: [
    { id: "transcription", name: "Transcription", category: "online_income", assessment_required: true, selected: false },
    { id: "micro-tasks", name: "Micro-Tasks", category: "online_income", assessment_required: true, selected: false },
    { id: "data-labeling", name: "Data Labeling", category: "online_income", assessment_required: true, selected: false },
    { id: "surveys", name: "Online Surveys", category: "online_income", assessment_required: false, selected: false },
  ],
};

export const mockAssessmentQuestions = {
  digital: [
    {
      id: "q1",
      question: "Which hook is used to perform side effects in React?",
      options: ["useState", "useEffect", "useContext", "useReducer"],
      correct_index: 1,
      time_limit_seconds: 30,
    },
    {
      id: "q2",
      question: "What does CSS stand for?",
      options: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style System", "Colorful Style Sheets"],
      correct_index: 1,
      time_limit_seconds: 20,
    },
    {
      id: "q3",
      question: "Which of these is NOT a JavaScript data type?",
      options: ["String", "Boolean", "Float", "Symbol"],
      correct_index: 2,
      time_limit_seconds: 25,
    },
  ],
  trade: [
    {
      id: "q1",
      question: "What is the standard voltage for residential wiring in Ghana?",
      options: ["110V", "220V", "230V", "240V"],
      correct_index: 2,
      time_limit_seconds: 30,
    },
    {
      id: "q2",
      question: "Which pipe material is most commonly used for residential plumbing?",
      options: ["Copper", "PVC", "Galvanized Steel", "Cast Iron"],
      correct_index: 1,
      time_limit_seconds: 25,
    },
  ],
};
