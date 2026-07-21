'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/Footer'
import { CheckCircleIcon, ArrowRightIcon } from '@heroicons/react/24/solid'

// ————————————————————————————————————————————————————————————————
// Winter Edition — Commercial Snow Removal
// A hidden-gem seasonal page: same Brighton Road brand, dressed for
// a calm winter evening. All effects are CSS-only (no JS loops, no
// canvas) and fully deterministic (no Math.random in render).
// ————————————————————————————————————————————————————————————————

const FEATURES = [
  {
    title: 'Snow Plowing',
    desc: 'Parking lots and drive lanes plowed clean, storm after storm.',
  },
  {
    title: 'Salting & De-icing',
    desc: 'Pavement treated so it stays safe underfoot and under tire.',
  },
  {
    title: 'Sidewalk Clearing',
    desc: 'Walkways and entrances cleared for everyone who depends on them.',
  },
  {
    title: 'Parking Lot Service',
    desc: 'Complete lot care — plowed, treated, and open for business.',
  },
]

const CLIENT_TYPES = [
  {
    title: 'HOA Communities',
    desc: 'Shared drives, sidewalks, and common areas kept clear for residents.',
  },
  {
    title: 'Office Parks',
    desc: 'Lots and entrances ready before the workday starts.',
  },
  {
    title: 'Retail Centers',
    desc: 'Clear parking and safe storefront walkways for your customers.',
  },
  {
    title: 'Commercial Properties',
    desc: 'A winter plan shaped around your property and its traffic.',
  },
]

// Christmas-light bulbs along a sagging wire (SVG path below matches these
// positions — precomputed along the two quadratic curves, never random).
const BULB_COLORS = [
  { bg: '#ffcf7d', glow: 'rgba(255, 190, 90, 0.85)' }, // warm amber
  { bg: '#ff8a7a', glow: 'rgba(255, 110, 90, 0.7)' }, // soft red
  { bg: '#9fd0b6', glow: 'rgba(120, 220, 160, 0.7)' }, // brand pine mint
  { bg: '#ffe9ad', glow: 'rgba(255, 225, 150, 0.85)' }, // warm white
]

const BULBS: { left: string; top: number }[] = [
  { left: '3.1%', top: 17 },
  { left: '9.4%', top: 26 },
  { left: '15.6%', top: 32 },
  { left: '21.9%', top: 35 },
  { left: '28.1%', top: 36 },
  { left: '34.4%', top: 34 },
  { left: '40.6%', top: 29 },
  { left: '46.9%', top: 21 },
  { left: '53.1%', top: 21 },
  { left: '59.4%', top: 29 },
  { left: '65.6%', top: 35 },
  { left: '71.9%', top: 37 },
  { left: '78.1%', top: 36 },
  { left: '84.4%', top: 33 },
  { left: '90.6%', top: 27 },
  { left: '96.9%', top: 18 },
]

