// src/components/landing/HowItWorks.tsx
"use client";

import { motion } from "framer-motion";
import {
  Smartphone,
  CreditCard,
  Target,
  FileCode2,
  CheckCircle,
  MapPin,
  Star,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

const verificationLayers = [
  {
    layer: 1,
    title: "Phone & SIM Verification",
    description: "Africa's Talking OTP authentication at registration. One worker per SIM number with strict unique hardware enforcement to prevent fake multi-accounting.",
    icon: Smartphone,
    scope: "Gate (All Workers)",
  },
  {
    layer: 2,
    title: "Government Identity Document (Ghana Card / Passport)",
    description: "Dual-side document upload with automated OCR data extraction followed by human compliance review within 24 hours. Stored encrypted under Ghana Data Protection Act standards.",
    icon: CreditCard,
    scope: "Gate (All Workers)",
  },
  {
    layer: 3,
    title: "Timed Skill Assessment (Server Graded)",
    description: "Randomized multiple-choice and short-answer challenge drawn from our 500+ question bank. Timed countdown with 7-day cooldown on failure. Weight: 30%.",
    icon: Target,
    scope: "Digital & Educators",
  },
  {
    layer: 4,
    title: "Practical Deliverable Submission",
    description: "Workers submit a tangible deliverable (code repo, design prototype, or lesson plan). Evaluated by independent senior moderators using a standardized rubric. Weight: 20%.",
    icon: FileCode2,
    scope: "Digital & Educators",
  },
  {
    layer: 5,
    title: "Portfolio Quality Moderation",
    description: "Authenticity verification of past client deliverables before any profile goes live. Image and code matching checks prevent stock asset reuse.",
    icon: CheckCircle,
    scope: "Foundation (All Workers)",
  },
  {
    layer: 6,
    title: "Field Agent Physical Verification",
    description: "Physical inspection by a certified local agent. Field tablet app with mandatory GPS geo-fencing checks physical workshops, artisan tooling, and live craftsmanship. Weight: 20%.",
    icon: MapPin,
    scope: "Trade & Skilled Artisans",
  },
  {
    layer: 7,
    title: "Completed Escrow Job Ratings",
    description: "Post-milestone client ratings (1–5 stars + written feedback) velocity-checked for fake bot reviews. Recomputes Trust Score continuously via BullMQ. Weight: 35%.",
    icon: Star,
    scope: "All Workers",
  },
];

export function HowItWorks() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28 text-white">
      {/* Floating subtle glow */}
      <div className="pointer-events-none absolute bottom-0 left-0 w-96 h-96 bg-[#4F6AF5]/15 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute top-0 right-0 w-96 h-96 bg-[#22C55E]/10 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-1.5 rounded-full text-xs font-semibold text-[#8BA4FF] mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Pillar 1: Identity is Earned, Not Claimed
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            Seven-Layer Verification Framework
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-white/70 max-w-3xl mx-auto leading-relaxed">
            Unlike traditional platforms that rely on self-reported CV claims, no unverified worker ever appears in Skiloq search results. Every badge is earned through proof-of-work.
          </p>
        </motion.div>

        {/* 7 Verification Steps */}
        <div className="space-y-4">
          {verificationLayers.map((layer, idx) => {
            const Icon = layer.icon;

            return (
              <motion.div
                key={layer.layer}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-white/10 transition-all hover:border-[#4F6AF5]/40"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start sm:items-center gap-4 flex-1">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#4F6AF5] to-[#6F8AFF] text-white flex items-center justify-center shrink-0 shadow-lg shadow-[#4F6AF5]/25">
                      <Icon className="w-6 h-6" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="text-xs font-mono font-bold text-[#8BA4FF] uppercase tracking-wider">
                          Layer 0{layer.layer}
                        </span>
                        <span className="text-gray-400">•</span>
                        <h3 className="font-bold text-base sm:text-lg text-white">
                          {layer.title}
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm text-white/70 leading-relaxed max-w-3xl">
                        {layer.description}
                      </p>
                    </div>
                  </div>

                  <span className="self-start sm:self-center px-3 py-1 rounded-full bg-white/10 text-white/90 text-xs font-semibold border border-white/15 shrink-0">
                    {layer.scope}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Trust Score Breakdown Callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 bg-gradient-to-br from-[#1E2545] to-[#15192E] rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-white">Composite Trust Score System (0–100)</h4>
              <p className="text-xs text-white/60">Six tamper-resistant algorithmic weights computed by BullMQ queues</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-center">
            {[
              { label: "Assessment Scores", weight: "25%", color: "text-[#6885FA]" },
              { label: "Completion Rate", weight: "20%", color: "text-emerald-400" },
              { label: "On-Time Rate", weight: "15%", color: "text-amber-400" },
              { label: "Dispute Rate (Inverse)", weight: "15%", color: "text-rose-400" },
              { label: "Repeat-Hire Rate", weight: "15%", color: "text-purple-400" },
              { label: "Peer Vouches", weight: "10%", color: "text-blue-400" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 rounded-2xl p-3 border border-white/10">
                <span className={`text-2xl font-black ${stat.color}`}>{stat.weight}</span>
                <p className="text-[11px] text-white/70 font-medium mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
