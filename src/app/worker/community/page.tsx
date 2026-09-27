// src/app/worker/community/page.tsx
"use client";

import { useState } from "react";
import { WorkerLayout } from "@/components/layout/WorkerLayout";
import { MessageSquare, Users, Sparkles, Send, ShieldCheck, ThumbsUp, AlertCircle, Share2, Plus, Flag } from "lucide-react";
import { toast } from "sonner";

interface CommunityPost {
  id: string;
  authorName: string;
  authorBadge: string;
  avatar: string;
  timeAgo: string;
  content: string;
  category: string;
  likes: number;
  repliesCount: number;
  hasLiked?: boolean;
}

const channels = [
  { id: "all", name: "All Channels", count: 184 },
  { id: "tech-accra", name: "#developers-accra", count: 48 },
  { id: "trades-ghana", name: "#electricians-plumbers", count: 62 },
  { id: "tailors-kumasi", name: "#fashion-tailors-kumasi", count: 35 },
  { id: "tutors-africa", name: "#educators-network", count: 39 },
];

const mockPosts: CommunityPost[] = [
  {
    id: "p1",
    authorName: "Kwame Boateng",
    authorBadge: "Verified Expert • Top 10 Accra",
    avatar: "KB",
    timeAgo: "2 hours ago",
    category: "#developers-accra",
    content: "Heads up team: multiple fintech clients are expanding their USSD & MoMo integration backend microservices this quarter. If you haven't taken the payment webhooks assessment, do it this week. It immediately boosted my direct inquiries!",
    likes: 18,
    repliesCount: 6,
  },
  {
    id: "p2",
    authorName: "Grace Ansah",
    authorBadge: "Trade Master • Top 5 Kumasi",
    avatar: "GA",
    timeAgo: "4 hours ago",
    category: "#fashion-tailors-kumasi",
    content: "Wedding season is starting early! Always ensure your client confirms the Smart Scope document before you cut premium Kente or lace fabrics. That way escrow auto-protects your custom measurement time if they ask for radical alterations later.",
    likes: 31,
    repliesCount: 11,
  },
  {
    id: "p3",
    authorName: "Oluwaseun Adeyemi",
    authorBadge: "Top Rated Full-Stack",
    avatar: "OA",
    timeAgo: "6 hours ago",
    category: "#developers-accra",
    content: "Just hit the GHS 10,000 milestone! The Savings Vault 'Lock & Earn' feature at 10.5% APY is super handy for putting aside tax and equipment upgrades. Has anyone else enabled auto round-up?",
    likes: 24,
    repliesCount: 8,
  },
];

