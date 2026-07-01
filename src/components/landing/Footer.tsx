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
      { label: "Carpentry" },
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
    <footer className="w-full bg-gradient-to-br from-[#1E243B] via-[#2A3050] to-[#1E243B] text-white">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-16">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 mb-12">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold text-white mb-6">Skiloq</h2>
            <p className="text-white/70 text-sm leading-relaxed max-w-sm">
              Building the future of trusted work across Africa through verification, secure payments, and opportunity-driven professional connections.
            </p>
          </div>

          {/* Footer Links */}
          {footerColumns.map((column) => (
            <div key={column.title} className="lg:col-span-1">
              <h3 className="text-base font-semibold text-white mb-6">{column.title}</h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href="#"
                      className="text-sm text-white/60 transition-all hover:text-white hover:pl-1"
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
        <div className="pt-8 border-t border-white/10">
          {/* Social Links */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
            <span className="text-sm text-white/70 font-medium">Follow us</span>
            <div className="flex items-center gap-6 md:gap-10 w-full justify-between md:justify-end">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href="#"
                  className="flex flex-col items-center gap-2 text-sm text-white/60 hover:text-white transition-all hover:-translate-y-1"
                >
                  <div className="w-10 h-10 bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all">
                    <Image
                      src={social.icon}
                      alt={social.label}
                      width={20}
                      height={20}
                      className="object-contain brightness-0 invert"
                    />
                  </div>
                 
                </Link>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-sm text-white/50">
              © {new Date().getFullYear()} Skiloq Technology. All rights reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
