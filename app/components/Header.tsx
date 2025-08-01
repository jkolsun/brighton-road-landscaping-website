'use client';

import { useState } from 'react';
import Link from 'next/link';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';


export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="text-xs sm:text-lg px-6 py-3 bg-green-800 text-white rounded-md font-[Impact] tracking-widest">
            BRIGHTON ROAD LANDSCAPING
          </div>
          <div className="text-md sm:text-lg font-bold tracking-widest">
          
          </div>
        </Link>

        {/* Hamburger - mobile only */}
        <button
          className="sm:hidden text-green-800 text-3xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>

        {/* Nav - desktop */}
        <nav className="hidden sm:flex gap-8 items-center font-[Impact] font-bold tracking-wide text-lg">
          <Link href="/services" className="hover:text-green-700">Services</Link>
          <Link href="/about" className="hover:text-green-700">About Us</Link>
          <Link href="/testimonials" className="hover:text-green-700">Testimonials</Link>
          <Link href="/join" className="hover:text-green-700">Join Our Team</Link>
          <Link href="/contact" className="hover:text-green-700">Contact Us</Link>
          <Link href="#faq" className="text-xs bg-green-100 px-3 py-2 rounded-full hover:bg-green-200 transition">
            FAQs <QuestionMarkCircleIcon className="w-4 h-4 inline-block ml-1" />

          </Link>
          <Link href="/quote">
            <button className="bg-green-800 hover:bg-green-700 text-white px-4 py-2 rounded-md shadow">
              Free Quote
            </button>
          </Link>
        </nav>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="sm:hidden bg-white px-4 pb-4">
          <ul className="flex flex-col gap-4 text-gray-900 font-[Impact] font-semibold text-lg">
            <li><Link href="/services" onClick={() => setIsMenuOpen(false)}>Services</Link></li>
            <li><Link href="/about" onClick={() => setIsMenuOpen(false)}>About Us</Link></li>
            <li><Link href="/testimonials" onClick={() => setIsMenuOpen(false)}>Testimonials</Link></li>
            <li><Link href="/join" onClick={() => setIsMenuOpen(false)}>Join Our Team</Link></li>
            <a href="tel:+16102569844" className="hover:text-green-700">Call Us</a>
            <li><Link href="#faq" onClick={() => setIsMenuOpen(false)}>FAQs</Link></li>
            <li><Link href="/quote" onClick={() => setIsMenuOpen(false)} className="block w-full bg-green-800 hover:bg-green-700 text-white px-4 py-2 rounded-md shadow text-center">
              Free Quote
            </Link></li>
          </ul>
        </div>
      )}
    </header>
  );
}
