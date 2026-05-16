// src/components/landing/Footer.tsx
"use client";

import Link from "next/link";
import { Mail, MapPin } from "lucide-react";

const footerLinks = [
  {
    title: "Platform",
    links: [
      { label: "How it Works", href: "#how-it-works" },
      { label: "Categories", href: "#categories" },
      { label: "Find Talent", href: "/employer/find-talent" },
      { label: "Post a Job", href: "/employer/post-job" },
      { label: "Trust & Safety", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-6xl mx-auto px-4 pt-16 pb-8">
        {/* Top grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                <span className="text-primary font-bold text-base">S</span>
              </div>
              <span className="font-bold text-xl text-white">Skiloq</span>
            </div>

            <p className="text-sm text-primary-200 leading-relaxed mb-6 max-w-sm">
              Verified talent infrastructure for Africa. Proof of work, not CV claims.
              Built for MoMo, 2G, and real skills.
            </p>

            <div className="space-y-3 text-sm text-primary-200">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-primary-400" />
                Accra, Ghana
              </div>
              <a href="mailto:hello@skiloq.com" className="flex items-center gap-3 hover:text-white transition-colors">
                <Mail className="w-4 h-4 text-primary-400" />
                hello@skiloq.com
              </a>
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-sm font-semibold text-white mb-5 uppercase tracking-wider">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-primary-200 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-primary-400">
            &copy; {new Date().getFullYear()} Skiloq Technology Inc. All rights reserved.
          </p>
          <p className="text-xs text-primary-400">
            Made in Ghana 🇬🇭
          </p>
        </div>
      </div>
    </footer>
  );
}
