// src/components/landing/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "How it Works", href: "#how-it-works" },
  { label: "Categories", href: "#categories" },
  { label: "Find Talent", href: "/employer/find-talent" },
];

export function Navbar() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#1A1F36]/85 backdrop-blur-md shadow-md border-b border-white/10 py-3"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => router.push("/")} className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#4F6AF5] flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-base">S</span>
          </div>
          <div className="flex flex-col items-start leading-none">
            <span className="text-white font-semibold text-lg">Skiloq</span>
            <span className="text-white/50 text-[11px]">Hire • Work • Grow</span>
          </div>
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="text-sm text-white/80 hover:text-white transition-colors font-medium">
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button onClick={() => router.push("/login")} className="text-sm text-white/80 hover:text-white transition-colors font-medium px-3 py-2">
            Log in
          </button>
          <button onClick={() => router.push("/register")} className="flex items-center gap-2 bg-[#4F6AF5] hover:bg-[#3f5df4] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all shadow-md">
            Join Free
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-white p-2 rounded-md hover:bg-white/10 transition-colors">
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-3 mx-4 rounded-xl bg-[#1A1F36] border border-white/10 shadow-lg overflow-hidden"
          >
            <div className="flex flex-col p-4">
              {navLinks.map((link) => (
                <a key={link.label} href={link.href} onClick={() => setMobileOpen(false)} className="py-3 text-sm text-white/80 hover:text-white transition-colors border-b border-white/5">
                  {link.label}
                </a>
              ))}
              <div className="pt-4 flex flex-col gap-3">
                <button onClick={() => { router.push("/login"); setMobileOpen(false); }} className="w-full text-sm py-3 rounded-md border border-white/10 text-white/80 hover:bg-white/5 transition-colors">
                  Log in
                </button>
                <button onClick={() => { router.push("/register"); setMobileOpen(false); }} className="w-full bg-[#4F6AF5] hover:bg-[#3f5df4] text-white text-sm font-semibold py-3 rounded-md transition-colors">
                  Join Skiloq
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}