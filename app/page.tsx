'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import WhyChoose from '@/components/WhyChoose';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { CheckCircleIcon, UserGroupIcon, BoltIcon, ChevronLeftIcon, ChevronRightIcon, MapPinIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/solid';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { REVIEWS } from '@/data/reviews';

const FB_URL = 'https://www.facebook.com/BrightonRoadLandscaping';
const IG_URL = 'https://www.instagram.com/brightonroadlandscaping/';
const GOOGLE_REVIEWS_URL = 'https://share.google/5v5xiQz6FsFcyhFgh';

// Hero carousel — one full-screen slide per service, each photo matched to the service.
const SLIDES = [
  { name: 'Landscape Design & Build', tagline: 'Custom landscapes, designed and installed for your property.', img: '/images/projects/landscape-design-build-hero.jpg' },
  { name: 'Hardscaping', tagline: 'Paver patios, walkways, and stonework built to last.', img: '/images/projects/hardscaping-hero.jpg' },
  { name: 'Mulch & Garden Beds', tagline: 'Crisp, fresh beds that make the whole yard pop.', img: '/images/projects/IMG_2122.JPG' },
  { name: 'Property Maintenance', tagline: 'Ongoing care that keeps your property looking brand new.', img: '/images/projects/IMG_2122.JPG', video: '/Grass.Cutting.mp4' },
];
const NAV = [
  { label: 'Services', href: '/services' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'About', href: '/about' },
  { label: 'Reviews', href: '/testimonials' },
  { label: 'Contact', href: '/contact' },
];

// Official 4-color Google "G".
function GoogleG({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
      <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
      <path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z" />
      <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z" />
    </svg>
  );
}

