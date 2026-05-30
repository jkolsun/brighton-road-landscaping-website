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
    name: 'Landscape Design and Installation',
    hero: {
      title: 'Professional Landscape Design',
      image: '/images/install.JPG'
    },
    sections: [
      {
        title: 'Custom Landscape Architecture',
        content: 'At Brighton Road Landscaping, our team works with you to design a landscape that fits your preferences and budget. Our trained landscape architects use different landscaping softwares to create a clear outline of how your property will look, including dimensions, lighting, and the different shrubs, flowers, and greenery you want to include in your landscape beds. Then, our team handles full installation of the landscaping bed, including excavating, planting, and laying of mulch or landscape rocks.',
        video: '/Landscape.MP4',
        features: ['3D Design Software', 'Custom Plant Selection', 'Professional Installation', 'Seasonal Planning'],
        style: 'normal',
        bgColor: 'white'
      },
      {
        title: 'Complete Installation Services',
        content: 'We proudly design and install landscapes throughout Montgomery County. As a local, family-owned business, we understand the region\'s soil, drainage, and weather conditions, ensuring every project is perfectly tailored to your environment.',
        image: '/images/Installation.JPG',
        style: 'diagonal-left',
        bgColor: 'gray'
      }
    ],
    serviceArea: 'We proudly design and install landscapes throughout Montgomery County and the Main Line, including Plymouth Meeting, Blue Bell, Conshohocken, King of Prussia, Audubon, Fort Washington, Wayne, Bryn Mawr, Ardmore, and Radnor. As a local, family-owned business, we understand the region’s soil, drainage, and weather conditions, ensuring every project is perfectly tailored to your environment.'
  },

  'drainage': {
    name: 'Drainage',
    hero: {
      title: 'Drainage Solutions That Protect Your Property',
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
      }
    ],
    serviceArea: 'Brighton Road Landscaping installs drainage solutions throughout Plymouth Meeting, Conshohocken, Blue Bell, King of Prussia, Audubon, Fort Washington, Wayne, Bryn Mawr, Ardmore, Radnor, and the greater Main Line. Our team understands the region’s soil and grading, so we build drainage that keeps your property dry and protected all year long.'
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
        content: 'Brighton Road Landscaping\'s spring cleanup includes removal of all sticks and branches, as well as a fresh layer of mulch and any needed cleaning of flower beds. Our team will ensure that all plants will grow, bloom and thrive during the warm months.',
        video: '/springcleanup.MP4',
        features: ['Debris Removal', 'Fresh Mulch', 'Bed Preparation', 'Plant Care'],
        style: 'normal',
        bgColor: 'gray'
      },
      {
        title: 'FALL CLEANUP',
        content: 'Brighton Road Landscaping\'s fall cleanup includes removal of all leaves and sticks, as well as any plant or shrub trimming and pruning. Whether you need your leaves all hauled away or simply placed on the curb, Brighton Road Landscaping will get the job done right.',
        image: '/images/fallcleanup.JPG',
        features: ['Leaf Removal', 'Stick Cleanup', 'Shrub Trimming', 'Property Prep'],
        style: 'diagonal-right',
        bgColor: 'white'
      }
    ],
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