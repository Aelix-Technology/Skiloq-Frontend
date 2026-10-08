// src/app/b2b/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { EmployerLayout } from "@/components/layout/EmployerLayout";
import {
  Code2, Key, Webhook, Activity, ShieldCheck, Copy, Check,
  ExternalLink, Plus, RefreshCw, Terminal, Layers, BookOpen,
  CheckCircle2, Sparkles, AlertCircle
} from "lucide-react";
import { mockB2BKeys, mockB2BWebhooks, mockB2BMetrics } from "@/lib/mock-phase3";
import type { B2BAPIKey, B2BWebhookEndpoint } from "@/types/phase3";
import { toast } from "sonner";

export default function B2BDeveloperPlatformPage() {
  const [keys, setKeys] = useState<B2BAPIKey[]>(mockB2BKeys);
  const [webhooks, setWebhooks] = useState<B2BWebhookEndpoint[]>(mockB2BWebhooks);
  const [activeCodeTab, setActiveCodeTab] = useState<"curl" | "typescript" | "python">("typescript");
  const [copiedKeyId, setCopiedKeyId] = useState<string | null>(null);
  const [isNewKeyModalOpen, setIsNewKeyModalOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [newKeyEnv, setNewKeyEnv] = useState<"sandbox" | "production">("production");

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKeyId(id);
    toast.success("API key copied to clipboard!");
    setTimeout(() => setCopiedKeyId(null), 2000);
  };

  const handleCreateKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName.trim()) return;

    const newKey: B2BAPIKey = {
      id: `key-${Date.now()}`,
      name: newKeyName,
      prefix: newKeyEnv === "production" ? "sk_live" : "sk_test",
      keyMasked: `${newKeyEnv === "production" ? "sk_live" : "sk_test"}_${Math.random().toString(36).substring(2, 6)}••••••••••••••••${Math.random().toString(36).substring(2, 6)}`,
      environment: newKeyEnv,
      scopes: ["workers:read", "workers:verify", "escrow:create"],
      createdAt: "Just now",
      requestCountLast30Days: 0,
      rateLimitPerMin: newKeyEnv === "production" ? 1000 : 250,
      status: "active",
    };

    setKeys([newKey, ...keys]);
    setIsNewKeyModalOpen(false);
    setNewKeyName("");
    toast.success("New B2B API Key generated successfully!");
  };

  const codeSnippets = {
    typescript: `import { SkiloqClient } from "@skiloq/sdk";

const skiloq = new SkiloqClient({
  apiKey: process.env.SKILOQ_API_KEY, // sk_live_...
  environment: "production",
});

// 1. Verify Worker Identity & Trust Score
const worker = await skiloq.workers.get("w-boateng-98", {
  includeVerificationProofs: true,
});
console.log("Worker Trust Score:", worker.trustScore); // 98/100

// 2. Programmatically Fund Project Escrow
const escrow = await skiloq.escrow.create({
  jobId: "job-accra-402",
  amountGhs: 4500.00,
  currency: "GHS",
  payoutTrigger: "milestone_approved",
});
console.log("Escrow Status:", escrow.status); // "funded"`,

    curl: `curl -X POST https://api.skiloq.com/v1/escrow/create \\
  -H "Authorization: Bearer sk_live_98ab33e..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "worker_id": "w-boateng-98",
    "amount": 4500.00,
    "currency": "GHS",
    "metadata": {
      "corporate_ref": "ECO-NGO-2026-884"
    }
  }'`,

    python: `import os
from skiloq import SkiloqClient

client = SkiloqClient(api_key=os.getenv("SKILOQ_API_KEY"))

# Search top-rated trade artisans in Accra
workers = client.workers.list(
    category="trade",
    city="Accra Metropolitan",
    min_trust_score=90,
    available_now=True
)

for worker in workers:
    print(f"{worker.name}: {worker.hourly_rate_ghs} GHS/hr (Trust: {worker.trust_score})")`,
  };

  return (
    <EmployerLayout>
      <div className="space-y-8 pb-12">
        {/* Hero Header */}
        <div className="bg-gradient-to-br from-[#0B0F19] via-[#111827] to-[#1E293B] rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden shadow-xl border border-white/10">
          <div className="pointer-events-none absolute -right-20 -top-20 w-72 h-72 rounded-full bg-blue-600/20 blur-3xl" />
          <div className="pointer-events-none absolute left-1/3 -bottom-20 w-64 h-64 rounded-full bg-emerald-500/15 blur-3xl" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-bold">
                <Code2 className="w-3.5 h-3.5" />
                B2B Infrastructure Layer
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                Developer API & Enterprise Gateway
              </h1>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                Connect banks, NGOs, and payroll systems directly to Africa&apos;s verified talent grid. Query trust scores, automate milestone escrow disbursements, and receive instant webhook notifications.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setIsNewKeyModalOpen(true)}
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-sm transition-all shadow-[0_8px_25px_-6px_rgba(37,99,235,0.6)] cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Generate API Key</span>
              </button>

              <button
                type="button"
                onClick={() => toast.info("Opening API Reference (OpenAPI 3.1 Specification)...")}
                className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm transition-all border border-white/15 cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                <span>API Docs</span>
              </button>
            </div>
          </div>

          {/* Real-time Usage Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-white/10 relative z-10 text-xs">
            <div>
              <span className="text-gray-400 block font-medium">Monthly API Calls</span>
              <span className="text-xl sm:text-2xl font-black text-white mt-0.5 block">
                {mockB2BMetrics.totalCallsMonth.toLocaleString()}
              </span>
              <span className="text-[11px] text-gray-400">of 500k quota</span>
            </div>
            <div>
              <span className="text-gray-400 block font-medium">Average Latency</span>
              <span className="text-xl sm:text-2xl font-black text-emerald-400 mt-0.5 block">
                {mockB2BMetrics.averageLatencyMs}ms
              </span>
              <span className="text-[11px] text-emerald-400/80">99.98% SLA</span>
            </div>
            <div>
              <span className="text-gray-400 block font-medium">Workers Queried</span>
              <span className="text-xl sm:text-2xl font-black text-white mt-0.5 block">
                {mockB2BMetrics.activeWorkersQueried.toLocaleString()}
              </span>
              <span className="text-[11px] text-gray-400">KYC Hash verified</span>
            </div>
            <div>
              <span className="text-gray-400 block font-medium">Automated Payouts</span>
              <span className="text-xl sm:text-2xl font-black text-blue-400 mt-0.5 block">
                GHS {(mockB2BMetrics.payoutVolumeGhs / 1000).toFixed(0)}k
              </span>
              <span className="text-[11px] text-blue-400/80">Zero manual intervention</span>
            </div>
          </div>
        </div>

        {/* API Keys Management Section */}
        <div className="bg-white rounded-3xl border border-gray-200/90 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <div className="flex items-center gap-2.5">
              <Key className="w-5 h-5 text-blue-600" />
              <div>
                <h2 className="text-lg font-bold text-gray-900">API Credentials</h2>
                <p className="text-xs text-gray-500">Manage authorization tokens for production and sandbox environments</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsNewKeyModalOpen(true)}
              className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> New Key
            </button>
          </div>

          <div className="space-y-3">
            {keys.map((k) => (
              <div
                key={k.id}
                className="p-5 rounded-2xl border border-gray-200 bg-gray-50/50 hover:bg-white hover:border-blue-200 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm text-gray-900">{k.name}</h3>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        k.environment === "production"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}
                    >
                      {k.environment}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 pt-1 font-mono text-xs text-gray-600">
                    <span className="bg-white px-2.5 py-1 rounded-lg border border-gray-200">
                      {k.keyMasked}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy(k.keyMasked, k.id)}
                      className="p-1 rounded-lg hover:bg-gray-200 text-gray-500 transition-colors"
                      title="Copy Key"
                    >
                      {copiedKeyId === k.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-gray-400">
                    <span>Created: {k.createdAt}</span>
                    <span>•</span>
                    <span>Rate Limit: {k.rateLimitPerMin} req/min</span>
                    <span>•</span>
                    <span>30-Day Calls: {k.requestCountLast30Days.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Active
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Webhooks Section */}
        <div className="bg-white rounded-3xl border border-gray-200/90 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <div className="flex items-center gap-2.5">
              <Webhook className="w-5 h-5 text-indigo-600" />
              <div>
                <h2 className="text-lg font-bold text-gray-900">Webhook Subscriptions</h2>
                <p className="text-xs text-gray-500">Real-time HTTP push events for escrow, milestone, and attendance updates</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => toast.success("Test ping event sent to all endpoints! HTTP 200 OK received.")}
              className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Test Webhooks
            </button>
          </div>

          <div className="space-y-3">
            {webhooks.map((wh) => (
              <div
                key={wh.id}
                className="p-4 sm:p-5 rounded-2xl border border-gray-200 bg-white shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 font-mono text-xs font-bold text-gray-800">
                    <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-600">POST</span>
                    <span className="truncate max-w-sm sm:max-w-md">{wh.url}</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {wh.events.map((ev) => (
                      <span
                        key={ev}
                        className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-50 text-blue-700 border border-blue-100"
                      >
                        {ev}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                    {wh.successRatePercent}% delivery
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Code Explorer */}
        <div className="bg-[#0B0F19] rounded-3xl border border-white/10 shadow-xl p-6 sm:p-8 text-white space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Terminal className="w-5 h-5 text-blue-400" />
              <h3 className="font-bold text-base">Interactive Code Sandbox</h3>
            </div>

            <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10">
              {(["typescript", "curl", "python"] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveCodeTab(tab)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                    activeCodeTab === tab
                      ? "bg-[#2563EB] text-white shadow-sm"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <pre className="p-4 rounded-2xl bg-black/40 border border-white/5 text-xs font-mono text-blue-200 overflow-x-auto leading-relaxed">
            <code>{codeSnippets[activeCodeTab]}</code>
          </pre>
        </div>

        {/* Create Key Modal */}
        {isNewKeyModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-150">
            <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">Create New B2B API Key</h3>

              <form onSubmit={handleCreateKey} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                    Key Description / Name
                  </label>
                  <input
                    type="text"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                    placeholder="e.g. NGO Automated Payouts Key"
                    required
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500"
                    autoFocus
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                    Environment
                  </label>
                  <select
                    value={newKeyEnv}
                    onChange={(e) => setNewKeyEnv(e.target.value as "sandbox" | "production")}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500"
                  >
                    <option value="production">Production (sk_live_...)</option>
                    <option value="sandbox">Sandbox Testing (sk_test_...)</option>
                  </select>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsNewKeyModalOpen(false)}
                    className="px-4 py-2.5 text-xs font-bold text-gray-500 hover:text-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#2563EB] text-white hover:bg-[#1D4ED8]"
                  >
                    Generate Key
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </EmployerLayout>
  );
}
