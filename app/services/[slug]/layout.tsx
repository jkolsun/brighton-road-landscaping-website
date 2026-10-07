import type { Metadata } from 'next'
import { AREAS, SITE } from '@/lib/areas'

// Per-service search titles and descriptions (the page itself is a client
// component, so its metadata lives here). Titles are absolute so the root
// "| Brighton Road Landscaping" template does not double up.
const META: Record<string, { title: string; description: string; serviceType: string; name: string }> = {
  'landscape-design': {
    name: 'Landscape design and installation',
    serviceType: 'Landscape design',
    title: 'Landscape Design & Installation, Main Line PA | Brighton Road',
    description: 'Landscape design and build in Plymouth Meeting, Blue Bell, Wayne and the Main Line. Planned to scale in-house, built by our own crew. Free estimates.',
  },
  hardscaping: {
    name: 'Hardscaping: paver patios, walkways and retaining walls',
    serviceType: 'Hardscaping',
    title: 'Paver Patios & Hardscaping, Main Line PA | Brighton Road',
    description: 'Paver, brick and stone patios, walkways, retaining walls and fireplaces in Plymouth Meeting, Conshohocken and the Main Line. Free estimates.',
  },
  drainage: {
    name: 'Drainage and irrigation',
    serviceType: 'Drainage',
    title: 'French Drains & Yard Drainage, Main Line PA | Brighton Road',
    description: 'French drains, yard grading, downspout drainage and sprinkler systems in Plymouth Meeting, King of Prussia and the Main Line. Free estimates.',
  },
  'seasonal-cleanups': {
    name: 'Fall and spring cleanups',
    serviceType: 'Seasonal cleanup',
    title: 'Fall Cleanups & Leaf Removal, Main Line PA | Brighton Road',
    description: 'Fall leaf removal and spring cleanups in Plymouth Meeting, Blue Bell, Conshohocken and the Main Line. Leaves, sticks and beds cleared. Free estimates.',
  },
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const m = META[params.slug]
  if (!m) {
    const name = params.slug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    return { title: `${name} | Brighton Road Landscaping` }
  }
  return {
    title: { absolute: m.title },
    description: m.description,
    openGraph: { title: m.title, description: m.description, url: `/services/${params.slug}`, type: 'website' },
  }
}

export default function Layout({ children, params }: { children: React.ReactNode; params: { slug: string } }) {
  const m = META[params.slug]
  const ld = m && {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: m.name,
    serviceType: m.serviceType,
    description: m.description,
    provider: { '@id': `${SITE}/#business` },
    areaServed: AREAS.map((a) => ({ '@type': 'City', name: `${a.name}, PA` })),
    url: `${SITE}/services/${params.slug}`,
  }
  return (
    <>
      {ld && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />}
      {children}
    </>
  )
}
