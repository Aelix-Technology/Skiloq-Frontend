// src/components/landing/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Find Talent", href: "/employer/find-talent", hasDropdown: true },
  { label: "Find Work", href: "#" },
  { label: "About Us", href: "#" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#" },
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
          ? "bg-white/95 backdrop-blur-md shadow-lg py-3"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => router.push("/")} className="flex items-center gap-3">
          <span className={`font-bold text-2xl ${scrolled ? "text-[#1A1F36]" : "text-white"}`}>Skiloq</span>
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className={`flex items-center gap-1 text-sm transition-colors font-medium ${scrolled ? "text-[#1A1F36] hover:text-[#4F6AF5]" : "text-white hover:text-white/80"}`}>
              {link.label}
              {link.hasDropdown && <ChevronDown size={16} />}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button onClick={() => router.push("/login")} className={`text-sm transition-colors font-medium px-4 py-2 rounded-lg ${scrolled ? "text-[#1A1F36] hover:text-[#4F6AF5] border border-[#1A1F36]" : "text-white hover:text-white/90 border border-white/40"}`}>
            Sign In
          </button>
          <button onClick={() => router.push("/register")} className="flex items-center gap-2 bg-[#4F6AF5] hover:bg-[#3d56e0] text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all shadow-lg">
            Sign Up
          </button>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className={`md:hidden p-2 rounded-md transition-colors ${scrolled ? "text-[#1A1F36] hover:bg-gray-100" : "text-white hover:bg-white/10"}`}>
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
            className="md:hidden mt-3 mx-4 rounded-xl bg-white border border-gray-200 shadow-lg overflow-hidden"
          >
            <div className="flex flex-col p-4">
              {navLinks.map((link) => (
                <a key={link.label} href={link.href} onClick={() => setMobileOpen(false)} className="py-3 text-sm text-[#1A1F36] hover:text-[#4F6AF5] transition-colors border-b border-gray-100">
                  {link.label}
                </a>
              ))}
              <div className="pt-4 flex flex-col gap-3">
                <button onClick={() => { router.push("/login"); setMobileOpen(false); }} className="w-full text-sm py-3 rounded-md border border-[#1A1F36] text-[#1A1F36] hover:bg-gray-50 transition-colors">
                  Sign In
                </button>
                <button onClick={() => { router.push("/register"); setMobileOpen(false); }} className="w-full bg-[#4F6AF5] hover:bg-[#3d56e0] text-white text-sm font-semibold py-3 rounded-md transition-colors">
                  Sign Up
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}