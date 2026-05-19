// src/components/landing/Footer.tsx
"use client";

import Link from "next/link";
import { Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";

const footerLinks = {
  Platform: [
    { label: "How it Works", href: "#how-it-works" },
    { label: "Categories", href: "#categories" },
    { label: "Find Talent", href: "/employer/find-talent" },
    { label: "Post a Job", href: "/employer/post-job" },
    { label: "Trust & Safety", href: "#" },
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

export function Footer() {
  return (
    <footer className="bg-primary relative overflow-hidden">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-10">
        {/* ── Top: Link Columns ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-10 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg shadow-black/20">
                <span className="text-primary font-bold text-lg">S</span>
              </div>
              <div>
                <span className="font-bold text-xl text-white tracking-tight block leading-none">
                  Skiloq
                </span>
                <span className="text-[10px] text-primary-300 tracking-[0.2em] uppercase">
                  Talent Infrastructure
                </span>
              </div>
            </div>

            <p className="text-sm text-primary-200 leading-relaxed mb-6 max-w-xs">
              Africa&apos;s #1 verified talent platform. Proof of work, not CV claims. Built for MoMo, 2G, and real skills.
            </p>

            {/* Contact */}
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 text-primary-200">
                <MapPin className="w-4 h-4 text-primary-400 shrink-0" />
                <span>Accra, Ghana</span>
              </div>
              <a href="mailto:hello@skiloq.com" className="flex items-center gap-3 text-primary-200 hover:text-white transition-colors">
                <Mail className="w-4 h-4 text-primary-400 shrink-0" />
                <span>hello@skiloq.com</span>
              </a>
              <a href="tel:+233501234567" className="flex items-center gap-3 text-primary-200 hover:text-white transition-colors">
                <Phone className="w-4 h-4 text-primary-400 shrink-0" />
                <span>+233 50 123 4567</span>
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-xs font-bold text-white/50 uppercase tracking-[0.15em] mb-5">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-primary-200 hover:text-white transition-colors inline-block hover:translate-x-0.5 duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Bottom Bar ── */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-primary-400">
            &copy; {new Date().getFullYear()} Skiloq Technology Inc. All rights reserved.
          </p>

          <div className="flex flex-wrap justify-center gap-x-5 gap-y-1">
            {bottomLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs text-primary-400 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

         
        </div>
      </div>
    </footer>
  );
}