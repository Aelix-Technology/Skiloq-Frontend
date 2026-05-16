"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
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
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navBg = scrolled ? "bg-white shadow-md py-3" : "bg-transparent py-5";
  const textColor = scrolled ? "text-primary" : "text-white";
  const logoBg = scrolled ? "bg-primary" : "bg-white";
  const logoText = scrolled ? "text-white" : "text-primary";
  const btnBorder = scrolled ? "border-primary" : "border-white/40";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6">
        <button onClick={() => router.push("/")} className="flex items-center gap-2.5">
          <div className={`w-10 h-10 ${logoBg} rounded-xl flex items-center justify-center shadow-lg transition-colors`}>
            <span className={`${logoText} font-bold text-xl`}>S</span>
          </div>
          <span className={`font-black text-2xl tracking-tighter transition-colors ${textColor}`}>
            Skiloq
          </span>
        </button>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className={`text-xs font-bold uppercase tracking-widest transition-colors hover:opacity-70 ${textColor}`}>
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <button onClick={() => router.push("/login")} className={`text-sm font-bold ${textColor}`}>
            Log in
          </button>
          <button
            onClick={() => router.push("/register")}
            className={`text-sm font-bold border-2 rounded-full px-6 py-2 transition-all ${btnBorder} ${textColor} hover:bg-white hover:text-primary hover:border-white`}
          >
            Join Skiloq
          </button>
        </div>

        <button onClick={() => setMobileOpen(!mobileOpen)} className={`md:hidden p-2 ${textColor}`}>
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-gray-100 p-6 flex flex-col gap-4 md:hidden shadow-xl"
          >
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} onClick={() => setMobileOpen(false)} className="text-primary font-bold text-lg">
                {link.label}
              </a>
            ))}
            <hr className="border-gray-100" />
            <button onClick={() => { router.push("/login"); setMobileOpen(false); }} className="text-primary font-bold text-left">Log in</button>
            <button onClick={() => { router.push("/register"); setMobileOpen(false); }} className="bg-primary text-white py-4 rounded-xl font-bold">Sign Up Free</button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
