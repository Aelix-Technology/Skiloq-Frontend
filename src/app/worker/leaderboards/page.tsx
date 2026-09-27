// src/app/worker/leaderboards/page.tsx
"use client";

import { useState } from "react";
import { WorkerLayout } from "@/components/layout/WorkerLayout";
import { Trophy, Medal, Star, MapPin, ShieldCheck, ArrowUpRight, Search, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface LeaderboardEntry {
  rank: number;
  id: string;
  name: string;
  category: "Digital" | "Trade" | "Educator" | "Online Income";
  skill: string;
  city: string;
  trustScore: number;
  completedJobs: number;
  avatar: string;
  hourlyRate: number;
  badge: string;
}

const mockLeaderboard: LeaderboardEntry[] = [
  {
    rank: 1,
    id: "w-01",
    name: "Kofi Mensah",
    category: "Trade",
    skill: "Certified Electrical Installation",
    city: "Accra",
    trustScore: 98.4,
    completedJobs: 87,
    avatar: "KM",
    hourlyRate: 110,
    badge: "Top 10 Accra",
  },
  {
    rank: 2,
    id: "w-02",
    name: "Abena Serwaa",
    category: "Digital",
    skill: "React & Next.js Architecture",
    city: "Accra",
    trustScore: 97.2,
    completedJobs: 64,
    avatar: "AS",
    hourlyRate: 140,
    badge: "Top 10 Accra",
  },
  {
    rank: 3,
    id: "w-03",
    name: "Oluwaseun Adeyemi",
    category: "Digital",
    skill: "Full-Stack TypeScript & Node",
    city: "Accra",
    trustScore: 95.8,
    completedJobs: 52,
    avatar: "OA",
    hourlyRate: 125,
    badge: "Top 10 Accra",
  },
  {
    rank: 4,
    id: "w-04",
    name: "Emanuel Boateng",
    category: "Trade",
    skill: "Master Tailoring & Bespoke Suits",
    city: "Kumasi",
    trustScore: 94.6,
    completedJobs: 98,
    avatar: "EB",
    hourlyRate: 95,
    badge: "Top 10 Kumasi",
  },
  {
    rank: 5,
    id: "w-05",
    name: "Chidinma Eze",
    category: "Educator",
    skill: "Advanced Mathematics & Coding Tutor",
    city: "Lagos",
    trustScore: 93.9,
    completedJobs: 41,
    avatar: "CE",
    hourlyRate: 130,
    badge: "Top 10 Lagos",
  },
  {
    rank: 6,
    id: "w-06",
    name: "Kwaku Frimpong",
    category: "Trade",
    skill: "Solar PV Installation & Inverters",
    city: "Accra",
    trustScore: 92.5,
    completedJobs: 46,
    avatar: "KF",
    hourlyRate: 120,
    badge: "Top 10 Accra",
  },
  {
    rank: 7,
    id: "w-07",
    name: "Faith Mutua",
    category: "Online Income",
    skill: "Medical Transcription & OCR Quality",
    city: "Nairobi",
    trustScore: 91.8,
    completedJobs: 130,
    avatar: "FM",
    hourlyRate: 75,
    badge: "Top 10 Nairobi",
  },
];

export default function LeaderboardsPage() {
  const router = useRouter();
  const [selectedCity, setSelectedCity] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = mockLeaderboard.filter((entry) => {
    const matchesCity = selectedCity === "All" || entry.city.toLowerCase() === selectedCity.toLowerCase();
    const matchesCategory = selectedCategory === "All" || entry.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = !search || entry.name.toLowerCase().includes(search.toLowerCase()) || entry.skill.toLowerCase().includes(search.toLowerCase());
    return matchesCity && matchesCategory && matchesSearch;
  });

  return (
    <WorkerLayout>
      <div className="space-y-6">
        {/* Banner */}
        <div className="bg-gradient-to-br from-[#1A1F36] via-[#1E274D] to-[#15192E] rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
          <div className="pointer-events-none absolute -right-16 -top-16 w-52 h-52 rounded-full bg-amber-500/20 blur-3xl" />
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 border border-amber-400/30 px-3 py-1 rounded-full text-xs font-bold mb-3">
                <Trophy className="w-3.5 h-3.5" />
                Phase 2 Regional Rankings
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Regional Skills Leaderboards</h1>
              <p className="text-sm text-white/70 max-w-xl mt-1.5 leading-relaxed">
                Top 10 verified workers per skill and city calculated monthly based on Trust Score (60%) and completed jobs (40%). Workers on leaderboards unlock priority search badges.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 text-center shrink-0">
              <span className="text-xs text-white/70 font-medium">Your Rank in Accra</span>
              <p className="text-2xl sm:text-3xl font-black text-amber-300 mt-0.5">#3</p>
              <span className="text-[11px] text-emerald-400 font-semibold">Top 10 Accra Badge Active</span>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search skill or worker..."
              className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4F6AF5]"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <div className="flex bg-gray-100 p-1 rounded-xl text-xs font-semibold shrink-0">
              {["All", "Accra", "Kumasi", "Lagos", "Nairobi"].map((city) => (
                <button
                  key={city}
                  onClick={() => setSelectedCity(city)}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    selectedCity === city ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>

            <div className="flex bg-gray-100 p-1 rounded-xl text-xs font-semibold shrink-0">
              {["All", "Digital", "Trade", "Educator"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    selectedCategory === cat ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Leaderboard Table / Cards */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="divide-y divide-gray-100">
            {filtered.map((w) => (
              <div
                key={w.id}
                className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50/80 transition-colors"
              >
                <div className="flex items-center gap-3.5 flex-1 min-w-0">
                  <div className="w-8 flex items-center justify-center font-extrabold text-sm sm:text-base shrink-0">
                    {w.rank === 1 ? (
                      <span className="w-7 h-7 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-black shadow-xs">
                        🥇 1
                      </span>
                    ) : w.rank === 2 ? (
                      <span className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-black shadow-xs">
                        🥈 2
                      </span>
                    ) : w.rank === 3 ? (
                      <span className="w-7 h-7 rounded-full bg-amber-50 text-amber-800 flex items-center justify-center text-xs font-black shadow-xs">
                        🥉 3
                      </span>
                    ) : (
                      <span className="text-gray-400">#{w.rank}</span>
                    )}
                  </div>

                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#4F6AF5] to-[#6F8AFF] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-sm">
                    {w.avatar}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-sm sm:text-base text-gray-900 truncate">{w.name}</h3>
                      <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold">
                        {w.badge}
                      </span>
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 font-medium">
                        {w.category}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5 truncate">{w.skill}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-400 mt-1">
                      <span className="flex items-center gap-1 text-gray-600 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-gray-400" />
                        {w.city}
                      </span>
                      <span>•</span>
                      <span>{w.completedJobs} completed jobs</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-5 pt-3 sm:pt-0 border-t sm:border-0 border-gray-100 shrink-0">
                  <div className="text-left sm:text-right">
                    <div className="flex items-center gap-1 text-emerald-600 font-bold text-sm">
                      <ShieldCheck className="w-4 h-4" />
                      <span>{w.trustScore}</span>
                      <span className="text-[10px] text-gray-400 font-normal">/100</span>
                    </div>
                    <p className="text-[11px] text-gray-500 mt-0.5">Trust Score</p>
                  </div>

                  <button
                    onClick={() => router.push(`/employer/find-talent/${w.id}`)}
                    className="px-4 py-2 bg-gray-100 hover:bg-[#4F6AF5] text-gray-700 hover:text-white rounded-xl text-xs font-semibold transition-all active:scale-95"
                  >
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </WorkerLayout>
  );
}
