// src/app/page.tsx
import Link from "next/link";
import { Search, Star, Shield, Briefcase, ChevronRight, Check, ArrowRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* ── Navigation ── */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-primary-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between h-16 px-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-xl font-bold text-primary tracking-tight">Skiloq</span>
          </Link>

          {/* Nav links — desktop */}
          <nav className="hidden md:flex items-center gap-6 text-sm text-primary-300">
            <Link href="/how-it-works" className="hover:text-primary transition-colors">How it works</Link>
            <Link href="/find-talent" className="hover:text-primary transition-colors">Find Talent</Link>
            <Link href="/find-work" className="hover:text-primary transition-colors">Find Work</Link>
          </nav>

          {/* CTAs */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium text-primary-300 hover:text-primary transition-colors hidden sm:block"
            >
              Log in
            </Link>
            <Link
              href="/register"
              className="bg-accent text-white text-sm font-semibold px-5 py-2.5 rounded-input hover:bg-accent-600 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative bg-gradient-to-b from-primary-50 to-white pt-16 pb-24 md:pt-24 md:pb-32">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight tracking-tight max-w-4xl mx-auto">
            How work<br className="md:hidden" /> should work
          </h1>
          <p className="text-md md:text-lg text-primary-300 mt-4 max-w-2xl mx-auto leading-relaxed">
            Forget the old resume. Find verified African talent and get work done with proof of skill, not claims.
          </p>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {[
              { icon: Shield, label: "Verified Workers" },
              { icon: Star, label: "Escrow Protected" },
              { icon: Briefcase, label: "MoMo Ready" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2 text-sm text-primary-400">
                <item.icon className="w-4 h-4 text-success" />
                <span>{item.label}</span>
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 mt-8">
            <Link
              href="/register"
              className="bg-accent text-white font-semibold px-8 py-3.5 rounded-input hover:bg-accent-600 transition-colors text-md inline-flex items-center justify-center gap-2"
            >
              Find Work
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/find-talent"
              className="bg-white text-primary font-semibold px-8 py-3.5 rounded-input border-2 border-primary-100 hover:border-primary-200 transition-colors text-md inline-flex items-center justify-center gap-2"
            >
              Find Talent
            </Link>
          </div>
        </div>
      </section>

      {/* ── Trusted By ── */}
      <section className="py-12 border-b border-primary-50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-sm text-primary-300 mb-6">Trusted by businesses across Africa</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-50">
            {["FinTech Ghana", "TechHub Accra", "Kumasi Homes", "Green Energy", "PayHub"].map((name) => (
              <span key={name} className="text-md font-semibold text-primary-300">{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-primary text-center mb-4">
            Four ways to work
          </h2>
          <p className="text-md text-primary-300 text-center mb-12 max-w-xl mx-auto">
            Whatever your skill, there&apos;s a place for you on Skiloq
          </p>

          // Replace the entire categories grid with this:

<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
  {[
    {
      icon: "💻",
      title: "Digital & Remote",
      desc: "Developers, designers, VAs, copywriters — get verified and land remote jobs with global clients.",
      href: "/register?category=digital",
      phase: false,
    },
    {
      icon: "🔧",
      title: "Trade & Skilled",
      desc: "Tailors, electricians, plumbers, mechanics — get booked through your calendar, not your contacts.",
      href: "/register?category=trade",
      phase: false,
    },
    {
      icon: "📚",
      title: "Educators & Tutors",
      desc: "Academic, language, music, coding tutors — sell session bundles. Coming Phase 2.",
      href: "#",
      phase: true,
    },
    {
      icon: "📊",
      title: "Online Income",
      desc: "Data entry, transcription, micro-tasks — curated verified listings only. Coming Phase 2.",
      href: "#",
      phase: true,
    },
  ].map((cat) =>
    cat.phase ? (
      <div
        key={cat.title}
        className="relative bg-white rounded-card border-2 border-primary-50 opacity-70 p-6"
      >
        <span className="absolute top-3 right-3 bg-warning/10 text-warning text-xs font-semibold px-2 py-0.5 rounded-pill">
          Phase 2
        </span>
        <span className="text-3xl block mb-3">{cat.icon}</span>
        <h3 className="font-semibold text-primary text-md mb-1">{cat.title}</h3>
        <p className="text-sm text-primary-300 leading-relaxed">{cat.desc}</p>
      </div>
    ) : (
      
      <Link
        key={cat.title}
        href={cat.href}
        className="relative group bg-white rounded-card border-2 border-primary-100 p-6 hover:border-accent-200 hover:shadow-md transition-all"
      >
        <span className="text-3xl block mb-3">{cat.icon}</span>
        <h3 className="font-semibold text-primary text-md mb-1">{cat.title}</h3>
        <p className="text-sm text-primary-300 leading-relaxed">{cat.desc}</p>
        <span className="inline-flex items-center gap-1 text-sm font-medium text-accent mt-3 group-hover:gap-2 transition-all">
          Get started <ChevronRight className="w-4 h-4" />
        </span>
      </Link>
    )
  )}
</div>
        </div>
      </section>

      {/* ── How it Works ── */}
      <section className="py-16 md:py-24 bg-primary-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-primary text-center mb-4">
            Proof of work, not CV claims
          </h2>
          <p className="text-md text-primary-300 text-center mb-12 max-w-xl mx-auto">
            Every profile on Skiloq is an earned record of demonstrated ability
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Verify your identity",
                desc: "Upload your Ghana Card. We verify you're real. No fake profiles, ever.",
              },
              {
                step: "02",
                title: "Prove your skills",
                desc: "Take assessments or submit your portfolio. Your Trust Score is built on real results.",
              },
              {
                step: "03",
                title: "Get hired, get paid",
                desc: "Employers find you. Payment held in escrow. MoMo payout. Fair for everyone.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-14 h-14 rounded-full bg-accent/10 text-accent flex items-center justify-center mx-auto mb-4">
                  <span className="text-lg font-bold">{item.step}</span>
                </div>
                <h3 className="font-semibold text-primary text-md mb-2">{item.title}</h3>
                <p className="text-sm text-primary-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Skiloq ── */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">
                Built for African<br />workers and employers
              </h2>
              <div className="space-y-4">
                {[
                  "Mobile Money-first payments — MTN MoMo, Vodafone Cash, AirtelTigo",
                  "Works on budget Android phones and 2G/3G networks",
                  "Multi-language support — English, Twi, Hausa, French coming",
                  "Physical agent verification for trade workers",
                  "No international bank account required",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-success" />
                    </div>
                    <p className="text-sm text-primary-300">{item}</p>
                  </div>
                ))}
              </div>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 mt-8 bg-accent text-white font-semibold px-8 py-3.5 rounded-input hover:bg-accent-600 transition-colors"
              >
                Create your free account
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Stats card */}
            <div className="bg-primary rounded-card p-8 text-white">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { number: "10K+", label: "Verified Workers" },
                  { number: "500+", label: "Businesses Hiring" },
                  { number: "GHS 2M+", label: "Paid to Workers" },
                  { number: "98%", label: "Satisfaction Rate" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="text-2xl md:text-3xl font-bold">{stat.number}</p>
                    <p className="text-sm text-primary-200 mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary to-primary-700">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to prove what you can do?
          </h2>
          <p className="text-md text-primary-200 mb-8 max-w-xl mx-auto">
            Join thousands of verified African workers earning on their own terms.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link
              href="/register"
              className="bg-white text-primary font-semibold px-8 py-3.5 rounded-input hover:bg-primary-50 transition-colors text-md"
            >
              Sign Up as a Worker
            </Link>
            <Link
              href="/register?role=employer"
              className="bg-accent text-white font-semibold px-8 py-3.5 rounded-input hover:bg-accent-600 transition-colors text-md"
            >
              Hire Talent
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-primary-900 text-primary-200 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <span className="font-bold text-white">Skiloq</span>
              </div>
              <p className="text-sm text-primary-300">
                Verified talent infrastructure for Africa.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-white text-sm mb-3">For Workers</h4>
              <div className="space-y-2 text-sm text-primary-300">
                <Link href="/how-it-works" className="block hover:text-white transition-colors">How it Works</Link>
                <Link href="/register" className="block hover:text-white transition-colors">Create Account</Link>
                <Link href="/categories" className="block hover:text-white transition-colors">Browse Categories</Link>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white text-sm mb-3">For Employers</h4>
              <div className="space-y-2 text-sm text-primary-300">
                <Link href="/find-talent" className="block hover:text-white transition-colors">Find Talent</Link>
                <Link href="/post-job" className="block hover:text-white transition-colors">Post a Job</Link>
                <Link href="/pricing" className="block hover:text-white transition-colors">Pricing</Link>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white text-sm mb-3">Company</h4>
              <div className="space-y-2 text-sm text-primary-300">
                <Link href="/about" className="block hover:text-white transition-colors">About</Link>
                <Link href="/trust" className="block hover:text-white transition-colors">Trust & Safety</Link>
                <Link href="/contact" className="block hover:text-white transition-colors">Contact</Link>
              </div>
            </div>
          </div>

          <div className="border-t border-primary-700 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-primary-400">
              © 2026 Skiloq Technology Inc. — Ghana
            </p>
            <div className="flex gap-4 text-xs text-primary-400">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}