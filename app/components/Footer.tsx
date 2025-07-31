'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Company Info */}
        <div>
          <h3 className="text-xl font-bold mb-4">Brighton Road Landscaping</h3>
          <p className="text-gray-400 text-sm">
            Serving the community with quality lawn care and landscaping services. Reliable, professional, and local.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link href="/" className="hover:underline">Home</Link></li>
            <li><Link href="/services" className="hover:underline">Services</Link></li>
            <li><Link href="/about" className="hover:underline">About Us</Link></li>
            <li><Link href="/join" className="hover:underline">Join Our Team</Link></li>
            <li><Link href="/quote" className="hover:underline">Get a Free Quote</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Contact</h4>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>Phone: (484) 535-1936</li>
            <li>Email: info@brightonroadlandscaping.com</li>
            <li>Hours: Mon–Sat: 8am–8pm</li>
          </ul>
        </div>
      </div>

      {/* Partner Logos */}
      <div className="mt-12 text-center">
        <h3 className="text-sm font-semibold text-gray-400 mb-4">Our Trusted Equipment & Partners</h3>
        <div className="flex flex-wrap justify-center items-center gap-6">
          <Image src="/logos/cdi.png" alt="CDI" className="h-10 w-auto" width={80} height={40} />
          <Image src="/logos/conshy-small-engine.png" alt="Conshohocken Small Engine" className="h-10 w-auto" width={80} height={40} />
          <Image src="/logos/scag.png" alt="Scag" className="h-10 w-auto" width={80} height={40} />
          <Image src="/logos/exmark.png" alt="Exmark" className="h-10 w-auto" width={80} height={40} />
          <Image src="/logos/echo.png" alt="Echo" className="h-10 w-auto" width={80} height={40} />
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center text-sm text-gray-500 mt-10 border-t border-gray-700 pt-6">
        &copy; {new Date().getFullYear()} Brighton Road Landscaping. All rights reserved.
      </div>
    </footer>
  );
}