const winterStyles = `
/* —— falling snow: 3 parallax layers, transform-only, seamless loop —— */
.brl-snow { position: fixed; inset: 0; z-index: 40; pointer-events: none; overflow: hidden; }
.brl-snow-layer { position: absolute; left: -60px; right: -60px; bottom: 0; background-repeat: repeat; will-change: transform; }
.brl-snow-a {
  top: -420px; opacity: 0.85; background-size: 420px 420px;
  background-image:
    radial-gradient(3px 3px at 32px 48px, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.35) 60%, transparent 100%),
    radial-gradient(3.5px 3.5px at 152px 12px, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.3) 60%, transparent 100%),
    radial-gradient(3px 3px at 240px 130px, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.35) 60%, transparent 100%),
    radial-gradient(3.5px 3.5px at 340px 74px, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.3) 60%, transparent 100%),
    radial-gradient(3px 3px at 60px 260px, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.35) 60%, transparent 100%),
    radial-gradient(3px 3px at 190px 330px, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.3) 60%, transparent 100%),
    radial-gradient(3.5px 3.5px at 300px 250px, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.35) 60%, transparent 100%),
    radial-gradient(3px 3px at 396px 360px, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.3) 60%, transparent 100%);
  animation: brl-fall-a 11s linear infinite;
}
.brl-snow-b {
  top: -560px; opacity: 0.55; background-size: 560px 560px;
  background-image:
    radial-gradient(2.5px 2.5px at 40px 60px, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.3) 60%, transparent 100%),
    radial-gradient(2.5px 2.5px at 180px 140px, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.3) 60%, transparent 100%),
    radial-gradient(2.5px 2.5px at 320px 40px, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.3) 60%, transparent 100%),
    radial-gradient(2.5px 2.5px at 460px 200px, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.3) 60%, transparent 100%),
    radial-gradient(2.5px 2.5px at 100px 320px, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.3) 60%, transparent 100%),
    radial-gradient(2.5px 2.5px at 260px 420px, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.3) 60%, transparent 100%),
    radial-gradient(2.5px 2.5px at 420px 500px, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.3) 60%, transparent 100%),
    radial-gradient(2.5px 2.5px at 540px 300px, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.3) 60%, transparent 100%),
    radial-gradient(2.5px 2.5px at 60px 480px, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.3) 60%, transparent 100%);
  animation: brl-fall-b 17s linear infinite;
}
.brl-snow-c {
  top: -700px; opacity: 0.35; background-size: 700px 700px;
  background-image:
    radial-gradient(2px 2px at 70px 90px, rgba(255,255,255,0.85) 0%, transparent 100%),
    radial-gradient(2px 2px at 210px 240px, rgba(255,255,255,0.8) 0%, transparent 100%),
    radial-gradient(2px 2px at 380px 60px, rgba(255,255,255,0.85) 0%, transparent 100%),
    radial-gradient(2px 2px at 520px 320px, rgba(255,255,255,0.8) 0%, transparent 100%),
    radial-gradient(2px 2px at 650px 180px, rgba(255,255,255,0.85) 0%, transparent 100%),
    radial-gradient(2px 2px at 140px 480px, rgba(255,255,255,0.8) 0%, transparent 100%),
    radial-gradient(2px 2px at 300px 600px, rgba(255,255,255,0.85) 0%, transparent 100%),
    radial-gradient(2px 2px at 480px 560px, rgba(255,255,255,0.8) 0%, transparent 100%),
    radial-gradient(2px 2px at 620px 660px, rgba(255,255,255,0.85) 0%, transparent 100%);
  animation: brl-fall-c 26s linear infinite;
}
/* Y progresses linearly by exactly one background tile per loop (seamless);
   X sways gently and returns to 0 so the loop never snaps. */
@keyframes brl-fall-a {
  0%   { transform: translate3d(0, 0, 0); }
  25%  { transform: translate3d(14px, 105px, 0); }
  50%  { transform: translate3d(-8px, 210px, 0); }
  75%  { transform: translate3d(10px, 315px, 0); }
  100% { transform: translate3d(0, 420px, 0); }
}
@keyframes brl-fall-b {
  0%   { transform: translate3d(0, 0, 0); }
  25%  { transform: translate3d(-12px, 140px, 0); }
  50%  { transform: translate3d(8px, 280px, 0); }
  75%  { transform: translate3d(-10px, 420px, 0); }
  100% { transform: translate3d(0, 560px, 0); }
}
@keyframes brl-fall-c {
  0%   { transform: translate3d(0, 0, 0); }
  25%  { transform: translate3d(9px, 175px, 0); }
  50%  { transform: translate3d(-6px, 350px, 0); }
  75%  { transform: translate3d(8px, 525px, 0); }
  100% { transform: translate3d(0, 700px, 0); }
}

/* —— christmas-light bulbs: gentle staggered twinkle —— */
.brl-bulb { animation: brl-twinkle 2.6s ease-in-out infinite; }
@keyframes brl-twinkle {
  0%, 100% { opacity: 1; }
  50%      { opacity: 0.45; }
}

/* —— warm glow on the CTA buttons —— */
.brl-cta-glow {
  box-shadow: 0 0 0 1px rgba(255,255,255,0.15), 0 8px 30px rgba(0,0,0,0.35), 0 0 26px rgba(255,184,90,0.3);
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}
.brl-cta-glow:hover {
  box-shadow: 0 0 0 1px rgba(255,255,255,0.25), 0 8px 30px rgba(0,0,0,0.35), 0 0 44px rgba(255,184,90,0.55);
}

@media (prefers-reduced-motion: reduce) {
  .brl-snow-layer, .brl-bulb { animation: none !important; }
}
`

