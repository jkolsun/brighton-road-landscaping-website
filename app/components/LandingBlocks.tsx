// Server-rendered building blocks for the town and fall cleanup landing pages.
// Same look as the service pages (green hero, Impact headings, green CTA), but no
// framer-motion, so every word is in the HTML Google reads.
import Image from 'next/image'
import Link from 'next/link'
import { CheckCircleIcon, ArrowRightIcon } from '@heroicons/react/24/solid'
import { PHONE, PHONE_TEL } from '@/lib/areas'

export function Hero({ title, subtitle, image }: { title: string; subtitle: string; image: string }) {
  return (
    <section className="relative bg-gradient-to-r from-green-800 to-green-700 py-28 md:py-32">
      <div className="absolute inset-0">
        <Image src={image} alt="" fill priority className="object-cover opacity-20" />
      </div>
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-[impact] text-white mb-6 tracking-wide">{title}</h1>
        <p className="text-xl md:text-2xl text-white/90 font-light">{subtitle}</p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/quote" className="bg-white text-green-800 hover:bg-green-50 px-8 py-4 rounded-lg font-semibold text-lg shadow-lg inline-flex items-center justify-center gap-2">
            Get a Free Quote <ArrowRightIcon className="w-5 h-5" />
          </Link>
          <a href={`tel:${PHONE_TEL}`} className="border-2 border-white/80 text-white hover:bg-white/10 px-8 py-4 rounded-lg font-semibold text-lg inline-flex items-center justify-center">
            Call {PHONE}
          </a>
        </div>
      </div>
    </section>
  )
}

export function Split({ title, children, image, imageAlt, gray, flip }: { title: string; children: React.ReactNode; image: string; imageAlt: string; gray?: boolean; flip?: boolean }) {
  return (
    <section className={gray ? 'bg-gray-50' : 'bg-white'}>
      <div className="grid md:grid-cols-2">
        <div className={`flex items-center p-8 md:p-12 lg:p-20 ${flip ? 'md:order-2' : ''}`}>
          <div>
            <h2 className="text-3xl md:text-4xl font-[impact] text-gray-900 mb-6">{title}</h2>
            <div className="text-lg md:text-xl text-gray-700 leading-relaxed space-y-4">{children}</div>
          </div>
        </div>
        <div className={`relative min-h-[320px] md:min-h-[520px] ${flip ? '' : 'md:order-2'}`}>
          <Image src={image} alt={imageAlt} fill className="object-cover" sizes="(min-width: 768px) 50vw, 100vw" />
        </div>
      </div>
    </section>
  )
}

export function Checklist({ items }: { items: string[] }) {
  return (
    <ul className="grid sm:grid-cols-2 gap-3 mt-2">
      {items.map((it) => (
        <li key={it} className="flex items-start gap-2">
          <CheckCircleIcon className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
          <span className="text-gray-700 text-base md:text-lg">{it}</span>
        </li>
      ))}
    </ul>
  )
}

export function ProjectCards({ heading, projects }: { heading: string; projects: { href: string; title: string; text: string; image: string }[] }) {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-[impact] text-gray-900 mb-10 text-center">{heading}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((p) => (
            <Link key={p.href} href={p.href} className="group block rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition bg-white">
              <div className="relative h-56">
                <Image src={p.image} alt={p.title} fill className="object-cover group-hover:scale-105 transition duration-500" sizes="(min-width: 768px) 33vw, 100vw" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-[impact] text-gray-900 mb-3">{p.title}</h3>
                <p className="text-gray-700 leading-relaxed">{p.text}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-green-700 font-semibold">See this service <ArrowRightIcon className="w-4 h-4" /></span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Faq({ heading, items }: { heading: string; items: { q: string; a: string }[] }) {
  return (
    <section className="bg-gray-50 py-16 md:py-20">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-[impact] text-gray-900 mb-8 text-center">{heading}</h2>
        <div className="space-y-4">
          {items.map((f) => (
            <details key={f.q} className="bg-white rounded-lg shadow p-5 group">
              <summary className="cursor-pointer font-semibold text-lg text-gray-900 list-none flex justify-between items-center gap-4">
                {f.q}<span className="text-green-700 text-2xl leading-none group-open:rotate-45 transition">+</span>
              </summary>
              <p className="mt-3 text-gray-700 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

export function AreaLinks({ heading, links }: { heading: string; links: { href: string; label: string }[] }) {
  return (
    <section className="bg-gradient-to-br from-green-50 to-white py-14">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-[impact] text-gray-900 mb-6">{heading}</h2>
        <div className="flex flex-wrap justify-center gap-3">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="px-4 py-2 rounded-full bg-white border border-green-200 text-green-800 hover:bg-green-700 hover:text-white transition font-medium">
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export function CtaBand({ title, text }: { title: string; text: string }) {
  return (
    <section className="bg-gradient-to-r from-green-800 to-green-700 py-16">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-[impact] text-white mb-4">{title}</h2>
        <p className="text-lg md:text-xl text-white/90 mb-8">{text}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/quote" className="bg-white text-green-800 hover:bg-green-50 px-8 py-4 rounded-lg font-semibold text-lg shadow-lg inline-flex items-center justify-center gap-2">
            Get a Free Quote <ArrowRightIcon className="w-5 h-5" />
          </Link>
          <a href={`tel:${PHONE_TEL}`} className="border-2 border-white/80 text-white hover:bg-white/10 px-8 py-4 rounded-lg font-semibold text-lg inline-flex items-center justify-center">
            Call {PHONE}
          </a>
        </div>
      </div>
    </section>
  )
}

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}
