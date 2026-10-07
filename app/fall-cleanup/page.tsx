import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/Footer'
import Slideshow from '@/components/Slideshow'
import { Hero, Split, Checklist, Faq, AreaLinks, CtaBand, JsonLd } from '@/components/LandingBlocks'
import { AREAS, FALL_INCLUDED, FALL_FAQS, SITE } from '@/lib/areas'

const TITLE = 'Fall Cleanup & Leaf Removal, Main Line PA | Brighton Road'
const DESC = 'Fall cleanups and leaf removal in Plymouth Meeting, Blue Bell, Conshohocken and the Main Line. Leaves, sticks and storm debris cleared. Free estimates.'

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESC,
  alternates: { canonical: '/fall-cleanup' },
  openGraph: { title: TITLE, description: DESC, url: '/fall-cleanup', type: 'website', images: [{ url: '/images/fall-ba1-after.jpg', width: 1200, height: 630 }] },
}

export default function FallCleanupPage() {
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: 'Fall cleanup and leaf removal',
        serviceType: 'Fall cleanup',
        provider: { '@id': `${SITE}/#business` },
        areaServed: AREAS.map((a) => ({ '@type': 'City', name: `${a.name}, PA` })),
        url: `${SITE}/fall-cleanup`,
      },
      { '@type': 'FAQPage', mainEntity: FALL_FAQS.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    ],
  }
  return (
    <>
      <JsonLd data={ld} />
      <Hero title="Fall Cleanup & Leaf Removal" subtitle="Leaves, sticks and storm debris cleared, and your property ready for winter" image="/images/seasonal.jpg" />
      <Split title="What a fall cleanup includes" image="/images/fall-ba1-after.jpg" imageAlt="A lawn cleared of leaves after a Brighton Road fall cleanup">
        <p>
          Brighton Road Landscaping&apos;s fall cleanup removes the leaves and sticks from your whole property, trims and
          prunes the plants and shrubs that need it, and leaves everything clean and ready for winter.
        </p>
        <Checklist items={FALL_INCLUDED} />
      </Split>
      <section className="bg-gray-50">
        <div className="grid md:grid-cols-2">
          <div className="flex items-center p-8 md:p-12 lg:p-20">
            <div>
              <h2 className="text-3xl md:text-4xl font-[impact] text-gray-900 mb-6">Before and after</h2>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                Real fall cleanups from our crew: a leaf-covered yard cleared down to the grass, and a yard cleaned up after a storm.
              </p>
            </div>
          </div>
          <div className="relative min-h-[360px] md:min-h-[520px]">
            <Slideshow
              slides={[
                { src: '/images/fall-ba1-before.jpg', label: 'Before: Leaf Removal' },
                { src: '/images/fall-ba1-after.jpg', label: 'After: Leaf Removal' },
                { src: '/images/fall-ba2-before.jpg', label: 'Before: Storm Debris' },
                { src: '/images/fall-ba2-after.jpg', label: 'After: Storm Debris' },
              ]}
            />
          </div>
        </div>
      </section>
      <Split title="Planning a spring project?" image="/images/hardscape-estate.jpg" imageAlt="A paver patio built by Brighton Road Landscaping">
        <p>
          Fall is the best time to plan next year&apos;s patio, landscape design or drainage fix. We walk the property,
          draw the plan to scale, and get you on the schedule for spring.
        </p>
        <p>
          <Link href="/services/landscape-design" className="text-green-700 font-semibold underline">Landscape design &amp; build</Link>
          {' · '}
          <Link href="/services/hardscaping" className="text-green-700 font-semibold underline">Patios &amp; hardscaping</Link>
          {' · '}
          <Link href="/services/drainage" className="text-green-700 font-semibold underline">Drainage &amp; irrigation</Link>
        </p>
      </Split>
      <Faq heading="Fall cleanup questions" items={FALL_FAQS} />
      <AreaLinks heading="Fall cleanups across Montgomery County and the Main Line" links={AREAS.map((a) => ({ href: `/landscaping/${a.slug}`, label: `${a.name}, PA` }))} />
      <CtaBand title="Book your fall cleanup" text="Call or request a quote and we will get your property on the fall schedule." />
      <Footer />
    </>
  )
}
