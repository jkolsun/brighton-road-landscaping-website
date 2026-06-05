'use client'

import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/Footer'
import { CheckCircleIcon, ArrowRightIcon } from '@heroicons/react/24/solid'

const services = {
  'lawn-mowing': {
    name: 'Property Maintenance',
    hero: {
      title: 'Quality, Reliable Property Maintenance',
      image: '/images/lawns.jpg'
    },
    sections: [
      {
        title: 'Professional Property Maintenance',
        content: 'At Brighton Road Landscaping, our experienced team members work diligently to keep our promise of consistent, reliable, high quality property maintenance. Our standard service covers all mowing, trimming, edging and blowing. We handle everything so you can simply relax and enjoy the beauty of your outdoor space.',
        video: '/lawn-video.mp4',
        features: ['Weekly Service', 'Bi-weekly Options', 'Edge Trimming', 'Professional Blowing'],
        style: 'normal',
        bgColor: 'white'
      },
      {
        title: 'No Contracts, Transparent Pricing',
        content: 'For our residential clients, we offer a pay as you go, non-binding property maintenance service. You may cancel or reschedule anytime except for the day of, with no cancellation fee. Whether you are in need of weekly lawn mowing, biweekly lawn mowing, or are just looking for a one time cut, Brighton Road Landscaping is here for all of your property maintenance needs.',
        image: '/images/stripes.jpg',
        style: 'diagonal-left',
        bgColor: 'gray'
      },
      {
        title: 'Commercial Landscape Maintenance',
        content: 'Brighton Road Landscaping offers complete landscape maintenance for our commercial clients. Your outdoor space is the first impression for customers and tenants, and we know how important it is for every detail of the landscape to be up to par. We work with you to create a custom landscape maintenance plan at the beginning of each contract. We believe this is the foundation of a mutually beneficial relationship. Then, our experienced team members execute the landscape maintenance services, clearly communicated by the field manager. We proudly service HOA communities, office parks, retail centers, parks and public places, and more throughout Montgomery County.',
        image: '/images/jaguar.jpg',
        style: 'normal',
        bgColor: 'white'
      }
    ],
    serviceArea: 'From our home base in Plymouth Meeting, PA, we proudly provide reliable residential and commercial property maintenance throughout Conshohocken, Blue Bell, King of Prussia, Audubon, Lafayette Hill, Fort Washington, Wayne, Bryn Mawr, Ardmore, Radnor, and the greater Main Line. Our crews live and work in the same communities we serve, so we understand the local weather, grass types, and property needs. Choose Brighton Road Landscaping for a team that knows your neighborhood and treats your property like their own.'
  },
  
  'hardscaping': {
    name: 'Hardscaping',
    hero: {
      title: 'Custom Hardscapes Built to Last',
      image: '/images/hardscape.jpg'
    },
    sections: [
      {
        title: 'Expert Hardscape Design & Installation',
        content: 'At Brighton Road Landscaping, we offer a full range of hardscape features that are both functional and visually stunning. From new patios, walk ways, retaining walls, stairs, and fireplaces, our trained team meticulously designs and installs hardscapes that will stand the test of time. Our team is experienced with a variety of hardscaping materials, including pavers, bricks, and stones. Each installation is customized to complement your property’s layout, style, and elevation. If you’re looking to add life to your property, Brighton Road Hardscaping will get the job done right.',
        image: '/images/hardscape2.jpg',
        features: ['Custom Design', 'Premium Materials', 'Expert Installation', 'Lifetime Warranty'],
        style: 'diagonal-right',
        bgColor: 'white'
      },
      {
        title: 'Patios, Walkways, and Retaining Walls',
        content: 'At Brighton Road Landscaping, our hardscaping services include expertly designed patios, walkways, and retaining walls that add beauty and function to your property. A custom brick, paver, or stone patio creates the perfect gathering space for family and friends. Our walkways and stone steps provide seamless connections between different areas of your landscape, improving both accessibility and visual appeal. And when it comes to retaining walls, we design and build durable structures that prevent erosion, define spaces, and add dimension to your yard. Whether you’re enhancing your backyard, front entry, or sloped terrain, our team will help you select the perfect materials and layout to create a hardscape that turns a simple backyard into a place to relax, entertain, and enjoy the outdoors for years to come.',
        image: '/images/retaining-wall.jpg',
        style: 'normal',
        bgColor: 'gray'
      }
    ],
    serviceArea: 'Our hardscape installation services are available throughout Plymouth Meeting, Conshohocken, Blue Bell, King of Prussia, Wayne, Bryn Mawr, Ardmore, Radnor, the Main Line, and the greater Montgomery County area. Whether you’re upgrading your home or enhancing a commercial property, we’ll guide you through design, materials, and build a finished product that adds lasting value to your property.'
  },

  'landscape-design': {
    name: 'Landscape Design & Build',
    hero: {
      title: 'From Blueprint to Backyard — Designed and Built In-House',
      image: '/images/projects/landscape-design-build-hero.jpg'
    },
    sections: [
      {
        title: 'It Starts With a Plan',
        content: 'Every great landscape starts with a plan. At Brighton Road Landscaping, we sit down with you to understand how you actually want to live in your yard — then translate it into a clear, to-scale design using professional landscaping software. You will see exactly where every bed, walkway, tree, shrub, and light belongs before a single shovel hits the ground. We account for sun, slope, drainage, and how your plantings will mature, so the design looks just as good in five years as it does on day one.',
        video: '/Landscape.MP4',
        features: ['3D Design Software', 'Custom Plant Selection', 'Sun & Drainage Planning', 'Built to Mature Beautifully'],
        style: 'normal',
        bgColor: 'white'
      },
      {
        title: 'Designed and Built by One Crew',
        content: 'Because we design and install in-house, nothing gets lost in translation. The same team that drew your plan is the one excavating beds, amending soil, setting plants, and laying crisp, clean mulch or stone. As a local, family-owned business, we know Montgomery County\'s soil, drainage, and weather firsthand — so every bed is built to thrive right here. The result is a finished landscape with clean lines and healthy plantings that lifts the curb appeal of your entire property.',
        image: '/images/projects/IMG_8149.JPG',
        style: 'diagonal-left',
        bgColor: 'gray'
      }
    ],
    serviceArea: 'We proudly design and install landscapes throughout Montgomery County and the Main Line, including Plymouth Meeting, Blue Bell, Conshohocken, King of Prussia, Audubon, Fort Washington, Wayne, Bryn Mawr, Ardmore, and Radnor. As a local, family-owned business, we understand the region’s soil, drainage, and weather conditions, ensuring every project is perfectly tailored to your environment.'
  },

  'drainage': {
    name: 'Drainage & Irrigation',
    hero: {
      title: 'Drainage and Irrigation Solutions for a Healthier Property',
      image: '/images/drainage-hero.jpg'
    },
    sections: [
      {
        title: 'French Drains & Yard Grading',
        content: 'Standing water and soggy spots in your yard are more than an eyesore — they damage your lawn, your landscaping, and even your foundation. At Brighton Road Landscaping, we install French drains and regrade problem areas to move water away from your home and keep your property dry. We assess how water flows across your property and engineer a solution built to handle heavy Pennsylvania rain, season after season.',
        image: '/images/drainage-rivrock.jpg',
        features: ['French Drain Installation', 'Yard Grading & Regrading', 'Standing Water Solutions', 'Erosion Control'],
        style: 'diagonal-right',
        bgColor: 'white'
      },
      {
        title: 'Downspouts, Catch Basins & Dry Creek Beds',
        content: 'A complete drainage system manages water from the roof to the street. We handle downspout and gutter drainage, channel drains, catch basins, and decorative dry creek beds that move runoff while looking great. Whether you have a wet basement, a flooded walkway, or a yard that never seems to dry out, our team designs and installs the right drainage solution to fix it for good.',
        image: '/images/drainage-grate.jpg',
        features: ['Downspout & Gutter Drainage', 'Catch Basins', 'Dry Creek Beds', 'Foundation Water Protection'],
        style: 'normal',
        bgColor: 'gray'
      },
      {
        title: 'Irrigation & Sprinkler Systems',
        content: 'Once water is moving away from your home, the next step is getting it exactly where your lawn and plantings actually need it. We design and install automatic irrigation and sprinkler systems that deliver the right amount of water to every zone — turf, beds, and borders — on a schedule that fits the season. Smart, properly-zoned irrigation means a greener lawn, healthier plants, and no more dragging hoses around or guessing. We also handle spring start-ups, summer adjustments, and fall winterizations so your system runs trouble-free year after year.',
        image: '/images/irrigation-sprinkler.jpg',
        features: ['Automatic Sprinkler Systems', 'Zoned Watering', 'Smart Controllers', 'Spring Start-Up & Winterization'],
        style: 'diagonal-right',
        bgColor: 'white'
      }
    ],
    serviceArea: 'Brighton Road Landscaping installs drainage and irrigation systems throughout Plymouth Meeting, Conshohocken, Blue Bell, King of Prussia, Audubon, Fort Washington, Wayne, Bryn Mawr, Ardmore, Radnor, and the greater Main Line. Our team understands the region’s soil and grading, so we build drainage and irrigation that keeps your property dry, green, and protected all year long.'
  },

  'seasonal-cleanups': {
    name: 'Seasonal Cleanups',
    hero: {
      title: 'Year-Round Property Maintenance',
      image: '/images/seasonal.jpg'
    },
    sections: [
      {
        title: 'SPRING CLEANUP',
        content: 'Brighton Road Landscaping\'s spring cleanups include all weeding, edging and installation of fresh mulch, as well as any trimming or pruning that is necessary. Our team will ensure that all plants will grow, bloom and thrive during the warm months.',
        video: '/springcleanup.MP4',
        features: ['Weeding & Edging', 'Fresh Mulch', 'Trimming & Pruning', 'Bed Cleanup'],
        style: 'normal',
        bgColor: 'gray'
      },
      {
        title: 'FALL CLEANUP',
        content: 'Brighton Road Landscaping\'s fall cleanup includes removal of all leaves and sticks, as well as any plant or shrub trimming and pruning. Brighton Road Landscaping will ensure your property is clean and ready for the winter.',
        image: '/images/fallcleanup.JPG',
        features: ['Leaf Removal', 'Stick Cleanup', 'Trimming & Pruning', 'Winter Prep'],
        style: 'diagonal-right',
        bgColor: 'white'
      }
    ],
    beforeAfter: {
      title: 'Fall Cleanup: Before & After',
      subtitle: 'Real Brighton Road fall cleanups — from leaf-buried lawns and storm-downed limbs to crisp, winter-ready yards.',
      pairs: [
        { before: '/images/fall-ba1-before.jpg', after: '/images/fall-ba1-after.jpg', label: 'Full Leaf Removal', aspect: 'aspect-[3/4]' },
        { before: '/images/fall-ba2-before.jpg', after: '/images/fall-ba2-after.jpg', label: 'Storm & Tree Debris Cleanup', aspect: 'aspect-[4/3]' }
      ]
    },
    serviceArea: 'We proudly perform seasonal cleanups in Plymouth Meeting, Conshohocken, Blue Bell, King of Prussia, Audubon, Fort Washington, Wayne, Bryn Mawr, Ardmore, Radnor, and across the Main Line. With Brighton Road Landscaping, your property will always be well-prepared for every season.'
  }
}

