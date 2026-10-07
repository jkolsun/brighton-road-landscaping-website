// Town landing pages + the fall cleanup page share these facts.
// Distances are straight-line miles from Plymouth Meeting (measured 2026-10-07).
// Only claims the site already makes elsewhere: in-house design and build,
// pavers / brick / stone hardscapes, French drains and irrigation, spring and
// fall cleanups, free no-obligation estimates.

export const SITE = 'https://www.brightonroadlandscaping.com'
export const PHONE = '(484) 535-1936'
export const PHONE_TEL = '+14845351936'

export type Area = {
  slug: string
  name: string
  county: string
  miles: number
  where: string
  intro: string
  image: string
}

export const AREAS: Area[] = [
  {
    slug: 'plymouth-meeting-pa',
    name: 'Plymouth Meeting',
    county: 'Montgomery County',
    miles: 0,
    where: 'our home base, across Plymouth and Whitemarsh Townships',
    intro:
      'Plymouth Meeting is home for Brighton Road Landscaping. We design and build landscapes, patios and drainage on properties across Plymouth and Whitemarsh Townships, and our fall crews are a short drive from every street in town.',
    image: '/images/projects/landscape-design-build-hero.jpg',
  },
  {
    slug: 'conshohocken-pa',
    name: 'Conshohocken',
    county: 'Montgomery County',
    miles: 3,
    where: 'about 3 miles from Plymouth Meeting, on the Schuylkill River',
    intro:
      'Conshohocken sits on the Schuylkill River about 3 miles from our Plymouth Meeting base. From compact borough yards to larger lots on the hills around town, we plan every patio, planting bed and drainage line to fit the space you actually have.',
    image: '/images/hardscape-estate.jpg',
  },
  {
    slug: 'blue-bell-pa',
    name: 'Blue Bell',
    county: 'Montgomery County',
    miles: 3,
    where: 'in Whitpain Township, about 3 miles north of Plymouth Meeting',
    intro:
      'Blue Bell is in Whitpain Township, about 3 miles north of Plymouth Meeting. Larger lots and mature trees make it a natural fit for full landscape design and build projects, paver patios, and a fall cleanup that clears every bed before winter.',
    image: '/images/retaining-wall.jpg',
  },
  {
    slug: 'king-of-prussia-pa',
    name: 'King of Prussia',
    county: 'Montgomery County',
    miles: 6,
    where: 'in Upper Merion Township, about 6 miles west of Plymouth Meeting',
    intro:
      'King of Prussia is in Upper Merion Township, about 6 miles west of our base. We build patios, walkways and retaining walls, fix wet yards with French drains and grading, and take care of leaf removal and fall cleanups for homes and businesses across the township.',
    image: '/images/hardscape.jpg',
  },
  {
    slug: 'audubon-pa',
    name: 'Audubon',
    county: 'Montgomery County',
    miles: 8,
    where: 'in Lower Providence Township, about 8 miles west of Plymouth Meeting',
    intro:
      'Audubon is in Lower Providence Township, about 8 miles west of Plymouth Meeting. Homeowners here call us for landscape design and installation, new patios and walkways, drainage that keeps water away from the house, and seasonal cleanups.',
    image: '/images/projects/IMG_8149.JPG',
  },
  {
    slug: 'fort-washington-pa',
    name: 'Fort Washington',
    county: 'Montgomery County',
    miles: 6,
    where: 'about 6 miles east of Plymouth Meeting, by Fort Washington State Park',
    intro:
      'Fort Washington sits about 6 miles east of Plymouth Meeting, next to Fort Washington State Park. Wooded lots mean heavy leaf fall every autumn, which is why our fall cleanups here focus on clearing leaves and sticks from lawns and beds before winter.',
    image: '/images/fall-ba1-after.jpg',
  },
  {
    slug: 'wayne-pa',
    name: 'Wayne',
    county: 'the Main Line',
    miles: 8,
    where: 'on the Main Line, about 8 miles from Plymouth Meeting',
    intro:
      'Wayne is on the Main Line, about 8 miles from our Plymouth Meeting base. We design and build landscapes and hardscapes that suit Main Line homes, from stone and paver patios to planting plans drawn to scale before any work begins.',
    image: '/images/hardscape-estate.jpg',
  },
  {
    slug: 'bryn-mawr-pa',
    name: 'Bryn Mawr',
    county: 'the Main Line',
    miles: 6,
    where: 'on the Main Line, about 6 miles from Plymouth Meeting',
    intro:
      'Bryn Mawr is on the Main Line, about 6 miles from Plymouth Meeting. Established properties with mature plantings get a design that works with what is already there, plus patios, walkways, drainage fixes and a thorough fall cleanup.',
    image: '/images/projects/landscape-design-build-hero.jpg',
  },
  {
    slug: 'ardmore-pa',
    name: 'Ardmore',
    county: 'the Main Line',
    miles: 7,
    where: 'in Lower Merion, about 7 miles from Plymouth Meeting',
    intro:
      'Ardmore is in Lower Merion, about 7 miles from our base. Whether it is a smaller in-town yard or a larger property, we plan the patio, beds and drainage to scale, build it with one in-house crew, and come back in the fall to clear the leaves.',
    image: '/images/retaining-wall.jpg',
  },
  {
    slug: 'radnor-pa',
    name: 'Radnor',
    county: 'Delaware County',
    miles: 6,
    where: 'in Radnor Township, Delaware County, about 6 miles from Plymouth Meeting',
    intro:
      'Radnor Township is about 6 miles from Plymouth Meeting, just over the line in Delaware County. We handle landscape design and installation, hardscaping, French drains and grading, and spring and fall cleanups for homes across the township.',
    image: '/images/hardscape.jpg',
  },
]

