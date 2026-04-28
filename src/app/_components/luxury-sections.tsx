"use client";

import { memo, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight, ChevronDown, MapPin, Search } from "lucide-react";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [headerCrisp, setHeaderCrisp] = useState(false);

  // Get pathname to determine if we're on home page
  const pathname = typeof window !== "undefined" ? window.location.pathname : "";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Properties", href: "/properties" },
    { label: "Journal", href: "/journal" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  // Determine base color: white on home page, charcoal (black) on other pages
  const isHomePage = pathname === "/";
  const baseTextColor = isHomePage ? "text-white" : "text-charcoal";
  const baseHoverColor = isHomePage ? "hover:text-white/80" : "hover:text-[#C4A030]";

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      onAnimationComplete={() => setHeaderCrisp(true)}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${
        scrolled
          ? "bg-white/95 backdrop-blur-sm border-b border-[#E5E5E5]/50"
          : "bg-transparent"
      }`}
      style={
        headerCrisp
          ? ({ transform: "none", willChange: "auto" } as const)
          : ({ willChange: "transform, opacity" } as const)
      }
    >
      <div className="max-w-360 mx-auto px-6 md:px-12 lg:px-20">
        <nav className="flex items-center justify-between h-20 md:h-24">
          <a
            href="/"
            className={`font-serif text-xl md:text-2xl font-semibold tracking-editorial transition-colors duration-500 ${
              scrolled ? "text-charcoal" : "text-white"
            }`}
          >
            MAISON
          </a>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`font-sans-custom text-[13px] font-light tracking-wide-editorial transition-colors duration-500 uppercase ${
                  scrolled ? `${baseTextColor} ${baseHoverColor}` : "text-white hover:text-white/80"
                }`}
              >
                {link.label}
              </a>
            ))}
            <span className={isHomePage ? "text-white/70" : "text-charcoal/70"}>|</span>
            <a
              href="/inquire"
              className={`font-sans-custom text-[13px] font-light tracking-wide-editorial transition-colors duration-500 uppercase ${
                scrolled ? `${baseTextColor} ${baseHoverColor}` : "text-white hover:text-white/80"
              }`}
            >
              Inquire
            </a>
            ))}
            <span className={isHomePage ? "text-white/70" : "text-charcoal/70"}>|</span>
            <a
              href="/inquire"
              className={`font-sans-custom text-[13px] font-light tracking-wide-editorial transition-colors duration-500 uppercase ${
                scrolled ? `${baseTextColor} ${baseHoverColor}` : "text-white hover:text-white/80"
              }`}
            >
              Inquire
            </a>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.25"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={mobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className={`block w-6 h-px transition-colors ${
                scrolled ? "bg-charcoal" : "bg-white"
              }`}
            />
            <motion.span
              animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className={`block w-6 h-px transition-colors ${
                scrolled ? "bg-charcoal" : "bg-white"
              }`}
            />
            <motion.span
              animate={mobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className={`block w-6 h-px transition-colors ${
                scrolled ? "bg-charcoal" : "bg-white"
              }`}
            />
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="md:hidden bg-white border-t border-border-subtle/30 overflow-hidden"
          >
            <div className="px-6 py-10 flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className={`font-sans-custom text-[15px] font-light tracking-wide-editorial uppercase transition-colors duration-500 ${
                    isHomePage ? "text-white hover:text-white/80" : "text-charcoal hover:text-[#C4A030]"
                  }`}
                >
                  {link.label}
                </motion.a>
              ))}
              <a
                href="/inquire"
                onClick={() => setMobileMenuOpen(false)}
                className={`font-sans-custom text-[15px] font-light tracking-wide-editorial uppercase transition-colors duration-500 ${
                  isHomePage ? "text-white hover:text-white/80" : "text-charcoal hover:text-[#C4A030]"
                }`}
              >
                Inquire
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