export default function Home() {
  const testimonialsRef = useRef(null);
  const isTestimonialsInView = useInView(testimonialsRef, { once: true });

  const faqRef = useRef(null);
  const isFAQInView = useInView(faqRef, { once: true });

  const [active, setActive] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const n = SLIDES.length;
  const go = useCallback((d: number) => setActive((p) => (p + d + n) % n), [n]);

  useEffect(() => {
    const t = setInterval(() => setActive((p) => (p + 1) % n), 6500);
    return () => clearInterval(t);
  }, [n]);

  // Testimonials carousel
  const [review, setReview] = useState(0);
  const rN = REVIEWS.length;
  const goReview = useCallback((d: number) => setReview((p) => (p + d + rN) % rN), [rN]);
  useEffect(() => {
    const t = setInterval(() => setReview((p) => (p + 1) % rN), 5500);
    return () => clearInterval(t);
  }, [rN]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'ArrowLeft') go(-1); if (e.key === 'ArrowRight') go(1); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go]);

  const slide = SLIDES[active];

  return (
    <div>
      {/* Hide the global site header on the landing page only (style unmounts on navigation away) */}
      <style>{`header.sticky{display:none!important}`}</style>

      {/* Landing navbar — centered, bigger; transparent over hero, solid green on scroll */}
      <div className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0b4228]/95 backdrop-blur shadow-xl py-3' : 'bg-gradient-to-b from-black/55 to-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center gap-4">
          {/* Logo — top left */}
          <Link href="/" aria-label="Brighton Road Landscaping" className="shrink-0">
            <Image src="/images/brighton-badge-white.png" alt="Brighton Road Landscaping" width={210} height={124} priority className={`h-auto drop-shadow-2xl transition-all duration-300 ${scrolled ? 'w-[116px] md:w-[140px]' : 'w-[128px] md:w-[180px]'}`} />
          </Link>

          {/* Desktop: centered nav links */}
          <nav className="hidden md:flex flex-1 items-center justify-center gap-6 lg:gap-9 font-[Impact] tracking-wide">
            {NAV.map((l) => (
              <Link key={l.href} href={l.href} className="text-xl lg:text-2xl text-white hover:text-green-300 transition-colors drop-shadow-lg">{l.label}</Link>
            ))}
          </nav>

          {/* Desktop: socials + quote (right) */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4 shrink-0">
            <div className="flex items-center gap-2.5">
              <a href={FB_URL} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-9 h-9 rounded-full bg-white/15 hover:bg-green-500 flex items-center justify-center text-white transition"><FaFacebookF className="w-4 h-4" /></a>
              <a href={IG_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-9 h-9 rounded-full bg-white/15 hover:bg-green-500 flex items-center justify-center text-white transition"><FaInstagram className="w-4 h-4" /></a>
            </div>
            <Link href="/quote">
              <button className="bg-green-600 hover:bg-green-500 text-white px-6 py-2.5 rounded-full font-semibold text-base lg:text-lg shadow-xl transition transform hover:scale-105 whitespace-nowrap">Get a Quote</button>
            </Link>
          </div>

          {/* Mobile: social + phone buttons + hamburger */}
          <div className="md:hidden ml-auto flex items-center gap-2">
            <a href={FB_URL} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-9 h-9 rounded-full bg-white/15 hover:bg-green-500 flex items-center justify-center text-white transition"><FaFacebookF className="w-4 h-4" /></a>
            <a href={IG_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-9 h-9 rounded-full bg-white/15 hover:bg-green-500 flex items-center justify-center text-white transition"><FaInstagram className="w-4 h-4" /></a>
            <a href="tel:4845351936" aria-label="Call" className="w-9 h-9 rounded-full bg-[#16a34a] hover:bg-[#138a3e] flex items-center justify-center text-white transition"><svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" /></svg></a>
            <button onClick={() => setMenuOpen((o) => !o)} aria-label="Menu" className="text-white p-1.5 -mr-1">
              {menuOpen ? (
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
              ) : (
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {menuOpen && (
          <div className="md:hidden bg-[#0b4228]/98 backdrop-blur border-t border-white/10 px-6 py-5">
            <nav className="flex flex-col gap-3 font-[Impact] text-white text-2xl">
              {NAV.map((l) => (
                <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="hover:text-green-300 transition-colors">{l.label}</Link>
              ))}
            </nav>
            <div className="flex items-center justify-center gap-3 mt-5">
              <a href={FB_URL} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center text-white"><FaFacebookF className="w-4 h-4" /></a>
              <a href={IG_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center text-white"><FaInstagram className="w-4 h-4" /></a>
              <a href="tel:4845351936" aria-label="Call" className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center text-white"><svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" /></svg></a>
            </div>
            <Link href="/quote" onClick={() => setMenuOpen(false)}>
              <button className="w-full mt-5 bg-green-600 hover:bg-green-500 text-white py-3 rounded-full font-semibold text-lg shadow-xl">Get a Quote</button>
            </Link>
          </div>
        )}
      </div>

      {/* Hero — full-screen service carousel; scroll down for the full homepage */}
      <div className="relative h-screen w-full overflow-hidden bg-black">
        {SLIDES.map((s, idx) => (
          <div key={s.name} className={`absolute inset-0 transition-opacity ease-in-out duration-[1200ms] ${idx === active ? 'opacity-100' : 'opacity-0'}`} aria-hidden={idx !== active}>
            {s.video ? (
              <video className="absolute inset-0 w-full h-full object-cover" autoPlay muted loop playsInline poster={s.img} preload="auto">
                <source src={s.video} type="video/mp4" />
              </video>
            ) : (
              <Image src={s.img} alt={`${s.name} — Brighton Road Landscaping`} fill priority={idx === 0} sizes="100vw" className={`object-cover transition-transform ease-out duration-[7000ms] ${idx === active ? 'scale-110' : 'scale-100'}`} />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/55" />
          </div>
        ))}

        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6">
          <motion.div key={active} initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: 'easeOut' }} className="max-w-5xl">
            <p className="text-green-300 font-semibold uppercase tracking-[0.32em] text-xs md:text-sm mb-4 drop-shadow">Brighton Road Landscaping</p>
            <h1 className="text-white font-[impact] leading-[0.95] text-5xl md:text-7xl lg:text-8xl drop-shadow-2xl">{slide.name}</h1>
            <p className="text-white/90 text-lg md:text-2xl mt-6 max-w-2xl mx-auto drop-shadow-lg">{slide.tagline}</p>
            <div className="flex flex-wrap gap-4 justify-center mt-9 md:mt-11">
              <Link href="/quote"><button className="bg-green-600 hover:bg-green-500 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-2xl transition transform hover:scale-105">Get a Free Quote</button></Link>
              <Link href="/gallery"><button className="bg-white/10 backdrop-blur border border-white/40 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/20 transition">See Our Work</button></Link>
            </div>
          </motion.div>
        </div>

        {/* Desktop: arrows on the sides */}
        <button onClick={() => go(-1)} aria-label="Previous service" className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur items-center justify-center text-white transition"><ChevronLeftIcon className="w-7 h-7" /></button>
        <button onClick={() => go(1)} aria-label="Next service" className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur items-center justify-center text-white transition"><ChevronRightIcon className="w-7 h-7" /></button>

        {/* Controls — dots, with arrows alongside them on mobile so they never cover the copy */}
        <div className="absolute bottom-20 inset-x-0 z-30 flex items-center justify-center gap-4">
          <button onClick={() => go(-1)} aria-label="Previous service" className="md:hidden w-9 h-9 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur flex items-center justify-center text-white transition shrink-0"><ChevronLeftIcon className="w-5 h-5" /></button>
          <div className="flex items-center justify-center gap-3">
            {SLIDES.map((s, idx) => (
              <button key={s.name} onClick={() => setActive(idx)} aria-label={`Go to ${s.name}`} className={`h-2 rounded-full transition-all duration-300 ${idx === active ? 'w-9 bg-green-400' : 'w-2.5 bg-white/50 hover:bg-white/90'}`} />
            ))}
          </div>
          <button onClick={() => go(1)} aria-label="Next service" className="md:hidden w-9 h-9 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur flex items-center justify-center text-white transition shrink-0"><ChevronRightIcon className="w-5 h-5" /></button>
        </div>
        <div className="absolute bottom-6 inset-x-0 z-30 flex justify-center pointer-events-none">
          <span className="text-white/70 text-xs tracking-[0.3em] uppercase animate-bounce">Scroll ↓</span>
        </div>
      </div>

      {/* Complete Landscaping Services Section - FULL BLEED */}
<section className="bg-white md:min-h-[600px]">
  <div className="grid md:grid-cols-2 h-full">
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="flex items-center p-6 py-10 md:p-12 lg:p-20"
    >
      <div>
        <h2 className="text-4xl md:text-5xl font-[impact] text-gray-900 mb-6">
          Complete Landscaping Services
        </h2>
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
          Brighton Road Landscaping offers both residential and commercial landscaping services.
          Located in Plymouth Meeting PA, we service the surrounding areas of King of Prussia,
          Blue Bell, Conshohocken, Wayne, Bryn Mawr, Ardmore, and the Main Line, providing comprehensive lawn and landscape services. From the installation of landscapes, hardscapes, and drainage systems,
          as well as the maintenance and enhancements of lawns and landscapes,
          Brighton Road Landscaping is here to serve you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/about">
            <button className="bg-green-700 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold shadow-lg transition transform hover:scale-105 text-lg">
              About Us
            </button>
          </Link>
          <Link href="/quote">
            <button className="border-2 border-green-700 text-green-700 hover:bg-green-50 px-8 py-3 rounded-lg font-semibold transition transform hover:scale-105 text-lg">
              Get a Quote
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="relative h-[260px] md:h-auto md:min-h-[600px]"
    >
      <Image
        src="/images/homepage1.JPG"
        alt="Complete Landscaping Services"
        fill
        className="object-cover"
      />
    </motion.div>
  </div>
</section>

      {/* Hardscaping Service - DIAGONAL DESKTOP, STACKED MOBILE */}
<section className="relative bg-gradient-to-br from-green-50 to-white overflow-hidden">
</section>
  {/* Mobile: Stacked Layout */}
  <div className="md:hidden">
    <div className="relative h-[240px]">
      <Image
        src="/images/hardscape.jpg"
        alt="Hardscaping Services"
        fill
        className="object-cover"
      />
    </div>
    <div className="p-8 bg-white">
      <h3 className="text-4xl font-[impact] text-gray-900 mb-8 leading-tight text-center">
        Explore Our Hardscaping Service
      </h3>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/services/hardscaping" className="w-full">
          <button className="w-full bg-green-700 hover:bg-green-600 text-white px-10 py-4 rounded-lg transition transform hover:scale-105 font-semibold shadow-lg text-xl">
            Explore Services
          </button>
        </Link>
        <Link href="/quote" className="w-full">
          <button className="w-full border-2 border-green-700 text-green-700 bg-white hover:bg-green-50 px-10 py-4 rounded-lg transition transform hover:scale-105 font-semibold text-xl">
            Get a Quote
          </button>
        </Link>
      </div>
    </div>
  </div>

  {/* Desktop: Keep Diagonal Design */}
  <div className="hidden md:block max-w-[1400px] mx-auto">
    <div className="relative h-[600px] md:h-[700px] lg:h-[800px]">
      {/* Background Image - Full Width */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="absolute inset-0"
      >
        <Image
          src="/images/hardscape.jpg"
          alt="Hardscaping Services"
          fill
          className="object-cover"
        />
      </motion.div>

      {/* White/Light Overlay Panel - Right Side */}
      <div className="absolute inset-y-0 right-0 w-full md:w-[65%] lg:w-[55%] bg-white/95 backdrop-blur-sm"
           style={{ 
             clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)'
           }}>
      </div>

      {/* Text Content - Right Side Overlapping */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="relative z-10 h-full flex items-center justify-end"
      >
        <div className="px-8 md:px-12 lg:px-20 max-w-3xl w-full md:w-[60%]">
          <h3 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-[impact] text-gray-900 mb-8 leading-tight text-center">
            Explore Our Hardscaping Service
          </h3>
          <p className="text-gray-700 mb-10 leading-relaxed text-lg md:text-xl lg:text-2xl">
          </p>
          <div className="flex flex-col sm:flex-row gap-4 ml-16">
            <Link href="/services/hardscaping">
              <button className="bg-green-700 hover:bg-green-600 text-white px-10 py-4 rounded-lg transition transform hover:scale-105 font-semibold shadow-lg text-xl">
                Explore Services
              </button>
            </Link>
            <Link href="/quote">
              <button className="border-2 border-green-700 text-green-700 bg-white hover:bg-green-50 px-10 py-4 rounded-lg transition transform hover:scale-105 font-semibold text-xl">
                Get a Quote
              </button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  </div>


      {/* What We Do Section - FULL BLEED 3x2 GRID */}
      <section className="bg-gray-50 py-12 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h3
            className="text-3xl md:text-5xl font-[impact] text-gray-900 mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            What We Do
          </motion.h3>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {[
              { title: 'Landscape Design and Build', desc: 'Custom landscapes designed and built for your property', href: '/services/landscape-design' },
              { title: 'Hardscaping', desc: 'Patios, walkways, retaining walls & stonework', href: '/services/hardscaping' },
              { title: 'Seasonal Cleanups', desc: 'Spring and fall cleanup services', href: '/services/seasonal-cleanups' },
              { title: 'Drainage', desc: 'French drains & grading that fix water and runoff issues', href: '/services/drainage' },
              { title: 'Property Maintenance', desc: 'Ongoing mowing, upkeep, and property enhancements', href: '/services/lawn-mowing' },
            ].map((s) => (
              <motion.div
                key={s.title}
                className="w-[calc(50%-0.5rem)] md:w-[calc(33.333%-1rem)]"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Link href={s.href} className="group block h-full bg-white rounded-2xl shadow-md p-4 md:p-8 text-center hover:shadow-xl transition transform hover:-translate-y-1">
                  <div className="bg-green-100 group-hover:bg-green-200 rounded-full p-2.5 md:p-3 inline-flex mb-3 md:mb-4 transition">
                    <CheckCircleIcon className="w-6 h-6 md:w-8 md:h-8 text-green-700" />
                  </div>
                  <h4 className="font-semibold text-gray-900 text-sm md:text-xl mb-1 md:mb-2 leading-tight group-hover:text-green-700 transition">{s.title}</h4>
                  <p className="text-gray-600 text-xs md:text-base leading-snug">{s.desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/services">
              <button className="bg-green-700 hover:bg-green-600 text-white px-8 py-3 rounded-lg transition transform hover:scale-105 font-semibold shadow-lg">
                View All Services
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS — Google reviews carousel */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-14 md:py-20 px-6">
        <motion.div
          ref={testimonialsRef}
          initial={{ opacity: 0, y: 50 }}
          animate={isTestimonialsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <div className="flex flex-col items-center mb-8 md:mb-10">
            <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 mb-3 hover:opacity-80 transition" aria-label="Read our reviews on Google">
              <GoogleG className="w-7 h-7" />
              <span className="text-gray-700 font-semibold text-lg">Google Reviews</span>
              <span className="text-gray-300">·</span>
              <span className="text-yellow-400 text-lg tracking-tight">★★★★★</span>
            </a>
            <h2 className="text-3xl md:text-4xl font-[impact] text-center text-gray-900">
              What Our Clients Say
            </h2>
          </div>

          {/* Active review card — only the current one renders so it auto-sizes to long quotes */}
          <motion.div
            key={review}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="bg-white border border-gray-100 rounded-2xl shadow-xl p-8 md:p-10 text-center"
          >
            <GoogleG className="w-9 h-9 mx-auto mb-4" />
            <div className="flex justify-center gap-1 mb-5 text-2xl text-yellow-400">
              {[...Array(5)].map((_, i) => (<span key={i}>★</span>))}
            </div>
            <p className="text-gray-700 text-lg md:text-xl italic leading-relaxed mb-6">“{REVIEWS[review].text}”</p>
            <p className="font-bold text-green-700 text-lg">{REVIEWS[review].name}</p>
          </motion.div>

          {/* Bottom controls — arrows + counter, looping */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button onClick={() => goReview(-1)} aria-label="Previous review" className="w-11 h-11 rounded-full bg-white border border-gray-200 shadow-md hover:bg-green-50 hover:border-green-300 flex items-center justify-center text-green-700 transition">
              <ChevronLeftIcon className="w-6 h-6" />
            </button>
            <span className="text-gray-500 font-medium tabular-nums text-sm tracking-wide">{review + 1} / {REVIEWS.length}</span>
            <button onClick={() => goReview(1)} aria-label="Next review" className="w-11 h-11 rounded-full bg-white border border-gray-200 shadow-md hover:bg-green-50 hover:border-green-300 flex items-center justify-center text-green-700 transition">
              <ChevronRightIcon className="w-6 h-6" />
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mt-8">
            <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-green-300 text-gray-800 font-semibold px-5 py-2.5 rounded-full transition">
              <GoogleG className="w-5 h-5" />
              See all reviews on Google
            </a>
            <Link href="/testimonials" className="text-green-700 font-semibold hover:text-green-600 transition underline-offset-4 hover:underline">
              Read all reviews →
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Why Choose Us Section - FULL BLEED */}
      <section className="bg-white md:min-h-[600px]">
        <div className="grid md:grid-cols-2 h-full">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative h-[260px] md:h-auto md:min-h-[600px]"
          >
            <Image
              src="/images/homepage2.JPG"
              alt="Brighton Road Team"
              fill
              className="object-cover"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex items-center p-6 py-10 md:p-12 lg:p-20"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-[impact] text-gray-900 mb-8">
                Why Choose Brighton Road Landscaping?
              </h2>
              <div className="space-y-6">
                <div className="flex items-start group">
                  <div className="bg-green-600 text-white rounded-full p-3 mr-4 group-hover:bg-green-700 transition flex items-center justify-center min-w-[48px] h-12">
                    <CheckCircleIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-xl mb-1">A Trusted Brand</h4>
                    <p className="text-gray-600">Serving Montgomery County since 2022 with pride</p>
                  </div>
                </div>
                
                <div className="flex items-start group">
                  <div className="bg-green-600 text-white rounded-full p-3 mr-4 group-hover:bg-green-700 transition flex items-center justify-center min-w-[48px] h-12">
                    <MapPinIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-xl mb-1">Locally Owned &amp; Operated</h4>
                    <p className="text-gray-600">Your neighbors, proudly serving the Main Line &amp; Montgomery County</p>
                  </div>
                </div>
                
                <div className="flex items-start group">
                  <div className="bg-green-600 text-white rounded-full p-3 mr-4 group-hover:bg-green-700 transition flex items-center justify-center min-w-[48px] h-12">
                    <UserGroupIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-xl mb-1">Experienced Team Members</h4>
                    <p className="text-gray-600">Professional crew with years of expertise</p>
                  </div>
                </div>
                
                <div className="flex items-start group">
                  <div className="bg-green-600 text-white rounded-full p-3 mr-4 group-hover:bg-green-700 transition flex items-center justify-center min-w-[48px] h-12">
                    <ChatBubbleLeftRightIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-xl mb-1">Fast, Reliable Communication</h4>
                    <p className="text-gray-600">Prompt updates, quick quotes, and we show up when we say we will</p>
                  </div>
                </div>
                
                <div className="flex items-start group">
                  <div className="bg-green-600 text-white rounded-full p-3 mr-4 group-hover:bg-green-700 transition flex items-center justify-center min-w-[48px] h-12">
                    <BoltIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-xl mb-1">Free Estimates</h4>
                    <p className="text-gray-600">Quick, no-obligation quotes within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>


      {/* Williamson College Partnership - FULL BLEED */}
      <section className="bg-white md:min-h-[500px]">
        <div className="grid md:grid-cols-2 h-full">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative h-[200px] md:h-auto md:min-h-[500px] bg-white flex items-center justify-center p-6 md:p-10 md:order-2"
          >
            <Image
              src="/logos/williamson.png"
              alt="Williamson College of Trades"
              width={400}
              height={250}
              className="object-contain w-auto h-auto max-w-[60%] max-h-[140px] md:max-w-[400px] md:max-h-[300px]"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex items-center p-6 py-10 md:p-12 lg:p-20 md:order-1"
          >
            <div>
              <h3 className="text-3xl md:text-4xl font-[impact] text-gray-900 mb-6">
                Proud Sponsors of Williamson College of Trades Career Fair
              </h3>
              <p className="text-gray-700 mb-8 leading-relaxed text-lg">
                Brighton Road Landscaping is committed to supporting the next generation of skilled 
                tradespeople. We're proud to sponsor the Williamson College of Trades Career Fair 
                and actively recruit talented individuals who share our passion for quality landscaping.
              </p>
              <Link href="/join">
                <button className="bg-green-700 hover:bg-green-600 text-white px-8 py-3 rounded-lg transition transform hover:scale-105 font-semibold shadow-lg">
                  Join Our Team
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bright Automations Partnership — mirrored: text left, full-teal logo panel right on desktop */}
      <section className="bg-white md:min-h-[500px]">
        <div className="grid md:grid-cols-2 h-full">
          {/* Teal logo panel — fills the whole slot edge-to-edge, fully clickable. First on mobile, left on desktop */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative h-[240px] md:h-auto md:min-h-[500px] bg-[#41808f] md:order-1 overflow-hidden"
          >
            <a
              href="https://www.brightautomations.org/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Bright Automations"
              className="group absolute inset-0 flex items-center justify-center p-8 md:p-12"
            >
              <Image
                src="/logos/bright-automations.png"
                alt="Bright Automations"
                width={520}
                height={162}
                className="object-contain w-auto h-auto max-w-[82%] md:max-w-[460px] max-h-[150px] md:max-h-[220px] transition-transform duration-500 group-hover:scale-105"
              />
            </a>
          </motion.div>

          {/* Text — second on mobile, right column on desktop */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex items-center p-6 py-10 md:p-12 lg:p-20 md:order-2"
          >
            <div>
              <h3 className="text-3xl md:text-4xl font-[impact] text-gray-900 mb-6">
                Proudly Partnered with Bright Automations
              </h3>
              <p className="text-gray-700 mb-8 leading-relaxed text-lg">
                Bright Automations is the software and automation partner behind Brighton Road Landscaping.
                They build and maintain the technology that powers this website and the systems running
                behind the scenes — so our team can stay focused on what we do best: your property.
                Bright Automations builds custom software and automation for local service businesses.
              </p>
              <a href="https://www.brightautomations.org/" target="_blank" rel="noopener noreferrer">
                <button className="bg-green-700 hover:bg-green-600 text-white px-8 py-3 rounded-lg transition transform hover:scale-105 font-semibold shadow-lg">
                  Visit Bright Automations
                </button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section - KEEP AS IS */}
      <section id="faq" className="bg-gray-100 py-12 md:py-20">
        <motion.div
          ref={faqRef}
          initial={{ opacity: 0, y: 50 }}
          animate={isFAQInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        >
          <FAQSection />
        </motion.div>
      </section>
      
      <Footer />
    </div>
  );
}