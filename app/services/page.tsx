'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '@/components/Footer';
import { 
  ArrowRightIcon,
  SparklesIcon,
  HomeIcon,
  ScissorsIcon,
  BeakerIcon,
  WrenchScrewdriverIcon,
  CloudIcon
} from '@heroicons/react/24/solid';

const services = [
  {
    name: 'Lawn Mowing',
    slug: 'lawn-mowing',
    description: 'Professional weekly and bi-weekly cutting services with no contracts',
    image: '/images/lawns.jpg',
    icon: ScissorsIcon,
  },
  {
    name: 'Hardscaping',
    slug: 'hardscaping',
    description: 'Custom patios, walkways, and retaining walls built to last',
    image: '/images/hardscape.jpg',
    icon: WrenchScrewdriverIcon,
  },
  {
    name: 'Tree Service',
    slug: 'tree-service',
    description: 'Expert trimming, pruning, and removal for trees of all sizes',
    image: '/images/tree.jpg',
    icon: CloudIcon,
  },
  {
    name: 'Landscape Design & Installation',
    slug: 'landscape-design',
    description: 'Professional landscape architecture and installation services',
    image: '/images/flowerbed.jpg',
    icon: HomeIcon,
  },
  {
    name: 'Lawn Care',
    slug: 'lawn-care',
    description: 'Complete lawn treatment programs for a healthy, green lawn',
    image: '/images/fertilizer.jpg',
    icon: BeakerIcon,
  },
  {
    name: 'Seasonal Cleanups',
    slug: 'seasonal-cleanups',
    description: 'Spring and fall cleanup services to keep your property pristine',
    image: '/images/cleanups.jpg',
    icon: SparklesIcon,
  }
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero Banner - Keep as is */}
      <section className="relative bg-gradient-to-r from-green-800 to-green-700 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <motion.div 
          className="relative z-10 max-w-7xl mx-auto px-6 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-7xl font-[impact] mb-6 tracking-wide">
            OUR SERVICES
          </h1>
          <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto">
            From lawn maintenance to complete landscape transformations, 
            Brighton Road Landscaping delivers excellence in every service
          </p>
        </motion.div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-white" 
             style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 0 80%)' }}></div>
      </section>

      {/* All Premier Services Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-[impact] text-center mb-4">
            PREMIER LANDSCAPING SERVICES
          </h2>
          <p className="text-center text-gray-600 mb-16 text-lg">
            Professional. Reliable. Local.
          </p>

          {/* Services Grid - All Equal Size */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={`/services/${service.slug}`}>
                  <div className="group relative h-[380px] rounded-xl overflow-hidden shadow-xl hover:shadow-2xl cursor-pointer transition-all">
                    {/* Background Image */}
                    <Image
                      src={service.image}
                      alt={service.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    
                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg">
                          <service.icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-2xl font-[impact] text-white">
                          {service.name}
                        </h3>
                      </div>
                      <p className="text-white/90 text-base mb-4">
                        {service.description}
                      </p>
                      <div className="flex items-center gap-2 text-white group-hover:gap-4 transition-all">
                        <span className="font-semibold">Learn More</span>
                        <ArrowRightIcon className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Call to Action Section - Keep as is */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-16">
        <motion.div 
          className="max-w-4xl mx-auto text-center px-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-[impact] text-gray-900 mb-6">
            Ready to Transform Your Property?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Contact us today for a free consultation and quote
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/quote">
              <button className="bg-green-700 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg transform hover:scale-105 transition">
                Get Free Quote
              </button>
            </Link>
            <Link href="/contact">
              <button className="border-2 border-green-700 text-green-700 hover:bg-green-50 px-8 py-4 rounded-lg font-semibold text-lg transform hover:scale-105 transition">
                Contact Us
              </button>
            </Link>
          </div>
        </motion.div>
      </section>

      <Footer />
    </>
  );
}