export const FALL_INCLUDED = [
  'Leaves raked and blown out of lawns, beds and borders, then removed',
  'Sticks and fallen branches picked up across the property',
  'Shrubs and plants trimmed and pruned where they need it',
  'Storm debris cleared after wind and rain',
  'Beds cleaned up and the property left ready for winter',
  'Sprinkler system winterization, if you have irrigation',
]

export const PROJECTS = [
  {
    href: '/services/landscape-design',
    title: 'Landscape Design & Build',
    text: 'A to-scale plan drawn with professional landscaping software, then built by the same in-house crew: beds, plantings, walkways, lighting and stone.',
    image: '/images/projects/landscape-design-build-hero.jpg',
  },
  {
    href: '/services/hardscaping',
    title: 'Patios, Walkways & Retaining Walls',
    text: 'Paver, brick and stone patios, walkways, steps, retaining walls and fireplaces, designed for your yard and built to last.',
    image: '/images/hardscape-estate.jpg',
  },
  {
    href: '/services/drainage',
    title: 'Drainage & Irrigation',
    text: 'French drains, regrading, downspout drainage, catch basins and dry creek beds, plus automatic sprinkler systems.',
    image: '/images/drainage-rivrock.jpg',
  },
]

export function areaFaqs(a: Area) {
  return [
    {
      q: `Do you work in ${a.name}?`,
      a: a.miles === 0
        ? `Yes. ${a.name} is our home base, and we work on properties all over town.`
        : `Yes. ${a.name} is ${a.where}, well inside the area we serve.`,
    },
    {
      q: `Can you design and build a patio in ${a.name}?`,
      a: 'Yes. We draw the plan to scale first so you can see every patio, walkway, wall and bed before work starts, then our in-house crew builds it in pavers, brick or stone.',
    },
    {
      q: `Do you do fall cleanups and leaf removal in ${a.name}?`,
      a: 'Yes. A fall cleanup removes the leaves and sticks from your lawn and beds, trims and prunes what needs it, and leaves the property ready for winter.',
    },
    {
      q: 'Are estimates free?',
      a: `Yes. Every estimate is free and no-obligation. Call ${PHONE} or request a quote online.`,
    },
  ]
}

export const FALL_FAQS = [
  { q: 'What is included in a fall cleanup?', a: 'We remove the leaves and sticks from your lawn, beds and borders, trim and prune shrubs and plants that need it, clear any storm debris, and leave the property clean and ready for winter.' },
  { q: 'Do you clean up storm debris?', a: 'Yes. Fallen branches and debris after wind and rain are part of a fall cleanup.' },
  { q: 'Can you winterize my sprinkler system?', a: 'Yes. We handle fall winterizations for irrigation and sprinkler systems, along with spring start-ups.' },
  { q: 'Do you do spring cleanups too?', a: 'Yes. Spring cleanups cover weeding, edging, fresh mulch, and trimming and pruning so everything grows in healthy.' },
  { q: 'Is the estimate free?', a: `Yes. Every estimate is free and no-obligation. Call ${PHONE} or request a quote online.` },
]
