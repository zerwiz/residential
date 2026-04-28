"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";
import { Search, MapPin, ArrowRight, ChevronDown, Menu, X } from "lucide-react";

/* ──────────────────────────────────────────────
   Navigation
   ────────────────────────────────────────────── */
function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Properties", href: "#properties" },
    { label: "Journal", href: "#journal" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${
        scrolled
          ? "bg-white/95 backdrop-blur-sm border-b border-[#E5E5E5]/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <nav className="flex items-center justify-between h-20 md:h-24">
          {/* Logo Monogram */}
          <a
            href="#"
            className="font-serif text-xl md:text-2xl font-semibold tracking-editorial text-[#1A1A1A]"
          >
            MAISON
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-sans-custom text-[13px] font-light tracking-wide-editorial text-[#555555] hover:text-[#1A1A1A] transition-colors duration-500 uppercase"
              >
                {link.label}
              </a>
            ))}
            <span className="text-[#E5E5E5]">|</span>
            <a
              href="#contact"
              className="font-sans-custom text-[13px] font-light tracking-wide-editorial text-[#D4AF37] hover:text-[#C4A030] transition-colors duration-500 uppercase"
            >
              Inquire
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-[5px]"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={
                mobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }
              }
              className="block w-6 h-[1px] bg-[#1A1A1A] transition-colors"
            />
            <motion.span
              animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-6 h-[1px] bg-[#1A1A1A] transition-colors"
            />
            <motion.span
              animate={
                mobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }
              }
              className="block w-6 h-[1px] bg-[#1A1A1A] transition-colors"
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
            className="md:hidden bg-white border-t border-[#E5E5E5]/30 overflow-hidden"
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
                  className="font-sans-custom text-[15px] font-light tracking-wide-editorial text-[#555555] hover:text-[#1A1A1A] transition-colors uppercase"
                >
                  {link.label}
                </motion.a>
              ))}
              <div className="gold-line" />
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="font-sans-custom text-[15px] font-light tracking-wide-editorial text-[#D4AF37] uppercase"
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

/* ──────────────────────────────────────────────
   Hero Section
   ────────────────────────────────────────────── */
