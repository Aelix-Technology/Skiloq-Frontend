// src/components/profile/SkillDisplay.tsx
"use client";

import { Check, Clock } from "lucide-react";
import type { WorkerSkill } from "@/types/worker";

interface SkillDisplayProps {
  skills: WorkerSkill[];
}

export function SkillDisplay({ skills }: SkillDisplayProps) {
  return (
    <section>
      <h2 className="text-md font-semibold text-primary mb-3">Skills</h2>
      <div className="grid gap-2">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="flex items-center justify-between bg-white rounded-card border border-primary-100 p-3"
          >
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                skill.verified ? "bg-success/10" : "bg-warning/10"
              }`}>
                {skill.verified ? (
                  <Check className="w-4 h-4 text-success" />
                ) : (
                  <Clock className="w-4 h-4 text-warning" />
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-primary">{skill.name}</p>
                <p className="text-xs text-primary-300">
                  {skill.verified ? "Verified" : "Pending verification"}
                  {skill.assessment_required && " • Assessment required"}
                </p>
              </div>
            </div>
            {skill.assessment_score && (
              <div className="text-right">
                <span className={`text-sm font-bold ${
                  skill.assessment_score >= 80 ? "text-success" :
                  skill.assessment_score >= 60 ? "text-warning" : "text-danger"
                }`}>
                  {skill.assessment_score}%
                </span>
                <p className="text-xs text-primary-300">Score</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}