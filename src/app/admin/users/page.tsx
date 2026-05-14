// src/app/admin/users/page.tsx
"use client";

import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { useAdminUsers, useToggleUserBan } from "@/hooks/useAdmin";
import { Search, Shield, Ban, Check, X } from "lucide-react";
import { toast } from "sonner";

const roleColors: Record<string, string> = {
  worker: "bg-blue-50 text-blue-600",
  employer: "bg-purple-50 text-purple-600",
  admin: "bg-red-50 text-red-600",
  agent: "bg-emerald-50 text-emerald-600",
};

export default function UsersPage() {
  const { data: users, isLoading } = useAdminUsers();
  const toggleBan = useToggleUserBan();
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const filtered = users?.filter((u) => {
    const matchesSearch = u.fullName.toLowerCase().includes(search.toLowerCase()) ||
      u.phone.includes(search);
    const matchesRole = roleFilter === "all" || u.role === roleFilter;
    return matchesSearch && matchesRole;
  }) || [];

  const handleToggleBan = (id: string, currentStatus: boolean) => {
    toggleBan.mutate(
      { id, isActive: !currentStatus },
      {
        onSuccess: (data) => {
          toast.success(data.isActive ? "User unbanned" : "User banned");
        },
        onError: () => toast.error("Failed to update user"),
      }
    );
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="space-y-4 animate-pulse">
          <div className="h-8 w-48 bg-gray-100 rounded-lg" />
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-16 bg-white rounded-2xl border border-gray-100" />
          ))}
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-sm text-gray-500 mt-0.5">{users?.length || 0} total users</p>
        </div>

        {/* Search + Filters */}
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or phone..."
              className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
          >
            <option value="all">All Roles</option>
            <option value="worker">Workers</option>
            <option value="employer">Employers</option>
            <option value="admin">Admins</option>
            <option value="agent">Agents</option>
          </select>
        </div>

        {/* User list */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="divide-y divide-gray-50">
            {filtered.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-accent">
                      {user.fullName.split(" ").map((n) => n[0]).join("")}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-gray-900 truncate">{user.fullName}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${roleColors[user.role]}`}>
                        {user.role}
                      </span>
                      {!user.isActive && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-red-50 text-red-600 font-medium">Banned</span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{user.phone} · Joined {new Date(user.joinedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {/* Trust score for workers */}
                  {user.role === "worker" && (
                    <span className={`text-sm font-bold ${
                      user.trustScore >= 70 ? "text-emerald-600" : user.trustScore >= 40 ? "text-amber-600" : "text-red-600"
                    }`}>
                      {user.trustScore}
                    </span>
                  )}

                  {/* Ban/Unban button */}
                  <button
                    onClick={() => handleToggleBan(user.id, user.isActive)}
                    className={`p-2 rounded-lg transition-all ${
                      user.isActive
                        ? "text-red-500 hover:bg-red-50"
                        : "text-emerald-500 hover:bg-emerald-50"
                    }`}
                    title={user.isActive ? "Ban user" : "Unban user"}
                  >
                    {user.isActive ? <Ban className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <Shield className="w-12 h-12 text-gray-200 mx-auto mb-3" />
            <p className="text-gray-500">No users found</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}