function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 0.3]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.4], ["0px", "-40px"]);

  return (
    <section
      ref={heroRef}
      className="relative w-full h-screen overflow-hidden bg-white pt-24"
    >
      {/* White border framing - Gallery effect */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="w-full h-full border-x-[1px] border-[#1A1A1A]/10 max-w-[92%] mx-auto" />
      </div>

      {/* Parallax Image */}
      <motion.div
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
        style={{ y: imageY }}
      >
        <div className="relative w-full h-full max-w-[92%] mx-auto">
          <img
            src="/hero-property.jpg"
            alt="The Residence at Seaside Point — A modernist cliffside estate"
            className="w-full h-full object-cover"
          />
          {/* Hairline border on image */}
          <div className="absolute inset-0 border border-[#1A1A1A]/8" />
        </div>
      </motion.div>

      {/* Dark overlay on scroll */}
      <motion.div
        className="absolute inset-0 bg-[#1A1A1A] z-10 pointer-events-none"
        style={{ opacity: overlayOpacity }}
      />

      {/* Hero Content */}
      <motion.div
        className="absolute inset-0 z-20 flex flex-col items-center justify-end pb-24 md:pb-32"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        <div className="max-w-[92%] mx-auto w-full flex flex-col items-center text-center">
          {/* Gold accent line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
            className="gold-line mb-6"
          />

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="font-sans-custom text-[11px] md:text-[12px] font-light tracking-wide-editorial text-[#D4AF37] uppercase mb-4"
          >
            Curated Property — Seaside Point
          </motion.p>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-editorial text-white leading-tight drop-shadow-[0_2px_20px_rgba(0,0,0,0.3)]"
          >
            THE RESIDENCE AT
            <br />
            SEASIDE POINT
          </motion.h1>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="flex items-center gap-2 mt-4"
          >
            <MapPin className="w-3 h-3 text-white/70" />
            <span className="font-sans-custom text-[12px] font-light text-white/70 tracking-wide">
              Amalfi Coast, Italy
            </span>
          </motion.div>

          {/* Floating Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="mt-10 w-full max-w-xl"
          >
            <div className="relative flex items-center bg-white/95 backdrop-blur-md rounded-full shadow-[0_4px_30px_rgba(0,0,0,0.08)] border border-white/50">
              <div className="flex-1 flex items-center pl-6 pr-4 py-4">
                <Search className="w-4 h-4 text-[#999999] mr-3 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="City, Neighborhood, or Address."
                  className="w-full font-sans-custom text-[14px] font-light text-[#1A1A1A] placeholder-[#999999] bg-transparent outline-none"
                />
              </div>
              <div className="flex items-center gap-3 pr-2">
                <button className="hidden sm:inline-flex font-sans-custom text-[12px] font-light tracking-wide-editorial uppercase text-[#555555] hover:text-[#1A1A1A] transition-colors px-3 py-2">
                  Browse
                </button>
                <button className="flex items-center justify-center w-10 h-10 rounded-full bg-[#1A1A1A] hover:bg-[#333333] transition-colors duration-300">
                  <Search className="w-4 h-4 text-[#D4AF37]" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-[#1A1A1A]/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   Animated Section Wrapper
   ────────────────────────────────────────────── */
function AnimatedSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.9, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ──────────────────────────────────────────────
   Section Divider
   ────────────────────────────────────────────── */
function SectionDivider() {
  return (
    <div className="flex items-center justify-center py-2">
      <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-[#D4AF37] to-transparent" />
    </div>
  );
}

/* ──────────────────────────────────────────────
   Featured Properties Section
   ────────────────────────────────────────────── */
const properties = [
  {
    id: 1,
    title: "The Glass Pavilion",
    location: "Malibu, California",
    price: "$12,500,000",
    beds: 5,
    baths: 6,
    sqft: "8,200",
    image: "/property-1.jpg",
    tag: "Featured",
  },
  {
    id: 2,
    title: "Villa Serena",
    location: "Santorini, Greece",
    price: "$9,800,000",
    beds: 4,
    baths: 5,
    sqft: "6,500",
    image: "/property-2.jpg",
    tag: "New Listing",
  },
  {
    id: 3,
    title: "Alpine Retreat",
    location: "Zermatt, Switzerland",
    price: "$15,200,000",
    beds: 6,
    baths: 7,
    sqft: "10,400",
    image: "/property-3.jpg",
    tag: "Exclusive",
  },
];

function PropertyCard({
  property,
  index,
}: {
  property: (typeof properties)[0];
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <AnimatedSection delay={index * 0.15} className="group">
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative cursor-pointer"
      >
        {/* Image Container */}
        <div className="relative overflow-hidden aspect-[4/3] bg-[#F8F8F6]">
          <motion.img
            src={property.image}
            alt={property.title}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.04 : 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          />
          {/* Hairline border */}
          <div className="absolute inset-0 border border-[#1A1A1A]/6 pointer-events-none" />
          {/* Tag */}
          <div className="absolute top-5 left-5">
            <span className="font-sans-custom text-[10px] font-light tracking-wide-editorial uppercase text-[#D4AF37] bg-white/90 backdrop-blur-sm px-3 py-1.5 border border-[#D4AF37]/30">
              {property.tag}
            </span>
          </div>
          {/* Hover overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-[#1A1A1A]/10 flex items-end justify-start p-6"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={isHovered ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <span className="font-sans-custom text-[11px] font-light tracking-wide-editorial uppercase text-white flex items-center gap-2">
                View Details <ArrowRight className="w-3 h-3" />
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* Content */}
        <div className="pt-5 pb-2">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-serif text-lg md:text-xl font-medium tracking-editorial text-[#1A1A1A] group-hover:text-[#D4AF37] transition-colors duration-500">
                {property.title}
              </h3>
              <p className="font-sans-custom text-[12px] font-light text-[#555555] mt-1.5 tracking-wide">
                {property.location}
              </p>
            </div>
            <p className="font-serif text-base md:text-lg font-medium text-[#1A1A1A]">
              {property.price}
            </p>
          </div>
          {/* Stats */}
          <div className="flex items-center gap-6 mt-4 pt-4 border-t border-[#E5E5E5]/60">
            <span className="font-sans-custom text-[11px] font-light text-[#999999] tracking-wide">
              {property.beds} Beds
            </span>
            <span className="font-sans-custom text-[11px] font-light text-[#999999] tracking-wide">
              {property.baths} Baths
            </span>
            <span className="font-sans-custom text-[11px] font-light text-[#999999] tracking-wide">
              {property.sqft} sq ft
            </span>
          </div>
        </div>
      </motion.div>
    </AnimatedSection>
  );
}

function FeaturedProperties() {
  return (
    <section id="properties" className="py-24 md:py-32 lg:py-40">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Section Header */}
        <AnimatedSection className="mb-16 md:mb-20">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="font-sans-custom text-[11px] font-light tracking-wide-editorial uppercase text-[#D4AF37] mb-4">
                The Collection
              </p>
              <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-medium tracking-editorial text-[#1A1A1A]">
                CURATED PROPERTIES
              </h2>
            </div>
            <div className="flex items-center gap-4">
              {/* Ghost Button */}
              <button className="group flex items-center gap-2 px-6 py-2.5 border border-[#1A1A1A] rounded-none font-sans-custom text-[12px] font-light tracking-wide-editorial uppercase text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-all duration-500">
                View All
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </AnimatedSection>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
          {properties.map((property, i) => (
            <PropertyCard key={property.id} property={property} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   Editorial Statement Section
   ────────────────────────────────────────────── */
function EditorialStatement() {
  return (
    <section id="about" className="py-24 md:py-32 lg:py-40 bg-[#F8F8F6]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image */}
          <AnimatedSection>
            <div className="relative">
              <div className="aspect-[3/4] overflow-hidden bg-[#E5E5E5]">
                <img
                  src="/property-1.jpg"
                  alt="Interior of The Glass Pavilion"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 border border-[#1A1A1A]/6 pointer-events-none" />
              {/* Offset gold frame accent */}
              <div className="absolute -bottom-3 -right-3 w-full h-full border border-[#D4AF37]/30 -z-10" />
            </div>
          </AnimatedSection>

          {/* Text Content */}
          <AnimatedSection delay={0.2}>
            <div className="max-w-lg">
              <div className="gold-line mb-8" />
              <p className="font-sans-custom text-[11px] font-light tracking-wide-editorial uppercase text-[#D4AF37] mb-6">
                Our Philosophy
              </p>
              <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-medium tracking-editorial text-[#1A1A1A] leading-snug mb-8">
                WHERE ARCHITECTURE
                <br />
                BECOMES ARTISTRY
              </h2>
              <div className="space-y-6">
                <p className="font-sans-custom text-[15px] font-light text-[#555555] leading-relaxed">
                  Every residence in our collection has been selected not merely
                  for its architectural merit, but for its capacity to transform
                  the way you experience daily life. These are spaces that
                  transcend the ordinary, where light, material, and landscape
                  converge to create moments of profound beauty.
                </p>
                <p className="font-sans-custom text-[15px] font-light text-[#555555] leading-relaxed">
                  We work intimately with visionary architects, discerning
                  collectors, and the world&apos;s most talented designers to
                  present a portfolio that represents the pinnacle of
                  contemporary residential design. Each property tells a story
                  of ambition, craftsmanship, and an unwavering commitment to
                  excellence.
                </p>
              </div>
              <div className="mt-10 flex items-center gap-6">
                <button className="group flex items-center gap-3 px-8 py-3 border border-[#1A1A1A] font-sans-custom text-[12px] font-light tracking-wide-editorial uppercase text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-all duration-500">
                  Our Story
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
                <button className="font-sans-custom text-[12px] font-light tracking-wide-editorial uppercase text-[#D4AF37] hover:text-[#C4A030] transition-colors duration-500">
                  Meet the Team
                </button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   Stats / Numbers Section
   ────────────────────────────────────────────── */
function StatsSection() {
  const stats = [
    { number: "340+", label: "Exceptional Properties" },
    { number: "42", label: "Countries Worldwide" },
    { number: "$18B", label: "Portfolio Value" },
    { number: "15", label: "Years of Excellence" },
  ];

  return (
    <section className="py-20 md:py-28">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="border-t border-b border-[#E5E5E5]/60 py-16 md:py-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
            {stats.map((stat, i) => (
              <AnimatedSection
                key={stat.label}
                delay={i * 0.1}
                className="text-center"
              >
                <p className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-[#1A1A1A] mb-2">
                  {stat.number}
                </p>
                <p className="font-sans-custom text-[11px] font-light tracking-wide-editorial uppercase text-[#999999]">
                  {stat.label}
                </p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   Journal / Editorial Picks Section
   ────────────────────────────────────────────── */
function JournalSection() {
  const articles = [
    {
      title: "The New Language of Luxury",
      category: "Design",
      excerpt:
        "How contemporary architects are redefining what it means to live beautifully.",
      image: "/property-2.jpg",
    },
    {
      title: "Coastal Living, Redefined",
      category: "Lifestyle",
      excerpt:
        "The most sought-after waterfront residences that balance serenity with sophistication.",
      image: "/property-3.jpg",
    },
  ];

  return (
    <section id="journal" className="py-24 md:py-32 lg:py-40 bg-[#F8F8F6]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <AnimatedSection className="mb-16 md:mb-20">
          <p className="font-sans-custom text-[11px] font-light tracking-wide-editorial uppercase text-[#D4AF37] mb-4">
            The Journal
          </p>
          <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-medium tracking-editorial text-[#1A1A1A]">
            STORIES & INSIGHTS
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {articles.map((article, i) => (
            <AnimatedSection key={article.title} delay={i * 0.15}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.4 }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden aspect-[16/10] bg-[#E5E5E5] mb-6">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                  />
                  <div className="absolute inset-0 border border-[#1A1A1A]/6 pointer-events-none" />
                </div>
                <span className="font-sans-custom text-[10px] font-light tracking-wide-editorial uppercase text-[#D4AF37]">
                  {article.category}
                </span>
                <h3 className="font-serif text-lg md:text-xl font-medium tracking-editorial text-[#1A1A1A] mt-2 mb-3 group-hover:text-[#D4AF37] transition-colors duration-500">
                  {article.title}
                </h3>
                <p className="font-sans-custom text-[14px] font-light text-[#555555] leading-relaxed">
                  {article.excerpt}
                </p>
                <div className="flex items-center gap-2 mt-4">
                  <span className="font-sans-custom text-[11px] font-light tracking-wide-editorial uppercase text-[#999999] group-hover:text-[#1A1A1A] transition-colors duration-500">
                    Read More
                  </span>
                  <ArrowRight className="w-3 h-3 text-[#999999] group-hover:text-[#1A1A1A] group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   CTA / Contact Section
   ────────────────────────────────────────────── */
function CTASection() {
  return (
    <section id="contact" className="py-24 md:py-32 lg:py-40">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <AnimatedSection>
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex justify-center mb-8">
              <div className="gold-line" />
            </div>
            <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-medium tracking-editorial text-[#1A1A1A] mb-6">
              BEGIN YOUR JOURNEY
            </h2>
            <p className="font-sans-custom text-[15px] font-light text-[#555555] leading-relaxed mb-10">
              Whether you are seeking the perfect residence or wish to list an
              extraordinary property, our team of specialists is here to guide
              you through every step of the process with discretion and care.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="group flex items-center gap-3 px-10 py-3.5 bg-[#1A1A1A] text-white font-sans-custom text-[12px] font-light tracking-wide-editorial uppercase hover:bg-[#333333] transition-colors duration-500">
                Schedule a Consultation
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              <button className="group flex items-center gap-3 px-10 py-3.5 border border-[#1A1A1A] font-sans-custom text-[12px] font-light tracking-wide-editorial uppercase text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-all duration-500">
                Contact Us
              </button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   Footer
   ────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="border-t border-[#E5E5E5]/60">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <a
              href="#"
              className="font-serif text-xl font-semibold tracking-editorial text-[#1A1A1A]"
            >
              MAISON
            </a>
            <p className="font-sans-custom text-[13px] font-light text-[#555555] mt-4 leading-relaxed">
              Curating the world&apos;s most
              <br />
              exceptional residences.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-sans-custom text-[10px] font-medium tracking-wide-editorial uppercase text-[#1A1A1A] mb-5">
              Properties
            </h4>
            <div className="flex flex-col gap-3">
              {[
                "Residential",
                "Commercial",
                "New Developments",
                "Off-Market",
              ].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="font-sans-custom text-[13px] font-light text-[#555555] hover:text-[#1A1A1A] transition-colors duration-300"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-sans-custom text-[10px] font-medium tracking-wide-editorial uppercase text-[#1A1A1A] mb-5">
              Company
            </h4>
            <div className="flex flex-col gap-3">
              {["About", "Journal", "Careers", "Press"].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="font-sans-custom text-[13px] font-light text-[#555555] hover:text-[#1A1A1A] transition-colors duration-300"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-sans-custom text-[10px] font-medium tracking-wide-editorial uppercase text-[#1A1A1A] mb-5">
              Connect
            </h4>
            <div className="flex flex-col gap-3">
              {["Instagram", "Pinterest", "LinkedIn", "Newsletter"].map(
                (link) => (
                  <a
                    key={link}
                    href="#"
                    className="font-sans-custom text-[13px] font-light text-[#555555] hover:text-[#1A1A1A] transition-colors duration-300"
                  >
                    {link}
                  </a>
                ),
              )}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between mt-16 pt-8 border-t border-[#E5E5E5]/40">
          <p className="font-sans-custom text-[11px] font-light text-[#999999] tracking-wide">
            &copy; 2026 Maison. All rights reserved.
          </p>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            {["Privacy", "Terms", "Cookies"].map((link) => (
              <a
                key={link}
                href="#"
                className="font-sans-custom text-[11px] font-light text-[#999999] hover:text-[#555555] transition-colors duration-300 tracking-wide"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ──────────────────────────────────────────────
   Main Page
   ────────────────────────────────────────────── */
export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        <HeroSection />
        <SectionDivider />
        <FeaturedProperties />
        <EditorialStatement />
        <StatsSection />
        <JournalSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
