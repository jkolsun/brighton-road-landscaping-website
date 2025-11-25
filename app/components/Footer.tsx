'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaGoogle } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-8">
          
          {/* Company Info with Social Media */}
          <div>
            <h3 className="text-xl font-bold mb-4">Brighton Road Landscaping</h3>
            <p className="text-gray-400 text-sm mb-4">
              Servicing Montgomery County with top of the line lawn care and landscaping services. 
              Our commercial and residential clients can count on us for the design and installation 
              of landscapes and hardscapes that are beautiful, functional, and guaranteed to stand 
              the test of time. Brighton Road Landscaping also promises to provide quality, reliable 
              maintenance of our clients' lawn and landscapes throughout Plymouth Meeting and the 
              surrounding areas.
            </p>
            {/* Social Media Icons */}
            <div className="flex space-x-4 mt-4">
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

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/" className="hover:text-white transition">Home</Link></li>
              <li><Link href="/services" className="hover:text-white transition">Services</Link></li>
              <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
              <li><Link href="/join" className="hover:text-white transition">Join Our Team</Link></li>
              <li><Link href="/quote" className="hover:text-white transition">Get a Free Quote</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>Phone: (484) 535-1936</li>
              <li>Email: brightonroadlandscaping@gmail.com</li>
              <li>Hours: Sun-Sun: 24/7</li>
            </ul>
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

        {/* Partner Logos */}
        <div className="text-center py-6">
          <h3 className="text-sm font-semibold text-gray-400 mb-4">Our Trusted Equipment & Partners</h3>
          <div className="flex flex-wrap justify-center items-center gap-6">
            <Image src="/logos/cdi.png" alt="CDI" width={80} height={40} />
            <Image src="/logos/conshy-small-engine.png" alt="Conshohocken Small Engine" width={80} height={40} />
            <Image src="/logos/scag.png" alt="Scag" width={80} height={40} />
            <Image src="/logos/williamson.png" alt="Williamson" width={80} height={40} />
            <Image src="/logos/echo.png" alt="Echo" width={80} height={40} />
          </div>
        </div>

        {/* Service Areas */}
        <div className="text-center text-sm text-gray-400 py-4">
          <p className="font-semibold mb-2">Servicing:</p>
          <p>Plymouth Meeting • Conshohocken • Blue Bell • King of Prussia • Audubon • Fort Washington • Lafayette Hill • Whitemarsh</p>
        </div>

        {/* Copyright */}
        <div className="text-center text-xs text-gray-500 border-t border-gray-700 pt-6">
          <p>© {new Date().getFullYear()} Brighton Road Landscaping LLC. All Rights Reserved. | Licensed & Insured</p>
        </div>
      </div>
    </footer>
  );
}