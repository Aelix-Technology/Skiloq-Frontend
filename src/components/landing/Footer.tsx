"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

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
    ],
  },
  {
    title: "Product",
    links: [
      { label: "How it Works" },
      { label: "Find Work" },
      { label: "Find Talent" },
      { label: "Trust Process" },
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
      { label: "Contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "FAQ" },
      { label: "Success Stories" },
      { label: "Help Center" },
    ],
  },
];

const socialLinks = [
  {
    label: "Facebook",
    icon: "/assets/images/landing/FacebookLogo.png",
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
    <footer className="w-full bg-[#0F1221] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Main Footer Content */}
        <div className="py-16 md:py-20 border-b border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left Column: Brand & Newsletter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Skiloq
              </h2>
              <p className="text-white/60 text-sm md:text-base leading-relaxed mb-8 max-w-md">
                Building the future of trusted work across Africa through verification, secure payments, and opportunity‑driven professional connections.
              </p>

              {/* Newsletter Section */}
              <div className="bg-white/5 rounded-2xl p-5 md:p-6 border border-white/10">
                <h3 className="text-base font-semibold mb-3">
                  Stay updated with our latest news and opportunities
                </h3>
                <form className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 bg-white/10 rounded-xl text-white placeholder-white/40 border border-white/20 focus:outline-none focus:border-[#4F6AF5] transition-all"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#4F6AF5] hover:bg-[#3d56e0] text-white font-semibold rounded-xl transition-all shadow-md shadow-[#4F6AF5]/25"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </motion.div>

            {/* Right Column: Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {footerColumns.map((column, idx) => (
                <div key={column.title}>
                  <h3 className="text-sm font-semibold text-white mb-5 uppercase tracking-wider">
                    {column.title}
                  </h3>
                  <ul className="space-y-3">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href="#"
                          className="text-sm text-white/60 transition-all hover:text-[#4F6AF5] hover:translate-x-1 inline-block"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <p className="text-xs md:text-sm text-white/40">
            © {new Date().getFullYear()} Skiloq Technology. All rights reserved
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <Link
                key={social.label}
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#4F6AF5]/20 hover:-translate-y-1 transition-all"
              >
                <Image
                  src={social.icon}
                  alt={social.label}
                  width={20}
                  height={20}
                  className="object-contain brightness-0 invert w-auto h-5"
                  style={{ width: 'auto', height: '1.25rem' }}
                  unoptimized
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
