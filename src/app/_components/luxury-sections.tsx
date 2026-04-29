"use client";

import { memo, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();

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

  // White header only on home hero; black on all other routes.
  const isHomePage = pathname === "/";
  const isLightHeader = isHomePage && !scrolled;
  const linkClass = isLightHeader
    ? "text-white hover:text-white/80"
    : "text-charcoal hover:text-[#C4A030]";
  const logoClass = isLightHeader ? "text-white" : "text-charcoal";
  const dividerClass = isLightHeader ? "text-white/70" : "text-charcoal/70";
  // Mobile hamburger should be black on all pages.
  const burgerBarClass = "bg-charcoal";

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
            className={`font-serif text-xl md:text-2xl font-semibold tracking-editorial transition-colors duration-500 ${logoClass}`}
          >
            MAISON
          </a>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`font-sans-custom text-[13px] font-light tracking-wide-editorial transition-colors duration-500 uppercase ${linkClass}`}
              >
                {link.label}
              </a>
            ))}
            <span className={dividerClass}>|</span>
            <a
              href="/inquire"
              className={`font-sans-custom text-[13px] font-light tracking-wide-editorial transition-colors duration-500 uppercase ${isLightHeader ? "text-white hover:text-white/80" : "text-gold hover:text-[#C4A030]"}`}
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
              animate={
                mobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }
              }
              className={`block w-6 h-0.5 rounded-sm transition-colors ${burgerBarClass}`}
            />
            <motion.span
              animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className={`block w-6 h-0.5 rounded-sm transition-colors ${burgerBarClass}`}
            />
            <motion.span
              animate={
                mobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }
              }
              className={`block w-6 h-0.5 rounded-sm transition-colors ${burgerBarClass}`}
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
                    isHomePage
                      ? "text-charcoal hover:text-[#C4A030]"
                      : "text-charcoal hover:text-[#C4A030]"
                  }`}
                >
                  {link.label}
                </motion.a>
              ))}
              <a
                href="/inquire"
                onClick={() => setMobileMenuOpen(false)}
                className="font-sans-custom text-[15px] font-light tracking-wide-editorial uppercase transition-colors duration-500 text-gold hover:text-[#C4A030]"
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

export function InquireSection() {
  return (
    <section className="py-24 md:py-32 lg:py-40">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <AnimatedSection>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-start">
            <div className="lg:col-span-5">
              <div className="gold-line mb-8" />
              <p className="font-sans-custom text-[11px] font-light tracking-wide-editorial uppercase text-[#D4AF37] mb-4">
                Private Inquiry
              </p>
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium tracking-editorial text-[#1A1A1A] leading-[1.08]">
                A discreet conversation begins here.
              </h1>
              <p className="font-sans-custom text-[15px] font-light text-[#555555] leading-relaxed mt-8 max-w-md">
                Share a few details and a specialist will respond with curated
                options, timelines, and next steps.
              </p>

              <div className="mt-10 space-y-3 text-[#555555]">
                <p className="font-sans-custom text-[13px] font-light tracking-wide">
                  Availability: Mon–Sat
                </p>
                <p className="font-sans-custom text-[13px] font-light tracking-wide">
                  Response time: within 24 hours
                </p>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="bg-white border border-[#E5E5E5]/70">
                <div className="p-7 md:p-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block font-sans-custom text-[10px] font-light tracking-wide-editorial uppercase text-[#999999] mb-2">
                        Full name
                      </label>
                      <input className="w-full border border-[#E5E5E5] px-4 py-3 outline-none focus:border-[#D4AF37] font-sans-custom text-[14px] font-light text-[#1A1A1A]" />
                    </div>
                    <div>
                      <label className="block font-sans-custom text-[10px] font-light tracking-wide-editorial uppercase text-[#999999] mb-2">
                        Email
                      </label>
                      <input className="w-full border border-[#E5E5E5] px-4 py-3 outline-none focus:border-[#D4AF37] font-sans-custom text-[14px] font-light text-[#1A1A1A]" />
                    </div>
                    <div>
                      <label className="block font-sans-custom text-[10px] font-light tracking-wide-editorial uppercase text-[#999999] mb-2">
                        Preferred location
                      </label>
                      <input className="w-full border border-[#E5E5E5] px-4 py-3 outline-none focus:border-[#D4AF37] font-sans-custom text-[14px] font-light text-[#1A1A1A]" />
                    </div>
                    <div>
                      <label className="block font-sans-custom text-[10px] font-light tracking-wide-editorial uppercase text-[#999999] mb-2">
                        Budget range
                      </label>
                      <input className="w-full border border-[#E5E5E5] px-4 py-3 outline-none focus:border-[#D4AF37] font-sans-custom text-[14px] font-light text-[#1A1A1A]" />
                    </div>
                  </div>

                  <div className="mt-5">
                    <label className="block font-sans-custom text-[10px] font-light tracking-wide-editorial uppercase text-[#999999] mb-2">
                      Message
                    </label>
                    <textarea
                      rows={5}
                      className="w-full border border-[#E5E5E5] px-4 py-3 outline-none focus:border-[#D4AF37] font-sans-custom text-[14px] font-light text-[#1A1A1A] resize-none"
                    />
                  </div>

                  <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    <p className="font-sans-custom text-[11px] font-light tracking-wide text-[#999999]">
                      By submitting, you agree to be contacted by Maison.
                    </p>
                    <button className="group flex items-center gap-3 px-10 py-3.5 bg-[#1A1A1A] text-white font-sans-custom text-[12px] font-light tracking-wide-editorial uppercase hover:bg-[#333333] transition-colors duration-500">
                      Submit inquiry
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

export function AnimatedSection({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const [crisp, setCrisp] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: "easeOut", delay }}
      onAnimationComplete={() => setCrisp(true)}
      className={className}
      style={
        crisp
          ? ({ transform: "none", willChange: "auto" } as const)
          : ({ willChange: "transform, opacity" } as const)
      }
    >
      {children}
    </motion.div>
  );
}

export function SectionDivider() {
  return (
    <div className="py-10 md:py-14">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="h-px bg-[#E5E5E5]/70" />
      </div>
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  imageSrc = "/estate.jpg",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  imageSrc?: string;
}) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={imageSrc}
          alt=""
          className="w-full h-full object-cover"
          decoding="async"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/20 to-white/95" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 pt-20 md:pt-24 lg:pt-28 pb-18 md:pb-24">
        <AnimatedSection className="max-w-3xl">
          <p className="font-sans-custom text-[11px] font-light tracking-wide-editorial uppercase text-white/85 mb-5">
            {eyebrow}
          </p>
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium tracking-editorial text-white leading-[1.08]">
            {title}
          </h1>
          {subtitle ? (
            <p className="font-sans-custom text-[15px] md:text-[16px] font-light text-white/80 leading-relaxed mt-7 max-w-2xl">
              {subtitle}
            </p>
          ) : null}
        </AnimatedSection>
      </div>
    </section>
  );
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 30,
    mass: 0.7,
  });
  const imageY = useTransform(progress, [0, 1], [0, 120]);
  const imageScale = useTransform(progress, [0, 1], [1.02, 1.08]);

  return (
    <section ref={sectionRef} className="relative min-h-[92vh] overflow-hidden">
      <motion.div
        style={{ y: imageY, scale: imageScale }}
        className="absolute inset-0"
      >
        <img
          src="/property-2.jpg"
          alt="Curated residence"
          className="w-full h-full object-cover"
          decoding="async"
          fetchPriority="high"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/15 to-white/95" />

      <div className="relative z-10">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 pt-32 md:pt-40 lg:pt-44 pb-20">
          <AnimatedSection className="max-w-3xl">
            <p className="font-sans-custom text-[11px] font-light tracking-wide-editorial uppercase text-white/85 mb-6">
              Exceptional Properties Worldwide
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium tracking-editorial text-white leading-[1.05]">
              A curated collection of residences where architecture meets
              artistry.
            </h1>
            <p className="font-sans-custom text-[15px] md:text-[16px] font-light text-white leading-relaxed mt-8 max-w-2xl drop-shadow-md">
              Discover spaces shaped by light, material, and landscape —
              selected for the way they transform daily life.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.15} className="mt-14 md:mt-16">
            <div className="bg-white/92 backdrop-blur-sm border border-white/60 max-w-3xl">
              <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="flex items-center gap-3 px-5 py-4 border-b md:border-b-0 md:border-r border-[#E5E5E5]/70">
                  <MapPin className="w-4 h-4 text-[#D4AF37]" />
                  <input
                    placeholder="Location"
                    className="w-full bg-transparent outline-none font-sans-custom text-[13px] font-light text-[#1A1A1A] placeholder:text-[#999999]"
                  />
                </div>
                <div className="flex items-center gap-3 px-5 py-4 border-b md:border-b-0 md:border-r border-[#E5E5E5]/70">
                  <ChevronDown className="w-4 h-4 text-[#D4AF37]" />
                  <input
                    placeholder="Property type"
                    className="w-full bg-transparent outline-none font-sans-custom text-[13px] font-light text-[#1A1A1A] placeholder:text-[#999999]"
                  />
                </div>
                <button className="group flex items-center justify-center gap-2 px-6 py-4 bg-[#1A1A1A] text-white hover:bg-black transition-colors duration-300">
                  <Search className="w-4 h-4" />
                  <span className="font-sans-custom text-[12px] font-light tracking-wide-editorial uppercase">
                    Search
                  </span>
                </button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

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
        className="relative cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
      >
        <div className="relative overflow-hidden aspect-[4/3] bg-[#F8F8F6]">
          <motion.img
            src={property.image}
            alt={property.title}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.04 : 1 }}
            transition={{ type: "tween", duration: 0.75, ease: "easeOut" }}
            style={{ willChange: "transform" }}
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 border border-[#1A1A1A]/6 pointer-events-none" />
          <div className="absolute top-5 left-5">
            <span className="font-sans-custom text-[10px] font-light tracking-wide-editorial uppercase text-[#D4AF37] bg-white/90 backdrop-blur-sm px-3 py-1.5 border border-[#D4AF37]/30">
              {property.tag}
            </span>
          </div>
          <motion.div
            initial={false}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="absolute inset-0 bg-[#1A1A1A]/10 flex items-end justify-start p-6"
            style={{ willChange: "opacity" }}
          >
            <motion.div
              initial={false}
              animate={isHovered ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.08, ease: "easeOut" }}
              style={{ willChange: "transform, opacity" }}
            >
              <span className="font-sans-custom text-[11px] font-light tracking-wide-editorial uppercase text-white flex items-center gap-2">
                View Details <ArrowRight className="w-3 h-3" />
              </span>
            </motion.div>
          </motion.div>
        </div>

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

const MemoPropertyCard = memo(PropertyCard);
MemoPropertyCard.displayName = "PropertyCard";

export function FeaturedProperties() {
  return (
    <section className="py-24 md:py-32 lg:py-40">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
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
              <button className="group flex items-center gap-2 px-6 py-2.5 border border-[#1A1A1A] rounded-none font-sans-custom text-[12px] font-light tracking-wide-editorial uppercase text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-all duration-500">
                View All
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
          {properties.map((property, i) => (
            <MemoPropertyCard key={property.id} property={property} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function EditorialStatement() {
  return (
    <section className="py-24 md:py-32 lg:py-40 bg-[#F8F8F6]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
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
              <div className="absolute -bottom-3 -right-3 w-full h-full border border-[#D4AF37]/30 -z-10" />
            </div>
          </AnimatedSection>

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

export function StatsSection() {
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
                <motion.div
                  className="group inline-flex flex-col items-center"
                  whileHover={{ y: -3 }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  style={{ willChange: "transform" }}
                >
                  <motion.p
                    className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-[#1A1A1A] mb-2"
                    whileHover={{ color: "#D4AF37" }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    style={{ willChange: "color" }}
                  >
                    {stat.number}
                  </motion.p>

                  <div className="h-px w-8 bg-[#D4AF37]/0 group-hover:bg-[#D4AF37]/70 transition-colors duration-500 mb-3" />

                  <p className="font-sans-custom text-[11px] font-light tracking-wide-editorial uppercase text-[#999999] group-hover:text-[#555555] transition-colors duration-500">
                    {stat.label}
                  </p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function JournalSection() {
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
    <section className="py-24 md:py-32 lg:py-40 bg-[#F8F8F6]">
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

export function CTASection() {
  return (
    <section className="py-24 md:py-32 lg:py-40">
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

export function Footer() {
  return (
    <footer className="border-t border-[#E5E5E5]/60">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <a
              href="/"
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
                  href="/properties"
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
                  href={link === "About" ? "/about" : "/journal"}
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
