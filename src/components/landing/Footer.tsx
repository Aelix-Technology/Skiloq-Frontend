// src/components/landing/Footer.tsx
"use client";

import Link from "next/link";
import Image from "next/image";

const footerColumns = [
  {
    title: "Categories",
    links: [
      { label: "Graphics Design" },
      { label: "Product Design" },
      { label: "Photography" },
      { label: "Web Development" },
      { label: "Carpentering" },
      { label: "Fashion Design" },
      { label: "Plumbing" },
      { label: "Video Editing" },
    ],
  },
  {
    title: "Product",
    links: [
      { label: "How it Works" },
      { label: "Find Work" },
      { label: "Find Talent" },
      { label: "Trust Process" },
      { label: "Featured Talents" },
      { label: "Featured Jobs" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About" },
      { label: "Privacy Policy" },
      { label: "Careers" },
      { label: "Trust & Safety" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "FAQ" },
      { label: "Contact" },
      { label: "Success Stories" },
    ],
  },
];

const socialLinks = [
  {
    label: "Facebook",
    icon: "/assets/images/landing/FacebookLogo.png",
  },
  {
    label: "Email",
    icon: "/assets/images/landing/Vector.png",
  },
  {
    label: "Instagram",
    icon: "/assets/images/landing/InstagramLogo (1).png",
  },
  {
    label: "LinkedIn",
    icon: "/assets/images/landing/LinkedinLogo.png",
  },
  {
    label: "X",
    icon: "/assets/images/landing/XLogo.png",
  },
];

export function Footer() {
  return (
    <footer className="w-full bg-[#1A1F36] text-white">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-16">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-semibold text-white mb-6">Logo</h2>
            <p className="text-white/70 text-sm leading-relaxed">
              Building the future of trusted work across Africa through verification, secure payments, and opportunity-driven professional connections.
            </p>
          </div>

          {/* Footer Links */}
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3 className="text-base font-medium text-white mb-6">{column.title}</h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href="#"
                      className="text-sm text-white/60 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="pt-8">
          {/* Social Links */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
            <span className="text-sm text-white/70">Follow us</span>
            <div className="flex items-center gap-12">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href="#"
                  className="flex flex-col items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
                >
                  <Image
                    src={social.icon}
                    alt={social.label}
                    width={24}
                    height={24}
                    className="object-contain brightness-0 invert"
                  />
                  <span>@Skiloq.IT</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center pt-6 border-t border-white/10">
            <p className="text-sm text-white/60">
              © 2025 Skiloq Technology. All rights reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
