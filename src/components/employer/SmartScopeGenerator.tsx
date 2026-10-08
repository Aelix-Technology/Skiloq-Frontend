// src/components/employer/SmartScopeGenerator.tsx
"use client";

import { useState } from "react";
import { Sparkles, CheckCircle2, AlertCircle, Plus, Trash2, ShieldCheck, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

export interface ScopeDocument {
  deliverables: string[];
  timeline: string;
  acceptance_criteria: string[];
  out_of_scope: string[];
  confirmed: boolean;
}

interface SmartScopeGeneratorProps {
  jobTitle: string;
  jobDescription: string;
  skills: string[];
  scope: ScopeDocument | null;
  onScopeChange: (scope: ScopeDocument) => void;
}

export function SmartScopeGenerator({
  jobTitle,
  jobDescription,
  skills,
  scope,
  onScopeChange,
}: SmartScopeGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  // New item inputs
  const [newDeliverable, setNewDeliverable] = useState("");
  const [newCriterion, setNewCriterion] = useState("");
  const [newOutOfScope, setNewOutOfScope] = useState("");

  const handleGenerateScope = () => {
    if (!jobTitle.trim() && !jobDescription.trim()) {
      toast.error("Please enter a job title and brief description first");
      return;
    }

    setIsGenerating(true);

    setTimeout(() => {
      // Intelligent default generation based on skills and title
      const titleLower = jobTitle.toLowerCase();
      let genDeliverables = [
        "Interactive and fully responsive user interface built to project specs",
        "Clean, documented source code following modern architectural patterns",
        "Comprehensive testing verification report and deployment readiness review",
      ];
      let genAcceptance = [
        "Code passes all automated unit checks and linting guidelines",
        "Zero critical visual bugs across mobile, tablet, and desktop viewports",
        "Successful staging environment handover before escrow signoff",
      ];
      let genOutOfScope = [
        "Ongoing monthly server hosting management after initial delivery",
        "Creation of raw video marketing collateral not specified in original contract",
      ];
      let genTimeline = "3-4 weeks with phased milestone reviews";

      if (titleLower.includes("tailor") || skills.includes("Tailoring")) {
        genDeliverables = [
          "Complete tailored garment crafted to confirmed client measurements",
          "High-grade fabric quality check and reinforced stitching",
          "Initial fitting session and final adjustments",
        ];
        genAcceptance = [
          "Accurate measurement alignment within +/- 0.5 cm tolerance",
          "Clean finishing, hems, and functional zippers/buttons",
        ];
        genOutOfScope = ["Supply of luxury imported fabrics unless pre-funded in escrow"];
        genTimeline = "7-10 business days with 1 intermediate fitting session";
      } else if (titleLower.includes("tutor") || skills.includes("Tutor") || skills.includes("Mathematics")) {
        genDeliverables = [
          "Diagnostic assessment of current student academic standing",
          "Structured weekly 60-minute curriculum-aligned tutoring sessions",
          "Bi-weekly progress reports and customized practice assignments",
        ];
        genAcceptance = [
          "Minimum 85% attendance across agreed calendar slots",
          "Demonstrable improvement on platform mini-quizzes",
        ];
        genOutOfScope = ["Purchasing external examination board entrance registration fees"];
        genTimeline = "4-week monthly bundle with 2 sessions per week";
      }

      const generatedScope: ScopeDocument = {
        deliverables: genDeliverables,
        timeline: genTimeline,
        acceptance_criteria: genAcceptance,
        out_of_scope: genOutOfScope,
        confirmed: true,
      };

      onScopeChange(generatedScope);
      setIsGenerating(false);
      setIsExpanded(true);
      toast.success("AI Scope of Work Generated!", {
        description: "Review and edit deliverables to legally lock escrow protection against scope creep.",
      });
    }, 1000);
  };

  const addDeliverable = () => {
    if (!newDeliverable.trim() || !scope) return;
    onScopeChange({
      ...scope,
      deliverables: [...scope.deliverables, newDeliverable.trim()],
    });
    setNewDeliverable("");
  };

  const removeDeliverable = (index: number) => {
    if (!scope) return;
    onScopeChange({
      ...scope,
      deliverables: scope.deliverables.filter((_, i) => i !== index),
    });
  };

  const addCriterion = () => {
    if (!newCriterion.trim() || !scope) return;
    onScopeChange({
      ...scope,
      acceptance_criteria: [...scope.acceptance_criteria, newCriterion.trim()],
    });
    setNewCriterion("");
  };

  const removeCriterion = (index: number) => {
    if (!scope) return;
    onScopeChange({
      ...scope,
      acceptance_criteria: scope.acceptance_criteria.filter((_, i) => i !== index),
    });
  };

  const addOutOfScope = () => {
    if (!newOutOfScope.trim() || !scope) return;
    onScopeChange({
      ...scope,
      out_of_scope: [...scope.out_of_scope, newOutOfScope.trim()],
    });
    setNewOutOfScope("");
  };

  const removeOutOfScope = (index: number) => {
    if (!scope) return;
    onScopeChange({
      ...scope,
      out_of_scope: scope.out_of_scope.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50/70 via-white to-blue-50/50 rounded-3xl p-5 sm:p-6 border border-indigo-100 shadow-sm relative overflow-hidden space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-indigo-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/20 shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-gray-900 text-base">Smart Scope Generator</h3>
              <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 text-[10px] font-bold border border-indigo-200">
                Escrow Shield
              </span>
            </div>
            <p className="text-xs text-gray-500">Auto-generate structured deliverables to prevent scope creep disputes</p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleGenerateScope}
          disabled={isGenerating}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md shadow-indigo-600/25 transition-all active:scale-95 disabled:opacity-50 shrink-0"
        >
          <Sparkles className="w-4 h-4" />
          <span>{isGenerating ? "Analyzing & Drafting..." : scope ? "Regenerate Scope" : "Generate Scope with AI"}</span>
        </button>
      </div>

      {!scope && (
        <div className="p-4 bg-white/70 rounded-2xl border border-dashed border-indigo-200 text-center">
          <p className="text-xs text-gray-500">
            Click <strong>Generate Scope with AI</strong> to draft concrete deliverables, milestones, and dispute criteria directly from your job description.
          </p>
        </div>
      )}

      {scope && (
        <div className="space-y-4 pt-1">
          <div className="flex items-center justify-between text-xs text-indigo-900 font-semibold bg-indigo-100/50 p-2.5 rounded-xl">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Legally binding scope for Escrow Release & 72h Dispute Arbitration
            </span>
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-indigo-700 hover:text-indigo-900 p-1"
            >
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4 overflow-hidden"
              >
                {/* Deliverables */}
                <div>
                  <label className="text-xs font-bold text-gray-800 uppercase tracking-wider block mb-1.5">
                    Clear Deliverables ({scope.deliverables.length})
                  </label>
                  <div className="space-y-2 mb-2">
                    {scope.deliverables.map((item, i) => (
                      <div key={i} className="flex items-center justify-between gap-2 p-2.5 bg-white rounded-xl border border-gray-200 text-xs">
                        <span className="flex items-center gap-2 text-gray-800">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          {item}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeDeliverable(i)}
                          className="text-gray-400 hover:text-red-500 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newDeliverable}
                      onChange={(e) => setNewDeliverable(e.target.value)}
                      placeholder="Add specific deliverable..."
                      className="flex-1 bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                    <button
                      type="button"
                      onClick={addDeliverable}
                      className="px-3 py-2 bg-indigo-50 text-indigo-700 font-semibold rounded-xl text-xs hover:bg-indigo-100"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Acceptance Criteria */}
                <div>
                  <label className="text-xs font-bold text-gray-800 uppercase tracking-wider block mb-1.5">
                    Escrow Acceptance Criteria ({scope.acceptance_criteria.length})
                  </label>
                  <div className="space-y-2 mb-2">
                    {scope.acceptance_criteria.map((item, i) => (
                      <div key={i} className="flex items-center justify-between gap-2 p-2.5 bg-white rounded-xl border border-gray-200 text-xs">
                        <span className="flex items-center gap-2 text-gray-800">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 shrink-0" />
                          {item}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeCriterion(i)}
                          className="text-gray-400 hover:text-red-500 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newCriterion}
                      onChange={(e) => setNewCriterion(e.target.value)}
                      placeholder="Add acceptance criterion..."
                      className="flex-1 bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                    <button
                      type="button"
                      onClick={addCriterion}
                      className="px-3 py-2 bg-indigo-50 text-indigo-700 font-semibold rounded-xl text-xs hover:bg-indigo-100"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Explicitly Out of Scope */}
                <div>
                  <label className="text-xs font-bold text-gray-800 uppercase tracking-wider block mb-1.5">
                    Explicitly Out of Scope (Protects Freelancer from Creep)
                  </label>
                  <div className="space-y-2 mb-2">
                    {scope.out_of_scope.map((item, i) => (
                      <div key={i} className="flex items-center justify-between gap-2 p-2.5 bg-rose-50/60 rounded-xl border border-rose-200 text-xs">
                        <span className="flex items-center gap-2 text-gray-800">
                          <AlertCircle className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                          {item}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeOutOfScope(i)}
                          className="text-gray-400 hover:text-red-500 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newOutOfScope}
                      onChange={(e) => setNewOutOfScope(e.target.value)}
                      placeholder="Add excluded item..."
                      className="flex-1 bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                    <button
                      type="button"
                      onClick={addOutOfScope}
                      className="px-3 py-2 bg-indigo-50 text-indigo-700 font-semibold rounded-xl text-xs hover:bg-indigo-100"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Timeline */}
                <div>
                  <label className="text-xs font-bold text-gray-800 uppercase tracking-wider block mb-1.5">
                    Agreed Timeline
                  </label>
                  <input
                    type="text"
                    value={scope.timeline}
                    onChange={(e) => onScopeChange({ ...scope, timeline: e.target.value })}
                    className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
