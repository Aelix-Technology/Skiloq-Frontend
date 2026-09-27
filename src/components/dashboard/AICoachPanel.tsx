// src/components/dashboard/AICoachPanel.tsx
"use client";

import { useState } from "react";
import { Sparkles, Send, Bot, Lightbulb, ChevronRight, CheckCircle2, TrendingUp, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AICoachMessage {
  id: string;
  sender: "ai" | "user";
  text: string;
  actionTitle?: string;
  actionUrl?: string;
  timestamp: string;
}

const initialSuggestions = [
  "How can I reach the Verified Expert tier?",
  "Which assessments will unlock more jobs in Accra?",
  "How does my hourly rate compare to other developers?",
  "What skills should I learn next to increase earnings?",
];

const mockReplies: Record<string, { text: string; actionTitle?: string; actionUrl?: string }> = {
  "How can I reach the Verified Expert tier?": {
    text: "You are currently at a Trust Score of 82.5 (Top Rated). To cross into Verified Expert (85+), complete your pending Agent Physical Verification (+2.5 pts) and request 2 peer vouches from verified colleagues (+2.0 pts). This will also lower your platform fee from 12% to 8%!",
    actionTitle: "Schedule Verification",
    actionUrl: "/worker/verification",
  },
  "Which assessments will unlock more jobs in Accra?": {
    text: "There are currently 14 open client requests in Greater Accra searching for 'TypeScript Architecture' and 'Next.js App Router'. Taking these 2 assessments will qualify your profile for 85%+ auto-match priority.",
    actionTitle: "Browse Skill Assessments",
    actionUrl: "/academy",
  },
  "How does my hourly rate compare to other developers?": {
    text: "Your current stated rate is GHS 85/hr. Top-rated full-stack developers in Accra with your 95% completion rate are currently charging GHS 120–150/hr. You have room to safely adjust your rate by 20% without losing match velocity.",
    actionTitle: "Update Profile Rate",
    actionUrl: "/worker/profile",
  },
  "What skills should I learn next to increase earnings?": {
    text: "Cloud infrastructure and PostgreSQL performance tuning have the highest demand-to-worker ratio on Skiloq this quarter (+40% demand). Enrolling in the AfriSkills Cloud Practitioner pilot course could increase your monthly earnings by GHS 1,200.",
    actionTitle: "Explore AfriSkills Academy",
    actionUrl: "/academy",
  },
};

export function AICoachPanel() {
  const [messages, setMessages] = useState<AICoachMessage[]>([
    {
      id: "welcome",
      sender: "ai",
      text: "Hello Oluwaseun! I'm your AI Career Coach. Based on your 82.5 Trust Score and recent project completions, I've analyzed high-demand talent matches across Accra and remote employers.",
      timestamp: "Just now",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = (queryText: string) => {
    if (!queryText.trim()) return;

    const userMsg: AICoachMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: queryText,
      timestamp: "Just now",
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const match = mockReplies[queryText] || {
        text: `Great question regarding "${queryText}". In the Ghanaian and Pan-African marketplace, workers with verified proof-of-work badges and completed milestone records receive 4.5× more direct client offers. Keep completing verified reviews and maintain your zero dispute record!`,
        actionTitle: "View Active Opportunities",
        actionUrl: "/worker/opportunities",
      };

      const aiMsg: AICoachMessage = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: match.text,
        actionTitle: match.actionTitle,
        actionUrl: match.actionUrl,
        timestamp: "Just now",
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <div className="bg-gradient-to-br from-[#1A1F36] via-[#1E2545] to-[#15192E] rounded-3xl p-5 sm:p-6 text-white shadow-xl shadow-primary/20 border border-white/10 relative overflow-hidden">
      {/* Decorative ambient gradients */}
      <div className="pointer-events-none absolute -right-20 -top-20 w-56 h-56 rounded-full bg-[#4F6AF5]/25 blur-3xl" />
      <div className="pointer-events-none absolute -left-16 bottom-0 w-48 h-48 rounded-full bg-[#22C55E]/15 blur-3xl" />

      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#4F6AF5] to-[#6885FA] flex items-center justify-center shadow-lg shadow-[#4F6AF5]/30">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-base tracking-tight text-white">AI Career Coach</h3>
              <span className="px-2 py-0.5 rounded-full bg-[#4F6AF5]/20 text-[#6885FA] border border-[#4F6AF5]/30 text-[10px] font-semibold">
                Phase 2 AI
              </span>
            </div>
            <p className="text-xs text-white/60">Real-time Trust Score & career insights</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/80">
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span>5/5 free queries</span>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="my-4 space-y-3 max-h-72 overflow-y-auto pr-1 text-sm relative z-10">
        <AnimatePresence initial={false}>
          {messages.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-2.5 ${m.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              {m.sender === "ai" && (
                <div className="w-7 h-7 rounded-xl bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4 text-[#6885FA]" />
                </div>
              )}
              <div
                className={`max-w-[85%] rounded-2xl p-3.5 ${
                  m.sender === "user"
                    ? "bg-[#4F6AF5] text-white"
                    : "bg-white/10 backdrop-blur-md text-white/90 border border-white/10"
                }`}
              >
                <p className="text-xs sm:text-sm leading-relaxed">{m.text}</p>
                {m.actionTitle && m.actionUrl && (
                  <a
                    href={m.actionUrl}
                    className="mt-2.5 inline-flex items-center gap-1 text-xs font-semibold text-[#8BA4FF] hover:text-white transition-colors"
                  >
                    <span>{m.actionTitle}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-xs text-white/60 pl-9">
              <span className="w-2 h-2 rounded-full bg-[#4F6AF5] animate-ping" />
              <span>Analyzing market data & trust score...</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Suggested prompts chips */}
      <div className="space-y-1.5 pt-2 border-t border-white/10 relative z-10">
        <p className="text-[11px] uppercase tracking-wider text-white/50 font-semibold flex items-center gap-1.5">
          <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
          Suggested Career Inquiries
        </p>
        <div className="flex flex-wrap gap-1.5">
          {initialSuggestions.map((prompt) => (
            <button
              key={prompt}
              onClick={() => sendMessage(prompt)}
              className="text-left text-xs bg-white/5 hover:bg-white/15 text-white/80 hover:text-white px-3 py-1.5 rounded-xl border border-white/10 transition-all hover:scale-[1.01]"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(input);
        }}
        className="mt-3 flex gap-2 relative z-10"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask coach how to boost earnings or trust score..."
          className="flex-1 bg-white/10 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#4F6AF5]"
        />
        <button
          type="submit"
          disabled={!input.trim() || isTyping}
          className="px-4 py-2.5 bg-[#4F6AF5] hover:bg-[#3f5be0] text-white rounded-xl transition-all disabled:opacity-50 flex items-center justify-center shadow-md active:scale-95"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