export default function ServiceDetailPage() {
  const { slug } = useParams()
  const service = services[slug as keyof typeof services]

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Service Not Found</h1>
          <Link href="/services" className="text-green-700 hover:text-green-600">
            Return to Services
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Green Hero Banner */}
      <section className="relative bg-gradient-to-r from-green-800 to-green-700 py-32">
        <div className="absolute inset-0">
          <Image
            src={service.hero.image}
            alt={service.name}
            fill
            className="object-cover opacity-20"
          />
        </div>
        <motion.div 
          className="relative z-10 max-w-7xl mx-auto px-6 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-7xl font-[impact] text-white mb-6 tracking-wide">
            {service.name.toUpperCase()}
          </h1>
          <p className="text-2xl md:text-3xl text-white/90 font-light">
            {service.hero.title}
          </p>
        </motion.div>
      </section>

      {/* Service Sections - All use normal split layout */}
      {service.sections.map((section, index) => {
        const imageOnRight = index % 2 === 0
        const bgClass = section.bgColor === 'gray' ? 'bg-gray-50' : 'bg-white'
        
        return (
          <section key={index} className={`${bgClass} min-h-[600px]`}>
            <div className="grid md:grid-cols-2 h-full">
              {/* Text Content */}
              <motion.div
                initial={{ opacity: 0, x: imageOnRight ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className={`flex items-center p-8 md:p-12 lg:p-20 ${imageOnRight ? '' : 'md:order-2'}`}
              >
                <div>
                  <h2 className="text-3xl md:text-4xl font-[impact] text-gray-900 mb-6">
                    {section.title}
                  </h2>
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
                    {section.content}
                  </p>
                  
                  {section.features && (
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {section.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircleIcon className="w-5 h-5 text-green-600 flex-shrink-0" />
                          <span className="text-gray-700 font-medium text-sm md:text-base">{feature}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <Link href="/quote">
                    <button className="mt-6 bg-green-700 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg transform hover:scale-105 transition inline-flex items-center gap-2">
                      Get a Quote
                      <ArrowRightIcon className="w-5 h-5" />
                    </button>
                  </Link>
                </div>
              </motion.div>

              {/* Image */}
              <motion.div
                initial={{ opacity: 0, x: imageOnRight ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className={`relative min-h-[400px] md:min-h-[600px] ${imageOnRight ? 'md:order-2' : ''}`}
              >
                {section.video ? (
                  <video
                    src={section.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <Image
                    src={section.image}
                    alt={section.title}
                    fill
                    className="object-cover"
                  />
                )}
              </motion.div>
            </div>
          </section>
        )
      })}

      {/* Before & After Showcase */}
      {'beforeAfter' in service && service.beforeAfter && (
        <section className="bg-gradient-to-br from-gray-900 to-green-900 py-20 md:py-28">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12 md:mb-16"
            >
              <span className="inline-block bg-green-500/20 text-green-300 font-semibold px-4 py-1.5 rounded-full text-sm tracking-wide mb-4">
                REAL RESULTS
              </span>
              <h2 className="text-4xl md:text-5xl font-[impact] text-white mb-4">{service.beforeAfter.title}</h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">{service.beforeAfter.subtitle}</p>
            </motion.div>

            <div className="space-y-12 md:space-y-16">
              {service.beforeAfter.pairs.map((pair, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="grid grid-cols-2 gap-3 sm:gap-5 md:gap-6">
                    {[
                      { src: pair.before, tag: 'Before', badge: 'bg-gray-900/85' },
                      { src: pair.after, tag: 'After', badge: 'bg-green-600' },
                    ].map((im) => (
                      <figure
                        key={im.tag}
                        className={`group relative ${pair.aspect} overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10`}
                      >
                        <Image
                          src={im.src}
                          alt={`${pair.label} — ${im.tag}`}
                          fill
                          sizes="(max-width: 768px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <span className={`absolute top-3 left-3 ${im.badge} text-white text-[11px] sm:text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full backdrop-blur-sm`}>
                          {im.tag}
                        </span>
                      </figure>
                    ))}
                  </div>
                  <p className="text-center text-green-300 font-semibold mt-4 text-sm sm:text-base">{pair.label}</p>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12 md:mt-16">
              <Link href="/quote">
                <button className="bg-green-600 hover:bg-green-500 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg transform hover:scale-105 transition inline-flex items-center gap-2">
                  Get Your Free Estimate
                  <ArrowRightIcon className="w-5 h-5" />
                </button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Service Area Section */}
      <section className="bg-gradient-to-br from-green-50 to-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-[impact] text-gray-900 mb-6">
            Serving Montgomery County, PA
          </h3>
          <p className="text-lg text-gray-700 leading-relaxed">
            {service.serviceArea}
          </p>
        </div>
      </section>

      <Footer />
    </>
  )
}