'use client'

import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/Footer'
import { CheckCircleIcon, ArrowRightIcon } from '@heroicons/react/24/solid'

const services = {
  'lawn-mowing': {
    name: 'Lawn Mowing',
    hero: {
      title: 'Quality, Reliable Lawn Maintenance',
      image: '/images/lawns.jpg'
    },
    sections: [
      {
        title: 'Professional Lawn Care Excellence',
        content: 'At Brighton Road Landscaping, our experienced team members work diligently to keep our promise of consistent, reliable, high quality lawn care. Our standard lawn mowing service covers all mowing, trimming, edging and blowing. We handle everything so you can simply relax and enjoy the beauty of your outdoor space.',
        video: '/lawn-video.mp4',
        features: ['Weekly Service', 'Bi-weekly Options', 'Edge Trimming', 'Professional Blowing'],
        style: 'normal',
        bgColor: 'white'
      },
      {
        title: 'No Contracts, Transparent Pricing',
        content: 'For our residential clients, we offer a pay as you go, non-binding lawn care service. You may cancel or reschedule anytime except for the day of, with no cancellation fee. Whether you are in need of weekly lawn mowing, biweekly lawn mowing, or are just looking to for a one time cut, Brighton Road Landscaping is here for all of your lawn care needs.',
        image: '/images/stripes.jpg',
        style: 'diagonal-left',
        bgColor: 'gray'
      },
      {
        title: 'Commercial Landscape Maintenance',
        content: 'Brighton Road Landscaping offers complete landscape maintenance for our commercial clients. Your outdoor space is the first impression for customers and tenants, and we know how important it is for every detail of the landscape to be up to par. We work with you to create a custom landscape maintenance plan at the beginning of each contract.',
        image: '/images/jaguar.jpg',
        style: 'normal',
        bgColor: 'white'
      }
    ],
    serviceArea: 'From our home base in Plymouth Meeting, PA, we proudly provide reliable residential and commercial lawn care services throughout Conshohocken, Blue Bell, King of Prussia, Audubon, Lafayette Hill, and Fort Washington.'
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
        content: 'At Brighton Road Landscaping, we offer a full range of hardscape features that are both functional and visually stunning. From new patios, walk ways, retaining walls, stairs, and fireplaces, our trained team meticulously designs and installs hardscapes that will stand the test of time.',
        image: '/images/hardscape2.jpg',
        features: ['Custom Design', 'Premium Materials', 'Expert Installation', 'Lifetime Warranty'],
        style: 'diagonal-right',
        bgColor: 'white'
      },
      {
        title: 'Patios, Walkways, and Retaining Walls',
        content: 'Our hardscaping services include expertly designed patios, walkways, and retaining walls that add beauty and function to your property. A custom brick, paver, or stone patio creates the perfect gathering space for family and friends. Our walkways and stone steps provide seamless connections between different areas of your landscape.',
        image: '/images/retaining-wall.jpg',
        style: 'normal',
        bgColor: 'gray'
      }
    ],
    serviceArea: 'Our hardscape installation services are available throughout Plymouth Meeting, Conshohocken, Blue Bell, King of Prussia, and the greater Montgomery County area.'
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
        content: 'At Brighton Road Landscaping, our team works with you to design a landscape that fits your preferences and budget. Our trained landscape architects use different landscaping softwares to create a clear outline of how your property will look, including dimensions, lighting, and the different trees, shrubs and/or flowers you want to include.',
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
    serviceArea: 'Serving Montgomery County, Pa'
  },

  'lawn-care': {
    name: 'Lawn Care',
    hero: {
      title: 'Complete Lawn Care Solutions',
      image: '/images/lawn-care.jpg'
    },
    sections: [
      {
        title: 'Irrigation and Sprinkler Systems',
        content: 'The most important part of lawn care is ensuring your grass is getting the proper amount of water regardless of the heat or rain throughout the summer. Here at Brighton Road Landscaping, we provide the installation and maintenance of sprinkler systems.',
        image: '/images/sprinkle.jpg',
        features: ['System Installation', 'Spring Start-up', 'Winter Shut-down', 'Zone Customization'],
        style: 'diagonal-right',
        bgColor: 'white'
      },
      {
        title: 'Comprehensive Lawn Care',
        content: 'Our team offers comprehensive lawn care from spring through fall that is sure to give your lawn a lush green look. In the spring and fall, we seed any bare spots in the lawn so the grass is full and thick. We then offer fertilization and treatment throughout the cutting season.',
        image: '/images/fertilizer.jpg',
        style: 'normal',
        bgColor: 'gray'
      }
    ],
    serviceArea: 'Brighton Road Landscaping proudly offers lawn care throughout Plymouth Meeting, Conshohocken, Blue Bell, King of Prussia, Audubon, and Fort Washington.'
  },

  'tree-service': {
    name: 'Tree Service',
    hero: {
      title: 'Safe, Efficient Tree Care',
      image: '/images/tree.jpg'
    },
    sections: [
      {
        title: 'Expert Tree Care Solutions',
        content: 'At Brighton Road Landscaping, we provide expert tree care solutions that enhance the health, appearance, and safety of your property. Whether you need to prune back overgrown branches, remove a damaged tree, or shape your trees for better structure, our team uses professional equipment and safe practices.',
        video: '/tree-video.mp4',
        features: ['Professional Pruning', 'Safe Removal', 'Storm Damage', 'Disease Treatment'],
        style: 'normal',
        bgColor: 'white'
      },
      {
        title: 'Tree Trimming, Pruning & Removal',
        content: 'We offer comprehensive tree trimming and pruning to promote growth, prevent disease, and maintain a beautiful landscape. When a tree is beyond saving or poses a safety hazard, we provide safe and efficient removal services.',
        image: '/images/Tree.websiteJPG.JPG',
        style: 'diagonal-left',
        bgColor: 'gray'
      }
    ],
    serviceArea: 'Our professional tree services are available throughout Montgomery County, including Plymouth Meeting, Conshohocken, Blue Bell, King of Prussia, Audubon, and Fort Washington.'
  },

  'seasonal-cleanups': {
    name: 'Seasonal Cleanups',
    hero: {
      title: 'Year-Round Property Maintenance',
      image: '/images/seasonal.jpg'
    },
    sections: [
      {
        title: 'FALL CLEANUP',
        content: 'Brighton Road Landscaping\'s fall cleanup includes removal of all leaves and sticks, as well as any tree, plant, or shrub trimming and pruning. Whether you need your leaves all hauled away or simply placed on the curb, Brighton Road Landscaping will get the job done right.',
        image: '/images/fallcleanup.jpg',
        features: ['Leaf Removal', 'Stick Cleanup', 'Shrub Trimming', 'Property Prep'],
        style: 'diagonal-right',
        bgColor: 'white'
      },
      {
        title: 'SPRING CLEANUP',
        content: 'Brighton Road Landscaping\'s spring cleanup includes removal of all sticks and branches, as well as a fresh layer of mulch and any needed cleaning of flower beds. Our team will ensure that all plants will grow, bloom and thrive during the warm months.',
        video: '/springcleanup.mp4',
        features: ['Debris Removal', 'Fresh Mulch', 'Bed Preparation', 'Plant Care'],
        style: 'normal',
        bgColor: 'gray'
      }
    ],
    serviceArea: 'We proudly perform seasonal cleanups in Plymouth Meeting, Conshohocken, Blue Bell, King of Prussia, Audubon, and Fort Washington.'
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

      {/* Service Sections - Different Styles */}
      {service.sections.map((section, index) => {
        // Determine if image should be on right (alternates with each section)
        const imageOnRight = index % 2 === 0
        
        // NORMAL FULL BLEED STYLE
        if (section.style === 'normal') {
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
        }
        
        // DIAGONAL RIGHT STYLE - WITH RESPONSIVE FIX AND ALTERNATING
        if (section.style === 'diagonal-right') {
          const bgClass = section.bgColor === 'gray' ? 'bg-gray-50' : 'bg-white'
          
          return (
            <section key={index}>
              {/* Mobile: Normal stacked layout */}
              <div className={`md:hidden ${bgClass}`}>
                <div className="relative h-[400px]">
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
                </div>
                <div className="p-8">
                  <h2 className="text-3xl font-[impact] text-gray-900 mb-6">
                    {section.title}
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    {section.content}
                  </p>
                  {section.features && (
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {section.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircleIcon className="w-5 h-5 text-green-600 flex-shrink-0" />
                          <span className="text-gray-700 font-medium text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  <Link href="/quote">
                    <button className="bg-green-700 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg transform hover:scale-105 transition inline-flex items-center gap-2">
                      Get a Quote
                      <ArrowRightIcon className="w-5 h-5" />
                    </button>
                  </Link>
                </div>
              </div>

              {/* Desktop: Keep diagonal design WITH ALTERNATING */}
              <div className="hidden md:block relative min-h-[700px] overflow-hidden">
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
                <div className={`absolute inset-y-0 ${imageOnRight ? 'left-0' : 'right-0'} w-full md:w-[65%] lg:w-[55%] bg-white/95 backdrop-blur-sm`}
                     style={{ 
                       clipPath: imageOnRight ? 'polygon(0 0, 85% 0, 100% 100%, 0% 100%)' : 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)'
                     }}>
                </div>
                <motion.div
                  initial={{ opacity: 0, x: imageOnRight ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className={`relative z-10 h-full flex items-center ${imageOnRight ? '' : 'justify-end'} min-h-[700px]`}
                >
                  <div className="px-8 md:px-12 lg:px-20 max-w-3xl w-full md:w-[60%]">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-[impact] text-gray-900 mb-6">
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
                            <span className="text-gray-700 font-medium">{feature}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    <Link href="/quote">
                      <button className="bg-green-700 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg transform hover:scale-105 transition inline-flex items-center gap-2">
                        Get a Quote
                        <ArrowRightIcon className="w-5 h-5" />
                      </button>
                    </Link>
                  </div>
                </motion.div>
              </div>
            </section>
          )
        }
        
        // DIAGONAL LEFT STYLE - WITH RESPONSIVE FIX AND ALTERNATING
        if (section.style === 'diagonal-left') {
          const bgClass = section.bgColor === 'gray' ? 'bg-gray-50' : 'bg-white'
          
          return (
            <section key={index}>
              {/* Mobile: Normal stacked layout */}
              <div className={`md:hidden ${bgClass}`}>
                <div className="relative h-[400px]">
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
                </div>
                <div className="p-8">
                  <h2 className="text-3xl font-[impact] text-gray-900 mb-6">
                    {section.title}
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    {section.content}
                  </p>
                  {section.features && (
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {section.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircleIcon className="w-5 h-5 text-green-600 flex-shrink-0" />
                          <span className="text-gray-700 font-medium text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  <Link href="/quote">
                    <button className="bg-green-700 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg transform hover:scale-105 transition inline-flex items-center gap-2">
                      Get a Quote
                      <ArrowRightIcon className="w-5 h-5" />
                    </button>
                  </Link>
                </div>
              </div>

              {/* Desktop: Keep diagonal design WITH ALTERNATING */}
              <div className={`hidden md:block relative min-h-[700px] overflow-hidden ${bgClass}`}>
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
                <div className={`absolute inset-y-0 ${imageOnRight ? 'left-0' : 'right-0'} w-full md:w-[65%] lg:w-[55%] ${bgClass === 'bg-gray-50' ? 'bg-gray-50/95' : 'bg-white/95'} backdrop-blur-sm`}
                     style={{ 
                       clipPath: imageOnRight ? 'polygon(0 0, 85% 0, 100% 100%, 0% 100%)' : 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)'
                     }}>
                </div>
                <motion.div
                  initial={{ opacity: 0, x: imageOnRight ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className={`relative z-10 h-full flex items-center ${imageOnRight ? '' : 'justify-end'} min-h-[700px]`}
                >
                  <div className="px-8 md:px-12 lg:px-20 max-w-3xl w-full md:w-[60%]">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-[impact] text-gray-900 mb-6">
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
                            <span className="text-gray-700 font-medium">{feature}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    <Link href="/quote">
                      <button className="bg-green-700 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg transform hover:scale-105 transition inline-flex items-center gap-2">
                        Get a Quote
                        <ArrowRightIcon className="w-5 h-5" />
                      </button>
                    </Link>
                  </div>
                </motion.div>
              </div>
            </section>
          )
        }
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