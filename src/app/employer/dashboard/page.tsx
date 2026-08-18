"use client";

import { useRouter } from "next/navigation";
import { EmployerLayout } from "@/components/layout/EmployerLayout";
import {
  Briefcase, Users, DollarSign, Star, Plus, ChevronRight,
  MessageSquare, Clock, CheckCircle2, Mail, UserCheck, Zap,
  MessageCircle, AlertCircle,
} from "lucide-react";

export default function EmployerDashboardPage() {
  const router = useRouter();

  return (
    <EmployerLayout>
      <div className="space-y-8">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Employer Dashboard</h1>
            <p className="text-base text-gray-500 mt-2">Welcome back, managing your global talent pipeline.</p>
          </div>
          <button
            onClick={() => router.push("/employer/post-job")}
            className="flex items-center gap-2 bg-[#2563EB] text-white text-sm font-bold px-7 py-3.5 rounded-xl hover:bg-[#1D4ED8] transition-colors shadow-[0_8px_24px_-6px_rgba(37,99,235,0.5)]"
          >
            <Plus className="w-5 h-5" />
            Post a Job
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: Briefcase, label: "Jobs Posted", value: "24", change: "+3 this month", changeColor: "text-green-500", iconBg: "bg-[#F0F5FF] text-[#2563EB]" },
            { icon: Users, label: "Talent Hired", value: "182", change: null, changeColor: "", iconBg: "bg-[#F0F5FF] text-[#2563EB]" },
            { icon: DollarSign, label: "Total Spent", value: "$42.8k", change: null, changeColor: "", iconBg: "bg-[#F0F5FF] text-[#2563EB]" },
            { icon: Star, label: "Employer Rating", value: "4.9/5.0", change: null, changeColor: "", iconBg: "bg-[#FEF3C7] text-[#D97706]" },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-5">
                <p className="text-sm font-bold text-gray-500 uppercase tracking-wide">{stat.label}</p>
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${stat.iconBg}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
              </div>
              <p className="text-3xl font-extrabold text-gray-900 tracking-tight">{stat.value}</p>
              {stat.change && (
                <p className={`text-sm font-bold mt-2 ${stat.changeColor}`}>{stat.change}</p>
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                <h3 className="text-xl font-bold text-gray-900">Active Jobs</h3>
                <button
                  onClick={() => router.push("/employer/jobs")}
                  className="text-sm font-bold text-[#2563EB] hover:underline"
                >
                  View All
                </button>
              </div>

              <div>
                <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 hover:bg-gray-50/50 transition-colors cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#F0F5FF] flex items-center justify-center text-[#2563EB] shrink-0">
                      <Briefcase className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-gray-900">Senior React Developer</h4>
                      <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          2 days ago
                        </span>
                        <span className="px-3 py-1 rounded-full bg-[#2563EB] text-white text-xs font-bold">
                          Hiring
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-base font-bold text-gray-900">12 Applications</p>
                      <p className="text-sm text-[#2563EB] font-semibold">4 New</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </div>

                <div className="flex items-center justify-between px-6 py-5 hover:bg-gray-50/50 transition-colors cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#F0F5FF] flex items-center justify-center text-[#2563EB] shrink-0">
                      <Briefcase className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-gray-900">UI/UX Product Designer</h4>
                      <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          1 week ago
                        </span>
                        <span className="px-3 py-1 rounded-full bg-[#DBEAFE] text-[#1E40AF] text-xs font-bold">
                          In Progress
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-base font-bold text-gray-900">Project milestones</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-32 h-2 rounded-full bg-gray-100 overflow-hidden">
                          <div className="h-full rounded-full bg-[#2563EB]" style={{ width: "60%" }} />
                        </div>
                        <span className="text-sm font-bold text-gray-700">60% Complete</span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                <h3 className="text-xl font-bold text-gray-900">Pending Applications</h3>
              </div>

              <div className="p-6 space-y-4">
                {[
                  {
                    name: "Amara Okafor",
                    role: "Full Stack Engineer",
                    rate: "$45/hr",
                    trustScore: 98,
                    verified: true,
                    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&h=160&fit=crop&crop=faces",
                  },
                  {
                    name: "Elena Rodriguez",
                    role: "UX Specialist",
                    rate: "$60/hr",
                    trustScore: 92,
                    verified: true,
                    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=160&h=160&fit=crop&crop=faces",
                  },
                ].map((app, i) => (
                  <div key={i} className="flex items-center gap-5 p-4 rounded-xl border border-gray-200 hover:bg-gray-50/50 transition-colors">
                    <img
                      src={app.img}
                      alt={app.name}
                      className="w-14 h-14 rounded-xl object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-lg text-gray-900">{app.name}</h4>
                        {app.verified && (
                          <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {app.role} • {app.rate}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                      <div className="min-w-[180px]">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Trust Score</span>
                          <span className="text-sm font-extrabold text-gray-900">{app.trustScore}</span>
                        </div>
                        <div className="w-full h-2.5 rounded-full bg-gray-100 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-[#2563EB]"
                            style={{ width: `${app.trustScore}%` }}
                          />
                        </div>
                      </div>

                      <button className="w-11 h-11 rounded-xl bg-[#F0F5FF] text-[#2563EB] flex items-center justify-center hover:bg-[#DBEAFE] transition-colors">
                        <MessageSquare className="w-5 h-5" />
                      </button>
                      <button className="px-6 py-3 bg-[#1A1F36] text-white text-sm font-bold rounded-xl hover:bg-gray-900 transition-colors shadow-[0_4px_12px_-2px_rgba(26,31,54,0.3)]">
                        Review
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#DBEAFE] rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Quick Re-hire</h3>
              <p className="text-sm text-gray-600 mb-6">Top performers from your previous projects.</p>

              <div className="space-y-3">
                {[
                  {
                    name: "Marcus Chen",
                    role: "DevOps Engineer",
                    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&fit=crop&crop=faces",
                  },
                  {
                    name: "Sarah Miller",
                    role: "Illustrator",
                    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&h=160&fit=crop&crop=faces",
                  },
                ].map((w, i) => (
                  <div key={i} className="bg-white rounded-xl p-4 flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer">
                    <img
                      src={w.img}
                      alt={w.name}
                      className="w-11 h-11 rounded-xl object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-sm text-gray-900 truncate">{w.name}</h4>
                      <p className="text-xs text-gray-500">{w.role}</p>
                    </div>
                    <div className="w-9 h-9 rounded-lg bg-[#F0F5FF] flex items-center justify-center text-[#2563EB] shrink-0">
                      <Zap className="w-5 h-5" />
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-5 py-3.5 rounded-xl border-2 border-[#2563EB]/30 text-[#2563EB] text-sm font-bold hover:bg-white transition-colors">
                Invite Others
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h3>

              <div className="space-y-6">
                {[
                  {
                    icon: CheckCircle2,
                    iconBg: "bg-green-50 text-green-600",
                    title: "Milestone Paid",
                    desc: "Sarah Miller - Illustration Assets",
                    time: "2H AGO",
                  },
                  {
                    icon: Mail,
                    iconBg: "bg-[#F0F5FF] text-[#2563EB]",
                    title: "New Message",
                    desc: "Marcus Chen regarding DevOps deployment",
                    time: "5H AGO",
                  },
                  {
                    icon: UserCheck,
                    iconBg: "bg-[#DBEAFE] text-[#1E40AF]",
                    title: "Applicant Shortlisted",
                    desc: "Senior React Developer position",
                    time: "YESTERDAY",
                  },
                ].map((act, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="relative shrink-0">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center ${act.iconBg}`}>
                        <act.icon className="w-5 h-5" />
                      </div>
                      {i !== 2 && (
                        <div className="absolute left-1/2 top-10 w-0.5 h-8 -translate-x-1/2 bg-gray-200" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-sm text-gray-900">{act.title}</h4>
                      <p className="text-xs text-gray-500 mt-1">{act.desc}</p>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mt-2">{act.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </EmployerLayout>
  );
}
