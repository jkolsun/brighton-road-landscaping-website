'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import { PhoneIcon } from '@heroicons/react/24/outline';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-white/95 backdrop-blur-md shadow-lg'
        : 'bg-white shadow-md'
    }`}>
      <div className="flex justify-between items-center px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center py-2">
          <div className="relative w-[150px] md:w-[185px] h-20 md:h-24 overflow-hidden px-4 py-2">
            <Image
              src="/images/Official Logo 2027.JPG"
              alt="Brighton Road Landscaping"
              fill
              className="object-cover scale-85"
              priority
            />
          </div>
        </Link>

        {/* Phone icon mobile only */}
        <a href="tel:4845351936" className="md:hidden mx-2">
          <PhoneIcon className="h-7 w-7 text-green-700" />
        </a>

        {/* Hamburger - mobile only */}
        <button
          className="md:hidden text-green-800 text-3xl mr-2 relative w-8 h-8 flex items-center justify-center"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <span className={`block absolute h-0.5 w-6 bg-green-800 transition-all duration-300 ${isMenuOpen ? 'rotate-45' : '-translate-y-2'}`}></span>
          <span className={`block absolute h-0.5 w-6 bg-green-800 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
          <span className={`block absolute h-0.5 w-6 bg-green-800 transition-all duration-300 ${isMenuOpen ? '-rotate-45' : 'translate-y-2'}`}></span>
        </button>

       {/* Nav - desktop */}
<nav className="hidden md:flex flex-1 justify-center gap-4 lg:gap-6 items-center font-[Impact] font-bold tracking-wide">
  <Link href="/services" className="text-xl lg:text-2xl hover:text-green-700 transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-green-700 after:transition-all after:duration-300 hover:after:w-full">
    Services
  </Link>
  <Link href="/gallery" className="text-xl lg:text-2xl hover:text-green-700 transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-green-700 after:transition-all after:duration-300 hover:after:w-full">
    Gallery
  </Link>
  <Link href="/about" className="text-xl lg:text-2xl hover:text-green-700 transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-green-700 after:transition-all after:duration-300 hover:after:w-full">
    About Us
  </Link>
  <Link href="/testimonials" className="text-xl lg:text-2xl hover:text-green-700 transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-green-700 after:transition-all after:duration-300 hover:after:w-full">
    Testimonials
  </Link>
  <Link href="/join" className="text-xl lg:text-2xl hover:text-green-700 transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-green-700 after:transition-all after:duration-300 hover:after:w-full">
    Join Our Team
  </Link>
  <Link href="/contact" className="text-xl lg:text-2xl hover:text-green-700 transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-green-700 after:transition-all after:duration-300 hover:after:w-full">
    Contact Us
  </Link>
  <Link href="/#faq" className="text-base bg-green-100 px-4 py-2 rounded-full hover:bg-green-200 transition flex items-center gap-1">
    FAQs <QuestionMarkCircleIcon className="w-5 h-5" />
  </Link>
  <Link href="/quote">
    <button className="bg-green-700 hover:bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg font-semibold text-xl transition-all transform hover:scale-105 hover:shadow-xl">
      Get a Quote
    </button>
  </Link>
</nav>
</div>

      {/* Mobile Nav - Slide-in overlay */}
      <div className={`md:hidden fixed inset-0 top-0 z-[60] transition-all duration-300 ${
        isMenuOpen ? 'visible' : 'invisible'
      }`}>
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
            isMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Menu panel */}
        <div className={`absolute right-0 top-0 h-full w-[280px] bg-white shadow-2xl transition-transform duration-300 ease-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="flex justify-end p-6">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="w-8 h-8 flex items-center justify-center"
              aria-label="Close menu"
            >
              <span className="block absolute h-0.5 w-6 bg-green-800 rotate-45"></span>
              <span className="block absolute h-0.5 w-6 bg-green-800 -rotate-45"></span>
            </button>
          </div>

          <nav className="px-6 pt-2">
            <ul className="flex flex-col gap-1 text-gray-900 font-[Impact] font-semibold text-lg">
              {[
                { href: '/services', label: 'Services' },
                { href: '/gallery', label: 'Gallery' },
                { href: '/about', label: 'About Us' },
                { href: '/testimonials', label: 'Testimonials' },
                { href: '/join', label: 'Join Our Team' },
                { href: '/contact', label: 'Contact Us' },
                { href: '/#faq', label: 'FAQs' },
              ].map((item, i) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block py-3 px-4 rounded-lg hover:bg-green-50 transition-colors ${
                      isMenuOpen ? 'animate-fade-in' : ''
                    }`}
                    style={{ animationDelay: `${i * 50}ms` }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="mt-2">
                <a
                  href="tel:+14845351936"
                  className="block py-3 px-4 rounded-lg hover:bg-green-50 transition-colors text-green-700"
                >
                  Call Us
                </a>
              </li>
              <li className="mt-4">
                <Link
                  href="/quote"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full bg-green-700 hover:bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg text-center transition-colors"
                >
                  Get a Quote
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
