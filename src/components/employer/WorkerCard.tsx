// src/components/employer/WorkerCard.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Star, MapPin, ShieldCheck, Heart, Zap, ArrowRight, CheckCircle2 } from "lucide-react";
import type { Worker } from "@/types/worker";
import { toast } from "sonner";

interface WorkerCardProps {
  worker: Worker;
  onBookNow?: (worker: Worker) => void;
}

export function WorkerCard({ worker, onBookNow }: WorkerCardProps) {
  const router = useRouter();
  const [isFavorited, setIsFavorited] = useState(false);

  const getScoreColor = (s: number) => {
    if (s >= 70) return "text-[#22C55E] bg-emerald-50 border-emerald-200";
    if (s >= 40) return "text-amber-600 bg-amber-50 border-amber-200";
    return "text-rose-600 bg-rose-50 border-rose-200";
  };

  const getBadgeName = (s: number) => {
    if (s >= 85) return "Verified Expert";
    if (s >= 70) return "Top Rated";
    if (s >= 50) return "Rising Talent";
    return "Verified";
  };

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = !isFavorited;
    setIsFavorited(next);
    if (next) {
      toast.success(`Added ${worker.full_name} to your Trusted Hiring Circle!`, {
        description: "You get 2-hour early job match alerts and a Preferred Worker connection.",
      });
    } else {
      toast.info(`Removed from Trusted Hiring Circle`);
    }
  };

  return (
    <div
      onClick={() => router.push(`/employer/find-talent/${worker.id}`)}
      className="bg-white rounded-3xl border border-gray-200/90 p-5 sm:p-6 text-left hover:border-[#4F6AF5]/60 hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between relative"
    >
      <div>
        {/* Top Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1A1F36] to-[#2E3760] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-md">
              {worker.full_name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h3 className="font-bold text-base text-[#1A1F36] group-hover:text-[#4F6AF5] transition-colors truncate">
                  {worker.full_name}
                </h3>
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              </div>

              <p className="text-xs text-gray-500 font-medium capitalize mt-0.5 truncate">
                {worker.category === "digital"
                  ? "Digital & Remote"
                  : worker.category === "trade"
                  ? "Trade & Skilled Artisan"
                  : worker.category === "educator"
                  ? "Certified Educator"
                  : "Online Income Specialist"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {/* Phase 2: Trusted Hiring Circle Favorite */}
            <button
              onClick={toggleFavorite}
              title="Add to Trusted Circle"
              className={`p-2 rounded-xl transition-all ${
                isFavorited
                  ? "bg-rose-50 text-rose-500"
                  : "text-gray-300 hover:text-rose-500 hover:bg-gray-100"
              }`}
            >
              <Heart className={`w-4 h-4 ${isFavorited ? "fill-rose-500" : ""}`} />
            </button>

            {/* Small Trust Score Badge */}
            <div
              className={`px-2.5 py-1 rounded-xl text-xs font-black border flex items-center gap-1 ${getScoreColor(
                worker.trust_score
              )}`}
            >
              <Star className="w-3 h-3 fill-current" />
              <span>{worker.trust_score}</span>
            </div>
          </div>
        </div>

        {/* Live Instant Book Badge */}
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {getBadgeName(worker.trust_score)}
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
            <Zap className="w-3 h-3 text-amber-500 fill-amber-500" />
            Available Now
          </span>
        </div>

        {/* Top 3 Skills */}
        {worker.skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {worker.skills.slice(0, 3).map((skill) => (
              <span
                key={skill.id}
                className="text-xs px-2.5 py-1 rounded-xl bg-gray-100 text-gray-700 font-medium group-hover:bg-[#4F6AF5]/10 group-hover:text-[#4F6AF5] transition-colors"
              >
                {skill.name}
              </span>
            ))}
            {worker.skills.length > 3 && (
              <span className="text-xs text-gray-400 py-1">+{worker.skills.length - 3}</span>
            )}
          </div>
        )}
      </div>

      {/* Meta & CTAs */}
      <div className="pt-3 border-t border-gray-100 space-y-3">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-gray-400" />
            {worker.location_district || "Accra Central"}
          </span>
          <span className="font-extrabold text-[#1A1F36] text-sm">
            GHS {worker.hourly_rate_ghs}/hr
          </span>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/employer/messages?worker=${worker.id}`);
            }}
            className="flex-1 py-2 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors text-center"
          >
            Send Offer
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/employer/find-talent/${worker.id}`);
            }}
            className="flex-1 py-2 text-xs font-bold text-white bg-[#4F6AF5] hover:bg-[#3d56e0] rounded-xl transition-all shadow-md shadow-[#4F6AF5]/20 flex items-center justify-center gap-1"
          >
            <span>Book Now</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
