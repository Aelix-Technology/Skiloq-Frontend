"use client";

import { Check, Clock } from "lucide-react";
import type { WorkerSkill } from "@/types/worker";
import { IconTile } from "@/components/ui/premium-card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { StatusBadge } from "@/components/ui/status-badge";
import { MotionDiv, listContainer, listItem } from "@/components/ui/motion-list";

interface SkillDisplayProps {
  skills: WorkerSkill[];
}

export function SkillDisplay({ skills }: SkillDisplayProps) {
  return (
    <section>
      <h2 className="text-md font-semibold tracking-tight text-primary mb-3">Skills</h2>
      <MotionDiv variants={listContainer} initial="hidden" animate="show" className="grid gap-3">
        {skills.map((skill) => (
          <MotionDiv
            key={skill.id}
            variants={listItem}
            className="flex items-center justify-between rounded-2xl border border-white/70 bg-white/80 p-4 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/10"
          >
            <div className="flex items-center gap-3">
              <IconTile tone={skill.verified ? "success" : "warning"}>
                {skill.verified ? (
                  <Check className="w-4 h-4 text-success" />
                ) : (
                  <Clock className="w-4 h-4 text-warning" />
                )}
              </IconTile>
              <div>
                <p className="text-sm font-medium text-primary">{skill.name}</p>
                <p className="text-xs text-primary-300">
                  {skill.verified ? "Verified" : "Pending verification"}
                  {skill.assessment_required && " - Assessment required"}
                </p>
              </div>
            </div>
            {skill.assessment_score && (
              <div className="text-right">
                <StatusBadge
                  tone={
                    skill.assessment_score >= 80
                      ? "success"
                      : skill.assessment_score >= 60
                        ? "pending"
                        : "danger"
                  }
                >
                  {skill.assessment_score}%
                </StatusBadge>
                <ProgressBar
                  value={skill.assessment_score}
                  tone={
                    skill.assessment_score >= 80
                      ? "success"
                      : skill.assessment_score >= 60
                        ? "warning"
                        : "danger"
                  }
                  className="mt-2 w-16"
                />
              </div>
            )}
          </MotionDiv>
        ))}
      </MotionDiv>
    </section>
  );
}
