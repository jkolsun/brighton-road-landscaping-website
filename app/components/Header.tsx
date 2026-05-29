'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';

const FB_URL = 'https://www.facebook.com/BrightonRoadLandscaping';
const IG_URL = 'https://www.instagram.com/brightonroadlandscaping/';

const NAV = [
  { label: 'Services', href: '/services' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'About', href: '/about' },
  { label: 'Reviews', href: '/testimonials' },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`sticky top-0 inset-x-0 z-50 bg-[#0b4228] shadow-xl transition-all duration-300 ${scrolled ? 'py-3' : 'py-5'}`}>
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
        <div className="md:hidden bg-[#0b4228]/98 backdrop-blur border-t border-white/10 px-6 py-5 mt-3">
          <nav className="flex flex-col items-center gap-3 font-[Impact] text-white text-2xl">
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
    </header>
  );
}
