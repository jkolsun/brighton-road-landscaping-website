"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Footer from '@/components/Footer';
import { StarIcon } from '@heroicons/react/24/solid';
import { REVIEWS } from '@/data/reviews';

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

const initials = (name: string) =>
  name.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase();

export default function TestimonialsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-green-800 to-green-700 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <motion.div
          className="relative z-10 max-w-3xl mx-auto px-6 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-7xl font-[impact] text-white mb-6 tracking-wide">
            CLIENT REVIEWS
          </h1>
          <p className="text-lg md:text-2xl text-white/90">
            Don&apos;t just take our word for it — here&apos;s what our clients say about Brighton Road Landscaping.
          </p>
          <div className="mt-8 inline-flex items-center gap-3 bg-white rounded-full px-5 py-3 shadow-lg">
            <GoogleG className="w-7 h-7" />
            <span className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className="w-5 h-5 text-yellow-400" />
              ))}
            </span>
            <span className="font-bold text-gray-900">5.0 on Google</span>
          </div>
        </motion.div>
      </section>

      {/* Reviews — masonry columns so varying lengths stay tidy */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
            {REVIEWS.map((r, i) => (
              <motion.div
                key={r.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
                viewport={{ once: true }}
                className="mb-6 break-inside-avoid bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow border border-gray-100 p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-700 text-white flex items-center justify-center font-bold text-sm">
                      {initials(r.name)}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 leading-tight">{r.name}</p>
                      <div className="flex gap-0.5 text-yellow-400 text-sm">
                        {[...Array(5)].map((_, idx) => (<span key={idx}>★</span>))}
                      </div>
                    </div>
                  </div>
                  <GoogleG className="w-5 h-5 shrink-0" />
                </div>
                <p className="text-gray-700 leading-relaxed">{r.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-green-700 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: '100+', label: 'Happy Customers' },
              { num: '5.0', label: 'Google Rating' },
              { num: '5+', label: 'Years of Service' },
              { num: '100%', label: 'Satisfaction' },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <p className="text-5xl font-[impact] text-white">{s.num}</p>
                <p className="text-white/80 mt-2">{s.label}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/quote">
              <button className="bg-white text-green-800 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg shadow-lg transition transform hover:scale-105">
                Get Your Free Quote
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