export default function CommunityPage() {
  const [selectedChannel, setSelectedChannel] = useState("all");
  const [posts, setPosts] = useState<CommunityPost[]>(mockPosts);
  const [newPostContent, setNewPostContent] = useState("");

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    const newPost: CommunityPost = {
      id: `p-${Date.now()}`,
      authorName: "Oluwaseun Adeyemi",
      authorBadge: "Top Rated Full-Stack",
      avatar: "OA",
      timeAgo: "Just now",
      category: selectedChannel === "all" ? "#developers-accra" : channels.find(c => c.id === selectedChannel)?.name || "#general",
      content: newPostContent.trim(),
      likes: 0,
      repliesCount: 0,
    };

    setPosts([newPost, ...posts]);
    setNewPostContent("");
    toast.success("Post shared to Community Channel!", {
      description: "Platform NLP scan verified: clean content adhering to community safety guidelines.",
    });
  };

  const handleLike = (id: string) => {
    setPosts(posts.map(p => {
      if (p.id === id) {
        const hasLiked = p.hasLiked;
        return {
          ...p,
          likes: hasLiked ? p.likes - 1 : p.likes + 1,
          hasLiked: !hasLiked,
        };
      }
      return p;
    }));
  };

  const filteredPosts = selectedChannel === "all"
    ? posts
    : posts.filter(p => {
        const chan = channels.find(c => c.id === selectedChannel);
        return chan && p.category.toLowerCase() === chan.name.toLowerCase();
      });

  return (
    <WorkerLayout>
      <div className="space-y-6">
        {/* Banner */}
        <div className="bg-gradient-to-br from-[#1A1F36] via-[#1E2545] to-[#15192E] rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
          <div className="pointer-events-none absolute -right-16 -top-16 w-52 h-52 rounded-full bg-[#4F6AF5]/25 blur-3xl" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-[#4F6AF5]/20 text-[#6F8AFF] border border-[#4F6AF5]/30 px-3 py-1 rounded-full text-xs font-bold mb-3">
              <Users className="w-3.5 h-3.5" />
              Phase 2 Verified Community
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Verified Worker Community</h1>
            <p className="text-sm text-white/70 max-w-xl mt-1.5 leading-relaxed">
              Platform-moderated channels for verified African artisans and knowledge workers. Share job leads, rate intelligence, and peer support.
            </p>
          </div>
        </div>

        {/* Layout: Sidebar channels + Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Channels list */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-sm space-y-2">
              <h3 className="font-bold text-xs uppercase tracking-wider text-gray-400 mb-3 px-2">
                Moderated Channels
              </h3>
              <div className="space-y-1">
                {channels.map((chan) => (
                  <button
                    key={chan.id}
                    onClick={() => setSelectedChannel(chan.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-2xl text-xs font-semibold transition-all ${
                      selectedChannel === chan.id
                        ? "bg-[#4F6AF5] text-white shadow-md shadow-[#4F6AF5]/25"
                        : "text-gray-700 hover:bg-gray-100/80"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <MessageSquare className="w-3.5 h-3.5" />
                      {chan.name}
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                      selectedChannel === chan.id ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
                    }`}>
                      {chan.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Moderation notice */}
            <div className="bg-blue-50/60 rounded-2xl p-4 border border-blue-100 text-xs text-blue-900 space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold">
                <ShieldCheck className="w-4 h-4 text-[#4F6AF5]" />
                Community Safety Protected
              </div>
              <p className="text-[11px] text-blue-800/80 leading-relaxed">
                Posts are NLP-scanned to prevent off-platform escrow fraud and external phishing. Always transact via platform escrow for payment protection.
              </p>
            </div>
          </div>

          {/* Posts Feed */}
          <div className="lg:col-span-8 space-y-4">
            {/* Create Post Card */}
            <form onSubmit={handleCreatePost} className="bg-white rounded-3xl p-5 border border-gray-200 shadow-sm space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#4F6AF5] to-[#6885FA] text-white flex items-center justify-center font-bold text-sm shrink-0">
                  OA
                </div>
                <input
                  type="text"
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  placeholder="Share a tip, job lead, or question with verified peers..."
                  className="flex-1 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-xs sm:text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4F6AF5]"
                />
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <span className="text-[11px] text-gray-400">Posting to: {channels.find(c => c.id === selectedChannel)?.name || "#all"}</span>
                <button
                  type="submit"
                  disabled={!newPostContent.trim()}
                  className="flex items-center gap-1.5 bg-[#4F6AF5] hover:bg-[#3f5be0] text-white text-xs font-bold px-4 py-2 rounded-xl shadow-md transition-all active:scale-95 disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Share</span>
                </button>
              </div>
            </form>

            {/* Post Feed */}
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-200 shadow-sm space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-[#1A1F36] text-white flex items-center justify-center font-bold text-sm shrink-0">
                        {post.avatar}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-bold text-sm text-gray-900">{post.authorName}</h4>
                          <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                            {post.authorBadge}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-400 mt-0.5">
                          <span className="text-[#4F6AF5] font-semibold">{post.category}</span>
                          <span>•</span>
                          <span>{post.timeAgo}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => toast.info("Flagged for platform moderation review")}
                      className="text-gray-300 hover:text-gray-500 p-1"
                      title="Report Post"
                    >
                      <Flag className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-800 leading-relaxed">
                    {post.content}
                  </p>

                  <div className="flex items-center gap-4 pt-3 border-t border-gray-100 text-xs text-gray-500">
                    <button
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center gap-1.5 font-semibold transition-colors ${
                        post.hasLiked ? "text-[#4F6AF5]" : "hover:text-[#4F6AF5]"
                      }`}
                    >
                      <ThumbsUp className="w-4 h-4" />
                      <span>{post.likes} Useful</span>
                    </button>

                    <button
                      onClick={() => toast.info("Thread replies expand")}
                      className="flex items-center gap-1.5 hover:text-gray-900 transition-colors font-medium"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>{post.repliesCount} Replies</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </WorkerLayout>
  );
}
