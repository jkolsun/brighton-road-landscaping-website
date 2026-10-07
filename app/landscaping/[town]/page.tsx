import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Footer from '@/components/Footer'
import { Hero, Split, Checklist, ProjectCards, Faq, AreaLinks, CtaBand, JsonLd } from '@/components/LandingBlocks'
import { AREAS, PROJECTS, FALL_INCLUDED, areaFaqs, SITE } from '@/lib/areas'

export function generateStaticParams() {
  return AREAS.map((a) => ({ town: a.slug }))
}

export const dynamicParams = false

export function generateMetadata({ params }: { params: { town: string } }): Metadata {
  const a = AREAS.find((x) => x.slug === params.town)
  if (!a) return {}
  const title = `Landscaping, Patios & Fall Cleanup in ${a.name}, PA`
  const description = `Landscape design, paver patios, drainage and fall leaf cleanups in ${a.name}, PA from Brighton Road Landscaping. Free estimates, call (484) 535-1936.`
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `/landscaping/${a.slug}` },
    openGraph: { title, description, url: `/landscaping/${a.slug}`, type: 'website', images: [{ url: a.image, width: 1200, height: 630 }] },
  }
}

export default function TownPage({ params }: { params: { town: string } }) {
  const a = AREAS.find((x) => x.slug === params.town)
  if (!a) notFound()
  const faqs = areaFaqs(a)
  const url = `${SITE}/landscaping/${a.slug}`
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: `Landscaping, hardscaping and fall cleanup in ${a.name}, PA`,
        serviceType: 'Landscaping',
        provider: { '@id': `${SITE}/#business` },
        areaServed: { '@type': 'City', name: `${a.name}, PA` },
        url,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
          { '@type': 'ListItem', position: 2, name: 'Service Areas', item: `${SITE}/landscaping/plymouth-meeting-pa` },
          { '@type': 'ListItem', position: 3, name: `${a.name}, PA`, item: url },
        ],
      },
      { '@type': 'FAQPage', mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    ],
  }
  const others = AREAS.filter((x) => x.slug !== a.slug).map((x) => ({ href: `/landscaping/${x.slug}`, label: `${x.name}, PA` }))

  return (
    <>
      <JsonLd data={ld} />
      <Hero
        title={`Landscaping in ${a.name}, PA`}
        subtitle={`Landscape design, patios and fall cleanups for ${a.name} homes and businesses`}
        image={a.image}
      />
      <Split title={`Your ${a.name} landscaper`} image={a.image} imageAlt={`A Brighton Road Landscaping project near ${a.name}, PA`}>
        <p>{a.intro}</p>
        <p>
          Brighton Road is a local, family-owned landscaping company. We design in-house, build with our own crew,
          and every estimate is free.
        </p>
      </Split>
      <ProjectCards heading={`Projects we build in ${a.name}`} projects={PROJECTS} />
      <Split title={`Fall cleanup & leaf removal in ${a.name}`} image="/images/fall-ba1-after.jpg" imageAlt="A lawn cleared of leaves after a Brighton Road fall cleanup" gray flip>
        <p>
          Once the leaves come down, we clear them out and get your property ready for winter. Book your {a.name} fall cleanup now.
        </p>
        <Checklist items={FALL_INCLUDED} />
        <p>
          <Link href="/fall-cleanup" className="text-green-700 font-semibold underline">See everything in a fall cleanup</Link>
        </p>
      </Split>
      <Faq heading={`${a.name} questions`} items={faqs} />
      <AreaLinks heading="We also work in" links={others} />
      <CtaBand title={`Planning a project in ${a.name}?`} text="Tell us what you have in mind and we will come out, walk the property, and give you a free estimate." />
      <Footer />
    </>
  )
}