export default function CommercialSnowRemovalPage() {
  return (
    <>
      <style>{winterStyles}</style>

      {/* Falling snow over the whole page — decorative, never interactive */}
      <div className="brl-snow" aria-hidden="true">
        <div className="brl-snow-layer brl-snow-c" />
        <div className="brl-snow-layer brl-snow-b" />
        <div className="brl-snow-layer brl-snow-a" />
      </div>

      {/* ——— Hero: winter evening over the snow photo ——— */}
      <section className="relative overflow-hidden bg-[#08131f]">
        <div className="absolute inset-0">
          <Image
            src="/images/snow.jpg"
            alt="Fresh snowfall on a commercial property"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#071120]/85 via-[#0a1c30]/65 to-[#06101c]/90" />
        </div>

        <motion.div
          className="relative z-10 max-w-5xl mx-auto px-6 pt-32 pb-48 md:pt-44 md:pb-60 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <p className="text-amber-300 font-semibold uppercase tracking-[0.32em] text-xs md:text-sm mb-5 drop-shadow">
            <span aria-hidden="true">❄ </span>Winter Edition<span aria-hidden="true"> ❄</span>
          </p>
          <h1 className="text-5xl md:text-7xl font-[impact] text-white tracking-wide mb-6 drop-shadow-2xl">
            COMMERCIAL SNOW REMOVAL
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-light max-w-3xl mx-auto drop-shadow-lg">
            The same Brighton Road crew that cares for your grounds all season —
            now keeping your parking lots, sidewalks, and entrances clear and
            safe all winter.
          </p>
          <div className="mt-10 flex justify-center">
            <Link href="/quote">
              <button className="brl-cta-glow bg-green-600 hover:bg-green-500 text-white px-8 py-4 rounded-xl font-semibold text-lg md:text-xl inline-flex items-center gap-2 transform hover:scale-105">
                Get a Snow Removal Quote
                <ArrowRightIcon className="w-5 h-5" aria-hidden="true" />
              </button>
            </Link>
          </div>
        </motion.div>

        {/* String of warm lights sagging along the bottom of the hero */}
        <div
          className="pointer-events-none select-none absolute inset-x-0 bottom-[44px] md:bottom-[62px] h-[70px] z-10"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 1200 70"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full"
          >
            <path
              d="M0,12 Q300,58 600,16 Q900,60 1200,12"
              stroke="#14304a"
              strokeWidth="2"
              fill="none"
              vectorEffect="non-scaling-stroke"
              opacity="0.9"
            />
          </svg>
          {BULBS.map((b, i) => {
            const c = BULB_COLORS[i % BULB_COLORS.length]
            return (
              <span
                key={i}
                className={`brl-bulb absolute w-2.5 h-2.5 rounded-full -translate-x-1/2 ${i % 2 === 1 ? 'hidden sm:block' : ''}`}
                style={{
                  left: b.left,
                  top: b.top,
                  backgroundColor: c.bg,
                  boxShadow: `0 0 6px 1px ${c.glow}, 0 0 16px 3px ${c.glow}`,
                  animationDelay: `${(i % 5) * 0.4}s`,
                  animationDuration: `${2.2 + (i % 3) * 0.5}s`,
                }}
              />
            )
          })}
        </div>

        {/* Snow-drift curve into the first section */}
        <svg
          viewBox="0 0 1440 90"
          preserveAspectRatio="none"
          className="absolute bottom-0 inset-x-0 w-full h-[48px] md:h-[68px] z-10"
          aria-hidden="true"
        >
          <path
            d="M0,90 L0,58 C180,26 360,74 560,52 C760,30 900,72 1100,50 C1240,36 1360,52 1440,34 L1440,90 Z"
            fill="#f6f9fc"
          />
        </svg>
      </section>

      {/* ——— Section 1: the service (frosty white) ——— */}
      <section className="bg-[#f6f9fc] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 md:gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-[impact] text-gray-900 mb-6">
              Plowed, Treated, and Open for Business
            </h2>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              Brighton Road Landscaping provides commercial snow plowing,
              salting and de-icing, and sidewalk and walkway clearing for
              parking lots and commercial properties. When the snow starts, our
              crew clears your lot, treats your pavement, and opens your
              walkways — so your property stays safe and accessible for
              everyone who depends on it.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl border border-[#e3ecf4] shadow-[0_10px_30px_-12px_rgba(13,42,72,0.18)] p-6"
              >
                <CheckCircleIcon className="w-7 h-7 text-green-700 mb-3" aria-hidden="true" />
                <h3 className="font-bold text-gray-900 text-lg mb-1">{f.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ——— Section 2: who it is for (deep evening navy, frosted cards) ——— */}
      <section className="relative bg-[#0d1b2b] py-16 md:py-24 overflow-hidden">
        <div
          className="absolute -top-24 left-1/4 w-[480px] h-[480px] rounded-full bg-green-500/10 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-32 right-[12%] w-[420px] h-[420px] rounded-full bg-amber-400/10 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative max-w-6xl mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-amber-300/90 uppercase tracking-[0.3em] text-xs font-semibold mb-3">
              <span aria-hidden="true">❄ </span>Who We Serve
            </p>
            <h2 className="text-3xl md:text-4xl font-[impact] text-white">
              Built for Commercial Properties
            </h2>
            <p className="text-[#b9cbdc] text-lg mt-4 max-w-3xl mx-auto leading-relaxed">
              We serve HOA communities, office parks, retail centers, and
              commercial properties throughout Montgomery County — the same
              commercial clients we care for during the growing season.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {CLIENT_TYPES.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                viewport={{ once: true }}
                className="bg-white/[0.07] backdrop-blur border border-white/10 rounded-2xl p-6"
              >
                <span className="text-2xl text-[#bfe3ff] block mb-3" aria-hidden="true">
                  ❄
                </span>
                <h3 className="font-bold text-white text-lg mb-1">{c.title}</h3>
                <p className="text-[#a9bccd] text-sm leading-relaxed">{c.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.p
            className="text-center text-[#b9cbdc] text-lg mt-10 leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Seasonal contracts and per-storm service available —{' '}
            <Link
              href="/contact"
              className="text-amber-300 hover:text-amber-200 underline underline-offset-4 transition"
            >
              contact us
            </Link>{' '}
            to build a plan for your property.
          </motion.p>
        </div>
      </section>

      {/* ——— Section 3: why Brighton Road (frosty white) ——— */}
      <section className="bg-white py-16 md:py-24">
        <motion.div
          className="max-w-3xl mx-auto px-6 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-[impact] text-gray-900 mb-6">
            The Same Family Crew, All Winter Long
          </h2>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
            Brighton Road Landscaping is the same local, family crew our
            clients trust with their landscaping — now keeping their
            properties safe and open all winter. When the season turns,
            nothing else changes: the people, the standards, and the pride in
            a job done right stay exactly the same.
          </p>
          <ul className="inline-flex flex-col items-start gap-3 text-left">
            {[
              'One local crew for your property, season after season',
              'Based in Plymouth Meeting — we work where we live',
              'The winter side of the landscaping service you already trust',
            ].map((line) => (
              <li key={line} className="flex items-start gap-3">
                <span className="text-green-700 mt-0.5" aria-hidden="true">
                  ❄
                </span>
                <span className="text-gray-700 text-lg">{line}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </section>

      {/* ——— Service-area band ——— */}
      <section className="bg-gradient-to-br from-green-50 to-white py-16">
        <motion.div
          className="max-w-4xl mx-auto px-6 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-[impact] text-gray-900 mb-6">
            Serving Montgomery County, PA — All Winter
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            From our home base in Plymouth Meeting, PA, we provide commercial
            snow removal throughout Conshohocken, Blue Bell, King of Prussia,
            Lafayette Hill, Fort Washington, and the greater Montgomery County
            area. Our crews live and work in the same communities we serve —
            and we treat every property like our own, in every season.
          </p>
        </motion.div>
      </section>

      {/* ——— CTA: deep pine, warm glow ——— */}
      <section className="relative bg-gradient-to-br from-green-800 to-green-900 py-16 md:py-24 overflow-hidden">
        <div
          className="absolute -top-20 right-1/4 w-[420px] h-[420px] rounded-full bg-amber-400/10 blur-3xl"
          aria-hidden="true"
        />
        <motion.div
          className="relative max-w-3xl mx-auto px-6 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-amber-300/90 uppercase tracking-[0.3em] text-xs font-semibold mb-4">
            <span aria-hidden="true">❄ </span>Winter Is Coming
          </p>
          <h2 className="text-3xl md:text-5xl font-[impact] text-white mb-6">
            Ready Before the First Storm
          </h2>
          <p className="text-green-100 text-lg md:text-xl leading-relaxed mb-10">
            Tell us about your property and we will build a snow plan that
            fits it — seasonal contract or per-storm.
          </p>
          <Link href="/quote">
            <button className="brl-cta-glow bg-amber-400 hover:bg-amber-300 text-green-900 px-10 py-5 rounded-xl font-bold text-lg md:text-xl inline-flex items-center gap-2 transform hover:scale-105">
              Get a Snow Removal Quote
              <ArrowRightIcon className="w-5 h-5" aria-hidden="true" />
            </button>
          </Link>
        </motion.div>
      </section>

      <Footer />
    </>
  )
}
