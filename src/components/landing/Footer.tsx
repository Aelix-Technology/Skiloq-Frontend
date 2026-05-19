// src/components/landing/Footer.tsx
"use client";

import Link from "next/link";
import { Mail, MapPin, Phone, ArrowUpRight, Sparkles, Shield, Zap, Globe, type LucideIcon } from "lucide-react";
import { useState, useEffect } from "react";

type FooterLink = {
  label: string;
  href: string;
  icon?: LucideIcon;
};

const footerLinks: Record<string, FooterLink[]> = {
  Platform: [
    { label: "How it Works", href: "#how-it-works", icon: Zap },
    { label: "Categories", href: "#categories", icon: Globe },
    { label: "Find Talent", href: "/employer/find-talent" },
    { label: "Post a Job", href: "/employer/post-job" },
    { label: "Trust & Safety", href: "#", icon: Shield },
  ],
  "For Workers": [
    { label: "Create Account", href: "/register" },
    { label: "Worker Dashboard", href: "/worker/dashboard" },
    { label: "How to Get Verified", href: "#" },
    { label: "Trust Score Guide", href: "#" },
    { label: "MoMo Payouts", href: "#" },
  ],
  "For Employers": [
    { label: "Employer Dashboard", href: "/employer/dashboard" },
    { label: "Hiring Guide", href: "#" },
    { label: "Escrow Protection", href: "#" },
    { label: "Enterprise", href: "#" },
  ],
  Company: [
    { label: "About Us", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Press", href: "#" },
    { label: "Contact", href: "#" },
  ],
};

const bottomLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Cookie Policy", href: "#" },
  { label: "Accessibility", href: "#" },
];

const socialLinks = [
  { label: "Twitter", href: "#", icon: "𝕏" },
  { label: "LinkedIn", href: "#", icon: "in" },
  { label: "Instagram", href: "#", icon: "📷" },
  { label: "GitHub", href: "#", icon: "GH" },
];

export function Footer() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setIsVisible(true);
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <footer className="bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 relative overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated gradient orbs */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-emerald-600/20 to-teal-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
        
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "30px 30px",
          }}
        />
        
        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent" />
      </div>

      {/* Animated Top Border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent animate-pulse" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
        {/* ── Top: Link Columns ── */}
        <div className="grid lg:grid-cols-12 gap-12 mb-16">
          {/* Brand Column - Premium */}
          <div className="lg:col-span-4 space-y-6">
            {/* Logo with animation */}
            <div className={`transform transition-all duration-700 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <div className="flex items-center gap-3 mb-5">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity" />
                  <div className="relative w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
                    <span className="text-white font-bold text-xl">S</span>
                  </div>
                </div>
                <div>
                  <span className="font-bold text-2xl text-white tracking-tight block leading-none bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                    Skiloq
                  </span>
                  <span className="text-[11px] text-blue-400 tracking-[0.2em] uppercase font-medium">
                    Talent Infrastructure
                  </span>
                </div>
              </div>

              <p className="text-gray-400 leading-relaxed text-sm max-w-md">
                Africa&apos;s #1 verified talent platform. <span className="text-blue-400">Proof of work, not CV claims.</span> Built for MoMo, 2G, and real skills.
              </p>
            </div>

            {/* Contact Information - Premium Cards */}
            <div className="space-y-3 pt-2">
              {[
                { icon: MapPin, text: "Accra, Ghana", href: null },
                { icon: Mail, text: "hello@skiloq.com", href: "mailto:hello@skiloq.com" },
                { icon: Phone, text: "+233 50 123 4567", href: "tel:+233501234567" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`transform transition-all duration-700 delay-${idx * 100} ${
                    isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
                  }`}
                >
                  {item.href ? (
                    <a
                      href={item.href}
                      className="flex items-center gap-3 text-gray-400 hover:text-white transition-all duration-300 group"
                    >
                      <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-all duration-300">
                        <item.icon className="w-4 h-4 text-blue-400" />
                      </div>
                      <span className="text-sm group-hover:translate-x-1 transition-transform duration-300">
                        {item.text}
                      </span>
                    </a>
                  ) : (
                    <div className="flex items-center gap-3 text-gray-400">
                      <div className="p-2 rounded-lg bg-white/5">
                        <item.icon className="w-4 h-4 text-blue-400" />
                      </div>
                      <span className="text-sm">{item.text}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="flex gap-3 pt-4">
              {[
                { icon: Shield, label: "Secure Escrow" },
                { icon: Sparkles, label: "Verified Talent" },
                { icon: Zap, label: "Fast Payouts" },
              ].map((badge, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10"
                >
                  <badge.icon className="w-3 h-3 text-blue-400" />
                  <span className="text-[10px] text-gray-400 font-medium">{badge.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Link Columns - Premium Grid */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
              {Object.entries(footerLinks).map(([title, links], columnIdx) => (
                <div
                  key={title}
                  className={`transform transition-all duration-700 delay-${columnIdx * 150} ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}
                >
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-[0.15em] mb-6">
                    {title}
                  </h4>
                  <ul className="space-y-3">
                    {links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="group flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-all duration-200"
                        >
                          <span className="group-hover:translate-x-1 transition-transform duration-200">
                            {link.label}
                          </span>
                          {link.icon && (
                            <link.icon className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all duration-200" />
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Copyright */}
            <p className="text-xs text-gray-500">
              &copy; {new Date().getFullYear()} Skiloq Technology Inc. 
              <span className="hidden sm:inline"> All rights reserved.</span>
            </p>

            {/* Bottom Links */}
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {bottomLinks.map((link, idx) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="relative text-xs text-gray-500 hover:text-gray-300 transition-colors duration-200 group"
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-blue-500 group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </div>

            {/* Social Links - Premium */}
            <div className="flex items-center gap-4">
              <span className="text-xs text-gray-500">Follow us</span>
              <div className="flex gap-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 group"
                  >
                    <span className="text-sm font-bold group-hover:rotate-6 transition-transform duration-300">
                      {social.icon}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Additional Premium Feature - Newsletter */}
          <div className="mt-8 pt-6 border-t border-white/5">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span className="text-xs text-gray-400">
                  Join 10,000+ talents and employers on Skiloq
                </span>
              </div>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-3 py-1.5 text-xs bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
                <button className="px-3 py-1.5 text-xs bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}