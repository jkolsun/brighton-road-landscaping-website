'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import { PhoneIcon } from '@heroicons/react/24/outline';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 bg-white shadow-md z-50">
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
          className="md:hidden text-green-800 text-3xl mr-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>

       {/* Nav - desktop - BIGGER TEXT AND CENTERED */}
<nav className="hidden md:flex flex-1 justify-center gap-4 lg:gap-6 items-center font-[Impact] font-bold tracking-wide">
  <Link href="/services" className="text-xl lg:text-2xl hover:text-green-700 transition-colors">
    Services
  </Link>
  <Link href="/about" className="text-xl lg:text-2xl hover:text-green-700 transition-colors">
    About Us
  </Link>
  <Link href="/testimonials" className="text-xl lg:text-2xl hover:text-green-700 transition-colors">
    Testimonials
  </Link>
  <Link href="/join" className="text-xl lg:text-2xl hover:text-green-700 transition-colors">
    Join Our Team
  </Link>
  <Link href="/contact" className="text-xl lg:text-2xl hover:text-green-700 transition-colors">
    Contact Us
  </Link>
  <Link href="#faq" className="text-base bg-green-100 px-4 py-2 rounded-full hover:bg-green-200 transition flex items-center gap-1">
    FAQs <QuestionMarkCircleIcon className="w-5 h-5" />
  </Link>
  <Link href="/quote">
    <button className="bg-green-700 hover:bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg font-semibold text-xl transition-all transform hover:scale-105">
      Free Quote
    </button>
  </Link>
</nav>
</div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden bg-white px-4 pb-4">
          <ul className="flex flex-col gap-4 text-gray-900 font-[Impact] font-semibold text-lg">
            <li><Link href="/services" onClick={() => setIsMenuOpen(false)}>Services</Link></li>
            <li><Link href="/about" onClick={() => setIsMenuOpen(false)}>About Us</Link></li>
            <li><Link href="/testimonials" onClick={() => setIsMenuOpen(false)}>Testimonials</Link></li>
            <li><Link href="/join" onClick={() => setIsMenuOpen(false)}>Join Our Team</Link></li>
            <a href="tel:+14845351936" className="hover:text-green-700">Call Us</a>
            <li><Link href="#faq" onClick={() => setIsMenuOpen(false)}>FAQs</Link></li>
            <li><Link href="/quote" onClick={() => setIsMenuOpen(false)} className="block w-full bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded-md shadow text-center">
              Free Quote
            </Link></li>
          </ul>
        </div>
      )}
    </header>
  );
}