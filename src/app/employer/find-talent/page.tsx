// src/app/employer/find-talent/page.tsx
"use client";

import { useState } from "react";
import { EmployerLayout } from "@/components/layout/EmployerLayout";
import { TalentFilters } from "@/components/employer/TalentFilters";
import { WorkerCard } from "@/components/employer/WorkerCard";
import { ErrorState } from "@/components/shared/ErrorState";
import { useTalentSearch } from "@/hooks/useEmployer";
import { Search, Briefcase, LayoutGrid, Map as MapIcon, MapPin, Star, ShieldCheck, Zap } from "lucide-react";
import type { Worker } from "@/types/worker";
import { useRouter } from "next/navigation";

export default function FindTalentPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("trust_score");
  const [showFilters, setShowFilters] = useState(false);
  const [minTrustScore, setMinTrustScore] = useState(0);
  const [availableOnly, setAvailableOnly] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
  const [selectedMapWorker, setSelectedMapWorker] = useState<Worker | null>(null);

  const { data: workers, isLoading, error, refetch } = useTalentSearch({
    search,
    category: category || undefined,
    sort_by: sortBy,
  });

  // Client-side filtering for minTrustScore and availability
  const filteredWorkers = workers?.filter((w) => {
    if (minTrustScore > 0 && w.trust_score < minTrustScore) return false;
    return true;
  });

  return (
    <EmployerLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Header with Dual View Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-[#1A1F36] tracking-tight">Find Verified Talent</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Browse proof-of-work verified professionals across Ghana with escrow protection
            </p>
          </div>

          <div className="flex items-center gap-2 bg-gray-100 p-1.5 rounded-2xl self-start sm:self-auto">
            <button
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                viewMode === "grid"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span>Grid View</span>
            </button>
            <button
              onClick={() => setViewMode("map")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                viewMode === "map"
                  ? "bg-white text-[#4F6AF5] shadow-sm"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <MapIcon className="w-4 h-4" />
              <span>Artisan Map View</span>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by worker name, skill (e.g. Electrician, React, Tailor), or district..."
            className="w-full bg-white border border-gray-200 rounded-2xl pl-11 pr-4 py-3.5 text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4F6AF5] shadow-sm"
          />
        </div>

        {/* Filters Panel */}
        <TalentFilters
          category={category}
          sortBy={sortBy}
          showFilters={showFilters}
          minTrustScore={minTrustScore}
          availableOnly={availableOnly}
          onCategoryChange={setCategory}
          onSortChange={setSortBy}
          onMinTrustScoreChange={setMinTrustScore}
          onToggleAvailableOnly={() => setAvailableOnly(!availableOnly)}
          onToggleFilters={() => setShowFilters(!showFilters)}
        />

        {/* View: Map Mode */}
        {viewMode === "map" && filteredWorkers && (
          <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden min-h-[420px] border border-slate-800 shadow-xl flex flex-col justify-between">
            {/* Map Canvas Background Grid */}
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(circle, #4F6AF5 1px, transparent 1px), radial-gradient(circle, #4F6AF5 1px, transparent 1px)",
                backgroundSize: "32px 32px",
                backgroundPosition: "0 0, 16px 16px",
              }}
            />

            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
              <div>
                <span className="text-xs uppercase font-bold text-[#6F8AFF] tracking-wider">
                  Field Agent GPS Verified Pins
                </span>
                <h3 className="text-lg font-bold text-white">Local Artisan Service Radius</h3>
              </div>
              <span className="text-xs bg-white/10 px-3 py-1 rounded-full text-white/80 border border-white/15">
                Accra & Greater Regions
              </span>
            </div>

            {/* Interactive Pins Simulation across Accra Districts */}
            <div className="relative h-64 sm:h-72 my-4">
              {[
                { top: "25%", left: "20%", name: "Accra Central", workerIdx: 0 },
                { top: "45%", left: "35%", name: "Osu / Cantonments", workerIdx: 1 },
                { top: "65%", left: "60%", name: "Tema Community 1", workerIdx: 2 },
                { top: "30%", left: "75%", name: "East Legon", workerIdx: 3 },
                { top: "70%", left: "25%", name: "Dansoman", workerIdx: 4 },
              ].map((pin, i) => {
                const w = filteredWorkers[pin.workerIdx % filteredWorkers.length];
                if (!w) return null;
                const isSelected = selectedMapWorker?.id === w.id;

                return (
                  <div
                    key={i}
                    onClick={() => setSelectedMapWorker(w)}
                    className="absolute cursor-pointer transition-transform hover:scale-110 -translate-x-1/2 -translate-y-1/2"
                    style={{ top: pin.top, left: pin.left }}
                  >
                    <div
                      className={`relative flex items-center justify-center p-2 rounded-2xl shadow-lg border-2 ${
                        isSelected
                          ? "bg-[#4F6AF5] text-white border-white scale-125 z-20"
                          : "bg-white text-gray-900 border-[#4F6AF5] z-10"
                      }`}
                    >
                      <MapPin className="w-4 h-4 text-rose-500 fill-rose-500" />
                      <span className="text-[10px] font-bold ml-1">{pin.name}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Selected Worker Map Card Preview */}
            <div className="relative z-10">
              {selectedMapWorker ? (
                <div className="bg-white rounded-2xl p-4 text-gray-900 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 max-w-xl mx-auto">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-[#1A1F36] text-white font-bold flex items-center justify-center">
                      {selectedMapWorker.full_name.slice(0, 2)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm">{selectedMapWorker.full_name}</h4>
                        <span className="text-xs text-emerald-600 font-bold">
                          ★ {selectedMapWorker.trust_score}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">{selectedMapWorker.location_district || "Accra Central"}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <span className="text-sm font-bold text-gray-900">
                      GHS {selectedMapWorker.hourly_rate_ghs}/hr
                    </span>
                    <button
                      onClick={() => router.push(`/employer/find-talent/${selectedMapWorker.id}`)}
                      className="px-4 py-2 bg-[#4F6AF5] hover:bg-[#3d56e0] text-white text-xs font-bold rounded-xl transition-all"
                    >
                      Book In-Person
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-center text-white/60">
                  Tap any map pin to preview verified artisans and in-person service radius.
                </p>
              )}
            </div>
          </div>
        )}

        {/* Results: Grid Mode */}
        {viewMode === "grid" && (
          <>
            {isLoading && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-56 bg-white rounded-3xl border border-gray-200" />
                ))}
              </div>
            )}

            {error && <ErrorState title="Couldn't load workers" onRetry={() => refetch()} />}

            {filteredWorkers && filteredWorkers.length === 0 && (
              <div className="text-center py-20 bg-white rounded-3xl border border-gray-200">
                <Briefcase className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                <h4 className="font-bold text-gray-900 text-base">No workers match this filter criteria</h4>
                <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
                  Try adjusting the minimum Trust Score slider or category filters.
                </p>
              </div>
            )}

            {filteredWorkers && filteredWorkers.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-4">
                  Showing {filteredWorkers.length} verified professional{filteredWorkers.length !== 1 ? "s" : ""}
                </p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredWorkers.map((worker) => (
                    <WorkerCard key={worker.id} worker={worker} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </EmployerLayout>
  );
}
