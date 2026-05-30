'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaGoogle } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 mb-8 text-center md:text-left">

          {/* Company Info WITHOUT Social Media */}
          <div>
            <h3 className="text-xl font-bold mb-3">Brighton Road Landscaping</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Brighton Road Landscaping is a full-service landscaping company serving residential and
              commercial clients across Montgomery County and the Main Line. From landscape design &amp;
              installation, hardscaping, and paver patios to property maintenance, drainage and French
              drains, and spring &amp; fall cleanups, our local crew delivers premium work built to last.
              We proudly serve Plymouth Meeting, Conshohocken, Blue Bell, King of Prussia, Audubon, Lafayette
              Hill, Fort Washington, Whitemarsh, Wayne, Bryn Mawr, Ardmore, Villanova, Radnor, Gladwyne,
              Devon, and Berwyn — bringing reliable, professional landscaping to every property we touch.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/" className="hover:text-white transition">Home</Link></li>
              <li><Link href="/services" className="hover:text-white transition">Services</Link></li>
              <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
              <li><Link href="/gallery" className="hover:text-white transition">Gallery</Link></li>
              <li><Link href="/join" className="hover:text-white transition">Join Our Team</Link></li>
              <li><Link href="/quote" className="hover:text-white transition">Get a Free Quote</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact Info WITH Social Media */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="text-sm text-gray-300 space-y-1 mb-4">
              <li>Phone: (484) 535-1936</li>
              <li>Email: brightonroadlandscaping@gmail.com</li>
              <li>Hours: Sun-Sun: 24/7</li>
            </ul>
            {/* Social Media Icons MOVED HERE */}
            <div className="flex justify-center md:justify-start space-x-4 mt-4">
              <a 
                href="https://www.facebook.com/BrightonRoadLandscaping" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500 transition"
              >
                <FaFacebookF size={20} />
              </a>
              <a 
                href="https://www.instagram.com/brightonroadlandscaping" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-500 transition"
              >
                <FaInstagram size={20} />
              </a>
              <a 
                href="https://g.page/brighton-road-landscaping" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-500 transition"
              >
                <FaGoogle size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Navigation Bar */}
        <div className="border-t border-gray-700 pt-6 pb-6">
          <div className="flex justify-center items-center space-x-6 text-sm">
            <Link href="/services" className="text-gray-400 hover:text-white transition">
              Services
            </Link>
            <span className="text-gray-600">|</span>
            <Link href="/quote" className="text-gray-400 hover:text-white transition">
              Get Quote
            </Link>
            <span className="text-gray-600">|</span>
            <Link href="/join" className="text-gray-400 hover:text-white transition">
              Apply Now
            </Link>
          </div>
        </div>

        {/* Partners */}
        <div className="text-center py-6 border-t border-gray-800">
          <h3 className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-widest">Partners</h3>
          <a
            href="https://www.brightautomations.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block transition hover:opacity-90 hover:scale-105"
            aria-label="Bright Automations"
          >
            <Image src="/logos/bright-automations.png" alt="Bright Automations" width={300} height={115} className="h-12 md:h-14 w-auto rounded-lg" />
          </a>
        </div>

        {/* Trusted Equipment — small */}
        <div className="text-center pb-6">
          <h3 className="text-[11px] font-semibold text-gray-500 mb-3 uppercase tracking-widest">Trusted Equipment</h3>
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-5">
            <Image src="/logos/cdi.png" alt="CDI" width={64} height={32} className="h-5 md:h-6 w-auto object-contain opacity-80" />
            <Image src="/logos/conshy-small-engine.png" alt="Conshohocken Small Engine" width={64} height={32} className="h-5 md:h-6 w-auto object-contain opacity-80" />
            <Image src="/logos/scag.png" alt="Scag" width={64} height={32} className="h-5 md:h-6 w-auto object-contain opacity-80" />
            <Image src="/logos/echo.png" alt="Echo" width={64} height={32} className="h-5 md:h-6 w-auto object-contain opacity-80" />
          </div>
        </div>

        {/* Service Areas */}
        <div className="text-center text-sm text-gray-400 py-4">
          <p className="font-semibold mb-2">Servicing:</p>
          <p>Plymouth Meeting • Conshohocken • Blue Bell • King of Prussia • Audubon • Fort Washington • Lafayette Hill • Whitemarsh • Wayne • Bryn Mawr • Ardmore • Villanova • Radnor • Gladwyne • Devon • Berwyn • The Main Line</p>
        </div>

        {/* Copyright */}
        <div className="text-center text-xs text-gray-500 border-t border-gray-700 pt-6 space-y-1.5">
          <p>© {new Date().getFullYear()} Brighton Road Landscaping LLC. All Rights Reserved. | Licensed &amp; Insured</p>
          <p>
            Website built &amp; managed by{' '}
            <a
              href="https://www.brightautomations.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white underline underline-offset-2 transition"
            >
              Bright Automations
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}