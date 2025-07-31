import '../styles/global.css'
import { Phone } from 'lucide-react'
import Link from 'next/link'
import Footer from '@/components/Footer'
import HelpCircle from 'lucide-react'
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline'

export const metadata = {
  title: 'Brighton Road Landscaping',
  description: 'Crafting Beautiful Outdoor Spaces',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="text-gray-800 min-h-screen">
        <nav className="sticky top-0 bg-white shadow-md z-50">
          <div className="max-w-7xl mx-auto px-0 py-4 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex gap-2">
              <div className="text-white hover:opacity-80 transition-opacity duration-200 cursor-pointer flex items-center">
              <div className="bg-green-800 px-6 py-3 text-center rounded-md">

                <div className="text-2xl leading-none font-[Impact] tracking-wide text-white">BRIGHTON ROAD</div>
                <div className="text-sm tracking-widest font-bold text-white">LANDSCAPING</div>

                </div>
              </div>
            </Link>

            {/* Nav Links */}
            <ul className="flex gap-10 text-lg font-bold uppercase tracking-wide text-gray-900">
            <li>
                <Link href="/services" className="font-[Impact] text-2xl tracking-wide hover:text-green-700 transition-colors duration-200">Services</Link>
              </li>
              <li>
                <Link href="/about" className="font-[Impact] text-2xl tracking-wide hover:text-green-700 transition-colors duration-200">About Us</Link>
              </li>
              <li>
                <Link href="/testimonials" className="font-[Impact] text-2xl tracking-wide hover:text-green-700 transition-colors duration-200">Testimonials</Link>
              </li>
              <li>
                <Link href="/join" className="font-[Impact] text-2xl tracking-wide hover:text-green-700 transition-colors duration-200">Join Our Team</Link>
              </li>
            </ul>

            {/* Right CTA */}
            <div className="flex items-center gap-4">
              <Link href="/quote">
                <button className="bg-green-800 hover:bg-green-700 text-white px-4 py-2 rounded font-semibold shadow">
                  Free Quote
                </button>
              </Link>

              {/* Mobile: Phone Dialer */}
              <a href="tel:4845351936" className="flex items-center gap-2 text-green-900 font-semibold hover:text-green-700 sm:hidden">
                <Phone size={16} />
                <span>Contact Us</span>
              </a>

              {/* Desktop: Contact Page */}
              <Link href="/contact" className="hidden sm:flex items-center gap-2 text-green-900 font-semibold hover:text-green-700">
                <Phone size={16} />
                <span>Contact Us</span>
              </Link>

              {/* FAQ Scroll Link */}
              <a
  href="#faq"
  className="flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-800 hover:bg-green-200 rounded-full text-sm font-semibold shadow-sm transition"
>
  <QuestionMarkCircleIcon className="w-4 h-4" />
  FAQs
</a>


            </div>
          </div>
        </nav>

        {/* Main Page Content */}
        <main>{children}</main>
      </body>
    </html>
  )
}





