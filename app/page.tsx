'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import WhyChoose from '@/components/WhyChoose';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { CheckCircleIcon, CurrencyDollarIcon, UserGroupIcon, DocumentTextIcon, BoltIcon } from '@heroicons/react/24/solid';

export default function Home() {
  const testimonialsRef = useRef(null);
  const isTestimonialsInView = useInView(testimonialsRef, { once: true });
  
  const faqRef = useRef(null);
  const isFAQInView = useInView(faqRef, { once: true });

  return (
    <div>
      {/* Hero Section - KEEP AS IS */}
      <div className="relative h-screen w-full overflow-hidden">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/Grass.Cutting.mp4" type="video/mp4" />
        </video>

        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40 z-10" />

        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 w-64 md:w-80 opacity-200">
          <img
            src="/images/brighton-logo.png"
            alt="Brighton Road Landscaping Logo"
            className="w-full h-auto"
          />
        </div>

        <section className="relative z-20 flex flex-col items-center justify-center text-center px-4 py-20 h-full">
          <h1 className="text-white text-4xl md:text-7xl font-[impact] leading-tight text-center mt-10 lg:mt-20">
            A Mowed Lawn for a Reasonable Price
          </h1>
          <Link href="/quote">
            <button className="mt-6 bg-green-700 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-xl shadow-md text-lg transition transform hover:scale-105">
              Get a Quote Today!
            </button>
          </Link>
        </section>
      </div>

      {/* Complete Landscaping Services Section - FULL BLEED */}
      <section className="bg-white min-h-[600px]">
        <div className="grid md:grid-cols-2 h-full">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex items-center p-8 md:p-12 lg:p-20"
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-[impact] text-gray-900 mb-6">
                Complete Landscaping Services
              </h2>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                Brighton Road Landscaping offers both residential and commercial landscaping services. 
                Located in Plymouth Meeting PA, we service the surrounding areas of King of Prussia, 
                Blue Bell, and Conshohocken, providing comprehensive lawn and landscape services. From the installation of landscapes, hardscapes, and irrigation systems, 
                as well as the maintenance and enhancements of lawns, landscapes and trees, 
                Brighton Road Landscaping is here to serve you.
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative min-h-[600px]"
          >
            <Image
              src="/images/homepage1.JPG"
              alt="Complete Landscaping Services"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Hardscaping Service - DIAGONAL DESKTOP, STACKED MOBILE */}
<section className="relative bg-gradient-to-br from-green-50 to-white overflow-hidden">
</section>
  {/* Mobile: Stacked Layout */}
  <div className="md:hidden">
    <div className="relative h-[400px]">
      <Image
        src="/images/hardscape.jpg"
        alt="Hardscaping Services"
        fill
        className="object-cover"
      />
    </div>
    <div className="p-8 bg-white">
      <h3 className="text-4xl font-[impact] text-gray-900 mb-8 leading-tight text-center">
        Explore Our Hardscaping Service
      </h3>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/services/hardscaping" className="w-full">
          <button className="w-full bg-green-700 hover:bg-green-600 text-white px-10 py-4 rounded-lg transition transform hover:scale-105 font-semibold shadow-lg text-xl">
            Explore Services
          </button>
        </Link>
        <Link href="/quote" className="w-full">
          <button className="w-full border-2 border-green-700 text-green-700 bg-white hover:bg-green-50 px-10 py-4 rounded-lg transition transform hover:scale-105 font-semibold text-xl">
            Get a Quote
          </button>
        </Link>
      </div>
    </div>
  </div>

  {/* Desktop: Keep Diagonal Design */}
  <div className="hidden md:block max-w-[1400px] mx-auto">
    <div className="relative h-[600px] md:h-[700px] lg:h-[800px]">
      {/* Background Image - Full Width */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="absolute inset-0"
      >
        <Image
          src="/images/hardscape.jpg"
          alt="Hardscaping Services"
          fill
          className="object-cover"
        />
      </motion.div>

      {/* White/Light Overlay Panel - Right Side */}
      <div className="absolute inset-y-0 right-0 w-full md:w-[65%] lg:w-[55%] bg-white/95 backdrop-blur-sm"
           style={{ 
             clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)'
           }}>
      </div>

      {/* Text Content - Right Side Overlapping */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="relative z-10 h-full flex items-center justify-end"
      >
        <div className="px-8 md:px-12 lg:px-20 max-w-3xl w-full md:w-[60%]">
          <h3 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-[impact] text-gray-900 mb-8 leading-tight text-center">
            Explore Our Hardscaping Service
          </h3>
          <p className="text-gray-700 mb-10 leading-relaxed text-lg md:text-xl lg:text-2xl">
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/services/hardscaping">
              <button className="bg-green-700 hover:bg-green-600 text-white px-10 py-4 rounded-lg transition transform hover:scale-105 font-semibold shadow-lg text-xl">
                Explore Services
              </button>
            </Link>
            <Link href="/quote">
              <button className="border-2 border-green-700 text-green-700 bg-white hover:bg-green-50 px-10 py-4 rounded-lg transition transform hover:scale-105 font-semibold text-xl">
                Get a Quote
              </button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  </div>


      {/* What We Do Section - FULL BLEED */}
      <section className="bg-gray-50 min-h-[600px]">
        <div className="grid md:grid-cols-2 h-full">
          <motion.div 
            className="flex items-center p-8 md:p-12 lg:p-20"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div>
              <h3 className="text-3xl md:text-4xl font-[impact] text-gray-900 mb-8">
                What We Do
              </h3>
              <div className="space-y-5">
                <div className="flex items-start group">
                  <div className="bg-green-100 rounded-full p-2 mr-4 group-hover:bg-green-200 transition">
                    <CheckCircleIcon className="w-6 h-6 text-green-700" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-lg">Lawn Mowing & Maintenance</h4>
                    <p className="text-gray-600">Weekly and bi-weekly cutting services</p>
                  </div>
                </div>
                <div className="flex items-start group">
                  <div className="bg-green-100 rounded-full p-2 mr-4 group-hover:bg-green-200 transition">
                    <CheckCircleIcon className="w-6 h-6 text-green-700" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-lg">Landscape Design & Installation</h4>
                    <p className="text-gray-600">Custom landscapes tailored to your property</p>
                  </div>
                </div>
                <div className="flex items-start group">
                  <div className="bg-green-100 rounded-full p-2 mr-4 group-hover:bg-green-200 transition">
                    <CheckCircleIcon className="w-6 h-6 text-green-700" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-lg">Seasonal Cleanups</h4>
                    <p className="text-gray-600">Spring and fall cleanup services</p>
                  </div>
                </div>
                <div className="flex items-start group">
                  <div className="bg-green-100 rounded-full p-2 mr-4 group-hover:bg-green-200 transition">
                    <CheckCircleIcon className="w-6 h-6 text-green-700" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-lg">Tree & Shrub Services</h4>
                    <p className="text-gray-600">Trimming, pruning, and removal</p>
                  </div>
                </div>
              </div>
              <Link href="/services">
                <button className="mt-8 bg-green-700 hover:bg-green-600 text-white px-8 py-3 rounded-lg transition transform hover:scale-105 font-semibold shadow-lg">
                  View All Services
                </button>
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            className="relative min-h-[600px]"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <video
              src="whychoosevideo.MP4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section - FULL BLEED */}
      <section className="bg-white min-h-[600px]">
        <div className="grid md:grid-cols-2 h-full">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative min-h-[600px]"
          >
            <Image
              src="/images/homepage2.JPG"
              alt="Brighton Road Team"
              fill
              className="object-cover"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex items-center p-8 md:p-12 lg:p-20"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-[impact] text-gray-900 mb-8">
                Why Choose Brighton Road Landscaping?
              </h2>
              <div className="space-y-6">
                <div className="flex items-start group">
                  <div className="bg-green-600 text-white rounded-full p-3 mr-4 group-hover:bg-green-700 transition flex items-center justify-center min-w-[48px] h-12">
                    <CheckCircleIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-xl mb-1">A Trusted Brand</h4>
                    <p className="text-gray-600">Serving Montgomery County since 2022 with pride</p>
                  </div>
                </div>
                
                <div className="flex items-start group">
                  <div className="bg-green-600 text-white rounded-full p-3 mr-4 group-hover:bg-green-700 transition flex items-center justify-center min-w-[48px] h-12">
                    <CurrencyDollarIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-xl mb-1">Affordable Lawn Care</h4>
                    <p className="text-gray-600">Competitive pricing with transparent quotes</p>
                  </div>
                </div>
                
                <div className="flex items-start group">
                  <div className="bg-green-600 text-white rounded-full p-3 mr-4 group-hover:bg-green-700 transition flex items-center justify-center min-w-[48px] h-12">
                    <UserGroupIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-xl mb-1">Experienced Team Members</h4>
                    <p className="text-gray-600">Professional crew with years of expertise</p>
                  </div>
                </div>
                
                <div className="flex items-start group">
                  <div className="bg-green-600 text-white rounded-full p-3 mr-4 group-hover:bg-green-700 transition flex items-center justify-center min-w-[48px] h-12">
                    <DocumentTextIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-xl mb-1">No Contracts, No Cancellation Fees</h4>
                    <p className="text-gray-600">Flexible service on your terms</p>
                  </div>
                </div>
                
                <div className="flex items-start group">
                  <div className="bg-green-600 text-white rounded-full p-3 mr-4 group-hover:bg-green-700 transition flex items-center justify-center min-w-[48px] h-12">
                    <BoltIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-xl mb-1">Free Estimates</h4>
                    <p className="text-gray-600">Quick, no-obligation quotes within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION - EXACTLY AS IT WAS */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-20 px-6 md:px-20">
        <motion.div
          ref={testimonialsRef}
          initial={{ opacity: 0, y: 50 }}
          animate={isTestimonialsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-[impact] text-center text-gray-900 mb-12">
            What Our Clients Say
          </h2>

          {/* Featured Testimonial with Modern Design */}
          <div className="max-w-5xl mx-auto mb-12">
            <div className="relative bg-gradient-to-r from-green-700 to-green-600 p-1 rounded-2xl shadow-2xl">
              <div className="bg-gradient-to-r from-green-700 to-green-600 p-8 md:p-10 rounded-2xl">
                <div className="text-white/20 text-8xl absolute top-4 left-4">"</div>
                <div className="relative z-10">
                  <p className="text-white text-xl md:text-2xl italic leading-relaxed mb-6">
	Love the go getter mentality of these young men in high school, I grew up in the 70’s and 80’s worked since I was 11. You don’t see that anymore in this young generation ! Plus their lawn work is impeccable and always on time !!! Highly recommend this outstanding hungry young crew to hire for all lawn and clean up projects !!!!!
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-lg">CS</span>
                      </div>
                      <span className="text-white font-bold text-lg">Chris S</span>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-yellow-400 text-2xl">★</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Testimonials - Compact */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={isTestimonialsInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white border border-gray-200 p-6 rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              <p className="text-gray-700 mb-4 italic text-sm leading-relaxed">
                "Declan is our neighbor and he is honestly the hardest working kid I've ever seen. 
                He works late into the night most days. Way to go Declan!!"
              </p>
              <div className="flex items-center justify-between">
                <span className="font-bold text-green-700">— Danna</span>
                <div className="flex gap-1 text-yellow-400">★★★★★</div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={isTestimonialsInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white border border-gray-200 p-6 rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              <p className="text-gray-700 mb-4 italic text-sm leading-relaxed">
                "I've used Declan for the past three or four seasons. His crew does a great job 
                and are very reliable. Highly recommend"
              </p>
              <div className="flex items-center justify-between">
                <span className="font-bold text-green-700">— Bryan S</span>
                <div className="flex gap-1 text-yellow-400">★★★★★</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Williamson College Partnership - FULL BLEED */}
      <section className="bg-white min-h-[500px]">
        <div className="grid md:grid-cols-2 h-full">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative min-h-[500px] bg-gray-50 flex items-center justify-center"
          >
            <Image
              src="/logos/williamson.png"
              alt="Williamson College of Trades"
              width={400}
              height={250}
              className="object-contain"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex items-center p-8 md:p-12 lg:p-20"
          >
            <div>
              <h3 className="text-3xl md:text-4xl font-[impact] text-gray-900 mb-6">
                Proud Sponsors of Williamson College of Trades Career Fair
              </h3>
              <p className="text-gray-700 mb-8 leading-relaxed text-lg">
                Brighton Road Landscaping is committed to supporting the next generation of skilled 
                tradespeople. We're proud to sponsor the Williamson College of Trades Career Fair 
                and actively recruit talented individuals who share our passion for quality landscaping.
              </p>
              <Link href="/join">
                <button className="bg-green-700 hover:bg-green-600 text-white px-8 py-3 rounded-lg transition transform hover:scale-105 font-semibold shadow-lg">
                  Join Our Team
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section - KEEP AS IS */}
      <section id="faq" className="bg-gray-100 py-20">
        <motion.div
          ref={faqRef}
          initial={{ opacity: 0, y: 50 }}
          animate={isFAQInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        >
          <FAQSection />
        </motion.div>
      </section>
      
      <Footer />
    </div>
  );
}